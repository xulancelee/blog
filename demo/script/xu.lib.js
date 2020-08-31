//事件委托
function delegate(dom, event, filter, fn) {
    dom.addEventListener(event, function (ev) {
        let target = ev.target;
        while (!target.matches(filter)) {
            if (dom === target) {
                target = null;
                break;
            }
            target = target.parentNode;
        }
        if (target) fn.call(target, ev);
    });
}

//节流
function throttle(fn, delay) {
    let flag = false;
    let timer;
    return function (...args) {
        let context = this;
        if (flag) return;
        flag = true;

        clearTimeout(timer);
        timer = setTimeout(() => {
            flag = false;
        }, delay);
        fn.apply(context, args);
    }
}

//防抖
function debounce(fn, daley) {
    let timer;

    return function (...args) {
        let context = this;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            clearTimeout(timer);
            timer = null;
            fn.apply(context, args);
        }, daley);
    }
}

//数组去重
function uniqueBySet(arr) {
    return [...new Set(arr)];
}

function uniqueByFilter(arr) {
    return arr.filter(function (item, index, array) {
        return array.indexOf(item) === index;
    })
}

function uniqueByReduce(arr) {
    return arr.reduce((pre, cur) => pre.includes(cur) ? pre : [...pre, cur], [])
}

//柯里化
function currying(fn, ...args) {
    return args.length >= fn.length ?
        (...arguments) => currying(fn, ...args, ...arguments) :
        fn(...args);
}

//数组flat 数组拍平
function flatDeep(arr, deep = 1) {
    return deep > 0 ?
        arr.reduce((res, cur) => res.concat(
            Array.isArray(cur) ?
                flatDeep(cur, deep - 1) :
                cur
        ), []) :
        arr.slice();
}

//apply call bind
Function.prototype.ownCall = function (context, ...args) {
    context = Object(context) || window;
    let fn = Symbol();
    context[fn] = this;
    let result = context[fn](...args);
    delete context[fn];
    return result;
}

Function.prototype.ownApply = function (context, args) {
    context = Object(context) || window;
    let fn = Symbol();
    context[fn] = this;
    let result = context[fn](...args);
    delete context[fn];
    return result;
}

Function.prototype.ownBind = function (context, ...args) {
    context = Object(context) || window;
    let fn = Symbol();
    context[fn] = this;
    return function (...args1) {
        context[fn](...args, ...args1);
    }
}

//new
function ownNew(constructor, ...args) {
    let context = {};
    context.__proto__ = constructor.prototype;
    let result = constructor.apply(context, args);
    if(result && typeof result === 'function' || typeof result === 'object')
        return result;
    return context;
}


//reduce
Array.prototype.ownReduce = function (fn, init) {
    let result = init;
    let i = 0;
    if(!result) {
        result = this[i];
        i++;
    }
    while (i < this.length) {
        result = fn(result, this[i]);
    }

    return result;
}

// 实现Promise.all 以及 Promise.race
Promise.ownAll = function (iterable) {
    return new Promise(((resolve, reject) => {
        let result = [];
        let done = 0;
        let count = 0;
        for (let key of iterable) {
            count++;
            if(iterable[key] instanceof Promise) {
                iterable[key].then((res) => {
                    result[key] = res;
                    if(++done === count) resolve(result);
                });
            } else {
                Promise.resolve(iterable[key]).then((res) => {
                    result[key] = res;
                    if(++done === count) resolve(result);
                });
            }
        }
        if(!count) return resolve([]);
    }));
}

Promise.ownRace = function (iterable) {
    return new Promise(((resolve, reject) => {
        for(let key of iterable) {
            if(iterable[key] instanceof Promise) {
                iterable[key].then(resolve, reject);
            } else {
                Promise.resolve(iterable[key]).then(resolve, reject);
            }
        }
    }));
}

//手写Ajax
function ajax(url, data) {
    return new Promise((resolve, reject) => {
       let xhr = new XMLHttpRequest();
       xhr.open('POST', url);
       xhr.onreadystatechange = function () {
           if(xhr.readyState === 4) {
               if(xhr.status === 200) {
                   resolve(xhr.responseText);
               } else {
                    reject(xhr.responseText);
               }
           }
       };
       xhr.send(JSON.stringify(data));
    });
}









