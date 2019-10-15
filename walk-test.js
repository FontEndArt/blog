const walk = require('walk');
const { join } = require('path');
const fs = require('fs');
const { TYPES, ignore } = require('./menu.config');

function getResult(dirName) {
    const dir = join(__dirname, "./docs", dirName)
    const result = [];

    function handleItem(key, handle, arr, filename) {
        const title = TYPES[dirName][key];
        let handleKey = arr.shift();
        title && (handleKey = title);
        let state = false;
        let results;
        for (let item of handle) {
            if (item.title == handleKey) {
                results = item;
                state = true;
                break;
            }
        }
        // 文件夹
        if (!state) {
            results = {
                title: handleKey,
                collapsable: false,
                children: []
            };
            handle.push(results);
        }
        // 文件
        if (filename) {
            filename = filename.replace("README", "");
            results.children.push(filename);
        }
        results.children = results.children.sort();
        if (arr.length) {
            handleItem(key, results.children, arr)
        }
    }

    const options = {
        listeners: {
            names: function (root, nodeNamesArray) {
                nodeNamesArray.sort(function (a, b) {
                    if (a > b) return 1;
                    if (a < b) return -1;
                    return 0;
                });
            }
            , directories: function (root, dirStatsArray, next) {
                // dirStatsArray is an array of `stat` objects with the additional attributes
                // * type
                // * error
                // * name
                next();
            }
            , file: function (root, fileStats, next) {
                let key = root.replace(dir, '');
                if (!key) { return; }
                key = key.substring(1);
                if (!fileStats.name.includes(".md")) { return; }
                const name = fileStats.name.replace(".md", "");
                const Pname = join(key, name);
                
                if (ignore[dirName] && ignore[dirName].includes(key)) { return; }
                if (ignore[dirName] && ignore[dirName].includes(Pname)) { return; }
                handleItem(key, result, key.split("/"));
                handleItem(key, result, key.split("/"), Pname);
                // console.log(result)

                // fs.readFile(fileStats.name, function () {
                // doStuff
                next();
                // });
            }
            , errors: function (root, nodeStatsArray, next) {
                next();
            }
        }
    };


    walker = walk.walkSync(dir, options);

    return result;
}

// console.log('result:', JSON.stringify( result, true, 2 ) );
// console.log('result:', result);
// console.log("all done");
module.exports = getResult;