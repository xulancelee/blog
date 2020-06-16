(function (global, factory) {
    "use strict";
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
}(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
    function isFunction(obj) {
        return typeof obj === "function" && typeof obj.nodeType !== "number";
    }

    function isPlainObject(obj) {
        let proto, Ctor;

        if (!obj || toString.call(obj) !== "[object Object]") {
            return false;
        }

        proto = getProto(obj);
        if (!proto) {
            return true;
        }
        Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
        return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
    }

    function isEmptyObject(obj) {
        for (let name in obj) {
            return false;
        }
        return true;
    }

    const class2type = {};
    const getProto = Object.getPrototypeOf;
    const hasOwn = class2type.hasOwnProperty;
    const fnToString = hasOwn.toString;
    const ObjectFunctionString = fnToString.call(Object);
    const jQuery = function (selector, context) {
        return new jQuery.fn.init(selector, context);
    };
    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
        pushStack: function (elems) {

            // Build a new jQuery matched element set
            var ret = jQuery.merge(this.constructor(), elems);

            // Add the old object onto the stack (as a reference)
            ret.prevObject = this;

            // Return the newly-formed element set
            return ret;
        },
        length: 0
    };

    jQuery.extend = jQuery.fn.extend = function () {
        let options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        if (typeof target === "boolean") {
            deep = target;
            target = arguments[i] || {};
            i++;
        }

        if (typeof target !== "object" && !isFunction(target)) {
            target = {};
        }

        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    copy = options[name];
                    if (name === "__proto__" || target === copy) {
                        continue;
                    }
                    if (deep && copy && (isPlainObject(copy) ||
                        (copyIsArray = Array.isArray(copy)))) {
                        src = target[name];

                        if (copyIsArray && !Array.isArray(src)) {
                            clone = [];
                        } else if (!copyIsArray && !isPlainObject(src)) {
                            clone = {};
                        } else {
                            clone = src;
                        }
                        copyIsArray = false;

                        target[name] = jQuery.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    };

    jQuery.fn.extend({
        find: function (selector) {
            var i, ret,
                len = this.length,
                self = this;

            if (typeof selector !== "string") {
                return this.pushStack(jQuery(selector).filter(function () {
                    for (i = 0; i < len; i++) {
                        if (jQuery.contains(self[i], this)) {
                            return true;
                        }
                    }
                }));
            }

            ret = this.pushStack([]);

            for (i = 0; i < len; i++) {
                jQuery.find(selector, self[i], ret);
            }

            return len > 1 ? jQuery.uniqueSort(ret) : ret;
        },
    });
    jQuery.extend({
        merge: function (first, second) {
            var len = +second.length,
                j = 0,
                i = first.length;

            for (; j < len; j++) {
                first[i++] = second[j];
            }

            first.length = i;

            return first;
        },
    });

    let rootjQuery;
    const rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    const rsingleTag = (/^<([a-z][^\/0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i);
    const init = jQuery.fn.init = function (selector, context, root) {
        var match, elem;

        if (!selector) {
            return this;
        }
        root = root || rootjQuery;
        if (typeof selector === "string") {
            if (selector[0] === "<" &&
                selector[selector.length - 1] === ">" &&
                selector.length >= 3) {
                match = [null, selector, null];
            } else {
                match = rquickExpr.exec(selector);
            }

            if (match && (match[1] || !context)) {

                if (match[1]) {
                    context = context instanceof jQuery ? context[0] : context;

                    jQuery.merge(this, jQuery.parseHTML(
                        match[1],
                        context && context.nodeType ? context.ownerDocument || context : document,
                        true
                    ));

                    if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                        for (match in context) {
                            if (isFunction(this[match])) {
                                this[match](context[match]);
                            } else {
                                this.attr(match, context[match]);
                            }
                        }
                    }
                    return this;
                } else {
                    elem = document.getElementById(match[2]);

                    if (elem) {
                        this[0] = elem;
                        this.length = 1;
                    }
                    return this;
                }

            } else if (!context || context.jquery) {
                return (context || root).find(selector);
            } else {
                return this.constructor(context).find(selector);
            }
        } else if (selector.nodeType) {
            this[0] = selector;
            this.length = 1;
            return this;
        } else if (isFunction(selector)) {
            return root.ready !== undefined ?
                root.ready(selector) :
                selector(jQuery);
        }

        return jQuery.makeArray(selector, this);
    };
    init.prototype = jQuery.fn;
    rootjQuery = jQuery(document);

    if (typeof define === "function" && define.amd) {
        define("jquery", [], function () {
            return jQuery;
        });
    }
    const _jQuery = window.jQuery, _$ = window.$;
    jQuery.noConflict = function (deep) {
        if (window.$ === jQuery) {
            window.$ = _$;
        }
        if (deep && window.jQuery === jQuery) {
            window.jQuery = _jQuery;
        }
        return jQuery;
    };
    if (typeof noGlobal === "undefined") {
        window.jQuery = window.$ = jQuery;
    }
    return jQuery;
}));