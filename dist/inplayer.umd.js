(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('net'), require('websocket')) :
	typeof define === 'function' && define.amd ? define(['net', 'websocket'], factory) :
	(global.InPlayer = factory(global.net,global.websocket));
}(this, (function (net,websocket) { 'use strict';

net = net && net.hasOwnProperty('default') ? net['default'] : net;
websocket = websocket && websocket.hasOwnProperty('default') ? websocket['default'] : websocket;

function __async(g) {
  return new Promise(function (s, j) {
    function c(a, x) {
      try {
        var r = g[x ? "throw" : "next"](a);
      } catch (e) {
        j(e);return;
      }r.done ? s(r.value) : Promise.resolve(r.value).then(c, d);
    }function d(e) {
      c(e, 1);
    }c();
  });
}

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var js_cookie = createCommonjsModule(function (module, exports) {
/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
(function (factory) {
	var registeredInModuleLoader = false;
	if (typeof undefined === 'function' && undefined.amd) {
		undefined(factory);
		registeredInModuleLoader = true;
	}
	{
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var arguments$1 = arguments;

		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments$1[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var this$1 = this;

			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return (document.cookie = key + '=' + value + stringifiedAttributes);
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!this$1.json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this$1.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));
});

var js_cookie_1 = js_cookie.get;
var js_cookie_2 = js_cookie.set;
var js_cookie_3 = js_cookie.remove;

var config = {
  BASE_URL: 'https://staging-v2.inplayer.com',
  INPLAYER_TOKEN_NAME: 'inplayer_token',
  "stomp": {
    "url": "wss://staging-v2.inplayer.com:15671/ws",
    "login": "notifications",
    "password": "notifications"
  }
};

var API = {
  //User
  signIn: ((config.BASE_URL) + "/accounts/login"),
  signOut: ((config.BASE_URL) + "/accounts/logout"),
  signUp: ((config.BASE_URL) + "/accounts"),
  requestNewPassword: ((config.BASE_URL) + "/accounts/forgot-password"),
  setNewPassword: function (token) { return ((config.BASE_URL) + "/accounts/forgot-password/" + token); },
  getAccountInfo: ((config.BASE_URL) + "/accounts"),
  social: function (state) { return ((config.BASE_URL) + "/accounts/social?state=" + state); },
  updateAccount: ((config.BASE_URL) + "/accounts"),
  changePassword: ((config.BASE_URL) + "/accounts/change-password"),
  getRegisterFields: function (merchant_uuid) { return ((config.BASE_URL) + "/accounts/register-fields/" + merchant_uuid); },
  //Asset
  checkAccess: function (id, multiple) {
    if ( multiple === void 0 ) multiple = false;

    return multiple ? ((config.BASE_URL) + "/item/access?" + id) : ((config.BASE_URL) + "/items/" + id + "/access");
  },
  findAsset: function (assetId, merchant_uuid) { return ((config.BASE_URL) + "/items/" + merchant_uuid + "/" + assetId); },
  findExternalAsset: function (assetType, externalId) { return ((config.BASE_URL) + "/items/assets/external/" + assetType + "/" + externalId); },
  findPackage: function (id) { return ((config.BASE_URL) + "/items/packages/" + id); },
  findAccessFees: function (id) { return ((config.BASE_URL) + "/items/" + id + "/access-fees"); },
  freemium: ((config.BASE_URL) + "/items/access/unlimited"),
  //Payment
  getPaymentMethods: ((config.BASE_URL) + "/payments/methods"),
  getPaymentTools: function (paymentMethodId) { return ((config.BASE_URL) + "/payments/method/" + paymentMethodId + "/tools"); },
  payForAsset: ((config.BASE_URL) + "/payments"),
  externalPayments: ((config.BASE_URL) + "/external-payments"),
  //Subscriptions
  getSubscriptions: ((config.BASE_URL) + "/subscriptions"),
  subscribe: ((config.BASE_URL) + "/subscriptions"),
  //Misc
  getDlcLinks: function (id) { return ((config.BASE_URL) + "/dlc/" + id + "/links"); },
  getDiscount: ((config.BASE_URL) + "/vouchers/discount"),
  getBranding: function (merchant_uuid) { return ((config.BASE_URL) + "/branding/paywall/" + merchant_uuid); },
  downloadFile: function (assetId, filename) { return ((config.BASE_URL) + "/dlc/" + assetId + "/" + filename); }

};

/**
 * Contains all Requests regarding user/account and authentication
 *
 * @class User
 */
var User = function User () {};

User.prototype.signIn = function signIn (data) {
  return __async(function* () {
    // Add into form data
    var fd = new FormData();
    fd.append('email', data.email);
    fd.append('password', data.password);
    fd.append('merchant_uuid', data.merchantUid);
    fd.append('referrer', data.referrer);

    // request
    try {
      var response = yield fetch(API.signIn, {
        method: 'POST',
        body: fd
      });

      var data$1 = yield response.json();

      /* set cookies */
      if (data$1.access_token) {
        js_cookie_2(config.INPLAYER_TOKEN_NAME, data$1.access_token);
      }

      return data$1;
    } catch (error) {
      return error;
    }
  }());
};

/**
 * Signs out the user and destroys cookies
 * @method signOut
 * @async
 * @example
 *   InPlayer.User.signOut()
 *   .then(data => console.log(data));
 * @return {Boolean}
*/
User.prototype.signOut = function signOut () {
  return __async(function* () {
    var token = js_cookie_1(config.INPLAYER_TOKEN_NAME);

    try {
      var response = yield fetch(API.signOut, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      var data = yield response.json();
      // if response is okay
      if (data.explain) {
        js_cookie_3(config.INPLAYER_TOKEN_NAME);
      }
      return true;
    } catch (error) {
      return false;
    }
  }());
};

/**
 * Signs up/Registers user
 * @method signUp
 * @async
 * @param {Object} data - Contains {
 *fullName: string,
 *email: string
 *password: string,
 *passwordConfirmation: string,
 *merchantUid: string,
 *type: number
 *referrer: string,
 * }
 * @example
 *   InPlayer.User.signUp({
 *    fullName: "test",
 *    email: "test32@test.com",
 *    password: "12345678",
 *    passwordConfirmation: "12345678",
 *    merchantUid: "528b1b80-5868-4abc-a9b6-4d3455d719c8",
 *    type: "consumer",
 *    referrer: "http://localhost:3000/",
 *   })
 *   .then(data => console.log(data));
 * @return {Object}
*/
User.prototype.signUp = function signUp (data) {
  return __async(function* () {

    // Add into form data
    var fd = new FormData();
    fd.append('full_name', data.fullName);
    fd.append('email', data.email);
    fd.append('password', data.password);
    fd.append('password_confirmation', data.passwordConfirmation);
    fd.append('merchant_uuid', data.merchantUid);
    fd.append('type', data.type);
    fd.append('referrer', data.referrer);

    try {
      var response = yield fetch(API.signUp, {
        method: 'POST',
        body: fd
      });

      var data$1 = yield response.json();

      return data$1;
    } catch (error) {
      return false;
    }
  }());
};

/**
 * Checks if user is signed in
 * @method isSignedIn
 * @example
 *  InPlayer.User
 *  .isSignedIn()
 * @return {Boolean}
*/
User.prototype.isSignedIn = function isSignedIn () {
  return js_cookie_1(config.INPLAYER_TOKEN_NAME) !== undefined;
};

/**
 * Returns users Auth token
 * @method token
 * @example
 *   InPlayer.User
 *   .token()
 * @return {String}
*/
User.prototype.token = function token () {
  return js_cookie_1(config.INPLAYER_TOKEN_NAME);
};

/**
 * Sets Auth token into cookies
 * @method token
 * @param {String} token - The Authorization token which needs to be set
 * @example
 *   InPlayer.User
 *   .setTokenInCookie('aed1g284i3dnfrfnd1o23rtegk')
 * @return {void}
*/
User.prototype.setTokenInCookie = function setTokenInCookie (token) {
  js_cookie_2(config.INPLAYER_TOKEN_NAME, token);
};

/**
 * Requests new password for a given user
 * @method requestNewPassword
 * @async
 * @param {Object} data - Contains {
 *email: String,
 *merchantUid: string
 * }
 * @example
 *   InPlayer.User
 *   .requestNewPassword({
 *    email: "test32@test.com",
 *    merchantUid: "528b1b80-5868-4abc-a9b6-4d3455d719c8",
 *   })
 *   .then(data => console.log(data));
 * @return {Object}
*/
User.prototype.requestNewPassword = function requestNewPassword (data) {
  return __async(function* () {

    // Add into from FormData
    var fd = new FormData();
    fd.append('email', data.email);
    fd.append('merchant_uuid', data.merchantUid);

    try {
      var response = yield fetch(API.requestNewPassword, {
        method: 'POST',
        body: fd
      });

      var data$1 = yield response.json();

      return data$1;
    } catch (error) {
      return false;
    }
  }());
};

/**
 * Sets new password for the user
 * @method setNewPassword
 * @async
 * @param {Object} data - Contains {
 *password: string
 *passwordConfirmation: string
 * }
 * @param {String} token - The authorization token
 * @example
 *   InPlayer.User
 *   .setNewPassword({
 *    password: "12345",
 *    passwordConfirmation: "12345",
 *   }, 'afhqi83rji74hjf7e43df')
 *   .then(data => console.log(data));
 * @return {Object}
*/
User.prototype.setNewPassword = function setNewPassword (data, token) {
  return __async(function* () {

    var body = "password=" + (data.password) + "&password_confirmation=" + (data.passwordConfirmation);

    try {
      var response = yield fetch(API.setNewPassword(token), {
        method: 'PUT',
        body: body,
        headers: {
          'Content-Type': 'x-www-form-urlencoded'
        }
      });

      var data$1 = yield response.json();

      return data$1;
    } catch (error) {
      return false;
    }
  }());
};

/**
 * Gets the user/account information for a given auth token
 * @method getAccountInfo
 * @async
 * @param {String} token - The authorization token
 * @example
 *   InPlayer.User
 *   .getAccountInfo('afhqi83rji74hjf7e43df')
 *   .then(data => console.log(data));
 * @return {Object}
*/
User.prototype.getAccountInfo = function getAccountInfo (token) {
  return __async(function* () {
    try {
      var response = yield fetch(API.getAccountInfo, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      var data = yield response.json();
      if (data) { return data; }
    } catch (error) {
      return false;
    }
  }());
};

/**
 * Gets the social login urls for fb/twitter/google
 * @method getSocialLoginUrls
 * @async
 * @param {String} state - The state for the social
 * @example
 *   InPlayer.User
 *   .getSocialLoginUrls('123124-1r-1r13ur1h1')
 *   .then(data => console.log(data));
 * @return {Object}
*/
User.prototype.getSocialLoginUrls = function getSocialLoginUrls (state) {
  return __async(function* () {
    try {
      var response = yield fetch(API.social(state), {
        method: 'GET'
      });

      var data = yield response.json();

      if (data) { return data; }
    } catch (error) {
      return false;
    }
  }());
};

/**
 * Updates the account info
 * @method updateAccount
 * @async
 * @param {Object} data - The new data for the account
 * @param {String} token - The authorization token
 * @example
 *   InPlayer.User
 *   .updateAccount({first_name: 'test'},'123124-1r-1r13ur1h1')
 *   .then(data => console.log(data));
 * @return {Object}
*/
User.prototype.updateAccount = function updateAccount (data, token) {
  return __async(function* () {
    try {
      var response = yield fetch(API.updateAccount, {
        method: 'PUT',
        body: data,
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'x-www-form-urlencoded'
        }
      });

      var data = yield response.json();

      return data;
    } catch (error) {
      return false;
    }
  }());
};

/**
 * Changes password for a given user
 * @method changePassword
 * @async
 * @param {Object} data - Contains new password
 * @param {String} token - The authorization token
 * @example
 *   InPlayer.User
 *   .updateAccount({},'123124-1r-1r13ur1h1')
 *   .then(data => console.log(data));
 * @return {Object}
*/
User.prototype.changePassword = function changePassword (data, token) {
  return __async(function* () {

    var fd = new FormData();
    fd.append('token', data.email);
    fd.append('password', data.password);
    fd.append('password_confirmation', data.passwordConfirmation);

    try {
      var response = yield fetch(API.changePassword, {
        method: 'POST',
        body: fd,
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      var data$1 = yield response.json();

      return data$1;
    } catch (error) {
      return false;
    }
  }());
};

/**
 * Gets register fields
 * @method getRegisterFields
 * @async
 * @param {String} merchantUid - The merchant UUID
 * @example
 *   InPlayer.User
 *   .getRegisterFields('123124-1r-1r13ur1h1')
 *   .then(data => console.log(data));
 * @return {Object}
*/
User.prototype.getRegisterFields = function getRegisterFields (merchantUid) {
  return __async(function* () {
    try {
      var response = yield fetch(API.getRegisterFields(merchantUid));

      var data = yield response.json();

      return data;
    } catch (error) {
      return false;
    }
  }());
};

/**
 * Contains all Requests connected with assets/items
 *
 * @class Asset
 */
var Asset = function Asset () {};

Asset.prototype.checkAccessForAsset = function checkAccessForAsset (token, id) {
  return __async(function* () {
    try {
      var response = yield fetch(API.checkAccess(id), {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      var data = yield response.json();

      return data;
    } catch (error) {
      return false;
    }
  }());
};

/**
 * Checks whether a given authenticated user has access for an array of assets
 * @method checkAccessForMultipleAssets
 * @async
 * @param {String} token - The Authorization token
 * @param {Array} ids - Array with asset ids
 * @example
 *   InPlayer.Asset
 *   .checkAccessForMultipleAssets('eyJ0eXAiOiJKPECENR5Y',[36320,27215])
 *   .then(data => console.log(data));
 * @return {Object}
*/
Asset.prototype.checkAccessForMultipleAssets = function checkAccessForMultipleAssets (token, ids) {
  return __async(function* () {
    try {
      var response = yield fetch(API.checkAccess(ids, true), {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      var data = yield response.json();

      return data;
    } catch (error) {
      return false;
    }
  }());
};

/**
 * Get the asset info for a given asset ID and merchant UUID
 * @method findAsset
 * @async
 * @param {Numer} assetId - The ID of the asset
 * @param {String} merchantUid - The merchant UUID string
 * @example
 *   InPlayer.Asset
 *   .findAsset(2,'a1f13-dd1dfh-rfh123-dhd1hd-fahh1dl')
 *   .then(data => console.log(data));
 * @return {Object}
*/
Asset.prototype.findAsset = function findAsset (assetId, merchantUid) {
  return __async(function* () {
    try {
      var response = yield fetch(API.findAsset(assetId, merchantUid), {
        method: 'GET'
      });

      var data = yield response.json();

      return data;
    } catch (error) {
      return false;
    }
  }());
};

/**
 * Get an external assets' info
 * @method findExternalAsset
 * @async
 * @param {String} assetType - The type ID of the asset
 * @param {String} externalId - The ID of the external asset
 * @example
 *   InPlayer.Asset
 *   .findExternalAsset('331ff2','44237')
 *   .then(data => console.log(data));
 * @return {Object}
*/
Asset.prototype.findExternalAsset = function findExternalAsset (assetType, externalId) {
  return __async(function* () {
    try {
      var response = yield fetch(API.findExternalAsset(assetType, externalId), {
        method: 'GET'
      });

      var data = yield response.json();

      return data;
    } catch (error) {
      return false;
    }
  }());
};

/**
 * Get package info for a given Package ID
 * @method findPackage
 * @async
 * @param {Numer} id - The type ID of the package
 * @example
 *   InPlayer.Asset
 *   .findPackage(4444)
 *   .then(data => console.log(data));
 * @return {Object}
*/
Asset.prototype.findPackage = function findPackage (id) {
  return __async(function* () {
    try {
      var response = yield fetch(API.findPackage(id), {
        method: 'GET'
      });

      var data = yield response.json();

      return data;
    } catch (error) {
      return false;
    }
  }());
};

/**
 * Get the access fees for a given asset ID
 * @method getAssetAccessFees
 * @async
 * @param {Numer} id - The ID of the asset
 * @example
 *   InPlayer.Asset
 *   .getAssetAccessFees(555)
 *   .then(data => console.log(data))
 * @return {Object}
*/
Asset.prototype.getAssetAccessFees = function getAssetAccessFees (id) {
  return __async(function* () {
    try {
      var response = yield fetch(API.findAccessFees(id), {
        method: 'GET'
      });

      var data = yield response.json();

      return data;
    } catch (error) {
      return false;
    }
  }());
};

/**
 * Authorize for the freemium asset (login)
 * @method getFreemiumAsset
 * @async
 * @param {String} token - The authorization token
 * @param {Object} data - { accessFee: Number }
 * @example
 *   InPlayer.Asset
 *   .freemiumAsset('uoifhadafefbad1312nfuqd123', { accessFee: 22 })
 *   .then(data => console.log(data));
 * @return {Object}
*/
Asset.prototype.getFreemiumAsset = function getFreemiumAsset (token, accessFee) {
  return __async(function* () {
    try {
      var response = yield fetch(API.freemium, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: {
          access_fee: accessFee
        }
      });

      var data = yield response.json();

      return data;
    } catch (error) {
      return false;
    }
  }());
};

/**
 * Contains all Requests connected with payments
 *
 * @class Payment
 */
var Payment = function Payment () {};

Payment.prototype.getPaymentMethods = function getPaymentMethods (token) {
  return __async(function* () {
    try {
      var response = yield fetch(API.getPaymentMethods, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      var data = yield response.json();

      return data;
    } catch (error) {
      return false;
    }
  }());
};

/**
 * Get the payment tools for an aothorization token and payment method ID
 * @method getPaymentTools
 * @async
 * @param {String} token - The Authorization token
 * @param {Number} paymentMethodId - The Payment Method ID
 * @example
 *   InPlayer.Payment
 *   .getPaymentTools('dajh8ao8djadd2o8jh2ofkhdhqkgog3oj', 2)
 *   .then(data => console.log(data));
 * @return {Object}
*/
Payment.prototype.getPaymentTools = function getPaymentTools (token, paymentMethodId) {
  return __async(function* () {
    try {
      var response = yield fetch(API.getPaymentTools(paymentMethodId), {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      var data = yield response.json();

      return data;
    } catch (error) {
      return false;
    }
  }());
};

/**
 * Makes a Payment for a given Authorization token + asset/payment details
 * @method payForAsset
 * @async
 * @param {String} token - The Authorization token
 * @param {Object} data - Payment data - {
 *number: Number,
 *cardName: String,
 *expMonth: Number,
 *expYear: Number,
 *cvv: Number,
 *accessFee: Number,
 *paymentMethod: String,
 *referrer: String
 *voucherCode?: String
 * }
 * @example
 *   // data.payment_method = { id.... }
 *   InPlayer.Payment
 *   .payForAsset('dajh8ao8djadd2o8jh2ofkhdhqkgog3oj',
 *    {
 *     number: 4111111111111111,
 *     cardName: 'PayPal',
 *     expMonth: 10,
 *     expYear: 2030,
 *     cvv: 656,
 *     accessFee: 2341,
 *     paymentMethod: 1,
 *     referrer: 'http://google.com',
 *     voucherCode: 'fgh1982gff-0f2grfds'
 *    })
 *   .then(data => console.log(data));
 * @return {Object}
*/
Payment.prototype.payForAsset = function payForAsset (token, data) {
  return __async(function* () {

    var fd = new FormData();
    fd.append('number', data.number);
    fd.append('card_name', data.cardName);
    fd.append('exp_month', data.expMonth);
    fd.append('exp_year', data.expYear);
    fd.append('cvv', data.cvv);
    fd.append('access_fee', data.accessFee);
    fd.append('payment_method', data.paymentMethod);
    fd.append('referrer', data.referrer);
    fd.append('voucherCode', data.voucherCode);

    try {
      var response = yield fetch(API.payForAsset, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: fd
      });

      var data$1 = yield response.json();

      return data$1;
    } catch (error) {
      return false;
    }
  }());
};

/**
 * Gets parameters for PayPal
 * @method getPayPalParams
 * @async
 * @param {String} token - The Authorization token
 * @param {Object} data - Contains details - {
 *origin: {String},
 *accessFee: {Number},
 *paymentMethod: {Number}
 * }
 * @example
 *   InPlayer.Payment
 *   .getPayPalParams('dajh8ao8djadd2o8jh2ofkhdhqkgog3oj', {
 *   origin: location.href,
 *   accessFee: 34,
 *   paymentMethod: 2
 *   })
 *   .then(data => console.log(data));
 * @return {Object}
*/
Payment.prototype.getPayPalParams = function getPayPalParams (token, data) {
  return __async(function* () {
    try {
      var response = yield fetch(API.externalPayments, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: data
      });

      var data = yield response.json();

      return data;
    } catch (error) {
      return false;
    }
  }());
};

/**
 * Contains all Requests connected with subscriptions
 *
 * @class Subscription
 */
var Subscription = function Subscription () {};

Subscription.prototype.getSubscriptions = function getSubscriptions (token) {
  return __async(function* () {
    try {
      var response = yield fetch(API.getSubscriptions, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      var data = response.json();

      return data;
    } catch (error) {
      return false;
    }
  }());
};

/**
 * Cancels a subscription
 * @method cancelSubscription
 * @async
 * @param {String} unsubscribeUrl - The url for the subscription which is getting unsubscribed
 * @param {String} token - The Authorization token
 * @example
 *   InPlayer.Subscription
 *   .cancelSubscription('http://localhost/subscription/1','eyJ0eXAiOiJKPECENR5Y')
 *   .then(data => console.log(data));
 * @return {Object}
*/
Subscription.prototype.cancelSubscription = function cancelSubscription (unsubscribeUrl, token) {
  return __async(function* () {
    try {
      var response = yield fetch(unsubscribeUrl, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      var data = response.json();

      return data;
    } catch (error) {
      return false;
    }
  }());
};

/**
 * Subscribes to a given asset
 * @method assetSubscribe
 * @async
 * @param {String} token - The Authorization token
 * @param {Object} data - {
 *number: Number,
 *cardName: String,
 *expMonth: Number,
 *expYear: Number,
 *cvv: Number,
 *accessFee: Number,
 *paymentMethod: String,
 *referrer: String
 *voucherCode?: String
 * }
 * @example
 *   InPlayer.Subscription
 *   .assetSubscribe('eyJ0eXAiOiJKPECENR5Y', {
 *      number: 1,
 *      cardName: 'Payoneer',
 *      expMonth: 11,
 *      expYear: 12,
 *      cvv: 546,
 *      accessFee: 13.4,
 *      paymentMethod: 'card',
 *      referrer: 'http://localhost:3000',
 *      voucherCode: '123123125914i2erjfg'
 *      }
 *   )
 *   .then(data => console.log(data));
 * @return {Object}
*/
Subscription.prototype.assetSubscribe = function assetSubscribe (token, data) {
  return __async(function* () {

    var fd = new FormData();
    fd.append('number', data.number);
    fd.append('card_name', data.cardName);
    fd.append('exp_month', data.expMonth);
    fd.append('exp_year', data.expYear);
    fd.append('cvv', data.cvv);
    fd.append('access_fee', data.accessFee);
    fd.append('payment_method', data.paymentMethod);
    fd.append('referrer', data.referrer);
    fd.append('voucherCode', data.voucher_code);

    try {
      var response = yield fetch(API.subscribe, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: fd
      });

      var data$1 = yield response.json();

      return data$1;
    } catch (error) {
      return false;
    }
  }());
};

/**
 * Contains mixed various types of functiosn for dlcs, discounts, branding, etc.
 *
 * @class Misc
 */
var Misc = function Misc () {};

Misc.prototype.getDlcLinks = function getDlcLinks (token, assetId) {
  return __async(function* () {
    try {
      var response = yield fetch(API.getDlcLinks(assetId), {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      var data = yield response.json();

      return data;
    } catch (error) {
      return false;
    }
  }());
};

/**
 * Gets the discount for a given ..
 * @method getDiscount
 * @async
 * @param {String} token - The Authorization token
 * @param {Object} data - {
 * voucher_code: String,
 * merchant_id: String,
 * access_fee_id: Number
 * }
 * @example
 *   InPlayer.Misc
 *   .getDiscount('eyJ0eXAiOiJKPECENR5Y',{
 *      voucherCode: '120fwjhniudh42i7',
 *      merchantId: 'hghfqw92dm29-1g',
 *      accessFeeId: 2
 *   })
 *   .then(data => console.log(data));
 * @return {Object}
*/
Misc.prototype.getDiscount = function getDiscount (token, data) {
  return __async(function* () {

    var fd = new FormData();
    fd.append('access_fee_id', data.accessFeeId);
    fd.append('voucherCode', data.voucherCode);
    fd.append('merchantId', data.merchantId);

    try {
      var response = yield fetch(API.getDiscount, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: fd
      });

      var data$1 = yield response.json();

      return data$1;
    } catch (error) {
      return false;
    }
  }());
};

/**
 * Gets branding for given merchant
 * @method getBranding
 * @async
 * @param {String} merchantUid - The UUID of the merchant
 * @example
 *   InPlayer.Misc
 *   .getBranding('eyJ0e-XAiOi-JKPEC-ENR5Y')
 *   .then(data => console.log(data));
 * @return {Object}
*/
Misc.prototype.getBranding = function getBranding (merchantUid) {
  return __async(function* () {
    try {
      var response = yield fetch(API.getBranding(merchantUid), {
        method: 'GET'
      });

      var data = yield response.json();

      return data;
    } catch (error) {
      return false;
    }
  }());
};

/**
 * Downloads a file
 * @method downloadProtectedFile
 * @async
 * @param {String} token - The Authorization token
 * @param {number} assetId - The Id of the asset
 * @param {String} filename - The name of the file
 * @example
 *   InPlayer.Misc
 *   .downloadProtectedFile('eyJ0eXAiOiJKPECENR5Y',2234, 'test.js')
 *   .then(data => console.log(data));
 * @return {Object}
*/
Misc.prototype.downloadProtectedFile = function downloadProtectedFile (token, assetId, filename) {
  return __async(function* () {
    try {
      var response = yield fetch(API.downloadFile(assetId, filename), {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      var data = yield response.json();

      return data;
    } catch (error) {
      return false;
    }
  }());
};

var stomp = createCommonjsModule(function (module, exports) {
// Generated by CoffeeScript 1.7.1

/*
   Stomp Over WebSocket http://www.jmesnil.net/stomp-websocket/doc/ | Apache License V2.0

   Copyright (C) 2010-2013 [Jeff Mesnil](http://jmesnil.net/)
   Copyright (C) 2012 [FuseSource, Inc.](http://fusesource.com)
 */

(function() {
  var Byte, Client, Frame, Stomp,
    __hasProp = {}.hasOwnProperty,
    __slice = [].slice;

  Byte = {
    LF: '\x0A',
    NULL: '\x00'
  };

  Frame = (function() {
    var unmarshallSingle;

    function Frame(command, headers, body) {
      this.command = command;
      this.headers = headers != null ? headers : {};
      this.body = body != null ? body : '';
    }

    Frame.prototype.toString = function() {
      var lines, name, skipContentLength, value, _ref;
      lines = [this.command];
      skipContentLength = this.headers['content-length'] === false ? true : false;
      if (skipContentLength) {
        delete this.headers['content-length'];
      }
      _ref = this.headers;
      for (name in _ref) {
        if (!__hasProp.call(_ref, name)) { continue; }
        value = _ref[name];
        lines.push("" + name + ":" + value);
      }
      if (this.body && !skipContentLength) {
        lines.push("content-length:" + (Frame.sizeOfUTF8(this.body)));
      }
      lines.push(Byte.LF + this.body);
      return lines.join(Byte.LF);
    };

    Frame.sizeOfUTF8 = function(s) {
      if (s) {
        return encodeURI(s).match(/%..|./g).length;
      } else {
        return 0;
      }
    };

    unmarshallSingle = function(data) {
      var body, chr, command, divider, headerLines, headers, i, idx, len, line, start, trim, _i, _j, _len, _ref, _ref1;
      divider = data.search(RegExp("" + Byte.LF + Byte.LF));
      headerLines = data.substring(0, divider).split(Byte.LF);
      command = headerLines.shift();
      headers = {};
      trim = function(str) {
        return str.replace(/^\s+|\s+$/g, '');
      };
      _ref = headerLines.reverse();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        line = _ref[_i];
        idx = line.indexOf(':');
        headers[trim(line.substring(0, idx))] = trim(line.substring(idx + 1));
      }
      body = '';
      start = divider + 2;
      if (headers['content-length']) {
        len = parseInt(headers['content-length']);
        body = ('' + data).substring(start, start + len);
      } else {
        chr = null;
        for (i = _j = start, _ref1 = data.length; start <= _ref1 ? _j < _ref1 : _j > _ref1; i = start <= _ref1 ? ++_j : --_j) {
          chr = data.charAt(i);
          if (chr === Byte.NULL) {
            break;
          }
          body += chr;
        }
      }
      return new Frame(command, headers, body);
    };

    Frame.unmarshall = function(datas) {
      var data;
      return (function() {
        var _i, _len, _ref, _results;
        _ref = datas.split(RegExp("" + Byte.NULL + Byte.LF + "*"));
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          data = _ref[_i];
          if ((data != null ? data.length : void 0) > 0) {
            _results.push(unmarshallSingle(data));
          }
        }
        return _results;
      })();
    };

    Frame.marshall = function(command, headers, body) {
      var frame;
      frame = new Frame(command, headers, body);
      return frame.toString() + Byte.NULL;
    };

    return Frame;

  })();

  Client = (function() {
    var now;

    function Client(ws) {
      this.ws = ws;
      this.ws.binaryType = "arraybuffer";
      this.counter = 0;
      this.connected = false;
      this.heartbeat = {
        outgoing: 10000,
        incoming: 10000
      };
      this.maxWebSocketFrameSize = 16 * 1024;
      this.subscriptions = {};
    }

    Client.prototype.debug = function(message) {
      var _ref;
      return typeof window !== "undefined" && window !== null ? (_ref = window.console) != null ? _ref.log(message) : void 0 : void 0;
    };

    now = function() {
      if (Date.now) {
        return Date.now();
      } else {
        return new Date().valueOf;
      }
    };

    Client.prototype._transmit = function(command, headers, body) {
      var this$1 = this;

      var out;
      out = Frame.marshall(command, headers, body);
      if (typeof this.debug === "function") {
        this.debug(">>> " + out);
      }
      while (true) {
        if (out.length > this$1.maxWebSocketFrameSize) {
          this$1.ws.send(out.substring(0, this$1.maxWebSocketFrameSize));
          out = out.substring(this$1.maxWebSocketFrameSize);
          if (typeof this$1.debug === "function") {
            this$1.debug("remaining = " + out.length);
          }
        } else {
          return this$1.ws.send(out);
        }
      }
    };

    Client.prototype._setupHeartbeat = function(headers) {
      var serverIncoming, serverOutgoing, ttl, v, _ref, _ref1;
      if ((_ref = headers.version) !== Stomp.VERSIONS.V1_1 && _ref !== Stomp.VERSIONS.V1_2) {
        return;
      }
      _ref1 = (function() {
        var _i, _len, _ref1, _results;
        _ref1 = headers['heart-beat'].split(",");
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          v = _ref1[_i];
          _results.push(parseInt(v));
        }
        return _results;
      })(), serverOutgoing = _ref1[0], serverIncoming = _ref1[1];
      if (!(this.heartbeat.outgoing === 0 || serverIncoming === 0)) {
        ttl = Math.max(this.heartbeat.outgoing, serverIncoming);
        if (typeof this.debug === "function") {
          this.debug("send PING every " + ttl + "ms");
        }
        this.pinger = Stomp.setInterval(ttl, (function(_this) {
          return function() {
            _this.ws.send(Byte.LF);
            return typeof _this.debug === "function" ? _this.debug(">>> PING") : void 0;
          };
        })(this));
      }
      if (!(this.heartbeat.incoming === 0 || serverOutgoing === 0)) {
        ttl = Math.max(this.heartbeat.incoming, serverOutgoing);
        if (typeof this.debug === "function") {
          this.debug("check PONG every " + ttl + "ms");
        }
        return this.ponger = Stomp.setInterval(ttl, (function(_this) {
          return function() {
            var delta;
            delta = now() - _this.serverActivity;
            if (delta > ttl * 2) {
              if (typeof _this.debug === "function") {
                _this.debug("did not receive server activity for the last " + delta + "ms");
              }
              return _this.ws.close();
            }
          };
        })(this));
      }
    };

    Client.prototype._parseConnect = function() {
      var args, connectCallback, errorCallback, headers;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      headers = {};
      switch (args.length) {
        case 2:
          headers = args[0], connectCallback = args[1];
          break;
        case 3:
          if (args[1] instanceof Function) {
            headers = args[0], connectCallback = args[1], errorCallback = args[2];
          } else {
            headers.login = args[0], headers.passcode = args[1], connectCallback = args[2];
          }
          break;
        case 4:
          headers.login = args[0], headers.passcode = args[1], connectCallback = args[2], errorCallback = args[3];
          break;
        default:
          headers.login = args[0], headers.passcode = args[1], connectCallback = args[2], errorCallback = args[3], headers.host = args[4];
      }
      return [headers, connectCallback, errorCallback];
    };

    Client.prototype.connect = function() {
      var args, errorCallback, headers, out;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      out = this._parseConnect.apply(this, args);
      headers = out[0], this.connectCallback = out[1], errorCallback = out[2];
      if (typeof this.debug === "function") {
        this.debug("Opening Web Socket...");
      }
      this.ws.onmessage = (function(_this) {
        return function(evt) {
          var arr, c, client, data, frame, messageID, onreceive, subscription, _i, _len, _ref, _results;
          data = typeof ArrayBuffer !== 'undefined' && evt.data instanceof ArrayBuffer ? (arr = new Uint8Array(evt.data), typeof _this.debug === "function" ? _this.debug("--- got data length: " + arr.length) : void 0, ((function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = arr.length; _i < _len; _i++) {
              c = arr[_i];
              _results.push(String.fromCharCode(c));
            }
            return _results;
          })()).join('')) : evt.data;
          _this.serverActivity = now();
          if (data === Byte.LF) {
            if (typeof _this.debug === "function") {
              _this.debug("<<< PONG");
            }
            return;
          }
          if (typeof _this.debug === "function") {
            _this.debug("<<< " + data);
          }
          _ref = Frame.unmarshall(data);
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            frame = _ref[_i];
            switch (frame.command) {
              case "CONNECTED":
                if (typeof _this.debug === "function") {
                  _this.debug("connected to server " + frame.headers.server);
                }
                _this.connected = true;
                _this._setupHeartbeat(frame.headers);
                _results.push(typeof _this.connectCallback === "function" ? _this.connectCallback(frame) : void 0);
                break;
              case "MESSAGE":
                subscription = frame.headers.subscription;
                onreceive = _this.subscriptions[subscription] || _this.onreceive;
                if (onreceive) {
                  client = _this;
                  messageID = frame.headers["message-id"];
                  frame.ack = function(headers) {
                    if (headers == null) {
                      headers = {};
                    }
                    return client.ack(messageID, subscription, headers);
                  };
                  frame.nack = function(headers) {
                    if (headers == null) {
                      headers = {};
                    }
                    return client.nack(messageID, subscription, headers);
                  };
                  _results.push(onreceive(frame));
                } else {
                  _results.push(typeof _this.debug === "function" ? _this.debug("Unhandled received MESSAGE: " + frame) : void 0);
                }
                break;
              case "RECEIPT":
                _results.push(typeof _this.onreceipt === "function" ? _this.onreceipt(frame) : void 0);
                break;
              case "ERROR":
                _results.push(typeof errorCallback === "function" ? errorCallback(frame) : void 0);
                break;
              default:
                _results.push(typeof _this.debug === "function" ? _this.debug("Unhandled frame: " + frame) : void 0);
            }
          }
          return _results;
        };
      })(this);
      this.ws.onclose = (function(_this) {
        return function() {
          var msg;
          msg = "Whoops! Lost connection to " + _this.ws.url;
          if (typeof _this.debug === "function") {
            _this.debug(msg);
          }
          _this._cleanUp();
          return typeof errorCallback === "function" ? errorCallback(msg) : void 0;
        };
      })(this);
      return this.ws.onopen = (function(_this) {
        return function() {
          if (typeof _this.debug === "function") {
            _this.debug('Web Socket Opened...');
          }
          headers["accept-version"] = Stomp.VERSIONS.supportedVersions();
          headers["heart-beat"] = [_this.heartbeat.outgoing, _this.heartbeat.incoming].join(',');
          return _this._transmit("CONNECT", headers);
        };
      })(this);
    };

    Client.prototype.disconnect = function(disconnectCallback, headers) {
      if (headers == null) {
        headers = {};
      }
      this._transmit("DISCONNECT", headers);
      this.ws.onclose = null;
      this.ws.close();
      this._cleanUp();
      return typeof disconnectCallback === "function" ? disconnectCallback() : void 0;
    };

    Client.prototype._cleanUp = function() {
      this.connected = false;
      if (this.pinger) {
        Stomp.clearInterval(this.pinger);
      }
      if (this.ponger) {
        return Stomp.clearInterval(this.ponger);
      }
    };

    Client.prototype.send = function(destination, headers, body) {
      if (headers == null) {
        headers = {};
      }
      if (body == null) {
        body = '';
      }
      headers.destination = destination;
      return this._transmit("SEND", headers, body);
    };

    Client.prototype.subscribe = function(destination, callback, headers) {
      var client;
      if (headers == null) {
        headers = {};
      }
      if (!headers.id) {
        headers.id = "sub-" + this.counter++;
      }
      headers.destination = destination;
      this.subscriptions[headers.id] = callback;
      this._transmit("SUBSCRIBE", headers);
      client = this;
      return {
        id: headers.id,
        unsubscribe: function() {
          return client.unsubscribe(headers.id);
        }
      };
    };

    Client.prototype.unsubscribe = function(id) {
      delete this.subscriptions[id];
      return this._transmit("UNSUBSCRIBE", {
        id: id
      });
    };

    Client.prototype.begin = function(transaction) {
      var client, txid;
      txid = transaction || "tx-" + this.counter++;
      this._transmit("BEGIN", {
        transaction: txid
      });
      client = this;
      return {
        id: txid,
        commit: function() {
          return client.commit(txid);
        },
        abort: function() {
          return client.abort(txid);
        }
      };
    };

    Client.prototype.commit = function(transaction) {
      return this._transmit("COMMIT", {
        transaction: transaction
      });
    };

    Client.prototype.abort = function(transaction) {
      return this._transmit("ABORT", {
        transaction: transaction
      });
    };

    Client.prototype.ack = function(messageID, subscription, headers) {
      if (headers == null) {
        headers = {};
      }
      headers["message-id"] = messageID;
      headers.subscription = subscription;
      return this._transmit("ACK", headers);
    };

    Client.prototype.nack = function(messageID, subscription, headers) {
      if (headers == null) {
        headers = {};
      }
      headers["message-id"] = messageID;
      headers.subscription = subscription;
      return this._transmit("NACK", headers);
    };

    return Client;

  })();

  Stomp = {
    VERSIONS: {
      V1_0: '1.0',
      V1_1: '1.1',
      V1_2: '1.2',
      supportedVersions: function() {
        return '1.1,1.0';
      }
    },
    client: function(url, protocols) {
      var klass, ws;
      if (protocols == null) {
        protocols = ['v10.stomp', 'v11.stomp'];
      }
      klass = Stomp.WebSocketClass || WebSocket;
      ws = new klass(url, protocols);
      return new Client(ws);
    },
    over: function(ws) {
      return new Client(ws);
    },
    Frame: Frame
  };

  if ('object' !== "undefined" && exports !== null) {
    exports.Stomp = Stomp;
  }

  if (typeof window !== "undefined" && window !== null) {
    Stomp.setInterval = function(interval, f) {
      return window.setInterval(f, interval);
    };
    Stomp.clearInterval = function(id) {
      return window.clearInterval(id);
    };
    window.Stomp = Stomp;
  } else if (!exports) {
    self.Stomp = Stomp;
  }

}).call(commonjsGlobal);
});

var stomp_1 = stomp.Stomp;

var stompNode = createCommonjsModule(function (module, exports) {
// Generated by CoffeeScript 1.7.1

/*
   Stomp Over WebSocket http://www.jmesnil.net/stomp-websocket/doc/ | Apache License V2.0

   Copyright (C) 2013 [Jeff Mesnil](http://jmesnil.net/)
 */

(function() {
  var Stomp, net$$1, overTCP, overWS, wrapTCP, wrapWS;

  Stomp = stomp;

  net$$1 = net;

  Stomp.Stomp.setInterval = function(interval, f) {
    return setInterval(f, interval);
  };

  Stomp.Stomp.clearInterval = function(id) {
    return clearInterval(id);
  };

  wrapTCP = function(port, host) {
    var socket, ws;
    socket = null;
    ws = {
      url: 'tcp:// ' + host + ':' + port,
      send: function(d) {
        return socket.write(d);
      },
      close: function() {
        return socket.end();
      }
    };
    socket = net$$1.connect(port, host, function(e) {
      return ws.onopen();
    });
    socket.on('error', function(e) {
      return typeof ws.onclose === "function" ? ws.onclose(e) : void 0;
    });
    socket.on('close', function(e) {
      return typeof ws.onclose === "function" ? ws.onclose(e) : void 0;
    });
    socket.on('data', function(data) {
      var event;
      event = {
        'data': data.toString()
      };
      return ws.onmessage(event);
    });
    return ws;
  };

  wrapWS = function(url) {
    var WebSocketClient, connection, socket, ws;
    WebSocketClient = websocket.client;
    connection = null;
    ws = {
      url: url,
      send: function(d) {
        return connection.sendUTF(d);
      },
      close: function() {
        return connection.close();
      }
    };
    socket = new WebSocketClient();
    socket.on('connect', function(conn) {
      connection = conn;
      ws.onopen();
      connection.on('error', function(error) {
        return typeof ws.onclose === "function" ? ws.onclose(error) : void 0;
      });
      connection.on('close', function() {
        return typeof ws.onclose === "function" ? ws.onclose() : void 0;
      });
      return connection.on('message', function(message) {
        var event;
        if (message.type === 'utf8') {
          event = {
            'data': message.utf8Data
          };
          return ws.onmessage(event);
        }
      });
    });
    socket.connect(url);
    return ws;
  };

  overTCP = function(host, port) {
    var socket;
    socket = wrapTCP(port, host);
    return Stomp.Stomp.over(socket);
  };

  overWS = function(url) {
    var socket;
    socket = wrapWS(url);
    return Stomp.Stomp.over(socket);
  };

  exports.overTCP = overTCP;

  exports.overWS = overWS;

}).call(commonjsGlobal);
});

var stompNode_1 = stompNode.net;
var stompNode_2 = stompNode.websocket;
var stompNode_3 = stompNode.overTCP;
var stompNode_4 = stompNode.overWS;

// Copyright (C) 2013 [Jeff Mesnil](http://jmesnil.net/)
//
//   Stomp Over WebSocket http://www.jmesnil.net/stomp-websocket/doc/ | Apache License V2.0
//
// The library can be used in node.js app to connect to STOMP brokers over TCP 
// or Web sockets.

// Root of the `stompjs module`




var stompjs = stomp.Stomp;
var overTCP = stompNode.overTCP;
var overWS = stompNode.overWS;

stompjs.overTCP = overTCP;
stompjs.overWS = overWS;

var Socket = function Socket() {
  this.subscription = null;
};

Socket.prototype.subscribe = function subscribe (accountUid, callbackParams) {

  if (!accountUid && accountUid !== '') {
    return false;
  }

  if (callbackParams && callbackParams.onmessage) {
    if (typeof callbackParams.onmessage !== 'function') {
      return false;
    }
  } else {
    callbackParams.onMessage = function (e) { return console.log('Received message:', e); };
  }

  if (callbackParams && callbackParams.onopen) {
    if (typeof callbackParams.onopen !== 'function') {
      return false;
    }
  }

  var Socket = "MozWebSocket" in window ? MozWebSocket : WebSocket;

  var ws = new Socket(config.stomp.url);
  this.client = stompjs.over(ws);
  this.client.heartbeat.outgoing = 20000;
  this.client.heartbeat.incoming = 20000;
  this.client.debug = null;

  var parent = this;
  var uuid = accountUid;

  this.client.connect({
    login: config.stomp.login,
    passcode: config.stomp.password,
    'client-id': accountUid }, function () {
    // call onopen callback
    if (callbackParams && callbackParams.onopen) { callbackParams.onopen(); }

    // subscribe to events
    parent.client.subscribe('/exchange/notifications/' + uuid, callbackParams.onmessage, {
      id: accountUid,
      ack: 'client'
    });

    // parent.setClient(client);
  }, function (frame) {
    if (typeof frame !== 'string') {
      console.warn('Stomp error: ', frame);
    }
  });

  this.setClient(this.client);
};

Socket.prototype.setClient = function setClient (client) {
  this.subscription = client;
};
Socket.prototype.unsubscribe = function unsubscribe () {
  if (this.subscription && this.subscription.connected) {
    this.subscription.unsubscribe();
  }
};

/**
 * Main class. Contains all others methods and websocket subscription
 *
 * @class InPlayer
 */
var InPlayer = function InPlayer() {
  /**
   * @property User
   * @type User
   */
  this.User = new User();
  /**
   * @property Asset
   * @type Asset
   */
  this.Asset = new Asset();
  /**
   * @property Payment
   * @type Payment
   */
  this.Payment = new Payment();
  /**
   * @property Subscription
   * @type Subscription
   */
  this.Subscription = new Subscription();
  /**
   * @property Misc
   * @type Misc
   */
  this.Misc = new Misc();
  this.Socket = new Socket();
};

/**
 * Subscribes to websocket events
 * @method subscribe
 * @param {String} accountUid - The users account UUID
 * @param {Object} callbackParams - Methods regarding websocket
 * {
 *onmessage: function,
 *onopen: function,
 *onclose: function
 * }
 * @example
 *   InPlayer.subscribe(
 *    'adsasd-d1-cjc1c-1ajaveo',
 *    {
 *     onmessage: (message) => { let body = JSON.parse(message.body); console.log(body, 'message') },
 *     onopen: (e) => console.log('open'),
 *     onclose: (e) => console.log('close', e)
 *    }
 *  )
 * @return {Boolean}
*/
InPlayer.prototype.subscribe = function subscribe (accountUid, callbackParams) {
  if (this.User.isSignedIn()) {
    this.Socket.subscribe(accountUid, callbackParams);
    return true;
  } else {
    return false;
  }
};

/**
 * Unsubscribes from the websocket and event listeners
 * @method unsubscribe
 * @example
 *   InPlayer.unsubscribe()
 * @return {Boolean}
*/
InPlayer.prototype.unsubscribe = function unsubscribe () {
  this.Socket.unsubscribe();
};

var index = new InPlayer();

return index;

})));
