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
    function o(e) {
        return new Promise(function(t, n) {
            function o(i, s) {
                try {
                    var c = e[s ? 'throw' : 'next'](i);
                } catch (e) {
                    return void n(e);
                }
                c.done ? t(c.value) : Promise.resolve(c.value).then(o, r);
            }
            function r(e) {
                o(e, 1);
            }
            o();
        });
    }
    function r(e, t) {
        return (t = { exports: {} }), e(t, t.exports), t.exports;
    }
    (e = e && e.hasOwnProperty('default') ? e.default : e),
        (t = t && t.hasOwnProperty('default') ? t.default : t),
        (n = n && n.hasOwnProperty('default') ? n.default : n);
    var i = 'https://staging-v2.inplayer.com',
        s = 'inplayer_token',
        c = {
            url: 'wss://staging-v2.inplayer.com:15671/ws',
            login: 'notifications',
            password: 'notifications',
        },
        u = {
            signIn: i + '/accounts/login',
            signOut: i + '/accounts/logout',
            signUp: i + '/accounts',
            requestNewPassword: i + '/accounts/forgot-password',
            setNewPassword: function(e) {
                return i + '/accounts/forgot-password/' + e;
            },
            getAccountInfo: i + '/accounts',
            social: function(e) {
                return i + '/accounts/social?state=' + e;
            },
            updateAccount: i + '/accounts',
            changePassword: i + '/accounts/change-password',
            getRegisterFields: function(e) {
                return i + '/accounts/register-fields/' + e;
            },
            checkAccess: function(e, t) {
                return (
                    void 0 === t && (t = !1),
                    t ? i + '/item/access?' + e : i + '/items/' + e + '/access'
                );
            },
            findAsset: function(e, t) {
                return i + '/items/' + t + '/' + e;
            },
            findExternalAsset: function(e, t) {
                return i + '/items/assets/external/' + e + '/' + t;
            },
            findPackage: function(e) {
                return i + '/items/packages/' + e;
            },
            findAccessFees: function(e) {
                return i + '/items/' + e + '/access-fees';
            },
            freemium: i + '/items/access/unlimited',
            getPaymentMethods: i + '/payments/methods',
            getPaymentTools: function(e) {
                return i + '/payments/method/' + e + '/tools';
            },
            payForAsset: i + '/payments',
            externalPayments: i + '/external-payments',
            getSubscriptions: i + '/subscriptions',
            subscribe: i + '/subscriptions',
            getDlcLinks: function(e) {
                return i + '/dlc/' + e + '/links';
            },
            getDiscount: i + '/vouchers/discount',
            getBranding: function(e) {
                return i + '/branding/paywall/' + e;
            },
            downloadFile: function(e, t) {
                return i + '/dlc/' + e + '/' + t;
            },
        },
        a = function() {
            ('undefined' != typeof localStorage && null !== localStorage) ||
                (localStorage = new e('./scratch'));
        };
    (a.prototype.signIn = function(e) {
        return o(
            (function*() {
                var t = new FormData();
                t.append('email', e.email),
                    t.append('password', e.password),
                    t.append('merchant_uuid', e.merchantUid),
                    t.append('referrer', e.referrer);
                var n = yield (yield fetch(u.signIn, {
                    method: 'POST',
                    body: t,
                })).json();
                return (
                    n.access_token && localStorage.setItem(s, e.access_token), n
                );
            })()
        );
    }),
        (a.prototype.signOut = function() {
            return o(
                (function*() {
                    var e = localStorage.getItem(s);
                    return (
                        (yield (yield fetch(u.signOut, {
                            headers: { Authorization: 'Bearer ' + e },
                        })).json()).explain && localStorage.removeItem(s),
                        !0
                    );
                })()
            );
        }),
        (a.prototype.signUp = function(e) {
            return o(
                (function*() {
                    var t = new FormData();
                    t.append('full_name', e.fullName),
                        t.append('email', e.email),
                        t.append('password', e.password),
                        t.append(
                            'password_confirmation',
                            e.passwordConfirmation
                        ),
                        t.append('merchant_uuid', e.merchantUid),
                        t.append('type', e.type),
                        t.append('referrer', e.referrer);
                    return yield (yield fetch(u.signUp, {
                        method: 'POST',
                        body: t,
                    })).json();
                })()
            );
        }),
        (a.prototype.isSignedIn = function() {
            return void 0 !== localStorage.getItem(s);
        }),
        (a.prototype.token = function() {
            return localStorage.getItem(s);
        }),
        (a.prototype.setTokenInCookie = function(e) {
            localStorage.setItem(s, e);
        }),
        (a.prototype.requestNewPassword = function(e) {
            return o(
                (function*() {
                    var t = new FormData();
                    t.append('email', e.email),
                        t.append('merchant_uuid', e.merchantUid);
                    return yield (yield fetch(u.requestNewPassword, {
                        method: 'POST',
                        body: t,
                    })).json();
                })()
            );
        }),
        (a.prototype.setNewPassword = function(e, t) {
            return o(
                (function*() {
                    var n =
                        'password=' +
                        e.password +
                        '&password_confirmation=' +
                        e.passwordConfirmation;
                    return yield (yield fetch(u.setNewPassword(t), {
                        method: 'PUT',
                        body: n,
                        headers: { 'Content-Type': 'x-www-form-urlencoded' },
                    })).json();
                })()
            );
        }),
        (a.prototype.getAccountInfo = function(e) {
            return o(
                (function*() {
                    var t = yield (yield fetch(u.getAccountInfo, {
                        method: 'GET',
                        headers: { Authorization: 'Bearer ' + e },
                    })).json();
                    if (t) return t;
                })()
            );
        }),
        (a.prototype.getSocialLoginUrls = function(e) {
            return o(
                (function*() {
                    return yield (yield fetch(u.social(e), {
                        method: 'GET',
                    })).json();
                })()
            );
        }),
        (a.prototype.updateAccount = function(e, t) {
            return o(
                (function*() {
                    var n = { full_name: e.fullName, metadata: e.metadata };
                    return yield (yield fetch(u.updateAccount, {
                        method: 'PUT',
                        body: n,
                        headers: {
                            Authorization: 'Bearer ' + t,
                            'Content-Type': 'x-www-form-urlencoded',
                        },
                    })).json();
                })()
            );
        }),
        (a.prototype.changePassword = function(e, t) {
            return o(
                (function*() {
                    var n = new FormData();
                    n.append('token', e.email),
                        n.append('password', e.password),
                        n.append(
                            'password_confirmation',
                            e.passwordConfirmation
                        );
                    return yield (yield fetch(u.changePassword, {
                        method: 'POST',
                        body: n,
                        headers: { Authorization: 'Bearer ' + t },
                    })).json();
                })()
            );
        }),
        (a.prototype.getRegisterFields = function(e) {
            return o(
                (function*() {
                    return yield (yield fetch(u.getRegisterFields(e))).json();
                })()
            );
        });
    var d = function() {};
    (d.prototype.checkAccessForAsset = function(e, t) {
        return o(
            (function*() {
                return yield (yield fetch(u.checkAccess(t), {
                    headers: { Authorization: 'Bearer ' + e },
                })).json();
            })()
        );
    }),
        (d.prototype.checkAccessForMultipleAssets = function(e, t) {
            return o(
                (function*() {
                    return yield (yield fetch(u.checkAccess(t, !0), {
                        headers: { Authorization: 'Bearer ' + e },
                    })).json();
                })()
            );
        }),
        (d.prototype.findAsset = function(e, t) {
            return o(
                (function*() {
                    return yield (yield fetch(u.findAsset(e, t), {
                        method: 'GET',
                    })).json();
                })()
            );
        }),
        (d.prototype.findExternalAsset = function(e, t) {
            return o(
                (function*() {
                    return yield (yield fetch(u.findExternalAsset(e, t), {
                        method: 'GET',
                    })).json();
                })()
            );
        }),
        (d.prototype.findPackage = function(e) {
            return o(
                (function*() {
                    return yield (yield fetch(u.findPackage(e), {
                        method: 'GET',
                    })).json();
                })()
            );
        }),
        (d.prototype.getAssetAccessFees = function(e) {
            return o(
                (function*() {
                    return yield (yield fetch(u.findAccessFees(e), {
                        method: 'GET',
                    })).json();
                })()
            );
        }),
        (d.prototype.getFreemiumAsset = function(e, t) {
            return o(
                (function*() {
                    return yield (yield fetch(u.freemium, {
                        method: 'POST',
                        headers: { Authorization: 'Bearer ' + e },
                        body: { access_fee: t },
                    })).json();
                })()
            );
        });
    var p = function() {};
    (p.prototype.getPaymentMethods = function(e) {
        return o(
            (function*() {
                return yield (yield fetch(u.getPaymentMethods, {
                    headers: { Authorization: 'Bearer ' + e },
                })).json();
            })()
        );
    }),
        (p.prototype.getPaymentTools = function(e, t) {
            return o(
                (function*() {
                    return yield (yield fetch(u.getPaymentTools(t), {
                        headers: { Authorization: 'Bearer ' + e },
                    })).json();
                })()
            );
        }),
        (p.prototype.payForAsset = function(e, t) {
            return o(
                (function*() {
                    var n = new FormData();
                    n.append('number', t.number),
                        n.append('card_name', t.cardName),
                        n.append('exp_month', t.expMonth),
                        n.append('exp_year', t.expYear),
                        n.append('cvv', t.cvv),
                        n.append('access_fee', t.accessFee),
                        n.append('payment_method', t.paymentMethod),
                        n.append('referrer', t.referrer),
                        n.append('voucher_code', t.voucherCode);
                    return yield (yield fetch(u.payForAsset, {
                        method: 'POST',
                        headers: { Authorization: 'Bearer ' + e },
                        body: n,
                    })).json();
                })()
            );
        }),
        (p.prototype.getPayPalParams = function(e, t) {
            return o(
                (function*() {
                    var n = new FormData();
                    n.append('origin', t.origin),
                        n.append('access_fee', t.accessFee),
                        n.append('payment_method', t.paymentMethod),
                        n.append('voucher_code', t.voucherCode);
                    return yield (yield fetch(u.externalPayments, {
                        method: 'POST',
                        headers: { Authorization: 'Bearer ' + e },
                        body: n,
                    })).json();
                })()
            );
        });
    var f = function() {};
    (f.prototype.getSubscriptions = function(e) {
        return o(
            (function*() {
                return (yield fetch(u.getSubscriptions, {
                    method: 'GET',
                    headers: { Authorization: 'Bearer ' + e },
                })).json();
            })()
        );
    }),
        (f.prototype.cancelSubscription = function(e, t) {
            return o(
                (function*() {
                    return (yield fetch(e, {
                        method: 'GET',
                        headers: { Authorization: 'Bearer ' + t },
                    })).json();
                })()
            );
        }),
        (f.prototype.assetSubscribe = function(e, t) {
            return o(
                (function*() {
                    var n = new FormData();
                    n.append('number', t.number),
                        n.append('card_name', t.cardName),
                        n.append('exp_month', t.expMonth),
                        n.append('exp_year', t.expYear),
                        n.append('cvv', t.cvv),
                        n.append('access_fee', t.accessFee),
                        n.append('payment_method', t.paymentMethod),
                        n.append('referrer', t.referrer),
                        n.append('voucher_code', t.voucherCode);
                    return yield (yield fetch(u.subscribe, {
                        method: 'POST',
                        headers: { Authorization: 'Bearer ' + e },
                        body: n,
                    })).json();
                })()
            );
        });
    var l = function() {};
    (l.prototype.getDlcLinks = function(e, t) {
        return o(
            (function*() {
                return yield (yield fetch(u.getDlcLinks(t), {
                    headers: { Authorization: 'Bearer ' + e },
                })).json();
            })()
        );
    }),
        (l.prototype.getDiscount = function(e, t) {
            return o(
                (function*() {
                    var n = new FormData();
                    n.append('access_fee_id', t.accessFeeId),
                        n.append('voucher_code', t.voucherCode),
                        n.append('merchant_id', t.merchantUid);
                    return yield (yield fetch(u.getDiscount, {
                        method: 'POST',
                        headers: { Authorization: 'Bearer ' + e },
                        body: n,
                    })).json();
                })()
            );
        }),
        (l.prototype.getBranding = function(e) {
            return o(
                (function*() {
                    return yield (yield fetch(u.getBranding(e), {
                        method: 'GET',
                    })).json();
                })()
            );
        }),
        (l.prototype.downloadProtectedFile = function(e, t, n) {
            return o(
                (function*() {
                    return yield (yield fetch(u.downloadFile(t, n), {
                        headers: { Authorization: 'Bearer ' + e },
                    })).json();
                })()
            );
        });
    var h =
            'undefined' != typeof window
                ? window
                : 'undefined' != typeof global
                  ? global
                  : 'undefined' != typeof self ? self : {},
        y = r(function(e, t) {
            (function() {
                var e,
                    n,
                    o,
                    r,
                    i = {}.hasOwnProperty,
                    s = [].slice;
                (e = { LF: '\n', NULL: '\0' }),
                    (o = (function() {
                        function t(e, t, n) {
                            (this.command = e),
                                (this.headers = null != t ? t : {}),
                                (this.body = null != n ? n : '');
                        }
                        var n;
                        return (
                            (t.prototype.toString = function() {
                                var n, o, r, s, c;
                                (n = [this.command]),
                                    (r =
                                        !1 ===
                                        this.headers['content-length']) &&
                                        delete this.headers['content-length'],
                                    (c = this.headers);
                                for (o in c)
                                    i.call(c, o) &&
                                        ((s = c[o]), n.push(o + ':' + s));
                                return (
                                    this.body &&
                                        !r &&
                                        n.push(
                                            'content-length:' +
                                                t.sizeOfUTF8(this.body)
                                        ),
                                    n.push(e.LF + this.body),
                                    n.join(e.LF)
                                );
                            }),
                            (t.sizeOfUTF8 = function(e) {
                                return e
                                    ? encodeURI(e).match(/%..|./g).length
                                    : 0;
                            }),
                            (n = function(n) {
                                var o,
                                    r,
                                    i,
                                    s,
                                    c,
                                    u,
                                    a,
                                    d,
                                    p,
                                    f,
                                    l,
                                    h,
                                    y,
                                    g,
                                    m,
                                    b,
                                    v;
                                for (
                                    s = n.search(RegExp('' + e.LF + e.LF)),
                                        i = (c = n
                                            .substring(0, s)
                                            .split(e.LF)).shift(),
                                        u = {},
                                        h = function(e) {
                                            return e.replace(/^\s+|\s+$/g, '');
                                        },
                                        y = 0,
                                        m = (b = c.reverse()).length;
                                    y < m;
                                    y++
                                )
                                    (d = (f = b[y]).indexOf(':')),
                                        (u[h(f.substring(0, d))] = h(
                                            f.substring(d + 1)
                                        ));
                                if (
                                    ((o = ''), (l = s + 2), u['content-length'])
                                )
                                    (p = parseInt(u['content-length'])),
                                        (o = ('' + n).substring(l, l + p));
                                else
                                    for (
                                        r = null, a = g = l, v = n.length;
                                        (l <= v ? g < v : g > v) &&
                                        (r = n.charAt(a)) !== e.NULL;
                                        a = l <= v ? ++g : --g
                                    )
                                        o += r;
                                return new t(i, u, o);
                            }),
                            (t.unmarshall = function(t) {
                                var o;
                                return (function() {
                                    var r, i, s, c;
                                    for (
                                        c = [],
                                            r = 0,
                                            i = (s = t.split(
                                                RegExp('' + e.NULL + e.LF + '*')
                                            )).length;
                                        r < i;
                                        r++
                                    )
                                        (null != (o = s[r])
                                            ? o.length
                                            : void 0) > 0 && c.push(n(o));
                                    return c;
                                })();
                            }),
                            (t.marshall = function(n, o, r) {
                                return new t(n, o, r).toString() + e.NULL;
                            }),
                            t
                        );
                    })()),
                    (n = (function() {
                        function t(e) {
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
                        var n;
                        return (
                            (t.prototype.debug = function(e) {
                                var t;
                                return 'undefined' != typeof window &&
                                    null !== window &&
                                    null != (t = window.console)
                                    ? t.log(e)
                                    : void 0;
                            }),
                            (n = function() {
                                return Date.now
                                    ? Date.now()
                                    : new Date().valueOf;
                            }),
                            (t.prototype._transmit = function(e, t, n) {
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
                            (t.prototype._setupHeartbeat = function(t) {
                                var o, i, s, c, u, a;
                                if (
                                    (u = t.version) === r.VERSIONS.V1_1 ||
                                    u === r.VERSIONS.V1_2
                                )
                                    return (
                                        (a = (function() {
                                            var e, n, o, r;
                                            for (
                                                r = [],
                                                    e = 0,
                                                    n = (o = t[
                                                        'heart-beat'
                                                    ].split(',')).length;
                                                e < n;
                                                e++
                                            )
                                                (c = o[e]), r.push(parseInt(c));
                                            return r;
                                        })()),
                                        (i = a[0]),
                                        (o = a[1]),
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
                                                (function(t) {
                                                    return function() {
                                                        return (
                                                            t.ws.send(e.LF),
                                                            'function' ==
                                                            typeof t.debug
                                                                ? t.debug(
                                                                      '>>> PING'
                                                                  )
                                                                : void 0
                                                        );
                                                    };
                                                })(this)
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
                                                  (function(e) {
                                                      return function() {
                                                          var t;
                                                          if (
                                                              (t =
                                                                  n() -
                                                                  e.serverActivity) >
                                                              2 * s
                                                          )
                                                              return (
                                                                  'function' ==
                                                                      typeof e.debug &&
                                                                      e.debug(
                                                                          'did not receive server activity for the last ' +
                                                                              t +
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
                            (t.prototype._parseConnect = function() {
                                var e, t, n, o;
                                switch (((e =
                                    1 <= arguments.length
                                        ? s.call(arguments, 0)
                                        : []),
                                (o = {}),
                                e.length)) {
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
                            (t.prototype.connect = function() {
                                var t, i, c, u;
                                return (
                                    (t =
                                        1 <= arguments.length
                                            ? s.call(arguments, 0)
                                            : []),
                                    (u = this._parseConnect.apply(this, t)),
                                    (c = u[0]),
                                    (this.connectCallback = u[1]),
                                    (i = u[2]),
                                    'function' == typeof this.debug &&
                                        this.debug('Opening Web Socket...'),
                                    (this.ws.onmessage = (function(t) {
                                        return function(r) {
                                            var s,
                                                c,
                                                u,
                                                a,
                                                d,
                                                p,
                                                f,
                                                l,
                                                h,
                                                y,
                                                g,
                                                m;
                                            if (
                                                ((a =
                                                    'undefined' !=
                                                        typeof ArrayBuffer &&
                                                    r.data instanceof
                                                        ArrayBuffer
                                                        ? ((s = new Uint8Array(
                                                              r.data
                                                          )),
                                                          'function' ==
                                                              typeof t.debug &&
                                                              t.debug(
                                                                  '--- got data length: ' +
                                                                      s.length
                                                              ),
                                                          (function() {
                                                              var e, t, n;
                                                              for (
                                                                  n = [],
                                                                      e = 0,
                                                                      t =
                                                                          s.length;
                                                                  e < t;
                                                                  e++
                                                              )
                                                                  (c = s[e]),
                                                                      n.push(
                                                                          String.fromCharCode(
                                                                              c
                                                                          )
                                                                      );
                                                              return n;
                                                          })().join(''))
                                                        : r.data),
                                                (t.serverActivity = n()),
                                                a !== e.LF)
                                            ) {
                                                for (
                                                    'function' ==
                                                        typeof t.debug &&
                                                        t.debug('<<< ' + a),
                                                        m = [],
                                                        h = 0,
                                                        y = (g = o.unmarshall(
                                                            a
                                                        )).length;
                                                    h < y;
                                                    h++
                                                )
                                                    switch ((d = g[h])
                                                        .command) {
                                                        case 'CONNECTED':
                                                            'function' ==
                                                                typeof t.debug &&
                                                                t.debug(
                                                                    'connected to server ' +
                                                                        d
                                                                            .headers
                                                                            .server
                                                                ),
                                                                (t.connected = !0),
                                                                t._setupHeartbeat(
                                                                    d.headers
                                                                ),
                                                                m.push(
                                                                    'function' ==
                                                                    typeof t.connectCallback
                                                                        ? t.connectCallback(
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
                                                                    t
                                                                        .subscriptions[
                                                                        l
                                                                    ] ||
                                                                    t.onreceive)
                                                                    ? ((u = t),
                                                                      (p =
                                                                          d
                                                                              .headers[
                                                                              'message-id'
                                                                          ]),
                                                                      (d.ack = function(
                                                                          e
                                                                      ) {
                                                                          return (
                                                                              null ==
                                                                                  e &&
                                                                                  (e = {}),
                                                                              u.ack(
                                                                                  p,
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
                                                                              u.nack(
                                                                                  p,
                                                                                  l,
                                                                                  e
                                                                              )
                                                                          );
                                                                      }),
                                                                      m.push(
                                                                          f(d)
                                                                      ))
                                                                    : m.push(
                                                                          'function' ==
                                                                          typeof t.debug
                                                                              ? t.debug(
                                                                                    'Unhandled received MESSAGE: ' +
                                                                                        d
                                                                                )
                                                                              : void 0
                                                                      );
                                                            break;
                                                        case 'RECEIPT':
                                                            m.push(
                                                                'function' ==
                                                                typeof t.onreceipt
                                                                    ? t.onreceipt(
                                                                          d
                                                                      )
                                                                    : void 0
                                                            );
                                                            break;
                                                        case 'ERROR':
                                                            m.push(
                                                                'function' ==
                                                                typeof i
                                                                    ? i(d)
                                                                    : void 0
                                                            );
                                                            break;
                                                        default:
                                                            m.push(
                                                                'function' ==
                                                                typeof t.debug
                                                                    ? t.debug(
                                                                          'Unhandled frame: ' +
                                                                              d
                                                                      )
                                                                    : void 0
                                                            );
                                                    }
                                                return m;
                                            }
                                            'function' == typeof t.debug &&
                                                t.debug('<<< PONG');
                                        };
                                    })(this)),
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
                                                (c[
                                                    'accept-version'
                                                ] = r.VERSIONS.supportedVersions()),
                                                (c['heart-beat'] = [
                                                    e.heartbeat.outgoing,
                                                    e.heartbeat.incoming,
                                                ].join(',')),
                                                e._transmit('CONNECT', c)
                                            );
                                        };
                                    })(this))
                                );
                            }),
                            (t.prototype.disconnect = function(e, t) {
                                return (
                                    null == t && (t = {}),
                                    this._transmit('DISCONNECT', t),
                                    (this.ws.onclose = null),
                                    this.ws.close(),
                                    this._cleanUp(),
                                    'function' == typeof e ? e() : void 0
                                );
                            }),
                            (t.prototype._cleanUp = function() {
                                if (
                                    ((this.connected = !1),
                                    this.pinger && r.clearInterval(this.pinger),
                                    this.ponger)
                                )
                                    return r.clearInterval(this.ponger);
                            }),
                            (t.prototype.send = function(e, t, n) {
                                return (
                                    null == t && (t = {}),
                                    null == n && (n = ''),
                                    (t.destination = e),
                                    this._transmit('SEND', t, n)
                                );
                            }),
                            (t.prototype.subscribe = function(e, t, n) {
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
                            (t.prototype.unsubscribe = function(e) {
                                return (
                                    delete this.subscriptions[e],
                                    this._transmit('UNSUBSCRIBE', { id: e })
                                );
                            }),
                            (t.prototype.begin = function(e) {
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
                            (t.prototype.commit = function(e) {
                                return this._transmit('COMMIT', {
                                    transaction: e,
                                });
                            }),
                            (t.prototype.abort = function(e) {
                                return this._transmit('ABORT', {
                                    transaction: e,
                                });
                            }),
                            (t.prototype.ack = function(e, t, n) {
                                return (
                                    null == n && (n = {}),
                                    (n['message-id'] = e),
                                    (n.subscription = t),
                                    this._transmit('ACK', n)
                                );
                            }),
                            (t.prototype.nack = function(e, t, n) {
                                return (
                                    null == n && (n = {}),
                                    (n['message-id'] = e),
                                    (n.subscription = t),
                                    this._transmit('NACK', n)
                                );
                            }),
                            t
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
                            var o, i;
                            return (
                                null == t && (t = ['v10.stomp', 'v11.stomp']),
                                (o = r.WebSocketClass || WebSocket),
                                (i = new o(e, t)),
                                new n(i)
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
            }.call(h));
        }),
        g = (y.Stomp,
        r(function(e, o) {
            (function() {
                var e, r, i, s, c, u;
                (r = t),
                    ((e = y).Stomp.setInterval = function(e, t) {
                        return setInterval(t, e);
                    }),
                    (e.Stomp.clearInterval = function(e) {
                        return clearInterval(e);
                    }),
                    (c = function(e, t) {
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
                    (u = function(e) {
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
                        return (o = c(n, t)), e.Stomp.over(o);
                    }),
                    (s = function(t) {
                        var n;
                        return (n = u(t)), e.Stomp.over(n);
                    }),
                    (o.overTCP = i),
                    (o.overWS = s);
            }.call(h));
        })),
        m = (g.net, g.websocket, g.overTCP, g.overWS, y.Stomp),
        b = g.overTCP,
        v = g.overWS;
    (m.overTCP = b), (m.overWS = v);
    var w = function() {
        this.subscription = null;
    };
    (w.prototype.subscribe = function(e, t) {
        if (!e && '' !== e) return !1;
        if (t && t.onmessage) {
            if ('function' != typeof t.onmessage) return !1;
        } else
            t.onMessage = function(e) {
                return console.log('Received message:', e);
            };
        if (t && t.onopen && 'function' != typeof t.onopen) return !1;
        var n = new ('MozWebSocket' in window ? MozWebSocket : WebSocket)(
            c.url
        );
        (this.client = m.over(n)),
            (this.client.heartbeat.outgoing = 2e4),
            (this.client.heartbeat.incoming = 2e4),
            (this.client.debug = null);
        var o = this,
            r = e;
        this.client.connect(
            { login: c.login, passcode: c.password, 'client-id': e },
            function() {
                t && t.onopen && t.onopen(),
                    o.client.subscribe(
                        '/exchange/notifications/' + r,
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
        (w.prototype.setClient = function(e) {
            this.subscription = e;
        }),
        (w.prototype.unsubscribe = function() {
            this.subscription &&
                this.subscription.connected &&
                this.subscription.unsubscribe();
        });
    var S = function() {
        (this.User = new a()),
            (this.Asset = new d()),
            (this.Payment = new p()),
            (this.Subscription = new f()),
            (this.Misc = new l()),
            (this.Socket = new w());
    };
    (S.prototype.subscribe = function(e, t) {
        return !!this.User.isSignedIn() && (this.Socket.subscribe(e, t), !0);
    }),
        (S.prototype.unsubscribe = function() {
            this.Socket.unsubscribe();
        });
    return new S();
});
