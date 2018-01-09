'use strict';
function _interopDefault(e) {
    return e && 'object' == typeof e && 'default' in e ? e.default : e;
}
var LocalStorage = _interopDefault(require('node-localstorage')),
    Stomp = _interopDefault(require('stompjs'));
function __async(e) {
    return new Promise(function(n, t) {
        function o(i, s) {
            try {
                var c = e[s ? 'throw' : 'next'](i);
            } catch (e) {
                return void t(e);
            }
            c.done ? n(c.value) : Promise.resolve(c.value).then(o, r);
        }
        function r(e) {
            o(e, 1);
        }
        o();
    });
}
var config = {
        BASE_URL: 'https://staging-v2.inplayer.com',
        INPLAYER_TOKEN_NAME: 'inplayer_token',
        stomp: {
            url: 'wss://staging-v2.inplayer.com:15671/ws',
            login: 'notifications',
            password: 'notifications',
        },
    },
    API = {
        signIn: config.BASE_URL + '/accounts/login',
        signOut: config.BASE_URL + '/accounts/logout',
        signUp: config.BASE_URL + '/accounts',
        requestNewPassword: config.BASE_URL + '/accounts/forgot-password',
        setNewPassword: function(e) {
            return config.BASE_URL + '/accounts/forgot-password/' + e;
        },
        getAccountInfo: config.BASE_URL + '/accounts',
        social: function(e) {
            return config.BASE_URL + '/accounts/social?state=' + e;
        },
        updateAccount: config.BASE_URL + '/accounts',
        changePassword: config.BASE_URL + '/accounts/change-password',
        getRegisterFields: function(e) {
            return config.BASE_URL + '/accounts/register-fields/' + e;
        },
        checkAccess: function(e) {
            return config.BASE_URL + '/items/' + e + '/access';
        },
        findAsset: function(e, n) {
            return config.BASE_URL + '/items/' + n + '/' + e;
        },
        findExternalAsset: function(e, n) {
            return config.BASE_URL + '/items/assets/external/' + e + '/' + n;
        },
        findPackage: function(e) {
            return config.BASE_URL + '/items/packages/' + e;
        },
        findAccessFees: function(e) {
            return config.BASE_URL + '/items/' + e + '/access-fees';
        },
        freemium: config.BASE_URL + '/items/access/unlimited',
        getPaymentMethods: config.BASE_URL + '/payments/methods',
        getPaymentTools: function(e) {
            return config.BASE_URL + '/payments/method/' + e + '/tools';
        },
        payForAsset: config.BASE_URL + '/payments',
        externalPayments: config.BASE_URL + '/external-payments',
        getSubscriptions: config.BASE_URL + '/subscriptions',
        subscribe: config.BASE_URL + '/subscriptions',
        getDlcLinks: function(e) {
            return config.BASE_URL + '/dlc/' + e + '/links';
        },
        getDiscount: config.BASE_URL + '/vouchers/discount',
        getBranding: function(e) {
            return config.BASE_URL + '/branding/paywall/' + e;
        },
        downloadFile: function(e, n) {
            return config.BASE_URL + '/dlc/' + e + '/' + n;
        },
    },
    User = function() {
        ('undefined' != typeof localStorage && null !== localStorage) ||
            (localStorage = new LocalStorage('./scratch'));
    };
(User.prototype.signIn = function(e) {
    return __async(
        (function*() {
            var n = new FormData();
            n.append('email', e.email),
                n.append('password', e.password),
                n.append('merchant_uuid', e.merchantUuid),
                n.append('referrer', e.referrer);
            var t = yield (yield fetch(API.signIn, {
                method: 'POST',
                body: n,
            })).json();
            return (
                t.access_token &&
                    localStorage.setItem(
                        config.INPLAYER_TOKEN_NAME,
                        e.access_token
                    ),
                t
            );
        })()
    );
}),
    (User.prototype.signOut = function() {
        return __async(
            (function*() {
                var e = localStorage.getItem(config.INPLAYER_TOKEN_NAME);
                return (
                    (yield (yield fetch(API.signOut, {
                        headers: { Authorization: 'Bearer ' + e },
                    })).json()).explain &&
                        localStorage.removeItem(config.INPLAYER_TOKEN_NAME),
                    !0
                );
            })()
        );
    }),
    (User.prototype.signUp = function(e) {
        return __async(
            (function*() {
                var n = new FormData();
                return (
                    n.append('full_name', e.fullName),
                    n.append('email', e.email),
                    n.append('password', e.password),
                    n.append('password_confirmation', e.passwordConfirmation),
                    n.append('merchant_uuid', e.merchantUuid),
                    n.append('type', e.type),
                    n.append('referrer', e.referrer),
                    yield (yield fetch(API.signUp, {
                        method: 'POST',
                        body: n,
                    })).json()
                );
            })()
        );
    }),
    (User.prototype.isSignedIn = function() {
        return void 0 !== localStorage.getItem(config.INPLAYER_TOKEN_NAME);
    }),
    (User.prototype.token = function() {
        return localStorage.getItem(config.INPLAYER_TOKEN_NAME);
    }),
    (User.prototype.setTokenInCookie = function(e) {
        localStorage.setItem(config.INPLAYER_TOKEN_NAME, e);
    }),
    (User.prototype.requestNewPassword = function(e) {
        return __async(
            (function*() {
                var n = new FormData();
                return (
                    n.append('email', e.email),
                    n.append('merchant_uuid', e.merchantUuid),
                    yield (yield fetch(API.requestNewPassword, {
                        method: 'POST',
                        body: n,
                    })).json()
                );
            })()
        );
    }),
    (User.prototype.setNewPassword = function(e, n) {
        return __async(
            (function*() {
                var t =
                    'password=' +
                    e.password +
                    '&password_confirmation=' +
                    e.passwordConfirmation;
                return yield (yield fetch(API.setNewPassword(n), {
                    method: 'PUT',
                    body: t,
                    headers: { 'Content-Type': 'x-www-form-urlencoded' },
                })).json();
            })()
        );
    }),
    (User.prototype.getAccountInfo = function(e) {
        return __async(
            (function*() {
                var n = yield (yield fetch(API.getAccountInfo, {
                    method: 'GET',
                    headers: { Authorization: 'Bearer ' + e },
                })).json();
                if (n) return n;
            })()
        );
    }),
    (User.prototype.getSocialLoginUrls = function(e) {
        return __async(
            (function*() {
                return yield (yield fetch(API.social(e), {
                    method: 'GET',
                })).json();
            })()
        );
    }),
    (User.prototype.updateAccount = function(e, n) {
        return __async(
            (function*() {
                var t = { full_name: e.fullName, metadata: e.metadata };
                return yield (yield fetch(API.updateAccount, {
                    method: 'PUT',
                    body: t,
                    headers: {
                        Authorization: 'Bearer ' + n,
                        'Content-Type': 'x-www-form-urlencoded',
                    },
                })).json();
            })()
        );
    }),
    (User.prototype.changePassword = function(e, n) {
        return __async(
            (function*() {
                var t = new FormData();
                return (
                    t.append('token', e.email),
                    t.append('password', e.password),
                    t.append('password_confirmation', e.passwordConfirmation),
                    yield (yield fetch(API.changePassword, {
                        method: 'POST',
                        body: t,
                        headers: { Authorization: 'Bearer ' + n },
                    })).json()
                );
            })()
        );
    }),
    (User.prototype.getRegisterFields = function(e) {
        return __async(
            (function*() {
                return yield (yield fetch(API.getRegisterFields(e))).json();
            })()
        );
    });
var Asset = function() {};
(Asset.prototype.checkAccessForAsset = function(e, n) {
    return __async(
        (function*() {
            return yield (yield fetch(API.checkAccess(n), {
                headers: { Authorization: 'Bearer ' + e },
            })).json();
        })()
    );
}),
    (Asset.prototype.findAsset = function(e, n) {
        return __async(
            (function*() {
                return yield (yield fetch(API.findAsset(e, n), {
                    method: 'GET',
                })).json();
            })()
        );
    }),
    (Asset.prototype.findExternalAsset = function(e, n) {
        return __async(
            (function*() {
                return yield (yield fetch(API.findExternalAsset(e, n), {
                    method: 'GET',
                })).json();
            })()
        );
    }),
    (Asset.prototype.findPackage = function(e) {
        return __async(
            (function*() {
                return yield (yield fetch(API.findPackage(e), {
                    method: 'GET',
                })).json();
            })()
        );
    }),
    (Asset.prototype.getAssetAccessFees = function(e) {
        return __async(
            (function*() {
                return yield (yield fetch(API.findAccessFees(e), {
                    method: 'GET',
                })).json();
            })()
        );
    }),
    (Asset.prototype.getFreemiumAsset = function(e, n) {
        return __async(
            (function*() {
                return yield (yield fetch(API.freemium, {
                    method: 'POST',
                    headers: { Authorization: 'Bearer ' + e },
                    body: { access_fee: n },
                })).json();
            })()
        );
    });
var Payment = function() {};
(Payment.prototype.getPaymentMethods = function(e) {
    return __async(
        (function*() {
            return yield (yield fetch(API.getPaymentMethods, {
                headers: { Authorization: 'Bearer ' + e },
            })).json();
        })()
    );
}),
    (Payment.prototype.getPaymentTools = function(e, n) {
        return __async(
            (function*() {
                return yield (yield fetch(API.getPaymentTools(n), {
                    headers: { Authorization: 'Bearer ' + e },
                })).json();
            })()
        );
    }),
    (Payment.prototype.payForAsset = function(e, n) {
        return __async(
            (function*() {
                var t = new FormData();
                return (
                    t.append('number', n.number),
                    t.append('card_name', n.cardName),
                    t.append('exp_month', n.expMonth),
                    t.append('exp_year', n.expYear),
                    t.append('cvv', n.cvv),
                    t.append('access_fee', n.accessFee),
                    t.append('payment_method', n.paymentMethod),
                    t.append('referrer', n.referrer),
                    n.voucherCode && t.append('voucher_code', n.voucherCode),
                    yield (yield fetch(API.payForAsset, {
                        method: 'POST',
                        headers: { Authorization: 'Bearer ' + e },
                        body: t,
                    })).json()
                );
            })()
        );
    }),
    (Payment.prototype.getPayPalParams = function(e, n) {
        return __async(
            (function*() {
                var t = new FormData();
                return (
                    t.append('origin', n.origin),
                    t.append('access_fee', n.accessFee),
                    t.append('payment_method', n.paymentMethod),
                    t.append('voucher_code', n.voucherCode),
                    yield (yield fetch(API.externalPayments, {
                        method: 'POST',
                        headers: { Authorization: 'Bearer ' + e },
                        body: t,
                    })).json()
                );
            })()
        );
    });
var Subscription = function() {};
(Subscription.prototype.getSubscriptions = function(e) {
    return __async(
        (function*() {
            return (yield fetch(API.getSubscriptions, {
                method: 'GET',
                headers: { Authorization: 'Bearer ' + e },
            })).json();
        })()
    );
}),
    (Subscription.prototype.cancelSubscription = function(e, n) {
        return __async(
            (function*() {
                return (yield fetch(e, {
                    method: 'GET',
                    headers: { Authorization: 'Bearer ' + n },
                })).json();
            })()
        );
    }),
    (Subscription.prototype.assetSubscribe = function(e, n) {
        return __async(
            (function*() {
                var t = new FormData();
                return (
                    t.append('number', n.number),
                    t.append('card_name', n.cardName),
                    t.append('exp_month', n.expMonth),
                    t.append('exp_year', n.expYear),
                    t.append('cvv', n.cvv),
                    t.append('access_fee', n.accessFee),
                    t.append('payment_method', n.paymentMethod),
                    t.append('referrer', n.referrer),
                    n.voucherCode && t.append('voucher_code', n.voucherCode),
                    yield (yield fetch(API.subscribe, {
                        method: 'POST',
                        headers: { Authorization: 'Bearer ' + e },
                        body: t,
                    })).json()
                );
            })()
        );
    });
var Misc = function() {};
(Misc.prototype.getDlcLinks = function(e, n) {
    return __async(
        (function*() {
            return yield (yield fetch(API.getDlcLinks(n), {
                headers: { Authorization: 'Bearer ' + e },
            })).json();
        })()
    );
}),
    (Misc.prototype.getDiscount = function(e, n) {
        return __async(
            (function*() {
                var t = new FormData();
                return (
                    t.append('access_fee_id', n.accessFeeId),
                    t.append('voucher_code', n.voucherCode),
                    t.append('merchant_id', n.merchantUuid),
                    yield (yield fetch(API.getDiscount, {
                        method: 'POST',
                        headers: { Authorization: 'Bearer ' + e },
                        body: t,
                    })).json()
                );
            })()
        );
    }),
    (Misc.prototype.getBranding = function(e) {
        return __async(
            (function*() {
                return yield (yield fetch(API.getBranding(e), {
                    method: 'GET',
                })).json();
            })()
        );
    }),
    (Misc.prototype.downloadProtectedFile = function(e, n, t) {
        return __async(
            (function*() {
                return yield (yield fetch(API.downloadFile(n, t), {
                    headers: { Authorization: 'Bearer ' + e },
                })).json();
            })()
        );
    });
var Socket = function() {
    this.subscription = null;
};
(Socket.prototype.subscribe = function(e, n) {
    if (!e && '' !== e) return !1;
    if (n && n.onmessage) {
        if ('function' != typeof n.onmessage) return !1;
    } else
        n.onMessage = function(e) {
            return console.log('Received message:', e);
        };
    if (n && n.onopen && 'function' != typeof n.onopen) return !1;
    var t = new ('MozWebSocket' in window ? MozWebSocket : WebSocket)(
        config.stomp.url
    );
    (this.client = Stomp.over(t)),
        (this.client.heartbeat.outgoing = 2e4),
        (this.client.heartbeat.incoming = 2e4),
        (this.client.debug = null);
    var o = this,
        r = e;
    this.client.connect(
        {
            login: config.stomp.login,
            passcode: config.stomp.password,
            'client-id': e,
        },
        function() {
            n && n.onopen && n.onopen(),
                o.client.subscribe(
                    '/exchange/notifications/' + r,
                    n.onmessage,
                    { id: e, ack: 'client' }
                );
        },
        function(e) {
            'string' != typeof e && console.warn('Stomp error: ', e);
        }
    ),
        this.setClient(this.client);
}),
    (Socket.prototype.setClient = function(e) {
        this.subscription = e;
    }),
    (Socket.prototype.unsubscribe = function() {
        this.subscription &&
            this.subscription.connected &&
            this.subscription.unsubscribe();
    });
var InPlayer = function() {
    (this.User = new User()),
        (this.Asset = new Asset()),
        (this.Payment = new Payment()),
        (this.Subscription = new Subscription()),
        (this.Misc = new Misc()),
        (this.Socket = new Socket());
};
(InPlayer.prototype.subscribe = function(e, n) {
    return !!this.User.isSignedIn() && (this.Socket.subscribe(e, n), !0);
}),
    (InPlayer.prototype.unsubscribe = function() {
        this.Socket.unsubscribe();
    });
var index = new InPlayer();
module.exports = index;
//# sourceMappingURL=inplayer.cjs.js.map
