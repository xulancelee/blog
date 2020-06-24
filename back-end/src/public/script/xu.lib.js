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
    const noop = function () {
    };
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
                    } else {
                        let errorInfo = {
                            status: xhr.status
                        };
                        if (content) {
                            try {
                                errorInfo['response'] = JSON.parse(content);
                            } catch (e) {
                                errorInfo['response'] = null;
                                errorInfo['error'] = new SyntaxError('Response Json data parsing error.');
                            }
                        }
                        reject(errorInfo);
                    }
                }
            }
        }).catch(function (errorInfo) {
            let res = errorInfo.response;
            if (res) {
                if (res.code === 301 || res.code === 302) location.href = res.data;
                else if (res.code === 401) location.href = '/sign';
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
        on(event, filter, handler, isOne) {
            if (typeof filter === 'function') {
                handler = filter;
                filter = undefined;
            }
            let _t = this;
            let proxy = function (ev) {
                function catchTarget() {
                    while (target && target !== _t.$e) {
                        if (hasIn(filterList, target)) break;
                        target = target.parent;
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
        one(event, filter, handler) {
            this.on(event, filter, handler, true);
            return this;
        },
        off(event, handler) {
            this.$e.removeEventListener(event, handler);
            return this;
        },
        find(selector) {
            return xuLib(this.query(selector));
        },
        is(selector) {
            if (!this.$e || this.$e === document) return false;
            let $parent = this.parent();
            if (!$parent.$e) return false;
            return hasIn($parent.queryAll(selector), this.$e)
        },
        val(val) {
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
        html(html) {
            let has = html !== undefined;
            html = html instanceof Array ? html : [html];
            if (has) this.$e.innerHTML = html.join('');
            else return this.$e.innerHTML;
            return this;
        },
        text(text) {
            let has = text !== undefined;
            text = text instanceof Array ? text : [text];
            if (has) this.$e.innerText = text.join('');
            else return this.$e.innerText;
            return this;
        },
        attr(key, val) {
            let has = val !== undefined;
            if (has) this.$e.setAttribute(key, val);
            else return this.$e.getAttribute(key);
            return this;
        },
        focus() {
            this.$e.focus();
            return this;
        },
        up(selector) {
            let $tar = this;
            while (!$tar.is(selector) && $tar.$e !== document.body) {
                $tar = $tar.parent();
            }
            return $tar;
        },
        parent() {
            return xuLib(this.$e.parentElement || this.$e.parentNode);
        },
        sibling(selector) {
            return xuLib(this.parent().query(selector));
        },
        toggleClass(className) {
            this.$e.classList.toggle(className);
            return this;
        },
        addClass(className) {
            this.$e.classList.add(className);
            return this;
        },
        removeClass(className) {
            this.$e.classList.remove(className);
            return this;
        },
        query(selector) {
            return this.$e.querySelector(selector)
        },
        queryAll(selector) {
            return this.$e.querySelectorAll(selector)
        },
        formData(type) {
            function append(key, value) {
                type !== 'form' ? (data[key] = value) : data.append(key, value);
            }

            let data = type !== 'form' ? {} : new FormData();
            this.queryAll('input,textarea,select').forEach(function (item) {
                let type = item.type;
                switch (type) {
                    case 'file':
                        let files = item.files;
                        for (let i = 0; i < files.length; i++) append(item.name, files[0]);
                        break;
                    case 'text':
                    default:
                        let val = item.value || item.getAttribute('data-val') || '';
                        append(item.name, val);
                        break;
                }
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
    xuLib.clearAuth = function () {
        localStorage.removeItem('__USER_AUTHORIZATION');
        localStorage.removeItem('__USER_INFO');
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
    xuLib.upload = function (url, formData, fnProgress) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Authorization', this.getAuth());
        xhr.send(formData);
        xhr.upload.onprogress = typeof fnProgress === "function" ? fnProgress : noop;
        return xhrChange(xhr);
    };

    if (noGlobal) return window.xuLib = window.$ = xuLib;
    return global.xuLib = global.$ = xuLib;
}));