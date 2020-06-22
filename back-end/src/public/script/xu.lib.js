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
    const xhrChange = function (xhr) {
        return new Promise((resolve, reject) => {
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    let contentType = xhr.getResponseHeader('Content-Type');
                    let content = xhr.response;
                    if (xhr.status >= 200 && xhr.status < 300) {
                        if (contentType.indexOf('json')) {
                            try {
                                let res = JSON.parse(content);
                                resolve(res);
                            } catch (e) {
                                reject(new SyntaxError('Response Json data parsing error.'));
                            }
                        } else resolve(content)
                    } else reject(xhr);
                }
            }
        });
    };

    function xuLib(selector, context) {
        return new xuLib.xu.Init(selector, context);
    }

    function Xu(selector, context) {
        context = context || document;
        this.$e = typeof selector === "string" ? context.querySelector(selector) : selector;
        this.context = context;
    }

    xuLib.xu = Xu.prototype = {
        constructor: xuLib,
        ver: version,
        on: function (event, filter, handler, isOne) {
            if (typeof filter === 'function') {
                handler = filter;
                filter = undefined;
            }
            let _t = this;
            let proxy = function (ev) {
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
                    handler.call(target, ev);
                } else if (!filter) handler.call(_t.$e, ev);
                if (isOne) _t.$e.removeEventListener(event, proxy);
            };
            this.$e.addEventListener(event, proxy);
            return this;
        },
        one: function (event, filter, handler) {
            this.on(event, filter, handler, true);
            return this;
        },
        off: function (event, handler) {
            this.$e.removeEventListener(event, handler);
            return this;
        },
        find: function (selector) {
            return xuLib(this.query(selector));
        },
        is: function (selector) {
            if (!this.$e || this.$e === document) return false;
            let $parent = this.parent();
            if (!$parent.$e) return false;
            return hasIn($parent.queryAll(selector), this.$e)
        },
        val: function (val) {
            let has = val !== undefined;
            switch (this.$e.tagName) {
                case 'textarea':
                    if (has) this.$e.innerHTML = val;
                    else return this.$e.innerHTML;
                    break;
                case 'input':
                default:
                    if (has) this.$e.value = val;
                    else return this.$e.value;
                    break;
            }
            return this;
        },
        html: function (html) {
            let has = html !== undefined;
            html = html instanceof Array ? html : [html];
            if (has) this.$e.innerHTML = html.join('');
            else return this.$e.innerHTML;
            return this;
        },
        text: function (text) {
            let has = text !== undefined;
            text = text instanceof Array ? text : [text];
            if (has) this.$e.innerText = text.join('');
            else return this.$e.innerText;
            return this;
        },
        up: function (selector) {
            let $tar = this;
            while (!$tar.is(selector) && $tar.$e !== document.body) {
                $tar = $tar.parent();
            }
            return $tar;
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
        addClass: function (className) {
            this.$e.classList.add(className);
            return this;
        },
        removeClass: function (className) {
            this.$e.classList.remove(className);
            return this;
        },
        query: function (selector) {
            return this.$e.querySelector(selector)
        },
        queryAll: function (selector) {
            return this.$e.querySelectorAll(selector)
        },
        formData: function (type) {
            function append(key, value) {
                type !== 'form' ? (data[key] = value) : data.append(key, value);
            }

            let data = type !== 'form' ? {} : new FormData();
            this.queryAll('input,textarea,select').forEach(function (item) {
                let val = item.value || item.getAttribute('data-val') || item.getAttribute('placeholder') || '';
                append(item.name, val);
            });
            return data;
        }
    };
    xuLib.xu.Init = Xu;
    xuLib.getAuth = function () {
        return localStorage.getItem('__USER_AUTHORIZATION');
    };
    xuLib.setAuth = function (token) {
        localStorage.setItem('__USER_AUTHORIZATION', token);
    };
    xuLib.get = function (url) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.setRequestHeader('Authorization', this.getAuth());
        xhr.send();
        return xhrChange(xhr);
    };
    xuLib.post = function (url, data) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Authorization', this.getAuth());
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhr.send(JSON.stringify(data));
        return xhrChange(xhr);
    };
    xuLib.upload = function (url, formData) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Authorization', this.getAuth());
        xhr.send(formData);
        return xhrChange(xhr);
    };

    if (noGlobal) return window.xuLib = window.$ = xuLib;
    return global.xuLib = global.$ = xuLib;
}));