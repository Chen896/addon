!
function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e(window.jQuery || window.Zepto)
} (function(e, t) {
    function n() {}
    function i(e, t) {
        var n;
        return n = t._$container == u ? ("innerHeight" in p ? p.innerHeight: u.height()) + u.scrollTop() : t._$container.offset().top + t._$container.height(),
        n <= e.offset().top - t.threshold
    }
    function r(t, n) {
        var i;
        return i = n._$container == u ? u.width() + (e.fn.scrollLeft ? u.scrollLeft() : p.pageXOffset) : n._$container.offset().left + n._$container.width(),
        i <= t.offset().left - n.threshold
    }
    function o(e, t) {
        var n;
        return n = t._$container == u ? u.scrollTop() : t._$container.offset().top,
        n >= e.offset().top + t.threshold + e.height()
    }
    function a(t, n) {
        var i;
        return i = n._$container == u ? e.fn.scrollLeft ? u.scrollLeft() : p.pageXOffset: n._$container.offset().left,
        i >= t.offset().left + n.threshold + t.width()
    }
    function s(e, t) {
        var n = 0;
        e.each(function(s, l) {
            function c() {
                d.trigger("_lazyload_appear"),
                n = 0
            }
            var d = e.eq(s);
            if (! (d.width() <= 0 && d.height() <= 0 || "none" === d.css("display"))) if (t.vertical_only) if (o(d, t));
            else if (i(d, t)) {
                if (++n > t.failure_limit) return ! 1
            } else c();
            else if (o(d, t) || a(d, t));
            else if (i(d, t) || r(d, t)) {
                if (++n > t.failure_limit) return ! 1
            } else c()
        })
    }
    function l(e) {
        return e.filter(function(t, n) {
            return ! e.eq(t)._lazyload_loadStarted
        })
    }
    function c(e, t) {
        function n() {
            a = 0,
            s = +new Date,
            o = e.apply(i, r),
            i = null,
            r = null
        }
        var i, r, o, a, s = 0;
        return function() {
            i = this,
            r = arguments;
            var e = new Date - s;
            return a || (e >= t ? n() : a = setTimeout(n, t - e)),
            o
        }
    }
    var d, p = window,
    u = e(p),
    f = {
        threshold: 0,
        failure_limit: 0,
        event: "scroll",
        effect: "show",
        effect_params: null,
        container: p,
        data_attribute: "original",
        data_srcset_attribute: "original-srcset",
        skip_invisible: !0,
        appear: n,
        load: n,
        vertical_only: !1,
        check_appear_throttle_time: 300,
        url_rewriter_fn: n,
        no_fake_img_loader: !1,
        placeholder_data_img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC",
        placeholder_real_img: "http://ditu.baidu.cn/yyfm/lazyload/0.0.1/img/placeholder.png"
    };
    d = function() {
        var e = Object.prototype.toString;
        return function(t) {
            return e.call(t).replace("[object ", "").replace("]", "")
        }
    } (),
    e.fn.hasOwnProperty("lazyload") || (e.fn.lazyload = function(t) {
        var i, r, o, a = this;
        return e.isPlainObject(t) || (t = {}),
        e.each(f,
        function(n, i) { - 1 != e.inArray(n, ["threshold", "failure_limit", "check_appear_throttle_time"]) ? "String" == d(t[n]) ? t[n] = parseInt(t[n], 10) : t[n] = i: "container" == n ? (t.hasOwnProperty(n) ? t[n] == p || t[n] == document ? t._$container = u: t._$container = e(t[n]) : t._$container = u, delete t.container) : !f.hasOwnProperty(n) || t.hasOwnProperty(n) && d(t[n]) == d(f[n]) || (t[n] = i)
        }),
        i = "scroll" == t.event,
        o = 0 == t.check_appear_throttle_time ? s: c(s, t.check_appear_throttle_time),
        r = i || "scrollstart" == t.event || "scrollstop" == t.event,
        a.each(function(i, o) {
            var s = this,
            c = a.eq(i),
            d = c.attr("src"),
            p = c.attr("data-" + t.data_attribute),
            u = t.url_rewriter_fn == n ? p: t.url_rewriter_fn.call(s, c, p),
            f = c.attr("data-" + t.data_srcset_attribute),
            h = c.is("img");
            return 1 == c._lazyload_loadStarted || d == u ? (c._lazyload_loadStarted = !0, void(a = l(a))) : (c._lazyload_loadStarted = !1, h && !d && c.one("error",
            function() {
                c.attr("src", t.placeholder_real_img)
            }).attr("src", t.placeholder_data_img), c.one("_lazyload_appear",
            function() {
                function i() {
                    r && c.hide(),
                    h ? (f && c.attr("srcset", f), u && c.attr("src", u)) : c.css("background-image", 'url("' + u + '")'),
                    r && c[t.effect].apply(c, o ? t.effect_params: []),
                    a = l(a)
                }
                var r, o = e.isArray(t.effect_params);
                c._lazyload_loadStarted || (r = "show" != t.effect && e.fn[t.effect] && (!t.effect_params || o && 0 == t.effect_params.length), t.appear != n && t.appear.call(s, c, a.length, t), c._lazyload_loadStarted = !0, t.no_fake_img_loader || f ? (t.load != n && c.one("load",
                function() {
                    t.load.call(s, c, a.length, t)
                }), i()) : e("<img />").one("load",
                function() {
                    i(),
                    t.load != n && t.load.call(s, c, a.length, t)
                }).attr("src", u))
            }), void(r || c.on(t.event,
            function() {
                c._lazyload_loadStarted || c.trigger("_lazyload_appear")
            })))
        }),
        r && t._$container.on(t.event,
        function() {
            o(a, t)
        }),
        u.on("resize load",
        function() {
            o(a, t)
        }),
        e(function() {
            o(a, t)
        }),
        this
    })
}),
!
function() {
    function e(e) {
        return e.replace(v, "").replace($, ",").replace(w, "").replace(j, "").replace(k, "").split(b)
    }
    function t(e) {
        return "'" + e.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'"
    }
    function n(n, i) {
        function r(e) {
            return u += e.split(/\n/).length - 1,
            d && (e = e.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")),
            e && (e = y[1] + t(e) + y[2] + "\n"),
            e
        }
        function o(t) {
            var n = u;
            if (c ? t = c(t, i) : a && (t = t.replace(/\n/g,
            function() {
                return u++,
                "$line=" + u + ";"
            })), 0 === t.indexOf("=")) {
                var r = p && !/^=[=#]/.test(t);
                if (t = t.replace(/^=[=#]?|[\s;]*$/g, ""), r) {
                    var o = t.replace(/\s*\([^\)]+\)/, "");
                    f[o] || /^(include|print)$/.test(o) || (t = "$escape(" + t + ")")
                } else t = "$string(" + t + ")";
                t = y[1] + t + y[2]
            }
            return a && (t = "$line=" + n + ";" + t),
            g(e(t),
            function(e) {
                if (e && !_[e]) {
                    var t;
                    t = "print" === e ? $: "include" === e ? w: f[e] ? "$utils." + e: h[e] ? "$helpers." + e: "$data." + e,
                    j += e + "=" + t + ",",
                    _[e] = !0
                }
            }),
            t + "\n"
        }
        var a = i.debug,
        s = i.openTag,
        l = i.closeTag,
        c = i.parser,
        d = i.compress,
        p = i.escape,
        u = 1,
        _ = {
            $data: 1,
            $filename: 1,
            $utils: 1,
            $helpers: 1,
            $out: 1,
            $line: 1
        },
        m = "".trim,
        y = m ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"],
        v = m ? "$out+=text;return $out;": "$out.push(text);",
        $ = "function(){var text=''.concat.apply('',arguments);" + v + "}",
        w = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + v + "}",
        j = "'use strict';var $utils=this,$helpers=$utils.$helpers," + (a ? "$line=0,": ""),
        k = y[0],
        b = "return new String(" + y[3] + ");";
        g(n.split(s),
        function(e) {
            e = e.split(l);
            var t = e[0],
            n = e[1];
            1 === e.length ? k += r(t) : (k += o(t), n && (k += r(n)))
        });
        var C = j + k + b;
        a && (C = "try{" + C + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + t(n) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");
        try {
            var x = new Function("$data", "$filename", C);
            return x.prototype = f,
            x
        } catch(A) {
            throw A.temp = "function anonymous($data,$filename) {" + C + "}",
            A
        }
    }
    var i = function(e, t) {
        return "string" == typeof t ? m(t, {
            filename: e
        }) : a(e, t)
    };
    i.version = "3.0.0",
    i.config = function(e, t) {
        r[e] = t
    };
    var r = i.defaults = {
        openTag: "<%",
        closeTag: "%>",
        escape: !0,
        cache: !0,
        compress: !1,
        parser: null
    },
    o = i.cache = {};
    i.render = function(e, t) {
        return m(e, t)
    };
    var a = i.renderFile = function(e, t) {
        var n = i.get(e) || _({
            filename: e,
            name: "Render Error",
            message: "Template not found"
        });
        return t ? n(t) : n
    };
    i.get = function(e) {
        var t;
        if (o[e]) t = o[e];
        else if ("object" == typeof document) {
            var n = document.getElementById(e);
            if (n) {
                var i = (n.value || n.innerHTML).replace(/^\s*|\s*$/g, "");
                t = m(i, {
                    filename: e
                })
            }
        }
        return t
    };
    var s = function(e, t) {
        return "string" != typeof e && (t = typeof e, "number" === t ? e += "": e = "function" === t ? s(e.call(e)) : ""),
        e
    },
    l = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    },
    c = function(e) {
        return l[e]
    },
    d = function(e) {
        return s(e).replace(/&(?![\w#]+;)|[<>"']/g, c)
    },
    p = Array.isArray ||
    function(e) {
        return "[object Array]" === {}.toString.call(e)
    },
    u = function(e, t) {
        var n, i;
        if (p(e)) for (n = 0, i = e.length; i > n; n++) t.call(e, e[n], n, e);
        else for (n in e) t.call(e, e[n], n)
    },
    f = i.utils = {
        $helpers: {},
        $include: a,
        $string: s,
        $escape: d,
        $each: u
    };
    i.helper = function(e, t) {
        h[e] = t
    };
    var h = i.helpers = f.$helpers;
    i.onerror = function(e) {
        var t = "Template Error\n\n";
        for (var n in e) t += "<" + n + ">\n" + e[n] + "\n\n";
        "object" == typeof console && console.error(t)
    };
    var _ = function(e) {
        return i.onerror(e),
        function() {
            return "{Template Error}"
        }
    },
    m = i.compile = function(e, t) {
        function i(n) {
            try {
                return new l(n, s) + ""
            } catch(i) {
                return t.debug ? _(i)() : (t.debug = !0, m(e, t)(n))
            }
        }
        t = t || {};
        for (var a in r) void 0 === t[a] && (t[a] = r[a]);
        var s = t.filename;
        try {
            var l = n(e, t)
        } catch(c) {
            return c.filename = s || "anonymous",
            c.name = "Syntax Error",
            _(c)
        }
        return i.prototype = l.prototype,
        i.toString = function() {
            return l.toString()
        },
        s && t.cache && (o[s] = i),
        i
    },
    g = f.$each,
    y = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",
    v = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,
    $ = /[^\w$]+/g,
    w = new RegExp(["\\b" + y.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"),
    j = /^\d[^,]*|,\d[^,]*/g,
    k = /^,+|,+$/g,
    b = /^$|,+/;
    r.openTag = "{{",
    r.closeTag = "}}";
    var C = function(e, t) {
        var n = t.split(":"),
        i = n.shift(),
        r = n.join(":") || "";
        return r && (r = ", " + r),
        "$helpers." + i + "(" + e + r + ")"
    };
    r.parser = function(e) {
        e = e.replace(/^\s/, "");
        var t = e.split(" "),
        n = t.shift(),
        r = t.join(" ");
        switch (n) {
        case "if":
            e = "if(" + r + "){";
            break;
        case "else":
            t = "if" === t.shift() ? " if(" + t.join(" ") + ")": "",
            e = "}else" + t + "{";
            break;
        case "/if":
            e = "}";
            break;
        case "each":
            var o = t[0] || "$data",
            a = t[1] || "as",
            s = t[2] || "$value",
            l = t[3] || "$index",
            c = s + "," + l;
            "as" !== a && (o = "[]"),
            e = "$each(" + o + ",function(" + c + "){";
            break;
        case "/each":
            e = "});";
            break;
        case "echo":
            e = "print(" + r + ");";
            break;
        case "print":
        case "include":
            e = n + "(" + t.join(",") + ");";
            break;
        default:
            if (/^\s*\|\s*[\w\$]/.test(r)) {
                var d = !0;
                0 === e.indexOf("#") && (e = e.substr(1), d = !1);
                for (var p = 0,
                u = e.split("|"), f = u.length, h = u[p++]; f > p; p++) h = C(h, u[p]);
                e = (d ? "=": "=#") + h
            } else e = i.helpers[n] ? "=#" + n + "(" + t.join(",") + ");": "=" + e
        }
        return e
    },
    "function" == typeof define ? define(function() {
        return i
    }) : "undefined" != typeof exports ? module.exports = i: this.template = i
} (),
function(e) {
    e.fn.snsShare = function(t) {
        var n = {
            tsina: {
                url: encodeURIComponent(window.location.href),
                title: document.title,
                appkey: 3234732766,
                pic: "http://www.xuanfengge.com/wp-content/themes/lee/images/logo.png"
            },
            renren: {
                resourceUrl: encodeURIComponent(window.location.href),
                srcUrl: encodeURIComponent(window.location.href),
                title: document.title,
                appkey: 243319,
                pic: "http://www.xuanfengge.com/wp-content/themes/lee/images/logo.png"
            },
            tqq: {
                url: encodeURIComponent(window.location.href),
                title: document.title,
                appkey: 801435972,
                pic: "http://www.xuanfengge.com/wp-content/themes/lee/images/logo.png"
            },
            tqzone: {
                url: encodeURIComponent(window.location.href),
                title: document.title,
                appkey: 100566135,
                pic: "http://www.xuanfengge.com/wp-content/themes/lee/images/logo.png"
            }
        },
        i = e.extend(!0, {},
        n, t),
        r = {
            tsina: "新浪微博",
            renren: "人人网",
            tqq: "腾讯微博",
            tqzone: "QQ空间"
        },
        o = {
            tsina: "http://service.weibo.com/share/share.php?url={url}&title={title}&appkey={appkey}&pic={pic}",
            renren: "http://widget.renren.com/dialog/share?resourceUrl={resourceUrl}&srcUrl={srcUrl}&title={title}&appkey={appkey}&pic={pic}",
            tqq: "http://share.v.t.qq.com/index.php?c=share&a=index&url={url}&title={title}&appkey={appkey}&pic={pic}",
            tqzone: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&pics={pic}&title={title}&summary=轩枫阁"
        };
        return e(this).each(function() {
            function t(e) {
                return function() {
                    window.open(n(o[e], i[e]))
                }
            }
            function n(e, t) {
                for (var n in t) {
                    var i = new RegExp("{" + n + "}", "g");
                    e = e.replace(i, t[n])
                }
                return e
            }
            for (snsName in i) {
                var a = encodeURIComponent(i[snsName].title);
                i[snsName].title = a
            }
            for (sns in o) e(".js_share_" + sns).off().on("click", t(sns)).attr("title", "分享到" + r[sns]).attr("href", "javascript:;")
        })
    }
} (jQuery),
function(e, t) {
    "undefined" != typeof module && module.exports ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Piano = t.call(e)
} (this,
function() {
    "use strict";
    var e = function(e) {
        this.options = $.extend({
            albumList: {
                "小星星": "11556650443322105544332055443320115566504433221",
                "茉莉花": "33568865056503356886505650555356066503235032101210321203568650523532121",
                "光阴的故事": "555653323138868650886865565135565320555653323138868650886865565358886789",
                "找朋友": "5656565058765530553355302432121",
                "上学歌": "12315066865066805630653531231",
                "一分钱": "5868503523503568565351032032123065356058865630523210",
                "征服": "58755650587563606665334044456322",
                "大约在冬季": "4440456880689665606542206542202455555658",
                "沧海一声笑": "998654065421012124456809986545",
                "童话": "543034303434321013560665224301356066765434321",
                "我爱北京天安门": "58543210112331345058543520432650231536876750999870675053687678905678905888",
                "同桌的你": "5555345706666465055557654044443210888856888809999876077777890507789878",
                "葫芦兄弟": "1130113066656513086656051207535",
                "祝你一路顺风": "3230321556503566666350366656685556312223212032303215565035666663503666566855531012223211018888986563012012320188898656805605689",
                "老男孩": "55550565403678750556112350545312055550565403678750556112350543211",
                "菊花台": "3323035323011235302212035365065535032353221",
                "回忆里的疯狂": "111543212330135666876545566687655321023434211023434311",
                "小熊和洋娃娃": "1023455543444321351023455543444321316066545554344432135606654555434044321031",
                "爱情转移": "187767605653235650565666656530123532101235321011108888686865",
                "红尘客栈": "1260126045065415012502405678097606676545067046756076536033677053567605350679765",
                "小红帽": "12345031806450301234532120302050123450318064503012345321203010108064501080645030123453212030101",
                "魔法城堡": "58856687650344345650568776598",
                "发如雪": "23302353023302365306122612061232023302353023305236530612261220123206161612206161613103336533052332356501236535",
                "爱情买卖": "36883680776530222623503775303688368000989000989987053566",
                "粉刷匠": "5353531024325053535310243210224432502432505353531024321",
                "小苹果": "66678998076767055567987065656",
                "小苹果[长版]": "60405020654502060405055086304043203450109860605405656580888880604050206545020604050550863040432034501098606054056501020242",
                "送别": "5358068505123021205358076850512301106880767806786065312053580768505123011",
                "Big big world": "123330342220231110123201233303422202310322",
                "命运交响曲": "334554321123322033455432112321102231234321210334554321123211",
                "爸爸去哪儿": "150150333253066678760533015015033337608645678"
            },
            keyboard: {
                1 : "A",
                2 : "S",
                3 : "D",
                4 : "F",
                5 : "G",
                6 : "H",
                7 : "J",
                8 : "K",
                9 : "L"
            },
            playKeyCallback: null,
            randomPlay: !0,
            timeSpace: 50,
            keyLen: 9
        },
        e),
        this.property = {
            opernLink: "",
            timeRuner: null,
            timeCount: 0,
            step: 0,
            lazyTimer: [],
            extraTimer: null,
            key: {},
            audioReady: 0,
            playing: !1
        },
        this.init()
    };

    return e.prototype = {
        init: function() {
            this.initAudio()
        },
        getAudioFormat: function() {
            var e = document.createElement("audio");
            if (e.canPlayType) {
                var t = e.canPlayType("audio/mpeg");
                e.canPlayType('audio/ogg; codecs="vorbis"');
                return t ? "mp3": "ogg"
            }
            return null
        },
        initAudio: function() {
            var e = this.getAudioFormat(),
            t = "http://www.xuanfengge.com/wp-content/themes/lee3.0/dist/media/{{key}}." + e;
            "localhost" == location.hostname && (t = media + "/media/{{key}}." + e);
            for (var n = 1; n <= this.options.keyLen; n++) this.loadAudio(n, t.replace(/{{key}}/g, n))
        },

        loadAudio: function(e, t) {
            var n = this,
            i = new Audio;
            i.addEventListener("canplay",
            function() {
                n.checkReady(e, !0)
            }),
            i.addEventListener("error",
            function() {
                n.checkReady(e, !1)
            }),
            i.src = t,
            this.property.key[e] = i
        },
        checkReady: function(e, t) {
            this.property.audioReady++,
            this.property.audioReady == this.options.keyLen && (this.listenEvents(), /\/\#music=(\d:\d-?)*/.test(location.href) ? this.autoPlay(location.href) : this.options.randomPlay && parseInt(10 * Math.random()) < 2 && this.autoPlay("#music=1:0-2:3-3:2-4:2-5:2-6:2-7:2-8:2-9:2"))
        },
        autoPlay: function(e) {
            var t = e.search(/#music=/) + 7,
            n = e.length,
            i = e.substring(t, n),
            r = i.split("-"),
            o = this.parseData(r);
            this.previewSong(o)
        },
        playKey: function(e) {
            if (this.property.audioReady) try {
                var t = this.property.key[e];
                t.currentTime = 0,
                t.play(),
                this.options.playKeyCallback && this.options.playKeyCallback(e)
            } catch(n) {
                console.log(n)
            }
        },
        _timeRun: function() {
            var e = this;
            this.property.step = 0,
            clearInterval(this.property.timeRuner),
            this.property.timeRuner = setInterval(function() {
                e.property.step += e.options.timeSpace,
                e.property.timeCount = e.property.step
            },
            e.options.timeSpace)
        },
        record: function(e) {
            if (this.property.playing) if (this.property.opernLink) if (e) {
                var t = this.property.timeCount / this.options.timeSpace;
                this.property.opernLink += "-" + e + ":" + t,
                this._timeRun()
            } else this.property.opernLink += "-" + e + ":0";
            else this.property.opernLink += e + ":0",
            this._timeRun()
        },
        startRecord: function() {
            this.property.opernLink = "",
            this.property.playing = !0
        },
        finishRecord: function() {
            return this.property.playing = !1,
            location.origin + "#music=" + this.property.opernLink
        },
        cancelRecord: function() {
            this.property.opernLink = "",
            this.property.playing = !1
        },
        getStatus: function() {
            return this.property.playing
        },
        listenEvents: function() {
            var e = this;
            $(document).on("keydown",
            function(t) {
                49 == t.keyCode || 97 == t.keyCode || 65 == t.keyCode ? (e.playKey(1), e.record(1)) : 50 == t.keyCode || 98 == t.keyCode || 83 == t.keyCode ? (e.playKey(2), e.record(2)) : 51 == t.keyCode || 99 == t.keyCode || 68 == t.keyCode ? (e.playKey(3), e.record(3)) : 52 == t.keyCode || 100 == t.keyCode || 70 == t.keyCode ? (e.playKey(4), e.record(4)) : 53 == t.keyCode || 101 == t.keyCode || 71 == t.keyCode ? (e.playKey(5), e.record(5)) : 54 == t.keyCode || 102 == t.keyCode || 72 == t.keyCode ? (e.playKey(6), e.record(6)) : 55 == t.keyCode || 103 == t.keyCode || 74 == t.keyCode ? (e.playKey(7), e.record(7)) : 56 == t.keyCode || 104 == t.keyCode || 75 == t.keyCode ? (e.playKey(8), e.record(8)) : 57 == t.keyCode || 105 == t.keyCode || 76 == t.keyCode ? (e.playKey(9), e.record(9)) : 32 == t.keyCode ? e.record(0) : 13 == t.keyCode
            })
        },
        previewSong: function(e) {
            var t = e.data,
            n = t.length,
            i = 0;
            this.playOver();
            for (var r = 0; n > r; r++) {
                var o = t[r],
                a = o.key,
                s = i + o.time * this.options.timeSpace;
                this.playPace(a, s),
                i = s
            }
        },
        playPace: function(e, t) {
            var n = this,
            i = setTimeout(function() {
                n.playKey(e)
            },
            t);
            this.property.lazyTimer.push(i)
        },
        playOver: function() {
            for (var e = this,
            t = e.property.lazyTimer.length; t > 0; t--) clearTimeout(e.property.lazyTimer[t]);
            this.property.lazyTimer = []
        },
        analysis: function(e) {
            if (/#music=(\d:\d-?)*/.test(e)) {
                var t = /#music=/,
                n = e.search(t) + 7,
                i = e.length,
                r = e.substring(n, i),
                o = r.split("-");
                return this.parseData(o)
            }
            alert("钢琴链接格式出错，请粘贴完整！")
        },
        parseData: function(e) {
            var t = {};
            t.data = [];
            for (var n = t.data,
            i = e.length,
            r = 0; i > r; r++) {
                var o = e[r].split(":"),
                a = o[0],
                s = o[1];
                if (a) {
                    var l = {};
                    l.key = a,
                    l.time = s,
                    n.push(l)
                }
            }
            return t
        },
        getAlbumList: function() {
            return this.options.albumList || {}
        },
        getKeyboard: function() {
            return this.options.keyboard || {}
        }

    },
    e
}),
$(function() {
    function e() {
        l.hide().filter("[data-type=album]").show();
        var e = s.getAlbumList(),
        t = "";
        for (var n in e) t += '<li><a href="javascript:;">' + n + "</a></li>";
        $(".js_album_list").empty().html(t)
    }
    function t() {
        l.hide().filter("[data-type=record]").show()
    }
    function n(e) {
        var t = $(".js_opern"),
        n = s.getAlbumList(),
        i = s.getKeyboard(),
        r = n[e],
        o = r;
        if (o.length) {
            for (var a = 35,
            c = Math.ceil(o.length / a), d = "", p = 0; c > p; p++) {
                var u = a * (p + 1),
                f = tmp2 = "";
                p == c - 1 && (u = o.length);
                for (var h = p * a; u > h; h++) {
                    var _ = o[h];
                    "0" == _ ? (f += '<dd class="empty-pat"></dd>', tmp2 += '<dd class="empty-pat"></dd>') : (f += "8" == _ || "9" == _ ? '<dd class="high-pat">' + (_ - 7) + "</dd>": "<dd>" + _ + "</dd>", tmp2 += "<dd>" + i[_] + "</dd>")
                }
                d += '<dl class="number"><dt>乐谱</dt>' + f + "</dl>",
                d += '<dl class="letter"><dt>键盘弹奏</dt>' + tmp2 + "</dl>"
            }
            t.find(".title").html(e),
            t.find(".js_opern_info").html(d),
            l.hide().filter("[data-type=opern]").show()
        }
    }
    function i(e, t) {
        var n = $(".js_tips");
        n.length && n.remove();
        var i = e ? "success": "error",
        r = '<div class="js_tips mod-tips ' + i + '">' + t + "</div>";
        $("body").append(r),
        setTimeout(function() {
            $(".js_tips").fadeOut(300)
        },
        3e3)
    }
    function r() {
        var e = $(".js_song_link")[0];
        if (e && e.select) {
            e.select();
            try {
                document.execCommand("copy"),
                i(!0, "复制链接成功，粘贴分享")
            } catch(t) {
                i(!1, "浏览器不支持复制")
            }
        }
    }
    function o(e) {
        var t = $(".js_menu li");
        t.eq(e - 1).removeClass("on").addClass("on"),
        setTimeout(function() {
            t.eq(e - 1).removeClass("on")
        },
        200)
    }
    function a() {
        var e = "",
        t = encodeURIComponent($(".js_song_link").val()),
        n = "分享钢琴节奏@轩枫Y_me",
        i = "分享钢琴节奏",
        r = "分享钢琴节奏@轩枫阁",
        o = "分享钢琴节奏";
        $("body").snsShare({
            tsina: {
                url: t,
                title: n,
                pic: e
            },
            renren: {
                url: t,
                title: i,
                pic: e
            },
            tqq: {
                url: t,
                title: r,
                pic: e
            },
            tqzone: {
                url: t,
                title: o,
                pic: e
            }
        })
    }
    var s = new Piano({
        playKeyCallback: o
    }),
    l = $(".js_piano_pannel");
    $(".js_piano_nav_icon").on("click",
    function() {
        $("body");
        $("body").toggleClass("mod-piano"),
        $(this).toggleClass("close"),
        $(".js_piano").toggleClass("ui-d-n"),
        $(".js_piano_nav li").eq(0).trigger("click")
    }),
    $(".js_menu li").on("mouseover",
    function() {
        var e = $(this).index() + 1;
        s.playKey(e),
        s.record(e)
    }),
    $(".js_piano_nav li").on("click",
    function() {
        $(this).siblings("li").removeClass("active").end().addClass("active");
        var n = $(this).data("type") || "album";
        switch (n) {
        case "album":
            e();
            break;
        case "record":
            t();
            break;
        case "mine":
            renderMine()
        }
    }),
    $(".js_album_list").on("click", "a",
    function() {
        "javascript:;" == $(this).attr("href") && (n($(this).text()), l.filter("[data-type=record]").show())
    }),
    $(".js_show_album").on("click",
    function() {
        e()
    }),
    $(".js_start_record").on("click",
    function() {
        $(".js_start_record").addClass("ui-d-n"),
        $(".js_cancel_record, .js_finish_record").removeClass("ui-d-n"),
        $(".js_recore_text").text("正在录制，请使用鼠标或键盘弹奏"),
        s.startRecord()
    }),
    $(".js_finish_record").on("click",
    function() {
        var e = s.getStatus();
        e ? ($(".js_song_link").val(s.finishRecord()), $(".js_recore_success, .js_start_record").removeClass("ui-d-n"), $(".js_record_srea, .js_finish_record, .js_cancel_record").addClass("ui-d-n"), $(".js_recore_text").text("点击开始录制，可以把你弹奏的曲子录制下来"), a()) : i(!1, "没有弹奏，请重新录制")
    }),
    $(".js_cancel_record").on("click",
    function() {
        $(".js_finish_record, .js_cancel_record").addClass("ui-d-n"),
        $(".js_start_record").removeClass("ui-d-n"),
        $(".js_recore_text").text("点击开始录制，可以录制弹奏的曲子")
    }),
    $(".js_preview_record").on("click",
    function() {
        var e = $(".js_song_link").val(),
        t = s.analysis(e);
        s.previewSong(t)
    }),
    $(".js_reset_record").on("click",
    function() {
        $(".js_record_srea").removeClass("ui-d-n"),
        $(".js_recore_success").addClass("ui-d-n")
    }),
    $(".js_upload_record").on("click",
    function() {
        var e = this;
        return $(".js_share_record").trigger("click"),
        setTimeout(function() {
            window.open($(e).attr("href"))
        },
        1500),
        !1
    }),
    $(".js_share_record").on("click",
    function() {
        r()
    })
}),
$(function() {
    function e() {
        var e = $(".js_to_top"),
        t = e.is(":visible");
        c.scrollTop() > 120 ? t || (e.css({
            bottom: "60px"
        }).show().addClass("mod-footer_top-2").removeClass("mod-footer_top-3 mod-footer_top-4 mod-footer_top-5 mod-footer_top-6"), setTimeout(function() {
            e.removeClass("mod-footer_top-2")
        },
        450)) : t && e.fadeOut(500)
    }
    function t() {
        for (var e = 0; 8 > e; e++) parseInt(10 * Math.random()) < 5 && $(".small_pic_wrap").eq(e).addClass("word_display")
    }
    function n() {
        var e = $(".mod-article__qrcode");
        $(".js_share_wx").on("click",
        function() {
            if (!$("#ewmimg").length) {
                var t = window.location.href,
                n = "<img id='ewmimg' class='ewmimg' src='https://chart.googleapis.com/chart?cht=qr&chs=150x150&choe=UTF-8&chld=L|4&chl=" + t + "' width='85' height='85' alt='轩枫阁文章 二维码分享' />";
                $(".mod-article__qrcode-wrap").prepend(n)
            }
            e.show()
        }),
        $(".js_share_close").on("click",
        function() {
            e.hide()
        })
    }
    function i() {
        var e = $(".js_article"),
        t = "【" + e.data("title") + "】",
        n = e.data("thumb"),
        i = "分享轩枫阁的文章@轩枫Y_me" + t,
        r = "分享轩枫阁的文章" + t,
        o = "分享轩枫阁的文章@轩枫阁" + t;
        p.snsShare({
            tsina: {
                title: i,
                pic: n
            },
            renren: {
                title: r,
                pic: n
            },
            tqq: {
                title: o,
                pic: n
            }
        })
    }
    function r() {
        var e = $(".js_page_loading"),
        t = $(".js_page_loading a"),
        n = t.attr("href");
        return t.length && n && !t.data("isLoading") ? (e.show(), t.data("isLoading", !0), void $.ajax({
            url: n,
            type: "get",
            success: function(n) {
                var i = $(n),
                r = i.find(".js_page_loading a").attr("href"),
                o = i.find(".js_category_article");
                t.data("isLoading", !1),
                e.before(o).hide(),
                o.find("img.lazyload").lazyload({
                    effect: "fadeIn",
                    threshold: 100
                }),
                r ? t.attr("href", r) : e.remove()
            },
            error: function(e) {
                alert("系统繁忙")
            }
        })) : !1
    }
    function o() {
        var e = ["生命中，有些人来了又去，有些人去而复返，有些人近在咫尺，有些人远在天涯，有些人擦身而过，有些人一路同行。\n无论如何，终免不了曲终人散的伤感。远在天涯的朋友：或许已是遥远得无法问候，但还是谢谢您曾经的结伴同行。", "前端路上，一路有你。编辑你的正能量，快乐工作，努力生活~", "此刻，我认真的微笑了，不带酸涩，不带惆怅，只是腼腆、淡然的微笑，那些刻有我成长符号的隐隐岁月，在不知不觉中幻化点点的自信，铺洒在我前进的道路上绽放星芒。", "有些时候，简简单单也是一种幸福。的确，安于平淡安详，也是一种修养、一种享受。\n只是有些时候，平淡而不厌烦的生活已经很难在我们身上出现了。现实的状况往往让我们觉得物是人非，于是便有了烦恼，有了抱怨。", "你的生命必须是留有缝隙，那样阳光才是能照进来。\n人生的最大的魅力不是成功，而是责任；生命惟因其短，故是应把它化入人类最壮丽的文明史中以获得永恒；生命也是唯因其短，更是要加倍珍惜每刻青春。", "【人生感悟】有的时候，真的觉得人生最大的遗憾就是，放弃了不该放弃的，而固执地去坚持不该坚持的。\n生活有苦有甜，才叫完整；爱情有闹有和，才叫情趣；心情有悲有喜，才叫体会；日子有阴有晴，才叫自然；联系时有时无，才叫珍贵。", "不要总在过去的回忆里缠绵，昨天的太阳，晒不干今天的衣裳。没有人可以赢得世界，但是大部分人都是输给了自己。最厌烦的感觉不是成为陌生人、而是逐渐陌生的态度。", "人生的路只有经历过，才知道有短有长；时光如水，我们无法阻止岁月的脚步，很多人，逐渐淡出了我们的视线，懂得了什么叫过客，很多事，已经不再属于我们的精彩，知道了这就叫过往。", "【人生感悟】人生是一程单向旅行，不可后退。走到生命的哪一个阶段，都该喜欢那一段时光，完成那一阶段该完成的职责，顺生而行，不沉迷过去，不狂热地期待着未来，生命理当如此。", "有人说：“我若是灯，我就要用我的光明来照彻黑暗。”我不配做一盏明灯。那么就让我做一块木柴罢。我愿意把我从太阳那里受到的热放散出来，我愿意把自己烧得粉身碎骨给人间添一点点温暖。"];
        $(".js_fly a").click(function() {
            return $(".js_fly_message").val(e[Math.floor(10 * Math.random())]),
            $(".js_fly_wind, .js_fly_plane").fadeIn(200),
            !1
        }),
        $(".js_fly_close").click(function() {
            $(".js_fly_wind").fadeOut(200)
        }),
        $(".js_fly_comment").click(function() {
            $(this).toggleClass("choose_active")
        }),
        $(".js_fly_send").click(function() {
            var e = "1288460501986050384";
            $(".js_fly_comment").hasClass("choose_active") && $.ajax({
                url: "http://duoshuo.com/api/posts/create.json",
                type: "POST",
                dataType: "json",
                data: {
                    short_name: "nhl1",
                    secret: "fc4171e4974585682e1197de013b7483",
                    author_email: "845207036%40qq.com",
                    author_name: "xuanfeng",
                    thread_id: e,
                    author_url: "http%3A%2F%2Fxuanfengge.com",
                    message: "【纸飞机许愿】：" + $(".js_fly_message").val()
                }
            }),
            setTimeout(function() {
                $(".js_fly_plane").removeClass("front"),
                $(".js_fly_container").removeClass("beginning"),
                $(".js_fly_curvable").addClass("curved"),
                setTimeout(function() {
                    $(".js_fly_container").addClass("hover"),
                    setTimeout(function() {
                        $(".js_fly_container").addClass("fly_away_first"),
                        setTimeout(function() {
                            $(".js_fly_container").addClass("fly_away"),
                            setTimeout(function() {
                                $(".js_fly_plane").addClass("front"),
                                $(".js_fly_container").removeClass("fly_away fly_away_first hover").addClass("beginning"),
                                $(".js_fly_curvable").removeClass("curved"),
                                $(".js_fly_wind").hide()
                            },
                            3e3)
                        },
                        600)
                    },
                    2e3)
                },
                2800)
            },
            200)
        })
    }
    function a(e) {
        this.$single = $(".js_single"),
        this.$article = $(".js_article_content"),
        this.$lightbox = $(".js_lightbox"),
        this.tpl = template.compile($("#js_lightbox_tpl").html()),
        this.imgList = $(".js_article_content").find("img"),
        this.listenEvents()
    }
    function s() {
        for (var e = $(".js_reward_mask"), t = $(".js_reward_data li"), n = $(".js_reward_count"), i = $(".js_reward_qrcode"), r = [], o = 0; o < t.length; o++) r.push({
            count: t.eq(o).text(),
            qrcode: t.eq(o).data("img")
        });
        $(".js_reward_btn").on("click",
        function() {
            e.show(),
            p.addClass("ovh")
        }),
        $(".js_reward_close").on("click",
        function() {
            e.hide(),
            p.removeClass("ovh")
        }),
        $(".js_change_reward").on("click",
        function() {
            var e = parseInt(Math.random() * t.length);
            i.attr("src", r[e].qrcode),
            n.text(r[e].count)
        }),
        $(".js_reward_mask img").on("click",
        function(e) {
            e.stopPropagation()
        })
    }
    var l = $("#wpadminbar").height() || 0,
    c = $(window),
    d = $(document),
    p = $("body");
    if ($(".js_to_top").click(function() {
        var e = $(this);
        return e.addClass("mod-footer_top-3"),
        setTimeout(function() {
            e.addClass("mod-footer_top-4")
        },
        200),
        setTimeout(function() {
            e.addClass("mod-footer_top-6").animate({
                bottom: c.height() + 50
            },
            1e3),
            $("html, body").animate({
                scrollTop: 0
            },
            1200)
        },
        400),
        !1
    }), c.scroll(function() {
        e()
    }), $(".small_pic_wrap, .carousel_pic_wrap").hover(function() {
        $(this).toggleClass("word_display")
    },
    function() {
        $(this).toggleClass("word_display")
    }), t(), $(".js_top_list_more").on("click",
    function() {
        var e = ($(".js_top_list_wrap"), $(".js_top_list")),
        t = 320,
        n = e.height(),
        i = Math.ceil(n / t),
        r = e.data("page") || 0;
        r++,
        r >= i && (r = 0),
        $(".mod-index__top-list").data("page", r).css({
            "margin-top": -t * r + "px"
        })
    }), $(".js_sidebar_article_title h4").on("mouseover",
    function() {
        var e = $(this).index();
        $(this).addClass("active").siblings().removeClass("active"),
        $(".js_sidebar_article_list").eq(e).stop(!0, !1).fadeIn(300).siblings(".js_sidebar_article_list").hide()
    }), $(".js_tag_change").click(function() {
        var e = $(this);
        return e.data("loading") ? !1 : (e.data("loading", !0), $.ajax({
            url: e.attr("href"),
            type: "get",
            success: function(t) {
                e.data("loading", !1),
                $(".js_tag_content").empty().append($(t).fadeIn(200))
            }
        }), !1)
    }), $(".js_sidebar_link_page").click(function(e) {
        var t = $(e.currentTarget),
        n = t.data("type"),
        i = $(".js_sidebar_link_content");
        friendIndex = i.data("index.983973b7") || 0,
        "prev" == n ? friendIndex--:friendIndex++,
        friendIndex < 0 ? friendIndex = 2 : friendIndex > 2 && (friendIndex = 0),
        i.data("index.983973b7", friendIndex).css({
            left: 300 * -friendIndex + "px"
        })
    }), blog.is_single) {
        p.addClass("mod-single"),
        n(),
        i();
        var u = $(".js_article_nav");
        $.trim(u.text()) && $(".js_article_nav").show().onePageNav({
            currentClass: "active",
            changeHash: !1,
            easing: "swing",
            filter: ":not(.external)",
            scrollSpeed: 800,
            scrollOffset: 0,
            scrollThreshold: .1,
            begin: !1,
            end: !1,
            scrollChange: !1
        }),
        $(".js_article_nav li a").click(function() {
            return $($(this).attr("href")).animatescroll({
                padding: l
            }),
            !1
        })
    }
    if ($(".js_search_input").on("focus",
    function() {
        $(this).parents("section").addClass("active")
    }).on("blur",
    function() {
        $(this).parents("section").removeClass("active")
    }), $("img.lazyload").lazyload({
        effect: "show",
        data_attribute: "original",
        threshold: 100,
        load: function(e, t, n) {
            e.addClass("autoheight")
        }
    }), (blog.is_category || blog.is_home || blog.is_tag) && c.on("scroll",
    function() {
        var e = c.height(),
        t = d.height();
        d.scrollTop() + e > t - 600 && r()
    }), o(), a.prototype = {
        listenEvents: function() {
            var e = this;
            this.$article.on("click", "a, img",
            function(t) {
                var n = $(this);
                if (n.parent().is("a") || n.is("img")) {
                    var i = n.is("img") ? n: n.parent(),
                    r = e.imgList.index(i) + 1;
                    return e.showLightbox(r),
                    !1
                }
            }),
            this.$single.on("click", ".js_lightbox_prev",
            function(t) {
                var n = e.currentIndex - 1;
                e.showLightbox(n)
            }),
            this.$single.on("click", ".js_lightbox_next",
            function(t) {
                var n = e.currentIndex + 1;
                e.showLightbox(n)
            }),
            $(".js_lightbox_close, .js_lightbox_overlay").on("click",
            function() {
                e.hideLightbox()
            })
        },
        showLightbox: function(e) {
            this.currentIndex = e;
            var t = this.imgList.eq(e - 1),
            n = t.data("original"),
            i = t.attr("width") || t.width(),
            r = t.attr("height") || t.height(),
            o = c.height() - 50,
            a = c.width() - 20;
            r > o ? (i = parseInt(o * i / r), r = o) : i > a && (i = a, r = o),
            $(".js_lightbox_content").html(this.tpl({
                src: n,
                index: e,
                width: i,
                height: r,
                total: this.imgList.length
            })),
            this.$lightbox.is(":visible") || this.$lightbox.show(),
            p.addClass("ovh")
        },
        hideLightbox: function() {
            this.$lightbox.hide(),
            p.removeClass("ovh")
        }
    },
    blog.is_single) {
        new a
    }
    if ($.fn.directional = function(e) {
        var t = 0,
        n = 0;
        c.on("scroll",
        function(e) {
            var i = window.pageXOffset,
            r = window.pageYOffset;
            r > n ? (c.trigger("down"), window.direction = "down") : n > r ? (c.trigger("up"), window.direction = "up") : window.direction = null,
            t = i,
            n = r
        })
    },
    !blog.is_home) {
        var f = $(".js_header");
        c.directional(),
        c.on("up",
        function() {
            var e = c.scrollTop();
            100 > e ? f.hasClass("mod-header__fixed") && f.removeClass("mod-header__fixed") : !f.hasClass("mod-header__fixed") && f.addClass("mod-header__fixed")
        }),
        c.on("down",
        function() {
            f.hasClass("mod-header__fixed") && f.removeClass("mod-header__fixed")
        })
    }
    s()
});