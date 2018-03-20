!(function(t, e) {
    'object' == typeof exports && 'undefined' != typeof module
        ? (module.exports = e(
              require('es6-promise/auto'),
              require('net'),
              require('websocket')
          ))
        : 'function' == typeof define && define.amd
            ? define(['es6-promise/auto', 'net', 'websocket'], e)
            : (t.InPlayer = e(null, t.net, t.websocket));
})(this, function(t, e, n) {
    'use strict';
    (e = e && e.hasOwnProperty('default') ? e.default : e),
        (n = n && n.hasOwnProperty('default') ? n.default : n),
        (function(t) {
            if (!t.fetch) {
                var e = {
                    searchParams: 'URLSearchParams' in t,
                    iterable: 'Symbol' in t && 'iterator' in Symbol,
                    blob:
                        'FileReader' in t &&
                        'Blob' in t &&
                        (function() {
                            try {
                                return new Blob(), !0;
                            } catch (t) {
                                return !1;
                            }
                        })(),
                    formData: 'FormData' in t,
                    arrayBuffer: 'ArrayBuffer' in t,
                };
                if (e.arrayBuffer)
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
                        r = function(t) {
                            return t && DataView.prototype.isPrototypeOf(t);
                        },
                        i =
                            ArrayBuffer.isView ||
                            function(t) {
                                return (
                                    t &&
                                    n.indexOf(
                                        Object.prototype.toString.call(t)
                                    ) > -1
                                );
                            };
                (f.prototype.append = function(t, e) {
                    (t = a(t)), (e = c(e));
                    var n = this.map[t];
                    this.map[t] = n ? n + ',' + e : e;
                }),
                    (f.prototype.delete = function(t) {
                        delete this.map[a(t)];
                    }),
                    (f.prototype.get = function(t) {
                        return (t = a(t)), this.has(t) ? this.map[t] : null;
                    }),
                    (f.prototype.has = function(t) {
                        return this.map.hasOwnProperty(a(t));
                    }),
                    (f.prototype.set = function(t, e) {
                        this.map[a(t)] = c(e);
                    }),
                    (f.prototype.forEach = function(t, e) {
                        for (var n in this.map)
                            this.map.hasOwnProperty(n) &&
                                t.call(e, this.map[n], n, this);
                    }),
                    (f.prototype.keys = function() {
                        var t = [];
                        return (
                            this.forEach(function(e, n) {
                                t.push(n);
                            }),
                            s(t)
                        );
                    }),
                    (f.prototype.values = function() {
                        var t = [];
                        return (
                            this.forEach(function(e) {
                                t.push(e);
                            }),
                            s(t)
                        );
                    }),
                    (f.prototype.entries = function() {
                        var t = [];
                        return (
                            this.forEach(function(e, n) {
                                t.push([n, e]);
                            }),
                            s(t)
                        );
                    }),
                    e.iterable &&
                        (f.prototype[Symbol.iterator] = f.prototype.entries);
                var o = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
                (g.prototype.clone = function() {
                    return new g(this, { body: this._bodyInit });
                }),
                    v.call(g.prototype),
                    v.call(m.prototype),
                    (m.prototype.clone = function() {
                        return new m(this._bodyInit, {
                            status: this.status,
                            statusText: this.statusText,
                            headers: new f(this.headers),
                            url: this.url,
                        });
                    }),
                    (m.error = function() {
                        var t = new m(null, { status: 0, statusText: '' });
                        return (t.type = 'error'), t;
                    });
                var u = [301, 302, 303, 307, 308];
                (m.redirect = function(t, e) {
                    if (-1 === u.indexOf(e))
                        throw new RangeError('Invalid status code');
                    return new m(null, { status: e, headers: { location: t } });
                }),
                    (t.Headers = f),
                    (t.Request = g),
                    (t.Response = m),
                    (t.fetch = function(t, n) {
                        return new Promise(function(r, i) {
                            var o = new g(t, n),
                                u = new XMLHttpRequest();
                            (u.onload = function() {
                                var t,
                                    e,
                                    n = {
                                        status: u.status,
                                        statusText: u.statusText,
                                        headers: ((t =
                                            u.getAllResponseHeaders() || ''),
                                        (e = new f()),
                                        t.split(/\r?\n/).forEach(function(t) {
                                            var n = t.split(':'),
                                                r = n.shift().trim();
                                            if (r) {
                                                var i = n.join(':').trim();
                                                e.append(r, i);
                                            }
                                        }),
                                        e),
                                    };
                                n.url =
                                    'responseURL' in u
                                        ? u.responseURL
                                        : n.headers.get('X-Request-URL');
                                var i =
                                    'response' in u
                                        ? u.response
                                        : u.responseText;
                                r(new m(i, n));
                            }),
                                (u.onerror = function() {
                                    i(new TypeError('Network request failed'));
                                }),
                                (u.ontimeout = function() {
                                    i(new TypeError('Network request failed'));
                                }),
                                u.open(o.method, o.url, !0),
                                'include' === o.credentials &&
                                    (u.withCredentials = !0),
                                'responseType' in u &&
                                    e.blob &&
                                    (u.responseType = 'blob'),
                                o.headers.forEach(function(t, e) {
                                    u.setRequestHeader(e, t);
                                }),
                                u.send(
                                    void 0 === o._bodyInit ? null : o._bodyInit
                                );
                        });
                    }),
                    (t.fetch.polyfill = !0);
            }
            function a(t) {
                if (
                    ('string' != typeof t && (t = String(t)),
                    /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))
                )
                    throw new TypeError(
                        'Invalid character in header field name'
                    );
                return t.toLowerCase();
            }
            function c(t) {
                return 'string' != typeof t && (t = String(t)), t;
            }
            function s(t) {
                var n = {
                    next: function() {
                        var e = t.shift();
                        return { done: void 0 === e, value: e };
                    },
                };
                return (
                    e.iterable &&
                        (n[Symbol.iterator] = function() {
                            return n;
                        }),
                    n
                );
            }
            function f(t) {
                (this.map = {}),
                    t instanceof f
                        ? t.forEach(function(t, e) {
                              this.append(e, t);
                          }, this)
                        : Array.isArray(t)
                            ? t.forEach(function(t) {
                                  this.append(t[0], t[1]);
                              }, this)
                            : t &&
                              Object.getOwnPropertyNames(t).forEach(function(
                                  e
                              ) {
                                  this.append(e, t[e]);
                              },
                              this);
            }
            function l(t) {
                if (t.bodyUsed)
                    return Promise.reject(new TypeError('Already read'));
                t.bodyUsed = !0;
            }
            function h(t) {
                return new Promise(function(e, n) {
                    (t.onload = function() {
                        e(t.result);
                    }),
                        (t.onerror = function() {
                            n(t.error);
                        });
                });
            }
            function p(t) {
                var e = new FileReader(),
                    n = h(e);
                return e.readAsArrayBuffer(t), n;
            }
            function d(t) {
                if (t.slice) return t.slice(0);
                var e = new Uint8Array(t.byteLength);
                return e.set(new Uint8Array(t)), e.buffer;
            }
            function v() {
                return (
                    (this.bodyUsed = !1),
                    (this._initBody = function(t) {
                        if (((this._bodyInit = t), t))
                            if ('string' == typeof t) this._bodyText = t;
                            else if (e.blob && Blob.prototype.isPrototypeOf(t))
                                this._bodyBlob = t;
                            else if (
                                e.formData &&
                                FormData.prototype.isPrototypeOf(t)
                            )
                                this._bodyFormData = t;
                            else if (
                                e.searchParams &&
                                URLSearchParams.prototype.isPrototypeOf(t)
                            )
                                this._bodyText = t.toString();
                            else if (e.arrayBuffer && e.blob && r(t))
                                (this._bodyArrayBuffer = d(t.buffer)),
                                    (this._bodyInit = new Blob([
                                        this._bodyArrayBuffer,
                                    ]));
                            else {
                                if (
                                    !e.arrayBuffer ||
                                    (!ArrayBuffer.prototype.isPrototypeOf(t) &&
                                        !i(t))
                                )
                                    throw new Error(
                                        'unsupported BodyInit type'
                                    );
                                this._bodyArrayBuffer = d(t);
                            }
                        else this._bodyText = '';
                        this.headers.get('content-type') ||
                            ('string' == typeof t
                                ? this.headers.set(
                                      'content-type',
                                      'text/plain;charset=UTF-8'
                                  )
                                : this._bodyBlob && this._bodyBlob.type
                                    ? this.headers.set(
                                          'content-type',
                                          this._bodyBlob.type
                                      )
                                    : e.searchParams &&
                                      URLSearchParams.prototype.isPrototypeOf(
                                          t
                                      ) &&
                                      this.headers.set(
                                          'content-type',
                                          'application/x-www-form-urlencoded;charset=UTF-8'
                                      ));
                    }),
                    e.blob &&
                        ((this.blob = function() {
                            var t = l(this);
                            if (t) return t;
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
                                ? l(this) ||
                                      Promise.resolve(this._bodyArrayBuffer)
                                : this.blob().then(p);
                        })),
                    (this.text = function() {
                        var t,
                            e,
                            n,
                            r = l(this);
                        if (r) return r;
                        if (this._bodyBlob)
                            return (
                                (t = this._bodyBlob),
                                (e = new FileReader()),
                                (n = h(e)),
                                e.readAsText(t),
                                n
                            );
                        if (this._bodyArrayBuffer)
                            return Promise.resolve(
                                (function(t) {
                                    for (
                                        var e = new Uint8Array(t),
                                            n = new Array(e.length),
                                            r = 0;
                                        r < e.length;
                                        r++
                                    )
                                        n[r] = String.fromCharCode(e[r]);
                                    return n.join('');
                                })(this._bodyArrayBuffer)
                            );
                        if (this._bodyFormData)
                            throw new Error(
                                'could not read FormData body as text'
                            );
                        return Promise.resolve(this._bodyText);
                    }),
                    e.formData &&
                        (this.formData = function() {
                            return this.text().then(y);
                        }),
                    (this.json = function() {
                        return this.text().then(JSON.parse);
                    }),
                    this
                );
            }
            function g(t, e) {
                var n,
                    r,
                    i = (e = e || {}).body;
                if (t instanceof g) {
                    if (t.bodyUsed) throw new TypeError('Already read');
                    (this.url = t.url),
                        (this.credentials = t.credentials),
                        e.headers || (this.headers = new f(t.headers)),
                        (this.method = t.method),
                        (this.mode = t.mode),
                        i ||
                            null == t._bodyInit ||
                            ((i = t._bodyInit), (t.bodyUsed = !0));
                } else this.url = String(t);
                if (
                    ((this.credentials =
                        e.credentials || this.credentials || 'omit'),
                    (!e.headers && this.headers) ||
                        (this.headers = new f(e.headers)),
                    (this.method = ((n = e.method || this.method || 'GET'),
                    (r = n.toUpperCase()),
                    o.indexOf(r) > -1 ? r : n)),
                    (this.mode = e.mode || this.mode || null),
                    (this.referrer = null),
                    ('GET' === this.method || 'HEAD' === this.method) && i)
                )
                    throw new TypeError(
                        'Body not allowed for GET or HEAD requests'
                    );
                this._initBody(i);
            }
            function y(t) {
                var e = new FormData();
                return (
                    t
                        .trim()
                        .split('&')
                        .forEach(function(t) {
                            if (t) {
                                var n = t.split('='),
                                    r = n.shift().replace(/\+/g, ' '),
                                    i = n.join('=').replace(/\+/g, ' ');
                                e.append(
                                    decodeURIComponent(r),
                                    decodeURIComponent(i)
                                );
                            }
                        }),
                    e
                );
            }
            function m(t, e) {
                e || (e = {}),
                    (this.type = 'default'),
                    (this.status = 'status' in e ? e.status : 200),
                    (this.ok = this.status >= 200 && this.status < 300),
                    (this.statusText = 'statusText' in e ? e.statusText : 'OK'),
                    (this.headers = new f(e.headers)),
                    (this.url = e.url || ''),
                    this._initBody(t);
            }
        })(self);
    self.fetch.bind(self);
    var r =
        'undefined' != typeof window
            ? window
            : 'undefined' != typeof global
                ? global
                : 'undefined' != typeof self ? self : {};
    function i(t, e) {
        return t((e = { exports: {} }), e.exports), e.exports;
    }
    var o = i(function(t) {
            var e = (t.exports =
                'undefined' != typeof window && window.Math == Math
                    ? window
                    : 'undefined' != typeof self && self.Math == Math
                        ? self
                        : Function('return this')());
            'number' == typeof __g && (__g = e);
        }),
        u = {}.hasOwnProperty,
        a = function(t, e) {
            return u.call(t, e);
        },
        c = function(t) {
            try {
                return !!t();
            } catch (t) {
                return !0;
            }
        },
        s = !c(function() {
            return (
                7 !=
                Object.defineProperty({}, 'a', {
                    get: function() {
                        return 7;
                    },
                }).a
            );
        }),
        f = i(function(t) {
            var e = (t.exports = { version: '2.5.3' });
            'number' == typeof __e && (__e = e);
        }),
        l = (f.version,
        function(t) {
            return 'object' == typeof t ? null !== t : 'function' == typeof t;
        }),
        h = function(t) {
            if (!l(t)) throw TypeError(t + ' is not an object!');
            return t;
        },
        p = o.document,
        d = l(p) && l(p.createElement),
        v = function(t) {
            return d ? p.createElement(t) : {};
        },
        g =
            !s &&
            !c(function() {
                return (
                    7 !=
                    Object.defineProperty(v('div'), 'a', {
                        get: function() {
                            return 7;
                        },
                    }).a
                );
            }),
        y = function(t, e) {
            if (!l(t)) return t;
            var n, r;
            if (
                e &&
                'function' == typeof (n = t.toString) &&
                !l((r = n.call(t)))
            )
                return r;
            if ('function' == typeof (n = t.valueOf) && !l((r = n.call(t))))
                return r;
            if (
                !e &&
                'function' == typeof (n = t.toString) &&
                !l((r = n.call(t)))
            )
                return r;
            throw TypeError("Can't convert object to primitive value");
        },
        m = Object.defineProperty,
        b = {
            f: s
                ? Object.defineProperty
                : function(t, e, n) {
                      if ((h(t), (e = y(e, !0)), h(n), g))
                          try {
                              return m(t, e, n);
                          } catch (t) {}
                      if ('get' in n || 'set' in n)
                          throw TypeError('Accessors not supported!');
                      return 'value' in n && (t[e] = n.value), t;
                  },
        },
        w = function(t, e) {
            return {
                enumerable: !(1 & t),
                configurable: !(2 & t),
                writable: !(4 & t),
                value: e,
            };
        },
        S = s
            ? function(t, e, n) {
                  return b.f(t, e, w(1, n));
              }
            : function(t, e, n) {
                  return (t[e] = n), t;
              },
        _ = 0,
        E = Math.random(),
        x = function(t) {
            return 'Symbol('.concat(
                void 0 === t ? '' : t,
                ')_',
                (++_ + E).toString(36)
            );
        },
        A = i(function(t) {
            var e = x('src'),
                n = Function.toString,
                r = ('' + n).split('toString');
            (f.inspectSource = function(t) {
                return n.call(t);
            }),
                (t.exports = function(t, n, i, u) {
                    var c = 'function' == typeof i;
                    c && (a(i, 'name') || S(i, 'name', n)),
                        t[n] !== i &&
                            (c &&
                                (a(i, e) ||
                                    S(
                                        i,
                                        e,
                                        t[n] ? '' + t[n] : r.join(String(n))
                                    )),
                            t === o
                                ? (t[n] = i)
                                : u
                                    ? t[n] ? (t[n] = i) : S(t, n, i)
                                    : (delete t[n], S(t, n, i)));
                })(Function.prototype, 'toString', function() {
                    return (
                        ('function' == typeof this && this[e]) || n.call(this)
                    );
                });
        }),
        P = function(t) {
            if ('function' != typeof t)
                throw TypeError(t + ' is not a function!');
            return t;
        },
        O = function(t, e, n) {
            if ((P(t), void 0 === e)) return t;
            switch (n) {
                case 1:
                    return function(n) {
                        return t.call(e, n);
                    };
                case 2:
                    return function(n, r) {
                        return t.call(e, n, r);
                    };
                case 3:
                    return function(n, r, i) {
                        return t.call(e, n, r, i);
                    };
            }
            return function() {
                return t.apply(e, arguments);
            };
        },
        k = function(t, e, n) {
            var r,
                i,
                u,
                a,
                c = t & k.F,
                s = t & k.G,
                l = t & k.S,
                h = t & k.P,
                p = t & k.B,
                d = s ? o : l ? o[e] || (o[e] = {}) : (o[e] || {}).prototype,
                v = s ? f : f[e] || (f[e] = {}),
                g = v.prototype || (v.prototype = {});
            for (r in (s && (n = e), n))
                (u = ((i = !c && d && void 0 !== d[r]) ? d : n)[r]),
                    (a =
                        p && i
                            ? O(u, o)
                            : h && 'function' == typeof u
                                ? O(Function.call, u)
                                : u),
                    d && A(d, r, u, t & k.U),
                    v[r] != u && S(v, r, a),
                    h && g[r] != u && (g[r] = u);
        };
    (o.core = f),
        (k.F = 1),
        (k.G = 2),
        (k.S = 4),
        (k.P = 8),
        (k.B = 16),
        (k.W = 32),
        (k.U = 64),
        (k.R = 128);
    var R = k,
        I = i(function(t) {
            var e = x('meta'),
                n = b.f,
                r = 0,
                i =
                    Object.isExtensible ||
                    function() {
                        return !0;
                    },
                o = !c(function() {
                    return i(Object.preventExtensions({}));
                }),
                u = function(t) {
                    n(t, e, { value: { i: 'O' + ++r, w: {} } });
                },
                s = (t.exports = {
                    KEY: e,
                    NEED: !1,
                    fastKey: function(t, n) {
                        if (!l(t))
                            return 'symbol' == typeof t
                                ? t
                                : ('string' == typeof t ? 'S' : 'P') + t;
                        if (!a(t, e)) {
                            if (!i(t)) return 'F';
                            if (!n) return 'E';
                            u(t);
                        }
                        return t[e].i;
                    },
                    getWeak: function(t, n) {
                        if (!a(t, e)) {
                            if (!i(t)) return !0;
                            if (!n) return !1;
                            u(t);
                        }
                        return t[e].w;
                    },
                    onFreeze: function(t) {
                        return o && s.NEED && i(t) && !a(t, e) && u(t), t;
                    },
                });
        }),
        F = (I.KEY,
        I.NEED,
        I.fastKey,
        I.getWeak,
        I.onFreeze,
        o['__core-js_shared__'] || (o['__core-js_shared__'] = {})),
        M = function(t) {
            return F[t] || (F[t] = {});
        },
        N = i(function(t) {
            var e = M('wks'),
                n = o.Symbol,
                r = 'function' == typeof n;
            (t.exports = function(t) {
                return (
                    e[t] || (e[t] = (r && n[t]) || (r ? n : x)('Symbol.' + t))
                );
            }).store = e;
        }),
        T = b.f,
        j = N('toStringTag'),
        L = function(t, e, n) {
            t &&
                !a((t = n ? t : t.prototype), j) &&
                T(t, j, { configurable: !0, value: e });
        },
        B = { f: N },
        U = b.f,
        C = function(t) {
            var e = f.Symbol || (f.Symbol = o.Symbol || {});
            '_' == t.charAt(0) || t in e || U(e, t, { value: B.f(t) });
        },
        D = {}.toString,
        W = function(t) {
            return D.call(t).slice(8, -1);
        },
        G = Object('z').propertyIsEnumerable(0)
            ? Object
            : function(t) {
                  return 'String' == W(t) ? t.split('') : Object(t);
              },
        V = function(t) {
            if (null == t) throw TypeError("Can't call method on  " + t);
            return t;
        },
        z = function(t) {
            return G(V(t));
        },
        Y = Math.ceil,
        K = Math.floor,
        q = function(t) {
            return isNaN((t = +t)) ? 0 : (t > 0 ? K : Y)(t);
        },
        H = Math.min,
        J = function(t) {
            return t > 0 ? H(q(t), 9007199254740991) : 0;
        },
        X = Math.max,
        $ = Math.min,
        Z = function(t, e) {
            return (t = q(t)) < 0 ? X(t + e, 0) : $(t, e);
        },
        Q = function(t) {
            return function(e, n, r) {
                var i,
                    o = z(e),
                    u = J(o.length),
                    a = Z(r, u);
                if (t && n != n) {
                    for (; u > a; ) if ((i = o[a++]) != i) return !0;
                } else
                    for (; u > a; a++)
                        if ((t || a in o) && o[a] === n) return t || a || 0;
                return !t && -1;
            };
        },
        tt = M('keys'),
        et = function(t) {
            return tt[t] || (tt[t] = x(t));
        },
        nt = Q(!1),
        rt = et('IE_PROTO'),
        it = function(t, e) {
            var n,
                r = z(t),
                i = 0,
                o = [];
            for (n in r) n != rt && a(r, n) && o.push(n);
            for (; e.length > i; )
                a(r, (n = e[i++])) && (~nt(o, n) || o.push(n));
            return o;
        },
        ot = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(
            ','
        ),
        ut =
            Object.keys ||
            function(t) {
                return it(t, ot);
            },
        at = { f: Object.getOwnPropertySymbols },
        ct = { f: {}.propertyIsEnumerable },
        st =
            Array.isArray ||
            function(t) {
                return 'Array' == W(t);
            },
        ft = s
            ? Object.defineProperties
            : function(t, e) {
                  h(t);
                  for (var n, r = ut(e), i = r.length, o = 0; i > o; )
                      b.f(t, (n = r[o++]), e[n]);
                  return t;
              },
        lt = o.document,
        ht = lt && lt.documentElement,
        pt = et('IE_PROTO'),
        dt = function() {},
        vt = function() {
            var t,
                e = v('iframe'),
                n = ot.length;
            for (
                e.style.display = 'none',
                    ht.appendChild(e),
                    e.src = 'javascript:',
                    (t = e.contentWindow.document).open(),
                    t.write('<script>document.F=Object</script>'),
                    t.close(),
                    vt = t.F;
                n--;

            )
                delete vt.prototype[ot[n]];
            return vt();
        },
        gt =
            Object.create ||
            function(t, e) {
                var n;
                return (
                    null !== t
                        ? ((dt.prototype = h(t)),
                          (n = new dt()),
                          (dt.prototype = null),
                          (n[pt] = t))
                        : (n = vt()),
                    void 0 === e ? n : ft(n, e)
                );
            },
        yt = ot.concat('length', 'prototype'),
        mt = {
            f:
                Object.getOwnPropertyNames ||
                function(t) {
                    return it(t, yt);
                },
        },
        bt = mt.f,
        wt = {}.toString,
        St =
            'object' == typeof window && window && Object.getOwnPropertyNames
                ? Object.getOwnPropertyNames(window)
                : [],
        _t = {
            f: function(t) {
                return St && '[object Window]' == wt.call(t)
                    ? (function(t) {
                          try {
                              return bt(t);
                          } catch (t) {
                              return St.slice();
                          }
                      })(t)
                    : bt(z(t));
            },
        },
        Et = Object.getOwnPropertyDescriptor,
        xt = {
            f: s
                ? Et
                : function(t, e) {
                      if (((t = z(t)), (e = y(e, !0)), g))
                          try {
                              return Et(t, e);
                          } catch (t) {}
                      if (a(t, e)) return w(!ct.f.call(t, e), t[e]);
                  },
        },
        At = I.KEY,
        Pt = xt.f,
        Ot = b.f,
        kt = _t.f,
        Rt = o.Symbol,
        It = o.JSON,
        Ft = It && It.stringify,
        Mt = N('_hidden'),
        Nt = N('toPrimitive'),
        Tt = {}.propertyIsEnumerable,
        jt = M('symbol-registry'),
        Lt = M('symbols'),
        Bt = M('op-symbols'),
        Ut = Object.prototype,
        Ct = 'function' == typeof Rt,
        Dt = o.QObject,
        Wt = !Dt || !Dt.prototype || !Dt.prototype.findChild,
        Gt =
            s &&
            c(function() {
                return (
                    7 !=
                    gt(
                        Ot({}, 'a', {
                            get: function() {
                                return Ot(this, 'a', { value: 7 }).a;
                            },
                        })
                    ).a
                );
            })
                ? function(t, e, n) {
                      var r = Pt(Ut, e);
                      r && delete Ut[e],
                          Ot(t, e, n),
                          r && t !== Ut && Ot(Ut, e, r);
                  }
                : Ot,
        Vt = function(t) {
            var e = (Lt[t] = gt(Rt.prototype));
            return (e._k = t), e;
        },
        zt =
            Ct && 'symbol' == typeof Rt.iterator
                ? function(t) {
                      return 'symbol' == typeof t;
                  }
                : function(t) {
                      return t instanceof Rt;
                  },
        Yt = function(t, e, n) {
            return (
                t === Ut && Yt(Bt, e, n),
                h(t),
                (e = y(e, !0)),
                h(n),
                a(Lt, e)
                    ? (n.enumerable
                          ? (a(t, Mt) && t[Mt][e] && (t[Mt][e] = !1),
                            (n = gt(n, { enumerable: w(0, !1) })))
                          : (a(t, Mt) || Ot(t, Mt, w(1, {})), (t[Mt][e] = !0)),
                      Gt(t, e, n))
                    : Ot(t, e, n)
            );
        },
        Kt = function(t, e) {
            h(t);
            for (
                var n,
                    r = (function(t) {
                        var e = ut(t),
                            n = at.f;
                        if (n)
                            for (
                                var r, i = n(t), o = ct.f, u = 0;
                                i.length > u;

                            )
                                o.call(t, (r = i[u++])) && e.push(r);
                        return e;
                    })((e = z(e))),
                    i = 0,
                    o = r.length;
                o > i;

            )
                Yt(t, (n = r[i++]), e[n]);
            return t;
        },
        qt = function(t) {
            var e = Tt.call(this, (t = y(t, !0)));
            return (
                !(this === Ut && a(Lt, t) && !a(Bt, t)) &&
                (!(
                    e ||
                    !a(this, t) ||
                    !a(Lt, t) ||
                    (a(this, Mt) && this[Mt][t])
                ) ||
                    e)
            );
        },
        Ht = function(t, e) {
            if (
                ((t = z(t)), (e = y(e, !0)), t !== Ut || !a(Lt, e) || a(Bt, e))
            ) {
                var n = Pt(t, e);
                return (
                    !n ||
                        !a(Lt, e) ||
                        (a(t, Mt) && t[Mt][e]) ||
                        (n.enumerable = !0),
                    n
                );
            }
        },
        Jt = function(t) {
            for (var e, n = kt(z(t)), r = [], i = 0; n.length > i; )
                a(Lt, (e = n[i++])) || e == Mt || e == At || r.push(e);
            return r;
        },
        Xt = function(t) {
            for (
                var e, n = t === Ut, r = kt(n ? Bt : z(t)), i = [], o = 0;
                r.length > o;

            )
                !a(Lt, (e = r[o++])) || (n && !a(Ut, e)) || i.push(Lt[e]);
            return i;
        };
    Ct ||
        (A(
            (Rt = function() {
                if (this instanceof Rt)
                    throw TypeError('Symbol is not a constructor!');
                var t = x(arguments.length > 0 ? arguments[0] : void 0),
                    e = function(n) {
                        this === Ut && e.call(Bt, n),
                            a(this, Mt) && a(this[Mt], t) && (this[Mt][t] = !1),
                            Gt(this, t, w(1, n));
                    };
                return (
                    s && Wt && Gt(Ut, t, { configurable: !0, set: e }), Vt(t)
                );
            }).prototype,
            'toString',
            function() {
                return this._k;
            }
        ),
        (xt.f = Ht),
        (b.f = Yt),
        (mt.f = _t.f = Jt),
        (ct.f = qt),
        (at.f = Xt),
        s && A(Ut, 'propertyIsEnumerable', qt, !0),
        (B.f = function(t) {
            return Vt(N(t));
        })),
        R(R.G + R.W + R.F * !Ct, { Symbol: Rt });
    for (
        var $t = 'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(
                ','
            ),
            Zt = 0;
        $t.length > Zt;

    )
        N($t[Zt++]);
    for (var Qt = ut(N.store), te = 0; Qt.length > te; ) C(Qt[te++]);
    R(R.S + R.F * !Ct, 'Symbol', {
        for: function(t) {
            return a(jt, (t += '')) ? jt[t] : (jt[t] = Rt(t));
        },
        keyFor: function(t) {
            if (!zt(t)) throw TypeError(t + ' is not a symbol!');
            for (var e in jt) if (jt[e] === t) return e;
        },
        useSetter: function() {
            Wt = !0;
        },
        useSimple: function() {
            Wt = !1;
        },
    }),
        R(R.S + R.F * !Ct, 'Object', {
            create: function(t, e) {
                return void 0 === e ? gt(t) : Kt(gt(t), e);
            },
            defineProperty: Yt,
            defineProperties: Kt,
            getOwnPropertyDescriptor: Ht,
            getOwnPropertyNames: Jt,
            getOwnPropertySymbols: Xt,
        }),
        It &&
            R(
                R.S +
                    R.F *
                        (!Ct ||
                            c(function() {
                                var t = Rt();
                                return (
                                    '[null]' != Ft([t]) ||
                                    '{}' != Ft({ a: t }) ||
                                    '{}' != Ft(Object(t))
                                );
                            })),
                'JSON',
                {
                    stringify: function(t) {
                        for (var e, n, r = [t], i = 1; arguments.length > i; )
                            r.push(arguments[i++]);
                        if (((n = e = r[1]), (l(e) || void 0 !== t) && !zt(t)))
                            return (
                                st(e) ||
                                    (e = function(t, e) {
                                        if (
                                            ('function' == typeof n &&
                                                (e = n.call(this, t, e)),
                                            !zt(e))
                                        )
                                            return e;
                                    }),
                                (r[1] = e),
                                Ft.apply(It, r)
                            );
                    },
                }
            ),
        Rt.prototype[Nt] || S(Rt.prototype, Nt, Rt.prototype.valueOf),
        L(Rt, 'Symbol'),
        L(Math, 'Math', !0),
        L(o.JSON, 'JSON', !0),
        R(R.S, 'Object', { create: gt }),
        R(R.S + R.F * !s, 'Object', { defineProperty: b.f }),
        R(R.S + R.F * !s, 'Object', { defineProperties: ft });
    var ee = function(t, e) {
            var n = (f.Object || {})[t] || Object[t],
                r = {};
            (r[t] = e(n)),
                R(
                    R.S +
                        R.F *
                            c(function() {
                                n(1);
                            }),
                    'Object',
                    r
                );
        },
        ne = xt.f;
    ee('getOwnPropertyDescriptor', function() {
        return function(t, e) {
            return ne(z(t), e);
        };
    });
    var re = function(t) {
            return Object(V(t));
        },
        ie = et('IE_PROTO'),
        oe = Object.prototype,
        ue =
            Object.getPrototypeOf ||
            function(t) {
                return (
                    (t = re(t)),
                    a(t, ie)
                        ? t[ie]
                        : 'function' == typeof t.constructor &&
                          t instanceof t.constructor
                            ? t.constructor.prototype
                            : t instanceof Object ? oe : null
                );
            };
    ee('getPrototypeOf', function() {
        return function(t) {
            return ue(re(t));
        };
    }),
        ee('keys', function() {
            return function(t) {
                return ut(re(t));
            };
        }),
        ee('getOwnPropertyNames', function() {
            return _t.f;
        });
    var ae = I.onFreeze;
    ee('freeze', function(t) {
        return function(e) {
            return t && l(e) ? t(ae(e)) : e;
        };
    });
    var ce = I.onFreeze;
    ee('seal', function(t) {
        return function(e) {
            return t && l(e) ? t(ce(e)) : e;
        };
    });
    var se = I.onFreeze;
    ee('preventExtensions', function(t) {
        return function(e) {
            return t && l(e) ? t(se(e)) : e;
        };
    }),
        ee('isFrozen', function(t) {
            return function(e) {
                return !l(e) || (!!t && t(e));
            };
        }),
        ee('isSealed', function(t) {
            return function(e) {
                return !l(e) || (!!t && t(e));
            };
        }),
        ee('isExtensible', function(t) {
            return function(e) {
                return !!l(e) && (!t || t(e));
            };
        });
    var fe = Object.assign,
        le =
            !fe ||
            c(function() {
                var t = {},
                    e = {},
                    n = Symbol(),
                    r = 'abcdefghijklmnopqrst';
                return (
                    (t[n] = 7),
                    r.split('').forEach(function(t) {
                        e[t] = t;
                    }),
                    7 != fe({}, t)[n] || Object.keys(fe({}, e)).join('') != r
                );
            })
                ? function(t, e) {
                      for (
                          var n = re(t),
                              r = arguments.length,
                              i = 1,
                              o = at.f,
                              u = ct.f;
                          r > i;

                      )
                          for (
                              var a,
                                  c = G(arguments[i++]),
                                  s = o ? ut(c).concat(o(c)) : ut(c),
                                  f = s.length,
                                  l = 0;
                              f > l;

                          )
                              u.call(c, (a = s[l++])) && (n[a] = c[a]);
                      return n;
                  }
                : fe;
    R(R.S + R.F, 'Object', { assign: le });
    var he =
        Object.is ||
        function(t, e) {
            return t === e ? 0 !== t || 1 / t == 1 / e : t != t && e != e;
        };
    R(R.S, 'Object', { is: he });
    var pe = function(t, e) {
            if ((h(t), !l(e) && null !== e))
                throw TypeError(e + ": can't set as prototype!");
        },
        de = {
            set:
                Object.setPrototypeOf ||
                ('__proto__' in {}
                    ? (function(t, e, n) {
                          try {
                              (n = O(
                                  Function.call,
                                  xt.f(Object.prototype, '__proto__').set,
                                  2
                              ))(t, []),
                                  (e = !(t instanceof Array));
                          } catch (t) {
                              e = !0;
                          }
                          return function(t, r) {
                              return (
                                  pe(t, r), e ? (t.__proto__ = r) : n(t, r), t
                              );
                          };
                      })({}, !1)
                    : void 0),
            check: pe,
        };
    R(R.S, 'Object', { setPrototypeOf: de.set });
    var ve = N('toStringTag'),
        ge =
            'Arguments' ==
            W(
                (function() {
                    return arguments;
                })()
            ),
        ye = function(t) {
            var e, n, r;
            return void 0 === t
                ? 'Undefined'
                : null === t
                    ? 'Null'
                    : 'string' ==
                      typeof (n = (function(t, e) {
                          try {
                              return t[e];
                          } catch (t) {}
                      })((e = Object(t)), ve))
                        ? n
                        : ge
                            ? W(e)
                            : 'Object' == (r = W(e)) &&
                              'function' == typeof e.callee
                                ? 'Arguments'
                                : r;
        },
        me = {};
    (me[N('toStringTag')] = 'z'),
        me + '' != '[object z]' &&
            A(
                Object.prototype,
                'toString',
                function() {
                    return '[object ' + ye(this) + ']';
                },
                !0
            );
    var be = function(t, e, n) {
            var r = void 0 === n;
            switch (e.length) {
                case 0:
                    return r ? t() : t.call(n);
                case 1:
                    return r ? t(e[0]) : t.call(n, e[0]);
                case 2:
                    return r ? t(e[0], e[1]) : t.call(n, e[0], e[1]);
                case 3:
                    return r
                        ? t(e[0], e[1], e[2])
                        : t.call(n, e[0], e[1], e[2]);
                case 4:
                    return r
                        ? t(e[0], e[1], e[2], e[3])
                        : t.call(n, e[0], e[1], e[2], e[3]);
            }
            return t.apply(n, e);
        },
        we = [].slice,
        Se = {},
        _e =
            Function.bind ||
            function(t) {
                var e = P(this),
                    n = we.call(arguments, 1),
                    r = function() {
                        var i = n.concat(we.call(arguments));
                        return this instanceof r
                            ? (function(t, e, n) {
                                  if (!(e in Se)) {
                                      for (var r = [], i = 0; i < e; i++)
                                          r[i] = 'a[' + i + ']';
                                      Se[e] = Function(
                                          'F,a',
                                          'return new F(' + r.join(',') + ')'
                                      );
                                  }
                                  return Se[e](t, n);
                              })(e, i.length, i)
                            : be(e, i, t);
                    };
                return l(e.prototype) && (r.prototype = e.prototype), r;
            };
    R(R.P, 'Function', { bind: _e });
    var Ee = b.f,
        xe = Function.prototype,
        Ae = /^\s*function ([^ (]*)/;
    'name' in xe ||
        (s &&
            Ee(xe, 'name', {
                configurable: !0,
                get: function() {
                    try {
                        return ('' + this).match(Ae)[1];
                    } catch (t) {
                        return '';
                    }
                },
            }));
    var Pe = N('hasInstance'),
        Oe = Function.prototype;
    Pe in Oe ||
        b.f(Oe, Pe, {
            value: function(t) {
                if ('function' != typeof this || !l(t)) return !1;
                if (!l(this.prototype)) return t instanceof this;
                for (; (t = ue(t)); ) if (this.prototype === t) return !0;
                return !1;
            },
        });
    var ke = '\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff',
        Re = '[' + ke + ']',
        Ie = RegExp('^' + Re + Re + '*'),
        Fe = RegExp(Re + Re + '*$'),
        Me = function(t, e, n) {
            var r = {},
                i = c(function() {
                    return !!ke[t]() || '​' != '​'[t]();
                }),
                o = (r[t] = i ? e(Ne) : ke[t]);
            n && (r[n] = o), R(R.P + R.F * i, 'String', r);
        },
        Ne = (Me.trim = function(t, e) {
            return (
                (t = String(V(t))),
                1 & e && (t = t.replace(Ie, '')),
                2 & e && (t = t.replace(Fe, '')),
                t
            );
        }),
        Te = Me,
        je = o.parseInt,
        Le = Te.trim,
        Be = /^[-+]?0[xX]/,
        Ue =
            8 !== je(ke + '08') || 22 !== je(ke + '0x16')
                ? function(t, e) {
                      var n = Le(String(t), 3);
                      return je(n, e >>> 0 || (Be.test(n) ? 16 : 10));
                  }
                : je;
    R(R.G + R.F * (parseInt != Ue), { parseInt: Ue });
    var Ce = o.parseFloat,
        De = Te.trim,
        We =
            1 / Ce(ke + '-0') != -1 / 0
                ? function(t) {
                      var e = De(String(t), 3),
                          n = Ce(e);
                      return 0 === n && '-' == e.charAt(0) ? -0 : n;
                  }
                : Ce;
    R(R.G + R.F * (parseFloat != We), { parseFloat: We });
    var Ge = de.set,
        Ve = function(t, e, n) {
            var r,
                i = e.constructor;
            return (
                i !== n &&
                    'function' == typeof i &&
                    (r = i.prototype) !== n.prototype &&
                    l(r) &&
                    Ge &&
                    Ge(t, r),
                t
            );
        },
        ze = mt.f,
        Ye = xt.f,
        Ke = b.f,
        qe = Te.trim,
        He = o.Number,
        Je = He,
        Xe = He.prototype,
        $e = 'Number' == W(gt(Xe)),
        Ze = 'trim' in String.prototype,
        Qe = function(t) {
            var e = y(t, !1);
            if ('string' == typeof e && e.length > 2) {
                var n,
                    r,
                    i,
                    o = (e = Ze ? e.trim() : qe(e, 3)).charCodeAt(0);
                if (43 === o || 45 === o) {
                    if (88 === (n = e.charCodeAt(2)) || 120 === n) return NaN;
                } else if (48 === o) {
                    switch (e.charCodeAt(1)) {
                        case 66:
                        case 98:
                            (r = 2), (i = 49);
                            break;
                        case 79:
                        case 111:
                            (r = 8), (i = 55);
                            break;
                        default:
                            return +e;
                    }
                    for (var u, a = e.slice(2), c = 0, s = a.length; c < s; c++)
                        if ((u = a.charCodeAt(c)) < 48 || u > i) return NaN;
                    return parseInt(a, r);
                }
            }
            return +e;
        };
    if (!He(' 0o1') || !He('0b1') || He('+0x1')) {
        He = function(t) {
            var e = arguments.length < 1 ? 0 : t,
                n = this;
            return n instanceof He &&
                ($e
                    ? c(function() {
                          Xe.valueOf.call(n);
                      })
                    : 'Number' != W(n))
                ? Ve(new Je(Qe(e)), n, He)
                : Qe(e);
        };
        for (
            var tn,
                en = s
                    ? ze(Je)
                    : 'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'.split(
                          ','
                      ),
                nn = 0;
            en.length > nn;
            nn++
        )
            a(Je, (tn = en[nn])) && !a(He, tn) && Ke(He, tn, Ye(Je, tn));
        (He.prototype = Xe), (Xe.constructor = He), A(o, 'Number', He);
    }
    var rn = function(t, e) {
            if ('number' != typeof t && 'Number' != W(t)) throw TypeError(e);
            return +t;
        },
        on = function(t) {
            var e = String(V(this)),
                n = '',
                r = q(t);
            if (r < 0 || r == 1 / 0)
                throw RangeError("Count can't be negative");
            for (; r > 0; (r >>>= 1) && (e += e)) 1 & r && (n += e);
            return n;
        },
        un = (1).toFixed,
        an = Math.floor,
        cn = [0, 0, 0, 0, 0, 0],
        sn = 'Number.toFixed: incorrect invocation!',
        fn = function(t, e) {
            for (var n = -1, r = e; ++n < 6; )
                (r += t * cn[n]), (cn[n] = r % 1e7), (r = an(r / 1e7));
        },
        ln = function(t) {
            for (var e = 6, n = 0; --e >= 0; )
                (n += cn[e]), (cn[e] = an(n / t)), (n = (n % t) * 1e7);
        },
        hn = function() {
            for (var t = 6, e = ''; --t >= 0; )
                if ('' !== e || 0 === t || 0 !== cn[t]) {
                    var n = String(cn[t]);
                    e = '' === e ? n : e + on.call('0', 7 - n.length) + n;
                }
            return e;
        },
        pn = function(t, e, n) {
            return 0 === e
                ? n
                : e % 2 == 1 ? pn(t, e - 1, n * t) : pn(t * t, e / 2, n);
        };
    R(
        R.P +
            R.F *
                ((!!un &&
                    ('0.000' !== (8e-5).toFixed(3) ||
                        '1' !== (0.9).toFixed(0) ||
                        '1.25' !== (1.255).toFixed(2) ||
                        '1000000000000000128' !==
                            (0xde0b6b3a7640080).toFixed(0))) ||
                    !c(function() {
                        un.call({});
                    })),
        'Number',
        {
            toFixed: function(t) {
                var e,
                    n,
                    r,
                    i,
                    o = rn(this, sn),
                    u = q(t),
                    a = '',
                    c = '0';
                if (u < 0 || u > 20) throw RangeError(sn);
                if (o != o) return 'NaN';
                if (o <= -1e21 || o >= 1e21) return String(o);
                if ((o < 0 && ((a = '-'), (o = -o)), o > 1e-21))
                    if (
                        ((n =
                            (e =
                                (function(t) {
                                    for (var e = 0, n = t; n >= 4096; )
                                        (e += 12), (n /= 4096);
                                    for (; n >= 2; ) (e += 1), (n /= 2);
                                    return e;
                                })(o * pn(2, 69, 1)) - 69) < 0
                                ? o * pn(2, -e, 1)
                                : o / pn(2, e, 1)),
                        (n *= 4503599627370496),
                        (e = 52 - e) > 0)
                    ) {
                        for (fn(0, n), r = u; r >= 7; ) fn(1e7, 0), (r -= 7);
                        for (fn(pn(10, r, 1), 0), r = e - 1; r >= 23; )
                            ln(1 << 23), (r -= 23);
                        ln(1 << r), fn(1, 1), ln(2), (c = hn());
                    } else
                        fn(0, n), fn(1 << -e, 0), (c = hn() + on.call('0', u));
                return (c =
                    u > 0
                        ? a +
                          ((i = c.length) <= u
                              ? '0.' + on.call('0', u - i) + c
                              : c.slice(0, i - u) + '.' + c.slice(i - u))
                        : a + c);
            },
        }
    );
    var dn = (1).toPrecision;
    R(
        R.P +
            R.F *
                (c(function() {
                    return '1' !== dn.call(1, void 0);
                }) ||
                    !c(function() {
                        dn.call({});
                    })),
        'Number',
        {
            toPrecision: function(t) {
                var e = rn(this, 'Number#toPrecision: incorrect invocation!');
                return void 0 === t ? dn.call(e) : dn.call(e, t);
            },
        }
    ),
        R(R.S, 'Number', { EPSILON: Math.pow(2, -52) });
    var vn = o.isFinite;
    R(R.S, 'Number', {
        isFinite: function(t) {
            return 'number' == typeof t && vn(t);
        },
    });
    var gn = Math.floor,
        yn = function(t) {
            return !l(t) && isFinite(t) && gn(t) === t;
        };
    R(R.S, 'Number', { isInteger: yn }),
        R(R.S, 'Number', {
            isNaN: function(t) {
                return t != t;
            },
        });
    var mn = Math.abs;
    R(R.S, 'Number', {
        isSafeInteger: function(t) {
            return yn(t) && mn(t) <= 9007199254740991;
        },
    }),
        R(R.S, 'Number', { MAX_SAFE_INTEGER: 9007199254740991 }),
        R(R.S, 'Number', { MIN_SAFE_INTEGER: -9007199254740991 }),
        R(R.S + R.F * (Number.parseFloat != We), 'Number', { parseFloat: We }),
        R(R.S + R.F * (Number.parseInt != Ue), 'Number', { parseInt: Ue });
    var bn =
            Math.log1p ||
            function(t) {
                return (t = +t) > -1e-8 && t < 1e-8
                    ? t - t * t / 2
                    : Math.log(1 + t);
            },
        wn = Math.sqrt,
        Sn = Math.acosh;
    R(
        R.S +
            R.F *
                !(
                    Sn &&
                    710 == Math.floor(Sn(Number.MAX_VALUE)) &&
                    Sn(1 / 0) == 1 / 0
                ),
        'Math',
        {
            acosh: function(t) {
                return (t = +t) < 1
                    ? NaN
                    : t > 94906265.62425156
                        ? Math.log(t) + Math.LN2
                        : bn(t - 1 + wn(t - 1) * wn(t + 1));
            },
        }
    );
    var _n = Math.asinh;
    R(R.S + R.F * !(_n && 1 / _n(0) > 0), 'Math', {
        asinh: function t(e) {
            return isFinite((e = +e)) && 0 != e
                ? e < 0 ? -t(-e) : Math.log(e + Math.sqrt(e * e + 1))
                : e;
        },
    });
    var En = Math.atanh;
    R(R.S + R.F * !(En && 1 / En(-0) < 0), 'Math', {
        atanh: function(t) {
            return 0 == (t = +t) ? t : Math.log((1 + t) / (1 - t)) / 2;
        },
    });
    var xn =
        Math.sign ||
        function(t) {
            return 0 == (t = +t) || t != t ? t : t < 0 ? -1 : 1;
        };
    R(R.S, 'Math', {
        cbrt: function(t) {
            return xn((t = +t)) * Math.pow(Math.abs(t), 1 / 3);
        },
    }),
        R(R.S, 'Math', {
            clz32: function(t) {
                return (t >>>= 0)
                    ? 31 - Math.floor(Math.log(t + 0.5) * Math.LOG2E)
                    : 32;
            },
        });
    var An = Math.exp;
    R(R.S, 'Math', {
        cosh: function(t) {
            return (An((t = +t)) + An(-t)) / 2;
        },
    });
    var Pn = Math.expm1,
        On =
            !Pn ||
            Pn(10) > 22025.465794806718 ||
            Pn(10) < 22025.465794806718 ||
            -2e-17 != Pn(-2e-17)
                ? function(t) {
                      return 0 == (t = +t)
                          ? t
                          : t > -1e-6 && t < 1e-6
                              ? t + t * t / 2
                              : Math.exp(t) - 1;
                  }
                : Pn;
    R(R.S + R.F * (On != Math.expm1), 'Math', { expm1: On });
    var kn = Math.pow,
        Rn = kn(2, -52),
        In = kn(2, -23),
        Fn = kn(2, 127) * (2 - In),
        Mn = kn(2, -126),
        Nn =
            Math.fround ||
            function(t) {
                var e,
                    n,
                    r = Math.abs(t),
                    i = xn(t);
                return r < Mn
                    ? i * (r / Mn / In + 1 / Rn - 1 / Rn) * Mn * In
                    : (n = (e = (1 + In / Rn) * r) - (e - r)) > Fn || n != n
                        ? i * (1 / 0)
                        : i * n;
            };
    R(R.S, 'Math', { fround: Nn });
    var Tn = Math.abs;
    R(R.S, 'Math', {
        hypot: function(t, e) {
            for (var n, r, i = 0, o = 0, u = arguments.length, a = 0; o < u; )
                a < (n = Tn(arguments[o++]))
                    ? ((i = i * (r = a / n) * r + 1), (a = n))
                    : (i += n > 0 ? (r = n / a) * r : n);
            return a === 1 / 0 ? 1 / 0 : a * Math.sqrt(i);
        },
    });
    var jn = Math.imul;
    R(
        R.S +
            R.F *
                c(function() {
                    return -5 != jn(4294967295, 5) || 2 != jn.length;
                }),
        'Math',
        {
            imul: function(t, e) {
                var n = +t,
                    r = +e,
                    i = 65535 & n,
                    o = 65535 & r;
                return (
                    0 |
                    (i * o +
                        ((((65535 & (n >>> 16)) * o +
                            i * (65535 & (r >>> 16))) <<
                            16) >>>
                            0))
                );
            },
        }
    ),
        R(R.S, 'Math', {
            log10: function(t) {
                return Math.log(t) * Math.LOG10E;
            },
        }),
        R(R.S, 'Math', { log1p: bn }),
        R(R.S, 'Math', {
            log2: function(t) {
                return Math.log(t) / Math.LN2;
            },
        }),
        R(R.S, 'Math', { sign: xn });
    var Ln = Math.exp;
    R(
        R.S +
            R.F *
                c(function() {
                    return -2e-17 != !Math.sinh(-2e-17);
                }),
        'Math',
        {
            sinh: function(t) {
                return Math.abs((t = +t)) < 1
                    ? (On(t) - On(-t)) / 2
                    : (Ln(t - 1) - Ln(-t - 1)) * (Math.E / 2);
            },
        }
    );
    var Bn = Math.exp;
    R(R.S, 'Math', {
        tanh: function(t) {
            var e = On((t = +t)),
                n = On(-t);
            return e == 1 / 0
                ? 1
                : n == 1 / 0 ? -1 : (e - n) / (Bn(t) + Bn(-t));
        },
    }),
        R(R.S, 'Math', {
            trunc: function(t) {
                return (t > 0 ? Math.floor : Math.ceil)(t);
            },
        });
    var Un = String.fromCharCode,
        Cn = String.fromCodePoint;
    R(R.S + R.F * (!!Cn && 1 != Cn.length), 'String', {
        fromCodePoint: function(t) {
            for (var e, n = [], r = arguments.length, i = 0; r > i; ) {
                if (((e = +arguments[i++]), Z(e, 1114111) !== e))
                    throw RangeError(e + ' is not a valid code point');
                n.push(
                    e < 65536
                        ? Un(e)
                        : Un(55296 + ((e -= 65536) >> 10), e % 1024 + 56320)
                );
            }
            return n.join('');
        },
    }),
        R(R.S, 'String', {
            raw: function(t) {
                for (
                    var e = z(t.raw),
                        n = J(e.length),
                        r = arguments.length,
                        i = [],
                        o = 0;
                    n > o;

                )
                    i.push(String(e[o++])),
                        o < r && i.push(String(arguments[o]));
                return i.join('');
            },
        }),
        Te('trim', function(t) {
            return function() {
                return t(this, 3);
            };
        });
    var Dn = function(t) {
            return function(e, n) {
                var r,
                    i,
                    o = String(V(e)),
                    u = q(n),
                    a = o.length;
                return u < 0 || u >= a
                    ? t ? '' : void 0
                    : (r = o.charCodeAt(u)) < 55296 ||
                      r > 56319 ||
                      u + 1 === a ||
                      (i = o.charCodeAt(u + 1)) < 56320 ||
                      i > 57343
                        ? t ? o.charAt(u) : r
                        : t
                            ? o.slice(u, u + 2)
                            : i - 56320 + ((r - 55296) << 10) + 65536;
            };
        },
        Wn = {},
        Gn = {};
    S(Gn, N('iterator'), function() {
        return this;
    });
    var Vn = function(t, e, n) {
            (t.prototype = gt(Gn, { next: w(1, n) })), L(t, e + ' Iterator');
        },
        zn = N('iterator'),
        Yn = !([].keys && 'next' in [].keys()),
        Kn = function() {
            return this;
        },
        qn = function(t, e, n, r, i, o, u) {
            Vn(n, e, r);
            var c,
                s,
                f,
                l = function(t) {
                    if (!Yn && t in v) return v[t];
                    switch (t) {
                        case 'keys':
                        case 'values':
                            return function() {
                                return new n(this, t);
                            };
                    }
                    return function() {
                        return new n(this, t);
                    };
                },
                h = e + ' Iterator',
                p = 'values' == i,
                d = !1,
                v = t.prototype,
                g = v[zn] || v['@@iterator'] || (i && v[i]),
                y = (!Yn && g) || l(i),
                m = i ? (p ? l('entries') : y) : void 0,
                b = ('Array' == e && v.entries) || g;
            if (
                (b &&
                    (f = ue(b.call(new t()))) !== Object.prototype &&
                    f.next &&
                    (L(f, h, !0), a(f, zn) || S(f, zn, Kn)),
                p &&
                    g &&
                    'values' !== g.name &&
                    ((d = !0),
                    (y = function() {
                        return g.call(this);
                    })),
                (Yn || d || !v[zn]) && S(v, zn, y),
                (Wn[e] = y),
                (Wn[h] = Kn),
                i)
            )
                if (
                    ((c = {
                        values: p ? y : l('values'),
                        keys: o ? y : l('keys'),
                        entries: m,
                    }),
                    u)
                )
                    for (s in c) s in v || A(v, s, c[s]);
                else R(R.P + R.F * (Yn || d), e, c);
            return c;
        },
        Hn = Dn(!0);
    qn(
        String,
        'String',
        function(t) {
            (this._t = String(t)), (this._i = 0);
        },
        function() {
            var t,
                e = this._t,
                n = this._i;
            return n >= e.length
                ? { value: void 0, done: !0 }
                : ((t = Hn(e, n)),
                  (this._i += t.length),
                  { value: t, done: !1 });
        }
    );
    var Jn = Dn(!1);
    R(R.P, 'String', {
        codePointAt: function(t) {
            return Jn(this, t);
        },
    });
    var Xn = N('match'),
        $n = function(t) {
            var e;
            return l(t) && (void 0 !== (e = t[Xn]) ? !!e : 'RegExp' == W(t));
        },
        Zn = function(t, e, n) {
            if ($n(e))
                throw TypeError('String#' + n + " doesn't accept regex!");
            return String(V(t));
        },
        Qn = N('match'),
        tr = function(t) {
            var e = /./;
            try {
                '/./'[t](e);
            } catch (n) {
                try {
                    return (e[Qn] = !1), !'/./'[t](e);
                } catch (t) {}
            }
            return !0;
        },
        er = ''.endsWith;
    R(R.P + R.F * tr('endsWith'), 'String', {
        endsWith: function(t) {
            var e = Zn(this, t, 'endsWith'),
                n = arguments.length > 1 ? arguments[1] : void 0,
                r = J(e.length),
                i = void 0 === n ? r : Math.min(J(n), r),
                o = String(t);
            return er ? er.call(e, o, i) : e.slice(i - o.length, i) === o;
        },
    });
    R(R.P + R.F * tr('includes'), 'String', {
        includes: function(t) {
            return !!~Zn(this, t, 'includes').indexOf(
                t,
                arguments.length > 1 ? arguments[1] : void 0
            );
        },
    }),
        R(R.P, 'String', { repeat: on });
    var nr = ''.startsWith;
    R(R.P + R.F * tr('startsWith'), 'String', {
        startsWith: function(t) {
            var e = Zn(this, t, 'startsWith'),
                n = J(
                    Math.min(
                        arguments.length > 1 ? arguments[1] : void 0,
                        e.length
                    )
                ),
                r = String(t);
            return nr ? nr.call(e, r, n) : e.slice(n, n + r.length) === r;
        },
    });
    var rr = /"/g,
        ir = function(t, e, n, r) {
            var i = String(V(t)),
                o = '<' + e;
            return (
                '' !== n &&
                    (o +=
                        ' ' + n + '="' + String(r).replace(rr, '&quot;') + '"'),
                o + '>' + i + '</' + e + '>'
            );
        },
        or = function(t, e) {
            var n = {};
            (n[t] = e(ir)),
                R(
                    R.P +
                        R.F *
                            c(function() {
                                var e = ''[t]('"');
                                return (
                                    e !== e.toLowerCase() ||
                                    e.split('"').length > 3
                                );
                            }),
                    'String',
                    n
                );
        };
    or('anchor', function(t) {
        return function(e) {
            return t(this, 'a', 'name', e);
        };
    }),
        or('big', function(t) {
            return function() {
                return t(this, 'big', '', '');
            };
        }),
        or('blink', function(t) {
            return function() {
                return t(this, 'blink', '', '');
            };
        }),
        or('bold', function(t) {
            return function() {
                return t(this, 'b', '', '');
            };
        }),
        or('fixed', function(t) {
            return function() {
                return t(this, 'tt', '', '');
            };
        }),
        or('fontcolor', function(t) {
            return function(e) {
                return t(this, 'font', 'color', e);
            };
        }),
        or('fontsize', function(t) {
            return function(e) {
                return t(this, 'font', 'size', e);
            };
        }),
        or('italics', function(t) {
            return function() {
                return t(this, 'i', '', '');
            };
        }),
        or('link', function(t) {
            return function(e) {
                return t(this, 'a', 'href', e);
            };
        }),
        or('small', function(t) {
            return function() {
                return t(this, 'small', '', '');
            };
        }),
        or('strike', function(t) {
            return function() {
                return t(this, 'strike', '', '');
            };
        }),
        or('sub', function(t) {
            return function() {
                return t(this, 'sub', '', '');
            };
        }),
        or('sup', function(t) {
            return function() {
                return t(this, 'sup', '', '');
            };
        }),
        R(R.S, 'Date', {
            now: function() {
                return new Date().getTime();
            },
        }),
        R(
            R.P +
                R.F *
                    c(function() {
                        return (
                            null !== new Date(NaN).toJSON() ||
                            1 !==
                                Date.prototype.toJSON.call({
                                    toISOString: function() {
                                        return 1;
                                    },
                                })
                        );
                    }),
            'Date',
            {
                toJSON: function(t) {
                    var e = re(this),
                        n = y(e);
                    return 'number' != typeof n || isFinite(n)
                        ? e.toISOString()
                        : null;
                },
            }
        );
    var ur = Date.prototype.getTime,
        ar = Date.prototype.toISOString,
        cr = function(t) {
            return t > 9 ? t : '0' + t;
        },
        sr =
            c(function() {
                return (
                    '0385-07-25T07:06:39.999Z' != ar.call(new Date(-5e13 - 1))
                );
            }) ||
            !c(function() {
                ar.call(new Date(NaN));
            })
                ? function() {
                      if (!isFinite(ur.call(this)))
                          throw RangeError('Invalid time value');
                      var t = this,
                          e = t.getUTCFullYear(),
                          n = t.getUTCMilliseconds(),
                          r = e < 0 ? '-' : e > 9999 ? '+' : '';
                      return (
                          r +
                          ('00000' + Math.abs(e)).slice(r ? -6 : -4) +
                          '-' +
                          cr(t.getUTCMonth() + 1) +
                          '-' +
                          cr(t.getUTCDate()) +
                          'T' +
                          cr(t.getUTCHours()) +
                          ':' +
                          cr(t.getUTCMinutes()) +
                          ':' +
                          cr(t.getUTCSeconds()) +
                          '.' +
                          (n > 99 ? n : '0' + cr(n)) +
                          'Z'
                      );
                  }
                : ar;
    R(R.P + R.F * (Date.prototype.toISOString !== sr), 'Date', {
        toISOString: sr,
    });
    var fr = Date.prototype,
        lr = fr.toString,
        hr = fr.getTime;
    new Date(NaN) + '' != 'Invalid Date' &&
        A(fr, 'toString', function() {
            var t = hr.call(this);
            return t == t ? lr.call(this) : 'Invalid Date';
        });
    var pr = N('toPrimitive'),
        dr = Date.prototype;
    pr in dr ||
        S(dr, pr, function(t) {
            if ('string' !== t && 'number' !== t && 'default' !== t)
                throw TypeError('Incorrect hint');
            return y(h(this), 'number' != t);
        }),
        R(R.S, 'Array', { isArray: st });
    var vr = function(t, e, n, r) {
            try {
                return r ? e(h(n)[0], n[1]) : e(n);
            } catch (e) {
                var i = t.return;
                throw (void 0 !== i && h(i.call(t)), e);
            }
        },
        gr = N('iterator'),
        yr = Array.prototype,
        mr = function(t) {
            return void 0 !== t && (Wn.Array === t || yr[gr] === t);
        },
        br = function(t, e, n) {
            e in t ? b.f(t, e, w(0, n)) : (t[e] = n);
        },
        wr = N('iterator'),
        Sr = (f.getIteratorMethod = function(t) {
            if (null != t) return t[wr] || t['@@iterator'] || Wn[ye(t)];
        }),
        _r = N('iterator'),
        Er = !1;
    try {
        [7][_r]().return = function() {
            Er = !0;
        };
    } catch (t) {}
    var xr = function(t, e) {
        if (!e && !Er) return !1;
        var n = !1;
        try {
            var r = [7],
                i = r[_r]();
            (i.next = function() {
                return { done: (n = !0) };
            }),
                (r[_r] = function() {
                    return i;
                }),
                t(r);
        } catch (t) {}
        return n;
    };
    R(R.S + R.F * !xr(function(t) {}), 'Array', {
        from: function(t) {
            var e,
                n,
                r,
                i,
                o = re(t),
                u = 'function' == typeof this ? this : Array,
                a = arguments.length,
                c = a > 1 ? arguments[1] : void 0,
                s = void 0 !== c,
                f = 0,
                l = Sr(o);
            if (
                (s && (c = O(c, a > 2 ? arguments[2] : void 0, 2)),
                null == l || (u == Array && mr(l)))
            )
                for (n = new u((e = J(o.length))); e > f; f++)
                    br(n, f, s ? c(o[f], f) : o[f]);
            else
                for (i = l.call(o), n = new u(); !(r = i.next()).done; f++)
                    br(n, f, s ? vr(i, c, [r.value, f], !0) : r.value);
            return (n.length = f), n;
        },
    }),
        R(
            R.S +
                R.F *
                    c(function() {
                        function t() {}
                        return !(Array.of.call(t) instanceof t);
                    }),
            'Array',
            {
                of: function() {
                    for (
                        var t = 0,
                            e = arguments.length,
                            n = new ('function' == typeof this ? this : Array)(
                                e
                            );
                        e > t;

                    )
                        br(n, t, arguments[t++]);
                    return (n.length = e), n;
                },
            }
        );
    var Ar = function(t, e) {
            return (
                !!t &&
                c(function() {
                    e ? t.call(null, function() {}, 1) : t.call(null);
                })
            );
        },
        Pr = [].join;
    R(R.P + R.F * (G != Object || !Ar(Pr)), 'Array', {
        join: function(t) {
            return Pr.call(z(this), void 0 === t ? ',' : t);
        },
    });
    var Or = [].slice;
    R(
        R.P +
            R.F *
                c(function() {
                    ht && Or.call(ht);
                }),
        'Array',
        {
            slice: function(t, e) {
                var n = J(this.length),
                    r = W(this);
                if (((e = void 0 === e ? n : e), 'Array' == r))
                    return Or.call(this, t, e);
                for (
                    var i = Z(t, n),
                        o = Z(e, n),
                        u = J(o - i),
                        a = new Array(u),
                        c = 0;
                    c < u;
                    c++
                )
                    a[c] = 'String' == r ? this.charAt(i + c) : this[i + c];
                return a;
            },
        }
    );
    var kr = [].sort,
        Rr = [1, 2, 3];
    R(
        R.P +
            R.F *
                (c(function() {
                    Rr.sort(void 0);
                }) ||
                    !c(function() {
                        Rr.sort(null);
                    }) ||
                    !Ar(kr)),
        'Array',
        {
            sort: function(t) {
                return void 0 === t
                    ? kr.call(re(this))
                    : kr.call(re(this), P(t));
            },
        }
    );
    var Ir = N('species'),
        Fr = function(t, e) {
            return new ((function(t) {
                var e;
                return (
                    st(t) &&
                        ('function' != typeof (e = t.constructor) ||
                            (e !== Array && !st(e.prototype)) ||
                            (e = void 0),
                        l(e) && null === (e = e[Ir]) && (e = void 0)),
                    void 0 === e ? Array : e
                );
            })(t))(e);
        },
        Mr = function(t, e) {
            var n = 1 == t,
                r = 2 == t,
                i = 3 == t,
                o = 4 == t,
                u = 6 == t,
                a = 5 == t || u,
                c = e || Fr;
            return function(e, s, f) {
                for (
                    var l,
                        h,
                        p = re(e),
                        d = G(p),
                        v = O(s, f, 3),
                        g = J(d.length),
                        y = 0,
                        m = n ? c(e, g) : r ? c(e, 0) : void 0;
                    g > y;
                    y++
                )
                    if ((a || y in d) && ((h = v((l = d[y]), y, p)), t))
                        if (n) m[y] = h;
                        else if (h)
                            switch (t) {
                                case 3:
                                    return !0;
                                case 5:
                                    return l;
                                case 6:
                                    return y;
                                case 2:
                                    m.push(l);
                            }
                        else if (o) return !1;
                return u ? -1 : i || o ? o : m;
            };
        },
        Nr = Mr(0),
        Tr = Ar([].forEach, !0);
    R(R.P + R.F * !Tr, 'Array', {
        forEach: function(t) {
            return Nr(this, t, arguments[1]);
        },
    });
    var jr = Mr(1);
    R(R.P + R.F * !Ar([].map, !0), 'Array', {
        map: function(t) {
            return jr(this, t, arguments[1]);
        },
    });
    var Lr = Mr(2);
    R(R.P + R.F * !Ar([].filter, !0), 'Array', {
        filter: function(t) {
            return Lr(this, t, arguments[1]);
        },
    });
    var Br = Mr(3);
    R(R.P + R.F * !Ar([].some, !0), 'Array', {
        some: function(t) {
            return Br(this, t, arguments[1]);
        },
    });
    var Ur = Mr(4);
    R(R.P + R.F * !Ar([].every, !0), 'Array', {
        every: function(t) {
            return Ur(this, t, arguments[1]);
        },
    });
    var Cr = function(t, e, n, r, i) {
        P(e);
        var o = re(t),
            u = G(o),
            a = J(o.length),
            c = i ? a - 1 : 0,
            s = i ? -1 : 1;
        if (n < 2)
            for (;;) {
                if (c in u) {
                    (r = u[c]), (c += s);
                    break;
                }
                if (((c += s), i ? c < 0 : a <= c))
                    throw TypeError(
                        'Reduce of empty array with no initial value'
                    );
            }
        for (; i ? c >= 0 : a > c; c += s) c in u && (r = e(r, u[c], c, o));
        return r;
    };
    R(R.P + R.F * !Ar([].reduce, !0), 'Array', {
        reduce: function(t) {
            return Cr(this, t, arguments.length, arguments[1], !1);
        },
    }),
        R(R.P + R.F * !Ar([].reduceRight, !0), 'Array', {
            reduceRight: function(t) {
                return Cr(this, t, arguments.length, arguments[1], !0);
            },
        });
    var Dr = Q(!1),
        Wr = [].indexOf,
        Gr = !!Wr && 1 / [1].indexOf(1, -0) < 0;
    R(R.P + R.F * (Gr || !Ar(Wr)), 'Array', {
        indexOf: function(t) {
            return Gr
                ? Wr.apply(this, arguments) || 0
                : Dr(this, t, arguments[1]);
        },
    });
    var Vr = [].lastIndexOf,
        zr = !!Vr && 1 / [1].lastIndexOf(1, -0) < 0;
    R(R.P + R.F * (zr || !Ar(Vr)), 'Array', {
        lastIndexOf: function(t) {
            if (zr) return Vr.apply(this, arguments) || 0;
            var e = z(this),
                n = J(e.length),
                r = n - 1;
            for (
                arguments.length > 1 && (r = Math.min(r, q(arguments[1]))),
                    r < 0 && (r = n + r);
                r >= 0;
                r--
            )
                if (r in e && e[r] === t) return r || 0;
            return -1;
        },
    });
    var Yr =
            [].copyWithin ||
            function(t, e) {
                var n = re(this),
                    r = J(n.length),
                    i = Z(t, r),
                    o = Z(e, r),
                    u = arguments.length > 2 ? arguments[2] : void 0,
                    a = Math.min((void 0 === u ? r : Z(u, r)) - o, r - i),
                    c = 1;
                for (
                    o < i &&
                    i < o + a &&
                    ((c = -1), (o += a - 1), (i += a - 1));
                    a-- > 0;

                )
                    o in n ? (n[i] = n[o]) : delete n[i], (i += c), (o += c);
                return n;
            },
        Kr = N('unscopables'),
        qr = Array.prototype;
    null == qr[Kr] && S(qr, Kr, {});
    var Hr = function(t) {
        qr[Kr][t] = !0;
    };
    R(R.P, 'Array', { copyWithin: Yr }), Hr('copyWithin');
    var Jr = function(t) {
        for (
            var e = re(this),
                n = J(e.length),
                r = arguments.length,
                i = Z(r > 1 ? arguments[1] : void 0, n),
                o = r > 2 ? arguments[2] : void 0,
                u = void 0 === o ? n : Z(o, n);
            u > i;

        )
            e[i++] = t;
        return e;
    };
    R(R.P, 'Array', { fill: Jr }), Hr('fill');
    var Xr = Mr(5),
        $r = !0;
    'find' in [] &&
        Array(1).find(function() {
            $r = !1;
        }),
        R(R.P + R.F * $r, 'Array', {
            find: function(t) {
                return Xr(
                    this,
                    t,
                    arguments.length > 1 ? arguments[1] : void 0
                );
            },
        }),
        Hr('find');
    var Zr = Mr(6),
        Qr = !0;
    'findIndex' in [] &&
        Array(1).findIndex(function() {
            Qr = !1;
        }),
        R(R.P + R.F * Qr, 'Array', {
            findIndex: function(t) {
                return Zr(
                    this,
                    t,
                    arguments.length > 1 ? arguments[1] : void 0
                );
            },
        }),
        Hr('findIndex');
    var ti = N('species'),
        ei = function(t) {
            var e = o[t];
            s &&
                e &&
                !e[ti] &&
                b.f(e, ti, {
                    configurable: !0,
                    get: function() {
                        return this;
                    },
                });
        };
    ei('Array');
    var ni = function(t, e) {
            return { value: e, done: !!t };
        },
        ri = qn(
            Array,
            'Array',
            function(t, e) {
                (this._t = z(t)), (this._i = 0), (this._k = e);
            },
            function() {
                var t = this._t,
                    e = this._k,
                    n = this._i++;
                return !t || n >= t.length
                    ? ((this._t = void 0), ni(1))
                    : ni(0, 'keys' == e ? n : 'values' == e ? t[n] : [n, t[n]]);
            },
            'values'
        );
    (Wn.Arguments = Wn.Array), Hr('keys'), Hr('values'), Hr('entries');
    var ii = function() {
            var t = h(this),
                e = '';
            return (
                t.global && (e += 'g'),
                t.ignoreCase && (e += 'i'),
                t.multiline && (e += 'm'),
                t.unicode && (e += 'u'),
                t.sticky && (e += 'y'),
                e
            );
        },
        oi = b.f,
        ui = mt.f,
        ai = o.RegExp,
        ci = ai,
        si = ai.prototype,
        fi = /a/g,
        li = /a/g,
        hi = new ai(fi) !== fi;
    if (
        s &&
        (!hi ||
            c(function() {
                return (
                    (li[N('match')] = !1),
                    ai(fi) != fi || ai(li) == li || '/a/i' != ai(fi, 'i')
                );
            }))
    ) {
        ai = function(t, e) {
            var n = this instanceof ai,
                r = $n(t),
                i = void 0 === e;
            return !n && r && t.constructor === ai && i
                ? t
                : Ve(
                      hi
                          ? new ci(r && !i ? t.source : t, e)
                          : ci(
                                (r = t instanceof ai) ? t.source : t,
                                r && i ? ii.call(t) : e
                            ),
                      n ? this : si,
                      ai
                  );
        };
        for (
            var pi = function(t) {
                    (t in ai) ||
                        oi(ai, t, {
                            configurable: !0,
                            get: function() {
                                return ci[t];
                            },
                            set: function(e) {
                                ci[t] = e;
                            },
                        });
                },
                di = ui(ci),
                vi = 0;
            di.length > vi;

        )
            pi(di[vi++]);
        (si.constructor = ai), (ai.prototype = si), A(o, 'RegExp', ai);
    }
    ei('RegExp'),
        s &&
            'g' != /./g.flags &&
            b.f(RegExp.prototype, 'flags', { configurable: !0, get: ii });
    var gi = /./.toString,
        yi = function(t) {
            A(RegExp.prototype, 'toString', t, !0);
        };
    c(function() {
        return '/a/b' != gi.call({ source: 'a', flags: 'b' });
    })
        ? yi(function() {
              var t = h(this);
              return '/'.concat(
                  t.source,
                  '/',
                  'flags' in t
                      ? t.flags
                      : !s && t instanceof RegExp ? ii.call(t) : void 0
              );
          })
        : 'toString' != gi.name &&
          yi(function() {
              return gi.call(this);
          });
    var mi = function(t, e, n) {
        var r = N(t),
            i = n(V, r, ''[t]),
            o = i[0],
            u = i[1];
        c(function() {
            var e = {};
            return (
                (e[r] = function() {
                    return 7;
                }),
                7 != ''[t](e)
            );
        }) &&
            (A(String.prototype, t, o),
            S(
                RegExp.prototype,
                r,
                2 == e
                    ? function(t, e) {
                          return u.call(t, this, e);
                      }
                    : function(t) {
                          return u.call(t, this);
                      }
            ));
    };
    mi('match', 1, function(t, e, n) {
        return [
            function(n) {
                var r = t(this),
                    i = null == n ? void 0 : n[e];
                return void 0 !== i
                    ? i.call(n, r)
                    : new RegExp(n)[e](String(r));
            },
            n,
        ];
    }),
        mi('replace', 2, function(t, e, n) {
            return [
                function(r, i) {
                    var o = t(this),
                        u = null == r ? void 0 : r[e];
                    return void 0 !== u
                        ? u.call(r, o, i)
                        : n.call(String(o), r, i);
                },
                n,
            ];
        }),
        mi('search', 1, function(t, e, n) {
            return [
                function(n) {
                    var r = t(this),
                        i = null == n ? void 0 : n[e];
                    return void 0 !== i
                        ? i.call(n, r)
                        : new RegExp(n)[e](String(r));
                },
                n,
            ];
        }),
        mi('split', 2, function(t, e, n) {
            var r = $n,
                i = n,
                o = [].push;
            if (
                'c' == 'abbc'.split(/(b)*/)[1] ||
                4 != 'test'.split(/(?:)/, -1).length ||
                2 != 'ab'.split(/(?:ab)*/).length ||
                4 != '.'.split(/(.?)(.?)/).length ||
                '.'.split(/()()/).length > 1 ||
                ''.split(/.?/).length
            ) {
                var u = void 0 === /()??/.exec('')[1];
                n = function(t, e) {
                    var n = String(this);
                    if (void 0 === t && 0 === e) return [];
                    if (!r(t)) return i.call(n, t, e);
                    var a,
                        c,
                        s,
                        f,
                        l,
                        h = [],
                        p =
                            (t.ignoreCase ? 'i' : '') +
                            (t.multiline ? 'm' : '') +
                            (t.unicode ? 'u' : '') +
                            (t.sticky ? 'y' : ''),
                        d = 0,
                        v = void 0 === e ? 4294967295 : e >>> 0,
                        g = new RegExp(t.source, p + 'g');
                    for (
                        u || (a = new RegExp('^' + g.source + '$(?!\\s)', p));
                        (c = g.exec(n)) &&
                        !(
                            (s = c.index + c[0].length) > d &&
                            (h.push(n.slice(d, c.index)),
                            !u &&
                                c.length > 1 &&
                                c[0].replace(a, function() {
                                    for (l = 1; l < arguments.length - 2; l++)
                                        void 0 === arguments[l] &&
                                            (c[l] = void 0);
                                }),
                            c.length > 1 &&
                                c.index < n.length &&
                                o.apply(h, c.slice(1)),
                            (f = c[0].length),
                            (d = s),
                            h.length >= v)
                        );

                    )
                        g.lastIndex === c.index && g.lastIndex++;
                    return (
                        d === n.length
                            ? (!f && g.test('')) || h.push('')
                            : h.push(n.slice(d)),
                        h.length > v ? h.slice(0, v) : h
                    );
                };
            } else
                '0'.split(void 0, 0).length &&
                    (n = function(t, e) {
                        return void 0 === t && 0 === e
                            ? []
                            : i.call(this, t, e);
                    });
            return [
                function(r, i) {
                    var o = t(this),
                        u = null == r ? void 0 : r[e];
                    return void 0 !== u
                        ? u.call(r, o, i)
                        : n.call(String(o), r, i);
                },
                n,
            ];
        });
    var bi,
        wi,
        Si,
        _i = function(t, e, n, r) {
            if (!(t instanceof e) || (void 0 !== r && r in t))
                throw TypeError(n + ': incorrect invocation!');
            return t;
        },
        Ei = i(function(t) {
            var e = {},
                n = {},
                r = (t.exports = function(t, r, i, o, u) {
                    var a,
                        c,
                        s,
                        f,
                        l = u
                            ? function() {
                                  return t;
                              }
                            : Sr(t),
                        p = O(i, o, r ? 2 : 1),
                        d = 0;
                    if ('function' != typeof l)
                        throw TypeError(t + ' is not iterable!');
                    if (mr(l)) {
                        for (a = J(t.length); a > d; d++)
                            if (
                                (f = r
                                    ? p(h((c = t[d]))[0], c[1])
                                    : p(t[d])) === e ||
                                f === n
                            )
                                return f;
                    } else
                        for (s = l.call(t); !(c = s.next()).done; )
                            if ((f = vr(s, p, c.value, r)) === e || f === n)
                                return f;
                });
            (r.BREAK = e), (r.RETURN = n);
        }),
        xi = N('species'),
        Ai = function(t, e) {
            var n,
                r = h(t).constructor;
            return void 0 === r || null == (n = h(r)[xi]) ? e : P(n);
        },
        Pi = o.process,
        Oi = o.setImmediate,
        ki = o.clearImmediate,
        Ri = o.MessageChannel,
        Ii = o.Dispatch,
        Fi = 0,
        Mi = {},
        Ni = function() {
            var t = +this;
            if (Mi.hasOwnProperty(t)) {
                var e = Mi[t];
                delete Mi[t], e();
            }
        },
        Ti = function(t) {
            Ni.call(t.data);
        };
    (Oi && ki) ||
        ((Oi = function(t) {
            for (var e = [], n = 1; arguments.length > n; )
                e.push(arguments[n++]);
            return (
                (Mi[++Fi] = function() {
                    be('function' == typeof t ? t : Function(t), e);
                }),
                bi(Fi),
                Fi
            );
        }),
        (ki = function(t) {
            delete Mi[t];
        }),
        'process' == W(Pi)
            ? (bi = function(t) {
                  Pi.nextTick(O(Ni, t, 1));
              })
            : Ii && Ii.now
                ? (bi = function(t) {
                      Ii.now(O(Ni, t, 1));
                  })
                : Ri
                    ? ((Si = (wi = new Ri()).port2),
                      (wi.port1.onmessage = Ti),
                      (bi = O(Si.postMessage, Si, 1)))
                    : o.addEventListener &&
                      'function' == typeof postMessage &&
                      !o.importScripts
                        ? ((bi = function(t) {
                              o.postMessage(t + '', '*');
                          }),
                          o.addEventListener('message', Ti, !1))
                        : (bi =
                              'onreadystatechange' in v('script')
                                  ? function(t) {
                                        ht.appendChild(
                                            v('script')
                                        ).onreadystatechange = function() {
                                            ht.removeChild(this), Ni.call(t);
                                        };
                                    }
                                  : function(t) {
                                        setTimeout(O(Ni, t, 1), 0);
                                    }));
    var ji = { set: Oi, clear: ki },
        Li = ji.set,
        Bi = o.MutationObserver || o.WebKitMutationObserver,
        Ui = o.process,
        Ci = o.Promise,
        Di = 'process' == W(Ui),
        Wi = function() {
            var t,
                e,
                n,
                r = function() {
                    var r, i;
                    for (Di && (r = Ui.domain) && r.exit(); t; ) {
                        (i = t.fn), (t = t.next);
                        try {
                            i();
                        } catch (r) {
                            throw (t ? n() : (e = void 0), r);
                        }
                    }
                    (e = void 0), r && r.enter();
                };
            if (Di)
                n = function() {
                    Ui.nextTick(r);
                };
            else if (!Bi || (o.navigator && o.navigator.standalone))
                if (Ci && Ci.resolve) {
                    var i = Ci.resolve();
                    n = function() {
                        i.then(r);
                    };
                } else
                    n = function() {
                        Li.call(o, r);
                    };
            else {
                var u = !0,
                    a = document.createTextNode('');
                new Bi(r).observe(a, { characterData: !0 }),
                    (n = function() {
                        a.data = u = !u;
                    });
            }
            return function(r) {
                var i = { fn: r, next: void 0 };
                e && (e.next = i), t || ((t = i), n()), (e = i);
            };
        };
    var Gi,
        Vi,
        zi,
        Yi,
        Ki = {
            f: function(t) {
                return new function(t) {
                    var e, n;
                    (this.promise = new t(function(t, r) {
                        if (void 0 !== e || void 0 !== n)
                            throw TypeError('Bad Promise constructor');
                        (e = t), (n = r);
                    })),
                        (this.resolve = P(e)),
                        (this.reject = P(n));
                }(t);
            },
        },
        qi = function(t) {
            try {
                return { e: !1, v: t() };
            } catch (t) {
                return { e: !0, v: t };
            }
        },
        Hi = function(t, e) {
            if ((h(t), l(e) && e.constructor === t)) return e;
            var n = Ki.f(t);
            return (0, n.resolve)(e), n.promise;
        },
        Ji = function(t, e, n) {
            for (var r in e) A(t, r, e[r], n);
            return t;
        },
        Xi = ji.set,
        $i = Wi(),
        Zi = o.TypeError,
        Qi = o.process,
        to = o.Promise,
        eo = 'process' == ye(Qi),
        no = function() {},
        ro = (Vi = Ki.f),
        io = !!(function() {
            try {
                var t = to.resolve(1),
                    e = ((t.constructor = {})[N('species')] = function(t) {
                        t(no, no);
                    });
                return (
                    (eo || 'function' == typeof PromiseRejectionEvent) &&
                    t.then(no) instanceof e
                );
            } catch (t) {}
        })(),
        oo = function(t) {
            var e;
            return !(!l(t) || 'function' != typeof (e = t.then)) && e;
        },
        uo = function(t, e) {
            if (!t._n) {
                t._n = !0;
                var n = t._c;
                $i(function() {
                    for (
                        var r = t._v,
                            i = 1 == t._s,
                            o = 0,
                            u = function(e) {
                                var n,
                                    o,
                                    u = i ? e.ok : e.fail,
                                    a = e.resolve,
                                    c = e.reject,
                                    s = e.domain;
                                try {
                                    u
                                        ? (i ||
                                              (2 == t._h && so(t), (t._h = 1)),
                                          !0 === u
                                              ? (n = r)
                                              : (s && s.enter(),
                                                (n = u(r)),
                                                s && s.exit()),
                                          n === e.promise
                                              ? c(Zi('Promise-chain cycle'))
                                              : (o = oo(n))
                                                  ? o.call(n, a, c)
                                                  : a(n))
                                        : c(r);
                                } catch (t) {
                                    c(t);
                                }
                            };
                        n.length > o;

                    )
                        u(n[o++]);
                    (t._c = []), (t._n = !1), e && !t._h && ao(t);
                });
            }
        },
        ao = function(t) {
            Xi.call(o, function() {
                var e,
                    n,
                    r,
                    i = t._v,
                    u = co(t);
                if (
                    (u &&
                        ((e = qi(function() {
                            eo
                                ? Qi.emit('unhandledRejection', i, t)
                                : (n = o.onunhandledrejection)
                                    ? n({ promise: t, reason: i })
                                    : (r = o.console) &&
                                      r.error &&
                                      r.error('Unhandled promise rejection', i);
                        })),
                        (t._h = eo || co(t) ? 2 : 1)),
                    (t._a = void 0),
                    u && e.e)
                )
                    throw e.v;
            });
        },
        co = function(t) {
            return 1 !== t._h && 0 === (t._a || t._c).length;
        },
        so = function(t) {
            Xi.call(o, function() {
                var e;
                eo
                    ? Qi.emit('rejectionHandled', t)
                    : (e = o.onrejectionhandled) &&
                      e({ promise: t, reason: t._v });
            });
        },
        fo = function(t) {
            var e = this;
            e._d ||
                ((e._d = !0),
                ((e = e._w || e)._v = t),
                (e._s = 2),
                e._a || (e._a = e._c.slice()),
                uo(e, !0));
        },
        lo = function(t) {
            var e,
                n = this;
            if (!n._d) {
                (n._d = !0), (n = n._w || n);
                try {
                    if (n === t) throw Zi("Promise can't be resolved itself");
                    (e = oo(t))
                        ? $i(function() {
                              var r = { _w: n, _d: !1 };
                              try {
                                  e.call(t, O(lo, r, 1), O(fo, r, 1));
                              } catch (t) {
                                  fo.call(r, t);
                              }
                          })
                        : ((n._v = t), (n._s = 1), uo(n, !1));
                } catch (t) {
                    fo.call({ _w: n, _d: !1 }, t);
                }
            }
        };
    io ||
        ((to = function(t) {
            _i(this, to, 'Promise', '_h'), P(t), Gi.call(this);
            try {
                t(O(lo, this, 1), O(fo, this, 1));
            } catch (t) {
                fo.call(this, t);
            }
        }),
        ((Gi = function(t) {
            (this._c = []),
                (this._a = void 0),
                (this._s = 0),
                (this._d = !1),
                (this._v = void 0),
                (this._h = 0),
                (this._n = !1);
        }).prototype = Ji(to.prototype, {
            then: function(t, e) {
                var n = ro(Ai(this, to));
                return (
                    (n.ok = 'function' != typeof t || t),
                    (n.fail = 'function' == typeof e && e),
                    (n.domain = eo ? Qi.domain : void 0),
                    this._c.push(n),
                    this._a && this._a.push(n),
                    this._s && uo(this, !1),
                    n.promise
                );
            },
            catch: function(t) {
                return this.then(void 0, t);
            },
        })),
        (zi = function() {
            var t = new Gi();
            (this.promise = t),
                (this.resolve = O(lo, t, 1)),
                (this.reject = O(fo, t, 1));
        }),
        (Ki.f = ro = function(t) {
            return t === to || t === Yi ? new zi(t) : Vi(t);
        })),
        R(R.G + R.W + R.F * !io, { Promise: to }),
        L(to, 'Promise'),
        ei('Promise'),
        (Yi = f.Promise),
        R(R.S + R.F * !io, 'Promise', {
            reject: function(t) {
                var e = ro(this);
                return (0, e.reject)(t), e.promise;
            },
        }),
        R(R.S + R.F * !io, 'Promise', {
            resolve: function(t) {
                return Hi(this, t);
            },
        }),
        R(
            R.S +
                R.F *
                    !(
                        io &&
                        xr(function(t) {
                            to.all(t).catch(no);
                        })
                    ),
            'Promise',
            {
                all: function(t) {
                    var e = this,
                        n = ro(e),
                        r = n.resolve,
                        i = n.reject,
                        o = qi(function() {
                            var n = [],
                                o = 0,
                                u = 1;
                            Ei(t, !1, function(t) {
                                var a = o++,
                                    c = !1;
                                n.push(void 0),
                                    u++,
                                    e.resolve(t).then(function(t) {
                                        c ||
                                            ((c = !0), (n[a] = t), --u || r(n));
                                    }, i);
                            }),
                                --u || r(n);
                        });
                    return o.e && i(o.v), n.promise;
                },
                race: function(t) {
                    var e = this,
                        n = ro(e),
                        r = n.reject,
                        i = qi(function() {
                            Ei(t, !1, function(t) {
                                e.resolve(t).then(n.resolve, r);
                            });
                        });
                    return i.e && r(i.v), n.promise;
                },
            }
        );
    var ho = function(t, e) {
            if (!l(t) || t._t !== e)
                throw TypeError('Incompatible receiver, ' + e + ' required!');
            return t;
        },
        po = b.f,
        vo = I.fastKey,
        go = s ? '_s' : 'size',
        yo = function(t, e) {
            var n,
                r = vo(e);
            if ('F' !== r) return t._i[r];
            for (n = t._f; n; n = n.n) if (n.k == e) return n;
        },
        mo = {
            getConstructor: function(t, e, n, r) {
                var i = t(function(t, o) {
                    _i(t, i, e, '_i'),
                        (t._t = e),
                        (t._i = gt(null)),
                        (t._f = void 0),
                        (t._l = void 0),
                        (t[go] = 0),
                        null != o && Ei(o, n, t[r], t);
                });
                return (
                    Ji(i.prototype, {
                        clear: function() {
                            for (
                                var t = ho(this, e), n = t._i, r = t._f;
                                r;
                                r = r.n
                            )
                                (r.r = !0),
                                    r.p && (r.p = r.p.n = void 0),
                                    delete n[r.i];
                            (t._f = t._l = void 0), (t[go] = 0);
                        },
                        delete: function(t) {
                            var n = ho(this, e),
                                r = yo(n, t);
                            if (r) {
                                var i = r.n,
                                    o = r.p;
                                delete n._i[r.i],
                                    (r.r = !0),
                                    o && (o.n = i),
                                    i && (i.p = o),
                                    n._f == r && (n._f = i),
                                    n._l == r && (n._l = o),
                                    n[go]--;
                            }
                            return !!r;
                        },
                        forEach: function(t) {
                            ho(this, e);
                            for (
                                var n,
                                    r = O(
                                        t,
                                        arguments.length > 1
                                            ? arguments[1]
                                            : void 0,
                                        3
                                    );
                                (n = n ? n.n : this._f);

                            )
                                for (r(n.v, n.k, this); n && n.r; ) n = n.p;
                        },
                        has: function(t) {
                            return !!yo(ho(this, e), t);
                        },
                    }),
                    s &&
                        po(i.prototype, 'size', {
                            get: function() {
                                return ho(this, e)[go];
                            },
                        }),
                    i
                );
            },
            def: function(t, e, n) {
                var r,
                    i,
                    o = yo(t, e);
                return (
                    o
                        ? (o.v = n)
                        : ((t._l = o = {
                              i: (i = vo(e, !0)),
                              k: e,
                              v: n,
                              p: (r = t._l),
                              n: void 0,
                              r: !1,
                          }),
                          t._f || (t._f = o),
                          r && (r.n = o),
                          t[go]++,
                          'F' !== i && (t._i[i] = o)),
                    t
                );
            },
            getEntry: yo,
            setStrong: function(t, e, n) {
                qn(
                    t,
                    e,
                    function(t, n) {
                        (this._t = ho(t, e)), (this._k = n), (this._l = void 0);
                    },
                    function() {
                        for (var t = this._k, e = this._l; e && e.r; ) e = e.p;
                        return this._t && (this._l = e = e ? e.n : this._t._f)
                            ? ni(
                                  0,
                                  'keys' == t
                                      ? e.k
                                      : 'values' == t ? e.v : [e.k, e.v]
                              )
                            : ((this._t = void 0), ni(1));
                    },
                    n ? 'entries' : 'values',
                    !n,
                    !0
                ),
                    ei(e);
            },
        },
        bo = function(t, e, n, r, i, u) {
            var a = o[t],
                s = a,
                f = i ? 'set' : 'add',
                h = s && s.prototype,
                p = {},
                d = function(t) {
                    var e = h[t];
                    A(
                        h,
                        t,
                        'delete' == t
                            ? function(t) {
                                  return (
                                      !(u && !l(t)) &&
                                      e.call(this, 0 === t ? 0 : t)
                                  );
                              }
                            : 'has' == t
                                ? function(t) {
                                      return (
                                          !(u && !l(t)) &&
                                          e.call(this, 0 === t ? 0 : t)
                                      );
                                  }
                                : 'get' == t
                                    ? function(t) {
                                          return u && !l(t)
                                              ? void 0
                                              : e.call(this, 0 === t ? 0 : t);
                                      }
                                    : 'add' == t
                                        ? function(t) {
                                              return (
                                                  e.call(this, 0 === t ? 0 : t),
                                                  this
                                              );
                                          }
                                        : function(t, n) {
                                              return (
                                                  e.call(
                                                      this,
                                                      0 === t ? 0 : t,
                                                      n
                                                  ),
                                                  this
                                              );
                                          }
                    );
                };
            if (
                'function' == typeof s &&
                (u ||
                    (h.forEach &&
                        !c(function() {
                            new s().entries().next();
                        })))
            ) {
                var v = new s(),
                    g = v[f](u ? {} : -0, 1) != v,
                    y = c(function() {
                        v.has(1);
                    }),
                    m = xr(function(t) {
                        new s(t);
                    }),
                    b =
                        !u &&
                        c(function() {
                            for (var t = new s(), e = 5; e--; ) t[f](e, e);
                            return !t.has(-0);
                        });
                m ||
                    (((s = e(function(e, n) {
                        _i(e, s, t);
                        var r = Ve(new a(), e, s);
                        return null != n && Ei(n, i, r[f], r), r;
                    })).prototype = h),
                    (h.constructor = s)),
                    (y || b) && (d('delete'), d('has'), i && d('get')),
                    (b || g) && d(f),
                    u && h.clear && delete h.clear;
            } else
                (s = r.getConstructor(e, t, i, f)),
                    Ji(s.prototype, n),
                    (I.NEED = !0);
            return (
                L(s, t),
                (p[t] = s),
                R(R.G + R.W + R.F * (s != a), p),
                u || r.setStrong(s, t, i),
                s
            );
        },
        wo = bo(
            'Map',
            function(t) {
                return function() {
                    return t(
                        this,
                        arguments.length > 0 ? arguments[0] : void 0
                    );
                };
            },
            {
                get: function(t) {
                    var e = mo.getEntry(ho(this, 'Map'), t);
                    return e && e.v;
                },
                set: function(t, e) {
                    return mo.def(ho(this, 'Map'), 0 === t ? 0 : t, e);
                },
            },
            mo,
            !0
        ),
        So = bo(
            'Set',
            function(t) {
                return function() {
                    return t(
                        this,
                        arguments.length > 0 ? arguments[0] : void 0
                    );
                };
            },
            {
                add: function(t) {
                    return mo.def(ho(this, 'Set'), (t = 0 === t ? 0 : t), t);
                },
            },
            mo
        ),
        _o = I.getWeak,
        Eo = Mr(5),
        xo = Mr(6),
        Ao = 0,
        Po = function(t) {
            return t._l || (t._l = new Oo());
        },
        Oo = function() {
            this.a = [];
        },
        ko = function(t, e) {
            return Eo(t.a, function(t) {
                return t[0] === e;
            });
        };
    Oo.prototype = {
        get: function(t) {
            var e = ko(this, t);
            if (e) return e[1];
        },
        has: function(t) {
            return !!ko(this, t);
        },
        set: function(t, e) {
            var n = ko(this, t);
            n ? (n[1] = e) : this.a.push([t, e]);
        },
        delete: function(t) {
            var e = xo(this.a, function(e) {
                return e[0] === t;
            });
            return ~e && this.a.splice(e, 1), !!~e;
        },
    };
    var Ro = {
            getConstructor: function(t, e, n, r) {
                var i = t(function(t, o) {
                    _i(t, i, e, '_i'),
                        (t._t = e),
                        (t._i = Ao++),
                        (t._l = void 0),
                        null != o && Ei(o, n, t[r], t);
                });
                return (
                    Ji(i.prototype, {
                        delete: function(t) {
                            if (!l(t)) return !1;
                            var n = _o(t);
                            return !0 === n
                                ? Po(ho(this, e)).delete(t)
                                : n && a(n, this._i) && delete n[this._i];
                        },
                        has: function(t) {
                            if (!l(t)) return !1;
                            var n = _o(t);
                            return !0 === n
                                ? Po(ho(this, e)).has(t)
                                : n && a(n, this._i);
                        },
                    }),
                    i
                );
            },
            def: function(t, e, n) {
                var r = _o(h(e), !0);
                return !0 === r ? Po(t).set(e, n) : (r[t._i] = n), t;
            },
            ufstore: Po,
        },
        Io = i(function(t) {
            var e,
                n = Mr(0),
                r = I.getWeak,
                i = Object.isExtensible,
                o = Ro.ufstore,
                u = {},
                a = function(t) {
                    return function() {
                        return t(
                            this,
                            arguments.length > 0 ? arguments[0] : void 0
                        );
                    };
                },
                s = {
                    get: function(t) {
                        if (l(t)) {
                            var e = r(t);
                            return !0 === e
                                ? o(ho(this, 'WeakMap')).get(t)
                                : e ? e[this._i] : void 0;
                        }
                    },
                    set: function(t, e) {
                        return Ro.def(ho(this, 'WeakMap'), t, e);
                    },
                },
                f = (t.exports = bo('WeakMap', a, s, Ro, !0, !0));
            c(function() {
                return 7 != new f().set((Object.freeze || Object)(u), 7).get(u);
            }) &&
                ((e = Ro.getConstructor(a, 'WeakMap')),
                le(e.prototype, s),
                (I.NEED = !0),
                n(['delete', 'has', 'get', 'set'], function(t) {
                    var n = f.prototype,
                        r = n[t];
                    A(n, t, function(n, o) {
                        if (l(n) && !i(n)) {
                            this._f || (this._f = new e());
                            var u = this._f[t](n, o);
                            return 'set' == t ? this : u;
                        }
                        return r.call(this, n, o);
                    });
                }));
        });
    bo(
        'WeakSet',
        function(t) {
            return function() {
                return t(this, arguments.length > 0 ? arguments[0] : void 0);
            };
        },
        {
            add: function(t) {
                return Ro.def(ho(this, 'WeakSet'), t, !0);
            },
        },
        Ro,
        !1,
        !0
    );
    for (
        var Fo,
            Mo = x('typed_array'),
            No = x('view'),
            To = !(!o.ArrayBuffer || !o.DataView),
            jo = To,
            Lo = 0,
            Bo = 'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'.split(
                ','
            );
        Lo < 9;

    )
        (Fo = o[Bo[Lo++]])
            ? (S(Fo.prototype, Mo, !0), S(Fo.prototype, No, !0))
            : (jo = !1);
    var Uo = { ABV: To, CONSTR: jo, TYPED: Mo, VIEW: No },
        Co = function(t) {
            if (void 0 === t) return 0;
            var e = q(t),
                n = J(e);
            if (e !== n) throw RangeError('Wrong length!');
            return n;
        },
        Do = i(function(t, e) {
            var n = mt.f,
                r = b.f,
                i = 'prototype',
                u = 'Wrong index!',
                a = o.ArrayBuffer,
                f = o.DataView,
                l = o.Math,
                h = o.RangeError,
                p = o.Infinity,
                d = a,
                v = l.abs,
                g = l.pow,
                y = l.floor,
                m = l.log,
                w = l.LN2,
                _ = s ? '_b' : 'buffer',
                E = s ? '_l' : 'byteLength',
                x = s ? '_o' : 'byteOffset';
            function A(t, e, n) {
                var r,
                    i,
                    o,
                    u = new Array(n),
                    a = 8 * n - e - 1,
                    c = (1 << a) - 1,
                    s = c >> 1,
                    f = 23 === e ? g(2, -24) - g(2, -77) : 0,
                    l = 0,
                    h = t < 0 || (0 === t && 1 / t < 0) ? 1 : 0;
                for (
                    (t = v(t)) != t || t === p
                        ? ((i = t != t ? 1 : 0), (r = c))
                        : ((r = y(m(t) / w)),
                          t * (o = g(2, -r)) < 1 && (r--, (o *= 2)),
                          (t += r + s >= 1 ? f / o : f * g(2, 1 - s)) * o >=
                              2 && (r++, (o /= 2)),
                          r + s >= c
                              ? ((i = 0), (r = c))
                              : r + s >= 1
                                  ? ((i = (t * o - 1) * g(2, e)), (r += s))
                                  : ((i = t * g(2, s - 1) * g(2, e)), (r = 0)));
                    e >= 8;
                    u[l++] = 255 & i, i /= 256, e -= 8
                );
                for (
                    r = (r << e) | i, a += e;
                    a > 0;
                    u[l++] = 255 & r, r /= 256, a -= 8
                );
                return (u[--l] |= 128 * h), u;
            }
            function P(t, e, n) {
                var r,
                    i = 8 * n - e - 1,
                    o = (1 << i) - 1,
                    u = o >> 1,
                    a = i - 7,
                    c = n - 1,
                    s = t[c--],
                    f = 127 & s;
                for (s >>= 7; a > 0; f = 256 * f + t[c], c--, a -= 8);
                for (
                    r = f & ((1 << -a) - 1), f >>= -a, a += e;
                    a > 0;
                    r = 256 * r + t[c], c--, a -= 8
                );
                if (0 === f) f = 1 - u;
                else {
                    if (f === o) return r ? NaN : s ? -p : p;
                    (r += g(2, e)), (f -= u);
                }
                return (s ? -1 : 1) * r * g(2, f - e);
            }
            function O(t) {
                return (t[3] << 24) | (t[2] << 16) | (t[1] << 8) | t[0];
            }
            function k(t) {
                return [255 & t];
            }
            function R(t) {
                return [255 & t, (t >> 8) & 255];
            }
            function I(t) {
                return [
                    255 & t,
                    (t >> 8) & 255,
                    (t >> 16) & 255,
                    (t >> 24) & 255,
                ];
            }
            function F(t) {
                return A(t, 52, 8);
            }
            function M(t) {
                return A(t, 23, 4);
            }
            function N(t, e, n) {
                r(t[i], e, {
                    get: function() {
                        return this[n];
                    },
                });
            }
            function T(t, e, n, r) {
                var i = Co(+n);
                if (i + e > t[E]) throw h(u);
                var o = t[_]._b,
                    a = i + t[x],
                    c = o.slice(a, a + e);
                return r ? c : c.reverse();
            }
            function j(t, e, n, r, i, o) {
                var a = Co(+n);
                if (a + e > t[E]) throw h(u);
                for (
                    var c = t[_]._b, s = a + t[x], f = r(+i), l = 0;
                    l < e;
                    l++
                )
                    c[s + l] = f[o ? l : e - l - 1];
            }
            if (Uo.ABV) {
                if (
                    !c(function() {
                        a(1);
                    }) ||
                    !c(function() {
                        new a(-1);
                    }) ||
                    c(function() {
                        return (
                            new a(),
                            new a(1.5),
                            new a(NaN),
                            'ArrayBuffer' != a.name
                        );
                    })
                ) {
                    for (
                        var B,
                            U = ((a = function(t) {
                                return _i(this, a), new d(Co(t));
                            })[i] =
                                d[i]),
                            C = n(d),
                            D = 0;
                        C.length > D;

                    )
                        (B = C[D++]) in a || S(a, B, d[B]);
                    U.constructor = a;
                }
                var W = new f(new a(2)),
                    G = f[i].setInt8;
                W.setInt8(0, 2147483648),
                    W.setInt8(1, 2147483649),
                    (!W.getInt8(0) && W.getInt8(1)) ||
                        Ji(
                            f[i],
                            {
                                setInt8: function(t, e) {
                                    G.call(this, t, (e << 24) >> 24);
                                },
                                setUint8: function(t, e) {
                                    G.call(this, t, (e << 24) >> 24);
                                },
                            },
                            !0
                        );
            } else
                (a = function(t) {
                    _i(this, a, 'ArrayBuffer');
                    var e = Co(t);
                    (this._b = Jr.call(new Array(e), 0)), (this[E] = e);
                }),
                    (f = function(t, e, n) {
                        _i(this, f, 'DataView'), _i(t, a, 'DataView');
                        var r = t[E],
                            i = q(e);
                        if (i < 0 || i > r) throw h('Wrong offset!');
                        if (i + (n = void 0 === n ? r - i : J(n)) > r)
                            throw h('Wrong length!');
                        (this[_] = t), (this[x] = i), (this[E] = n);
                    }),
                    s &&
                        (N(a, 'byteLength', '_l'),
                        N(f, 'buffer', '_b'),
                        N(f, 'byteLength', '_l'),
                        N(f, 'byteOffset', '_o')),
                    Ji(f[i], {
                        getInt8: function(t) {
                            return (T(this, 1, t)[0] << 24) >> 24;
                        },
                        getUint8: function(t) {
                            return T(this, 1, t)[0];
                        },
                        getInt16: function(t) {
                            var e = T(this, 2, t, arguments[1]);
                            return (((e[1] << 8) | e[0]) << 16) >> 16;
                        },
                        getUint16: function(t) {
                            var e = T(this, 2, t, arguments[1]);
                            return (e[1] << 8) | e[0];
                        },
                        getInt32: function(t) {
                            return O(T(this, 4, t, arguments[1]));
                        },
                        getUint32: function(t) {
                            return O(T(this, 4, t, arguments[1])) >>> 0;
                        },
                        getFloat32: function(t) {
                            return P(T(this, 4, t, arguments[1]), 23, 4);
                        },
                        getFloat64: function(t) {
                            return P(T(this, 8, t, arguments[1]), 52, 8);
                        },
                        setInt8: function(t, e) {
                            j(this, 1, t, k, e);
                        },
                        setUint8: function(t, e) {
                            j(this, 1, t, k, e);
                        },
                        setInt16: function(t, e) {
                            j(this, 2, t, R, e, arguments[2]);
                        },
                        setUint16: function(t, e) {
                            j(this, 2, t, R, e, arguments[2]);
                        },
                        setInt32: function(t, e) {
                            j(this, 4, t, I, e, arguments[2]);
                        },
                        setUint32: function(t, e) {
                            j(this, 4, t, I, e, arguments[2]);
                        },
                        setFloat32: function(t, e) {
                            j(this, 4, t, M, e, arguments[2]);
                        },
                        setFloat64: function(t, e) {
                            j(this, 8, t, F, e, arguments[2]);
                        },
                    });
            L(a, 'ArrayBuffer'),
                L(f, 'DataView'),
                S(f[i], Uo.VIEW, !0),
                (e.ArrayBuffer = a),
                (e.DataView = f);
        }),
        Wo = o.ArrayBuffer,
        Go = Do.ArrayBuffer,
        Vo = Do.DataView,
        zo = Uo.ABV && Wo.isView,
        Yo = Go.prototype.slice,
        Ko = Uo.VIEW;
    R(R.G + R.W + R.F * (Wo !== Go), { ArrayBuffer: Go }),
        R(R.S + R.F * !Uo.CONSTR, 'ArrayBuffer', {
            isView: function(t) {
                return (zo && zo(t)) || (l(t) && Ko in t);
            },
        }),
        R(
            R.P +
                R.U +
                R.F *
                    c(function() {
                        return !new Go(2).slice(1, void 0).byteLength;
                    }),
            'ArrayBuffer',
            {
                slice: function(t, e) {
                    if (void 0 !== Yo && void 0 === e)
                        return Yo.call(h(this), t);
                    for (
                        var n = h(this).byteLength,
                            r = Z(t, n),
                            i = Z(void 0 === e ? n : e, n),
                            o = new (Ai(this, Go))(J(i - r)),
                            u = new Vo(this),
                            a = new Vo(o),
                            c = 0;
                        r < i;

                    )
                        a.setUint8(c++, u.getUint8(r++));
                    return o;
                },
            }
        ),
        ei('ArrayBuffer'),
        R(R.G + R.W + R.F * !Uo.ABV, { DataView: Do.DataView });
    var qo = i(function(t) {
        if (s) {
            var e = o,
                n = c,
                r = R,
                i = Uo,
                u = Do,
                f = O,
                h = _i,
                p = w,
                d = S,
                v = Ji,
                g = q,
                m = J,
                _ = Co,
                E = Z,
                A = y,
                P = a,
                k = ye,
                I = l,
                F = re,
                M = mr,
                T = gt,
                j = ue,
                L = mt.f,
                B = Sr,
                U = x,
                C = N,
                D = Mr,
                W = Q,
                G = Ai,
                V = ri,
                z = Wn,
                Y = xr,
                K = ei,
                H = Jr,
                X = Yr,
                $ = b,
                tt = xt,
                et = $.f,
                nt = tt.f,
                rt = e.RangeError,
                it = e.TypeError,
                ot = e.Uint8Array,
                ut = Array.prototype,
                at = u.ArrayBuffer,
                ct = u.DataView,
                st = D(0),
                ft = D(2),
                lt = D(3),
                ht = D(4),
                pt = D(5),
                dt = D(6),
                vt = W(!0),
                yt = W(!1),
                bt = V.values,
                wt = V.keys,
                St = V.entries,
                _t = ut.lastIndexOf,
                Et = ut.reduce,
                At = ut.reduceRight,
                Pt = ut.join,
                Ot = ut.sort,
                kt = ut.slice,
                Rt = ut.toString,
                It = ut.toLocaleString,
                Ft = C('iterator'),
                Mt = C('toStringTag'),
                Nt = U('typed_constructor'),
                Tt = U('def_constructor'),
                jt = i.CONSTR,
                Lt = i.TYPED,
                Bt = i.VIEW,
                Ut = D(1, function(t, e) {
                    return Vt(G(t, t[Tt]), e);
                }),
                Ct = n(function() {
                    return 1 === new ot(new Uint16Array([1]).buffer)[0];
                }),
                Dt =
                    !!ot &&
                    !!ot.prototype.set &&
                    n(function() {
                        new ot(1).set({});
                    }),
                Wt = function(t, e) {
                    var n = g(t);
                    if (n < 0 || n % e) throw rt('Wrong offset!');
                    return n;
                },
                Gt = function(t) {
                    if (I(t) && Lt in t) return t;
                    throw it(t + ' is not a typed array!');
                },
                Vt = function(t, e) {
                    if (!(I(t) && Nt in t))
                        throw it('It is not a typed array constructor!');
                    return new t(e);
                },
                zt = function(t, e) {
                    return Yt(G(t, t[Tt]), e);
                },
                Yt = function(t, e) {
                    for (var n = 0, r = e.length, i = Vt(t, r); r > n; )
                        i[n] = e[n++];
                    return i;
                },
                Kt = function(t, e, n) {
                    et(t, e, {
                        get: function() {
                            return this._d[n];
                        },
                    });
                },
                qt = function(t) {
                    var e,
                        n,
                        r,
                        i,
                        o,
                        u,
                        a = F(t),
                        c = arguments.length,
                        s = c > 1 ? arguments[1] : void 0,
                        l = void 0 !== s,
                        h = B(a);
                    if (null != h && !M(h)) {
                        for (
                            u = h.call(a), r = [], e = 0;
                            !(o = u.next()).done;
                            e++
                        )
                            r.push(o.value);
                        a = r;
                    }
                    for (
                        l && c > 2 && (s = f(s, arguments[2], 2)),
                            e = 0,
                            n = m(a.length),
                            i = Vt(this, n);
                        n > e;
                        e++
                    )
                        i[e] = l ? s(a[e], e) : a[e];
                    return i;
                },
                Ht = function() {
                    for (
                        var t = 0, e = arguments.length, n = Vt(this, e);
                        e > t;

                    )
                        n[t] = arguments[t++];
                    return n;
                },
                Jt =
                    !!ot &&
                    n(function() {
                        It.call(new ot(1));
                    }),
                Xt = function() {
                    return It.apply(
                        Jt ? kt.call(Gt(this)) : Gt(this),
                        arguments
                    );
                },
                $t = {
                    copyWithin: function(t, e) {
                        return X.call(
                            Gt(this),
                            t,
                            e,
                            arguments.length > 2 ? arguments[2] : void 0
                        );
                    },
                    every: function(t) {
                        return ht(
                            Gt(this),
                            t,
                            arguments.length > 1 ? arguments[1] : void 0
                        );
                    },
                    fill: function(t) {
                        return H.apply(Gt(this), arguments);
                    },
                    filter: function(t) {
                        return zt(
                            this,
                            ft(
                                Gt(this),
                                t,
                                arguments.length > 1 ? arguments[1] : void 0
                            )
                        );
                    },
                    find: function(t) {
                        return pt(
                            Gt(this),
                            t,
                            arguments.length > 1 ? arguments[1] : void 0
                        );
                    },
                    findIndex: function(t) {
                        return dt(
                            Gt(this),
                            t,
                            arguments.length > 1 ? arguments[1] : void 0
                        );
                    },
                    forEach: function(t) {
                        st(
                            Gt(this),
                            t,
                            arguments.length > 1 ? arguments[1] : void 0
                        );
                    },
                    indexOf: function(t) {
                        return yt(
                            Gt(this),
                            t,
                            arguments.length > 1 ? arguments[1] : void 0
                        );
                    },
                    includes: function(t) {
                        return vt(
                            Gt(this),
                            t,
                            arguments.length > 1 ? arguments[1] : void 0
                        );
                    },
                    join: function(t) {
                        return Pt.apply(Gt(this), arguments);
                    },
                    lastIndexOf: function(t) {
                        return _t.apply(Gt(this), arguments);
                    },
                    map: function(t) {
                        return Ut(
                            Gt(this),
                            t,
                            arguments.length > 1 ? arguments[1] : void 0
                        );
                    },
                    reduce: function(t) {
                        return Et.apply(Gt(this), arguments);
                    },
                    reduceRight: function(t) {
                        return At.apply(Gt(this), arguments);
                    },
                    reverse: function() {
                        for (
                            var t,
                                e = Gt(this).length,
                                n = Math.floor(e / 2),
                                r = 0;
                            r < n;

                        )
                            (t = this[r]),
                                (this[r++] = this[--e]),
                                (this[e] = t);
                        return this;
                    },
                    some: function(t) {
                        return lt(
                            Gt(this),
                            t,
                            arguments.length > 1 ? arguments[1] : void 0
                        );
                    },
                    sort: function(t) {
                        return Ot.call(Gt(this), t);
                    },
                    subarray: function(t, e) {
                        var n = Gt(this),
                            r = n.length,
                            i = E(t, r);
                        return new (G(n, n[Tt]))(
                            n.buffer,
                            n.byteOffset + i * n.BYTES_PER_ELEMENT,
                            m((void 0 === e ? r : E(e, r)) - i)
                        );
                    },
                },
                Zt = function(t, e) {
                    return zt(this, kt.call(Gt(this), t, e));
                },
                Qt = function(t) {
                    Gt(this);
                    var e = Wt(arguments[1], 1),
                        n = this.length,
                        r = F(t),
                        i = m(r.length),
                        o = 0;
                    if (i + e > n) throw rt('Wrong length!');
                    for (; o < i; ) this[e + o] = r[o++];
                },
                te = {
                    entries: function() {
                        return St.call(Gt(this));
                    },
                    keys: function() {
                        return wt.call(Gt(this));
                    },
                    values: function() {
                        return bt.call(Gt(this));
                    },
                },
                ee = function(t, e) {
                    return (
                        I(t) &&
                        t[Lt] &&
                        'symbol' != typeof e &&
                        e in t &&
                        String(+e) == String(e)
                    );
                },
                ne = function(t, e) {
                    return ee(t, (e = A(e, !0))) ? p(2, t[e]) : nt(t, e);
                },
                ie = function(t, e, n) {
                    return !(ee(t, (e = A(e, !0))) && I(n) && P(n, 'value')) ||
                        P(n, 'get') ||
                        P(n, 'set') ||
                        n.configurable ||
                        (P(n, 'writable') && !n.writable) ||
                        (P(n, 'enumerable') && !n.enumerable)
                        ? et(t, e, n)
                        : ((t[e] = n.value), t);
                };
            jt || ((tt.f = ne), ($.f = ie)),
                r(r.S + r.F * !jt, 'Object', {
                    getOwnPropertyDescriptor: ne,
                    defineProperty: ie,
                }),
                n(function() {
                    Rt.call({});
                }) &&
                    (Rt = It = function() {
                        return Pt.call(this);
                    });
            var oe = v({}, $t);
            v(oe, te),
                d(oe, Ft, te.values),
                v(oe, {
                    slice: Zt,
                    set: Qt,
                    constructor: function() {},
                    toString: Rt,
                    toLocaleString: Xt,
                }),
                Kt(oe, 'buffer', 'b'),
                Kt(oe, 'byteOffset', 'o'),
                Kt(oe, 'byteLength', 'l'),
                Kt(oe, 'length', 'e'),
                et(oe, Mt, {
                    get: function() {
                        return this[Lt];
                    },
                }),
                (t.exports = function(t, o, u, a) {
                    var c = t + ((a = !!a) ? 'Clamped' : '') + 'Array',
                        s = 'get' + t,
                        f = 'set' + t,
                        l = e[c],
                        p = l || {},
                        v = l && j(l),
                        g = !l || !i.ABV,
                        y = {},
                        b = l && l.prototype,
                        w = function(t, e) {
                            et(t, e, {
                                get: function() {
                                    return (function(t, e) {
                                        var n = t._d;
                                        return n.v[s](e * o + n.o, Ct);
                                    })(this, e);
                                },
                                set: function(t) {
                                    return (function(t, e, n) {
                                        var r = t._d;
                                        a &&
                                            (n =
                                                (n = Math.round(n)) < 0
                                                    ? 0
                                                    : n > 255 ? 255 : 255 & n),
                                            r.v[f](e * o + r.o, n, Ct);
                                    })(this, e, t);
                                },
                                enumerable: !0,
                            });
                        };
                    g
                        ? ((l = u(function(t, e, n, r) {
                              h(t, l, c, '_d');
                              var i,
                                  u,
                                  a,
                                  s,
                                  f = 0,
                                  p = 0;
                              if (I(e)) {
                                  if (
                                      !(
                                          e instanceof at ||
                                          'ArrayBuffer' == (s = k(e)) ||
                                          'SharedArrayBuffer' == s
                                      )
                                  )
                                      return Lt in e ? Yt(l, e) : qt.call(l, e);
                                  (i = e), (p = Wt(n, o));
                                  var v = e.byteLength;
                                  if (void 0 === r) {
                                      if (v % o) throw rt('Wrong length!');
                                      if ((u = v - p) < 0)
                                          throw rt('Wrong length!');
                                  } else if ((u = m(r) * o) + p > v)
                                      throw rt('Wrong length!');
                                  a = u / o;
                              } else (a = _(e)), (i = new at((u = a * o)));
                              for (
                                  d(t, '_d', {
                                      b: i,
                                      o: p,
                                      l: u,
                                      e: a,
                                      v: new ct(i),
                                  });
                                  f < a;

                              )
                                  w(t, f++);
                          })),
                          (b = l.prototype = T(oe)),
                          d(b, 'constructor', l))
                        : (n(function() {
                              l(1);
                          }) &&
                              n(function() {
                                  new l(-1);
                              }) &&
                              Y(function(t) {
                                  new l(), new l(null), new l(1.5), new l(t);
                              }, !0)) ||
                          ((l = u(function(t, e, n, r) {
                              var i;
                              return (
                                  h(t, l, c),
                                  I(e)
                                      ? e instanceof at ||
                                        'ArrayBuffer' == (i = k(e)) ||
                                        'SharedArrayBuffer' == i
                                          ? void 0 !== r
                                              ? new p(e, Wt(n, o), r)
                                              : void 0 !== n
                                                  ? new p(e, Wt(n, o))
                                                  : new p(e)
                                          : Lt in e ? Yt(l, e) : qt.call(l, e)
                                      : new p(_(e))
                              );
                          })),
                          st(
                              v !== Function.prototype
                                  ? L(p).concat(L(v))
                                  : L(p),
                              function(t) {
                                  t in l || d(l, t, p[t]);
                              }
                          ),
                          (l.prototype = b),
                          (b.constructor = l));
                    var S = b[Ft],
                        E = !!S && ('values' == S.name || null == S.name),
                        x = te.values;
                    d(l, Nt, !0),
                        d(b, Lt, c),
                        d(b, Bt, !0),
                        d(b, Tt, l),
                        (a ? new l(1)[Mt] == c : Mt in b) ||
                            et(b, Mt, {
                                get: function() {
                                    return c;
                                },
                            }),
                        (y[c] = l),
                        r(r.G + r.W + r.F * (l != p), y),
                        r(r.S, c, { BYTES_PER_ELEMENT: o }),
                        r(
                            r.S +
                                r.F *
                                    n(function() {
                                        p.of.call(l, 1);
                                    }),
                            c,
                            { from: qt, of: Ht }
                        ),
                        'BYTES_PER_ELEMENT' in b ||
                            d(b, 'BYTES_PER_ELEMENT', o),
                        r(r.P, c, $t),
                        K(c),
                        r(r.P + r.F * Dt, c, { set: Qt }),
                        r(r.P + r.F * !E, c, te),
                        b.toString != Rt && (b.toString = Rt),
                        r(
                            r.P +
                                r.F *
                                    n(function() {
                                        new l(1).slice();
                                    }),
                            c,
                            { slice: Zt }
                        ),
                        r(
                            r.P +
                                r.F *
                                    (n(function() {
                                        return (
                                            [1, 2].toLocaleString() !=
                                            new l([1, 2]).toLocaleString()
                                        );
                                    }) ||
                                        !n(function() {
                                            b.toLocaleString.call([1, 2]);
                                        })),
                            c,
                            { toLocaleString: Xt }
                        ),
                        (z[c] = E ? S : x),
                        E || d(b, Ft, x);
                });
        } else t.exports = function() {};
    });
    qo('Int8', 1, function(t) {
        return function(e, n, r) {
            return t(this, e, n, r);
        };
    }),
        qo('Uint8', 1, function(t) {
            return function(e, n, r) {
                return t(this, e, n, r);
            };
        }),
        qo(
            'Uint8',
            1,
            function(t) {
                return function(e, n, r) {
                    return t(this, e, n, r);
                };
            },
            !0
        ),
        qo('Int16', 2, function(t) {
            return function(e, n, r) {
                return t(this, e, n, r);
            };
        }),
        qo('Uint16', 2, function(t) {
            return function(e, n, r) {
                return t(this, e, n, r);
            };
        }),
        qo('Int32', 4, function(t) {
            return function(e, n, r) {
                return t(this, e, n, r);
            };
        }),
        qo('Uint32', 4, function(t) {
            return function(e, n, r) {
                return t(this, e, n, r);
            };
        }),
        qo('Float32', 4, function(t) {
            return function(e, n, r) {
                return t(this, e, n, r);
            };
        }),
        qo('Float64', 8, function(t) {
            return function(e, n, r) {
                return t(this, e, n, r);
            };
        });
    var Ho = (o.Reflect || {}).apply,
        Jo = Function.apply;
    R(
        R.S +
            R.F *
                !c(function() {
                    Ho(function() {});
                }),
        'Reflect',
        {
            apply: function(t, e, n) {
                var r = P(t),
                    i = h(n);
                return Ho ? Ho(r, e, i) : Jo.call(r, e, i);
            },
        }
    );
    var Xo = (o.Reflect || {}).construct,
        $o = c(function() {
            function t() {}
            return !(Xo(function() {}, [], t) instanceof t);
        }),
        Zo = !c(function() {
            Xo(function() {});
        });
    R(R.S + R.F * ($o || Zo), 'Reflect', {
        construct: function(t, e) {
            P(t), h(e);
            var n = arguments.length < 3 ? t : P(arguments[2]);
            if (Zo && !$o) return Xo(t, e, n);
            if (t == n) {
                switch (e.length) {
                    case 0:
                        return new t();
                    case 1:
                        return new t(e[0]);
                    case 2:
                        return new t(e[0], e[1]);
                    case 3:
                        return new t(e[0], e[1], e[2]);
                    case 4:
                        return new t(e[0], e[1], e[2], e[3]);
                }
                var r = [null];
                return r.push.apply(r, e), new (_e.apply(t, r))();
            }
            var i = n.prototype,
                o = gt(l(i) ? i : Object.prototype),
                u = Function.apply.call(t, o, e);
            return l(u) ? u : o;
        },
    }),
        R(
            R.S +
                R.F *
                    c(function() {
                        Reflect.defineProperty(b.f({}, 1, { value: 1 }), 1, {
                            value: 2,
                        });
                    }),
            'Reflect',
            {
                defineProperty: function(t, e, n) {
                    h(t), (e = y(e, !0)), h(n);
                    try {
                        return b.f(t, e, n), !0;
                    } catch (t) {
                        return !1;
                    }
                },
            }
        );
    var Qo = xt.f;
    R(R.S, 'Reflect', {
        deleteProperty: function(t, e) {
            var n = Qo(h(t), e);
            return !(n && !n.configurable) && delete t[e];
        },
    });
    var tu = function(t) {
        (this._t = h(t)), (this._i = 0);
        var e,
            n = (this._k = []);
        for (e in t) n.push(e);
    };
    Vn(tu, 'Object', function() {
        var t,
            e = this._k;
        do {
            if (this._i >= e.length) return { value: void 0, done: !0 };
        } while (!((t = e[this._i++]) in this._t));
        return { value: t, done: !1 };
    }),
        R(R.S, 'Reflect', {
            enumerate: function(t) {
                return new tu(t);
            },
        }),
        R(R.S, 'Reflect', {
            get: function t(e, n) {
                var r,
                    i,
                    o = arguments.length < 3 ? e : arguments[2];
                return h(e) === o
                    ? e[n]
                    : (r = xt.f(e, n))
                        ? a(r, 'value')
                            ? r.value
                            : void 0 !== r.get ? r.get.call(o) : void 0
                        : l((i = ue(e))) ? t(i, n, o) : void 0;
            },
        }),
        R(R.S, 'Reflect', {
            getOwnPropertyDescriptor: function(t, e) {
                return xt.f(h(t), e);
            },
        }),
        R(R.S, 'Reflect', {
            getPrototypeOf: function(t) {
                return ue(h(t));
            },
        }),
        R(R.S, 'Reflect', {
            has: function(t, e) {
                return e in t;
            },
        });
    var eu = Object.isExtensible;
    R(R.S, 'Reflect', {
        isExtensible: function(t) {
            return h(t), !eu || eu(t);
        },
    });
    var nu = o.Reflect,
        ru =
            (nu && nu.ownKeys) ||
            function(t) {
                var e = mt.f(h(t)),
                    n = at.f;
                return n ? e.concat(n(t)) : e;
            };
    R(R.S, 'Reflect', { ownKeys: ru });
    var iu = Object.preventExtensions;
    R(R.S, 'Reflect', {
        preventExtensions: function(t) {
            h(t);
            try {
                return iu && iu(t), !0;
            } catch (t) {
                return !1;
            }
        },
    }),
        R(R.S, 'Reflect', {
            set: function t(e, n, r) {
                var i,
                    o,
                    u = arguments.length < 4 ? e : arguments[3],
                    c = xt.f(h(e), n);
                if (!c) {
                    if (l((o = ue(e)))) return t(o, n, r, u);
                    c = w(0);
                }
                return a(c, 'value')
                    ? !(
                          !1 === c.writable ||
                          !l(u) ||
                          (((i = xt.f(u, n) || w(0)).value = r),
                          b.f(u, n, i),
                          0)
                      )
                    : void 0 !== c.set && (c.set.call(u, r), !0);
            },
        }),
        de &&
            R(R.S, 'Reflect', {
                setPrototypeOf: function(t, e) {
                    de.check(t, e);
                    try {
                        return de.set(t, e), !0;
                    } catch (t) {
                        return !1;
                    }
                },
            });
    var ou = Q(!0);
    R(R.P, 'Array', {
        includes: function(t) {
            return ou(this, t, arguments.length > 1 ? arguments[1] : void 0);
        },
    }),
        Hr('includes');
    var uu = N('isConcatSpreadable');
    var au = function t(e, n, r, i, o, u, a, c) {
        for (var s, f, h = o, p = 0, d = !!a && O(a, c, 3); p < i; ) {
            if (p in r) {
                if (
                    ((s = d ? d(r[p], p, n) : r[p]),
                    (f = !1),
                    l(s) && (f = void 0 !== (f = s[uu]) ? !!f : st(s)),
                    f && u > 0)
                )
                    h = t(e, n, s, J(s.length), h, u - 1) - 1;
                else {
                    if (h >= 9007199254740991) throw TypeError();
                    e[h] = s;
                }
                h++;
            }
            p++;
        }
        return h;
    };
    R(R.P, 'Array', {
        flatMap: function(t) {
            var e,
                n,
                r = re(this);
            return (
                P(t),
                (e = J(r.length)),
                (n = Fr(r, 0)),
                au(n, r, r, e, 0, 1, t, arguments[1]),
                n
            );
        },
    }),
        Hr('flatMap'),
        R(R.P, 'Array', {
            flatten: function() {
                var t = arguments[0],
                    e = re(this),
                    n = J(e.length),
                    r = Fr(e, 0);
                return au(r, e, e, n, 0, void 0 === t ? 1 : q(t)), r;
            },
        }),
        Hr('flatten');
    var cu = Dn(!0);
    R(R.P, 'String', {
        at: function(t) {
            return cu(this, t);
        },
    });
    var su = function(t, e, n, r) {
            var i = String(V(t)),
                o = i.length,
                u = void 0 === n ? ' ' : String(n),
                a = J(e);
            if (a <= o || '' == u) return i;
            var c = a - o,
                s = on.call(u, Math.ceil(c / u.length));
            return s.length > c && (s = s.slice(0, c)), r ? s + i : i + s;
        },
        fu = o.navigator,
        lu = (fu && fu.userAgent) || '';
    R(R.P + R.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(lu), 'String', {
        padStart: function(t) {
            return su(
                this,
                t,
                arguments.length > 1 ? arguments[1] : void 0,
                !0
            );
        },
    }),
        R(R.P + R.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(lu), 'String', {
            padEnd: function(t) {
                return su(
                    this,
                    t,
                    arguments.length > 1 ? arguments[1] : void 0,
                    !1
                );
            },
        }),
        Te(
            'trimLeft',
            function(t) {
                return function() {
                    return t(this, 1);
                };
            },
            'trimStart'
        ),
        Te(
            'trimRight',
            function(t) {
                return function() {
                    return t(this, 2);
                };
            },
            'trimEnd'
        );
    var hu = RegExp.prototype,
        pu = function(t, e) {
            (this._r = t), (this._s = e);
        };
    Vn(pu, 'RegExp String', function() {
        var t = this._r.exec(this._s);
        return { value: t, done: null === t };
    }),
        R(R.P, 'String', {
            matchAll: function(t) {
                if ((V(this), !$n(t))) throw TypeError(t + ' is not a regexp!');
                var e = String(this),
                    n = 'flags' in hu ? String(t.flags) : ii.call(t),
                    r = new RegExp(t.source, ~n.indexOf('g') ? n : 'g' + n);
                return (r.lastIndex = J(t.lastIndex)), new pu(r, e);
            },
        }),
        C('asyncIterator'),
        C('observable'),
        R(R.S, 'Object', {
            getOwnPropertyDescriptors: function(t) {
                for (
                    var e, n, r = z(t), i = xt.f, o = ru(r), u = {}, a = 0;
                    o.length > a;

                )
                    void 0 !== (n = i(r, (e = o[a++]))) && br(u, e, n);
                return u;
            },
        });
    var du = ct.f,
        vu = function(t) {
            return function(e) {
                for (
                    var n, r = z(e), i = ut(r), o = i.length, u = 0, a = [];
                    o > u;

                )
                    du.call(r, (n = i[u++])) && a.push(t ? [n, r[n]] : r[n]);
                return a;
            };
        },
        gu = vu(!1);
    R(R.S, 'Object', {
        values: function(t) {
            return gu(t);
        },
    });
    var yu = vu(!0);
    R(R.S, 'Object', {
        entries: function(t) {
            return yu(t);
        },
    });
    var mu = !c(function() {
        var t = Math.random();
        __defineSetter__.call(null, t, function() {}), delete o[t];
    });
    s &&
        R(R.P + mu, 'Object', {
            __defineGetter__: function(t, e) {
                b.f(re(this), t, {
                    get: P(e),
                    enumerable: !0,
                    configurable: !0,
                });
            },
        }),
        s &&
            R(R.P + mu, 'Object', {
                __defineSetter__: function(t, e) {
                    b.f(re(this), t, {
                        set: P(e),
                        enumerable: !0,
                        configurable: !0,
                    });
                },
            });
    var bu = xt.f;
    s &&
        R(R.P + mu, 'Object', {
            __lookupGetter__: function(t) {
                var e,
                    n = re(this),
                    r = y(t, !0);
                do {
                    if ((e = bu(n, r))) return e.get;
                } while ((n = ue(n)));
            },
        });
    var wu = xt.f;
    s &&
        R(R.P + mu, 'Object', {
            __lookupSetter__: function(t) {
                var e,
                    n = re(this),
                    r = y(t, !0);
                do {
                    if ((e = wu(n, r))) return e.set;
                } while ((n = ue(n)));
            },
        });
    var Su = function(t, e) {
            var n = [];
            return Ei(t, !1, n.push, n, e), n;
        },
        _u = function(t) {
            return function() {
                if (ye(this) != t) throw TypeError(t + "#toJSON isn't generic");
                return Su(this);
            };
        };
    R(R.P + R.R, 'Map', { toJSON: _u('Map') }),
        R(R.P + R.R, 'Set', { toJSON: _u('Set') });
    var Eu = function(t) {
        R(R.S, t, {
            of: function() {
                for (var t = arguments.length, e = new Array(t); t--; )
                    e[t] = arguments[t];
                return new this(e);
            },
        });
    };
    Eu('Map'), Eu('Set'), Eu('WeakMap'), Eu('WeakSet');
    var xu = function(t) {
        R(R.S, t, {
            from: function(t) {
                var e,
                    n,
                    r,
                    i,
                    o = arguments[1];
                return (
                    P(this),
                    (e = void 0 !== o) && P(o),
                    null == t
                        ? new this()
                        : ((n = []),
                          e
                              ? ((r = 0),
                                (i = O(o, arguments[2], 2)),
                                Ei(t, !1, function(t) {
                                    n.push(i(t, r++));
                                }))
                              : Ei(t, !1, n.push, n),
                          new this(n))
                );
            },
        });
    };
    xu('Map'),
        xu('Set'),
        xu('WeakMap'),
        xu('WeakSet'),
        R(R.G, { global: o }),
        R(R.S, 'System', { global: o }),
        R(R.S, 'Error', {
            isError: function(t) {
                return 'Error' === W(t);
            },
        }),
        R(R.S, 'Math', {
            clamp: function(t, e, n) {
                return Math.min(n, Math.max(e, t));
            },
        }),
        R(R.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });
    var Au = 180 / Math.PI;
    R(R.S, 'Math', {
        degrees: function(t) {
            return t * Au;
        },
    });
    var Pu =
        Math.scale ||
        function(t, e, n, r, i) {
            return 0 === arguments.length ||
                t != t ||
                e != e ||
                n != n ||
                r != r ||
                i != i
                ? NaN
                : t === 1 / 0 || t === -1 / 0
                    ? t
                    : (t - e) * (i - r) / (n - e) + r;
        };
    R(R.S, 'Math', {
        fscale: function(t, e, n, r, i) {
            return Nn(Pu(t, e, n, r, i));
        },
    }),
        R(R.S, 'Math', {
            iaddh: function(t, e, n, r) {
                var i = t >>> 0,
                    o = n >>> 0;
                return (
                    ((e >>> 0) +
                        (r >>> 0) +
                        (((i & o) | ((i | o) & ~((i + o) >>> 0))) >>> 31)) |
                    0
                );
            },
        }),
        R(R.S, 'Math', {
            isubh: function(t, e, n, r) {
                var i = t >>> 0,
                    o = n >>> 0;
                return (
                    ((e >>> 0) -
                        (r >>> 0) -
                        (((~i & o) | (~(i ^ o) & ((i - o) >>> 0))) >>> 31)) |
                    0
                );
            },
        }),
        R(R.S, 'Math', {
            imulh: function(t, e) {
                var n = +t,
                    r = +e,
                    i = 65535 & n,
                    o = 65535 & r,
                    u = n >> 16,
                    a = r >> 16,
                    c = ((u * o) >>> 0) + ((i * o) >>> 16);
                return (
                    u * a + (c >> 16) + ((((i * a) >>> 0) + (65535 & c)) >> 16)
                );
            },
        }),
        R(R.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });
    var Ou = Math.PI / 180;
    R(R.S, 'Math', {
        radians: function(t) {
            return t * Ou;
        },
    }),
        R(R.S, 'Math', { scale: Pu }),
        R(R.S, 'Math', {
            umulh: function(t, e) {
                var n = +t,
                    r = +e,
                    i = 65535 & n,
                    o = 65535 & r,
                    u = n >>> 16,
                    a = r >>> 16,
                    c = ((u * o) >>> 0) + ((i * o) >>> 16);
                return (
                    u * a +
                    (c >>> 16) +
                    ((((i * a) >>> 0) + (65535 & c)) >>> 16)
                );
            },
        }),
        R(R.S, 'Math', {
            signbit: function(t) {
                return (t = +t) != t ? t : 0 == t ? 1 / t == 1 / 0 : t > 0;
            },
        }),
        R(R.P + R.R, 'Promise', {
            finally: function(t) {
                var e = Ai(this, f.Promise || o.Promise),
                    n = 'function' == typeof t;
                return this.then(
                    n
                        ? function(n) {
                              return Hi(e, t()).then(function() {
                                  return n;
                              });
                          }
                        : t,
                    n
                        ? function(n) {
                              return Hi(e, t()).then(function() {
                                  throw n;
                              });
                          }
                        : t
                );
            },
        }),
        R(R.S, 'Promise', {
            try: function(t) {
                var e = Ki.f(this),
                    n = qi(t);
                return (n.e ? e.reject : e.resolve)(n.v), e.promise;
            },
        });
    var ku = M('metadata'),
        Ru = ku.store || (ku.store = new Io()),
        Iu = function(t, e, n) {
            var r = Ru.get(t);
            if (!r) {
                if (!n) return;
                Ru.set(t, (r = new wo()));
            }
            var i = r.get(e);
            if (!i) {
                if (!n) return;
                r.set(e, (i = new wo()));
            }
            return i;
        },
        Fu = {
            store: Ru,
            map: Iu,
            has: function(t, e, n) {
                var r = Iu(e, n, !1);
                return void 0 !== r && r.has(t);
            },
            get: function(t, e, n) {
                var r = Iu(e, n, !1);
                return void 0 === r ? void 0 : r.get(t);
            },
            set: function(t, e, n, r) {
                Iu(n, r, !0).set(t, e);
            },
            keys: function(t, e) {
                var n = Iu(t, e, !1),
                    r = [];
                return (
                    n &&
                        n.forEach(function(t, e) {
                            r.push(e);
                        }),
                    r
                );
            },
            key: function(t) {
                return void 0 === t || 'symbol' == typeof t ? t : String(t);
            },
            exp: function(t) {
                R(R.S, 'Reflect', t);
            },
        },
        Mu = Fu.key,
        Nu = Fu.set;
    Fu.exp({
        defineMetadata: function(t, e, n, r) {
            Nu(t, e, h(n), Mu(r));
        },
    });
    var Tu = Fu.key,
        ju = Fu.map,
        Lu = Fu.store;
    Fu.exp({
        deleteMetadata: function(t, e) {
            var n = arguments.length < 3 ? void 0 : Tu(arguments[2]),
                r = ju(h(e), n, !1);
            if (void 0 === r || !r.delete(t)) return !1;
            if (r.size) return !0;
            var i = Lu.get(e);
            return i.delete(n), !!i.size || Lu.delete(e);
        },
    });
    var Bu = Fu.has,
        Uu = Fu.get,
        Cu = Fu.key,
        Du = function(t, e, n) {
            if (Bu(t, e, n)) return Uu(t, e, n);
            var r = ue(e);
            return null !== r ? Du(t, r, n) : void 0;
        };
    Fu.exp({
        getMetadata: function(t, e) {
            return Du(
                t,
                h(e),
                arguments.length < 3 ? void 0 : Cu(arguments[2])
            );
        },
    });
    var Wu = Fu.keys,
        Gu = Fu.key,
        Vu = function(t, e) {
            var n = Wu(t, e),
                r = ue(t);
            if (null === r) return n;
            var i = Vu(r, e);
            return i.length ? (n.length ? Su(new So(n.concat(i))) : i) : n;
        };
    Fu.exp({
        getMetadataKeys: function(t) {
            return Vu(h(t), arguments.length < 2 ? void 0 : Gu(arguments[1]));
        },
    });
    var zu = Fu.get,
        Yu = Fu.key;
    Fu.exp({
        getOwnMetadata: function(t, e) {
            return zu(
                t,
                h(e),
                arguments.length < 3 ? void 0 : Yu(arguments[2])
            );
        },
    });
    var Ku = Fu.keys,
        qu = Fu.key;
    Fu.exp({
        getOwnMetadataKeys: function(t) {
            return Ku(h(t), arguments.length < 2 ? void 0 : qu(arguments[1]));
        },
    });
    var Hu = Fu.has,
        Ju = Fu.key,
        Xu = function(t, e, n) {
            if (Hu(t, e, n)) return !0;
            var r = ue(e);
            return null !== r && Xu(t, r, n);
        };
    Fu.exp({
        hasMetadata: function(t, e) {
            return Xu(
                t,
                h(e),
                arguments.length < 3 ? void 0 : Ju(arguments[2])
            );
        },
    });
    var $u = Fu.has,
        Zu = Fu.key;
    Fu.exp({
        hasOwnMetadata: function(t, e) {
            return $u(
                t,
                h(e),
                arguments.length < 3 ? void 0 : Zu(arguments[2])
            );
        },
    });
    var Qu = Fu.key,
        ta = Fu.set;
    Fu.exp({
        metadata: function(t, e) {
            return function(n, r) {
                ta(t, e, (void 0 !== r ? h : P)(n), Qu(r));
            };
        },
    });
    var ea = Wi(),
        na = o.process,
        ra = 'process' == W(na);
    R(R.G, {
        asap: function(t) {
            var e = ra && na.domain;
            ea(e ? e.bind(t) : t);
        },
    });
    var ia = Wi(),
        oa = N('observable'),
        ua = Ei.RETURN,
        aa = function(t) {
            return null == t ? void 0 : P(t);
        },
        ca = function(t) {
            var e = t._c;
            e && ((t._c = void 0), e());
        },
        sa = function(t) {
            return void 0 === t._o;
        },
        fa = function(t) {
            sa(t) || ((t._o = void 0), ca(t));
        },
        la = function(t, e) {
            h(t), (this._c = void 0), (this._o = t), (t = new ha(this));
            try {
                var n = e(t),
                    r = n;
                null != n &&
                    ('function' == typeof n.unsubscribe
                        ? (n = function() {
                              r.unsubscribe();
                          })
                        : P(n),
                    (this._c = n));
            } catch (e) {
                return void t.error(e);
            }
            sa(this) && ca(this);
        };
    la.prototype = Ji(
        {},
        {
            unsubscribe: function() {
                fa(this);
            },
        }
    );
    var ha = function(t) {
        this._s = t;
    };
    ha.prototype = Ji(
        {},
        {
            next: function(t) {
                var e = this._s;
                if (!sa(e)) {
                    var n = e._o;
                    try {
                        var r = aa(n.next);
                        if (r) return r.call(n, t);
                    } catch (t) {
                        try {
                            fa(e);
                        } finally {
                            throw t;
                        }
                    }
                }
            },
            error: function(t) {
                var e = this._s;
                if (sa(e)) throw t;
                var n = e._o;
                e._o = void 0;
                try {
                    var r = aa(n.error);
                    if (!r) throw t;
                    t = r.call(n, t);
                } catch (t) {
                    try {
                        ca(e);
                    } finally {
                        throw t;
                    }
                }
                return ca(e), t;
            },
            complete: function(t) {
                var e = this._s;
                if (!sa(e)) {
                    var n = e._o;
                    e._o = void 0;
                    try {
                        var r = aa(n.complete);
                        t = r ? r.call(n, t) : void 0;
                    } catch (t) {
                        try {
                            ca(e);
                        } finally {
                            throw t;
                        }
                    }
                    return ca(e), t;
                }
            },
        }
    );
    var pa = function(t) {
        _i(this, pa, 'Observable', '_f')._f = P(t);
    };
    Ji(pa.prototype, {
        subscribe: function(t) {
            return new la(t, this._f);
        },
        forEach: function(t) {
            var e = this;
            return new (f.Promise || o.Promise)(function(n, r) {
                P(t);
                var i = e.subscribe({
                    next: function(e) {
                        try {
                            return t(e);
                        } catch (t) {
                            r(t), i.unsubscribe();
                        }
                    },
                    error: r,
                    complete: n,
                });
            });
        },
    }),
        Ji(pa, {
            from: function(t) {
                var e = 'function' == typeof this ? this : pa,
                    n = aa(h(t)[oa]);
                if (n) {
                    var r = h(n.call(t));
                    return r.constructor === e
                        ? r
                        : new e(function(t) {
                              return r.subscribe(t);
                          });
                }
                return new e(function(e) {
                    var n = !1;
                    return (
                        ia(function() {
                            if (!n) {
                                try {
                                    if (
                                        Ei(t, !1, function(t) {
                                            if ((e.next(t), n)) return ua;
                                        }) === ua
                                    )
                                        return;
                                } catch (t) {
                                    if (n) throw t;
                                    return void e.error(t);
                                }
                                e.complete();
                            }
                        }),
                        function() {
                            n = !0;
                        }
                    );
                });
            },
            of: function() {
                for (var t = 0, e = arguments.length, n = new Array(e); t < e; )
                    n[t] = arguments[t++];
                return new ('function' == typeof this ? this : pa)(function(t) {
                    var e = !1;
                    return (
                        ia(function() {
                            if (!e) {
                                for (var r = 0; r < n.length; ++r)
                                    if ((t.next(n[r]), e)) return;
                                t.complete();
                            }
                        }),
                        function() {
                            e = !0;
                        }
                    );
                });
            },
        }),
        S(pa.prototype, oa, function() {
            return this;
        }),
        R(R.G, { Observable: pa }),
        ei('Observable');
    var da = [].slice,
        va = /MSIE .\./.test(lu),
        ga = function(t) {
            return function(e, n) {
                var r = arguments.length > 2,
                    i = !!r && da.call(arguments, 2);
                return t(
                    r
                        ? function() {
                              ('function' == typeof e ? e : Function(e)).apply(
                                  this,
                                  i
                              );
                          }
                        : e,
                    n
                );
            };
        };
    R(R.G + R.B + R.F * va, {
        setTimeout: ga(o.setTimeout),
        setInterval: ga(o.setInterval),
    }),
        R(R.G + R.B, { setImmediate: ji.set, clearImmediate: ji.clear });
    for (
        var ya = N('iterator'),
            ma = N('toStringTag'),
            ba = Wn.Array,
            wa = {
                CSSRuleList: !0,
                CSSStyleDeclaration: !1,
                CSSValueList: !1,
                ClientRectList: !1,
                DOMRectList: !1,
                DOMStringList: !1,
                DOMTokenList: !0,
                DataTransferItemList: !1,
                FileList: !1,
                HTMLAllCollection: !1,
                HTMLCollection: !1,
                HTMLFormElement: !1,
                HTMLSelectElement: !1,
                MediaList: !0,
                MimeTypeArray: !1,
                NamedNodeMap: !1,
                NodeList: !0,
                PaintRequestList: !1,
                Plugin: !1,
                PluginArray: !1,
                SVGLengthList: !1,
                SVGNumberList: !1,
                SVGPathSegList: !1,
                SVGPointList: !1,
                SVGStringList: !1,
                SVGTransformList: !1,
                SourceBufferList: !1,
                StyleSheetList: !0,
                TextTrackCueList: !1,
                TextTrackList: !1,
                TouchList: !1,
            },
            Sa = ut(wa),
            _a = 0;
        _a < Sa.length;
        _a++
    ) {
        var Ea,
            xa = Sa[_a],
            Aa = wa[xa],
            Pa = o[xa],
            Oa = Pa && Pa.prototype;
        if (
            Oa &&
            (Oa[ya] || S(Oa, ya, ba),
            Oa[ma] || S(Oa, ma, xa),
            (Wn[xa] = ba),
            Aa)
        )
            for (Ea in ri) Oa[Ea] || A(Oa, Ea, ri[Ea], !0);
    }
    i(function(t) {
        !(function(e) {
            var n,
                r = Object.prototype,
                i = r.hasOwnProperty,
                o = 'function' == typeof Symbol ? Symbol : {},
                u = o.iterator || '@@iterator',
                a = o.asyncIterator || '@@asyncIterator',
                c = o.toStringTag || '@@toStringTag',
                s = e.regeneratorRuntime;
            if (s) t.exports = s;
            else {
                (s = e.regeneratorRuntime = t.exports).wrap = b;
                var f = 'suspendedStart',
                    l = 'suspendedYield',
                    h = 'executing',
                    p = 'completed',
                    d = {},
                    v = {};
                v[u] = function() {
                    return this;
                };
                var g = Object.getPrototypeOf,
                    y = g && g(g(I([])));
                y && y !== r && i.call(y, u) && (v = y);
                var m = (E.prototype = S.prototype = Object.create(v));
                (_.prototype = m.constructor = E),
                    (E.constructor = _),
                    (E[c] = _.displayName = 'GeneratorFunction'),
                    (s.isGeneratorFunction = function(t) {
                        var e = 'function' == typeof t && t.constructor;
                        return (
                            !!e &&
                            (e === _ ||
                                'GeneratorFunction' ===
                                    (e.displayName || e.name))
                        );
                    }),
                    (s.mark = function(t) {
                        return (
                            Object.setPrototypeOf
                                ? Object.setPrototypeOf(t, E)
                                : ((t.__proto__ = E),
                                  c in t || (t[c] = 'GeneratorFunction')),
                            (t.prototype = Object.create(m)),
                            t
                        );
                    }),
                    (s.awrap = function(t) {
                        return { __await: t };
                    }),
                    x(A.prototype),
                    (A.prototype[a] = function() {
                        return this;
                    }),
                    (s.AsyncIterator = A),
                    (s.async = function(t, e, n, r) {
                        var i = new A(b(t, e, n, r));
                        return s.isGeneratorFunction(e)
                            ? i
                            : i.next().then(function(t) {
                                  return t.done ? t.value : i.next();
                              });
                    }),
                    x(m),
                    (m[c] = 'Generator'),
                    (m[u] = function() {
                        return this;
                    }),
                    (m.toString = function() {
                        return '[object Generator]';
                    }),
                    (s.keys = function(t) {
                        var e = [];
                        for (var n in t) e.push(n);
                        return (
                            e.reverse(),
                            function n() {
                                for (; e.length; ) {
                                    var r = e.pop();
                                    if (r in t)
                                        return (n.value = r), (n.done = !1), n;
                                }
                                return (n.done = !0), n;
                            }
                        );
                    }),
                    (s.values = I),
                    (R.prototype = {
                        constructor: R,
                        reset: function(t) {
                            if (
                                ((this.prev = 0),
                                (this.next = 0),
                                (this.sent = this._sent = n),
                                (this.done = !1),
                                (this.delegate = null),
                                (this.method = 'next'),
                                (this.arg = n),
                                this.tryEntries.forEach(k),
                                !t)
                            )
                                for (var e in this)
                                    't' === e.charAt(0) &&
                                        i.call(this, e) &&
                                        !isNaN(+e.slice(1)) &&
                                        (this[e] = n);
                        },
                        stop: function() {
                            this.done = !0;
                            var t = this.tryEntries[0].completion;
                            if ('throw' === t.type) throw t.arg;
                            return this.rval;
                        },
                        dispatchException: function(t) {
                            if (this.done) throw t;
                            var e = this;
                            function r(r, i) {
                                return (
                                    (a.type = 'throw'),
                                    (a.arg = t),
                                    (e.next = r),
                                    i && ((e.method = 'next'), (e.arg = n)),
                                    !!i
                                );
                            }
                            for (
                                var o = this.tryEntries.length - 1;
                                o >= 0;
                                --o
                            ) {
                                var u = this.tryEntries[o],
                                    a = u.completion;
                                if ('root' === u.tryLoc) return r('end');
                                if (u.tryLoc <= this.prev) {
                                    var c = i.call(u, 'catchLoc'),
                                        s = i.call(u, 'finallyLoc');
                                    if (c && s) {
                                        if (this.prev < u.catchLoc)
                                            return r(u.catchLoc, !0);
                                        if (this.prev < u.finallyLoc)
                                            return r(u.finallyLoc);
                                    } else if (c) {
                                        if (this.prev < u.catchLoc)
                                            return r(u.catchLoc, !0);
                                    } else {
                                        if (!s)
                                            throw new Error(
                                                'try statement without catch or finally'
                                            );
                                        if (this.prev < u.finallyLoc)
                                            return r(u.finallyLoc);
                                    }
                                }
                            }
                        },
                        abrupt: function(t, e) {
                            for (
                                var n = this.tryEntries.length - 1;
                                n >= 0;
                                --n
                            ) {
                                var r = this.tryEntries[n];
                                if (
                                    r.tryLoc <= this.prev &&
                                    i.call(r, 'finallyLoc') &&
                                    this.prev < r.finallyLoc
                                ) {
                                    var o = r;
                                    break;
                                }
                            }
                            o &&
                                ('break' === t || 'continue' === t) &&
                                o.tryLoc <= e &&
                                e <= o.finallyLoc &&
                                (o = null);
                            var u = o ? o.completion : {};
                            return (
                                (u.type = t),
                                (u.arg = e),
                                o
                                    ? ((this.method = 'next'),
                                      (this.next = o.finallyLoc),
                                      d)
                                    : this.complete(u)
                            );
                        },
                        complete: function(t, e) {
                            if ('throw' === t.type) throw t.arg;
                            return (
                                'break' === t.type || 'continue' === t.type
                                    ? (this.next = t.arg)
                                    : 'return' === t.type
                                        ? ((this.rval = this.arg = t.arg),
                                          (this.method = 'return'),
                                          (this.next = 'end'))
                                        : 'normal' === t.type &&
                                          e &&
                                          (this.next = e),
                                d
                            );
                        },
                        finish: function(t) {
                            for (
                                var e = this.tryEntries.length - 1;
                                e >= 0;
                                --e
                            ) {
                                var n = this.tryEntries[e];
                                if (n.finallyLoc === t)
                                    return (
                                        this.complete(n.completion, n.afterLoc),
                                        k(n),
                                        d
                                    );
                            }
                        },
                        catch: function(t) {
                            for (
                                var e = this.tryEntries.length - 1;
                                e >= 0;
                                --e
                            ) {
                                var n = this.tryEntries[e];
                                if (n.tryLoc === t) {
                                    var r = n.completion;
                                    if ('throw' === r.type) {
                                        var i = r.arg;
                                        k(n);
                                    }
                                    return i;
                                }
                            }
                            throw new Error('illegal catch attempt');
                        },
                        delegateYield: function(t, e, r) {
                            return (
                                (this.delegate = {
                                    iterator: I(t),
                                    resultName: e,
                                    nextLoc: r,
                                }),
                                'next' === this.method && (this.arg = n),
                                d
                            );
                        },
                    });
            }
            function b(t, e, n, r) {
                var i = e && e.prototype instanceof S ? e : S,
                    o = Object.create(i.prototype),
                    u = new R(r || []);
                return (
                    (o._invoke = (function(t, e, n) {
                        var r = f;
                        return function(i, o) {
                            if (r === h)
                                throw new Error('Generator is already running');
                            if (r === p) {
                                if ('throw' === i) throw o;
                                return F();
                            }
                            for (n.method = i, n.arg = o; ; ) {
                                var u = n.delegate;
                                if (u) {
                                    var a = P(u, n);
                                    if (a) {
                                        if (a === d) continue;
                                        return a;
                                    }
                                }
                                if ('next' === n.method)
                                    n.sent = n._sent = n.arg;
                                else if ('throw' === n.method) {
                                    if (r === f) throw ((r = p), n.arg);
                                    n.dispatchException(n.arg);
                                } else
                                    'return' === n.method &&
                                        n.abrupt('return', n.arg);
                                r = h;
                                var c = w(t, e, n);
                                if ('normal' === c.type) {
                                    if (((r = n.done ? p : l), c.arg === d))
                                        continue;
                                    return { value: c.arg, done: n.done };
                                }
                                'throw' === c.type &&
                                    ((r = p),
                                    (n.method = 'throw'),
                                    (n.arg = c.arg));
                            }
                        };
                    })(t, n, u)),
                    o
                );
            }
            function w(t, e, n) {
                try {
                    return { type: 'normal', arg: t.call(e, n) };
                } catch (t) {
                    return { type: 'throw', arg: t };
                }
            }
            function S() {}
            function _() {}
            function E() {}
            function x(t) {
                ['next', 'throw', 'return'].forEach(function(e) {
                    t[e] = function(t) {
                        return this._invoke(e, t);
                    };
                });
            }
            function A(t) {
                function n(e, r, o, u) {
                    var a = w(t[e], t, r);
                    if ('throw' !== a.type) {
                        var c = a.arg,
                            s = c.value;
                        return s && 'object' == typeof s && i.call(s, '__await')
                            ? Promise.resolve(s.__await).then(
                                  function(t) {
                                      n('next', t, o, u);
                                  },
                                  function(t) {
                                      n('throw', t, o, u);
                                  }
                              )
                            : Promise.resolve(s).then(function(t) {
                                  (c.value = t), o(c);
                              }, u);
                    }
                    u(a.arg);
                }
                var r;
                'object' == typeof e.process &&
                    e.process.domain &&
                    (n = e.process.domain.bind(n)),
                    (this._invoke = function(t, e) {
                        function i() {
                            return new Promise(function(r, i) {
                                n(t, e, r, i);
                            });
                        }
                        return (r = r ? r.then(i, i) : i());
                    });
            }
            function P(t, e) {
                var r = t.iterator[e.method];
                if (r === n) {
                    if (((e.delegate = null), 'throw' === e.method)) {
                        if (
                            t.iterator.return &&
                            ((e.method = 'return'),
                            (e.arg = n),
                            P(t, e),
                            'throw' === e.method)
                        )
                            return d;
                        (e.method = 'throw'),
                            (e.arg = new TypeError(
                                "The iterator does not provide a 'throw' method"
                            ));
                    }
                    return d;
                }
                var i = w(r, t.iterator, e.arg);
                if ('throw' === i.type)
                    return (
                        (e.method = 'throw'),
                        (e.arg = i.arg),
                        (e.delegate = null),
                        d
                    );
                var o = i.arg;
                return o
                    ? o.done
                        ? ((e[t.resultName] = o.value),
                          (e.next = t.nextLoc),
                          'return' !== e.method &&
                              ((e.method = 'next'), (e.arg = n)),
                          (e.delegate = null),
                          d)
                        : o
                    : ((e.method = 'throw'),
                      (e.arg = new TypeError(
                          'iterator result is not an object'
                      )),
                      (e.delegate = null),
                      d);
            }
            function O(t) {
                var e = { tryLoc: t[0] };
                1 in t && (e.catchLoc = t[1]),
                    2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
                    this.tryEntries.push(e);
            }
            function k(t) {
                var e = t.completion || {};
                (e.type = 'normal'), delete e.arg, (t.completion = e);
            }
            function R(t) {
                (this.tryEntries = [{ tryLoc: 'root' }]),
                    t.forEach(O, this),
                    this.reset(!0);
            }
            function I(t) {
                if (t) {
                    var e = t[u];
                    if (e) return e.call(t);
                    if ('function' == typeof t.next) return t;
                    if (!isNaN(t.length)) {
                        var r = -1,
                            o = function e() {
                                for (; ++r < t.length; )
                                    if (i.call(t, r))
                                        return (
                                            (e.value = t[r]), (e.done = !1), e
                                        );
                                return (e.value = n), (e.done = !0), e;
                            };
                        return (o.next = o);
                    }
                }
                return { next: F };
            }
            function F() {
                return { value: n, done: !0 };
            }
        })(
            'object' == typeof r
                ? r
                : 'object' == typeof window
                    ? window
                    : 'object' == typeof self ? self : r
        );
    });
    var ka,
        Ra,
        Ia,
        Fa = ((ka = /[\\^$*+?.()|[\]{}]/g),
        (Ia =
            (Ra = '\\$&') === Object(Ra)
                ? function(t) {
                      return Ra[t];
                  }
                : Ra),
        function(t) {
            return String(t).replace(ka, Ia);
        });
    R(R.S, 'RegExp', {
        escape: function(t) {
            return Fa(t);
        },
    });
    f.RegExp.escape;
    if (r._babelPolyfill)
        throw new Error('only one instance of babel-polyfill is allowed');
    r._babelPolyfill = !0;
    var Ma = 'defineProperty';
    function Na(t, e, n) {
        t[e] || Object[Ma](t, e, { writable: !0, configurable: !0, value: n });
    }
    function Ta(t) {
        return new Promise(function(e, n) {
            function r(o, u) {
                try {
                    var a = t[u ? 'throw' : 'next'](o);
                } catch (t) {
                    return void n(t);
                }
                a.done ? e(a.value) : Promise.resolve(a.value).then(r, i);
            }
            function i(t) {
                r(t, 1);
            }
            r();
        });
    }
    Na(String.prototype, 'padLeft', ''.padStart),
        Na(String.prototype, 'padRight', ''.padEnd),
        'pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill'
            .split(',')
            .forEach(function(t) {
                [][t] && Na(Array, t, Function.call.bind([][t]));
            });
    var ja = function(t, e) {
            if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function');
        },
        La = (function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    (r.enumerable = r.enumerable || !1),
                        (r.configurable = !0),
                        'value' in r && (r.writable = !0),
                        Object.defineProperty(t, r.key, r);
                }
            }
            return function(e, n, r) {
                return n && t(e.prototype, n), r && t(e, r), e;
            };
        })(),
        Ba = (function() {
            function t(e) {
                ja(this, t), (this.config = e);
            }
            return (
                La(t, [
                    {
                        key: 'signIn',
                        value: function() {
                            var t =
                                arguments.length > 0 && void 0 !== arguments[0]
                                    ? arguments[0]
                                    : {};
                            return Ta(
                                regeneratorRuntime
                                    .mark(function e() {
                                        var n, r, i;
                                        return regeneratorRuntime.wrap(
                                            function(e) {
                                                for (;;)
                                                    switch ((e.prev = e.next)) {
                                                        case 0:
                                                            return (
                                                                (n = new FormData()).append(
                                                                    'email',
                                                                    t.email
                                                                ),
                                                                n.append(
                                                                    'password',
                                                                    t.password
                                                                ),
                                                                n.append(
                                                                    'merchant_uuid',
                                                                    t.merchantUuid
                                                                ),
                                                                n.append(
                                                                    'referrer',
                                                                    t.referrer
                                                                ),
                                                                (e.next = 7),
                                                                fetch(
                                                                    this.config
                                                                        .API
                                                                        .signIn,
                                                                    {
                                                                        method:
                                                                            'POST',
                                                                        body: n,
                                                                    }
                                                                )
                                                            );
                                                        case 7:
                                                            return (
                                                                (r = e.sent),
                                                                (e.next = 10),
                                                                r.json()
                                                            );
                                                        case 10:
                                                            return (
                                                                (i = e.sent)
                                                                    .access_token &&
                                                                    localStorage.setItem(
                                                                        this
                                                                            .config
                                                                            .INPLAYER_TOKEN_NAME,
                                                                        i.access_token
                                                                    ),
                                                                e.abrupt(
                                                                    'return',
                                                                    i
                                                                )
                                                            );
                                                        case 13:
                                                        case 'end':
                                                            return e.stop();
                                                    }
                                            },
                                            e,
                                            this
                                        );
                                    })
                                    .call(this)
                            );
                        },
                    },
                    {
                        key: 'signOut',
                        value: function() {
                            return Ta(
                                regeneratorRuntime
                                    .mark(function t() {
                                        var e, n;
                                        return regeneratorRuntime.wrap(
                                            function(t) {
                                                for (;;)
                                                    switch ((t.prev = t.next)) {
                                                        case 0:
                                                            return (
                                                                (e = localStorage.getItem(
                                                                    this.config
                                                                        .INPLAYER_TOKEN_NAME
                                                                )),
                                                                (t.next = 3),
                                                                fetch(
                                                                    this.config
                                                                        .API
                                                                        .signOut,
                                                                    {
                                                                        headers: {
                                                                            Authorization:
                                                                                'Bearer ' +
                                                                                e,
                                                                        },
                                                                    }
                                                                )
                                                            );
                                                        case 3:
                                                            return (
                                                                (n = t.sent),
                                                                (t.next = 6),
                                                                n.json()
                                                            );
                                                        case 6:
                                                            return (
                                                                t.sent
                                                                    .explain &&
                                                                    localStorage.removeItem(
                                                                        this
                                                                            .config
                                                                            .INPLAYER_TOKEN_NAME
                                                                    ),
                                                                t.abrupt(
                                                                    'return',
                                                                    !0
                                                                )
                                                            );
                                                        case 9:
                                                        case 'end':
                                                            return t.stop();
                                                    }
                                            },
                                            t,
                                            this
                                        );
                                    })
                                    .call(this)
                            );
                        },
                    },
                    {
                        key: 'signUp',
                        value: function() {
                            var t =
                                arguments.length > 0 && void 0 !== arguments[0]
                                    ? arguments[0]
                                    : {};
                            return Ta(
                                regeneratorRuntime
                                    .mark(function e() {
                                        var n, r, i;
                                        return regeneratorRuntime.wrap(
                                            function(e) {
                                                for (;;)
                                                    switch ((e.prev = e.next)) {
                                                        case 0:
                                                            return (
                                                                (n = new FormData()).append(
                                                                    'full_name',
                                                                    t.fullName
                                                                ),
                                                                n.append(
                                                                    'email',
                                                                    t.email
                                                                ),
                                                                n.append(
                                                                    'password',
                                                                    t.password
                                                                ),
                                                                n.append(
                                                                    'password_confirmation',
                                                                    t.passwordConfirmation
                                                                ),
                                                                n.append(
                                                                    'merchant_uuid',
                                                                    t.merchantUuid
                                                                ),
                                                                n.append(
                                                                    'type',
                                                                    t.type
                                                                ),
                                                                n.append(
                                                                    'referrer',
                                                                    t.referrer
                                                                ),
                                                                n.append(
                                                                    'metadata',
                                                                    t.metadata
                                                                ),
                                                                (e.next = 11),
                                                                fetch(
                                                                    this.config
                                                                        .API
                                                                        .signUp,
                                                                    {
                                                                        method:
                                                                            'POST',
                                                                        body: n,
                                                                    }
                                                                )
                                                            );
                                                        case 11:
                                                            return (
                                                                (r = e.sent),
                                                                (e.next = 14),
                                                                r.json()
                                                            );
                                                        case 14:
                                                            return (
                                                                (i = e.sent),
                                                                e.abrupt(
                                                                    'return',
                                                                    i
                                                                )
                                                            );
                                                        case 16:
                                                        case 'end':
                                                            return e.stop();
                                                    }
                                            },
                                            e,
                                            this
                                        );
                                    })
                                    .call(this)
                            );
                        },
                    },
                    {
                        key: 'isSignedIn',
                        value: function() {
                            return (
                                void 0 !==
                                localStorage.getItem(
                                    this.config.INPLAYER_TOKEN_NAME
                                )
                            );
                        },
                    },
                    {
                        key: 'token',
                        value: function() {
                            return localStorage.getItem(
                                this.config.INPLAYER_TOKEN_NAME
                            );
                        },
                    },
                    {
                        key: 'setTokenInCookie',
                        value: function() {
                            var t =
                                arguments.length > 0 && void 0 !== arguments[0]
                                    ? arguments[0]
                                    : '';
                            localStorage.setItem(
                                this.config.INPLAYER_TOKEN_NAME,
                                t
                            );
                        },
                    },
                    {
                        key: 'requestNewPassword',
                        value: function() {
                            var t =
                                arguments.length > 0 && void 0 !== arguments[0]
                                    ? arguments[0]
                                    : {};
                            return Ta(
                                regeneratorRuntime
                                    .mark(function e() {
                                        var n, r, i;
                                        return regeneratorRuntime.wrap(
                                            function(e) {
                                                for (;;)
                                                    switch ((e.prev = e.next)) {
                                                        case 0:
                                                            return (
                                                                (n = new FormData()).append(
                                                                    'email',
                                                                    t.email
                                                                ),
                                                                n.append(
                                                                    'merchant_uuid',
                                                                    t.merchantUuid
                                                                ),
                                                                (e.next = 5),
                                                                fetch(
                                                                    this.config
                                                                        .API
                                                                        .requestNewPassword,
                                                                    {
                                                                        method:
                                                                            'POST',
                                                                        body: n,
                                                                    }
                                                                )
                                                            );
                                                        case 5:
                                                            return (
                                                                (r = e.sent),
                                                                (e.next = 8),
                                                                r.json()
                                                            );
                                                        case 8:
                                                            return (
                                                                (i = e.sent),
                                                                e.abrupt(
                                                                    'return',
                                                                    i
                                                                )
                                                            );
                                                        case 10:
                                                        case 'end':
                                                            return e.stop();
                                                    }
                                            },
                                            e,
                                            this
                                        );
                                    })
                                    .call(this)
                            );
                        },
                    },
                    {
                        key: 'setNewPassword',
                        value: function() {
                            var t =
                                    arguments.length > 0 &&
                                    void 0 !== arguments[0]
                                        ? arguments[0]
                                        : {},
                                e =
                                    arguments.length > 1 &&
                                    void 0 !== arguments[1]
                                        ? arguments[1]
                                        : '';
                            return Ta(
                                regeneratorRuntime
                                    .mark(function n() {
                                        var r, i;
                                        return regeneratorRuntime.wrap(
                                            function(n) {
                                                for (;;)
                                                    switch ((n.prev = n.next)) {
                                                        case 0:
                                                            return (
                                                                (r =
                                                                    'password=' +
                                                                    t.password +
                                                                    '&password_confirmation=' +
                                                                    t.passwordConfirmation),
                                                                (n.next = 3),
                                                                fetch(
                                                                    this.config.API.setNewPassword(
                                                                        e
                                                                    ),
                                                                    {
                                                                        method:
                                                                            'PUT',
                                                                        body: r,
                                                                        headers: {
                                                                            'Content-Type':
                                                                                'x-www-form-urlencoded',
                                                                        },
                                                                    }
                                                                )
                                                            );
                                                        case 3:
                                                            return (
                                                                (i = n.sent),
                                                                n.abrupt(
                                                                    'return',
                                                                    i
                                                                )
                                                            );
                                                        case 5:
                                                        case 'end':
                                                            return n.stop();
                                                    }
                                            },
                                            n,
                                            this
                                        );
                                    })
                                    .call(this)
                            );
                        },
                    },
                    {
                        key: 'getAccountInfo',
                        value: function() {
                            var t =
                                arguments.length > 0 && void 0 !== arguments[0]
                                    ? arguments[0]
                                    : '';
                            return Ta(
                                regeneratorRuntime
                                    .mark(function e() {
                                        var n, r;
                                        return regeneratorRuntime.wrap(
                                            function(e) {
                                                for (;;)
                                                    switch ((e.prev = e.next)) {
                                                        case 0:
                                                            return (
                                                                (e.next = 2),
                                                                fetch(
                                                                    this.config
                                                                        .API
                                                                        .getAccountInfo,
                                                                    {
                                                                        method:
                                                                            'GET',
                                                                        headers: {
                                                                            Authorization:
                                                                                'Bearer ' +
                                                                                t,
                                                                        },
                                                                    }
                                                                )
                                                            );
                                                        case 2:
                                                            return (
                                                                (n = e.sent),
                                                                (e.next = 5),
                                                                n.json()
                                                            );
                                                        case 5:
                                                            if (!(r = e.sent)) {
                                                                e.next = 8;
                                                                break;
                                                            }
                                                            return e.abrupt(
                                                                'return',
                                                                r
                                                            );
                                                        case 8:
                                                        case 'end':
                                                            return e.stop();
                                                    }
                                            },
                                            e,
                                            this
                                        );
                                    })
                                    .call(this)
                            );
                        },
                    },
                    {
                        key: 'getSocialLoginUrls',
                        value: function(t) {
                            return Ta(
                                regeneratorRuntime
                                    .mark(function e() {
                                        var n, r;
                                        return regeneratorRuntime.wrap(
                                            function(e) {
                                                for (;;)
                                                    switch ((e.prev = e.next)) {
                                                        case 0:
                                                            return (
                                                                (e.next = 2),
                                                                fetch(
                                                                    this.config.API.social(
                                                                        t
                                                                    ),
                                                                    {
                                                                        method:
                                                                            'GET',
                                                                    }
                                                                )
                                                            );
                                                        case 2:
                                                            return (
                                                                (n = e.sent),
                                                                (e.next = 5),
                                                                n.json()
                                                            );
                                                        case 5:
                                                            return (
                                                                (r = e.sent),
                                                                e.abrupt(
                                                                    'return',
                                                                    r
                                                                )
                                                            );
                                                        case 7:
                                                        case 'end':
                                                            return e.stop();
                                                    }
                                            },
                                            e,
                                            this
                                        );
                                    })
                                    .call(this)
                            );
                        },
                    },
                    {
                        key: 'updateAccount',
                        value: function() {
                            var t =
                                    arguments.length > 0 &&
                                    void 0 !== arguments[0]
                                        ? arguments[0]
                                        : {},
                                e =
                                    arguments.length > 1 &&
                                    void 0 !== arguments[1]
                                        ? arguments[1]
                                        : '';
                            return Ta(
                                regeneratorRuntime
                                    .mark(function n() {
                                        var r, i, o;
                                        return regeneratorRuntime.wrap(
                                            function(n) {
                                                for (;;)
                                                    switch ((n.prev = n.next)) {
                                                        case 0:
                                                            return (
                                                                (r = ''),
                                                                Object.keys(
                                                                    t
                                                                ).forEach(
                                                                    function(
                                                                        e
                                                                    ) {
                                                                        'fullName' ===
                                                                        e
                                                                            ? (r +=
                                                                                  (r
                                                                                      ? '&'
                                                                                      : '') +
                                                                                  'full_name' +
                                                                                  '=' +
                                                                                  t[
                                                                                      e
                                                                                  ])
                                                                            : 'metadata' ===
                                                                                  e &&
                                                                              Object.keys(
                                                                                  t[
                                                                                      e
                                                                                  ]
                                                                              ).forEach(
                                                                                  function(
                                                                                      n
                                                                                  ) {
                                                                                      r +=
                                                                                          (r
                                                                                              ? '&'
                                                                                              : '') +
                                                                                          'metadata[' +
                                                                                          n +
                                                                                          ']=' +
                                                                                          t[
                                                                                              e
                                                                                          ][
                                                                                              n
                                                                                          ];
                                                                                  }
                                                                              );
                                                                    }
                                                                ),
                                                                (n.next = 4),
                                                                fetch(
                                                                    this.config
                                                                        .API
                                                                        .updateAccount,
                                                                    {
                                                                        method:
                                                                            'PUT',
                                                                        body: r,
                                                                        headers: {
                                                                            Authorization:
                                                                                'Bearer ' +
                                                                                e,
                                                                            'Content-Type':
                                                                                'x-www-form-urlencoded',
                                                                        },
                                                                    }
                                                                )
                                                            );
                                                        case 4:
                                                            return (
                                                                (i = n.sent),
                                                                (n.next = 7),
                                                                i.json()
                                                            );
                                                        case 7:
                                                            return (
                                                                (o = n.sent),
                                                                n.abrupt(
                                                                    'return',
                                                                    o
                                                                )
                                                            );
                                                        case 9:
                                                        case 'end':
                                                            return n.stop();
                                                    }
                                            },
                                            n,
                                            this
                                        );
                                    })
                                    .call(this)
                            );
                        },
                    },
                    {
                        key: 'changePassword',
                        value: function() {
                            var t =
                                    arguments.length > 0 &&
                                    void 0 !== arguments[0]
                                        ? arguments[0]
                                        : {},
                                e =
                                    arguments.length > 1 &&
                                    void 0 !== arguments[1]
                                        ? arguments[1]
                                        : '';
                            return Ta(
                                regeneratorRuntime
                                    .mark(function n() {
                                        var r, i, o;
                                        return regeneratorRuntime.wrap(
                                            function(n) {
                                                for (;;)
                                                    switch ((n.prev = n.next)) {
                                                        case 0:
                                                            return (
                                                                (r = new FormData()).append(
                                                                    'old_password',
                                                                    t.oldPassword
                                                                ),
                                                                r.append(
                                                                    'password',
                                                                    t.password
                                                                ),
                                                                r.append(
                                                                    'password_confirmation',
                                                                    t.passwordConfirmation
                                                                ),
                                                                (n.next = 6),
                                                                fetch(
                                                                    this.config
                                                                        .API
                                                                        .changePassword,
                                                                    {
                                                                        method:
                                                                            'POST',
                                                                        body: r,
                                                                        headers: {
                                                                            Authorization:
                                                                                'Bearer ' +
                                                                                e,
                                                                        },
                                                                    }
                                                                )
                                                            );
                                                        case 6:
                                                            return (
                                                                (i = n.sent),
                                                                (n.next = 9),
                                                                i.json()
                                                            );
                                                        case 9:
                                                            return (
                                                                (o = n.sent),
                                                                n.abrupt(
                                                                    'return',
                                                                    o
                                                                )
                                                            );
                                                        case 11:
                                                        case 'end':
                                                            return n.stop();
                                                    }
                                            },
                                            n,
                                            this
                                        );
                                    })
                                    .call(this)
                            );
                        },
                    },
                    {
                        key: 'getRegisterFields',
                        value: function() {
                            var t =
                                arguments.length > 0 && void 0 !== arguments[0]
                                    ? arguments[0]
                                    : '';
                            return Ta(
                                regeneratorRuntime
                                    .mark(function e() {
                                        var n, r;
                                        return regeneratorRuntime.wrap(
                                            function(e) {
                                                for (;;)
                                                    switch ((e.prev = e.next)) {
                                                        case 0:
                                                            return (
                                                                (e.next = 2),
                                                                fetch(
                                                                    this.config.API.getRegisterFields(
                                                                        t
                                                                    )
                                                                )
                                                            );
                                                        case 2:
                                                            return (
                                                                (n = e.sent),
                                                                (e.next = 5),
                                                                n.json()
                                                            );
                                                        case 5:
                                                            return (
                                                                (r = e.sent),
                                                                e.abrupt(
                                                                    'return',
                                                                    r
                                                                )
                                                            );
                                                        case 7:
                                                        case 'end':
                                                            return e.stop();
                                                    }
                                            },
                                            e,
                                            this
                                        );
                                    })
                                    .call(this)
                            );
                        },
                    },
                ]),
                t
            );
        })(),
        Ua = (function() {
            function t(e) {
                ja(this, t), (this.config = e);
            }
            return (
                La(t, [
                    {
                        key: 'checkAccessForAsset',
                        value: function(t, e) {
                            return Ta(
                                regeneratorRuntime
                                    .mark(function n() {
                                        var r, i;
                                        return regeneratorRuntime.wrap(
                                            function(n) {
                                                for (;;)
                                                    switch ((n.prev = n.next)) {
                                                        case 0:
                                                            return (
                                                                (n.next = 2),
                                                                fetch(
                                                                    this.config.API.checkAccess(
                                                                        e
                                                                    ),
                                                                    {
                                                                        headers: {
                                                                            Authorization:
                                                                                'Bearer ' +
                                                                                t,
                                                                        },
                                                                    }
                                                                )
                                                            );
                                                        case 2:
                                                            return (
                                                                (r = n.sent),
                                                                (n.next = 5),
                                                                r.json()
                                                            );
                                                        case 5:
                                                            return (
                                                                (i = n.sent),
                                                                n.abrupt(
                                                                    'return',
                                                                    i
                                                                )
                                                            );
                                                        case 7:
                                                        case 'end':
                                                            return n.stop();
                                                    }
                                            },
                                            n,
                                            this
                                        );
                                    })
                                    .call(this)
                            );
                        },
                    },
                    {
                        key: 'findAsset',
                        value: function(t, e) {
                            return Ta(
                                regeneratorRuntime
                                    .mark(function n() {
                                        var r, i;
                                        return regeneratorRuntime.wrap(
                                            function(n) {
                                                for (;;)
                                                    switch ((n.prev = n.next)) {
                                                        case 0:
                                                            return (
                                                                (n.next = 2),
                                                                fetch(
                                                                    this.config.API.findAsset(
                                                                        t,
                                                                        e
                                                                    ),
                                                                    {
                                                                        method:
                                                                            'GET',
                                                                    }
                                                                )
                                                            );
                                                        case 2:
                                                            return (
                                                                (r = n.sent),
                                                                (n.next = 5),
                                                                r.json()
                                                            );
                                                        case 5:
                                                            return (
                                                                (i = n.sent),
                                                                n.abrupt(
                                                                    'return',
                                                                    i
                                                                )
                                                            );
                                                        case 7:
                                                        case 'end':
                                                            return n.stop();
                                                    }
                                            },
                                            n,
                                            this
                                        );
                                    })
                                    .call(this)
                            );
                        },
                    },
                    {
                        key: 'findExternalAsset',
                        value: function(t, e) {
                            return Ta(
                                regeneratorRuntime
                                    .mark(function n() {
                                        var r, i;
                                        return regeneratorRuntime.wrap(
                                            function(n) {
                                                for (;;)
                                                    switch ((n.prev = n.next)) {
                                                        case 0:
                                                            return (
                                                                (n.next = 2),
                                                                fetch(
                                                                    this.config.API.findExternalAsset(
                                                                        t,
                                                                        e
                                                                    ),
                                                                    {
                                                                        method:
                                                                            'GET',
                                                                    }
                                                                )
                                                            );
                                                        case 2:
                                                            return (
                                                                (r = n.sent),
                                                                (n.next = 5),
                                                                r.json()
                                                            );
                                                        case 5:
                                                            return (
                                                                (i = n.sent),
                                                                n.abrupt(
                                                                    'return',
                                                                    i
                                                                )
                                                            );
                                                        case 7:
                                                        case 'end':
                                                            return n.stop();
                                                    }
                                            },
                                            n,
                                            this
                                        );
                                    })
                                    .call(this)
                            );
                        },
                    },
                    {
                        key: 'findPackage',
                        value: function(t) {
                            return Ta(
                                regeneratorRuntime
                                    .mark(function e() {
                                        var n, r;
                                        return regeneratorRuntime.wrap(
                                            function(e) {
                                                for (;;)
                                                    switch ((e.prev = e.next)) {
                                                        case 0:
                                                            return (
                                                                (e.next = 2),
                                                                fetch(
                                                                    this.config.API.findPackage(
                                                                        t
                                                                    ),
                                                                    {
                                                                        method:
                                                                            'GET',
                                                                    }
                                                                )
                                                            );
                                                        case 2:
                                                            return (
                                                                (n = e.sent),
                                                                (e.next = 5),
                                                                n.json()
                                                            );
                                                        case 5:
                                                            return (
                                                                (r = e.sent),
                                                                e.abrupt(
                                                                    'return',
                                                                    r
                                                                )
                                                            );
                                                        case 7:
                                                        case 'end':
                                                            return e.stop();
                                                    }
                                            },
                                            e,
                                            this
                                        );
                                    })
                                    .call(this)
                            );
                        },
                    },
                    {
                        key: 'getAssetAccessFees',
                        value: function(t) {
                            return Ta(
                                regeneratorRuntime
                                    .mark(function e() {
                                        var n, r;
                                        return regeneratorRuntime.wrap(
                                            function(e) {
                                                for (;;)
                                                    switch ((e.prev = e.next)) {
                                                        case 0:
                                                            return (
                                                                (e.next = 2),
                                                                fetch(
                                                                    this.config.API.findAccessFees(
                                                                        t
                                                                    ),
                                                                    {
                                                                        method:
                                                                            'GET',
                                                                    }
                                                                )
                                                            );
                                                        case 2:
                                                            return (
                                                                (n = e.sent),
                                                                (e.next = 5),
                                                                n.json()
                                                            );
                                                        case 5:
                                                            return (
                                                                (r = e.sent),
                                                                e.abrupt(
                                                                    'return',
                                                                    r
                                                                )
                                                            );
                                                        case 7:
                                                        case 'end':
                                                            return e.stop();
                                                    }
                                            },
                                            e,
                                            this
                                        );
                                    })
                                    .call(this)
                            );
                        },
                    },
                    {
                        key: 'getFreemiumAsset',
                        value: function(t, e) {
                            return Ta(
                                regeneratorRuntime
                                    .mark(function n() {
                                        var r, i, o;
                                        return regeneratorRuntime.wrap(
                                            function(n) {
                                                for (;;)
                                                    switch ((n.prev = n.next)) {
                                                        case 0:
                                                            return (
                                                                (r = new FormData()).append(
                                                                    'access_fee',
                                                                    e
                                                                ),
                                                                (n.next = 4),
                                                                fetch(
                                                                    this.config
                                                                        .API
                                                                        .freemium,
                                                                    {
                                                                        method:
                                                                            'POST',
                                                                        headers: {
                                                                            Authorization:
                                                                                'Bearer ' +
                                                                                t,
                                                                        },
                                                                        body: r,
                                                                    }
                                                                )
                                                            );
                                                        case 4:
                                                            return (
                                                                (i = n.sent),
                                                                (n.next = 7),
                                                                i.json()
                                                            );
                                                        case 7:
                                                            return (
                                                                (o = n.sent),
                                                                n.abrupt(
                                                                    'return',
                                                                    o
                                                                )
                                                            );
                                                        case 9:
                                                        case 'end':
                                                            return n.stop();
                                                    }
                                            },
                                            n,
                                            this
                                        );
                                    })
                                    .call(this)
                            );
                        },
                    },
                ]),
                t
            );
        })(),
        Ca = (function() {
            function t(e) {
                ja(this, t), (this.config = e);
            }
            return (
                La(t, [
                    {
                        key: 'getPaymentMethods',
                        value: function(t) {
                            return Ta(
                                regeneratorRuntime
                                    .mark(function e() {
                                        var n, r;
                                        return regeneratorRuntime.wrap(
                                            function(e) {
                                                for (;;)
                                                    switch ((e.prev = e.next)) {
                                                        case 0:
                                                            return (
                                                                (e.next = 2),
                                                                fetch(
                                                                    this.config
                                                                        .API
                                                                        .getPaymentMethods,
                                                                    {
                                                                        headers: {
                                                                            Authorization:
                                                                                'Bearer ' +
                                                                                t,
                                                                        },
                                                                    }
                                                                )
                                                            );
                                                        case 2:
                                                            return (
                                                                (n = e.sent),
                                                                (e.next = 5),
                                                                n.json()
                                                            );
                                                        case 5:
                                                            return (
                                                                (r = e.sent),
                                                                e.abrupt(
                                                                    'return',
                                                                    r
                                                                )
                                                            );
                                                        case 7:
                                                        case 'end':
                                                            return e.stop();
                                                    }
                                            },
                                            e,
                                            this
                                        );
                                    })
                                    .call(this)
                            );
                        },
                    },
                    {
                        key: 'getPaymentTools',
                        value: function(t, e) {
                            return Ta(
                                regeneratorRuntime
                                    .mark(function n() {
                                        var r, i;
                                        return regeneratorRuntime.wrap(
                                            function(n) {
                                                for (;;)
                                                    switch ((n.prev = n.next)) {
                                                        case 0:
                                                            return (
                                                                (n.next = 2),
                                                                fetch(
                                                                    this.config.API.getPaymentTools(
                                                                        e
                                                                    ),
                                                                    {
                                                                        headers: {
                                                                            Authorization:
                                                                                'Bearer ' +
                                                                                t,
                                                                        },
                                                                    }
                                                                )
                                                            );
                                                        case 2:
                                                            return (
                                                                (r = n.sent),
                                                                (n.next = 5),
                                                                r.json()
                                                            );
                                                        case 5:
                                                            return (
                                                                (i = n.sent),
                                                                n.abrupt(
                                                                    'return',
                                                                    i
                                                                )
                                                            );
                                                        case 7:
                                                        case 'end':
                                                            return n.stop();
                                                    }
                                            },
                                            n,
                                            this
                                        );
                                    })
                                    .call(this)
                            );
                        },
                    },
                    {
                        key: 'payForAsset',
                        value: function() {
                            var t =
                                    arguments.length > 0 &&
                                    void 0 !== arguments[0]
                                        ? arguments[0]
                                        : '',
                                e =
                                    arguments.length > 1 &&
                                    void 0 !== arguments[1]
                                        ? arguments[1]
                                        : {};
                            return Ta(
                                regeneratorRuntime
                                    .mark(function n() {
                                        var r, i, o;
                                        return regeneratorRuntime.wrap(
                                            function(n) {
                                                for (;;)
                                                    switch ((n.prev = n.next)) {
                                                        case 0:
                                                            return (
                                                                (r = new FormData()).append(
                                                                    'number',
                                                                    e.number
                                                                ),
                                                                r.append(
                                                                    'card_name',
                                                                    e.cardName
                                                                ),
                                                                r.append(
                                                                    'exp_month',
                                                                    e.expMonth
                                                                ),
                                                                r.append(
                                                                    'exp_year',
                                                                    e.expYear
                                                                ),
                                                                r.append(
                                                                    'cvv',
                                                                    e.cvv
                                                                ),
                                                                r.append(
                                                                    'access_fee',
                                                                    e.accessFee
                                                                ),
                                                                r.append(
                                                                    'payment_method',
                                                                    e.paymentMethod
                                                                ),
                                                                r.append(
                                                                    'referrer',
                                                                    e.referrer
                                                                ),
                                                                e.voucherCode &&
                                                                    r.append(
                                                                        'voucher_code',
                                                                        e.voucherCode
                                                                    ),
                                                                (n.next = 12),
                                                                fetch(
                                                                    this.config
                                                                        .API
                                                                        .payForAsset,
                                                                    {
                                                                        method:
                                                                            'POST',
                                                                        headers: {
                                                                            Authorization:
                                                                                'Bearer ' +
                                                                                t,
                                                                        },
                                                                        body: r,
                                                                    }
                                                                )
                                                            );
                                                        case 12:
                                                            return (
                                                                (i = n.sent),
                                                                (n.next = 15),
                                                                i.json()
                                                            );
                                                        case 15:
                                                            return (
                                                                (o = n.sent),
                                                                n.abrupt(
                                                                    'return',
                                                                    o
                                                                )
                                                            );
                                                        case 17:
                                                        case 'end':
                                                            return n.stop();
                                                    }
                                            },
                                            n,
                                            this
                                        );
                                    })
                                    .call(this)
                            );
                        },
                    },
                    {
                        key: 'getPayPalParams',
                        value: function() {
                            var t =
                                    arguments.length > 0 &&
                                    void 0 !== arguments[0]
                                        ? arguments[0]
                                        : '',
                                e =
                                    arguments.length > 1 &&
                                    void 0 !== arguments[1]
                                        ? arguments[1]
                                        : {};
                            return Ta(
                                regeneratorRuntime
                                    .mark(function n() {
                                        var r, i, o;
                                        return regeneratorRuntime.wrap(
                                            function(n) {
                                                for (;;)
                                                    switch ((n.prev = n.next)) {
                                                        case 0:
                                                            return (
                                                                (r = new FormData()).append(
                                                                    'origin',
                                                                    e.origin
                                                                ),
                                                                r.append(
                                                                    'access_fee',
                                                                    e.accessFeeId
                                                                ),
                                                                r.append(
                                                                    'payment_method',
                                                                    e.paymentMethod
                                                                ),
                                                                r.append(
                                                                    'voucher_code',
                                                                    e.voucherCode
                                                                ),
                                                                (n.next = 7),
                                                                fetch(
                                                                    this.config
                                                                        .API
                                                                        .externalPayments,
                                                                    {
                                                                        method:
                                                                            'POST',
                                                                        headers: {
                                                                            Authorization:
                                                                                'Bearer ' +
                                                                                t,
                                                                        },
                                                                        body: r,
                                                                    }
                                                                )
                                                            );
                                                        case 7:
                                                            return (
                                                                (i = n.sent),
                                                                (n.next = 10),
                                                                i.json()
                                                            );
                                                        case 10:
                                                            return (
                                                                (o = n.sent),
                                                                n.abrupt(
                                                                    'return',
                                                                    o
                                                                )
                                                            );
                                                        case 12:
                                                        case 'end':
                                                            return n.stop();
                                                    }
                                            },
                                            n,
                                            this
                                        );
                                    })
                                    .call(this)
                            );
                        },
                    },
                ]),
                t
            );
        })(),
        Da = (function() {
            function t(e) {
                ja(this, t), (this.config = e);
            }
            return (
                La(t, [
                    {
                        key: 'getSubscriptions',
                        value: function(t) {
                            return Ta(
                                regeneratorRuntime
                                    .mark(function e() {
                                        var n, r;
                                        return regeneratorRuntime.wrap(
                                            function(e) {
                                                for (;;)
                                                    switch ((e.prev = e.next)) {
                                                        case 0:
                                                            return (
                                                                (e.next = 2),
                                                                fetch(
                                                                    this.config
                                                                        .API
                                                                        .getSubscriptions,
                                                                    {
                                                                        method:
                                                                            'GET',
                                                                        headers: {
                                                                            Authorization:
                                                                                'Bearer ' +
                                                                                t,
                                                                        },
                                                                    }
                                                                )
                                                            );
                                                        case 2:
                                                            return (
                                                                (n = e.sent),
                                                                (r = n.json()),
                                                                e.abrupt(
                                                                    'return',
                                                                    r
                                                                )
                                                            );
                                                        case 5:
                                                        case 'end':
                                                            return e.stop();
                                                    }
                                            },
                                            e,
                                            this
                                        );
                                    })
                                    .call(this)
                            );
                        },
                    },
                    {
                        key: 'cancelSubscription',
                        value: function(t, e) {
                            return Ta(
                                regeneratorRuntime.mark(function n() {
                                    var r, i;
                                    return regeneratorRuntime.wrap(
                                        function(n) {
                                            for (;;)
                                                switch ((n.prev = n.next)) {
                                                    case 0:
                                                        return (
                                                            (n.next = 2),
                                                            fetch(t, {
                                                                method: 'GET',
                                                                headers: {
                                                                    Authorization:
                                                                        'Bearer ' +
                                                                        e,
                                                                },
                                                            })
                                                        );
                                                    case 2:
                                                        return (
                                                            (r = n.sent),
                                                            (i = r.json()),
                                                            n.abrupt(
                                                                'return',
                                                                i
                                                            )
                                                        );
                                                    case 5:
                                                    case 'end':
                                                        return n.stop();
                                                }
                                        },
                                        n,
                                        this
                                    );
                                })()
                            );
                        },
                    },
                    {
                        key: 'assetSubscribe',
                        value: function() {
                            var t =
                                    arguments.length > 0 &&
                                    void 0 !== arguments[0]
                                        ? arguments[0]
                                        : '',
                                e =
                                    arguments.length > 1 &&
                                    void 0 !== arguments[1]
                                        ? arguments[1]
                                        : {};
                            return Ta(
                                regeneratorRuntime
                                    .mark(function n() {
                                        var r, i, o;
                                        return regeneratorRuntime.wrap(
                                            function(n) {
                                                for (;;)
                                                    switch ((n.prev = n.next)) {
                                                        case 0:
                                                            return (
                                                                (r = new FormData()).append(
                                                                    'number',
                                                                    e.number
                                                                ),
                                                                r.append(
                                                                    'card_name',
                                                                    e.cardName
                                                                ),
                                                                r.append(
                                                                    'exp_month',
                                                                    e.expMonth
                                                                ),
                                                                r.append(
                                                                    'exp_year',
                                                                    e.expYear
                                                                ),
                                                                r.append(
                                                                    'cvv',
                                                                    e.cvv
                                                                ),
                                                                r.append(
                                                                    'access_fee',
                                                                    e.accessFee
                                                                ),
                                                                r.append(
                                                                    'payment_method',
                                                                    e.paymentMethod
                                                                ),
                                                                r.append(
                                                                    'referrer',
                                                                    e.referrer
                                                                ),
                                                                e.voucherCode &&
                                                                    r.append(
                                                                        'voucher_code',
                                                                        e.voucherCode
                                                                    ),
                                                                (n.next = 12),
                                                                fetch(
                                                                    this.config
                                                                        .API
                                                                        .subscribe,
                                                                    {
                                                                        method:
                                                                            'POST',
                                                                        headers: {
                                                                            Authorization:
                                                                                'Bearer ' +
                                                                                t,
                                                                        },
                                                                        body: r,
                                                                    }
                                                                )
                                                            );
                                                        case 12:
                                                            return (
                                                                (i = n.sent),
                                                                (n.next = 15),
                                                                i.json()
                                                            );
                                                        case 15:
                                                            return (
                                                                (o = n.sent),
                                                                n.abrupt(
                                                                    'return',
                                                                    o
                                                                )
                                                            );
                                                        case 17:
                                                        case 'end':
                                                            return n.stop();
                                                    }
                                            },
                                            n,
                                            this
                                        );
                                    })
                                    .call(this)
                            );
                        },
                    },
                ]),
                t
            );
        })(),
        Wa = (function() {
            function t(e) {
                ja(this, t), (this.config = e);
            }
            return (
                La(t, [
                    {
                        key: 'getDlcLinks',
                        value: function(t, e) {
                            return Ta(
                                regeneratorRuntime
                                    .mark(function n() {
                                        var r, i;
                                        return regeneratorRuntime.wrap(
                                            function(n) {
                                                for (;;)
                                                    switch ((n.prev = n.next)) {
                                                        case 0:
                                                            return (
                                                                (n.next = 2),
                                                                fetch(
                                                                    this.config.API.getDlcLinks(
                                                                        e
                                                                    ),
                                                                    {
                                                                        headers: {
                                                                            Authorization:
                                                                                'Bearer ' +
                                                                                t,
                                                                        },
                                                                    }
                                                                )
                                                            );
                                                        case 2:
                                                            return (
                                                                (r = n.sent),
                                                                (n.next = 5),
                                                                r.json()
                                                            );
                                                        case 5:
                                                            return (
                                                                (i = n.sent),
                                                                n.abrupt(
                                                                    'return',
                                                                    i
                                                                )
                                                            );
                                                        case 7:
                                                        case 'end':
                                                            return n.stop();
                                                    }
                                            },
                                            n,
                                            this
                                        );
                                    })
                                    .call(this)
                            );
                        },
                    },
                    {
                        key: 'getDiscount',
                        value: function() {
                            var t =
                                    arguments.length > 0 &&
                                    void 0 !== arguments[0]
                                        ? arguments[0]
                                        : '',
                                e =
                                    arguments.length > 1 &&
                                    void 0 !== arguments[1]
                                        ? arguments[1]
                                        : {};
                            return Ta(
                                regeneratorRuntime
                                    .mark(function n() {
                                        var r, i, o;
                                        return regeneratorRuntime.wrap(
                                            function(n) {
                                                for (;;)
                                                    switch ((n.prev = n.next)) {
                                                        case 0:
                                                            return (
                                                                (r = new FormData()).append(
                                                                    'access_fee_id',
                                                                    e.accessFeeId
                                                                ),
                                                                r.append(
                                                                    'voucher_code',
                                                                    e.voucherCode
                                                                ),
                                                                r.append(
                                                                    'merchant_id',
                                                                    e.merchantUuid
                                                                ),
                                                                (n.next = 6),
                                                                fetch(
                                                                    this.config
                                                                        .API
                                                                        .getDiscount,
                                                                    {
                                                                        method:
                                                                            'POST',
                                                                        headers: {
                                                                            Authorization:
                                                                                'Bearer ' +
                                                                                t,
                                                                        },
                                                                        body: r,
                                                                    }
                                                                )
                                                            );
                                                        case 6:
                                                            return (
                                                                (i = n.sent),
                                                                (n.next = 9),
                                                                i.json()
                                                            );
                                                        case 9:
                                                            return (
                                                                (o = n.sent),
                                                                n.abrupt(
                                                                    'return',
                                                                    o
                                                                )
                                                            );
                                                        case 11:
                                                        case 'end':
                                                            return n.stop();
                                                    }
                                            },
                                            n,
                                            this
                                        );
                                    })
                                    .call(this)
                            );
                        },
                    },
                    {
                        key: 'getBranding',
                        value: function(t) {
                            return Ta(
                                regeneratorRuntime
                                    .mark(function e() {
                                        var n, r;
                                        return regeneratorRuntime.wrap(
                                            function(e) {
                                                for (;;)
                                                    switch ((e.prev = e.next)) {
                                                        case 0:
                                                            return (
                                                                (e.next = 2),
                                                                fetch(
                                                                    this.config.API.getBranding(
                                                                        t
                                                                    ),
                                                                    {
                                                                        method:
                                                                            'GET',
                                                                    }
                                                                )
                                                            );
                                                        case 2:
                                                            return (
                                                                (n = e.sent),
                                                                (e.next = 5),
                                                                n.json()
                                                            );
                                                        case 5:
                                                            return (
                                                                (r = e.sent),
                                                                e.abrupt(
                                                                    'return',
                                                                    r
                                                                )
                                                            );
                                                        case 7:
                                                        case 'end':
                                                            return e.stop();
                                                    }
                                            },
                                            e,
                                            this
                                        );
                                    })
                                    .call(this)
                            );
                        },
                    },
                    {
                        key: 'downloadProtectedFile',
                        value: function(t, e, n) {
                            return Ta(
                                regeneratorRuntime
                                    .mark(function r() {
                                        var i, o;
                                        return regeneratorRuntime.wrap(
                                            function(r) {
                                                for (;;)
                                                    switch ((r.prev = r.next)) {
                                                        case 0:
                                                            return (
                                                                (r.next = 2),
                                                                fetch(
                                                                    this.config.API.downloadFile(
                                                                        e,
                                                                        n
                                                                    ),
                                                                    {
                                                                        headers: {
                                                                            Authorization:
                                                                                'Bearer ' +
                                                                                t,
                                                                        },
                                                                    }
                                                                )
                                                            );
                                                        case 2:
                                                            return (
                                                                (i = r.sent),
                                                                (r.next = 5),
                                                                i.json()
                                                            );
                                                        case 5:
                                                            return (
                                                                (o = r.sent),
                                                                r.abrupt(
                                                                    'return',
                                                                    o
                                                                )
                                                            );
                                                        case 7:
                                                        case 'end':
                                                            return r.stop();
                                                    }
                                            },
                                            r,
                                            this
                                        );
                                    })
                                    .call(this)
                            );
                        },
                    },
                ]),
                t
            );
        })(),
        Ga = i(function(t, e) {
            (function() {
                var t,
                    n,
                    r,
                    i,
                    o = {}.hasOwnProperty,
                    u = [].slice;
                (t = { LF: '\n', NULL: '\0' }),
                    (r = (function() {
                        var e;
                        function n(t, e, n) {
                            (this.command = t),
                                (this.headers = null != e ? e : {}),
                                (this.body = null != n ? n : '');
                        }
                        return (
                            (n.prototype.toString = function() {
                                var e, r, i, u, a;
                                for (r in ((e = [this.command]),
                                (i = !1 === this.headers['content-length']) &&
                                    delete this.headers['content-length'],
                                (a = this.headers)))
                                    o.call(a, r) &&
                                        ((u = a[r]), e.push(r + ':' + u));
                                return (
                                    this.body &&
                                        !i &&
                                        e.push(
                                            'content-length:' +
                                                n.sizeOfUTF8(this.body)
                                        ),
                                    e.push(t.LF + this.body),
                                    e.join(t.LF)
                                );
                            }),
                            (n.sizeOfUTF8 = function(t) {
                                return t
                                    ? encodeURI(t).match(/%..|./g).length
                                    : 0;
                            }),
                            (e = function(e) {
                                var r,
                                    i,
                                    o,
                                    u,
                                    a,
                                    c,
                                    s,
                                    f,
                                    l,
                                    h,
                                    p,
                                    d,
                                    v,
                                    g,
                                    y,
                                    m,
                                    b;
                                for (
                                    u = e.search(RegExp('' + t.LF + t.LF)),
                                        o = (a = e
                                            .substring(0, u)
                                            .split(t.LF)).shift(),
                                        c = {},
                                        d = function(t) {
                                            return t.replace(/^\s+|\s+$/g, '');
                                        },
                                        v = 0,
                                        y = (m = a.reverse()).length;
                                    v < y;
                                    v++
                                )
                                    (f = (h = m[v]).indexOf(':')),
                                        (c[d(h.substring(0, f))] = d(
                                            h.substring(f + 1)
                                        ));
                                if (
                                    ((r = ''), (p = u + 2), c['content-length'])
                                )
                                    (l = parseInt(c['content-length'])),
                                        (r = ('' + e).substring(p, p + l));
                                else
                                    for (
                                        i = null, s = g = p, b = e.length;
                                        (p <= b ? g < b : g > b) &&
                                        (i = e.charAt(s)) !== t.NULL;
                                        s = p <= b ? ++g : --g
                                    )
                                        r += i;
                                return new n(o, c, r);
                            }),
                            (n.unmarshall = function(n) {
                                var r;
                                return (function() {
                                    var i, o, u, a;
                                    for (
                                        a = [],
                                            i = 0,
                                            o = (u = n.split(
                                                RegExp('' + t.NULL + t.LF + '*')
                                            )).length;
                                        i < o;
                                        i++
                                    )
                                        (null != (r = u[i])
                                            ? r.length
                                            : void 0) > 0 && a.push(e(r));
                                    return a;
                                })();
                            }),
                            (n.marshall = function(e, r, i) {
                                return new n(e, r, i).toString() + t.NULL;
                            }),
                            n
                        );
                    })()),
                    (n = (function() {
                        var e;
                        function n(t) {
                            (this.ws = t),
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
                            (n.prototype.debug = function(t) {
                                var e;
                                return 'undefined' != typeof window &&
                                    null !== window &&
                                    null != (e = window.console)
                                    ? e.log(t)
                                    : void 0;
                            }),
                            (e = function() {
                                return Date.now
                                    ? Date.now()
                                    : new Date().valueOf;
                            }),
                            (n.prototype._transmit = function(t, e, n) {
                                var i;
                                for (
                                    i = r.marshall(t, e, n),
                                        'function' == typeof this.debug &&
                                            this.debug('>>> ' + i);
                                    ;

                                ) {
                                    if (
                                        !(i.length > this.maxWebSocketFrameSize)
                                    )
                                        return this.ws.send(i);
                                    this.ws.send(
                                        i.substring(
                                            0,
                                            this.maxWebSocketFrameSize
                                        )
                                    ),
                                        (i = i.substring(
                                            this.maxWebSocketFrameSize
                                        )),
                                        'function' == typeof this.debug &&
                                            this.debug(
                                                'remaining = ' + i.length
                                            );
                                }
                            }),
                            (n.prototype._setupHeartbeat = function(n) {
                                var r, o, u, a, c, s, f;
                                if (
                                    (c = n.version) === i.VERSIONS.V1_1 ||
                                    c === i.VERSIONS.V1_2
                                )
                                    return (
                                        (o = (s = (function() {
                                            var t, e, r, i;
                                            for (
                                                i = [],
                                                    t = 0,
                                                    e = (r = n[
                                                        'heart-beat'
                                                    ].split(',')).length;
                                                t < e;
                                                t++
                                            )
                                                (a = r[t]), i.push(parseInt(a));
                                            return i;
                                        })())[0]),
                                        (r = s[1]),
                                        0 !== this.heartbeat.outgoing &&
                                            0 !== r &&
                                            ((u = Math.max(
                                                this.heartbeat.outgoing,
                                                r
                                            )),
                                            'function' == typeof this.debug &&
                                                this.debug(
                                                    'send PING every ' +
                                                        u +
                                                        'ms'
                                                ),
                                            (this.pinger = i.setInterval(
                                                u,
                                                ((f = this),
                                                function() {
                                                    return (
                                                        f.ws.send(t.LF),
                                                        'function' ==
                                                        typeof f.debug
                                                            ? f.debug(
                                                                  '>>> PING'
                                                              )
                                                            : void 0
                                                    );
                                                })
                                            ))),
                                        0 !== this.heartbeat.incoming && 0 !== o
                                            ? ((u = Math.max(
                                                  this.heartbeat.incoming,
                                                  o
                                              )),
                                              'function' == typeof this.debug &&
                                                  this.debug(
                                                      'check PONG every ' +
                                                          u +
                                                          'ms'
                                                  ),
                                              (this.ponger = i.setInterval(
                                                  u,
                                                  (function(t) {
                                                      return function() {
                                                          var n;
                                                          if (
                                                              (n =
                                                                  e() -
                                                                  t.serverActivity) >
                                                              2 * u
                                                          )
                                                              return (
                                                                  'function' ==
                                                                      typeof t.debug &&
                                                                      t.debug(
                                                                          'did not receive server activity for the last ' +
                                                                              n +
                                                                              'ms'
                                                                      ),
                                                                  t.ws.close()
                                                              );
                                                      };
                                                  })(this)
                                              )))
                                            : void 0
                                    );
                            }),
                            (n.prototype._parseConnect = function() {
                                var t, e, n, r;
                                switch (((r = {}),
                                (t =
                                    1 <= arguments.length
                                        ? u.call(arguments, 0)
                                        : []).length)) {
                                    case 2:
                                        (r = t[0]), (e = t[1]);
                                        break;
                                    case 3:
                                        t[1] instanceof Function
                                            ? ((r = t[0]),
                                              (e = t[1]),
                                              (n = t[2]))
                                            : ((r.login = t[0]),
                                              (r.passcode = t[1]),
                                              (e = t[2]));
                                        break;
                                    case 4:
                                        (r.login = t[0]),
                                            (r.passcode = t[1]),
                                            (e = t[2]),
                                            (n = t[3]);
                                        break;
                                    default:
                                        (r.login = t[0]),
                                            (r.passcode = t[1]),
                                            (e = t[2]),
                                            (n = t[3]),
                                            (r.host = t[4]);
                                }
                                return [r, e, n];
                            }),
                            (n.prototype.connect = function() {
                                var n, o, a, c, s;
                                return (
                                    (n =
                                        1 <= arguments.length
                                            ? u.call(arguments, 0)
                                            : []),
                                    (c = this._parseConnect.apply(this, n)),
                                    (a = c[0]),
                                    (this.connectCallback = c[1]),
                                    (o = c[2]),
                                    'function' == typeof this.debug &&
                                        this.debug('Opening Web Socket...'),
                                    (this.ws.onmessage = ((s = this),
                                    function(n) {
                                        var i, u, a, c, f, l, h, p, d, v, g, y;
                                        if (
                                            ((c =
                                                'undefined' !=
                                                    typeof ArrayBuffer &&
                                                n.data instanceof ArrayBuffer
                                                    ? ((i = new Uint8Array(
                                                          n.data
                                                      )),
                                                      'function' ==
                                                          typeof s.debug &&
                                                          s.debug(
                                                              '--- got data length: ' +
                                                                  i.length
                                                          ),
                                                      (function() {
                                                          var t, e, n;
                                                          for (
                                                              n = [],
                                                                  t = 0,
                                                                  e = i.length;
                                                              t < e;
                                                              t++
                                                          )
                                                              (u = i[t]),
                                                                  n.push(
                                                                      String.fromCharCode(
                                                                          u
                                                                      )
                                                                  );
                                                          return n;
                                                      })().join(''))
                                                    : n.data),
                                            (s.serverActivity = e()),
                                            c !== t.LF)
                                        ) {
                                            for (
                                                'function' == typeof s.debug &&
                                                    s.debug('<<< ' + c),
                                                    y = [],
                                                    d = 0,
                                                    v = (g = r.unmarshall(c))
                                                        .length;
                                                d < v;
                                                d++
                                            )
                                                switch ((f = g[d]).command) {
                                                    case 'CONNECTED':
                                                        'function' ==
                                                            typeof s.debug &&
                                                            s.debug(
                                                                'connected to server ' +
                                                                    f.headers
                                                                        .server
                                                            ),
                                                            (s.connected = !0),
                                                            s._setupHeartbeat(
                                                                f.headers
                                                            ),
                                                            y.push(
                                                                'function' ==
                                                                typeof s.connectCallback
                                                                    ? s.connectCallback(
                                                                          f
                                                                      )
                                                                    : void 0
                                                            );
                                                        break;
                                                    case 'MESSAGE':
                                                        (p =
                                                            f.headers
                                                                .subscription),
                                                            (h =
                                                                s.subscriptions[
                                                                    p
                                                                ] ||
                                                                s.onreceive)
                                                                ? ((a = s),
                                                                  (l =
                                                                      f.headers[
                                                                          'message-id'
                                                                      ]),
                                                                  (f.ack = function(
                                                                      t
                                                                  ) {
                                                                      return (
                                                                          null ==
                                                                              t &&
                                                                              (t = {}),
                                                                          a.ack(
                                                                              l,
                                                                              p,
                                                                              t
                                                                          )
                                                                      );
                                                                  }),
                                                                  (f.nack = function(
                                                                      t
                                                                  ) {
                                                                      return (
                                                                          null ==
                                                                              t &&
                                                                              (t = {}),
                                                                          a.nack(
                                                                              l,
                                                                              p,
                                                                              t
                                                                          )
                                                                      );
                                                                  }),
                                                                  y.push(h(f)))
                                                                : y.push(
                                                                      'function' ==
                                                                      typeof s.debug
                                                                          ? s.debug(
                                                                                'Unhandled received MESSAGE: ' +
                                                                                    f
                                                                            )
                                                                          : void 0
                                                                  );
                                                        break;
                                                    case 'RECEIPT':
                                                        y.push(
                                                            'function' ==
                                                            typeof s.onreceipt
                                                                ? s.onreceipt(f)
                                                                : void 0
                                                        );
                                                        break;
                                                    case 'ERROR':
                                                        y.push(
                                                            'function' ==
                                                            typeof o
                                                                ? o(f)
                                                                : void 0
                                                        );
                                                        break;
                                                    default:
                                                        y.push(
                                                            'function' ==
                                                            typeof s.debug
                                                                ? s.debug(
                                                                      'Unhandled frame: ' +
                                                                          f
                                                                  )
                                                                : void 0
                                                        );
                                                }
                                            return y;
                                        }
                                        'function' == typeof s.debug &&
                                            s.debug('<<< PONG');
                                    })),
                                    (this.ws.onclose = (function(t) {
                                        return function() {
                                            var e;
                                            return (
                                                (e =
                                                    'Whoops! Lost connection to ' +
                                                    t.ws.url),
                                                'function' == typeof t.debug &&
                                                    t.debug(e),
                                                t._cleanUp(),
                                                'function' == typeof o
                                                    ? o(e)
                                                    : void 0
                                            );
                                        };
                                    })(this)),
                                    (this.ws.onopen = (function(t) {
                                        return function() {
                                            return (
                                                'function' == typeof t.debug &&
                                                    t.debug(
                                                        'Web Socket Opened...'
                                                    ),
                                                (a[
                                                    'accept-version'
                                                ] = i.VERSIONS.supportedVersions()),
                                                (a['heart-beat'] = [
                                                    t.heartbeat.outgoing,
                                                    t.heartbeat.incoming,
                                                ].join(',')),
                                                t._transmit('CONNECT', a)
                                            );
                                        };
                                    })(this))
                                );
                            }),
                            (n.prototype.disconnect = function(t, e) {
                                return (
                                    null == e && (e = {}),
                                    this._transmit('DISCONNECT', e),
                                    (this.ws.onclose = null),
                                    this.ws.close(),
                                    this._cleanUp(),
                                    'function' == typeof t ? t() : void 0
                                );
                            }),
                            (n.prototype._cleanUp = function() {
                                if (
                                    ((this.connected = !1),
                                    this.pinger && i.clearInterval(this.pinger),
                                    this.ponger)
                                )
                                    return i.clearInterval(this.ponger);
                            }),
                            (n.prototype.send = function(t, e, n) {
                                return (
                                    null == e && (e = {}),
                                    null == n && (n = ''),
                                    (e.destination = t),
                                    this._transmit('SEND', e, n)
                                );
                            }),
                            (n.prototype.subscribe = function(t, e, n) {
                                var r;
                                return (
                                    null == n && (n = {}),
                                    n.id || (n.id = 'sub-' + this.counter++),
                                    (n.destination = t),
                                    (this.subscriptions[n.id] = e),
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
                            (n.prototype.unsubscribe = function(t) {
                                return (
                                    delete this.subscriptions[t],
                                    this._transmit('UNSUBSCRIBE', { id: t })
                                );
                            }),
                            (n.prototype.begin = function(t) {
                                var e, n;
                                return (
                                    (n = t || 'tx-' + this.counter++),
                                    this._transmit('BEGIN', { transaction: n }),
                                    (e = this),
                                    {
                                        id: n,
                                        commit: function() {
                                            return e.commit(n);
                                        },
                                        abort: function() {
                                            return e.abort(n);
                                        },
                                    }
                                );
                            }),
                            (n.prototype.commit = function(t) {
                                return this._transmit('COMMIT', {
                                    transaction: t,
                                });
                            }),
                            (n.prototype.abort = function(t) {
                                return this._transmit('ABORT', {
                                    transaction: t,
                                });
                            }),
                            (n.prototype.ack = function(t, e, n) {
                                return (
                                    null == n && (n = {}),
                                    (n['message-id'] = t),
                                    (n.subscription = e),
                                    this._transmit('ACK', n)
                                );
                            }),
                            (n.prototype.nack = function(t, e, n) {
                                return (
                                    null == n && (n = {}),
                                    (n['message-id'] = t),
                                    (n.subscription = e),
                                    this._transmit('NACK', n)
                                );
                            }),
                            n
                        );
                    })()),
                    (i = {
                        VERSIONS: {
                            V1_0: '1.0',
                            V1_1: '1.1',
                            V1_2: '1.2',
                            supportedVersions: function() {
                                return '1.1,1.0';
                            },
                        },
                        client: function(t, e) {
                            var r;
                            return (
                                null == e && (e = ['v10.stomp', 'v11.stomp']),
                                (r = new (i.WebSocketClass || WebSocket)(t, e)),
                                new n(r)
                            );
                        },
                        over: function(t) {
                            return new n(t);
                        },
                        Frame: r,
                    }),
                    null !== e && (e.Stomp = i),
                    'undefined' != typeof window && null !== window
                        ? ((i.setInterval = function(t, e) {
                              return window.setInterval(e, t);
                          }),
                          (i.clearInterval = function(t) {
                              return window.clearInterval(t);
                          }),
                          (window.Stomp = i))
                        : e || (self.Stomp = i);
            }.call(r));
        }),
        Va = (Ga.Stomp,
        i(function(t, i) {
            (function() {
                var t, r, o, u, a, c;
                (r = e),
                    ((t = Ga).Stomp.setInterval = function(t, e) {
                        return setInterval(e, t);
                    }),
                    (t.Stomp.clearInterval = function(t) {
                        return clearInterval(t);
                    }),
                    (a = function(t, e) {
                        var n, i;
                        return (
                            (n = null),
                            (i = {
                                url: 'tcp:// ' + e + ':' + t,
                                send: function(t) {
                                    return n.write(t);
                                },
                                close: function() {
                                    return n.end();
                                },
                            }),
                            (n = r.connect(t, e, function(t) {
                                return i.onopen();
                            })).on('error', function(t) {
                                return 'function' == typeof i.onclose
                                    ? i.onclose(t)
                                    : void 0;
                            }),
                            n.on('close', function(t) {
                                return 'function' == typeof i.onclose
                                    ? i.onclose(t)
                                    : void 0;
                            }),
                            n.on('data', function(t) {
                                var e;
                                return (
                                    (e = { data: t.toString() }), i.onmessage(e)
                                );
                            }),
                            i
                        );
                    }),
                    (c = function(t) {
                        var e, r, i, o;
                        return (
                            (e = n.client),
                            (r = null),
                            (o = {
                                url: t,
                                send: function(t) {
                                    return r.sendUTF(t);
                                },
                                close: function() {
                                    return r.close();
                                },
                            }),
                            (i = new e()).on('connect', function(t) {
                                return (
                                    (r = t),
                                    o.onopen(),
                                    r.on('error', function(t) {
                                        return 'function' == typeof o.onclose
                                            ? o.onclose(t)
                                            : void 0;
                                    }),
                                    r.on('close', function() {
                                        return 'function' == typeof o.onclose
                                            ? o.onclose()
                                            : void 0;
                                    }),
                                    r.on('message', function(t) {
                                        var e;
                                        if ('utf8' === t.type)
                                            return (
                                                (e = { data: t.utf8Data }),
                                                o.onmessage(e)
                                            );
                                    })
                                );
                            }),
                            i.connect(t),
                            o
                        );
                    }),
                    (o = function(e, n) {
                        var r;
                        return (r = a(n, e)), t.Stomp.over(r);
                    }),
                    (u = function(e) {
                        var n;
                        return (n = c(e)), t.Stomp.over(n);
                    }),
                    (i.overTCP = o),
                    (i.overWS = u);
            }.call(r));
        })),
        za = (Va.net, Va.websocket, Va.overTCP, Va.overWS, Ga.Stomp),
        Ya = Va.overTCP,
        Ka = Va.overWS;
    (za.overTCP = Ya), (za.overWS = Ka);
    var qa = window && (window.WebSocket || window.MozWebSocket),
        Ha = (function() {
            function t(e) {
                ja(this, t), (this.subscription = null), (this.config = e);
            }
            return (
                La(t, [
                    {
                        key: 'subscribe',
                        value: function(t, e) {
                            if (!t && '' !== t) return !1;
                            if (e && e.onmessage) {
                                if ('function' != typeof e.onmessage) return !1;
                            } else
                                e.onMessage = function(t) {
                                    return console.log('Received message:', t);
                                };
                            if (e && e.onopen && 'function' != typeof e.onopen)
                                return !1;
                            var n = this,
                                r = {
                                    login: this.config.stomp.login,
                                    passcode: this.config.stomp.password,
                                    'client-id': t,
                                },
                                i = new qa(this.config.stomp.url);
                            (this.client = za.over(i)),
                                (this.client.heartbeat.outgoing = 3e4),
                                (this.client.heartbeat.incoming = 3e4),
                                (this.client.debug = null),
                                this.client.connect(
                                    r,
                                    function() {
                                        return n.connectCallback(
                                            e,
                                            n.client,
                                            t
                                        );
                                    },
                                    function(i) {
                                        'string' == typeof i &&
                                            n.errorCallback(
                                                e,
                                                n.config,
                                                n.client,
                                                r,
                                                t,
                                                n
                                            );
                                    }
                                ),
                                this.setClient(this.client);
                        },
                    },
                    {
                        key: 'connectCallback',
                        value: function(t, e, n) {
                            if (
                                (t && t.onopen && t.onopen(),
                                e.ws.readyState === e.ws.OPEN)
                            )
                                e.subscribe(
                                    '/exchange/notifications/' + n,
                                    t.onmessage,
                                    { id: n, ack: 'client' }
                                );
                        },
                    },
                    {
                        key: 'errorCallback',
                        value: function(t, e, n, r, i, o) {
                            var u =
                                arguments.length > 6 && void 0 !== arguments[6]
                                    ? arguments[6]
                                    : 0;
                            0 === u &&
                                (u = 1e3 * (Math.floor(6 * Math.random()) + 1)),
                                setTimeout(function() {
                                    if (
                                        n.ws.readyState !== n.ws.CONNECTING &&
                                        n.ws.readyState !== n.ws.OPEN
                                    ) {
                                        var a = new qa(e.stomp.url);
                                        ((n = new za.over(
                                            a
                                        )).heartbeat.outgoing = 3e4),
                                            (n.heartbeat.incoming = 3e4),
                                            (n.debug = null),
                                            n.connect(
                                                r,
                                                function() {
                                                    o.connectCallback(t, n, i),
                                                        (u =
                                                            1e3 *
                                                            (Math.floor(
                                                                6 *
                                                                    Math.random()
                                                            ) +
                                                                1));
                                                },
                                                function(a) {
                                                    'string' == typeof a &&
                                                        o.errorCallback(
                                                            t,
                                                            e,
                                                            n,
                                                            r,
                                                            i,
                                                            o,
                                                            u
                                                        );
                                                }
                                            );
                                    }
                                }, u),
                                u >= 6e5
                                    ? (u =
                                          1e3 *
                                          (Math.floor(6 * Math.random()) + 1))
                                    : (u += Math.ceil(u / 2));
                        },
                    },
                    {
                        key: 'setClient',
                        value: function(t) {
                            this.subscription = t;
                        },
                    },
                    {
                        key: 'unsubscribe',
                        value: function() {
                            this.subscription &&
                                this.subscription.connected &&
                                this.subscription.unsubscribe();
                        },
                    },
                ]),
                t
            );
        })(),
        Ja = {
            BASE_URL: 'https://services.inplayer.com',
            INPLAYER_TOKEN_NAME: 'inplayer_token',
            stomp: {
                url: 'wss://notify.inplayer.com:61614/ws',
                login: 'notifications',
                password: 'notifications',
            },
        },
        Xa = function(t) {
            return {
                signIn: t.BASE_URL + '/accounts/login',
                signOut: t.BASE_URL + '/accounts/logout',
                signUp: t.BASE_URL + '/accounts',
                requestNewPassword: t.BASE_URL + '/accounts/forgot-password',
                setNewPassword: function(e) {
                    return t.BASE_URL + '/accounts/forgot-password/' + e;
                },
                getAccountInfo: t.BASE_URL + '/accounts',
                social: function(e) {
                    return t.BASE_URL + '/accounts/social?state=' + e;
                },
                updateAccount: t.BASE_URL + '/accounts',
                changePassword: t.BASE_URL + '/accounts/change-password',
                getRegisterFields: function(e) {
                    return t.BASE_URL + '/accounts/register-fields/' + e;
                },
                checkAccess: function(e) {
                    return t.BASE_URL + '/items/' + e + '/access';
                },
                findAsset: function(e, n) {
                    return t.BASE_URL + '/items/' + n + '/' + e;
                },
                findExternalAsset: function(e, n) {
                    return t.BASE_URL + '/items/assets/external/' + e + '/' + n;
                },
                findPackage: function(e) {
                    return t.BASE_URL + '/items/packages/' + e;
                },
                findAccessFees: function(e) {
                    return t.BASE_URL + '/items/' + e + '/access-fees';
                },
                freemium: t.BASE_URL + '/items/access/unlimited',
                getPaymentMethods: t.BASE_URL + '/payments/methods',
                getPaymentTools: function(e) {
                    return t.BASE_URL + '/payments/method/' + e + '/tools';
                },
                payForAsset: t.BASE_URL + '/payments',
                externalPayments: t.BASE_URL + '/external-payments',
                getSubscriptions: t.BASE_URL + '/subscriptions',
                subscribe: t.BASE_URL + '/subscriptions',
                getDlcLinks: function(e) {
                    return t.BASE_URL + '/dlc/' + e + '/links';
                },
                getDiscount: t.BASE_URL + '/vouchers/discount',
                getBranding: function(e) {
                    return t.BASE_URL + '/branding/paywall/' + e;
                },
                downloadFile: function(e, n) {
                    return t.BASE_URL + '/dlc/' + e + '/' + n;
                },
            };
        };
    return new ((function() {
        function t() {
            ja(this, t),
                (this.config = Ja),
                (this.config.API = Xa(Ja)),
                (this.User = new Ba(this.config)),
                (this.Asset = new Ua(this.config)),
                (this.Payment = new Ca(this.config)),
                (this.Subscription = new Da(this.config)),
                (this.Misc = new Wa(this.config)),
                (this.Socket = new Ha(this.config));
        }
        return (
            La(t, [
                {
                    key: 'subscribe',
                    value: function(t, e) {
                        return (
                            !!this.User.isSignedIn() &&
                            (this.Socket.subscribe(t, e), !0)
                        );
                    },
                },
                {
                    key: 'unsubscribe',
                    value: function() {
                        this.Socket.unsubscribe();
                    },
                },
                {
                    key: 'setConfig',
                    value: function(t) {
                        switch (t) {
                            case 'prod':
                                (this.config.BASE_URL =
                                    'https://services.inplayer.com'),
                                    (this.config.stomp.url =
                                        'wss://notify.inplayer.com:15671/ws');
                                break;
                            case 'develop':
                            case 'sandbox':
                                (this.config.BASE_URL =
                                    'https://staging-v2.inplayer.com'),
                                    (this.config.stomp.url =
                                        'ws://staging-v2.inplayer.com:15674/ws');
                        }
                        this.config.API = Xa(this.config);
                    },
                },
            ]),
            t
        );
    })())();
});
