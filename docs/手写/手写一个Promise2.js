
function Promise(executor){
    let that = this;
    that.status = 'pending';
    that.value = null;
    that.reason = null;
    that.onFilFulledCallbacks = [];
    that.onRejectedCallbacks = [];

    function resolve(value){
        if(that.status === 'pending'){
            that.status = 'resolved';
            that.value = value;
            that.onFilFulledCallbacks.forEach((fn)=>{
                fn();
            });
        }
    }
    function reject(reason){
        if(that.status === 'pending'){
            that.status = 'rejected';
            that.reason = reason;
            that.onRejectedCallbacks.forEach((fn)=>{
                fn();
            });
        }
    }
    try{
        executor(resolve,reject);
    }catch(e){
        reject(e);
    }
}

Promise.prototype.then = function(onFilfulled,onRejected){
    onFilfulled = typeof onFilfulled === 'function'?onFilfulled:value=>value;
    onRejected = typeof onRejected === 'function'?onRejected:err=>{throw err};
    let that = this;
    let promise2 = new Promise((resolve,reject)=>{
        if(that.status === 'resolved'){
            setTimeout(()=>{
                try{
                    let promise3 = onFilfulled(that.value);
                    resolvePromiseRelation(promise2,promise3,resolve,reject);
                }catch(e){
                    reject(e);
                }
            },0);
        }
        if(that.status === 'rejected'){
            setTimeout(()=>{
                try{
                    let promise3 = onRejected(that.reason);
                    resolvePromiseRelation(promise2,promise3,resolve,reject);
                }catch(e){
                    reject(e);
                }
            },0);
        }
        if(that.status === 'pending'){
            that.onFilFulledCallbacks.push(function(){
                setTimeout(()=>{
                    try{
                        let promise3 = onFilfulled(that.value);
                        resolvePromiseRelation(promise2,promise3,resolve,reject);
                    }catch(e){
                        reject(e);
                    }
                },0);
            });
            that.onRejectedCallbacks.push(function(){
                setTimeout(()=>{
                   try{
                       let promise3 = onRejected(that.reason);
                       resolvePromiseRelation(promise2,promise3,resolve,reject);
                   }catch(e){
                       reject(e);
                   }
               },0);
           });
        }
    });
    return promise2;
}

function resolvePromiseRelation(promise2,promise3,resolve,reject){
    if(promise2 == promise3){
        return reject(new TypeError('循环引用了!'));
    }
    let called;
    if(promise3!==null&&(typeof promise3 === 'object' || typeof promise3 === 'function')){
        try{
            let then = promise3.then;
            if(typeof then === 'function'){
                then.call(promise3, (promise4)=>{
                    if(called) return;
                    called = true;
                    resolvePromiseRelation(promise2,promise4,resolve,reject);
                },(r)=>{
                    if(called) return;
                    called = true;
                    reject(r);
                });
            }else{
                resolve(promise3);
            }
        }catch(e){
            if(called) return;
            called = true;
            reject(e);
        };
    }else{
        resolve(promise3);
    }
}

Promise.prototype.catch = function(errFn){
    return this.then(null,errFn);
}
Promise.prototype.finally = function(fn){
    this.then(()=>{
        fn();
    },()=>{
        fn();
    });
    return this;
}

Promise.all = function(values){
    return new Promise((resolve,reject)=>{
        let results = [];
        let index = 0;
        function addToArr(key,value){
            index++;
            results[key] = value;
            if(index === values.length){
                resolve(results);
            }
        }
        for(let i = 0; i < values.length; i++){
            let current = values[i];
            if(current && current.then && typeof current.then === 'function'){
                current.then((value)=>{
                    addToArr(i,value);
                },reject);
            }else{
                addToArr(i,current);
            }
        }
    });
}

Promise.race = function(values){
    return new Promise((resolve,reject)=>{
        for(let i = 0; i < values.length; i++){
            let current = values[i];
            if(current&&current.then&&typeof current.then === 'function'){
                current.then(resolve,reject);
            }else{
                resolve(current);
            }
        }
    });
}

Promise.resolve = function(value){
    return new Promise((resolve,reject)=>{
        resolve(value);
    });
}

Promise.reject = function(reason){
    return new Promise((resolve,reject)=>{
        reject(reason);
    });
}

Promise.defer = Promise.deferred = function(){
    let dfd = {};
    dfd.promise = new Promise((resolve, reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}

Promise.reject(new Error(111))
// Promise.reject(new Error(111))
    .then(res => { console.log(`then1: ${res}`); return 2; })
    // .catch(res => { console.log(`catch1: ${res}`); })
    .finally(function () { console.log("finally") });
    // .finally(111);