/*!
 * smoothState.js is jQuery plugin that progressively enhances
 * page loads to behave more like a single-page application.
 *
 * @author  Miguel Ángel Pérez   reachme@miguel-perez.com
 * @see     http://smoothstate.com
 *
*/

! function(t, n, e, o) {
    "use strict";
    if (!n.history.pushState) return t.fn.smoothState = function() {
        return this
    }, void(t.fn.smoothState.options = {});
    if (!t.fn.smoothState) {
        var r = t("html, body"),
            a = n.console,
            s = {
                debug: !1,
                anchors: "a",
                hrefRegex: "",
                forms: "form",
                allowFormCaching: !1,
                repeatDelay: 500,
                blacklist: ".no-smoothState",
                prefetch: !1,
                prefetchOn: "mouseover touchstart",
                cacheLength: 0,
                loadingClass: "is-loading",
                scroll: !0,
                alterRequest: function(t) {
                    return t
                },
                onBefore: function(t, n) {},
                onStart: {
                    duration: 0,
                    render: function(t) {}
                },
                onProgress: {
                    duration: 0,
                    render: function(t) {}
                },
                onReady: {
                    duration: 0,
                    render: function(t, n) {
                        t.html(n)
                    }
                },
                onAfter: function(t, n) {}
            },
            i = {
                isExternal: function(t) {
                    var e = t.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
                    return "string" == typeof e[1] && e[1].length > 0 && e[1].toLowerCase() !== n.location.protocol ? !0 : "string" == typeof e[2] && e[2].length > 0 && e[2].replace(new RegExp(":(" + {
                        "http:": 80,
                        "https:": 443
                    }[n.location.protocol] + ")?$"), "") !== n.location.host ? !0 : !1
                },
                stripHash: function(t) {
                    return t.replace(/#.*/, "")
                },
                isHash: function(t, e) {
                    e = e || n.location.href;
                    var o = t.indexOf("#") > -1 ? !0 : !1,
                        r = i.stripHash(t) === i.stripHash(e) ? !0 : !1;
                    return o && r
                },
                translate: function(n) {
                    var e = {
                        dataType: "html",
                        type: "GET"
                    };
                    return n = "string" == typeof n ? t.extend({}, e, {
                        url: n
                    }) : t.extend({}, e, n)
                },
                shouldLoadAnchor: function(t, n, e) {
                    var r = t.prop("href");
                    return !(i.isExternal(r) || i.isHash(r) || t.is(n) || t.prop("target") || typeof e !== o && "" !== e && -1 === t.prop("href").search(e))
                },
                clearIfOverCapacity: function(t, n) {
                    return Object.keys || (Object.keys = function(t) {
                        var n, e = [];
                        for (n in t) Object.prototype.hasOwnProperty.call(t, n) && e.push(n);
                        return e
                    }), Object.keys(t).length > n && (t = {}), t
                },
                storePageIn: function(n, e, o, r) {
                    var a = t("<html></html>").append(t(o));
                    return n[e] = {
                        status: "loaded",
                        title: a.find("title").first().text(),
                        html: a.find("#" + r),
                        doc: o
                    }, n
                },
                triggerAllAnimationEndEvent: function(n, e) {
                    e = " " + e || "";
                    var o = 0,
                        r = "animationstart webkitAnimationStart oanimationstart MSAnimationStart",
                        a = "animationend webkitAnimationEnd oanimationend MSAnimationEnd",
                        s = "allanimationend",
                        l = function(e) {
                            t(e.delegateTarget).is(n) && (e.stopPropagation(), o++)
                        },
                        u = function(e) {
                            t(e.delegateTarget).is(n) && (e.stopPropagation(), o--, 0 === o && n.trigger(s))
                        };
                    n.on(r, l), n.on(a, u), n.on("allanimationend" + e, function() {
                        o = 0, i.redraw(n)
                    })
                },
                redraw: function(t) {
                    t.height()
                }
            },
            l = function(e) {
                if (null !== e.state) {
                    var o = n.location.href,
                        r = t("#" + e.state.id),
                        a = r.data("smoothState");
                    a.href === o || i.isHash(o, a.href) || a.load(o, !1)
                }
            },
            u = function(s, l) {
                var u = t(s),
                    c = u.prop("id"),
                    f = null,
                    h = !1,
                    d = {},
                    p = n.location.href,
                    g = function(t) {
                        t = t || !1, t && d.hasOwnProperty(t) ? delete d[t] : d = {}, u.data("smoothState").cache = d
                    },
                    m = function(n, e) {
                        e = e || t.noop;
                        var o = i.translate(n);
                        if (d = i.clearIfOverCapacity(d, l.cacheLength), !d.hasOwnProperty(o.url) || "undefined" != typeof o.data) {
                            d[o.url] = {
                                status: "fetching"
                            };
                            var r = t.ajax(o);
                            r.success(function(t) {
                                i.storePageIn(d, o.url, t, c), u.data("smoothState").cache = d
                            }), r.error(function() {
                                d[o.url].status = "error"
                            }), e && r.complete(e)
                        }
                    },
                    y = function() {
                        if (f) {
                            var n = t(f, u);
                            if (n.length) {
                                var e = n.offset().top;
                                r.scrollTop(e)
                            }
                            f = null
                        }
                    },
                    v = function(o) {
                        var s = "#" + c,
                            i = d[o] ? t(d[o].html.html()) : null;
                        i.length ? (e.title = d[o].title, u.data("smoothState").href = o, l.loadingClass && r.removeClass(l.loadingClass), l.onReady.render(u, i), u.one("ss.onReadyEnd", function() {
                            h = !1, l.onAfter(u, i), l.scroll && y()
                        }), n.setTimeout(function() {
                            u.trigger("ss.onReadyEnd")
                        }, l.onReady.duration)) : !i && l.debug && a ? a.warn("No element with an id of " + s + " in response from " + o + " in " + d) : n.location = o
                    },
                    S = function(t, e, o) {
                        var s = i.translate(t);
                        "undefined" == typeof e && (e = !0), "undefined" == typeof o && (o = !0);
                        var f = !1,
                            h = !1,
                            p = {
                                loaded: function() {
                                    var t = f ? "ss.onProgressEnd" : "ss.onStartEnd";
                                    h && f ? h && v(s.url) : u.one(t, function() {
                                        v(s.url), o || g(s.url)
                                    }), e && n.history.pushState({
                                        id: c
                                    }, d[s.url].title, s.url), h && !o && g(s.url)
                                },
                                fetching: function() {
                                    f || (f = !0, u.one("ss.onStartEnd", function() {
                                        l.loadingClass && r.addClass(l.loadingClass), l.onProgress.render(u), n.setTimeout(function() {
                                            u.trigger("ss.onProgressEnd"), h = !0
                                        }, l.onProgress.duration)
                                    })), n.setTimeout(function() {
                                        d.hasOwnProperty(s.url) && p[d[s.url].status]()
                                    }, 10)
                                },
                                error: function() {
                                    l.debug && a ? a.log("There was an error loading: " + s.url) : n.location = s.url
                                }
                            };
                        d.hasOwnProperty(s.url) || m(s), l.onStart.render(u), n.setTimeout(function() {
                            l.scroll && r.scrollTop(0), u.trigger("ss.onStartEnd")
                        }, l.onStart.duration), p[d[s.url].status]()
                    },
                    w = function(n) {
                        var e, o = t(n.currentTarget);
                        i.shouldLoadAnchor(o, l.blacklist, l.hrefRegex) && !h && (n.stopPropagation(), e = i.translate(o.prop("href")), e = l.alterRequest(e), m(e))
                    },
                    E = function(n) {
                        var e = t(n.currentTarget);
                        if (!n.metaKey && !n.ctrlKey && i.shouldLoadAnchor(e, l.blacklist, l.hrefRegex) && (n.stopPropagation(), n.preventDefault(), !C())) {
                            T();
                            var o = i.translate(e.prop("href"));
                            h = !0, f = e.prop("hash"), o = l.alterRequest(o), l.onBefore(e, u), S(o)
                        }
                    },
                    b = function(n) {
                        var e = t(n.currentTarget);
                        if (!e.is(l.blacklist) && (n.preventDefault(), n.stopPropagation(), !C())) {
                            T();
                            var r = {
                                url: e.prop("action"),
                                data: e.serialize(),
                                type: e.prop("method")
                            };
                            h = !0, r = l.alterRequest(r), "get" === r.type.toLowerCase() && (r.url = r.url + "?" + r.data), l.onBefore(e, u), S(r, o, l.allowFormCaching)
                        }
                    },
                    P = 0,
                    C = function() {
                        var t = null === l.repeatDelay,
                            n = parseInt(Date.now()) > P;
                        return !(t || n)
                    },
                    T = function() {
                        P = parseInt(Date.now()) + parseInt(l.repeatDelay)
                    },
                    A = function(t) {
                        l.anchors && (t.on("click", l.anchors, E), l.prefetch && t.on(l.prefetchOn, l.anchors, w)), l.forms && t.on("submit", l.forms, b)
                    },
                    O = function() {
                        var t = u.prop("class");
                        u.removeClass(t), i.redraw(u), u.addClass(t)
                    };
                return l = t.extend({}, t.fn.smoothState.options, l), null === n.history.state && n.history.replaceState({
                    id: c
                }, e.title, p), i.storePageIn(d, p, e.documentElement.outerHTML, c), i.triggerAllAnimationEndEvent(u, "ss.onStartEnd ss.onProgressEnd ss.onEndEnd"), A(u), {
                    href: p,
                    cache: d,
                    clear: g,
                    load: S,
                    fetch: m,
                    restartCSSAnimations: O
                }
            },
            c = function(n) {
                return this.each(function() {
                    var e = this.tagName.toLowerCase();
                    this.id && "body" !== e && "html" !== e && !t.data(this, "smoothState") ? t.data(this, "smoothState", new u(this, n)) : !this.id && a ? a.warn("Every smoothState container needs an id but the following one does not have one:", this) : "body" !== e && "html" !== e || !a || a.warn("The smoothstate container cannot be the " + this.tagName + " tag")
                })
            };
        n.onpopstate = l, t.smoothStateUtility = i, t.fn.smoothState = c, t.fn.smoothState.options = s
    }
}(jQuery, window, document);