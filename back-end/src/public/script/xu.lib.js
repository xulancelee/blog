/**
 * Xu.Lance Javascript Library
 * http://xulance.com
 * */
(function (global, factory) {
    "use strict";
    try {
        const support = true;
        let map = new WeakMap();
    } catch (e) {
        throw new Error('Your browser version is not support ECMAScript, Suggest use Chrome or Edge!');
    }
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error("jQuery requires a window with a document");
                }
                return factory(w);
            };
    } else {
        factory(global);
    }

}(typeof window !== "undefined" ? window : this, function (global, noGlobal) {
    "use strict";
    const version = '2020.6';
    const indexOf = function (arr, item) {
        return Array.prototype.indexOf.call(arr, item)
    };
    const hasIn = function (arr, item) {
        return Array.prototype.indexOf.call(arr, item) >= 0
    };

    function xuLib(selector, context) {
        return new xuLib.xu.Init(selector, context);
    }

    function Xu(selector, context) {
        context = context || document;
        this.$e = typeof selector === "string" ? context.querySelector(selector) : selector;
        this.context = context;
        console.log(this);
    }


    xuLib.xu = Xu.prototype = {
        constructor: xuLib,
        ver: version,
        on: function (event, filter, handler) {
            if (typeof filter === 'function') {
                handler = filter;
                filter = undefined;
            }
            let _t = this;
            this.$e.addEventListener(event, function (ev) {
                function catchTarget() {
                    for (let i = 0; i < ev.path.length; i++) {
                        target = ev.path[i];
                        if (hasIn(filterList, target)) break;
                        if (target === _t.$e) break;
                    }
                }
                let target = ev.target;
                let filterList = filter ? _t.queryAll(filter) : null;
                filter && catchTarget();
                if (filter && hasIn(_t.queryAll(filter), target)) {
                    return handler.call(target, ev);
                } else if (filter) return false;
                else return handler.call(_t.$e, ev);
            });
            return this;
        },
        off: function (event, handler) {
            this.$e.removeEventListener(event, handler);
        },
        find: function (selector) {
            return xuLib(this.query(selector));
        },
        is: function (selector) {
            return indexOf.call(this.parent().queryAll(selector), this.$e)
        },
        val: function(val) {
            let hasVal = val !== undefined;
            switch (this.$e.tagName) {
                case 'textarea':
                    if(hasVal) this.$e.innerHTML = val;
                    else return this.$e.innerHTML;
                    break;
                case 'input':
                default:
                    if(hasVal) this.$e.value = val;
                    else return this.$e.value;
                    break;
            }
            return this;
        },
        parent: function () {
            return xuLib(this.$e.parentElement || this.$e.parentNode);
        },
        sibling: function (selector) {
            return xuLib(this.parent().query(selector));
        },
        toggleClass: function (className) {
            this.$e.classList.toggle(className);
            return this;
        },
        query: function (selector) {
            return this.$e.querySelector(selector)
        },
        queryAll: function (selector) {
            return this.$e.querySelectorAll(selector)
        }
    };
    xuLib.xu.Init = Xu;

    if (noGlobal) return window.xuLib = window.$ = xuLib;
    return global.xuLib = global.$ = xuLib;
}));