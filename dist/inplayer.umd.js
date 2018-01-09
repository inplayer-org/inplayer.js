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
    (e = e && e.hasOwnProperty('default') ? e.default : e),
        (t = t && t.hasOwnProperty('default') ? t.default : t),
        (n = n && n.hasOwnProperty('default') ? n.default : n);
    var r = 'https://staging-v2.inplayer.com',
        i = 'inplayer_token',
        s = {
            url: 'wss://staging-v2.inplayer.com:15671/ws',
            login: 'notifications',
            password: 'notifications',
        },
        c = {
            signIn: r + '/accounts/login',
            signOut: r + '/accounts/logout',
            signUp: r + '/accounts',
            requestNewPassword: r + '/accounts/forgot-password',
            setNewPassword: function(e) {
                return r + '/accounts/forgot-password/' + e;
            },
            getAccountInfo: r + '/accounts',
            social: function(e) {
                return r + '/accounts/social?state=' + e;
            },
            updateAccount: r + '/accounts',
            changePassword: r + '/accounts/change-password',
            getRegisterFields: function(e) {
                return r + '/accounts/register-fields/' + e;
            },
            checkAccess: function(e) {
                return r + '/items/' + e + '/access';
            },
            findAsset: function(e, t) {
                return r + '/items/' + t + '/' + e;
            },
            findExternalAsset: function(e, t) {
                return r + '/items/assets/external/' + e + '/' + t;
            },
            findPackage: function(e) {
                return r + '/items/packages/' + e;
            },
            findAccessFees: function(e) {
                return r + '/items/' + e + '/access-fees';
            },
            freemium: r + '/items/access/unlimited',
            getPaymentMethods: r + '/payments/methods',
            getPaymentTools: function(e) {
                return r + '/payments/method/' + e + '/tools';
            },
            payForAsset: r + '/payments',
            externalPayments: r + '/external-payments',
            getSubscriptions: r + '/subscriptions',
            subscribe: r + '/subscriptions',
            getDlcLinks: function(e) {
                return r + '/dlc/' + e + '/links';
            },
            getDiscount: r + '/vouchers/discount',
            getBranding: function(e) {
                return r + '/branding/paywall/' + e;
            },
            downloadFile: function(e, t) {
                return r + '/dlc/' + e + '/' + t;
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
                    t.append('merchant_uuid', e.merchantUuid),
                    t.append('referrer', e.referrer);
                var n = yield (yield fetch(c.signIn, {
                    method: 'POST',
                    body: t,
                })).json();
                return (
                    n.access_token && localStorage.setItem(i, e.access_token), n
                );
            })()
        );
    }),
        (a.prototype.signOut = function() {
            return o(
                (function*() {
                    var e = localStorage.getItem(i);
                    return (
                        (yield (yield fetch(c.signOut, {
                            headers: { Authorization: 'Bearer ' + e },
                        })).json()).explain && localStorage.removeItem(i),
                        !0
                    );
                })()
            );
        }),
        (a.prototype.signUp = function(e) {
            return o(
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
                        yield (yield fetch(c.signUp, {
                            method: 'POST',
                            body: t,
                        })).json()
                    );
                })()
            );
        }),
        (a.prototype.isSignedIn = function() {
            return void 0 !== localStorage.getItem(i);
        }),
        (a.prototype.token = function() {
            return localStorage.getItem(i);
        }),
        (a.prototype.setTokenInCookie = function(e) {
            localStorage.setItem(i, e);
        }),
        (a.prototype.requestNewPassword = function(e) {
            return o(
                (function*() {
                    var t = new FormData();
                    return (
                        t.append('email', e.email),
                        t.append('merchant_uuid', e.merchantUuid),
                        yield (yield fetch(c.requestNewPassword, {
                            method: 'POST',
                            body: t,
                        })).json()
                    );
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
                    return yield (yield fetch(c.setNewPassword(t), {
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
                    var t = yield (yield fetch(c.getAccountInfo, {
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
                    return yield (yield fetch(c.social(e), {
                        method: 'GET',
                    })).json();
                })()
            );
        }),
        (a.prototype.updateAccount = function(e, t) {
            return o(
                (function*() {
                    var n = { full_name: e.fullName, metadata: e.metadata };
                    return yield (yield fetch(c.updateAccount, {
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
                    return (
                        n.append('token', e.email),
                        n.append('password', e.password),
                        n.append(
                            'password_confirmation',
                            e.passwordConfirmation
                        ),
                        yield (yield fetch(c.changePassword, {
                            method: 'POST',
                            body: n,
                            headers: { Authorization: 'Bearer ' + t },
                        })).json()
                    );
                })()
            );
        }),
        (a.prototype.getRegisterFields = function(e) {
            return o(
                (function*() {
                    return yield (yield fetch(c.getRegisterFields(e))).json();
                })()
            );
        });
    var u = function() {};
    (u.prototype.checkAccessForAsset = function(e, t) {
        return o(
            (function*() {
                return yield (yield fetch(c.checkAccess(t), {
                    headers: { Authorization: 'Bearer ' + e },
                })).json();
            })()
        );
    }),
        (u.prototype.findAsset = function(e, t) {
            return o(
                (function*() {
                    return yield (yield fetch(c.findAsset(e, t), {
                        method: 'GET',
                    })).json();
                })()
            );
        }),
        (u.prototype.findExternalAsset = function(e, t) {
            return o(
                (function*() {
                    return yield (yield fetch(c.findExternalAsset(e, t), {
                        method: 'GET',
                    })).json();
                })()
            );
        }),
        (u.prototype.findPackage = function(e) {
            return o(
                (function*() {
                    return yield (yield fetch(c.findPackage(e), {
                        method: 'GET',
                    })).json();
                })()
            );
        }),
        (u.prototype.getAssetAccessFees = function(e) {
            return o(
                (function*() {
                    return yield (yield fetch(c.findAccessFees(e), {
                        method: 'GET',
                    })).json();
                })()
            );
        }),
        (u.prototype.getFreemiumAsset = function(e, t) {
            return o(
                (function*() {
                    return yield (yield fetch(c.freemium, {
                        method: 'POST',
                        headers: { Authorization: 'Bearer ' + e },
                        body: { access_fee: t },
                    })).json();
                })()
            );
        });
    var d = function() {};
    (d.prototype.getPaymentMethods = function(e) {
        return o(
            (function*() {
                return yield (yield fetch(c.getPaymentMethods, {
                    headers: { Authorization: 'Bearer ' + e },
                })).json();
            })()
        );
    }),
        (d.prototype.getPaymentTools = function(e, t) {
            return o(
                (function*() {
                    return yield (yield fetch(c.getPaymentTools(t), {
                        headers: { Authorization: 'Bearer ' + e },
                    })).json();
                })()
            );
        }),
        (d.prototype.payForAsset = function(e, t) {
            return o(
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
                        yield (yield fetch(c.payForAsset, {
                            method: 'POST',
                            headers: { Authorization: 'Bearer ' + e },
                            body: n,
                        })).json()
                    );
                })()
            );
        }),
        (d.prototype.getPayPalParams = function(e, t) {
            return o(
                (function*() {
                    var n = new FormData();
                    return (
                        n.append('origin', t.origin),
                        n.append('access_fee', t.accessFee),
                        n.append('payment_method', t.paymentMethod),
                        n.append('voucher_code', t.voucherCode),
                        yield (yield fetch(c.externalPayments, {
                            method: 'POST',
                            headers: { Authorization: 'Bearer ' + e },
                            body: n,
                        })).json()
                    );
                })()
            );
        });
    var p = function() {};
    (p.prototype.getSubscriptions = function(e) {
        return o(
            (function*() {
                return (yield fetch(c.getSubscriptions, {
                    method: 'GET',
                    headers: { Authorization: 'Bearer ' + e },
                })).json();
            })()
        );
    }),
        (p.prototype.cancelSubscription = function(e, t) {
            return o(
                (function*() {
                    return (yield fetch(e, {
                        method: 'GET',
                        headers: { Authorization: 'Bearer ' + t },
                    })).json();
                })()
            );
        }),
        (p.prototype.assetSubscribe = function(e, t) {
            return o(
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
                        yield (yield fetch(c.subscribe, {
                            method: 'POST',
                            headers: { Authorization: 'Bearer ' + e },
                            body: n,
                        })).json()
                    );
                })()
            );
        });
    var f = function() {};
    (f.prototype.getDlcLinks = function(e, t) {
        return o(
            (function*() {
                return yield (yield fetch(c.getDlcLinks(t), {
                    headers: { Authorization: 'Bearer ' + e },
                })).json();
            })()
        );
    }),
        (f.prototype.getDiscount = function(e, t) {
            return o(
                (function*() {
                    var n = new FormData();
                    return (
                        n.append('access_fee_id', t.accessFeeId),
                        n.append('voucher_code', t.voucherCode),
                        n.append('merchant_id', t.merchantUuid),
                        yield (yield fetch(c.getDiscount, {
                            method: 'POST',
                            headers: { Authorization: 'Bearer ' + e },
                            body: n,
                        })).json()
                    );
                })()
            );
        }),
        (f.prototype.getBranding = function(e) {
            return o(
                (function*() {
                    return yield (yield fetch(c.getBranding(e), {
                        method: 'GET',
                    })).json();
                })()
            );
        }),
        (f.prototype.downloadProtectedFile = function(e, t, n) {
            return o(
                (function*() {
                    return yield (yield fetch(c.downloadFile(t, n), {
                        headers: { Authorization: 'Bearer ' + e },
                    })).json();
                })()
            );
        });
    var l =
        'undefined' != typeof window
            ? window
            : 'undefined' != typeof global
              ? global
              : 'undefined' != typeof self ? self : {};
    function h(e, t) {
        return e((t = { exports: {} }), t.exports), t.exports;
    }
    var y = h(function(e, t) {
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
                                var t, o, r, s, c;
                                (t = [this.command]),
                                    (r =
                                        !1 ===
                                        this.headers['content-length']) &&
                                        delete this.headers['content-length'],
                                    (c = this.headers);
                                for (o in c)
                                    i.call(c, o) &&
                                        ((s = c[o]), t.push(o + ':' + s));
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
                                    c,
                                    a,
                                    u,
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
                                    s = t.search(RegExp('' + e.LF + e.LF)),
                                        i = (c = t
                                            .substring(0, s)
                                            .split(e.LF)).shift(),
                                        a = {},
                                        h = function(e) {
                                            return e.replace(/^\s+|\s+$/g, '');
                                        },
                                        y = 0,
                                        m = (b = c.reverse()).length;
                                    y < m;
                                    y++
                                )
                                    (d = (f = b[y]).indexOf(':')),
                                        (a[h(f.substring(0, d))] = h(
                                            f.substring(d + 1)
                                        ));
                                if (
                                    ((o = ''), (l = s + 2), a['content-length'])
                                )
                                    (p = parseInt(a['content-length'])),
                                        (o = ('' + t).substring(l, l + p));
                                else
                                    for (
                                        r = null, u = g = l, v = t.length;
                                        (l <= v ? g < v : g > v) &&
                                        (r = t.charAt(u)) !== e.NULL;
                                        u = l <= v ? ++g : --g
                                    )
                                        o += r;
                                return new n(i, a, o);
                            }),
                            (n.unmarshall = function(n) {
                                var o;
                                return (function() {
                                    var r, i, s, c;
                                    for (
                                        c = [],
                                            r = 0,
                                            i = (s = n.split(
                                                RegExp('' + e.NULL + e.LF + '*')
                                            )).length;
                                        r < i;
                                        r++
                                    )
                                        (null != (o = s[r])
                                            ? o.length
                                            : void 0) > 0 && c.push(t(o));
                                    return c;
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
                                var o, i, s, c, a, u, d, p;
                                if (
                                    (a = n.version) === r.VERSIONS.V1_1 ||
                                    a === r.VERSIONS.V1_2
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
                                                (c = o[e]), r.push(parseInt(c));
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
                                              (this.ponger = r.setInterval(
                                                  s,
                                                  ((p = this),
                                                  function() {
                                                      var e;
                                                      if (
                                                          (e =
                                                              t() -
                                                              p.serverActivity) >
                                                          2 * s
                                                      )
                                                          return (
                                                              'function' ==
                                                                  typeof p.debug &&
                                                                  p.debug(
                                                                      'did not receive server activity for the last ' +
                                                                          e +
                                                                          'ms'
                                                                  ),
                                                              p.ws.close()
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
                                var n, i, c, a, u, d, p;
                                return (
                                    (n =
                                        1 <= arguments.length
                                            ? s.call(arguments, 0)
                                            : []),
                                    (a = this._parseConnect.apply(this, n)),
                                    (c = a[0]),
                                    (this.connectCallback = a[1]),
                                    (i = a[2]),
                                    'function' == typeof this.debug &&
                                        this.debug('Opening Web Socket...'),
                                    (this.ws.onmessage = ((u = this),
                                    function(n) {
                                        var r, s, c, a, d, p, f, l, h, y, g, m;
                                        if (
                                            ((a =
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
                                            a !== e.LF)
                                        ) {
                                            for (
                                                'function' == typeof u.debug &&
                                                    u.debug('<<< ' + a),
                                                    m = [],
                                                    h = 0,
                                                    y = (g = o.unmarshall(a))
                                                        .length;
                                                h < y;
                                                h++
                                            )
                                                switch ((d = g[h]).command) {
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
                                                            m.push(
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
                                                                ? ((c = u),
                                                                  (p =
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
                                                                          c.ack(
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
                                                                          c.nack(
                                                                              p,
                                                                              l,
                                                                              e
                                                                          )
                                                                      );
                                                                  }),
                                                                  m.push(f(d)))
                                                                : m.push(
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
                                                        m.push(
                                                            'function' ==
                                                            typeof u.onreceipt
                                                                ? u.onreceipt(d)
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
                                                            typeof u.debug
                                                                ? u.debug(
                                                                      'Unhandled frame: ' +
                                                                          d
                                                                  )
                                                                : void 0
                                                        );
                                                }
                                            return m;
                                        }
                                        'function' == typeof u.debug &&
                                            u.debug('<<< PONG');
                                    })),
                                    (this.ws.onclose = ((d = this),
                                    function() {
                                        var e;
                                        return (
                                            (e =
                                                'Whoops! Lost connection to ' +
                                                d.ws.url),
                                            'function' == typeof d.debug &&
                                                d.debug(e),
                                            d._cleanUp(),
                                            'function' == typeof i
                                                ? i(e)
                                                : void 0
                                        );
                                    })),
                                    (this.ws.onopen = ((p = this),
                                    function() {
                                        return (
                                            'function' == typeof p.debug &&
                                                p.debug('Web Socket Opened...'),
                                            (c[
                                                'accept-version'
                                            ] = r.VERSIONS.supportedVersions()),
                                            (c['heart-beat'] = [
                                                p.heartbeat.outgoing,
                                                p.heartbeat.incoming,
                                            ].join(',')),
                                            p._transmit('CONNECT', c)
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
            }.call(l));
        }),
        g = (y.Stomp,
        h(function(e, o) {
            (function() {
                var e, r, i, s, c, a;
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
                    (a = function(e) {
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
                        return (n = a(t)), e.Stomp.over(n);
                    }),
                    (o.overTCP = i),
                    (o.overWS = s);
            }.call(l));
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
            s.url
        );
        (this.client = m.over(n)),
            (this.client.heartbeat.outgoing = 2e4),
            (this.client.heartbeat.incoming = 2e4),
            (this.client.debug = null);
        var o = this,
            r = e;
        this.client.connect(
            { login: s.login, passcode: s.password, 'client-id': e },
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
            (this.Asset = new u()),
            (this.Payment = new d()),
            (this.Subscription = new p()),
            (this.Misc = new f()),
            (this.Socket = new w());
    };
    return (
        (S.prototype.subscribe = function(e, t) {
            return (
                !!this.User.isSignedIn() && (this.Socket.subscribe(e, t), !0)
            );
        }),
        (S.prototype.unsubscribe = function() {
            this.Socket.unsubscribe();
        }),
        new S()
    );
});
