(function(user, asset, misc, payment, subscription) {
    var _extend = function(p, methods) {
            for (var key in methods) {
                p[key] = methods[key];
            }
        },
        _run = function(fnArray) {
            var fn = fnArray.shift();

            new Promise(fn)
                .then(function(data) {
                    if (data.warn) {
                        console.warn(data.warn + '\n');
                    } else {
                        console.log(data);
                        console.log('');
                    }

                    if (fnArray.length) {
                        _run(fnArray);
                    }
                })
                .catch(function(data) {
                    console.error(data.description, data.errors);
                });
        };

    SDKTest = (function() {
        var token,
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
                metadata: {},
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
                    accessFee: discountData.accessFeeId,
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
                this.checkAccessForAsset,
                this.findAsset,
                this.findExternalAsset,
                this.findPackage,
                this.getAssetAccessFees,

                /* Payments */
                this.getPaymentMethods,
                this.getPayPalParams,
                this.payForAsset,
                this.getPaymentTools,
                this.getFreemiumAccess,

                /* Misc */
                this.getBranding,
                this.getDlcLinks,
                this.getDiscount,

                /* Subscription */
                this.getSubscriptions,
                this.subscribeForAsset,
                this.cancelSubscription,
            ]);
        }

        _extend(Constructor.prototype, {
            logIn: function(resolve, reject) {
                console.log('### InPlayer.User.signIn ###');

                user.authenticate(userData).then(function(res) {
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
            },
            logOut: function(resolve, reject) {
                console.log('### InPlayer.User.signOut ###');

                user.signOut().then(function(res) {
                    resolve(res);
                });
            },
            isSignedIn: function(resolve, reject) {
                console.log('### InPlayer.User.isSignedIn ###');
                resolve(user.isSignedIn());
            },
            getToken: function(resolve) {
                console.log('### InPlayer.User.token ###');
                resolve(user.token());
            },
            setTokenInCookie: function(resolve, reject) {
                console.log('### InPlayer.User.setTokenInCookie ###');

                if (user.token() === token) {
                    resolve(token);
                } else {
                    reject({
                        description: '# InPlayer.User.setTokenInCookie',
                        errors:
                            'For some reason token was not set in local storage. This happens in Chrome when using the file:// protocol',
                    });
                }
            },
            requestNewPassword: function(resolve, reject) {
                console.log('### InPlayer.User.requestNewPassword ###');

                var data = {
                    email: userData.email,
                    merchantUuid: userData.merchantUuid,
                };

                user.requestNewPassword(data).then(function(res) {
                    if (!res.errors) {
                        resolve(res);
                    } else {
                        res.description = '# InPlayer.User.requestNewPassword';
                        reject(res);
                    }
                });
            },
            setNewPassword: function(resolve, reject) {
                console.log('### InPlayer.User.setNewPassword ###');

                var mailToken = 'e01391be769497c9';
                user.setNewPassword(userData, mailToken).then(function(res) {
                    if (!res.errors) {
                        if (res.status === 204) {
                            resolve('Setting a new passwort went well');
                        } else {
                            resolve({
                                warn:
                                    'Setting a new password did not go well. You may be using an expired token. This token is sent by e-mail when a new password request has been made.',
                            });
                        }
                    } else {
                        res.description = '# InPlayer.User.setNewPassword';
                        reject(res);
                    }
                });
            },
            getSocialLoginUrls: function(resolve, reject) {
                console.log('### InPlayer.User.getSocialLoginUrls ###');

                var state = btoa(
                    JSON.stringify({
                        uuid: userData.merchantUuid,
                        redirect: window.location.href,
                    })
                );

                user.getSocialLoginUrls(state).then(function(res) {
                    if (!res.errors) {
                        resolve(res);
                    } else {
                        res.description = '# InPlayer.User.getSocialLoginUrls';
                        reject(res);
                    }
                });
            },
            getRegisterFields: function(resolve, reject) {
                console.log('### InPlayer.User.getRegisterFields ###');

                user.getRegisterFields(userData.merchantUuid).then(function(
                    res
                ) {
                    if (!res.errors) {
                        resolve(res);
                    } else {
                        res.description = '# InPlayer.User.getRegisterFields';
                        reject(res);
                    }
                });
            },
            updateAccount: function(resolve, reject) {
                console.log('### InPlayer.User.updateAccount ###');

                var data = {
                    fullName:
                        'New_Random_Name_' + Math.round(Math.random() * 10000),
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
            },
            changePassword: function(resolve, reject) {
                console.log('### InPlayer.User.changePassword ###');

                var data = {
                    oldPassword: userData.password,
                    password: userData.password,
                    passwordConfirmation: userData.passwordConfirmation,
                };

                user.changePassword(data, token).then(function(res) {
                    if (!res.errors) {
                        resolve(res);
                    } else {
                        res.description = '# InPlayer.User.changePassword';
                        reject(res);
                    }
                });
            },
            checkAccessForAsset: function(resolve, reject) {
                console.log('### InPlayer.Asset.checkAccessForAsset ###');

                asset.checkAccessForAsset(token, asset_id).then(function(res) {
                    resolve(res);
                });
            },
            findAsset: function(resolve, reject) {
                console.log('### InPlayer.Asset.findAsset ###');

                asset
                    .findAsset(asset_id, userData.merchantUuid)
                    .then(function(res) {
                        if (!res.errors) {
                            resolve(res);
                        } else {
                            res.description = '# InPlayer.Asset.findAsset';
                            reject(res);
                        }
                    });
            },
            findExternalAsset: function(resolve, reject) {
                console.log('### InPlayer.Asset.findExternalAsset ###');

                asset
                    .findExternalAsset(external_asset.type, external_asset.id)
                    .then(function(res) {
                        if (!res.errors) {
                            resolve(res);
                        } else {
                            res.description =
                                '# InPlayer.User.findExternalAsset';
                            reject(res);
                        }
                    });
            },
            findPackage: function(resolve, reject) {
                console.log('### InPlayer.Asset.findPackage ###');

                asset.findPackage(package.id).then(function(res) {
                    if (!res.errors) {
                        resolve(res);
                    } else {
                        res.description = '# Inplayer.Asset.findPackage';
                        reject(res);
                    }
                });
            },
            getAssetAccessFees: function(resolve, reject) {
                console.log('### InPlayer.Asset.getAssetAccessFees ###');

                asset.getAssetAccessFees(asset_id).then(function(res) {
                    if (res.length) {
                        access_fees = res;
                    }
                    resolve(res);
                });
            },
            getFreemiumAccess: function(resolve, reject) {
                console.log('### InPlayer.Asset.freemiumAsset ###');

                var freemium_access_id;
                access_fees.forEach(function(fee) {
                    if (
                        fee.access_type &&
                        fee.access_type.name === 'freemium'
                    ) {
                        freemium_access_id = fee.id;
                    }
                });

                if (!freemium_access_id) {
                    resolve({
                        warn:
                            'There is no freemium access fee available for current asset ' +
                            asset_id +
                            '. Please create one before testing this method.',
                    });

                    return;
                }

                asset
                    .getFreemiumAsset(token, freemium_access_id)
                    .then(function(res) {
                        if (!res.errors) {
                            resolve(res);
                        } else {
                            res.description = '# InPlayer.Asset.freemiumAsset';
                            reject(res);
                        }
                    });
            },
            getBranding: function(resolve, reject) {
                console.log('### InPlayer.Misc.getBranding ###');

                misc.getBranding(userData.merchantUuid).then(function(res) {
                    resolve(res);
                });
            },
            getDlcLinks: function(resolve, reject) {
                console.log('### InPlayer.Misc.getDlcLinks ###');

                misc.getDlcLinks(token, asset_id).then(function(res) {
                    resolve(res);
                });
            },
            getDiscount: function(resolve, reject) {
                console.log('### InPlayer.Misc.getDiscount ###');

                misc.getDiscount(token, get_discount_data()).then(function(
                    res
                ) {
                    resolve(res);
                });
            },
            getPaymentMethods: function(resolve, reject) {
                console.log('### InPlayer.Payment.getPaymentMethods ###');

                payment.getPaymentMethods(token).then(function(res) {
                    resolve(res);
                });
            },
            getPaymentTools: function(resolve, reject) {
                console.log('### InPlayer.Payment.getPaymentTools ###');

                payment.getPaymentTools(token, 1).then(function(res) {
                    resolve(res);
                });
            },
            getPayPalParams: function(resolve, reject) {
                console.log('### InPlayer.Payment.getPayPalParams ###');

                payment
                    .getPayPalParams(token, get_paypal_data())
                    .then(function(res) {
                        resolve(res);
                    });
            },
            payForAsset: function(resolve, reject) {
                console.log('### InPlayer.Payment.payForAsset ###');

                payment.payForAsset(token, get_card_data()).then(function(res) {
                    resolve(res);
                });
            },
            getSubscriptions: function(resolve, reject) {
                console.log('### InPlayer.Subscription.getSubscriptions ###');

                subscription.getSubscriptions(token).then(function(res) {
                    if (res.length) {
                        test_subscription = res[0];
                    }

                    resolve(res);
                });
            },
            subscribeForAsset: function(resolve, reject) {
                console.log('### InPlayer.Subscription.assetSubscribe ###');

                subscription
                    .assetSubscribe(token, get_card_data())
                    .then(function(res) {
                        resolve(res);
                    });
            },
            cancelSubscription: function(resolve, reject) {
                console.log('### InPlayer.Subscription.cancelSubscription ###');

                if (!test_subscription) {
                    return Promise.resolve('No subscriptions to cancel');
                }

                subscription
                    .cancelSubscription(
                        test_subscription.unsubscribe_url,
                        token
                    )
                    .then(function(res) {
                        resolve(res);
                    });
            },
            getAccountInfo: function(resolve, reject) {
                console.log('### InPlayer.User.getAccountInfo ###');

                user.getAccountInfo(token).then(function(res) {
                    resolve(res);
                });
            },
        });

        return Constructor;
    })();

    new SDKTest();
})(
    InPlayer.Account,
    InPlayer.Asset,
    InPlayer.Misc,
    InPlayer.Payment,
    InPlayer.Subscription
);
