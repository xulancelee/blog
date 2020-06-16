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
    const globalEvent = new WeakMap();

    function xuLib(selector, context) {
        return new xuLib.xu.Init(selector, context);
    }

    function Xu(selector, context) {
        context = context || document;
        let nodes;
        if (typeof selector === 'string')
            nodes = context.querySelectorAll(selector);
        else if (selector instanceof Array) nodes = selector;
        for (let i = 0; i < nodes.length; i++) {
            this[i] = nodes[i];
        }
        this.length = nodes.length;
        return Array.prototype.slice.call(this);
    }

    function EventMap($e) {
        this.map = {};
        this.$e = $e;
    }

    EventMap.prototype = {
        constructor: EventMap,
        set: function (event, filter, handler) {
            this.map[event] ?
                this.map[event].push({filter, handler}) :
                (this.map[event] = [{filter, handler}]);
        },
        get: function (event) {
            return this.map[event] || [];
        },
        bind: function (event) {
            const _t = this;
            this.$e.addEventListener(event, function (ev) {
                let handlerList = _t.get(event);
                let target = ev.target;
                for (let i = 0; i < handlerList.length; i++) {

                }
            });
        }
    };

    xuLib.xu = Xu.prototype = {
        constructor: xuLib,
        ver: version,
        length: 0,
        map: function (handler) {
            for (let i = 0; i < this.length; i++)
                handler(i, this[i], this);
            return this;
        },
        each: function (handler) {
            for (let i = 0; i < this.length; i++) {
                let res = handler(i, this[i], this);
                if (res !== undefined && !res) break;
            }

            return this;
        },
        on: function (event, filter, handler) {
            if (typeof filter === 'function') {
                handler = filter;
                filter = undefined;
            }
            let _t = this;
            return this.map(function (index, dom, xu) {
                let domEvent = globalEvent.get(dom);

                if (domEvent) domEvent.set(event, filter, handler);
                else {
                    let domEvent = new EventMap(dom);
                    domEvent.set(event, filter, handler);
                    domEvent.bind(event);
                    globalEvent.set(dom, domEvent);
                }
            });
        },
        trigger: function (event) {

        },
        one: function () {

        },
        off: function () {

        },
        find: function (selector) {
            let result = [];
            this.map((index, dom) => {
                result.concat(dom.querySelectorAll(selector))
            });
            return new Xu(result);
        },
        has: function () {

        },
        is: function (selector) {

        },
        parent: function () {

        }
    };
    xuLib.xu.Init = Xu;

    if (noGlobal) return window.xuLib = window.$ = xuLib;
    return global.xuLib = global.$ = xuLib;
}));