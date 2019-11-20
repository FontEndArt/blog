# Vue主线剧情之build

## scripts/build.js
```javascript
const fs = require('fs')
const path = require('path')
const zlib = require('zlib')
const rollup = require('rollup')
const terser = require('terser')

// 验证或创建dist打包输出目录
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

// 获取所有的打包项
let builds = require('./config').getAllBuilds()

// 通过命令行构建过滤器
if (process.argv[2]) {
  // eg: "npm run build -- web-runtime-cjs,web-server-renderer"
  const filters = process.argv[2].split(',')
  builds = builds.filter(b => {
    // 返回对应的某一些项
    return filters.some(f => b.output.file.indexOf(f) > -1 || b._name.indexOf(f) > -1)
  })
} else {
  // 默认情况下过滤掉weex的版本
  builds = builds.filter(b => {
    return b.output.file.indexOf('weex') === -1
  })
}

// 传入过滤后的打包配置项
build(builds)

function build (builds) {
	let built = 0
	// 打包项的个数
	const total = builds.length
	// 便于完成这次打包后的下一次打包
  const next = () => {
    buildEntry(builds[built]).then(() => {
			built++
			// 是否打包完成
      if (built < total) {
        next()
      }
    }).catch(logError)
  }

  next()
}

// 打包入口（config是单一rollup的打包配置）
function buildEntry (config) {
	const output = config.output
  const { file, banner } = output
  const isProd = /(min|prod)\.js$/.test(file)
  return rollup.rollup(config)
    .then(bundle => bundle.generate(output))
    .then(({ output: [{ code }] }) => {
      if (isProd) {
        const minified = (banner ? banner + '\n' : '') + terser.minify(code, {
          toplevel: true,
          output: {
            ascii_only: true
          },
          compress: {
            pure_funcs: ['makeMap']
          }
        }).code
        return write(file, minified, true)
      } else {
        return write(file, code)
      }
    })
}

// 写入文件
function write (dest, code, zip) {
  return new Promise((resolve, reject) => {
    function report (extra) {
      console.log(blue(path.relative(process.cwd(), dest)) + ' ' + getSize(code) + (extra || ''))
      resolve()
    }

    fs.writeFile(dest, code, err => {
      if (err) return reject(err)
      if (zip) {
        zlib.gzip(code, (err, zipped) => {
          if (err) return reject(err)
          report(' (gzipped: ' + getSize(zipped) + ')')
        })
      } else {
        report()
      }
    })
  })
}

// 换算大小
function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

// 打印
function logError (e) {
  console.log(e)
}

// ANSI escape code 语法
function blue (str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}
```

通过大致的对build的分析，我们看到主要是对 process.argv 和 ```./config``` 这个文件的 getAllBuilds 方法的引用。

## scripts/config.js
```javascript
...

// 存储了目录别名的配置
const aliases = require('./alias')
// 寻找引用到对应的文件
const resolve = p => {
  const base = p.split('/')[0]
  if (aliases[base]) {
    return path.resolve(aliases[base], p.slice(base.length + 1))
  } else {
    return path.resolve(__dirname, '../', p)
  }
}

// 所有的打包配置
const builds = {
	// Runtime only (CommonJS). Used by bundlers e.g. Webpack & Browserify
  'web-runtime-cjs-dev': {
		// 构建的入口文件
		entry: resolve('web/entry-runtime.js'),
		// 构建后的文件地址
		dest: resolve('dist/vue.runtime.common.dev.js'),
		// 构建使用的规范
		format: 'cjs',
		// 构建环境
		env: 'development',
		// Vue的版权
    banner
  },
  'web-runtime-cjs-prod': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.common.prod.js'),
    format: 'cjs',
    env: 'production',
    banner
  },
  // Runtime+compiler CommonJS build (CommonJS)
  'web-full-cjs-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.common.dev.js'),
    format: 'cjs',
    env: 'development',
    alias: { he: './entity-decoder' },
    banner
  },
  'web-full-cjs-prod': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.common.prod.js'),
    format: 'cjs',
    env: 'production',
    alias: { he: './entity-decoder' },
    banner
  },
	...
}

// 返回name对应的rollup配置项
function genConfig (name) {
  const opts = builds[name]
  const config = {
    input: opts.entry,
    external: opts.external,
    plugins: [
			// rollup-plugin-flow-no-whitespace
			flow(),
			// rollup-plugin-alias
      alias(Object.assign({}, aliases, opts.alias))
    ].concat(opts.plugins || []),
    output: {
      file: opts.dest,
      format: opts.format,
      banner: opts.banner,
      name: opts.moduleName || 'Vue'
    },
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    }
	}

  // built-in vars
  const vars = {
    __WEEX__: !!opts.weex,
    __WEEX_VERSION__: weexVersion,
    __VERSION__: version
	}
	
  // feature flags
  Object.keys(featureFlags).forEach(key => {
    vars[`process.env.${key}`] = featureFlags[key]
	})
	
  // build-specific env
  if (opts.env) {
    vars['process.env.NODE_ENV'] = JSON.stringify(opts.env)
  }
  config.plugins.push(replace(vars))

  if (opts.transpile !== false) {
    config.plugins.push(buble())
  }

  Object.defineProperty(config, '_name', {
    enumerable: false,
    value: name
  })

	return config
}

if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET)
} else {
  exports.getBuild = genConfig
  exports.getAllBuilds = () => Object.keys(builds).map(genConfig)
}
```

用过```rollup```的童鞋们，相信你们一眼就抓到了重点，这个```config.js```主要的工作就是存储和处理对应参数，从而返回一个rollup的配置。而且仔细阅读```config.js```的话还可以了解到Vue通过当前web、server（服务端渲染）、weex、webpack插件等配置来打包。

其中builds的配置项说明：
```javascript
{
	entry: '构建的入口文件',
	dest: '构建后的文件地址',
	format: '构建使用的规范',
	env: '构建环境',
	alias: '别名配置',
	banner: 'Vue的版权'
}
```

我们注意到里面有一个很有意思的项就是 aliases 这个呢是别名路径。那我们接下来就进入到这个别名的路径中。

## scripts/alias.js

```javascript
const path = require('path')

const resolve = p => path.resolve(__dirname, '../', p)

module.exports = {
  vue: resolve('src/platforms/web/entry-runtime-with-compiler'),
  compiler: resolve('src/compiler'),
  core: resolve('src/core'),
  shared: resolve('src/shared'),
  web: resolve('src/platforms/web'),
  weex: resolve('src/platforms/weex'),
  server: resolve('src/server'),
  sfc: resolve('src/sfc')
}
```

可以看到这里很简单，就是返回一个别名和对应的路径的resolve。

## 总结
基本上主线任务的序章就已经结束了，通过package.json的scripts来分析是我们常用的看代码手段。

这部分主要就是通过 ```npm run build``` -> ```package.json``` -> ```scripts/build.js``` -> ```scripts/config.js``` -> ```scripts/alias.js``` -> ```src目录``` 这样的流程让我们清晰了打包的每一个过程。

虽然你有这个游戏的大号，知道src目录就是项目的代码目录，可以直接跳过序章看src目录。但是你开局过个序章任务，可以很好的了解这个游戏。

下面我们就进入新手村了，开启新的主线剧情，Vue主线剧情之core/index