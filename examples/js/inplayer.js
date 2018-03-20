!(function(t) {
    'use strict';
    var e,
        r = Object.prototype,
        n = r.hasOwnProperty,
        o = 'function' == typeof Symbol ? Symbol : {},
        i = o.iterator || '@@iterator',
        s = o.asyncIterator || '@@asyncIterator',
        a = o.toStringTag || '@@toStringTag',
        u = 'object' == typeof module,
        c = t.regeneratorRuntime;
    if (c) u && (module.exports = c);
    else {
        (c = t.regeneratorRuntime = u ? module.exports : {}).wrap = g;
        var f = 'suspendedStart',
            h = 'suspendedYield',
            l = 'executing',
            p = 'completed',
            d = {},
            y = {};
        y[i] = function() {
            return this;
        };
        var b = Object.getPrototypeOf,
            m = b && b(b(P([])));
        m && m !== r && n.call(m, i) && (y = m);
        var v = (S.prototype = _.prototype = Object.create(y));
        (E.prototype = v.constructor = S),
            (S.constructor = E),
            (S[a] = E.displayName = 'GeneratorFunction'),
            (c.isGeneratorFunction = function(t) {
                var e = 'function' == typeof t && t.constructor;
                return (
                    !!e &&
                    (e === E ||
                        'GeneratorFunction' === (e.displayName || e.name))
                );
            }),
            (c.mark = function(t) {
                return (
                    Object.setPrototypeOf
                        ? Object.setPrototypeOf(t, S)
                        : ((t.__proto__ = S),
                          a in t || (t[a] = 'GeneratorFunction')),
                    (t.prototype = Object.create(v)),
                    t
                );
            }),
            (c.awrap = function(t) {
                return { __await: t };
            }),
            x(L.prototype),
            (L.prototype[s] = function() {
                return this;
            }),
            (c.AsyncIterator = L),
            (c.async = function(t, e, r, n) {
                var o = new L(g(t, e, r, n));
                return c.isGeneratorFunction(e)
                    ? o
                    : o.next().then(function(t) {
                          return t.done ? t.value : o.next();
                      });
            }),
            x(v),
            (v[a] = 'Generator'),
            (v[i] = function() {
                return this;
            }),
            (v.toString = function() {
                return '[object Generator]';
            }),
            (c.keys = function(t) {
                var e = [];
                for (var r in t) e.push(r);
                return (
                    e.reverse(),
                    function r() {
                        for (; e.length; ) {
                            var n = e.pop();
                            if (n in t) return (r.value = n), (r.done = !1), r;
                        }
                        return (r.done = !0), r;
                    }
                );
            }),
            (c.values = P),
            (I.prototype = {
                constructor: I,
                reset: function(t) {
                    if (
                        ((this.prev = 0),
                        (this.next = 0),
                        (this.sent = this._sent = e),
                        (this.done = !1),
                        (this.delegate = null),
                        (this.method = 'next'),
                        (this.arg = e),
                        this.tryEntries.forEach(A),
                        !t)
                    )
                        for (var r in this)
                            't' === r.charAt(0) &&
                                n.call(this, r) &&
                                !isNaN(+r.slice(1)) &&
                                (this[r] = e);
                },
                stop: function() {
                    this.done = !0;
                    var t = this.tryEntries[0].completion;
                    if ('throw' === t.type) throw t.arg;
                    return this.rval;
                },
                dispatchException: function(t) {
                    if (this.done) throw t;
                    var r = this;
                    function o(n, o) {
                        return (
                            (a.type = 'throw'),
                            (a.arg = t),
                            (r.next = n),
                            o && ((r.method = 'next'), (r.arg = e)),
                            !!o
                        );
                    }
                    for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                        var s = this.tryEntries[i],
                            a = s.completion;
                        if ('root' === s.tryLoc) return o('end');
                        if (s.tryLoc <= this.prev) {
                            var u = n.call(s, 'catchLoc'),
                                c = n.call(s, 'finallyLoc');
                            if (u && c) {
                                if (this.prev < s.catchLoc)
                                    return o(s.catchLoc, !0);
                                if (this.prev < s.finallyLoc)
                                    return o(s.finallyLoc);
                            } else if (u) {
                                if (this.prev < s.catchLoc)
                                    return o(s.catchLoc, !0);
                            } else {
                                if (!c)
                                    throw new Error(
                                        'try statement without catch or finally'
                                    );
                                if (this.prev < s.finallyLoc)
                                    return o(s.finallyLoc);
                            }
                        }
                    }
                },
                abrupt: function(t, e) {
                    for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                        var o = this.tryEntries[r];
                        if (
                            o.tryLoc <= this.prev &&
                            n.call(o, 'finallyLoc') &&
                            this.prev < o.finallyLoc
                        ) {
                            var i = o;
                            break;
                        }
                    }
                    i &&
                        ('break' === t || 'continue' === t) &&
                        i.tryLoc <= e &&
                        e <= i.finallyLoc &&
                        (i = null);
                    var s = i ? i.completion : {};
                    return (
                        (s.type = t),
                        (s.arg = e),
                        i
                            ? ((this.method = 'next'),
                              (this.next = i.finallyLoc),
                              d)
                            : this.complete(s)
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
                                : 'normal' === t.type && e && (this.next = e),
                        d
                    );
                },
                finish: function(t) {
                    for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                        var r = this.tryEntries[e];
                        if (r.finallyLoc === t)
                            return (
                                this.complete(r.completion, r.afterLoc), A(r), d
                            );
                    }
                },
                catch: function(t) {
                    for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                        var r = this.tryEntries[e];
                        if (r.tryLoc === t) {
                            var n = r.completion;
                            if ('throw' === n.type) {
                                var o = n.arg;
                                A(r);
                            }
                            return o;
                        }
                    }
                    throw new Error('illegal catch attempt');
                },
                delegateYield: function(t, r, n) {
                    return (
                        (this.delegate = {
                            iterator: P(t),
                            resultName: r,
                            nextLoc: n,
                        }),
                        'next' === this.method && (this.arg = e),
                        d
                    );
                },
            });
    }
    function g(t, e, r, n) {
        var o = e && e.prototype instanceof _ ? e : _,
            i = Object.create(o.prototype),
            s = new I(n || []);
        return (
            (i._invoke = (function(t, e, r) {
                var n = f;
                return function(o, i) {
                    if (n === l)
                        throw new Error('Generator is already running');
                    if (n === p) {
                        if ('throw' === o) throw i;
                        return B();
                    }
                    for (r.method = o, r.arg = i; ; ) {
                        var s = r.delegate;
                        if (s) {
                            var a = T(s, r);
                            if (a) {
                                if (a === d) continue;
                                return a;
                            }
                        }
                        if ('next' === r.method) r.sent = r._sent = r.arg;
                        else if ('throw' === r.method) {
                            if (n === f) throw ((n = p), r.arg);
                            r.dispatchException(r.arg);
                        } else
                            'return' === r.method && r.abrupt('return', r.arg);
                        n = l;
                        var u = w(t, e, r);
                        if ('normal' === u.type) {
                            if (((n = r.done ? p : h), u.arg === d)) continue;
                            return { value: u.arg, done: r.done };
                        }
                        'throw' === u.type &&
                            ((n = p), (r.method = 'throw'), (r.arg = u.arg));
                    }
                };
            })(t, r, s)),
            i
        );
    }
    function w(t, e, r) {
        try {
            return { type: 'normal', arg: t.call(e, r) };
        } catch (t) {
            return { type: 'throw', arg: t };
        }
    }
    function _() {}
    function E() {}
    function S() {}
    function x(t) {
        ['next', 'throw', 'return'].forEach(function(e) {
            t[e] = function(t) {
                return this._invoke(e, t);
            };
        });
    }
    function L(t) {
        var e;
        this._invoke = function(r, o) {
            function i() {
                return new Promise(function(e, i) {
                    !(function e(r, o, i, s) {
                        var a = w(t[r], t, o);
                        if ('throw' !== a.type) {
                            var u = a.arg,
                                c = u.value;
                            return c &&
                                'object' == typeof c &&
                                n.call(c, '__await')
                                ? Promise.resolve(c.__await).then(
                                      function(t) {
                                          e('next', t, i, s);
                                      },
                                      function(t) {
                                          e('throw', t, i, s);
                                      }
                                  )
                                : Promise.resolve(c).then(function(t) {
                                      (u.value = t), i(u);
                                  }, s);
                        }
                        s(a.arg);
                    })(r, o, e, i);
                });
            }
            return (e = e ? e.then(i, i) : i());
        };
    }
    function T(t, r) {
        var n = t.iterator[r.method];
        if (n === e) {
            if (((r.delegate = null), 'throw' === r.method)) {
                if (
                    t.iterator.return &&
                    ((r.method = 'return'),
                    (r.arg = e),
                    T(t, r),
                    'throw' === r.method)
                )
                    return d;
                (r.method = 'throw'),
                    (r.arg = new TypeError(
                        "The iterator does not provide a 'throw' method"
                    ));
            }
            return d;
        }
        var o = w(n, t.iterator, r.arg);
        if ('throw' === o.type)
            return (
                (r.method = 'throw'), (r.arg = o.arg), (r.delegate = null), d
            );
        var i = o.arg;
        return i
            ? i.done
                ? ((r[t.resultName] = i.value),
                  (r.next = t.nextLoc),
                  'return' !== r.method && ((r.method = 'next'), (r.arg = e)),
                  (r.delegate = null),
                  d)
                : i
            : ((r.method = 'throw'),
              (r.arg = new TypeError('iterator result is not an object')),
              (r.delegate = null),
              d);
    }
    function O(t) {
        var e = { tryLoc: t[0] };
        1 in t && (e.catchLoc = t[1]),
            2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
            this.tryEntries.push(e);
    }
    function A(t) {
        var e = t.completion || {};
        (e.type = 'normal'), delete e.arg, (t.completion = e);
    }
    function I(t) {
        (this.tryEntries = [{ tryLoc: 'root' }]),
            t.forEach(O, this),
            this.reset(!0);
    }
    function P(t) {
        if (t) {
            var r = t[i];
            if (r) return r.call(t);
            if ('function' == typeof t.next) return t;
            if (!isNaN(t.length)) {
                var o = -1,
                    s = function r() {
                        for (; ++o < t.length; )
                            if (n.call(t, o))
                                return (r.value = t[o]), (r.done = !1), r;
                        return (r.value = e), (r.done = !0), r;
                    };
                return (s.next = s);
            }
        }
        return { next: B };
    }
    function B() {
        return { value: e, done: !0 };
    }
})(
    (function() {
        return this;
    })() || Function('return this')()
),
    (function(t, e) {
        'object' == typeof exports && 'undefined' != typeof module
            ? (module.exports = e(
                  require('es6-promise/auto'),
                  require('net'),
                  require('websocket')
              ))
            : 'function' == typeof define && define.amd
                ? define(['es6-promise/auto', 'net', 'websocket'], e)
                : (t.InPlayer = e(null, t.net, t.websocket));
    })(this, function(t, e, r) {
        'use strict';
        (e = e && e.hasOwnProperty('default') ? e.default : e),
            (r = r && r.hasOwnProperty('default') ? r.default : r),
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
                        var r = [
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
                            n = function(t) {
                                return t && DataView.prototype.isPrototypeOf(t);
                            },
                            o =
                                ArrayBuffer.isView ||
                                function(t) {
                                    return (
                                        t &&
                                        r.indexOf(
                                            Object.prototype.toString.call(t)
                                        ) > -1
                                    );
                                };
                    (f.prototype.append = function(t, e) {
                        (t = a(t)), (e = u(e));
                        var r = this.map[t];
                        this.map[t] = r ? r + ',' + e : e;
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
                            this.map[a(t)] = u(e);
                        }),
                        (f.prototype.forEach = function(t, e) {
                            for (var r in this.map)
                                this.map.hasOwnProperty(r) &&
                                    t.call(e, this.map[r], r, this);
                        }),
                        (f.prototype.keys = function() {
                            var t = [];
                            return (
                                this.forEach(function(e, r) {
                                    t.push(r);
                                }),
                                c(t)
                            );
                        }),
                        (f.prototype.values = function() {
                            var t = [];
                            return (
                                this.forEach(function(e) {
                                    t.push(e);
                                }),
                                c(t)
                            );
                        }),
                        (f.prototype.entries = function() {
                            var t = [];
                            return (
                                this.forEach(function(e, r) {
                                    t.push([r, e]);
                                }),
                                c(t)
                            );
                        }),
                        e.iterable &&
                            (f.prototype[Symbol.iterator] =
                                f.prototype.entries);
                    var i = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
                    (b.prototype.clone = function() {
                        return new b(this, { body: this._bodyInit });
                    }),
                        y.call(b.prototype),
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
                            var t = new v(null, { status: 0, statusText: '' });
                            return (t.type = 'error'), t;
                        });
                    var s = [301, 302, 303, 307, 308];
                    (v.redirect = function(t, e) {
                        if (-1 === s.indexOf(e))
                            throw new RangeError('Invalid status code');
                        return new v(null, {
                            status: e,
                            headers: { location: t },
                        });
                    }),
                        (t.Headers = f),
                        (t.Request = b),
                        (t.Response = v),
                        (t.fetch = function(t, r) {
                            return new Promise(function(n, o) {
                                var i = new b(t, r),
                                    s = new XMLHttpRequest();
                                (s.onload = function() {
                                    var t,
                                        e,
                                        r = {
                                            status: s.status,
                                            statusText: s.statusText,
                                            headers: ((t =
                                                s.getAllResponseHeaders() ||
                                                ''),
                                            (e = new f()),
                                            t
                                                .split(/\r?\n/)
                                                .forEach(function(t) {
                                                    var r = t.split(':'),
                                                        n = r.shift().trim();
                                                    if (n) {
                                                        var o = r
                                                            .join(':')
                                                            .trim();
                                                        e.append(n, o);
                                                    }
                                                }),
                                            e),
                                        };
                                    r.url =
                                        'responseURL' in s
                                            ? s.responseURL
                                            : r.headers.get('X-Request-URL');
                                    var o =
                                        'response' in s
                                            ? s.response
                                            : s.responseText;
                                    n(new v(o, r));
                                }),
                                    (s.onerror = function() {
                                        o(
                                            new TypeError(
                                                'Network request failed'
                                            )
                                        );
                                    }),
                                    (s.ontimeout = function() {
                                        o(
                                            new TypeError(
                                                'Network request failed'
                                            )
                                        );
                                    }),
                                    s.open(i.method, i.url, !0),
                                    'include' === i.credentials &&
                                        (s.withCredentials = !0),
                                    'responseType' in s &&
                                        e.blob &&
                                        (s.responseType = 'blob'),
                                    i.headers.forEach(function(t, e) {
                                        s.setRequestHeader(e, t);
                                    }),
                                    s.send(
                                        void 0 === i._bodyInit
                                            ? null
                                            : i._bodyInit
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
                function u(t) {
                    return 'string' != typeof t && (t = String(t)), t;
                }
                function c(t) {
                    var r = {
                        next: function() {
                            var e = t.shift();
                            return { done: void 0 === e, value: e };
                        },
                    };
                    return (
                        e.iterable &&
                            (r[Symbol.iterator] = function() {
                                return r;
                            }),
                        r
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
                                  Object.getOwnPropertyNames(t).forEach(
                                      function(e) {
                                          this.append(e, t[e]);
                                      },
                                      this
                                  );
                }
                function h(t) {
                    if (t.bodyUsed)
                        return Promise.reject(new TypeError('Already read'));
                    t.bodyUsed = !0;
                }
                function l(t) {
                    return new Promise(function(e, r) {
                        (t.onload = function() {
                            e(t.result);
                        }),
                            (t.onerror = function() {
                                r(t.error);
                            });
                    });
                }
                function p(t) {
                    var e = new FileReader(),
                        r = l(e);
                    return e.readAsArrayBuffer(t), r;
                }
                function d(t) {
                    if (t.slice) return t.slice(0);
                    var e = new Uint8Array(t.byteLength);
                    return e.set(new Uint8Array(t)), e.buffer;
                }
                function y() {
                    return (
                        (this.bodyUsed = !1),
                        (this._initBody = function(t) {
                            if (((this._bodyInit = t), t))
                                if ('string' == typeof t) this._bodyText = t;
                                else if (
                                    e.blob &&
                                    Blob.prototype.isPrototypeOf(t)
                                )
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
                                else if (e.arrayBuffer && e.blob && n(t))
                                    (this._bodyArrayBuffer = d(t.buffer)),
                                        (this._bodyInit = new Blob([
                                            this._bodyArrayBuffer,
                                        ]));
                                else {
                                    if (
                                        !e.arrayBuffer ||
                                        (!ArrayBuffer.prototype.isPrototypeOf(
                                            t
                                        ) &&
                                            !o(t))
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
                                var t = h(this);
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
                                return Promise.resolve(
                                    new Blob([this._bodyText])
                                );
                            }),
                            (this.arrayBuffer = function() {
                                return this._bodyArrayBuffer
                                    ? h(this) ||
                                          Promise.resolve(this._bodyArrayBuffer)
                                    : this.blob().then(p);
                            })),
                        (this.text = function() {
                            var t,
                                e,
                                r,
                                n = h(this);
                            if (n) return n;
                            if (this._bodyBlob)
                                return (
                                    (t = this._bodyBlob),
                                    (e = new FileReader()),
                                    (r = l(e)),
                                    e.readAsText(t),
                                    r
                                );
                            if (this._bodyArrayBuffer)
                                return Promise.resolve(
                                    (function(t) {
                                        for (
                                            var e = new Uint8Array(t),
                                                r = new Array(e.length),
                                                n = 0;
                                            n < e.length;
                                            n++
                                        )
                                            r[n] = String.fromCharCode(e[n]);
                                        return r.join('');
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
                                return this.text().then(m);
                            }),
                        (this.json = function() {
                            return this.text().then(JSON.parse);
                        }),
                        this
                    );
                }
                function b(t, e) {
                    var r,
                        n,
                        o = (e = e || {}).body;
                    if (t instanceof b) {
                        if (t.bodyUsed) throw new TypeError('Already read');
                        (this.url = t.url),
                            (this.credentials = t.credentials),
                            e.headers || (this.headers = new f(t.headers)),
                            (this.method = t.method),
                            (this.mode = t.mode),
                            o ||
                                null == t._bodyInit ||
                                ((o = t._bodyInit), (t.bodyUsed = !0));
                    } else this.url = String(t);
                    if (
                        ((this.credentials =
                            e.credentials || this.credentials || 'omit'),
                        (!e.headers && this.headers) ||
                            (this.headers = new f(e.headers)),
                        (this.method = ((r = e.method || this.method || 'GET'),
                        (n = r.toUpperCase()),
                        i.indexOf(n) > -1 ? n : r)),
                        (this.mode = e.mode || this.mode || null),
                        (this.referrer = null),
                        ('GET' === this.method || 'HEAD' === this.method) && o)
                    )
                        throw new TypeError(
                            'Body not allowed for GET or HEAD requests'
                        );
                    this._initBody(o);
                }
                function m(t) {
                    var e = new FormData();
                    return (
                        t
                            .trim()
                            .split('&')
                            .forEach(function(t) {
                                if (t) {
                                    var r = t.split('='),
                                        n = r.shift().replace(/\+/g, ' '),
                                        o = r.join('=').replace(/\+/g, ' ');
                                    e.append(
                                        decodeURIComponent(n),
                                        decodeURIComponent(o)
                                    );
                                }
                            }),
                        e
                    );
                }
                function v(t, e) {
                    e || (e = {}),
                        (this.type = 'default'),
                        (this.status = 'status' in e ? e.status : 200),
                        (this.ok = this.status >= 200 && this.status < 300),
                        (this.statusText =
                            'statusText' in e ? e.statusText : 'OK'),
                        (this.headers = new f(e.headers)),
                        (this.url = e.url || ''),
                        this._initBody(t);
                }
            })(self);
        self.fetch.bind(self);
        var n =
            'undefined' != typeof window
                ? window
                : 'undefined' != typeof global
                    ? global
                    : 'undefined' != typeof self ? self : {};
        function o(t, e) {
            return t((e = { exports: {} }), e.exports), e.exports;
        }
        var i = o(function(t, e) {
                (function() {
                    var t,
                        r,
                        n,
                        o,
                        i = {}.hasOwnProperty,
                        s = [].slice;
                    (t = { LF: '\n', NULL: '\0' }),
                        (n = (function() {
                            var e;
                            function r(t, e, r) {
                                (this.command = t),
                                    (this.headers = null != e ? e : {}),
                                    (this.body = null != r ? r : '');
                            }
                            return (
                                (r.prototype.toString = function() {
                                    var e, n, o, s, a;
                                    for (n in ((e = [this.command]),
                                    (o =
                                        !1 ===
                                        this.headers['content-length']) &&
                                        delete this.headers['content-length'],
                                    (a = this.headers)))
                                        i.call(a, n) &&
                                            ((s = a[n]), e.push(n + ':' + s));
                                    return (
                                        this.body &&
                                            !o &&
                                            e.push(
                                                'content-length:' +
                                                    r.sizeOfUTF8(this.body)
                                            ),
                                        e.push(t.LF + this.body),
                                        e.join(t.LF)
                                    );
                                }),
                                (r.sizeOfUTF8 = function(t) {
                                    return t
                                        ? encodeURI(t).match(/%..|./g).length
                                        : 0;
                                }),
                                (e = function(e) {
                                    var n,
                                        o,
                                        i,
                                        s,
                                        a,
                                        u,
                                        c,
                                        f,
                                        h,
                                        l,
                                        p,
                                        d,
                                        y,
                                        b,
                                        m,
                                        v,
                                        g;
                                    for (
                                        s = e.search(RegExp('' + t.LF + t.LF)),
                                            i = (a = e
                                                .substring(0, s)
                                                .split(t.LF)).shift(),
                                            u = {},
                                            d = function(t) {
                                                return t.replace(
                                                    /^\s+|\s+$/g,
                                                    ''
                                                );
                                            },
                                            y = 0,
                                            m = (v = a.reverse()).length;
                                        y < m;
                                        y++
                                    )
                                        (f = (l = v[y]).indexOf(':')),
                                            (u[d(l.substring(0, f))] = d(
                                                l.substring(f + 1)
                                            ));
                                    if (
                                        ((n = ''),
                                        (p = s + 2),
                                        u['content-length'])
                                    )
                                        (h = parseInt(u['content-length'])),
                                            (n = ('' + e).substring(p, p + h));
                                    else
                                        for (
                                            o = null, c = b = p, g = e.length;
                                            (p <= g ? b < g : b > g) &&
                                            (o = e.charAt(c)) !== t.NULL;
                                            c = p <= g ? ++b : --b
                                        )
                                            n += o;
                                    return new r(i, u, n);
                                }),
                                (r.unmarshall = function(r) {
                                    var n;
                                    return (function() {
                                        var o, i, s, a;
                                        for (
                                            a = [],
                                                o = 0,
                                                i = (s = r.split(
                                                    RegExp(
                                                        '' + t.NULL + t.LF + '*'
                                                    )
                                                )).length;
                                            o < i;
                                            o++
                                        )
                                            (null != (n = s[o])
                                                ? n.length
                                                : void 0) > 0 && a.push(e(n));
                                        return a;
                                    })();
                                }),
                                (r.marshall = function(e, n, o) {
                                    return new r(e, n, o).toString() + t.NULL;
                                }),
                                r
                            );
                        })()),
                        (r = (function() {
                            var e;
                            function r(t) {
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
                                (r.prototype.debug = function(t) {
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
                                (r.prototype._transmit = function(t, e, r) {
                                    var o;
                                    for (
                                        o = n.marshall(t, e, r),
                                            'function' == typeof this.debug &&
                                                this.debug('>>> ' + o);
                                        ;

                                    ) {
                                        if (
                                            !(
                                                o.length >
                                                this.maxWebSocketFrameSize
                                            )
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
                                (r.prototype._setupHeartbeat = function(r) {
                                    var n, i, s, a, u, c, f;
                                    if (
                                        (u = r.version) === o.VERSIONS.V1_1 ||
                                        u === o.VERSIONS.V1_2
                                    )
                                        return (
                                            (i = (c = (function() {
                                                var t, e, n, o;
                                                for (
                                                    o = [],
                                                        t = 0,
                                                        e = (n = r[
                                                            'heart-beat'
                                                        ].split(',')).length;
                                                    t < e;
                                                    t++
                                                )
                                                    (a = n[t]),
                                                        o.push(parseInt(a));
                                                return o;
                                            })())[0]),
                                            (n = c[1]),
                                            0 !== this.heartbeat.outgoing &&
                                                0 !== n &&
                                                ((s = Math.max(
                                                    this.heartbeat.outgoing,
                                                    n
                                                )),
                                                'function' ==
                                                    typeof this.debug &&
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
                                            0 !== this.heartbeat.incoming &&
                                            0 !== i
                                                ? ((s = Math.max(
                                                      this.heartbeat.incoming,
                                                      i
                                                  )),
                                                  'function' ==
                                                      typeof this.debug &&
                                                      this.debug(
                                                          'check PONG every ' +
                                                              s +
                                                              'ms'
                                                      ),
                                                  (this.ponger = o.setInterval(
                                                      s,
                                                      (function(t) {
                                                          return function() {
                                                              var r;
                                                              if (
                                                                  (r =
                                                                      e() -
                                                                      t.serverActivity) >
                                                                  2 * s
                                                              )
                                                                  return (
                                                                      'function' ==
                                                                          typeof t.debug &&
                                                                          t.debug(
                                                                              'did not receive server activity for the last ' +
                                                                                  r +
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
                                (r.prototype._parseConnect = function() {
                                    var t, e, r, n;
                                    switch (((n = {}),
                                    (t =
                                        1 <= arguments.length
                                            ? s.call(arguments, 0)
                                            : []).length)) {
                                        case 2:
                                            (n = t[0]), (e = t[1]);
                                            break;
                                        case 3:
                                            t[1] instanceof Function
                                                ? ((n = t[0]),
                                                  (e = t[1]),
                                                  (r = t[2]))
                                                : ((n.login = t[0]),
                                                  (n.passcode = t[1]),
                                                  (e = t[2]));
                                            break;
                                        case 4:
                                            (n.login = t[0]),
                                                (n.passcode = t[1]),
                                                (e = t[2]),
                                                (r = t[3]);
                                            break;
                                        default:
                                            (n.login = t[0]),
                                                (n.passcode = t[1]),
                                                (e = t[2]),
                                                (r = t[3]),
                                                (n.host = t[4]);
                                    }
                                    return [n, e, r];
                                }),
                                (r.prototype.connect = function() {
                                    var r, i, a, u, c;
                                    return (
                                        (r =
                                            1 <= arguments.length
                                                ? s.call(arguments, 0)
                                                : []),
                                        (u = this._parseConnect.apply(this, r)),
                                        (a = u[0]),
                                        (this.connectCallback = u[1]),
                                        (i = u[2]),
                                        'function' == typeof this.debug &&
                                            this.debug('Opening Web Socket...'),
                                        (this.ws.onmessage = ((c = this),
                                        function(r) {
                                            var o,
                                                s,
                                                a,
                                                u,
                                                f,
                                                h,
                                                l,
                                                p,
                                                d,
                                                y,
                                                b,
                                                m;
                                            if (
                                                ((u =
                                                    'undefined' !=
                                                        typeof ArrayBuffer &&
                                                    r.data instanceof
                                                        ArrayBuffer
                                                        ? ((o = new Uint8Array(
                                                              r.data
                                                          )),
                                                          'function' ==
                                                              typeof c.debug &&
                                                              c.debug(
                                                                  '--- got data length: ' +
                                                                      o.length
                                                              ),
                                                          (function() {
                                                              var t, e, r;
                                                              for (
                                                                  r = [],
                                                                      t = 0,
                                                                      e =
                                                                          o.length;
                                                                  t < e;
                                                                  t++
                                                              )
                                                                  (s = o[t]),
                                                                      r.push(
                                                                          String.fromCharCode(
                                                                              s
                                                                          )
                                                                      );
                                                              return r;
                                                          })().join(''))
                                                        : r.data),
                                                (c.serverActivity = e()),
                                                u !== t.LF)
                                            ) {
                                                for (
                                                    'function' ==
                                                        typeof c.debug &&
                                                        c.debug('<<< ' + u),
                                                        m = [],
                                                        d = 0,
                                                        y = (b = n.unmarshall(
                                                            u
                                                        )).length;
                                                    d < y;
                                                    d++
                                                )
                                                    switch ((f = b[d])
                                                        .command) {
                                                        case 'CONNECTED':
                                                            'function' ==
                                                                typeof c.debug &&
                                                                c.debug(
                                                                    'connected to server ' +
                                                                        f
                                                                            .headers
                                                                            .server
                                                                ),
                                                                (c.connected = !0),
                                                                c._setupHeartbeat(
                                                                    f.headers
                                                                ),
                                                                m.push(
                                                                    'function' ==
                                                                    typeof c.connectCallback
                                                                        ? c.connectCallback(
                                                                              f
                                                                          )
                                                                        : void 0
                                                                );
                                                            break;
                                                        case 'MESSAGE':
                                                            (p =
                                                                f.headers
                                                                    .subscription),
                                                                (l =
                                                                    c
                                                                        .subscriptions[
                                                                        p
                                                                    ] ||
                                                                    c.onreceive)
                                                                    ? ((a = c),
                                                                      (h =
                                                                          f
                                                                              .headers[
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
                                                                                  h,
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
                                                                                  h,
                                                                                  p,
                                                                                  t
                                                                              )
                                                                          );
                                                                      }),
                                                                      m.push(
                                                                          l(f)
                                                                      ))
                                                                    : m.push(
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
                                                            m.push(
                                                                'function' ==
                                                                typeof c.onreceipt
                                                                    ? c.onreceipt(
                                                                          f
                                                                      )
                                                                    : void 0
                                                            );
                                                            break;
                                                        case 'ERROR':
                                                            m.push(
                                                                'function' ==
                                                                typeof i
                                                                    ? i(f)
                                                                    : void 0
                                                            );
                                                            break;
                                                        default:
                                                            m.push(
                                                                'function' ==
                                                                typeof c.debug
                                                                    ? c.debug(
                                                                          'Unhandled frame: ' +
                                                                              f
                                                                      )
                                                                    : void 0
                                                            );
                                                    }
                                                return m;
                                            }
                                            'function' == typeof c.debug &&
                                                c.debug('<<< PONG');
                                        })),
                                        (this.ws.onclose = (function(t) {
                                            return function() {
                                                var e;
                                                return (
                                                    (e =
                                                        'Whoops! Lost connection to ' +
                                                        t.ws.url),
                                                    'function' ==
                                                        typeof t.debug &&
                                                        t.debug(e),
                                                    t._cleanUp(),
                                                    'function' == typeof i
                                                        ? i(e)
                                                        : void 0
                                                );
                                            };
                                        })(this)),
                                        (this.ws.onopen = (function(t) {
                                            return function() {
                                                return (
                                                    'function' ==
                                                        typeof t.debug &&
                                                        t.debug(
                                                            'Web Socket Opened...'
                                                        ),
                                                    (a[
                                                        'accept-version'
                                                    ] = o.VERSIONS.supportedVersions()),
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
                                (r.prototype.disconnect = function(t, e) {
                                    return (
                                        null == e && (e = {}),
                                        this._transmit('DISCONNECT', e),
                                        (this.ws.onclose = null),
                                        this.ws.close(),
                                        this._cleanUp(),
                                        'function' == typeof t ? t() : void 0
                                    );
                                }),
                                (r.prototype._cleanUp = function() {
                                    if (
                                        ((this.connected = !1),
                                        this.pinger &&
                                            o.clearInterval(this.pinger),
                                        this.ponger)
                                    )
                                        return o.clearInterval(this.ponger);
                                }),
                                (r.prototype.send = function(t, e, r) {
                                    return (
                                        null == e && (e = {}),
                                        null == r && (r = ''),
                                        (e.destination = t),
                                        this._transmit('SEND', e, r)
                                    );
                                }),
                                (r.prototype.subscribe = function(t, e, r) {
                                    var n;
                                    return (
                                        null == r && (r = {}),
                                        r.id ||
                                            (r.id = 'sub-' + this.counter++),
                                        (r.destination = t),
                                        (this.subscriptions[r.id] = e),
                                        this._transmit('SUBSCRIBE', r),
                                        (n = this),
                                        {
                                            id: r.id,
                                            unsubscribe: function() {
                                                return n.unsubscribe(r.id);
                                            },
                                        }
                                    );
                                }),
                                (r.prototype.unsubscribe = function(t) {
                                    return (
                                        delete this.subscriptions[t],
                                        this._transmit('UNSUBSCRIBE', { id: t })
                                    );
                                }),
                                (r.prototype.begin = function(t) {
                                    var e, r;
                                    return (
                                        (r = t || 'tx-' + this.counter++),
                                        this._transmit('BEGIN', {
                                            transaction: r,
                                        }),
                                        (e = this),
                                        {
                                            id: r,
                                            commit: function() {
                                                return e.commit(r);
                                            },
                                            abort: function() {
                                                return e.abort(r);
                                            },
                                        }
                                    );
                                }),
                                (r.prototype.commit = function(t) {
                                    return this._transmit('COMMIT', {
                                        transaction: t,
                                    });
                                }),
                                (r.prototype.abort = function(t) {
                                    return this._transmit('ABORT', {
                                        transaction: t,
                                    });
                                }),
                                (r.prototype.ack = function(t, e, r) {
                                    return (
                                        null == r && (r = {}),
                                        (r['message-id'] = t),
                                        (r.subscription = e),
                                        this._transmit('ACK', r)
                                    );
                                }),
                                (r.prototype.nack = function(t, e, r) {
                                    return (
                                        null == r && (r = {}),
                                        (r['message-id'] = t),
                                        (r.subscription = e),
                                        this._transmit('NACK', r)
                                    );
                                }),
                                r
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
                            client: function(t, e) {
                                var n;
                                return (
                                    null == e &&
                                        (e = ['v10.stomp', 'v11.stomp']),
                                    (n = new (o.WebSocketClass || WebSocket)(
                                        t,
                                        e
                                    )),
                                    new r(n)
                                );
                            },
                            over: function(t) {
                                return new r(t);
                            },
                            Frame: n,
                        }),
                        null !== e && (e.Stomp = o),
                        'undefined' != typeof window && null !== window
                            ? ((o.setInterval = function(t, e) {
                                  return window.setInterval(e, t);
                              }),
                              (o.clearInterval = function(t) {
                                  return window.clearInterval(t);
                              }),
                              (window.Stomp = o))
                            : e || (self.Stomp = o);
                }.call(n));
            }),
            s = (i.Stomp,
            o(function(t, o) {
                (function() {
                    var t, n, s, a, u, c;
                    (n = e),
                        ((t = i).Stomp.setInterval = function(t, e) {
                            return setInterval(e, t);
                        }),
                        (t.Stomp.clearInterval = function(t) {
                            return clearInterval(t);
                        }),
                        (u = function(t, e) {
                            var r, o;
                            return (
                                (r = null),
                                (o = {
                                    url: 'tcp:// ' + e + ':' + t,
                                    send: function(t) {
                                        return r.write(t);
                                    },
                                    close: function() {
                                        return r.end();
                                    },
                                }),
                                (r = n.connect(t, e, function(t) {
                                    return o.onopen();
                                })).on('error', function(t) {
                                    return 'function' == typeof o.onclose
                                        ? o.onclose(t)
                                        : void 0;
                                }),
                                r.on('close', function(t) {
                                    return 'function' == typeof o.onclose
                                        ? o.onclose(t)
                                        : void 0;
                                }),
                                r.on('data', function(t) {
                                    var e;
                                    return (
                                        (e = { data: t.toString() }),
                                        o.onmessage(e)
                                    );
                                }),
                                o
                            );
                        }),
                        (c = function(t) {
                            var e, n, o, i;
                            return (
                                (e = r.client),
                                (n = null),
                                (i = {
                                    url: t,
                                    send: function(t) {
                                        return n.sendUTF(t);
                                    },
                                    close: function() {
                                        return n.close();
                                    },
                                }),
                                (o = new e()).on('connect', function(t) {
                                    return (
                                        (n = t),
                                        i.onopen(),
                                        n.on('error', function(t) {
                                            return 'function' ==
                                                typeof i.onclose
                                                ? i.onclose(t)
                                                : void 0;
                                        }),
                                        n.on('close', function() {
                                            return 'function' ==
                                                typeof i.onclose
                                                ? i.onclose()
                                                : void 0;
                                        }),
                                        n.on('message', function(t) {
                                            var e;
                                            if ('utf8' === t.type)
                                                return (
                                                    (e = { data: t.utf8Data }),
                                                    i.onmessage(e)
                                                );
                                        })
                                    );
                                }),
                                o.connect(t),
                                i
                            );
                        }),
                        (s = function(e, r) {
                            var n;
                            return (n = u(r, e)), t.Stomp.over(n);
                        }),
                        (a = function(e) {
                            var r;
                            return (r = c(e)), t.Stomp.over(r);
                        }),
                        (o.overTCP = s),
                        (o.overWS = a);
                }.call(n));
            })),
            a = (s.net, s.websocket, s.overTCP, s.overWS, i.Stomp),
            u = s.overTCP,
            c = s.overWS;
        (a.overTCP = u), (a.overWS = c);
        window && (window.WebSocket || window.MozWebSocket);
        var f = f;
        return new f();
    });
