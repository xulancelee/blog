/**
 * 0 entry
 * 1 naInfo
 * 2 osInfo
 * 3 isTbs
 * 4 loadJS
 * 5 GDTBanner2
 * 6
 * 7
 * 8
 * 9
 */

(function (e) {
    const u = 'EstUnion';
    const t = {};

    function n(o) {
        if (t[o]) return t[o].exports;
        let i = t[o] = {i: o, l: !1, exports: {}};
        return e[o].call(i.exports, i, i.exports, n), i.l = !0, i.exports
    }

    n.g = this;
    n.u = null;
    n.d = function (e, t, o) {
        n.o(e, t) || Object.defineProperty(e, t, {configurable: !1, enumerable: !0, get: o})
    };
    n.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return n.d(t, "a", t), t
    };
    n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    };
    n.i = function () {
        return n.u = n.g[u], n.g[u] = undefined, (delete n.g[u], 0);
    };
    n(n.s = n.i());
})([
    //0 entry
    function (t, e, i) {
        let B = i(5);
        let conf = i(6);
        let upInfo = i(14);
        let jsonp = i(15);
        if (i(3)) {
            jsonp(conf.est + '/est', upInfo, function (res) {
                new B({...res});
            });
        }
    },
    //1 naInfo
    function (t, e, i) {
        e.na = i.g.navigator;
        e.ua = e.na.userAgent;
        e.pf = e.na.platform;
    },
    //2 osInfo
    function (t, e, i) {
        let ua = i(1).ua.toLocaleLowerCase() || "";
        let pf = i(1).pf.toLocaleLowerCase() || "";
        let os = 'unknown';
        let type = 6;
        if (/baiduspider|googlebot|bingbot|sosospider|youdaobot|spider/.test(ua)) {
            os = 'spider';
            type = 4;
        } else if (!!~pf.indexOf("win") || !!~pf.indexOf("mac")) {
            os = 'pc';
            type = 3;
            if (/android|adr|ios|iphone|ipad|itouch|phone|pad|pod|ipod|mobile|blackberry|iemobile|juc|fennec|browserng|webos|symbian|windows phone/.test(ua)) {
                os = "pc to mobile";
                type = 5;
            }
        } else if (/android|adr/.test(ua)) {
            os = "android";
            type = 1;
        } else if (/ios|iphone|ipad|itouch/.test(ua)) {
            os = "ios";
            type = 2;
        }
        t.exports = {type: type, os: os, pf: pf};
    },
    //3 isTbs
    function (t, e, i) {
        let a = i(1).ua;
        t.exports = a.indexOf("TBS/") > 0 || a.indexOf("MQQBrowser/") > 0;
    },
    //4 loadJS
    function (t, e, i) {
        t.exports = function (url, call, attr, des) {
            let head = document.getElementsByTagName("head")[0];
            let s = document.createElement('script');
            des = !!des;
            for (let i in attr) s.setAttribute(i, attr[i]);
            s.onload = s.onreadystatechange = s.onerror = function () {
                if (s && s.readyState && /^(?!(?:loaded|complete)$)/.test(s.readyState)) return;
                s.onload = s.onreadystatechange = s.onerror = null;
                des && (s.src = "", s.parentNode.removeChild(s), s = undefined);
                typeof call === "function" && call();
            };
            s.type = 'text/javascript';
            s.charset = "utf-8";
            s.src = url;
            try {
                head.appendChild(s);
            } catch (e) {

            }
        }
    },
    //5 GDTBanner2
    function (t, e, i) {
        let d = function () {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var o = t[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                }
            }

            return function (t, n, o) {
                return n && e(t.prototype, n), o && e(t, o), t
            }
        }();
        let l = i(4);
        let g = i(6);
        let s = i(7);
        let b = i(8);
        let u = i(9);

        t.exports = function () {
            function c(r) {
                console.log(r);
                if (!r || !r['vl'] || this.check()) {
                    return
                }
                this.vl = r['vl'];
                this.app = r['app'];
                this.pos = r['pos'];
                //cts cdn address
                //max
                //enck 可点击
                //loaded []
                //ide 1 隐藏
                //curl
                //elc 点击次数
                //ack 已点击
                //dt 点击延时
                //p 广告dom
                //cws callWithScame
                //bck
                this.opt = {
                    est: 'https://c.cdlkzb.com',
                    loaded: [],
                    max: r['max'] || 3,
                    enck: r['enck'],
                    ide: 1
                };
                if (r['elc']) {
                    this.opt.elc = r['elc'];
                    this.opt.dt = s();
                    this.opt.curl = [
                        'https://n.35kds.com/clickad/prd' +
                        '?screen_width=' + b.screen_width,
                        'osType=' + b.osType,
                        "domains=" + b.domains,
                        "uatype=" + u,
                        "pr_id=" + r["pr_id"],
                        "relatedid=" + (b.osType === 2 ? '8546' : "8545"),
                        "type="
                    ].join('&');

                    r["elc"] === 2 && (this.opt.cws = i(10));
                    r["elc"] === 3 && (this.opt.bck = i(11));
                }

                this.init();
            }

            return d(c, [
                {
                    key: 'init',
                    value: function () {
                        var div = document.createElement("div");
                        div.id = 'banner_2_0';
                        div.style.width = '100%';
                        i.u && i.u[0] && i.u[0].node && i.u[0].node.parentNode.insertBefore(div, i.u[0].node);

                        var gi = {
                            placement_id: this.pos,
                            app_id: this.app,
                            type: 'native',
                            display_type: 'banner',
                            carousel: 3000,
                            containerid: div.id,
                            vl: this.vl,
                            opt: this.opt,
                            est_f: function () {
                                console.log('has res');
                            },
                            est_e: function () {
                                console.log('has exp');
                            },
                            est_c: function () {
                                console.log('has clk');
                            },
                            onComplete: function (res) {
                                if (res["ret"] == 0) {
                                    console.log("success")
                                } else {
                                    console.log("error")
                                }
                            }
                        };

                        window.TencentGDT = [];
                        TencentGDT.push(gi);
                        console.log(i.u);
                        l(g.src.replace(/(beta|v\d+)/, sub => 'i.' + sub))
                    }
                },
                {
                    key: 'check',
                    value: function () {
                        var s = [].slice.call(window.document.getElementsByTagName("script")),
                            f = !1;
                        s.forEach(function (n, i) {
                            s.src && s.src.indexOf("qzs.qq.com/qzone/biz/res/i.js") > 0 && (f = !0);
                        });
                        console.log(f);
                        return f;
                    }
                },
            ]), c;
        }();
    },
    //6 conf
    function (t, e, i) {
        t.exports = {
            est: '//www.xulance.com',
            src: i.u[0].node.src
        }
    },
    //7 showTimeNum
    function (t, e, i) {
        t.exports = function () {
            var r, t;
            t = Math.floor(Math.random() * 100 + 1);
            if (t <= 70) {
                r = Math.floor(Math.random() * 13000 + 2000)
            } else if (t <= 95) {
                r = Math.floor(Math.random() * 15000 + 15000)
            } else if (t <= 99) {
                r = Math.floor(Math.random() * 15000 + 30000)
            } else {
                r = Math.floor(Math.random() * 75000 + 45000)
            }
            return r
        }
    },
    //8 baseInfo
    function (t, e, i) {
        var r = {};
        var o = i(2).type;

        r.osType = o;
        r.domains = document.domain;
        r.pr_id = '1023';
        try {
            var b = window.devicePixelRatio || 1;
            var screen = window.screen;
            if (screen) {
                r.screen_width = screen.width;
                r.screen_height = screen.height;
            } else if (document.body) {
                r.screen_width = document.body.clientWidth * b;
                r.screen_height = document.body.clientHeight * b
            }
        } catch (e) {

        }

        try {
            if (document.referrer.length > 0) {
                r.domains = document.referrer
            }
            if (r.domains.length === 0 && opener && opener.location.href.length > 0) {
                r.domains = opener.location.href
            }
        } catch (e) {

        }

        t.exports = r;
    },
    //9 uaType
    function (t, e, i) {
        var u = i(1).ua.toLowerCase(),
            r = 'other',
            n = {
                Wechat: /micromessenger/,
                QQBrowser: /qqbrowser/,
                BaiduBoxApp: /baiduhd|baiduboxapp/,
                BaiduInput: /baiduinput/,
                MobileBaidu: /bidubrowser|baidubrowser/,
                UC: /ubrowser|ucbrowser|ucweb/,
                SamsungBrowser: /samsungbrowser/,
                MiuiBrowser: /miuibrowser/,
                Sogou: /sogoumobilebrowser|sogousearch/,
                Explorer2345: /2345explorer|2345chrome|mb2345browser/,
                Liebao: /lbbrowser/,
                Weibo: /__weibo__/,
                OPPO: /oppobrowser/,
                VIVO: /vivobrowser/,
                toutiao: /newsarticle/,
                MobileQQ: /mobile.*qq/,
                Firefox: /firefox/,
                Maxthon: /maxthon/,
                Mobile360: /360browser/,
                Se360: /360se/,
                Ee360: /360ee/,
                Safari: /(iphone|ipad).*version.*mobile.*safari/,
                Chrome: /chrome|crios/,
                AndroidBrowser: /android.*safari|android.*release.*browser/
            };
        for (var k in n) if (n[k].test(u)) {
            r = k;
            break
        }
        t.exports = r;
    },
    //10 callWithSchema
    function (t, e, i) {
        t.exports = function (a, b) {
            var c = document.createElement('iframe');
            b && (c.id = b);
            c.style.cssText = 'position:absolute;left:0;top:0;width:0;height:0;visibility:hidden;';
            c.frameBorder = '0';
            c.src = a;
            try {
                document.body.appendChild(c)
            } catch (e) {

            }
            return c
        }
    },
    //11 backEventInit
    function (t, e, i) {
        var backEvents = [];

        window.amb_jd_proxy_bs_plug = function (h) {
            var s = {title: "title", url: "#" + new Date().getTime()};
            window.history.pushState(s, "title", "#" + new Date().getTime());
            setTimeout(function () {
                window.addEventListener("popstate", h, false)
            })
        };

        t.exports = function (a, b) {
            backEvents.push(a);
            var c = function () {
                b && b(), window.amb_jd_proxy_bs_plug(function () {
                    var a = backEvents.pop();
                    typeof a === 'function' && a()
                })
            };
            window.amb_jd_proxy_bs_plug && typeof window.amb_jd_proxy_bs_plug == 'function' && c();
        }
    },
    //12 getInfo
    function (t, e, i) {

    },
    //13 ajax
    function (t, e, i) {
        t.exports = function (a, b, c, d) {
            var f = null;
            if (window.XMLHttpRequest) {
                var g = setTimeout(d || function () {
                }, 5000);
                f = new XMLHttpRequest();
                if ("withCredentials" in f) {
                    f.open('POST', a, true);
                    f.setRequestHeader("Content-Type", "text/plain");
                    f.onreadystatechange = function () {
                        if (f.readyState == 4) {
                            clearTimeout(g);
                            if (f.status == 200) {
                                c && c(f.responseText)
                            } else {
                                d && d()
                            }
                        }
                    };
                    f.send(b)
                } else if (window.XDomainRequest) {
                    f = new XDomainRequest();
                    if (f) {
                        f.open("POST", a, true);
                        f.onerror = function () {
                            d && d()
                        };
                        f.ontimeout = function () {
                            console.log('XDR 请求连接超时'), d && d()
                        };
                        f.onload = function () {
                            c(f.responseText)
                        };
                        f.timeout = e.timeout || 5000;
                        f.send(b)
                    }
                }
            } else {
                alert("Your browser does not support XMLHTTP.")
            }
        }
    },
    //14 upInfo
    function (t, e, i) {
        t.exports = {
            cw: document.body.clientWidth,
            ch: document.body.clientHeight,
            dpr: window.devicePixelRatio || 1,
            pf: navigator.platform,
            network: navigator.connection ? navigator.connection.effectiveType : 'unknown',
            version: 1
        }
    },
    //15 jsonp
    function (t, e, i) {
        var o = i(16);
        var l = i(4);
        t.exports = function (a, b, c, d) {
            var p = '_est_' + Math.random().toString(32).slice(2).toUpperCase();
            var url = a + '?callback=' + p + o(b) + '&t=' + new Date().getTime();
            var s = !1;
            var t = setTimeout(d ||function () {

            }, 10000);
            var e = function () {
                clearTimeout(t);
                t = null;
                !s && d && d();
            };
            window[p] = function (r) {
                delete window[p];
                s = !0;
                c && c(r);
            };
            l(url, e, null, !0);
        }
    },
    //16 urlEncode
    function (t, e, i) {
        t.exports = function o(a, b, c) {
            if (a == null) return '';
            var d = '';
            var t = typeof (a);
            if (t === 'string' || t === 'number' || t === 'boolean') {
                d += '&' + b + '=' + ((c == null || c) ? encodeURIComponent(a) : a)
            } else {
                for (var i in a) {
                    var k = b == null ? i : b + (a instanceof Array ? '[' + i + ']' : '.' + i);
                    d += o(a[i], k, c);
                }
            }
            return d
        }
    }
]);