!(function(e, t) {
    'object' == typeof exports && 'undefined' != typeof module
        ? (module.exports = t(
              require('node-localstorage'),
              require('net'),
              require('websocket')
          ))
        : 'function' == typeof define && define.amd
          ? define(['node-localstorage', 'net', 'websocket'], t)
          : (e.InPlayer = t(e.LocalStorage, e.net, e.websocket));
})(this, function(e, t, n) {
    'use strict';
    (e = e && e.hasOwnProperty('default') ? e.default : e),
        (t = t && t.hasOwnProperty('default') ? t.default : t),
        (n = n && n.hasOwnProperty('default') ? n.default : n),
        (function(e) {
            if (!e.fetch) {
                var t = {
                    searchParams: 'URLSearchParams' in e,
                    iterable: 'Symbol' in e && 'iterator' in Symbol,
                    blob:
                        'FileReader' in e &&
                        'Blob' in e &&
                        (function() {
                            try {
                                return new Blob(), !0;
                            } catch (e) {
                                return !1;
                            }
                        })(),
                    formData: 'FormData' in e,
                    arrayBuffer: 'ArrayBuffer' in e,
                };
                if (t.arrayBuffer)
                    var n = [
                            '[object Int8Array]',
                            '[object Uint8Array]',
                            '[object Uint8ClampedArray]',
                            '[object Int16Array]',
                            '[object Uint16Array]',
                            '[object Int32Array]',
                            '[object Uint32Array]',
                            '[object Float32Array]',
                            '[object Float64Array]',
                        ],
                        r = function(e) {
                            return e && DataView.prototype.isPrototypeOf(e);
                        },
                        o =
                            ArrayBuffer.isView ||
                            function(e) {
                                return (
                                    e &&
                                    n.indexOf(
                                        Object.prototype.toString.call(e)
                                    ) > -1
                                );
                            };
                (f.prototype.append = function(e, t) {
                    (e = a(e)), (t = u(t));
                    var n = this.map[e];
                    this.map[e] = n ? n + ',' + t : t;
                }),
                    (f.prototype.delete = function(e) {
                        delete this.map[a(e)];
                    }),
                    (f.prototype.get = function(e) {
                        return (e = a(e)), this.has(e) ? this.map[e] : null;
                    }),
                    (f.prototype.has = function(e) {
                        return this.map.hasOwnProperty(a(e));
                    }),
                    (f.prototype.set = function(e, t) {
                        this.map[a(e)] = u(t);
                    }),
                    (f.prototype.forEach = function(e, t) {
                        for (var n in this.map)
                            this.map.hasOwnProperty(n) &&
                                e.call(t, this.map[n], n, this);
                    }),
                    (f.prototype.keys = function() {
                        var e = [];
                        return (
                            this.forEach(function(t, n) {
                                e.push(n);
                            }),
                            c(e)
                        );
                    }),
                    (f.prototype.values = function() {
                        var e = [];
                        return (
                            this.forEach(function(t) {
                                e.push(t);
                            }),
                            c(e)
                        );
                    }),
                    (f.prototype.entries = function() {
                        var e = [];
                        return (
                            this.forEach(function(t, n) {
                                e.push([n, t]);
                            }),
                            c(e)
                        );
                    }),
                    t.iterable &&
                        (f.prototype[Symbol.iterator] = f.prototype.entries);
                var i = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
                (m.prototype.clone = function() {
                    return new m(this, { body: this._bodyInit });
                }),
                    y.call(m.prototype),
                    y.call(v.prototype),
                    (v.prototype.clone = function() {
                        return new v(this._bodyInit, {
                            status: this.status,
                            statusText: this.statusText,
                            headers: new f(this.headers),
                            url: this.url,
                        });
                    }),
                    (v.error = function() {
                        var e = new v(null, { status: 0, statusText: '' });
                        return (e.type = 'error'), e;
                    });
                var s = [301, 302, 303, 307, 308];
                (v.redirect = function(e, t) {
                    if (-1 === s.indexOf(t))
                        throw new RangeError('Invalid status code');
                    return new v(null, { status: t, headers: { location: e } });
                }),
                    (e.Headers = f),
                    (e.Request = m),
                    (e.Response = v),
                    (e.fetch = function(e, n) {
                        return new Promise(function(r, o) {
                            var i = new m(e, n),
                                s = new XMLHttpRequest();
                            (s.onload = function() {
                                var e,
                                    t,
                                    n = {
                                        status: s.status,
                                        statusText: s.statusText,
                                        headers: ((e =
                                            s.getAllResponseHeaders() || ''),
                                        (t = new f()),
                                        e.split(/\r?\n/).forEach(function(e) {
                                            var n = e.split(':'),
                                                r = n.shift().trim();
                                            if (r) {
                                                var o = n.join(':').trim();
                                                t.append(r, o);
                                            }
                                        }),
                                        t),
                                    };
                                n.url =
                                    'responseURL' in s
                                        ? s.responseURL
                                        : n.headers.get('X-Request-URL');
                                var o =
                                    'response' in s
                                        ? s.response
                                        : s.responseText;
                                r(new v(o, n));
                            }),
                                (s.onerror = function() {
                                    o(new TypeError('Network request failed'));
                                }),
                                (s.ontimeout = function() {
                                    o(new TypeError('Network request failed'));
                                }),
                                s.open(i.method, i.url, !0),
                                'include' === i.credentials &&
                                    (s.withCredentials = !0),
                                'responseType' in s &&
                                    t.blob &&
                                    (s.responseType = 'blob'),
                                i.headers.forEach(function(e, t) {
                                    s.setRequestHeader(t, e);
                                }),
                                s.send(
                                    void 0 === i._bodyInit ? null : i._bodyInit
                                );
                        });
                    }),
                    (e.fetch.polyfill = !0);
            }
            function a(e) {
                if (
                    ('string' != typeof e && (e = String(e)),
                    /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e))
                )
                    throw new TypeError(
                        'Invalid character in header field name'
                    );
                return e.toLowerCase();
            }
            function u(e) {
                return 'string' != typeof e && (e = String(e)), e;
            }
            function c(e) {
                var n = {
                    next: function() {
                        var t = e.shift();
                        return { done: void 0 === t, value: t };
                    },
                };
                return (
                    t.iterable &&
                        (n[Symbol.iterator] = function() {
                            return n;
                        }),
                    n
                );
            }
            function f(e) {
                (this.map = {}),
                    e instanceof f
                        ? e.forEach(function(e, t) {
                              this.append(t, e);
                          }, this)
                        : Array.isArray(e)
                          ? e.forEach(function(e) {
                                this.append(e[0], e[1]);
                            }, this)
                          : e &&
                            Object.getOwnPropertyNames(e).forEach(function(t) {
                                this.append(t, e[t]);
                            }, this);
            }
            function d(e) {
                if (e.bodyUsed)
                    return Promise.reject(new TypeError('Already read'));
                e.bodyUsed = !0;
            }
            function l(e) {
                return new Promise(function(t, n) {
                    (e.onload = function() {
                        t(e.result);
                    }),
                        (e.onerror = function() {
                            n(e.error);
                        });
                });
            }
            function h(e) {
                var t = new FileReader(),
                    n = l(t);
                return t.readAsArrayBuffer(e), n;
            }
            function p(e) {
                if (e.slice) return e.slice(0);
                var t = new Uint8Array(e.byteLength);
                return t.set(new Uint8Array(e)), t.buffer;
            }
            function y() {
                return (
                    (this.bodyUsed = !1),
                    (this._initBody = function(e) {
                        if (((this._bodyInit = e), e))
                            if ('string' == typeof e) this._bodyText = e;
                            else if (t.blob && Blob.prototype.isPrototypeOf(e))
                                this._bodyBlob = e;
                            else if (
                                t.formData &&
                                FormData.prototype.isPrototypeOf(e)
                            )
                                this._bodyFormData = e;
                            else if (
                                t.searchParams &&
                                URLSearchParams.prototype.isPrototypeOf(e)
                            )
                                this._bodyText = e.toString();
                            else if (t.arrayBuffer && t.blob && r(e))
                                (this._bodyArrayBuffer = p(e.buffer)),
                                    (this._bodyInit = new Blob([
                                        this._bodyArrayBuffer,
                                    ]));
                            else {
                                if (
                                    !t.arrayBuffer ||
                                    (!ArrayBuffer.prototype.isPrototypeOf(e) &&
                                        !o(e))
                                )
                                    throw new Error(
                                        'unsupported BodyInit type'
                                    );
                                this._bodyArrayBuffer = p(e);
                            }
                        else this._bodyText = '';
                        this.headers.get('content-type') ||
                            ('string' == typeof e
                                ? this.headers.set(
                                      'content-type',
                                      'text/plain;charset=UTF-8'
                                  )
                                : this._bodyBlob && this._bodyBlob.type
                                  ? this.headers.set(
                                        'content-type',
                                        this._bodyBlob.type
                                    )
                                  : t.searchParams &&
                                    URLSearchParams.prototype.isPrototypeOf(
                                        e
                                    ) &&
                                    this.headers.set(
                                        'content-type',
                                        'application/x-www-form-urlencoded;charset=UTF-8'
                                    ));
                    }),
                    t.blob &&
                        ((this.blob = function() {
                            var e = d(this);
                            if (e) return e;
                            if (this._bodyBlob)
                                return Promise.resolve(this._bodyBlob);
                            if (this._bodyArrayBuffer)
                                return Promise.resolve(
                                    new Blob([this._bodyArrayBuffer])
                                );
                            if (this._bodyFormData)
                                throw new Error(
                                    'could not read FormData body as blob'
                                );
                            return Promise.resolve(new Blob([this._bodyText]));
                        }),
                        (this.arrayBuffer = function() {
                            return this._bodyArrayBuffer
                                ? d(this) ||
                                      Promise.resolve(this._bodyArrayBuffer)
                                : this.blob().then(h);
                        })),
                    (this.text = function() {
                        var e,
                            t,
                            n,
                            r = d(this);
                        if (r) return r;
                        if (this._bodyBlob)
                            return (
                                (e = this._bodyBlob),
                                (t = new FileReader()),
                                (n = l(t)),
                                t.readAsText(e),
                                n
                            );
                        if (this._bodyArrayBuffer)
                            return Promise.resolve(
                                (function(e) {
                                    for (
                                        var t = new Uint8Array(e),
                                            n = new Array(t.length),
                                            r = 0;
                                        r < t.length;
                                        r++
                                    )
                                        n[r] = String.fromCharCode(t[r]);
                                    return n.join('');
                                })(this._bodyArrayBuffer)
                            );
                        if (this._bodyFormData)
                            throw new Error(
                                'could not read FormData body as text'
                            );
                        return Promise.resolve(this._bodyText);
                    }),
                    t.formData &&
                        (this.formData = function() {
                            return this.text().then(b);
                        }),
                    (this.json = function() {
                        return this.text().then(JSON.parse);
                    }),
                    this
                );
            }
            function m(e, t) {
                var n,
                    r,
                    o = (t = t || {}).body;
                if (e instanceof m) {
                    if (e.bodyUsed) throw new TypeError('Already read');
                    (this.url = e.url),
                        (this.credentials = e.credentials),
                        t.headers || (this.headers = new f(e.headers)),
                        (this.method = e.method),
                        (this.mode = e.mode),
                        o ||
                            null == e._bodyInit ||
                            ((o = e._bodyInit), (e.bodyUsed = !0));
                } else this.url = String(e);
                if (
                    ((this.credentials =
                        t.credentials || this.credentials || 'omit'),
                    (!t.headers && this.headers) ||
                        (this.headers = new f(t.headers)),
                    (this.method = ((n = t.method || this.method || 'GET'),
                    (r = n.toUpperCase()),
                    i.indexOf(r) > -1 ? r : n)),
                    (this.mode = t.mode || this.mode || null),
                    (this.referrer = null),
                    ('GET' === this.method || 'HEAD' === this.method) && o)
                )
                    throw new TypeError(
                        'Body not allowed for GET or HEAD requests'
                    );
                this._initBody(o);
            }
            function b(e) {
                var t = new FormData();
                return (
                    e
                        .trim()
                        .split('&')
                        .forEach(function(e) {
                            if (e) {
                                var n = e.split('='),
                                    r = n.shift().replace(/\+/g, ' '),
                                    o = n.join('=').replace(/\+/g, ' ');
                                t.append(
                                    decodeURIComponent(r),
                                    decodeURIComponent(o)
                                );
                            }
                        }),
                    t
                );
            }
            function v(e, t) {
                t || (t = {}),
                    (this.type = 'default'),
                    (this.status = 'status' in t ? t.status : 200),
                    (this.ok = this.status >= 200 && this.status < 300),
                    (this.statusText = 'statusText' in t ? t.statusText : 'OK'),
                    (this.headers = new f(t.headers)),
                    (this.url = t.url || ''),
                    this._initBody(e);
            }
        })(self);
    self.fetch.bind(self);
    var r =
        'undefined' != typeof global
            ? global
            : 'undefined' != typeof self
              ? self
              : 'undefined' != typeof window ? window : {};
    function o() {
        throw new Error('setTimeout has not been defined');
    }
    function i() {
        throw new Error('clearTimeout has not been defined');
    }
    var s = o,
        a = i;
    function u(e) {
        if (s === setTimeout) return setTimeout(e, 0);
        if ((s === o || !s) && setTimeout)
            return (s = setTimeout), setTimeout(e, 0);
        try {
            return s(e, 0);
        } catch (t) {
            try {
                return s.call(null, e, 0);
            } catch (t) {
                return s.call(this, e, 0);
            }
        }
    }
    'function' == typeof r.setTimeout && (s = setTimeout),
        'function' == typeof r.clearTimeout && (a = clearTimeout);
    var c,
        f = [],
        d = !1,
        l = -1;
    function h() {
        d &&
            c &&
            ((d = !1),
            c.length ? (f = c.concat(f)) : (l = -1),
            f.length && p());
    }
    function p() {
        if (!d) {
            var e = u(h);
            d = !0;
            for (var t = f.length; t; ) {
                for (c = f, f = []; ++l < t; ) c && c[l].run();
                (l = -1), (t = f.length);
            }
            (c = null),
                (d = !1),
                (function(e) {
                    if (a === clearTimeout) return clearTimeout(e);
                    if ((a === i || !a) && clearTimeout)
                        return (a = clearTimeout), clearTimeout(e);
                    try {
                        a(e);
                    } catch (t) {
                        try {
                            return a.call(null, e);
                        } catch (t) {
                            return a.call(this, e);
                        }
                    }
                })(e);
        }
    }
    function y(e) {
        var t = arguments,
            n = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var r = 1; r < arguments.length; r++) n[r - 1] = t[r];
        f.push(new m(e, n)), 1 !== f.length || d || u(p);
    }
    function m(e, t) {
        (this.fun = e), (this.array = t);
    }
    m.prototype.run = function() {
        this.fun.apply(null, this.array);
    };
    function b() {}
    var v = b,
        g = b,
        w = b,
        _ = b,
        A = b,
        S = b,
        T = b;
    var P = r.performance || {},
        E =
            P.now ||
            P.mozNow ||
            P.msNow ||
            P.oNow ||
            P.webkitNow ||
            function() {
                return new Date().getTime();
            };
    var x = new Date();
    var B = {
            nextTick: y,
            title: 'browser',
            browser: !0,
            env: {},
            argv: [],
            version: '',
            versions: {},
            on: v,
            addListener: g,
            once: w,
            off: _,
            removeListener: A,
            removeAllListeners: S,
            emit: T,
            binding: function(e) {
                throw new Error('process.binding is not supported');
            },
            cwd: function() {
                return '/';
            },
            chdir: function(e) {
                throw new Error('process.chdir is not supported');
            },
            umask: function() {
                return 0;
            },
            hrtime: function(e) {
                var t = 0.001 * E.call(P),
                    n = Math.floor(t),
                    r = Math.floor((t % 1) * 1e9);
                return (
                    e && ((n -= e[0]), (r -= e[1]) < 0 && (n--, (r += 1e9))),
                    [n, r]
                );
            },
            platform: 'browser',
            release: {},
            config: {},
            uptime: function() {
                return (new Date() - x) / 1e3;
            },
        },
        k =
            'undefined' != typeof window
                ? window
                : 'undefined' != typeof global
                  ? global
                  : 'undefined' != typeof self ? self : {};
    function F() {
        throw new Error(
            'Dynamic requires are not currently supported by rollup-plugin-commonjs'
        );
    }
    function I(e, t) {
        return e((t = { exports: {} }), t.exports), t.exports;
    }
    I(function(e, t) {
        e.exports = (function() {
            function e(e) {
                return 'function' == typeof e;
            }
            var t = Array.isArray
                    ? Array.isArray
                    : function(e) {
                          return (
                              '[object Array]' ===
                              Object.prototype.toString.call(e)
                          );
                      },
                n = 0,
                r = void 0,
                o = void 0,
                i = function(e, t) {
                    (l[n] = e),
                        (l[n + 1] = t),
                        2 === (n += 2) && (o ? o(h) : g());
                },
                s = 'undefined' != typeof window ? window : void 0,
                a = s || {},
                u = a.MutationObserver || a.WebKitMutationObserver,
                c =
                    'undefined' == typeof self &&
                    void 0 !== B &&
                    '[object process]' === {}.toString.call(B),
                f =
                    'undefined' != typeof Uint8ClampedArray &&
                    'undefined' != typeof importScripts &&
                    'undefined' != typeof MessageChannel;
            function d() {
                var e = setTimeout;
                return function() {
                    return e(h, 1);
                };
            }
            var l = new Array(1e3);
            function h() {
                for (var e = 0; e < n; e += 2) {
                    var t = l[e],
                        r = l[e + 1];
                    t(r), (l[e] = void 0), (l[e + 1] = void 0);
                }
                n = 0;
            }
            var p,
                m,
                b,
                v,
                g = void 0;
            function w(e, t) {
                var n = this,
                    r = new this.constructor(S);
                void 0 === r[A] && W(r);
                var o = n._state;
                if (o) {
                    var s = arguments[o - 1];
                    i(function() {
                        return z(o, r, s, n._result);
                    });
                } else N(n, r, e, t);
                return r;
            }
            function _(e) {
                if (e && 'object' == typeof e && e.constructor === this)
                    return e;
                var t = new this(S);
                return j(t, e), t;
            }
            c
                ? (g = function() {
                      return y(h);
                  })
                : u
                  ? ((m = 0),
                    (b = new u(h)),
                    (v = document.createTextNode('')),
                    b.observe(v, { characterData: !0 }),
                    (g = function() {
                        v.data = m = ++m % 2;
                    }))
                  : f
                    ? (((p = new MessageChannel()).port1.onmessage = h),
                      (g = function() {
                          return p.port2.postMessage(0);
                      }))
                    : (g =
                          void 0 === s
                              ? (function() {
                                    try {
                                        var e = F,
                                            t = e('vertx');
                                        return void 0 !==
                                            (r = t.runOnLoop || t.runOnContext)
                                            ? function() {
                                                  r(h);
                                              }
                                            : d();
                                    } catch (e) {
                                        return d();
                                    }
                                })()
                              : d());
            var A = Math.random()
                .toString(36)
                .substring(16);
            function S() {}
            var T = void 0,
                P = 1,
                E = 2,
                x = new R();
            function I(e) {
                try {
                    return e.then;
                } catch (e) {
                    return (x.error = e), x;
                }
            }
            function O(t, n, r) {
                var o, s, a, u;
                n.constructor === t.constructor &&
                r === w &&
                n.constructor.resolve === _
                    ? ((a = t),
                      (u = n)._state === P
                          ? C(a, u._result)
                          : u._state === E
                            ? D(a, u._result)
                            : N(
                                  u,
                                  void 0,
                                  function(e) {
                                      return j(a, e);
                                  },
                                  function(e) {
                                      return D(a, e);
                                  }
                              ))
                    : r === x
                      ? (D(t, x.error), (x.error = null))
                      : void 0 === r
                        ? C(t, n)
                        : e(r)
                          ? ((o = n),
                            (s = r),
                            i(function(e) {
                                var t = !1,
                                    n = (function(e, t, n, r) {
                                        try {
                                            e.call(t, n, r);
                                        } catch (e) {
                                            return e;
                                        }
                                    })(
                                        s,
                                        o,
                                        function(n) {
                                            t ||
                                                ((t = !0),
                                                o !== n ? j(e, n) : C(e, n));
                                        },
                                        function(n) {
                                            t || ((t = !0), D(e, n));
                                        },
                                        e._label
                                    );
                                !t && n && ((t = !0), D(e, n));
                            }, t))
                          : C(t, n);
            }
            function j(e, t) {
                var n, r;
                e === t
                    ? D(
                          e,
                          new TypeError(
                              'You cannot resolve a promise with itself'
                          )
                      )
                    : ((r = typeof (n = t)),
                      null === n || ('object' !== r && 'function' !== r)
                          ? C(e, t)
                          : O(e, t, I(t)));
            }
            function U(e) {
                e._onerror && e._onerror(e._result), L(e);
            }
            function C(e, t) {
                e._state === T &&
                    ((e._result = t),
                    (e._state = P),
                    0 !== e._subscribers.length && i(L, e));
            }
            function D(e, t) {
                e._state === T && ((e._state = E), (e._result = t), i(U, e));
            }
            function N(e, t, n, r) {
                var o = e._subscribers,
                    s = o.length;
                (e._onerror = null),
                    (o[s] = t),
                    (o[s + P] = n),
                    (o[s + E] = r),
                    0 === s && e._state && i(L, e);
            }
            function L(e) {
                var t = e._subscribers,
                    n = e._state;
                if (0 !== t.length) {
                    for (
                        var r = void 0, o = void 0, i = e._result, s = 0;
                        s < t.length;
                        s += 3
                    )
                        (r = t[s]), (o = t[s + n]), r ? z(n, r, o, i) : o(i);
                    e._subscribers.length = 0;
                }
            }
            function R() {
                this.error = null;
            }
            var M = new R();
            function z(t, n, r, o) {
                var i = e(r),
                    s = void 0,
                    a = void 0,
                    u = void 0,
                    c = void 0;
                if (i) {
                    if (
                        ((s = (function(e, t) {
                            try {
                                return e(t);
                            } catch (e) {
                                return (M.error = e), M;
                            }
                        })(r, o)) === M
                            ? ((c = !0), (a = s.error), (s.error = null))
                            : (u = !0),
                        n === s)
                    )
                        return void D(
                            n,
                            new TypeError(
                                'A promises callback cannot return that same promise.'
                            )
                        );
                } else (s = o), (u = !0);
                n._state !== T ||
                    (i && u
                        ? j(n, s)
                        : c ? D(n, a) : t === P ? C(n, s) : t === E && D(n, s));
            }
            var G = 0;
            function W(e) {
                (e[A] = G++),
                    (e._state = void 0),
                    (e._result = void 0),
                    (e._subscribers = []);
            }
            var q = (function() {
                    function e(e, n) {
                        (this._instanceConstructor = e),
                            (this.promise = new e(S)),
                            this.promise[A] || W(this.promise),
                            t(n)
                                ? ((this.length = n.length),
                                  (this._remaining = n.length),
                                  (this._result = new Array(this.length)),
                                  0 === this.length
                                      ? C(this.promise, this._result)
                                      : ((this.length = this.length || 0),
                                        this._enumerate(n),
                                        0 === this._remaining &&
                                            C(this.promise, this._result)))
                                : D(
                                      this.promise,
                                      new Error(
                                          'Array Methods must be provided an Array'
                                      )
                                  );
                    }
                    return (
                        (e.prototype._enumerate = function(e) {
                            for (
                                var t = 0;
                                this._state === T && t < e.length;
                                t++
                            )
                                this._eachEntry(e[t], t);
                        }),
                        (e.prototype._eachEntry = function(e, t) {
                            var n = this._instanceConstructor,
                                r = n.resolve;
                            if (r === _) {
                                var o = I(e);
                                if (o === w && e._state !== T)
                                    this._settledAt(e._state, t, e._result);
                                else if ('function' != typeof o)
                                    this._remaining--, (this._result[t] = e);
                                else if (n === V) {
                                    var i = new n(S);
                                    O(i, e, o), this._willSettleAt(i, t);
                                } else
                                    this._willSettleAt(
                                        new n(function(t) {
                                            return t(e);
                                        }),
                                        t
                                    );
                            } else this._willSettleAt(r(e), t);
                        }),
                        (e.prototype._settledAt = function(e, t, n) {
                            var r = this.promise;
                            r._state === T &&
                                (this._remaining--,
                                e === E ? D(r, n) : (this._result[t] = n)),
                                0 === this._remaining && C(r, this._result);
                        }),
                        (e.prototype._willSettleAt = function(e, t) {
                            var n = this;
                            N(
                                e,
                                void 0,
                                function(e) {
                                    return n._settledAt(P, t, e);
                                },
                                function(e) {
                                    return n._settledAt(E, t, e);
                                }
                            );
                        }),
                        e
                    );
                })(),
                V = (function() {
                    function e(t) {
                        (this[A] = G++),
                            (this._result = this._state = void 0),
                            (this._subscribers = []),
                            S !== t &&
                                ('function' != typeof t &&
                                    (function() {
                                        throw new TypeError(
                                            'You must pass a resolver function as the first argument to the promise constructor'
                                        );
                                    })(),
                                this instanceof e
                                    ? (function(e, t) {
                                          try {
                                              t(
                                                  function(t) {
                                                      j(e, t);
                                                  },
                                                  function(t) {
                                                      D(e, t);
                                                  }
                                              );
                                          } catch (t) {
                                              D(e, t);
                                          }
                                      })(this, t)
                                    : (function() {
                                          throw new TypeError(
                                              "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
                                          );
                                      })());
                    }
                    return (
                        (e.prototype.catch = function(e) {
                            return this.then(null, e);
                        }),
                        (e.prototype.finally = function(e) {
                            var t = this.constructor;
                            return this.then(
                                function(n) {
                                    return t.resolve(e()).then(function() {
                                        return n;
                                    });
                                },
                                function(n) {
                                    return t.resolve(e()).then(function() {
                                        throw n;
                                    });
                                }
                            );
                        }),
                        e
                    );
                })();
            return (
                (V.prototype.then = w),
                (V.all = function(e) {
                    return new q(this, e).promise;
                }),
                (V.race = function(e) {
                    var n = this;
                    return t(e)
                        ? new n(function(t, r) {
                              for (var o = e.length, i = 0; i < o; i++)
                                  n.resolve(e[i]).then(t, r);
                          })
                        : new n(function(e, t) {
                              return t(
                                  new TypeError(
                                      'You must pass an array to race.'
                                  )
                              );
                          });
                }),
                (V.resolve = _),
                (V.reject = function(e) {
                    var t = new this(S);
                    return D(t, e), t;
                }),
                (V._setScheduler = function(e) {
                    o = e;
                }),
                (V._setAsap = function(e) {
                    i = e;
                }),
                (V._asap = i),
                (V.polyfill = function() {
                    var e = void 0;
                    if (void 0 !== k) e = k;
                    else if ('undefined' != typeof self) e = self;
                    else
                        try {
                            e = Function('return this')();
                        } catch (e) {
                            throw new Error(
                                'polyfill failed because global object is unavailable in this environment'
                            );
                        }
                    var t = e.Promise;
                    if (t) {
                        var n = null;
                        try {
                            n = Object.prototype.toString.call(t.resolve());
                        } catch (e) {}
                        if ('[object Promise]' === n && !t.cast) return;
                    }
                    e.Promise = V;
                }),
                (V.Promise = V),
                V
            );
        })();
    }).polyfill();
    function O(e) {
        return new Promise(function(t, n) {
            function r(i, s) {
                try {
                    var a = e[s ? 'throw' : 'next'](i);
                } catch (e) {
                    return void n(e);
                }
                a.done ? t(a.value) : Promise.resolve(a.value).then(r, o);
            }
            function o(e) {
                r(e, 1);
            }
            r();
        });
    }
    var j = 'https://staging-v2.inplayer.com',
        U = 'inplayer_token',
        C = {
            url: 'wss://staging-v2.inplayer.com:15671/ws',
            login: 'notifications',
            password: 'notifications',
        },
        D = {
            signIn: j + '/accounts/login',
            signOut: j + '/accounts/logout',
            signUp: j + '/accounts',
            requestNewPassword: j + '/accounts/forgot-password',
            setNewPassword: function(e) {
                return j + '/accounts/forgot-password/' + e;
            },
            getAccountInfo: j + '/accounts',
            social: function(e) {
                return j + '/accounts/social?state=' + e;
            },
            updateAccount: j + '/accounts',
            changePassword: j + '/accounts/change-password',
            getRegisterFields: function(e) {
                return j + '/accounts/register-fields/' + e;
            },
            checkAccess: function(e) {
                return j + '/items/' + e + '/access';
            },
            findAsset: function(e, t) {
                return j + '/items/' + t + '/' + e;
            },
            findExternalAsset: function(e, t) {
                return j + '/items/assets/external/' + e + '/' + t;
            },
            findPackage: function(e) {
                return j + '/items/packages/' + e;
            },
            findAccessFees: function(e) {
                return j + '/items/' + e + '/access-fees';
            },
            freemium: j + '/items/access/unlimited',
            getPaymentMethods: j + '/payments/methods',
            getPaymentTools: function(e) {
                return j + '/payments/method/' + e + '/tools';
            },
            payForAsset: j + '/payments',
            externalPayments: j + '/external-payments',
            getSubscriptions: j + '/subscriptions',
            subscribe: j + '/subscriptions',
            getDlcLinks: function(e) {
                return j + '/dlc/' + e + '/links';
            },
            getDiscount: j + '/vouchers/discount',
            getBranding: function(e) {
                return j + '/branding/paywall/' + e;
            },
            downloadFile: function(e, t) {
                return j + '/dlc/' + e + '/' + t;
            },
        },
        N = function() {
            ('undefined' != typeof localStorage && null !== localStorage) ||
                (localStorage = new e('./scratch'));
        };
    (N.prototype.signIn = function(e) {
        return (
            void 0 === e && (e = {}),
            O(
                (function*() {
                    var t = new FormData();
                    t.append('email', e.email),
                        t.append('password', e.password),
                        t.append('merchant_uuid', e.merchantUuid),
                        t.append('referrer', e.referrer);
                    var n = yield (yield fetch(D.signIn, {
                        method: 'POST',
                        body: t,
                    })).json();
                    return (
                        n.access_token &&
                            localStorage.setItem(U, n.access_token),
                        n
                    );
                })()
            )
        );
    }),
        (N.prototype.signOut = function() {
            return O(
                (function*() {
                    var e = localStorage.getItem(U);
                    return (
                        (yield (yield fetch(D.signOut, {
                            headers: { Authorization: 'Bearer ' + e },
                        })).json()).explain && localStorage.removeItem(U),
                        !0
                    );
                })()
            );
        }),
        (N.prototype.signUp = function(e) {
            return (
                void 0 === e && (e = {}),
                O(
                    (function*() {
                        var t = new FormData();
                        return (
                            t.append('full_name', e.fullName),
                            t.append('email', e.email),
                            t.append('password', e.password),
                            t.append(
                                'password_confirmation',
                                e.passwordConfirmation
                            ),
                            t.append('merchant_uuid', e.merchantUuid),
                            t.append('type', e.type),
                            t.append('referrer', e.referrer),
                            yield (yield fetch(D.signUp, {
                                method: 'POST',
                                body: t,
                            })).json()
                        );
                    })()
                )
            );
        }),
        (N.prototype.isSignedIn = function() {
            return void 0 !== localStorage.getItem(U);
        }),
        (N.prototype.token = function() {
            return localStorage.getItem(U);
        }),
        (N.prototype.setTokenInCookie = function(e) {
            void 0 === e && (e = ''), localStorage.setItem(U, e);
        }),
        (N.prototype.requestNewPassword = function(e) {
            return (
                void 0 === e && (e = {}),
                O(
                    (function*() {
                        var t = new FormData();
                        return (
                            t.append('email', e.email),
                            t.append('merchant_uuid', e.merchantUuid),
                            yield (yield fetch(D.requestNewPassword, {
                                method: 'POST',
                                body: t,
                            })).json()
                        );
                    })()
                )
            );
        }),
        (N.prototype.setNewPassword = function(e, t) {
            return (
                void 0 === e && (e = {}),
                void 0 === t && (t = ''),
                O(
                    (function*() {
                        var n =
                            'password=' +
                            e.password +
                            '&password_confirmation=' +
                            e.passwordConfirmation;
                        return yield fetch(D.setNewPassword(t), {
                            method: 'PUT',
                            body: n,
                            headers: {
                                'Content-Type': 'x-www-form-urlencoded',
                            },
                        });
                    })()
                )
            );
        }),
        (N.prototype.getAccountInfo = function(e) {
            return (
                void 0 === e && (e = ''),
                O(
                    (function*() {
                        var t = yield (yield fetch(D.getAccountInfo, {
                            method: 'GET',
                            headers: { Authorization: 'Bearer ' + e },
                        })).json();
                        if (t) return t;
                    })()
                )
            );
        }),
        (N.prototype.getSocialLoginUrls = function(e) {
            return O(
                (function*() {
                    return yield (yield fetch(D.social(e), {
                        method: 'GET',
                    })).json();
                })()
            );
        }),
        (N.prototype.updateAccount = function(e, t) {
            return (
                void 0 === e && (e = {}),
                void 0 === t && (t = ''),
                O(
                    (function*() {
                        var n = '';
                        return (
                            Object.keys(e).forEach(function(t) {
                                n +=
                                    (n ? '&' : '') +
                                    ('fullName' === t
                                        ? 'full_name'
                                        : 'metadata[' + t + ']') +
                                    '=' +
                                    e[t];
                            }),
                            yield (yield fetch(D.updateAccount, {
                                method: 'PUT',
                                body: n,
                                headers: {
                                    Authorization: 'Bearer ' + t,
                                    'Content-Type': 'x-www-form-urlencoded',
                                },
                            })).json()
                        );
                    })()
                )
            );
        }),
        (N.prototype.changePassword = function(e, t) {
            return (
                void 0 === e && (e = {}),
                void 0 === t && (t = ''),
                O(
                    (function*() {
                        var n = new FormData();
                        return (
                            n.append('old_password', e.oldPassword),
                            n.append('password', e.password),
                            n.append(
                                'password_confirmation',
                                e.passwordConfirmation
                            ),
                            yield (yield fetch(D.changePassword, {
                                method: 'POST',
                                body: n,
                                headers: { Authorization: 'Bearer ' + t },
                            })).json()
                        );
                    })()
                )
            );
        }),
        (N.prototype.getRegisterFields = function(e) {
            return (
                void 0 === e && (e = ''),
                O(
                    (function*() {
                        return yield (yield fetch(
                            D.getRegisterFields(e)
                        )).json();
                    })()
                )
            );
        });
    var L = function() {};
    (L.prototype.checkAccessForAsset = function(e, t) {
        return O(
            (function*() {
                return yield (yield fetch(D.checkAccess(t), {
                    headers: { Authorization: 'Bearer ' + e },
                })).json();
            })()
        );
    }),
        (L.prototype.findAsset = function(e, t) {
            return O(
                (function*() {
                    return yield (yield fetch(D.findAsset(e, t), {
                        method: 'GET',
                    })).json();
                })()
            );
        }),
        (L.prototype.findExternalAsset = function(e, t) {
            return O(
                (function*() {
                    return yield (yield fetch(D.findExternalAsset(e, t), {
                        method: 'GET',
                    })).json();
                })()
            );
        }),
        (L.prototype.findPackage = function(e) {
            return O(
                (function*() {
                    return yield (yield fetch(D.findPackage(e), {
                        method: 'GET',
                    })).json();
                })()
            );
        }),
        (L.prototype.getAssetAccessFees = function(e) {
            return O(
                (function*() {
                    return yield (yield fetch(D.findAccessFees(e), {
                        method: 'GET',
                    })).json();
                })()
            );
        }),
        (L.prototype.getFreemiumAsset = function(e, t) {
            return O(
                (function*() {
                    var n = new FormData();
                    return (
                        n.append('access_fee', t),
                        yield (yield fetch(D.freemium, {
                            method: 'POST',
                            headers: { Authorization: 'Bearer ' + e },
                            body: n,
                        })).json()
                    );
                })()
            );
        });
    var R = function() {};
    (R.prototype.getPaymentMethods = function(e) {
        return O(
            (function*() {
                return yield (yield fetch(D.getPaymentMethods, {
                    headers: { Authorization: 'Bearer ' + e },
                })).json();
            })()
        );
    }),
        (R.prototype.getPaymentTools = function(e, t) {
            return O(
                (function*() {
                    return yield (yield fetch(D.getPaymentTools(t), {
                        headers: { Authorization: 'Bearer ' + e },
                    })).json();
                })()
            );
        }),
        (R.prototype.payForAsset = function(e, t) {
            return (
                void 0 === e && (e = ''),
                void 0 === t && (t = {}),
                O(
                    (function*() {
                        var n = new FormData();
                        return (
                            n.append('number', t.number),
                            n.append('card_name', t.cardName),
                            n.append('exp_month', t.expMonth),
                            n.append('exp_year', t.expYear),
                            n.append('cvv', t.cvv),
                            n.append('access_fee', t.accessFee),
                            n.append('payment_method', t.paymentMethod),
                            n.append('referrer', t.referrer),
                            t.voucherCode &&
                                n.append('voucher_code', t.voucherCode),
                            yield (yield fetch(D.payForAsset, {
                                method: 'POST',
                                headers: { Authorization: 'Bearer ' + e },
                                body: n,
                            })).json()
                        );
                    })()
                )
            );
        }),
        (R.prototype.getPayPalParams = function(e, t) {
            return (
                void 0 === e && (e = ''),
                void 0 === t && (t = {}),
                O(
                    (function*() {
                        var n = new FormData();
                        return (
                            n.append('origin', t.origin),
                            n.append('access_fee', t.accessFeeId),
                            n.append('payment_method', t.paymentMethod),
                            n.append('voucher_code', t.voucherCode),
                            yield (yield fetch(D.externalPayments, {
                                method: 'POST',
                                headers: { Authorization: 'Bearer ' + e },
                                body: n,
                            })).json()
                        );
                    })()
                )
            );
        });
    var M = function() {};
    (M.prototype.getSubscriptions = function(e) {
        return O(
            (function*() {
                return (yield fetch(D.getSubscriptions, {
                    method: 'GET',
                    headers: { Authorization: 'Bearer ' + e },
                })).json();
            })()
        );
    }),
        (M.prototype.cancelSubscription = function(e, t) {
            return O(
                (function*() {
                    return (yield fetch(e, {
                        method: 'GET',
                        headers: { Authorization: 'Bearer ' + t },
                    })).json();
                })()
            );
        }),
        (M.prototype.assetSubscribe = function(e, t) {
            return (
                void 0 === e && (e = ''),
                void 0 === t && (t = {}),
                O(
                    (function*() {
                        var n = new FormData();
                        return (
                            n.append('number', t.number),
                            n.append('card_name', t.cardName),
                            n.append('exp_month', t.expMonth),
                            n.append('exp_year', t.expYear),
                            n.append('cvv', t.cvv),
                            n.append('access_fee', t.accessFee),
                            n.append('payment_method', t.paymentMethod),
                            n.append('referrer', t.referrer),
                            t.voucherCode &&
                                n.append('voucher_code', t.voucherCode),
                            yield (yield fetch(D.subscribe, {
                                method: 'POST',
                                headers: { Authorization: 'Bearer ' + e },
                                body: n,
                            })).json()
                        );
                    })()
                )
            );
        });
    var z = function() {};
    (z.prototype.getDlcLinks = function(e, t) {
        return O(
            (function*() {
                return yield (yield fetch(D.getDlcLinks(t), {
                    headers: { Authorization: 'Bearer ' + e },
                })).json();
            })()
        );
    }),
        (z.prototype.getDiscount = function(e, t) {
            return (
                void 0 === e && (e = ''),
                void 0 === t && (t = {}),
                O(
                    (function*() {
                        var n = new FormData();
                        return (
                            n.append('access_fee_id', t.accessFeeId),
                            n.append('voucher_code', t.voucherCode),
                            n.append('merchant_id', t.merchantUuid),
                            yield (yield fetch(D.getDiscount, {
                                method: 'POST',
                                headers: { Authorization: 'Bearer ' + e },
                                body: n,
                            })).json()
                        );
                    })()
                )
            );
        }),
        (z.prototype.getBranding = function(e) {
            return O(
                (function*() {
                    return yield (yield fetch(D.getBranding(e), {
                        method: 'GET',
                    })).json();
                })()
            );
        }),
        (z.prototype.downloadProtectedFile = function(e, t, n) {
            return O(
                (function*() {
                    return yield (yield fetch(D.downloadFile(t, n), {
                        headers: { Authorization: 'Bearer ' + e },
                    })).json();
                })()
            );
        });
    var G = I(function(e, t) {
            (function() {
                var e,
                    n,
                    r,
                    o,
                    i = {}.hasOwnProperty,
                    s = [].slice;
                (e = { LF: '\n', NULL: '\0' }),
                    (r = (function() {
                        var t;
                        function n(e, t, n) {
                            (this.command = e),
                                (this.headers = null != t ? t : {}),
                                (this.body = null != n ? n : '');
                        }
                        return (
                            (n.prototype.toString = function() {
                                var t, r, o, s, a;
                                (t = [this.command]),
                                    (o =
                                        !1 ===
                                        this.headers['content-length']) &&
                                        delete this.headers['content-length'],
                                    (a = this.headers);
                                for (r in a)
                                    i.call(a, r) &&
                                        ((s = a[r]), t.push(r + ':' + s));
                                return (
                                    this.body &&
                                        !o &&
                                        t.push(
                                            'content-length:' +
                                                n.sizeOfUTF8(this.body)
                                        ),
                                    t.push(e.LF + this.body),
                                    t.join(e.LF)
                                );
                            }),
                            (n.sizeOfUTF8 = function(e) {
                                return e
                                    ? encodeURI(e).match(/%..|./g).length
                                    : 0;
                            }),
                            (t = function(t) {
                                var r,
                                    o,
                                    i,
                                    s,
                                    a,
                                    u,
                                    c,
                                    f,
                                    d,
                                    l,
                                    h,
                                    p,
                                    y,
                                    m,
                                    b,
                                    v,
                                    g;
                                for (
                                    s = t.search(RegExp('' + e.LF + e.LF)),
                                        i = (a = t
                                            .substring(0, s)
                                            .split(e.LF)).shift(),
                                        u = {},
                                        p = function(e) {
                                            return e.replace(/^\s+|\s+$/g, '');
                                        },
                                        y = 0,
                                        b = (v = a.reverse()).length;
                                    y < b;
                                    y++
                                )
                                    (f = (l = v[y]).indexOf(':')),
                                        (u[p(l.substring(0, f))] = p(
                                            l.substring(f + 1)
                                        ));
                                if (
                                    ((r = ''), (h = s + 2), u['content-length'])
                                )
                                    (d = parseInt(u['content-length'])),
                                        (r = ('' + t).substring(h, h + d));
                                else
                                    for (
                                        o = null, c = m = h, g = t.length;
                                        (h <= g ? m < g : m > g) &&
                                        (o = t.charAt(c)) !== e.NULL;
                                        c = h <= g ? ++m : --m
                                    )
                                        r += o;
                                return new n(i, u, r);
                            }),
                            (n.unmarshall = function(n) {
                                var r;
                                return (function() {
                                    var o, i, s, a;
                                    for (
                                        a = [],
                                            o = 0,
                                            i = (s = n.split(
                                                RegExp('' + e.NULL + e.LF + '*')
                                            )).length;
                                        o < i;
                                        o++
                                    )
                                        (null != (r = s[o])
                                            ? r.length
                                            : void 0) > 0 && a.push(t(r));
                                    return a;
                                })();
                            }),
                            (n.marshall = function(t, r, o) {
                                return new n(t, r, o).toString() + e.NULL;
                            }),
                            n
                        );
                    })()),
                    (n = (function() {
                        var t;
                        function n(e) {
                            (this.ws = e),
                                (this.ws.binaryType = 'arraybuffer'),
                                (this.counter = 0),
                                (this.connected = !1),
                                (this.heartbeat = {
                                    outgoing: 1e4,
                                    incoming: 1e4,
                                }),
                                (this.maxWebSocketFrameSize = 16384),
                                (this.subscriptions = {});
                        }
                        return (
                            (n.prototype.debug = function(e) {
                                var t;
                                return 'undefined' != typeof window &&
                                    null !== window &&
                                    null != (t = window.console)
                                    ? t.log(e)
                                    : void 0;
                            }),
                            (t = function() {
                                return Date.now
                                    ? Date.now()
                                    : new Date().valueOf;
                            }),
                            (n.prototype._transmit = function(e, t, n) {
                                var o;
                                for (
                                    o = r.marshall(e, t, n),
                                        'function' == typeof this.debug &&
                                            this.debug('>>> ' + o);
                                    ;

                                ) {
                                    if (
                                        !(o.length > this.maxWebSocketFrameSize)
                                    )
                                        return this.ws.send(o);
                                    this.ws.send(
                                        o.substring(
                                            0,
                                            this.maxWebSocketFrameSize
                                        )
                                    ),
                                        (o = o.substring(
                                            this.maxWebSocketFrameSize
                                        )),
                                        'function' == typeof this.debug &&
                                            this.debug(
                                                'remaining = ' + o.length
                                            );
                                }
                            }),
                            (n.prototype._setupHeartbeat = function(n) {
                                var r, i, s, a, u, c, f, d;
                                if (
                                    (u = n.version) === o.VERSIONS.V1_1 ||
                                    u === o.VERSIONS.V1_2
                                )
                                    return (
                                        (i = (c = (function() {
                                            var e, t, r, o;
                                            for (
                                                o = [],
                                                    e = 0,
                                                    t = (r = n[
                                                        'heart-beat'
                                                    ].split(',')).length;
                                                e < t;
                                                e++
                                            )
                                                (a = r[e]), o.push(parseInt(a));
                                            return o;
                                        })())[0]),
                                        (r = c[1]),
                                        0 !== this.heartbeat.outgoing &&
                                            0 !== r &&
                                            ((s = Math.max(
                                                this.heartbeat.outgoing,
                                                r
                                            )),
                                            'function' == typeof this.debug &&
                                                this.debug(
                                                    'send PING every ' +
                                                        s +
                                                        'ms'
                                                ),
                                            (this.pinger = o.setInterval(
                                                s,
                                                ((f = this),
                                                function() {
                                                    return (
                                                        f.ws.send(e.LF),
                                                        'function' ==
                                                        typeof f.debug
                                                            ? f.debug(
                                                                  '>>> PING'
                                                              )
                                                            : void 0
                                                    );
                                                })
                                            ))),
                                        0 !== this.heartbeat.incoming && 0 !== i
                                            ? ((s = Math.max(
                                                  this.heartbeat.incoming,
                                                  i
                                              )),
                                              'function' == typeof this.debug &&
                                                  this.debug(
                                                      'check PONG every ' +
                                                          s +
                                                          'ms'
                                                  ),
                                              (this.ponger = o.setInterval(
                                                  s,
                                                  ((d = this),
                                                  function() {
                                                      var e;
                                                      if (
                                                          (e =
                                                              t() -
                                                              d.serverActivity) >
                                                          2 * s
                                                      )
                                                          return (
                                                              'function' ==
                                                                  typeof d.debug &&
                                                                  d.debug(
                                                                      'did not receive server activity for the last ' +
                                                                          e +
                                                                          'ms'
                                                                  ),
                                                              d.ws.close()
                                                          );
                                                  })
                                              )))
                                            : void 0
                                    );
                            }),
                            (n.prototype._parseConnect = function() {
                                var e, t, n, r;
                                switch (((r = {}),
                                (e =
                                    1 <= arguments.length
                                        ? s.call(arguments, 0)
                                        : []).length)) {
                                    case 2:
                                        (r = e[0]), (t = e[1]);
                                        break;
                                    case 3:
                                        e[1] instanceof Function
                                            ? ((r = e[0]),
                                              (t = e[1]),
                                              (n = e[2]))
                                            : ((r.login = e[0]),
                                              (r.passcode = e[1]),
                                              (t = e[2]));
                                        break;
                                    case 4:
                                        (r.login = e[0]),
                                            (r.passcode = e[1]),
                                            (t = e[2]),
                                            (n = e[3]);
                                        break;
                                    default:
                                        (r.login = e[0]),
                                            (r.passcode = e[1]),
                                            (t = e[2]),
                                            (n = e[3]),
                                            (r.host = e[4]);
                                }
                                return [r, t, n];
                            }),
                            (n.prototype.connect = function() {
                                var n, i, a, u, c, f, d;
                                return (
                                    (n =
                                        1 <= arguments.length
                                            ? s.call(arguments, 0)
                                            : []),
                                    (u = this._parseConnect.apply(this, n)),
                                    (a = u[0]),
                                    (this.connectCallback = u[1]),
                                    (i = u[2]),
                                    'function' == typeof this.debug &&
                                        this.debug('Opening Web Socket...'),
                                    (this.ws.onmessage = ((c = this),
                                    function(n) {
                                        var o, s, a, u, f, d, l, h, p, y, m, b;
                                        if (
                                            ((u =
                                                'undefined' !=
                                                    typeof ArrayBuffer &&
                                                n.data instanceof ArrayBuffer
                                                    ? ((o = new Uint8Array(
                                                          n.data
                                                      )),
                                                      'function' ==
                                                          typeof c.debug &&
                                                          c.debug(
                                                              '--- got data length: ' +
                                                                  o.length
                                                          ),
                                                      (function() {
                                                          var e, t, n;
                                                          for (
                                                              n = [],
                                                                  e = 0,
                                                                  t = o.length;
                                                              e < t;
                                                              e++
                                                          )
                                                              (s = o[e]),
                                                                  n.push(
                                                                      String.fromCharCode(
                                                                          s
                                                                      )
                                                                  );
                                                          return n;
                                                      })().join(''))
                                                    : n.data),
                                            (c.serverActivity = t()),
                                            u !== e.LF)
                                        ) {
                                            for (
                                                'function' == typeof c.debug &&
                                                    c.debug('<<< ' + u),
                                                    b = [],
                                                    p = 0,
                                                    y = (m = r.unmarshall(u))
                                                        .length;
                                                p < y;
                                                p++
                                            )
                                                switch ((f = m[p]).command) {
                                                    case 'CONNECTED':
                                                        'function' ==
                                                            typeof c.debug &&
                                                            c.debug(
                                                                'connected to server ' +
                                                                    f.headers
                                                                        .server
                                                            ),
                                                            (c.connected = !0),
                                                            c._setupHeartbeat(
                                                                f.headers
                                                            ),
                                                            b.push(
                                                                'function' ==
                                                                typeof c.connectCallback
                                                                    ? c.connectCallback(
                                                                          f
                                                                      )
                                                                    : void 0
                                                            );
                                                        break;
                                                    case 'MESSAGE':
                                                        (h =
                                                            f.headers
                                                                .subscription),
                                                            (l =
                                                                c.subscriptions[
                                                                    h
                                                                ] ||
                                                                c.onreceive)
                                                                ? ((a = c),
                                                                  (d =
                                                                      f.headers[
                                                                          'message-id'
                                                                      ]),
                                                                  (f.ack = function(
                                                                      e
                                                                  ) {
                                                                      return (
                                                                          null ==
                                                                              e &&
                                                                              (e = {}),
                                                                          a.ack(
                                                                              d,
                                                                              h,
                                                                              e
                                                                          )
                                                                      );
                                                                  }),
                                                                  (f.nack = function(
                                                                      e
                                                                  ) {
                                                                      return (
                                                                          null ==
                                                                              e &&
                                                                              (e = {}),
                                                                          a.nack(
                                                                              d,
                                                                              h,
                                                                              e
                                                                          )
                                                                      );
                                                                  }),
                                                                  b.push(l(f)))
                                                                : b.push(
                                                                      'function' ==
                                                                      typeof c.debug
                                                                          ? c.debug(
                                                                                'Unhandled received MESSAGE: ' +
                                                                                    f
                                                                            )
                                                                          : void 0
                                                                  );
                                                        break;
                                                    case 'RECEIPT':
                                                        b.push(
                                                            'function' ==
                                                            typeof c.onreceipt
                                                                ? c.onreceipt(f)
                                                                : void 0
                                                        );
                                                        break;
                                                    case 'ERROR':
                                                        b.push(
                                                            'function' ==
                                                            typeof i
                                                                ? i(f)
                                                                : void 0
                                                        );
                                                        break;
                                                    default:
                                                        b.push(
                                                            'function' ==
                                                            typeof c.debug
                                                                ? c.debug(
                                                                      'Unhandled frame: ' +
                                                                          f
                                                                  )
                                                                : void 0
                                                        );
                                                }
                                            return b;
                                        }
                                        'function' == typeof c.debug &&
                                            c.debug('<<< PONG');
                                    })),
                                    (this.ws.onclose = ((f = this),
                                    function() {
                                        var e;
                                        return (
                                            (e =
                                                'Whoops! Lost connection to ' +
                                                f.ws.url),
                                            'function' == typeof f.debug &&
                                                f.debug(e),
                                            f._cleanUp(),
                                            'function' == typeof i
                                                ? i(e)
                                                : void 0
                                        );
                                    })),
                                    (this.ws.onopen = ((d = this),
                                    function() {
                                        return (
                                            'function' == typeof d.debug &&
                                                d.debug('Web Socket Opened...'),
                                            (a[
                                                'accept-version'
                                            ] = o.VERSIONS.supportedVersions()),
                                            (a['heart-beat'] = [
                                                d.heartbeat.outgoing,
                                                d.heartbeat.incoming,
                                            ].join(',')),
                                            d._transmit('CONNECT', a)
                                        );
                                    }))
                                );
                            }),
                            (n.prototype.disconnect = function(e, t) {
                                return (
                                    null == t && (t = {}),
                                    this._transmit('DISCONNECT', t),
                                    (this.ws.onclose = null),
                                    this.ws.close(),
                                    this._cleanUp(),
                                    'function' == typeof e ? e() : void 0
                                );
                            }),
                            (n.prototype._cleanUp = function() {
                                if (
                                    ((this.connected = !1),
                                    this.pinger && o.clearInterval(this.pinger),
                                    this.ponger)
                                )
                                    return o.clearInterval(this.ponger);
                            }),
                            (n.prototype.send = function(e, t, n) {
                                return (
                                    null == t && (t = {}),
                                    null == n && (n = ''),
                                    (t.destination = e),
                                    this._transmit('SEND', t, n)
                                );
                            }),
                            (n.prototype.subscribe = function(e, t, n) {
                                var r;
                                return (
                                    null == n && (n = {}),
                                    n.id || (n.id = 'sub-' + this.counter++),
                                    (n.destination = e),
                                    (this.subscriptions[n.id] = t),
                                    this._transmit('SUBSCRIBE', n),
                                    (r = this),
                                    {
                                        id: n.id,
                                        unsubscribe: function() {
                                            return r.unsubscribe(n.id);
                                        },
                                    }
                                );
                            }),
                            (n.prototype.unsubscribe = function(e) {
                                return (
                                    delete this.subscriptions[e],
                                    this._transmit('UNSUBSCRIBE', { id: e })
                                );
                            }),
                            (n.prototype.begin = function(e) {
                                var t, n;
                                return (
                                    (n = e || 'tx-' + this.counter++),
                                    this._transmit('BEGIN', { transaction: n }),
                                    (t = this),
                                    {
                                        id: n,
                                        commit: function() {
                                            return t.commit(n);
                                        },
                                        abort: function() {
                                            return t.abort(n);
                                        },
                                    }
                                );
                            }),
                            (n.prototype.commit = function(e) {
                                return this._transmit('COMMIT', {
                                    transaction: e,
                                });
                            }),
                            (n.prototype.abort = function(e) {
                                return this._transmit('ABORT', {
                                    transaction: e,
                                });
                            }),
                            (n.prototype.ack = function(e, t, n) {
                                return (
                                    null == n && (n = {}),
                                    (n['message-id'] = e),
                                    (n.subscription = t),
                                    this._transmit('ACK', n)
                                );
                            }),
                            (n.prototype.nack = function(e, t, n) {
                                return (
                                    null == n && (n = {}),
                                    (n['message-id'] = e),
                                    (n.subscription = t),
                                    this._transmit('NACK', n)
                                );
                            }),
                            n
                        );
                    })()),
                    (o = {
                        VERSIONS: {
                            V1_0: '1.0',
                            V1_1: '1.1',
                            V1_2: '1.2',
                            supportedVersions: function() {
                                return '1.1,1.0';
                            },
                        },
                        client: function(e, t) {
                            var r;
                            return (
                                null == t && (t = ['v10.stomp', 'v11.stomp']),
                                (r = new (o.WebSocketClass || WebSocket)(e, t)),
                                new n(r)
                            );
                        },
                        over: function(e) {
                            return new n(e);
                        },
                        Frame: r,
                    }),
                    null !== t && (t.Stomp = o),
                    'undefined' != typeof window && null !== window
                        ? ((o.setInterval = function(e, t) {
                              return window.setInterval(t, e);
                          }),
                          (o.clearInterval = function(e) {
                              return window.clearInterval(e);
                          }),
                          (window.Stomp = o))
                        : t || (self.Stomp = o);
            }.call(k));
        }),
        W = (G.Stomp,
        I(function(e, r) {
            (function() {
                var e, o, i, s, a, u;
                (o = t),
                    ((e = G).Stomp.setInterval = function(e, t) {
                        return setInterval(t, e);
                    }),
                    (e.Stomp.clearInterval = function(e) {
                        return clearInterval(e);
                    }),
                    (a = function(e, t) {
                        var n, r;
                        return (
                            (n = null),
                            (r = {
                                url: 'tcp:// ' + t + ':' + e,
                                send: function(e) {
                                    return n.write(e);
                                },
                                close: function() {
                                    return n.end();
                                },
                            }),
                            (n = o.connect(e, t, function(e) {
                                return r.onopen();
                            })).on('error', function(e) {
                                return 'function' == typeof r.onclose
                                    ? r.onclose(e)
                                    : void 0;
                            }),
                            n.on('close', function(e) {
                                return 'function' == typeof r.onclose
                                    ? r.onclose(e)
                                    : void 0;
                            }),
                            n.on('data', function(e) {
                                var t;
                                return (
                                    (t = { data: e.toString() }), r.onmessage(t)
                                );
                            }),
                            r
                        );
                    }),
                    (u = function(e) {
                        var t, r, o, i;
                        return (
                            (t = n.client),
                            (r = null),
                            (i = {
                                url: e,
                                send: function(e) {
                                    return r.sendUTF(e);
                                },
                                close: function() {
                                    return r.close();
                                },
                            }),
                            (o = new t()).on('connect', function(e) {
                                return (
                                    (r = e),
                                    i.onopen(),
                                    r.on('error', function(e) {
                                        return 'function' == typeof i.onclose
                                            ? i.onclose(e)
                                            : void 0;
                                    }),
                                    r.on('close', function() {
                                        return 'function' == typeof i.onclose
                                            ? i.onclose()
                                            : void 0;
                                    }),
                                    r.on('message', function(e) {
                                        var t;
                                        if ('utf8' === e.type)
                                            return (
                                                (t = { data: e.utf8Data }),
                                                i.onmessage(t)
                                            );
                                    })
                                );
                            }),
                            o.connect(e),
                            i
                        );
                    }),
                    (i = function(t, n) {
                        var r;
                        return (r = a(n, t)), e.Stomp.over(r);
                    }),
                    (s = function(t) {
                        var n;
                        return (n = u(t)), e.Stomp.over(n);
                    }),
                    (r.overTCP = i),
                    (r.overWS = s);
            }.call(k));
        })),
        q = (W.net, W.websocket, W.overTCP, W.overWS, G.Stomp),
        V = W.overTCP,
        H = W.overWS;
    (q.overTCP = V), (q.overWS = H);
    var Y = function() {
        this.subscription = null;
    };
    (Y.prototype.subscribe = function(e, t) {
        if (!e && '' !== e) return !1;
        if (t && t.onmessage) {
            if ('function' != typeof t.onmessage) return !1;
        } else
            t.onMessage = function(e) {
                return console.log('Received message:', e);
            };
        if (t && t.onopen && 'function' != typeof t.onopen) return !1;
        var n = new ('MozWebSocket' in window ? MozWebSocket : WebSocket)(
            C.url
        );
        (this.client = q.over(n)),
            (this.client.heartbeat.outgoing = 2e4),
            (this.client.heartbeat.incoming = 2e4),
            (this.client.debug = null);
        var r = this,
            o = e;
        this.client.connect(
            { login: C.login, passcode: C.password, 'client-id': e },
            function() {
                t && t.onopen && t.onopen(),
                    r.client.subscribe(
                        '/exchange/notifications/' + o,
                        t.onmessage,
                        { id: e, ack: 'client' }
                    );
            },
            function(e) {
                'string' != typeof e && console.warn('Stomp error: ', e);
            }
        ),
            this.setClient(this.client);
    }),
        (Y.prototype.setClient = function(e) {
            this.subscription = e;
        }),
        (Y.prototype.unsubscribe = function() {
            this.subscription &&
                this.subscription.connected &&
                this.subscription.unsubscribe();
        });
    var K = function() {
        (this.User = new N()),
            (this.Asset = new L()),
            (this.Payment = new R()),
            (this.Subscription = new M()),
            (this.Misc = new z()),
            (this.Socket = new Y());
    };
    return (
        (K.prototype.subscribe = function(e, t) {
            return (
                !!this.User.isSignedIn() && (this.Socket.subscribe(e, t), !0)
            );
        }),
        (K.prototype.unsubscribe = function() {
            this.Socket.unsubscribe();
        }),
        new K()
    );
});
