(function(user, asset, misc, payment, subscription) {
    var _extend = function(p, methods) {
            for (var key in methods) {
                p[key] = methods[key];
            }
        },
        _run = function(fnArray) {
            var fn = fnArray.shift();

            fn()
                .then(function(data) {
                    console.log(data);
                    console.log('');

                    if (fnArray.length) {
                        _run(fnArray);
                    }
                })
                .catch(function(data) {
                    console.log(data.description, data.errors, fn);
                    console.log('');
                });
        };

    SDKTest = (function() {
        var token,
            fremium_access_id,
            test_subscription,
            access_fees = [],
            asset_id = 36187,
            external_asset = {
                type: 'kaltura',
                id: '1_uqvviioc',
            },
            package = {
                id: 36457,
            },
            userData = {
                fullName: 'sdk_test',
                email: 'sdk_test@sdktest.com',
                password: 'inplayer1',
                passwordConfirmation: 'inplayer1',
                merchantUuid: '528b1b80-5868-4abc-a9b6-4d3455d719c8',
                type: 'consumer',
                referrer: location.href,
            },
            get_discount_data = function() {
                return {
                    merchantId: 21,
                    voucherCode: 'm-true',
                    accessFeeId: access_fees[1].id,
                };
            },
            get_paypal_data = function() {
                var discountData = get_discount_data();

                return {
                    origin: location.href,
                    accessFee: discountData.accessFee,
                    paymentMethod: 2,
                    voucherCode: discountData.voucherCode,
                };
            },
            get_card_data = function() {
                return {
                    number: '4111111111111111',
                    cardName: 'Vld SDKTest',
                    expMonth: 10,
                    expYear: 2030,
                    cvv: 111,
                    accessFee: access_fees[1].id,
                    paymentMethod: 1,
                    referrer: 'http://google.com',
                };
            };

        function Constructor() {
            _run([
                /* User */
                this.logIn,
                this.getAccountInfo,
                this.logOut,
                this.logIn,
                this.isSignedIn,
                this.getToken,
                this.setTokenInCookie,
                this.requestNewPassword,
                this.setNewPassword,
                this.getSocialLoginUrls,
                this.getRegisterFields,
                this.updateAccount,
                this.changePassword,

                /* Asset */
                this.checkAccessForAsset.bind(this, asset_id),
                this.findAsset,
                this.findExternalAsset,
                this.findPackage,
                this.getAssetAccessFees.bind(this, asset_id),
                // // this.getFreemiumAccess,

                /* Payments */
                this.getPaymentMethods,
                this.getPayPalParams,
                this.payForAsset,
                this.getPaymentTools,

                /* Misc */
                this.getBranding,
                this.getDlcLinks,
                this.getDiscount,
                // // this.downloadProtectedFile,

                /* Subscription */
                this.getSubscriptions,
                this.subscribeForAsset,
                this.cancelSubscription,
            ]);
        }

        _extend(Constructor.prototype, {
            logIn: function() {
                return new Promise(function(resolve, reject) {
                    console.log('### InPlayer.User.signIn ###');
                    user.signIn(userData).then(function(res) {
                        if (!res.errors) {
                            token = res.access_token;
                            resolve(res);
                        } else {
                            console.log('### InPlayer.User.signUp ###');
                            user.signUp(userData).then(function(res) {
                                if (!res.errors) {
                                    token = res.access_token;
                                    resolve(res);
                                } else {
                                    res.description = '# InPlayer.User.signIn';
                                    reject(res);
                                }
                            });
                        }
                    });
                });
            },
            logOut: function() {
                console.log('### InPlayer.User.signOut ###');
                return new Promise(function(resolve, reject) {
                    user.signOut().then(function(res) {
                        resolve(res);
                    });
                });
            },
            isSignedIn: function() {
                console.log('### InPlayer.User.isSignedIn ###');
                return new Promise(function(resolve, reject) {
                    resolve(user.isSignedIn());
                });
            },
            getToken: function() {
                console.log('### InPlayer.User.token ###');
                return new Promise(function(resolve) {
                    resolve(user.token());
                });
            },
            setTokenInCookie: function() {
                console.log('### InPlayer.User.setTokenInCookie ###');
                return new Promise(function(resolve, reject) {
                    if (user.token() === token) {
                        resolve(token);
                    } else {
                        reject({
                            description: '# InPlayer.User.setTokenInCookie',
                            errors:
                                'For some reason token was not set in local storage. This happens in Chrome when using the file:// protocol',
                        });
                    }
                });
            },
            requestNewPassword: function() {
                console.log('### InPlayer.User.requestNewPassword ###');
                return new Promise(function(resolve, reject) {
                    var data = {
                        email: userData.email,
                        merchantUuid: userData.merchantUuid,
                    };

                    user.requestNewPassword(data).then(function(res) {
                        resolve(res);
                    });
                });
            },
            setNewPassword: function() {
                console.log('### InPlayer.User.setNewPassword ###');
                return new Promise(function(resolve, reject) {
                    user
                        .setNewPassword(userData, '49160496d22483ec')
                        .then(function(res) {
                            if (!res.errors) {
                                resolve(res);
                            } else {
                                res.description =
                                    '# InPlayer.User.setNewPassword';
                                reject(res);
                            }
                        });
                });
            },
            getSocialLoginUrls: function() {
                console.log('### InPlayer.User.getSocialLoginUrls ###');
                return new Promise(function(resolve, reject) {
                    var state = btoa(
                        JSON.stringify({
                            uuid: userData.merchantUuid,
                            redirect: window.location.href,
                        })
                    );

                    user.getSocialLoginUrls(state).then(function(res) {
                        resolve(res);
                    });
                });
            },
            getRegisterFields: function() {
                console.log('### InPlayer.User.getRegisterFields ###');
                return new Promise(function(resolve, reject) {
                    user
                        .getRegisterFields(userData.merchantUuid)
                        .then(function(res) {
                            resolve(res);
                        });
                });
            },
            updateAccount: function() {
                console.log('### InPlayer.User.updateAccount ###');
                return new Promise(function(resolve, reject) {
                    var data = {
                        fullName:
                            'New_Random_Name_' +
                            Math.round(Math.random() * 10000),
                        gender: 'male',
                        favorite_sport: 'soccer',
                    };

                    user.updateAccount(data, token).then(function(res) {
                        if (!res.errors) {
                            resolve(res);
                        } else {
                            res.description = '# InPlayer.User.updateAccount';
                            reject(res);
                        }
                    });
                });
            },
            changePassword: function() {
                console.log('### InPlayer.User.changePassword ###');
                return new Promise(function(resolve, reject) {
                    var data = {
                        oldPassword: userData.password,
                        password: userData.password,
                        passwordConfirmation: userData.passwordConfirmation,
                    };

                    user.changePassword(data, token).then(function(res) {
                        console.log(res);
                    });
                });
            },
            checkAccessForAsset: function(assets) {
                console.log('### InPlayer.Asset.checkAccessForAsset ###');
                return new Promise(function(resolve, reject) {
                    asset
                        .checkAccessForAsset(token, assets)
                        .then(function(res) {
                            resolve(res);
                        });
                });
            },
            findAsset: function() {
                console.log('### InPlayer.Asset.findAsset ###');
                return new Promise(function(resolve, reject) {
                    asset
                        .findAsset(asset_id, userData.merchantUuid)
                        .then(function(res) {
                            resolve(res);
                        });
                });
            },
            findExternalAsset: function() {
                console.log('### InPlayer.Asset.findExternalAsset ###');
                return new Promise(function(resolve, reject) {
                    asset
                        .findExternalAsset(
                            external_asset.type,
                            external_asset.id
                        )
                        .then(function(res) {
                            if (!res.errors) {
                                resolve(res);
                            } else {
                                res.description =
                                    '# InPlayer.User.findExternalAsset';
                                reject(res);
                            }
                        });
                });
            },
            findPackage: function() {
                console.log('### InPlayer.Asset.findPackage ###');
                return new Promise(function(resolve, reject) {
                    asset.findPackage(package.id).then(function(res) {
                        if (!res.errors) {
                            resolve(res);
                        } else {
                            res.description = '# Inplayer.Asset.findPackage';
                            reject(res);
                        }
                    });
                });
            },
            getAssetAccessFees: function() {
                console.log('### InPlayer.Asset.getAssetAccessFees ###');
                return new Promise(function(resolve, reject) {
                    asset.getAssetAccessFees(asset_id).then(function(res) {
                        if (res.length) {
                            access_fees = res;
                        }
                        resolve(res);
                    });
                });
            },
            getFreemiumAccess: function(access_fee) {
                console.log('### InPlayer.Asset.freemiumAsset ###');
                return new Promise(function(resolve, reject) {
                    asset.freemiumAsset(token, access_fee);
                });
            },
            getBranding: function() {
                console.log('### InPlayer.Misc.getBranding ###');
                return new Promise(function(resolve, reject) {
                    misc.getBranding(userData.merchantUuid).then(function(res) {
                        resolve(res);
                    });
                });
            },
            getDlcLinks: function() {
                console.log('### InPlayer.Misc.getDlcLinks ###');
                return new Promise(function(resolve, reject) {
                    misc.getDlcLinks(token, asset_id).then(function(res) {
                        resolve(res);
                    });
                });
            },
            getDiscount: function() {
                console.log('### InPlayer.Misc.getDiscount ###');
                return new Promise(function(resolve, reject) {
                    misc
                        .getDiscount(token, get_discount_data())
                        .then(function(res) {
                            resolve(res);
                        });
                });
            },
            getPaymentMethods: function() {
                console.log('### InPlayer.Payment.getPaymentMethods ###');
                return new Promise(function(resolve, reject) {
                    payment.getPaymentMethods(token).then(function(res) {
                        resolve(res);
                    });
                });
            },
            getPaymentTools: function() {
                console.log('### InPlayer.Payment.getPaymentTools ###');
                return new Promise(function(resolve, reject) {
                    payment.getPaymentTools(token, 1).then(function(res) {
                        resolve(res);
                    });
                });
            },
            getPayPalParams: function() {
                console.log('### InPlayer.Payment.getPayPalParams ###');
                return new Promise(function(resolve, reject) {
                    payment
                        .getPayPalParams(token, get_paypal_data())
                        .then(function(res) {
                            resolve(res);
                        });
                });
            },
            payForAsset: function() {
                console.log('### InPlayer.Payment.payForAsset ###');
                return new Promise(function(resolve, reject) {
                    payment
                        .payForAsset(token, get_card_data())
                        .then(function(res) {
                            resolve(res);
                        });
                });
            },
            getSubscriptions: function() {
                console.log('### InPlayer.Subscription.getSubscriptions ###');
                return new Promise(function(resolve, reject) {
                    subscription.getSubscriptions(token).then(function(res) {
                        if (res.length) {
                            test_subscription = res[0];
                        }

                        resolve(res);
                    });
                });
            },
            subscribeForAsset: function() {
                console.log('### InPlayer.Subscription.assetSubscribe ###');
                return new Promise(function(resolve, reject) {
                    subscription
                        .assetSubscribe(token, get_card_data())
                        .then(function(res) {
                            resolve(res);
                        });
                });
            },
            cancelSubscription: function() {
                console.log('### InPlayer.Subscription.cancelSubscription ###');
                if (!test_subscription) {
                    return Promise.resolve('No subscriptions to cancel');
                }

                return new Promise(function(resolve, reject) {
                    subscription
                        .cancelSubscription(
                            test_subscription.unsubscribe_url,
                            token
                        )
                        .then(function(res) {
                            resolve(res);
                        });
                });
            },
            getAccountInfo: function() {
                console.log('### InPlayer.User.getAccountInfo ###');
                return new Promise(function(resolve, reject) {
                    user.getAccountInfo(token).then(function(res) {
                        resolve(res);
                    });
                });
            },
        });

        return Constructor;
    })();

    new SDKTest();
})(
    InPlayer.User,
    InPlayer.Asset,
    InPlayer.Misc,
    InPlayer.Payment,
    InPlayer.Subscription
);
