!(function(e, t) {
    'object' == typeof exports && 'undefined' != typeof module
        ? (module.exports = t(
              require('es6-promise/auto'),
              require('net'),
              require('websocket')
          ))
        : 'function' == typeof define && define.amd
          ? define(['es6-promise/auto', 'net', 'websocket'], t)
          : (e.InPlayer = t(null, e.net, e.websocket));
})(this, function(e, t, n) {
    'use strict';
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
                        o = function(e) {
                            return e && DataView.prototype.isPrototypeOf(e);
                        },
                        r =
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
                    (e = a(e)), (t = c(t));
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
                        this.map[a(e)] = c(t);
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
                            u(e)
                        );
                    }),
                    (f.prototype.values = function() {
                        var e = [];
                        return (
                            this.forEach(function(t) {
                                e.push(t);
                            }),
                            u(e)
                        );
                    }),
                    (f.prototype.entries = function() {
                        var e = [];
                        return (
                            this.forEach(function(t, n) {
                                e.push([n, t]);
                            }),
                            u(e)
                        );
                    }),
                    t.iterable &&
                        (f.prototype[Symbol.iterator] = f.prototype.entries);
                var i = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
                (m.prototype.clone = function() {
                    return new m(this, { body: this._bodyInit });
                }),
                    y.call(m.prototype),
                    y.call(b.prototype),
                    (b.prototype.clone = function() {
                        return new b(this._bodyInit, {
                            status: this.status,
                            statusText: this.statusText,
                            headers: new f(this.headers),
                            url: this.url,
                        });
                    }),
                    (b.error = function() {
                        var e = new b(null, { status: 0, statusText: '' });
                        return (e.type = 'error'), e;
                    });
                var s = [301, 302, 303, 307, 308];
                (b.redirect = function(e, t) {
                    if (-1 === s.indexOf(t))
                        throw new RangeError('Invalid status code');
                    return new b(null, { status: t, headers: { location: e } });
                }),
                    (e.Headers = f),
                    (e.Request = m),
                    (e.Response = b),
                    (e.fetch = function(e, n) {
                        return new Promise(function(o, r) {
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
                                                o = n.shift().trim();
                                            if (o) {
                                                var r = n.join(':').trim();
                                                t.append(o, r);
                                            }
                                        }),
                                        t),
                                    };
                                n.url =
                                    'responseURL' in s
                                        ? s.responseURL
                                        : n.headers.get('X-Request-URL');
                                var r =
                                    'response' in s
                                        ? s.response
                                        : s.responseText;
                                o(new b(r, n));
                            }),
                                (s.onerror = function() {
                                    r(new TypeError('Network request failed'));
                                }),
                                (s.ontimeout = function() {
                                    r(new TypeError('Network request failed'));
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
            function c(e) {
                return 'string' != typeof e && (e = String(e)), e;
            }
            function u(e) {
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
            function h(e) {
                return new Promise(function(t, n) {
                    (e.onload = function() {
                        t(e.result);
                    }),
                        (e.onerror = function() {
                            n(e.error);
                        });
                });
            }
            function p(e) {
                var t = new FileReader(),
                    n = h(t);
                return t.readAsArrayBuffer(e), n;
            }
            function l(e) {
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
                            else if (t.arrayBuffer && t.blob && o(e))
                                (this._bodyArrayBuffer = l(e.buffer)),
                                    (this._bodyInit = new Blob([
                                        this._bodyArrayBuffer,
                                    ]));
                            else {
                                if (
                                    !t.arrayBuffer ||
                                    (!ArrayBuffer.prototype.isPrototypeOf(e) &&
                                        !r(e))
                                )
                                    throw new Error(
                                        'unsupported BodyInit type'
                                    );
                                this._bodyArrayBuffer = l(e);
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
                                : this.blob().then(p);
                        })),
                    (this.text = function() {
                        var e,
                            t,
                            n,
                            o = d(this);
                        if (o) return o;
                        if (this._bodyBlob)
                            return (
                                (e = this._bodyBlob),
                                (t = new FileReader()),
                                (n = h(t)),
                                t.readAsText(e),
                                n
                            );
                        if (this._bodyArrayBuffer)
                            return Promise.resolve(
                                (function(e) {
                                    for (
                                        var t = new Uint8Array(e),
                                            n = new Array(t.length),
                                            o = 0;
                                        o < t.length;
                                        o++
                                    )
                                        n[o] = String.fromCharCode(t[o]);
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
                            return this.text().then(g);
                        }),
                    (this.json = function() {
                        return this.text().then(JSON.parse);
                    }),
                    this
                );
            }
            function m(e, t) {
                var n,
                    o,
                    r = (t = t || {}).body;
                if (e instanceof m) {
                    if (e.bodyUsed) throw new TypeError('Already read');
                    (this.url = e.url),
                        (this.credentials = e.credentials),
                        t.headers || (this.headers = new f(e.headers)),
                        (this.method = e.method),
                        (this.mode = e.mode),
                        r ||
                            null == e._bodyInit ||
                            ((r = e._bodyInit), (e.bodyUsed = !0));
                } else this.url = String(e);
                if (
                    ((this.credentials =
                        t.credentials || this.credentials || 'omit'),
                    (!t.headers && this.headers) ||
                        (this.headers = new f(t.headers)),
                    (this.method = ((n = t.method || this.method || 'GET'),
                    (o = n.toUpperCase()),
                    i.indexOf(o) > -1 ? o : n)),
                    (this.mode = t.mode || this.mode || null),
                    (this.referrer = null),
                    ('GET' === this.method || 'HEAD' === this.method) && r)
                )
                    throw new TypeError(
                        'Body not allowed for GET or HEAD requests'
                    );
                this._initBody(r);
            }
            function g(e) {
                var t = new FormData();
                return (
                    e
                        .trim()
                        .split('&')
                        .forEach(function(e) {
                            if (e) {
                                var n = e.split('='),
                                    o = n.shift().replace(/\+/g, ' '),
                                    r = n.join('=').replace(/\+/g, ' ');
                                t.append(
                                    decodeURIComponent(o),
                                    decodeURIComponent(r)
                                );
                            }
                        }),
                    t
                );
            }
            function b(e, t) {
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
    function o(e) {
        return new Promise(function(t, n) {
            function o(i, s) {
                try {
                    var a = e[s ? 'throw' : 'next'](i);
                } catch (e) {
                    return void n(e);
                }
                a.done ? t(a.value) : Promise.resolve(a.value).then(o, r);
            }
            function r(e) {
                o(e, 1);
            }
            o();
        });
    }
    var r = function(e) {
        this.config = e;
    };
    (r.prototype.signIn = function(e) {
        return (
            void 0 === e && (e = {}),
            o(
                function*() {
                    var t = new FormData();
                    t.append('email', e.email),
                        t.append('password', e.password),
                        t.append('merchant_uuid', e.merchantUuid),
                        t.append('referrer', e.referrer);
                    var n = yield (yield fetch(this.config.API.signIn, {
                        method: 'POST',
                        body: t,
                    })).json();
                    return (
                        n.access_token &&
                            localStorage.setItem(
                                this.config.INPLAYER_TOKEN_NAME,
                                n.access_token
                            ),
                        n
                    );
                }.call(this)
            )
        );
    }),
        (r.prototype.signOut = function() {
            return o(
                function*() {
                    var e = localStorage.getItem(
                        this.config.INPLAYER_TOKEN_NAME
                    );
                    return (
                        (yield (yield fetch(this.config.API.signOut, {
                            headers: { Authorization: 'Bearer ' + e },
                        })).json()).explain &&
                            localStorage.removeItem(
                                this.config.INPLAYER_TOKEN_NAME
                            ),
                        !0
                    );
                }.call(this)
            );
        }),
        (r.prototype.signUp = function(e) {
            return (
                void 0 === e && (e = {}),
                o(
                    function*() {
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
                            t.append('metadata', e.metadata),
                            yield (yield fetch(this.config.API.signUp, {
                                method: 'POST',
                                body: t,
                            })).json()
                        );
                    }.call(this)
                )
            );
        }),
        (r.prototype.isSignedIn = function() {
            return (
                void 0 !== localStorage.getItem(this.config.INPLAYER_TOKEN_NAME)
            );
        }),
        (r.prototype.token = function() {
            return localStorage.getItem(this.config.INPLAYER_TOKEN_NAME);
        }),
        (r.prototype.setTokenInCookie = function(e) {
            void 0 === e && (e = ''),
                localStorage.setItem(this.config.INPLAYER_TOKEN_NAME, e);
        }),
        (r.prototype.requestNewPassword = function(e) {
            return (
                void 0 === e && (e = {}),
                o(
                    function*() {
                        var t = new FormData();
                        return (
                            t.append('email', e.email),
                            t.append('merchant_uuid', e.merchantUuid),
                            yield (yield fetch(
                                this.config.API.requestNewPassword,
                                { method: 'POST', body: t }
                            )).json()
                        );
                    }.call(this)
                )
            );
        }),
        (r.prototype.setNewPassword = function(e, t) {
            return (
                void 0 === e && (e = {}),
                void 0 === t && (t = ''),
                o(
                    function*() {
                        var n =
                            'password=' +
                            e.password +
                            '&password_confirmation=' +
                            e.passwordConfirmation;
                        return yield fetch(this.config.API.setNewPassword(t), {
                            method: 'PUT',
                            body: n,
                            headers: {
                                'Content-Type': 'x-www-form-urlencoded',
                            },
                        });
                    }.call(this)
                )
            );
        }),
        (r.prototype.getAccountInfo = function(e) {
            return (
                void 0 === e && (e = ''),
                o(
                    function*() {
                        var t = yield (yield fetch(
                            this.config.API.getAccountInfo,
                            {
                                method: 'GET',
                                headers: { Authorization: 'Bearer ' + e },
                            }
                        )).json();
                        if (t) return t;
                    }.call(this)
                )
            );
        }),
        (r.prototype.getSocialLoginUrls = function(e) {
            return o(
                function*() {
                    return yield (yield fetch(this.config.API.social(e), {
                        method: 'GET',
                    })).json();
                }.call(this)
            );
        }),
        (r.prototype.updateAccount = function(e, t) {
            return (
                void 0 === e && (e = {}),
                void 0 === t && (t = ''),
                o(
                    function*() {
                        var n = '';
                        return (
                            Object.keys(e).forEach(function(t) {
                                'fullName' === t
                                    ? (n +=
                                          (n ? '&' : '') +
                                          'full_name' +
                                          '=' +
                                          e[t])
                                    : 'metadata' === t &&
                                      Object.keys(e[t]).forEach(function(o) {
                                          n +=
                                              (n ? '&' : '') +
                                              'medatada[' +
                                              o +
                                              ']=' +
                                              e[t][o];
                                      });
                            }),
                            yield (yield fetch(this.config.API.updateAccount, {
                                method: 'PUT',
                                body: n,
                                headers: {
                                    Authorization: 'Bearer ' + t,
                                    'Content-Type': 'x-www-form-urlencoded',
                                },
                            })).json()
                        );
                    }.call(this)
                )
            );
        }),
        (r.prototype.changePassword = function(e, t) {
            return (
                void 0 === e && (e = {}),
                void 0 === t && (t = ''),
                o(
                    function*() {
                        var n = new FormData();
                        return (
                            n.append('old_password', e.oldPassword),
                            n.append('password', e.password),
                            n.append(
                                'password_confirmation',
                                e.passwordConfirmation
                            ),
                            yield (yield fetch(this.config.API.changePassword, {
                                method: 'POST',
                                body: n,
                                headers: { Authorization: 'Bearer ' + t },
                            })).json()
                        );
                    }.call(this)
                )
            );
        }),
        (r.prototype.getRegisterFields = function(e) {
            return (
                void 0 === e && (e = ''),
                o(
                    function*() {
                        return yield (yield fetch(
                            this.config.API.getRegisterFields(e)
                        )).json();
                    }.call(this)
                )
            );
        });
    var i = function(e) {
        this.config = e;
    };
    (i.prototype.checkAccessForAsset = function(e, t) {
        return o(
            function*() {
                return yield (yield fetch(this.config.API.checkAccess(t), {
                    headers: { Authorization: 'Bearer ' + e },
                })).json();
            }.call(this)
        );
    }),
        (i.prototype.findAsset = function(e, t) {
            return o(
                function*() {
                    return yield (yield fetch(this.config.API.findAsset(e, t), {
                        method: 'GET',
                    })).json();
                }.call(this)
            );
        }),
        (i.prototype.findExternalAsset = function(e, t) {
            return o(
                function*() {
                    return yield (yield fetch(
                        this.config.API.findExternalAsset(e, t),
                        { method: 'GET' }
                    )).json();
                }.call(this)
            );
        }),
        (i.prototype.findPackage = function(e) {
            return o(
                function*() {
                    return yield (yield fetch(this.config.API.findPackage(e), {
                        method: 'GET',
                    })).json();
                }.call(this)
            );
        }),
        (i.prototype.getAssetAccessFees = function(e) {
            return o(
                function*() {
                    return yield (yield fetch(
                        this.config.API.findAccessFees(e),
                        { method: 'GET' }
                    )).json();
                }.call(this)
            );
        }),
        (i.prototype.getFreemiumAsset = function(e, t) {
            return o(
                function*() {
                    var n = new FormData();
                    return (
                        n.append('access_fee', t),
                        yield (yield fetch(this.config.API.freemium, {
                            method: 'POST',
                            headers: { Authorization: 'Bearer ' + e },
                            body: n,
                        })).json()
                    );
                }.call(this)
            );
        });
    var s = function(e) {
        this.config = e;
    };
    (s.prototype.getPaymentMethods = function(e) {
        return o(
            function*() {
                return yield (yield fetch(this.config.API.getPaymentMethods, {
                    headers: { Authorization: 'Bearer ' + e },
                })).json();
            }.call(this)
        );
    }),
        (s.prototype.getPaymentTools = function(e, t) {
            return o(
                function*() {
                    return yield (yield fetch(
                        this.config.API.getPaymentTools(t),
                        { headers: { Authorization: 'Bearer ' + e } }
                    )).json();
                }.call(this)
            );
        }),
        (s.prototype.payForAsset = function(e, t) {
            return (
                void 0 === e && (e = ''),
                void 0 === t && (t = {}),
                o(
                    function*() {
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
                            yield (yield fetch(this.config.API.payForAsset, {
                                method: 'POST',
                                headers: { Authorization: 'Bearer ' + e },
                                body: n,
                            })).json()
                        );
                    }.call(this)
                )
            );
        }),
        (s.prototype.getPayPalParams = function(e, t) {
            return (
                void 0 === e && (e = ''),
                void 0 === t && (t = {}),
                o(
                    function*() {
                        var n = new FormData();
                        return (
                            n.append('origin', t.origin),
                            n.append('access_fee', t.accessFeeId),
                            n.append('payment_method', t.paymentMethod),
                            n.append('voucher_code', t.voucherCode),
                            yield (yield fetch(
                                this.config.API.externalPayments,
                                {
                                    method: 'POST',
                                    headers: { Authorization: 'Bearer ' + e },
                                    body: n,
                                }
                            )).json()
                        );
                    }.call(this)
                )
            );
        });
    var a = function(e) {
        this.config = e;
    };
    (a.prototype.getSubscriptions = function(e) {
        return o(
            function*() {
                return (yield fetch(this.config.API.getSubscriptions, {
                    method: 'GET',
                    headers: { Authorization: 'Bearer ' + e },
                })).json();
            }.call(this)
        );
    }),
        (a.prototype.cancelSubscription = function(e, t) {
            return o(
                (function*() {
                    return (yield fetch(e, {
                        method: 'GET',
                        headers: { Authorization: 'Bearer ' + t },
                    })).json();
                })()
            );
        }),
        (a.prototype.assetSubscribe = function(e, t) {
            return (
                void 0 === e && (e = ''),
                void 0 === t && (t = {}),
                o(
                    function*() {
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
                            yield (yield fetch(this.config.API.subscribe, {
                                method: 'POST',
                                headers: { Authorization: 'Bearer ' + e },
                                body: n,
                            })).json()
                        );
                    }.call(this)
                )
            );
        });
    var c = function(e) {
        this.config = e;
    };
    (c.prototype.getDlcLinks = function(e, t) {
        return o(
            function*() {
                return yield (yield fetch(this.config.API.getDlcLinks(t), {
                    headers: { Authorization: 'Bearer ' + e },
                })).json();
            }.call(this)
        );
    }),
        (c.prototype.getDiscount = function(e, t) {
            return (
                void 0 === e && (e = ''),
                void 0 === t && (t = {}),
                o(
                    function*() {
                        var n = new FormData();
                        return (
                            n.append('access_fee_id', t.accessFeeId),
                            n.append('voucher_code', t.voucherCode),
                            n.append('merchant_id', t.merchantUuid),
                            yield (yield fetch(this.config.API.getDiscount, {
                                method: 'POST',
                                headers: { Authorization: 'Bearer ' + e },
                                body: n,
                            })).json()
                        );
                    }.call(this)
                )
            );
        }),
        (c.prototype.getBranding = function(e) {
            return o(
                function*() {
                    return yield (yield fetch(this.config.API.getBranding(e), {
                        method: 'GET',
                    })).json();
                }.call(this)
            );
        }),
        (c.prototype.downloadProtectedFile = function(e, t, n) {
            return o(
                function*() {
                    return yield (yield fetch(
                        this.config.API.downloadFile(t, n),
                        { headers: { Authorization: 'Bearer ' + e } }
                    )).json();
                }.call(this)
            );
        });
    var u =
        'undefined' != typeof window
            ? window
            : 'undefined' != typeof global
              ? global
              : 'undefined' != typeof self ? self : {};
    function f(e, t) {
        return e((t = { exports: {} }), t.exports), t.exports;
    }
    var d = f(function(e, t) {
            (function() {
                var e,
                    n,
                    o,
                    r,
                    i = {}.hasOwnProperty,
                    s = [].slice;
                (e = { LF: '\n', NULL: '\0' }),
                    (o = (function() {
                        var t;
                        function n(e, t, n) {
                            (this.command = e),
                                (this.headers = null != t ? t : {}),
                                (this.body = null != n ? n : '');
                        }
                        return (
                            (n.prototype.toString = function() {
                                var t, o, r, s, a;
                                (t = [this.command]),
                                    (r =
                                        !1 ===
                                        this.headers['content-length']) &&
                                        delete this.headers['content-length'],
                                    (a = this.headers);
                                for (o in a)
                                    i.call(a, o) &&
                                        ((s = a[o]), t.push(o + ':' + s));
                                return (
                                    this.body &&
                                        !r &&
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
                                var o,
                                    r,
                                    i,
                                    s,
                                    a,
                                    c,
                                    u,
                                    f,
                                    d,
                                    h,
                                    p,
                                    l,
                                    y,
                                    m,
                                    g,
                                    b,
                                    v;
                                for (
                                    s = t.search(RegExp('' + e.LF + e.LF)),
                                        i = (a = t
                                            .substring(0, s)
                                            .split(e.LF)).shift(),
                                        c = {},
                                        l = function(e) {
                                            return e.replace(/^\s+|\s+$/g, '');
                                        },
                                        y = 0,
                                        g = (b = a.reverse()).length;
                                    y < g;
                                    y++
                                )
                                    (f = (h = b[y]).indexOf(':')),
                                        (c[l(h.substring(0, f))] = l(
                                            h.substring(f + 1)
                                        ));
                                if (
                                    ((o = ''), (p = s + 2), c['content-length'])
                                )
                                    (d = parseInt(c['content-length'])),
                                        (o = ('' + t).substring(p, p + d));
                                else
                                    for (
                                        r = null, u = m = p, v = t.length;
                                        (p <= v ? m < v : m > v) &&
                                        (r = t.charAt(u)) !== e.NULL;
                                        u = p <= v ? ++m : --m
                                    )
                                        o += r;
                                return new n(i, c, o);
                            }),
                            (n.unmarshall = function(n) {
                                var o;
                                return (function() {
                                    var r, i, s, a;
                                    for (
                                        a = [],
                                            r = 0,
                                            i = (s = n.split(
                                                RegExp('' + e.NULL + e.LF + '*')
                                            )).length;
                                        r < i;
                                        r++
                                    )
                                        (null != (o = s[r])
                                            ? o.length
                                            : void 0) > 0 && a.push(t(o));
                                    return a;
                                })();
                            }),
                            (n.marshall = function(t, o, r) {
                                return new n(t, o, r).toString() + e.NULL;
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
                                var r;
                                for (
                                    r = o.marshall(e, t, n),
                                        'function' == typeof this.debug &&
                                            this.debug('>>> ' + r);
                                    ;

                                ) {
                                    if (
                                        !(r.length > this.maxWebSocketFrameSize)
                                    )
                                        return this.ws.send(r);
                                    this.ws.send(
                                        r.substring(
                                            0,
                                            this.maxWebSocketFrameSize
                                        )
                                    ),
                                        (r = r.substring(
                                            this.maxWebSocketFrameSize
                                        )),
                                        'function' == typeof this.debug &&
                                            this.debug(
                                                'remaining = ' + r.length
                                            );
                                }
                            }),
                            (n.prototype._setupHeartbeat = function(n) {
                                var o, i, s, a, c, u, f, d;
                                if (
                                    (c = n.version) === r.VERSIONS.V1_1 ||
                                    c === r.VERSIONS.V1_2
                                )
                                    return (
                                        (i = (u = (function() {
                                            var e, t, o, r;
                                            for (
                                                r = [],
                                                    e = 0,
                                                    t = (o = n[
                                                        'heart-beat'
                                                    ].split(',')).length;
                                                e < t;
                                                e++
                                            )
                                                (a = o[e]), r.push(parseInt(a));
                                            return r;
                                        })())[0]),
                                        (o = u[1]),
                                        0 !== this.heartbeat.outgoing &&
                                            0 !== o &&
                                            ((s = Math.max(
                                                this.heartbeat.outgoing,
                                                o
                                            )),
                                            'function' == typeof this.debug &&
                                                this.debug(
                                                    'send PING every ' +
                                                        s +
                                                        'ms'
                                                ),
                                            (this.pinger = r.setInterval(
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
                                              (this.ponger = r.setInterval(
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
                                var e, t, n, o;
                                switch (((o = {}),
                                (e =
                                    1 <= arguments.length
                                        ? s.call(arguments, 0)
                                        : []).length)) {
                                    case 2:
                                        (o = e[0]), (t = e[1]);
                                        break;
                                    case 3:
                                        e[1] instanceof Function
                                            ? ((o = e[0]),
                                              (t = e[1]),
                                              (n = e[2]))
                                            : ((o.login = e[0]),
                                              (o.passcode = e[1]),
                                              (t = e[2]));
                                        break;
                                    case 4:
                                        (o.login = e[0]),
                                            (o.passcode = e[1]),
                                            (t = e[2]),
                                            (n = e[3]);
                                        break;
                                    default:
                                        (o.login = e[0]),
                                            (o.passcode = e[1]),
                                            (t = e[2]),
                                            (n = e[3]),
                                            (o.host = e[4]);
                                }
                                return [o, t, n];
                            }),
                            (n.prototype.connect = function() {
                                var n, i, a, c, u, f, d;
                                return (
                                    (n =
                                        1 <= arguments.length
                                            ? s.call(arguments, 0)
                                            : []),
                                    (c = this._parseConnect.apply(this, n)),
                                    (a = c[0]),
                                    (this.connectCallback = c[1]),
                                    (i = c[2]),
                                    'function' == typeof this.debug &&
                                        this.debug('Opening Web Socket...'),
                                    (this.ws.onmessage = ((u = this),
                                    function(n) {
                                        var r, s, a, c, f, d, h, p, l, y, m, g;
                                        if (
                                            ((c =
                                                'undefined' !=
                                                    typeof ArrayBuffer &&
                                                n.data instanceof ArrayBuffer
                                                    ? ((r = new Uint8Array(
                                                          n.data
                                                      )),
                                                      'function' ==
                                                          typeof u.debug &&
                                                          u.debug(
                                                              '--- got data length: ' +
                                                                  r.length
                                                          ),
                                                      (function() {
                                                          var e, t, n;
                                                          for (
                                                              n = [],
                                                                  e = 0,
                                                                  t = r.length;
                                                              e < t;
                                                              e++
                                                          )
                                                              (s = r[e]),
                                                                  n.push(
                                                                      String.fromCharCode(
                                                                          s
                                                                      )
                                                                  );
                                                          return n;
                                                      })().join(''))
                                                    : n.data),
                                            (u.serverActivity = t()),
                                            c !== e.LF)
                                        ) {
                                            for (
                                                'function' == typeof u.debug &&
                                                    u.debug('<<< ' + c),
                                                    g = [],
                                                    l = 0,
                                                    y = (m = o.unmarshall(c))
                                                        .length;
                                                l < y;
                                                l++
                                            )
                                                switch ((f = m[l]).command) {
                                                    case 'CONNECTED':
                                                        'function' ==
                                                            typeof u.debug &&
                                                            u.debug(
                                                                'connected to server ' +
                                                                    f.headers
                                                                        .server
                                                            ),
                                                            (u.connected = !0),
                                                            u._setupHeartbeat(
                                                                f.headers
                                                            ),
                                                            g.push(
                                                                'function' ==
                                                                typeof u.connectCallback
                                                                    ? u.connectCallback(
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
                                                                u.subscriptions[
                                                                    p
                                                                ] ||
                                                                u.onreceive)
                                                                ? ((a = u),
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
                                                                              p,
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
                                                                              p,
                                                                              e
                                                                          )
                                                                      );
                                                                  }),
                                                                  g.push(h(f)))
                                                                : g.push(
                                                                      'function' ==
                                                                      typeof u.debug
                                                                          ? u.debug(
                                                                                'Unhandled received MESSAGE: ' +
                                                                                    f
                                                                            )
                                                                          : void 0
                                                                  );
                                                        break;
                                                    case 'RECEIPT':
                                                        g.push(
                                                            'function' ==
                                                            typeof u.onreceipt
                                                                ? u.onreceipt(f)
                                                                : void 0
                                                        );
                                                        break;
                                                    case 'ERROR':
                                                        g.push(
                                                            'function' ==
                                                            typeof i
                                                                ? i(f)
                                                                : void 0
                                                        );
                                                        break;
                                                    default:
                                                        g.push(
                                                            'function' ==
                                                            typeof u.debug
                                                                ? u.debug(
                                                                      'Unhandled frame: ' +
                                                                          f
                                                                  )
                                                                : void 0
                                                        );
                                                }
                                            return g;
                                        }
                                        'function' == typeof u.debug &&
                                            u.debug('<<< PONG');
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
                                            ] = r.VERSIONS.supportedVersions()),
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
                                    this.pinger && r.clearInterval(this.pinger),
                                    this.ponger)
                                )
                                    return r.clearInterval(this.ponger);
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
                                var o;
                                return (
                                    null == n && (n = {}),
                                    n.id || (n.id = 'sub-' + this.counter++),
                                    (n.destination = e),
                                    (this.subscriptions[n.id] = t),
                                    this._transmit('SUBSCRIBE', n),
                                    (o = this),
                                    {
                                        id: n.id,
                                        unsubscribe: function() {
                                            return o.unsubscribe(n.id);
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
                    (r = {
                        VERSIONS: {
                            V1_0: '1.0',
                            V1_1: '1.1',
                            V1_2: '1.2',
                            supportedVersions: function() {
                                return '1.1,1.0';
                            },
                        },
                        client: function(e, t) {
                            var o;
                            return (
                                null == t && (t = ['v10.stomp', 'v11.stomp']),
                                (o = new (r.WebSocketClass || WebSocket)(e, t)),
                                new n(o)
                            );
                        },
                        over: function(e) {
                            return new n(e);
                        },
                        Frame: o,
                    }),
                    null !== t && (t.Stomp = r),
                    'undefined' != typeof window && null !== window
                        ? ((r.setInterval = function(e, t) {
                              return window.setInterval(t, e);
                          }),
                          (r.clearInterval = function(e) {
                              return window.clearInterval(e);
                          }),
                          (window.Stomp = r))
                        : t || (self.Stomp = r);
            }.call(u));
        }),
        h = (d.Stomp,
        f(function(e, o) {
            (function() {
                var e, r, i, s, a, c;
                (r = t),
                    ((e = d).Stomp.setInterval = function(e, t) {
                        return setInterval(t, e);
                    }),
                    (e.Stomp.clearInterval = function(e) {
                        return clearInterval(e);
                    }),
                    (a = function(e, t) {
                        var n, o;
                        return (
                            (n = null),
                            (o = {
                                url: 'tcp:// ' + t + ':' + e,
                                send: function(e) {
                                    return n.write(e);
                                },
                                close: function() {
                                    return n.end();
                                },
                            }),
                            (n = r.connect(e, t, function(e) {
                                return o.onopen();
                            })).on('error', function(e) {
                                return 'function' == typeof o.onclose
                                    ? o.onclose(e)
                                    : void 0;
                            }),
                            n.on('close', function(e) {
                                return 'function' == typeof o.onclose
                                    ? o.onclose(e)
                                    : void 0;
                            }),
                            n.on('data', function(e) {
                                var t;
                                return (
                                    (t = { data: e.toString() }), o.onmessage(t)
                                );
                            }),
                            o
                        );
                    }),
                    (c = function(e) {
                        var t, o, r, i;
                        return (
                            (t = n.client),
                            (o = null),
                            (i = {
                                url: e,
                                send: function(e) {
                                    return o.sendUTF(e);
                                },
                                close: function() {
                                    return o.close();
                                },
                            }),
                            (r = new t()).on('connect', function(e) {
                                return (
                                    (o = e),
                                    i.onopen(),
                                    o.on('error', function(e) {
                                        return 'function' == typeof i.onclose
                                            ? i.onclose(e)
                                            : void 0;
                                    }),
                                    o.on('close', function() {
                                        return 'function' == typeof i.onclose
                                            ? i.onclose()
                                            : void 0;
                                    }),
                                    o.on('message', function(e) {
                                        var t;
                                        if ('utf8' === e.type)
                                            return (
                                                (t = { data: e.utf8Data }),
                                                i.onmessage(t)
                                            );
                                    })
                                );
                            }),
                            r.connect(e),
                            i
                        );
                    }),
                    (i = function(t, n) {
                        var o;
                        return (o = a(n, t)), e.Stomp.over(o);
                    }),
                    (s = function(t) {
                        var n;
                        return (n = c(t)), e.Stomp.over(n);
                    }),
                    (o.overTCP = i),
                    (o.overWS = s);
            }.call(u));
        })),
        p = (h.net, h.websocket, h.overTCP, h.overWS, d.Stomp),
        l = h.overTCP,
        y = h.overWS;
    (p.overTCP = l), (p.overWS = y);
    var m = window && (window.WebSocket || window.MozWebSocket),
        g = function(e) {
            (this.subscription = null), (this.config = e);
        };
    (g.prototype.subscribe = function(e, t) {
        if (!e && '' !== e) return !1;
        if (t && t.onmessage) {
            if ('function' != typeof t.onmessage) return !1;
        } else
            t.onMessage = function(e) {
                return console.log('Received message:', e);
            };
        if (t && t.onopen && 'function' != typeof t.onopen) return !1;
        var n = this,
            o = {
                login: this.config.stomp.login,
                passcode: this.config.stomp.password,
                'client-id': e,
            },
            r = new m(this.config.stomp.url);
        (this.client = p.over(r)),
            (this.client.heartbeat.outgoing = 3e4),
            (this.client.heartbeat.incoming = 3e4),
            (this.client.debug = null),
            this.client.connect(
                o,
                function() {
                    return n.connectCallback(t, n.client, e);
                },
                function(r) {
                    'string' == typeof r &&
                        n.errorCallback(t, n.config, n.client, o, e, n);
                }
            ),
            this.setClient(this.client);
    }),
        (g.prototype.connectCallback = function(e, t, n) {
            if ((e && e.onopen && e.onopen(), t.ws.readyState === t.ws.OPEN))
                t.subscribe('/exchange/notifications/' + n, e.onmessage, {
                    id: n,
                    ack: 'client',
                });
        }),
        (g.prototype.errorCallback = function(e, t, n, o, r, i, s) {
            void 0 === s && (s = 0),
                0 === s && (s = 1e3 * (Math.floor(6 * Math.random()) + 1)),
                setTimeout(function() {
                    if (
                        n.ws.readyState !== n.ws.CONNECTING &&
                        n.ws.readyState !== n.ws.OPEN
                    ) {
                        var a = new m(t.stomp.url);
                        ((n = new p.over(a)).heartbeat.outgoing = 3e4),
                            (n.heartbeat.incoming = 3e4),
                            (n.debug = null),
                            n.connect(
                                o,
                                function() {
                                    i.connectCallback(e, n, r),
                                        (s =
                                            1e3 *
                                            (Math.floor(6 * Math.random()) +
                                                1));
                                },
                                function(a) {
                                    'string' == typeof a &&
                                        i.errorCallback(e, t, n, o, r, i, s);
                                }
                            );
                    }
                }, s),
                s >= 6e5
                    ? (s = 1e3 * (Math.floor(6 * Math.random()) + 1))
                    : (s += Math.ceil(s / 2));
        }),
        (g.prototype.setClient = function(e) {
            this.subscription = e;
        }),
        (g.prototype.unsubscribe = function() {
            this.subscription &&
                this.subscription.connected &&
                this.subscription.unsubscribe();
        });
    var b = {
            BASE_URL: 'https://services.inplayer.com',
            INPLAYER_TOKEN_NAME: 'inplayer_token',
            stomp: {
                url: 'wss://notify.inplayer.com:61614/ws',
                login: 'notifications',
                password: 'notifications',
            },
        },
        v = function(e) {
            return {
                signIn: e.BASE_URL + '/accounts/login',
                signOut: e.BASE_URL + '/accounts/logout',
                signUp: e.BASE_URL + '/accounts',
                requestNewPassword: e.BASE_URL + '/accounts/forgot-password',
                setNewPassword: function(t) {
                    return e.BASE_URL + '/accounts/forgot-password/' + t;
                },
                getAccountInfo: e.BASE_URL + '/accounts',
                social: function(t) {
                    return e.BASE_URL + '/accounts/social?state=' + t;
                },
                updateAccount: e.BASE_URL + '/accounts',
                changePassword: e.BASE_URL + '/accounts/change-password',
                getRegisterFields: function(t) {
                    return e.BASE_URL + '/accounts/register-fields/' + t;
                },
                checkAccess: function(t) {
                    return e.BASE_URL + '/items/' + t + '/access';
                },
                findAsset: function(t, n) {
                    return e.BASE_URL + '/items/' + n + '/' + t;
                },
                findExternalAsset: function(t, n) {
                    return e.BASE_URL + '/items/assets/external/' + t + '/' + n;
                },
                findPackage: function(t) {
                    return e.BASE_URL + '/items/packages/' + t;
                },
                findAccessFees: function(t) {
                    return e.BASE_URL + '/items/' + t + '/access-fees';
                },
                freemium: e.BASE_URL + '/items/access/unlimited',
                getPaymentMethods: e.BASE_URL + '/payments/methods',
                getPaymentTools: function(t) {
                    return e.BASE_URL + '/payments/method/' + t + '/tools';
                },
                payForAsset: e.BASE_URL + '/payments',
                externalPayments: e.BASE_URL + '/external-payments',
                getSubscriptions: e.BASE_URL + '/subscriptions',
                subscribe: e.BASE_URL + '/subscriptions',
                getDlcLinks: function(t) {
                    return e.BASE_URL + '/dlc/' + t + '/links';
                },
                getDiscount: e.BASE_URL + '/vouchers/discount',
                getBranding: function(t) {
                    return e.BASE_URL + '/branding/paywall/' + t;
                },
                downloadFile: function(t, n) {
                    return e.BASE_URL + '/dlc/' + t + '/' + n;
                },
            };
        },
        w = function() {
            (this.config = b),
                (this.config.API = v(b)),
                (this.User = new r(this.config)),
                (this.Asset = new i(this.config)),
                (this.Payment = new s(this.config)),
                (this.Subscription = new a(this.config)),
                (this.Misc = new c(this.config)),
                (this.Socket = new g(this.config));
        };
    return (
        (w.prototype.subscribe = function(e, t) {
            return (
                !!this.User.isSignedIn() && (this.Socket.subscribe(e, t), !0)
            );
        }),
        (w.prototype.unsubscribe = function() {
            this.Socket.unsubscribe();
        }),
        (w.prototype.setConfig = function(e) {
            switch (e) {
                case 'prod':
                    (this.config.BASE_URL = 'https://services.inplayer.com'),
                        (this.config.stomp.url =
                            'wss://notify.inplayer.com:15671/ws');
                    break;
                case 'develop':
                case 'sandbox':
                    (this.config.BASE_URL = 'https://staging-v2.inplayer.com'),
                        (this.config.stomp.url =
                            'ws://staging-v2.inplayer.com:15674/ws');
            }
            this.config.API = v(this.config);
        }),
        new w()
    );
});
