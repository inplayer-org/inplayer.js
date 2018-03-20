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
                (d.prototype.append = function(e, t) {
                    (e = a(e)), (t = c(t));
                    var n = this.map[e];
                    this.map[e] = n ? n + ',' + t : t;
                }),
                    (d.prototype.delete = function(e) {
                        delete this.map[a(e)];
                    }),
                    (d.prototype.get = function(e) {
                        return (e = a(e)), this.has(e) ? this.map[e] : null;
                    }),
                    (d.prototype.has = function(e) {
                        return this.map.hasOwnProperty(a(e));
                    }),
                    (d.prototype.set = function(e, t) {
                        this.map[a(e)] = c(t);
                    }),
                    (d.prototype.forEach = function(e, t) {
                        for (var n in this.map)
                            this.map.hasOwnProperty(n) &&
                                e.call(t, this.map[n], n, this);
                    }),
                    (d.prototype.keys = function() {
                        var e = [];
                        return (
                            this.forEach(function(t, n) {
                                e.push(n);
                            }),
                            u(e)
                        );
                    }),
                    (d.prototype.values = function() {
                        var e = [];
                        return (
                            this.forEach(function(t) {
                                e.push(t);
                            }),
                            u(e)
                        );
                    }),
                    (d.prototype.entries = function() {
                        var e = [];
                        return (
                            this.forEach(function(t, n) {
                                e.push([n, t]);
                            }),
                            u(e)
                        );
                    }),
                    t.iterable &&
                        (d.prototype[Symbol.iterator] = d.prototype.entries);
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
                            headers: new d(this.headers),
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
                    (e.Headers = d),
                    (e.Request = m),
                    (e.Response = b),
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
                                        (t = new d()),
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
                                r(new b(o, n));
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
            function d(e) {
                (this.map = {}),
                    e instanceof d
                        ? e.forEach(function(e, t) {
                              this.append(t, e);
                          }, this)
                        : Array.isArray(e)
                            ? e.forEach(function(e) {
                                  this.append(e[0], e[1]);
                              }, this)
                            : e &&
                              Object.getOwnPropertyNames(e).forEach(function(
                                  t
                              ) {
                                  this.append(t, e[t]);
                              },
                              this);
            }
            function h(e) {
                if (e.bodyUsed)
                    return Promise.reject(new TypeError('Already read'));
                e.bodyUsed = !0;
            }
            function f(e) {
                return new Promise(function(t, n) {
                    (e.onload = function() {
                        t(e.result);
                    }),
                        (e.onerror = function() {
                            n(e.error);
                        });
                });
            }
            function l(e) {
                var t = new FileReader(),
                    n = f(t);
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
                            var e = h(this);
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
                                ? h(this) ||
                                      Promise.resolve(this._bodyArrayBuffer)
                                : this.blob().then(l);
                        })),
                    (this.text = function() {
                        var e,
                            t,
                            n,
                            r = h(this);
                        if (r) return r;
                        if (this._bodyBlob)
                            return (
                                (e = this._bodyBlob),
                                (t = new FileReader()),
                                (n = f(t)),
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
                    r,
                    o = (t = t || {}).body;
                if (e instanceof m) {
                    if (e.bodyUsed) throw new TypeError('Already read');
                    (this.url = e.url),
                        (this.credentials = e.credentials),
                        t.headers || (this.headers = new d(e.headers)),
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
                        (this.headers = new d(t.headers)),
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
            function g(e) {
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
            function b(e, t) {
                t || (t = {}),
                    (this.type = 'default'),
                    (this.status = 'status' in t ? t.status : 200),
                    (this.ok = this.status >= 200 && this.status < 300),
                    (this.statusText = 'statusText' in t ? t.statusText : 'OK'),
                    (this.headers = new d(t.headers)),
                    (this.url = t.url || ''),
                    this._initBody(e);
            }
        })(self);
    self.fetch.bind(self);
    function r(e) {
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
    class o {
        constructor(e) {
            this.config = e;
        }
        signIn(e = {}) {
            return r(
                function*() {
                    const t = new FormData();
                    t.append('email', e.email),
                        t.append('password', e.password),
                        t.append('merchant_uuid', e.merchantUuid),
                        t.append('referrer', e.referrer);
                    const n = yield (yield fetch(this.config.API.signIn, {
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
            );
        }
        signOut() {
            return r(
                function*() {
                    const e = localStorage.getItem(
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
        }
        signUp(e = {}) {
            return r(
                function*() {
                    const t = new FormData();
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
            );
        }
        isSignedIn() {
            return (
                void 0 !== localStorage.getItem(this.config.INPLAYER_TOKEN_NAME)
            );
        }
        token() {
            return localStorage.getItem(this.config.INPLAYER_TOKEN_NAME);
        }
        setTokenInCookie(e = '') {
            localStorage.setItem(this.config.INPLAYER_TOKEN_NAME, e);
        }
        requestNewPassword(e = {}) {
            return r(
                function*() {
                    const t = new FormData();
                    return (
                        t.append('email', e.email),
                        t.append('merchant_uuid', e.merchantUuid),
                        yield (yield fetch(this.config.API.requestNewPassword, {
                            method: 'POST',
                            body: t,
                        })).json()
                    );
                }.call(this)
            );
        }
        setNewPassword(e = {}, t = '') {
            return r(
                function*() {
                    const n = `password=${e.password}&password_confirmation=${
                        e.passwordConfirmation
                    }`;
                    return yield fetch(this.config.API.setNewPassword(t), {
                        method: 'PUT',
                        body: n,
                        headers: { 'Content-Type': 'x-www-form-urlencoded' },
                    });
                }.call(this)
            );
        }
        getAccountInfo(e = '') {
            return r(
                function*() {
                    const t = yield (yield fetch(
                        this.config.API.getAccountInfo,
                        {
                            method: 'GET',
                            headers: { Authorization: 'Bearer ' + e },
                        }
                    )).json();
                    if (t) return t;
                }.call(this)
            );
        }
        getSocialLoginUrls(e) {
            return r(
                function*() {
                    return yield (yield fetch(this.config.API.social(e), {
                        method: 'GET',
                    })).json();
                }.call(this)
            );
        }
        updateAccount(e = {}, t = '') {
            return r(
                function*() {
                    let n = '';
                    return (
                        Object.keys(e).forEach(function(t) {
                            let r = '';
                            'fullName' === t
                                ? (n +=
                                      (n ? '&' : '') +
                                      `${(r = 'full_name')}=${e[t]}`)
                                : 'metadata' === t &&
                                  Object.keys(e[t]).forEach(r => {
                                      n +=
                                          (n ? '&' : '') +
                                          `metadata[${r}]=${e[t][r]}`;
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
            );
        }
        changePassword(e = {}, t = '') {
            return r(
                function*() {
                    const n = new FormData();
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
            );
        }
        getRegisterFields(e = '') {
            return r(
                function*() {
                    return yield (yield fetch(
                        this.config.API.getRegisterFields(e)
                    )).json();
                }.call(this)
            );
        }
    }
    class i {
        constructor(e) {
            this.config = e;
        }
        checkAccessForAsset(e, t) {
            return r(
                function*() {
                    return yield (yield fetch(this.config.API.checkAccess(t), {
                        headers: { Authorization: 'Bearer ' + e },
                    })).json();
                }.call(this)
            );
        }
        findAsset(e, t) {
            return r(
                function*() {
                    return yield (yield fetch(this.config.API.findAsset(e, t), {
                        method: 'GET',
                    })).json();
                }.call(this)
            );
        }
        findExternalAsset(e, t) {
            return r(
                function*() {
                    return yield (yield fetch(
                        this.config.API.findExternalAsset(e, t),
                        { method: 'GET' }
                    )).json();
                }.call(this)
            );
        }
        findPackage(e) {
            return r(
                function*() {
                    return yield (yield fetch(this.config.API.findPackage(e), {
                        method: 'GET',
                    })).json();
                }.call(this)
            );
        }
        getAssetAccessFees(e) {
            return r(
                function*() {
                    return yield (yield fetch(
                        this.config.API.findAccessFees(e),
                        { method: 'GET' }
                    )).json();
                }.call(this)
            );
        }
        getFreemiumAsset(e, t) {
            return r(
                function*() {
                    const n = new FormData();
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
        }
    }
    class s {
        constructor(e) {
            this.config = e;
        }
        getPaymentMethods(e) {
            return r(
                function*() {
                    return yield (yield fetch(
                        this.config.API.getPaymentMethods,
                        { headers: { Authorization: 'Bearer ' + e } }
                    )).json();
                }.call(this)
            );
        }
        getPaymentTools(e, t) {
            return r(
                function*() {
                    return yield (yield fetch(
                        this.config.API.getPaymentTools(t),
                        { headers: { Authorization: 'Bearer ' + e } }
                    )).json();
                }.call(this)
            );
        }
        payForAsset(e = '', t = {}) {
            return r(
                function*() {
                    const n = new FormData();
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
            );
        }
        getPayPalParams(e = '', t = {}) {
            return r(
                function*() {
                    const n = new FormData();
                    return (
                        n.append('origin', t.origin),
                        n.append('access_fee', t.accessFeeId),
                        n.append('payment_method', t.paymentMethod),
                        n.append('voucher_code', t.voucherCode),
                        yield (yield fetch(this.config.API.externalPayments, {
                            method: 'POST',
                            headers: { Authorization: 'Bearer ' + e },
                            body: n,
                        })).json()
                    );
                }.call(this)
            );
        }
    }
    class a {
        constructor(e) {
            this.config = e;
        }
        getSubscriptions(e) {
            return r(
                function*() {
                    return (yield fetch(this.config.API.getSubscriptions, {
                        method: 'GET',
                        headers: { Authorization: 'Bearer ' + e },
                    })).json();
                }.call(this)
            );
        }
        cancelSubscription(e, t) {
            return r(
                (function*() {
                    return (yield fetch(e, {
                        method: 'GET',
                        headers: { Authorization: 'Bearer ' + t },
                    })).json();
                })()
            );
        }
        assetSubscribe(e = '', t = {}) {
            return r(
                function*() {
                    const n = new FormData();
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
            );
        }
    }
    class c {
        constructor(e) {
            this.config = e;
        }
        getDlcLinks(e, t) {
            return r(
                function*() {
                    return yield (yield fetch(this.config.API.getDlcLinks(t), {
                        headers: { Authorization: 'Bearer ' + e },
                    })).json();
                }.call(this)
            );
        }
        getDiscount(e = '', t = {}) {
            return r(
                function*() {
                    const n = new FormData();
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
            );
        }
        getBranding(e) {
            return r(
                function*() {
                    return yield (yield fetch(this.config.API.getBranding(e), {
                        method: 'GET',
                    })).json();
                }.call(this)
            );
        }
        downloadProtectedFile(e, t, n) {
            return r(
                function*() {
                    return yield (yield fetch(
                        this.config.API.downloadFile(t, n),
                        { headers: { Authorization: 'Bearer ' + e } }
                    )).json();
                }.call(this)
            );
        }
    }
    var u =
        'undefined' != typeof window
            ? window
            : 'undefined' != typeof global
                ? global
                : 'undefined' != typeof self ? self : {};
    function d(e, t) {
        return e((t = { exports: {} }), t.exports), t.exports;
    }
    var h = d(function(e, t) {
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
                                for (r in ((t = [this.command]),
                                (o = !1 === this.headers['content-length']) &&
                                    delete this.headers['content-length'],
                                (a = this.headers)))
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
                                    c,
                                    u,
                                    d,
                                    h,
                                    f,
                                    l,
                                    p,
                                    y,
                                    m,
                                    g,
                                    b,
                                    w;
                                for (
                                    s = t.search(RegExp('' + e.LF + e.LF)),
                                        i = (a = t
                                            .substring(0, s)
                                            .split(e.LF)).shift(),
                                        c = {},
                                        p = function(e) {
                                            return e.replace(/^\s+|\s+$/g, '');
                                        },
                                        y = 0,
                                        g = (b = a.reverse()).length;
                                    y < g;
                                    y++
                                )
                                    (d = (f = b[y]).indexOf(':')),
                                        (c[p(f.substring(0, d))] = p(
                                            f.substring(d + 1)
                                        ));
                                if (
                                    ((r = ''), (l = s + 2), c['content-length'])
                                )
                                    (h = parseInt(c['content-length'])),
                                        (r = ('' + t).substring(l, l + h));
                                else
                                    for (
                                        o = null, u = m = l, w = t.length;
                                        (l <= w ? m < w : m > w) &&
                                        (o = t.charAt(u)) !== e.NULL;
                                        u = l <= w ? ++m : --m
                                    )
                                        r += o;
                                return new n(i, c, r);
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
                                var r, i, s, a, c, u, d;
                                if (
                                    (c = n.version) === o.VERSIONS.V1_1 ||
                                    c === o.VERSIONS.V1_2
                                )
                                    return (
                                        (i = (u = (function() {
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
                                        (r = u[1]),
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
                                                ((d = this),
                                                function() {
                                                    return (
                                                        d.ws.send(e.LF),
                                                        'function' ==
                                                        typeof d.debug
                                                            ? d.debug(
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
                                                  (function(e) {
                                                      return function() {
                                                          var n;
                                                          if (
                                                              (n =
                                                                  t() -
                                                                  e.serverActivity) >
                                                              2 * s
                                                          )
                                                              return (
                                                                  'function' ==
                                                                      typeof e.debug &&
                                                                      e.debug(
                                                                          'did not receive server activity for the last ' +
                                                                              n +
                                                                              'ms'
                                                                      ),
                                                                  e.ws.close()
                                                              );
                                                      };
                                                  })(this)
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
                                var n, i, a, c, u;
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
                                        var o, s, a, c, d, h, f, l, p, y, m, g;
                                        if (
                                            ((c =
                                                'undefined' !=
                                                    typeof ArrayBuffer &&
                                                n.data instanceof ArrayBuffer
                                                    ? ((o = new Uint8Array(
                                                          n.data
                                                      )),
                                                      'function' ==
                                                          typeof u.debug &&
                                                          u.debug(
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
                                            (u.serverActivity = t()),
                                            c !== e.LF)
                                        ) {
                                            for (
                                                'function' == typeof u.debug &&
                                                    u.debug('<<< ' + c),
                                                    g = [],
                                                    p = 0,
                                                    y = (m = r.unmarshall(c))
                                                        .length;
                                                p < y;
                                                p++
                                            )
                                                switch ((d = m[p]).command) {
                                                    case 'CONNECTED':
                                                        'function' ==
                                                            typeof u.debug &&
                                                            u.debug(
                                                                'connected to server ' +
                                                                    d.headers
                                                                        .server
                                                            ),
                                                            (u.connected = !0),
                                                            u._setupHeartbeat(
                                                                d.headers
                                                            ),
                                                            g.push(
                                                                'function' ==
                                                                typeof u.connectCallback
                                                                    ? u.connectCallback(
                                                                          d
                                                                      )
                                                                    : void 0
                                                            );
                                                        break;
                                                    case 'MESSAGE':
                                                        (l =
                                                            d.headers
                                                                .subscription),
                                                            (f =
                                                                u.subscriptions[
                                                                    l
                                                                ] ||
                                                                u.onreceive)
                                                                ? ((a = u),
                                                                  (h =
                                                                      d.headers[
                                                                          'message-id'
                                                                      ]),
                                                                  (d.ack = function(
                                                                      e
                                                                  ) {
                                                                      return (
                                                                          null ==
                                                                              e &&
                                                                              (e = {}),
                                                                          a.ack(
                                                                              h,
                                                                              l,
                                                                              e
                                                                          )
                                                                      );
                                                                  }),
                                                                  (d.nack = function(
                                                                      e
                                                                  ) {
                                                                      return (
                                                                          null ==
                                                                              e &&
                                                                              (e = {}),
                                                                          a.nack(
                                                                              h,
                                                                              l,
                                                                              e
                                                                          )
                                                                      );
                                                                  }),
                                                                  g.push(f(d)))
                                                                : g.push(
                                                                      'function' ==
                                                                      typeof u.debug
                                                                          ? u.debug(
                                                                                'Unhandled received MESSAGE: ' +
                                                                                    d
                                                                            )
                                                                          : void 0
                                                                  );
                                                        break;
                                                    case 'RECEIPT':
                                                        g.push(
                                                            'function' ==
                                                            typeof u.onreceipt
                                                                ? u.onreceipt(d)
                                                                : void 0
                                                        );
                                                        break;
                                                    case 'ERROR':
                                                        g.push(
                                                            'function' ==
                                                            typeof i
                                                                ? i(d)
                                                                : void 0
                                                        );
                                                        break;
                                                    default:
                                                        g.push(
                                                            'function' ==
                                                            typeof u.debug
                                                                ? u.debug(
                                                                      'Unhandled frame: ' +
                                                                          d
                                                                  )
                                                                : void 0
                                                        );
                                                }
                                            return g;
                                        }
                                        'function' == typeof u.debug &&
                                            u.debug('<<< PONG');
                                    })),
                                    (this.ws.onclose = (function(e) {
                                        return function() {
                                            var t;
                                            return (
                                                (t =
                                                    'Whoops! Lost connection to ' +
                                                    e.ws.url),
                                                'function' == typeof e.debug &&
                                                    e.debug(t),
                                                e._cleanUp(),
                                                'function' == typeof i
                                                    ? i(t)
                                                    : void 0
                                            );
                                        };
                                    })(this)),
                                    (this.ws.onopen = (function(e) {
                                        return function() {
                                            return (
                                                'function' == typeof e.debug &&
                                                    e.debug(
                                                        'Web Socket Opened...'
                                                    ),
                                                (a[
                                                    'accept-version'
                                                ] = o.VERSIONS.supportedVersions()),
                                                (a['heart-beat'] = [
                                                    e.heartbeat.outgoing,
                                                    e.heartbeat.incoming,
                                                ].join(',')),
                                                e._transmit('CONNECT', a)
                                            );
                                        };
                                    })(this))
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
            }.call(u));
        }),
        f = (h.Stomp,
        d(function(e, r) {
            (function() {
                var e, o, i, s, a, c;
                (o = t),
                    ((e = h).Stomp.setInterval = function(e, t) {
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
                    (c = function(e) {
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
                        return (n = c(t)), e.Stomp.over(n);
                    }),
                    (r.overTCP = i),
                    (r.overWS = s);
            }.call(u));
        })),
        l = (f.net, f.websocket, f.overTCP, f.overWS, h.Stomp),
        p = f.overTCP,
        y = f.overWS;
    (l.overTCP = p), (l.overWS = y);
    var m = window && (window.WebSocket || window.MozWebSocket);
    const g = 6e5,
        b = 6;
    class w {
        constructor(e) {
            (this.subscription = null), (this.config = e);
        }
        subscribe(e, t) {
            if (!e && '' !== e) return !1;
            if (t && t.onmessage) {
                if ('function' != typeof t.onmessage) return !1;
            } else t.onMessage = e => console.log('Received message:', e);
            if (t && t.onopen && 'function' != typeof t.onopen) return !1;
            var n = this,
                r = {
                    login: this.config.stomp.login,
                    passcode: this.config.stomp.password,
                    'client-id': e,
                };
            const o = new m(this.config.stomp.url);
            (this.client = l.over(o)),
                (this.client.heartbeat.outgoing = 3e4),
                (this.client.heartbeat.incoming = 3e4),
                (this.client.debug = null),
                this.client.connect(
                    r,
                    () => n.connectCallback(t, n.client, e),
                    o => {
                        'string' == typeof o &&
                            n.errorCallback(t, n.config, n.client, r, e, n);
                    }
                ),
                this.setClient(this.client);
        }
        connectCallback(e, t, n) {
            if ((e && e.onopen && e.onopen(), t.ws.readyState === t.ws.OPEN)) {
                t.subscribe('/exchange/notifications/' + n, e.onmessage, {
                    id: n,
                    ack: 'client',
                });
            }
        }
        errorCallback(e, t, n, r, o, i, s = 0) {
            0 === s && (s = 1e3 * (Math.floor(Math.random() * b) + 1)),
                setTimeout(function() {
                    if (
                        n.ws.readyState !== n.ws.CONNECTING &&
                        n.ws.readyState !== n.ws.OPEN
                    ) {
                        var a = new m(t.stomp.url);
                        ((n = new l.over(a)).heartbeat.outgoing = 3e4),
                            (n.heartbeat.incoming = 3e4),
                            (n.debug = null),
                            n.connect(
                                r,
                                () => {
                                    i.connectCallback(e, n, o),
                                        (s =
                                            1e3 *
                                            (Math.floor(Math.random() * b) +
                                                1));
                                },
                                a => {
                                    'string' == typeof a &&
                                        i.errorCallback(e, t, n, r, o, i, s);
                                }
                            );
                    }
                }, s),
                s >= g
                    ? (s = 1e3 * (Math.floor(Math.random() * b) + 1))
                    : (s += Math.ceil(s / 2));
        }
        setClient(e) {
            this.subscription = e;
        }
        unsubscribe() {
            this.subscription &&
                this.subscription.connected &&
                this.subscription.unsubscribe();
        }
    }
    const v = {
            BASE_URL: 'https://services.inplayer.com',
            INPLAYER_TOKEN_NAME: 'inplayer_token',
            stomp: {
                url: 'wss://notify.inplayer.com:61614/ws',
                login: 'notifications',
                password: 'notifications',
            },
        },
        A = e => ({
            signIn: `${e.BASE_URL}/accounts/login`,
            signOut: `${e.BASE_URL}/accounts/logout`,
            signUp: `${e.BASE_URL}/accounts`,
            requestNewPassword: `${e.BASE_URL}/accounts/forgot-password`,
            setNewPassword: t => `${e.BASE_URL}/accounts/forgot-password/${t}`,
            getAccountInfo: `${e.BASE_URL}/accounts`,
            social: t => `${e.BASE_URL}/accounts/social?state=${t}`,
            updateAccount: `${e.BASE_URL}/accounts`,
            changePassword: `${e.BASE_URL}/accounts/change-password`,
            getRegisterFields: t =>
                `${e.BASE_URL}/accounts/register-fields/${t}`,
            checkAccess: t => `${e.BASE_URL}/items/${t}/access`,
            findAsset: (t, n) => `${e.BASE_URL}/items/${n}/${t}`,
            findExternalAsset: (t, n) =>
                `${e.BASE_URL}/items/assets/external/${t}/${n}`,
            findPackage: t => `${e.BASE_URL}/items/packages/${t}`,
            findAccessFees: t => `${e.BASE_URL}/items/${t}/access-fees`,
            freemium: `${e.BASE_URL}/items/access/unlimited`,
            getPaymentMethods: `${e.BASE_URL}/payments/methods`,
            getPaymentTools: t => `${e.BASE_URL}/payments/method/${t}/tools`,
            payForAsset: `${e.BASE_URL}/payments`,
            externalPayments: `${e.BASE_URL}/external-payments`,
            getSubscriptions: `${e.BASE_URL}/subscriptions`,
            subscribe: `${e.BASE_URL}/subscriptions`,
            getDlcLinks: t => `${e.BASE_URL}/dlc/${t}/links`,
            getDiscount: `${e.BASE_URL}/vouchers/discount`,
            getBranding: t => `${e.BASE_URL}/branding/paywall/${t}`,
            downloadFile: (t, n) => `${e.BASE_URL}/dlc/${t}/${n}`,
        });
    return new class {
        constructor() {
            (this.config = v),
                (this.config.API = A(v)),
                (this.User = new o(this.config)),
                (this.Asset = new i(this.config)),
                (this.Payment = new s(this.config)),
                (this.Subscription = new a(this.config)),
                (this.Misc = new c(this.config)),
                (this.Socket = new w(this.config));
        }
        subscribe(e, t) {
            return (
                !!this.User.isSignedIn() && (this.Socket.subscribe(e, t), !0)
            );
        }
        unsubscribe() {
            this.Socket.unsubscribe();
        }
        setConfig(e) {
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
            this.config.API = A(this.config);
        }
    }();
});
