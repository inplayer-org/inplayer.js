(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
var InPlayer = (function () {
'use strict';

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
})(function () {
	function extend() {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[i];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init(converter) {
		function api(key, value, attributes) {
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
					value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
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
				return document.cookie = key + '=' + value + stringifiedAttributes;
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

				if (!this.json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ? converter.read(cookie, name) : converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
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
});
});

var js_cookie_1 = js_cookie.get;
var js_cookie_2 = js_cookie.set;
var js_cookie_3 = js_cookie.remove;

const config = {
  BASE_URL: 'https://staging-v2.inplayer.com',
  INPLAYER_TOKEN_NAME: 'inplayer_token'
};

const API = {
  signIn: `${config.BASE_URL}/accounts/login`,
  signOut: `${config.BASE_URL}/accounts/logout`,
  signUp: `${config.BASE_URL}/accounts`,
  requestNewPassword: `${config.BASE_URL}/accounts/forgot-password`,
  setNewPassword: token => `${config.BASE_URL}/accounts/forgot-password/${token}`,
  getAccountInfo: `${config.BASE_URL}/accounts`,
  social: state => `${config.BASE_URL}/accounts/social?state=${state}`
};

class User {

  /* SIGN IN */
  async signIn(data) {
    // Add into form data
    const fd = new FormData();
    fd.append('email', data.email);
    fd.append('password', data.password);
    fd.append('merchant_uuid', data.merchant_uuid);
    fd.append('referrer', data.referrer);
    // request
    try {
      const response = await fetch(API.signIn, {
        method: 'POST',
        body: fd
      });

      const data = await response.json();

      /* set cookies */
      if (data.access_token) {
        js_cookie_2(config.INPLAYER_TOKEN_NAME, data.access_token);
      }

      return data;
    } catch (error) {
      return false;
    }
  }

  /* SIGN OUT */
  async signOut() {
    const token = js_cookie_1(config.INPLAYER_TOKEN_NAME);

    try {
      const response = await fetch(API.signOut, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      const data = await response.json();
      // if response is okay
      if (data.explain) {
        js_cookie_3(config.INPLAYER_TOKEN_NAME);
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  /* SIGN UP/Register */
  async signUp(data) {

    // Add into form data
    const fd = new FormData();
    fd.append('full_name', data.full_name);
    fd.append('email', data.email);
    fd.append('password', data.password);
    fd.append('password_confirmation', data.password_confirmation);
    fd.append('merchant_uuid', data.merchant_uuid);
    fd.append('type', data.type);
    fd.append('referrer', data.referrer);

    try {
      const response = await fetch(API.signUp, {
        method: 'POST',
        body: fd
      });

      const data = await response.json();

      return data;
    } catch (error) {
      return false;
    }
  }

  /* Request new password */
  async requestNewPassword(data) {

    // Add into from FormData
    const fd = new FormData();
    fd.append('email', data.email);
    fd.append('merchant_uuid', data.merchant_uuid);

    try {
      const response = await fetch(API.requestNewPassword, {
        method: 'POST',
        body: fd
      });

      const data = await response.json();

      return data;
    } catch (error) {
      return false;
    }
  }

  /* Set new password */
  async setNewPassword(data, token) {

    const body = `password=${data.password}&password_confirmation=${data.password_confirmation}`;

    try {
      const response = await fetch(API.setNewPassword(token), {
        method: 'PUT',
        body: body,
        headers: {
          'Content-Type': 'x-www-form-urlencoded'
        }
      });

      const data = await response.json();

      return data;
    } catch (error) {
      return false;
    }
  }

  /* Account info */
  async getAccountInfo(token) {
    try {
      const response = await fetch(API.getAccountInfo, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      const data = await response.json();
      if (data) return data;
    } catch (error) {
      return false;
    }
  }

  /* Social login URLs */
  async getSocialLoginUrls(state) {
    try {
      const response = await fetch(API.social(state), {
        method: 'GET'
      });

      const data = await response.json();

      if (data) return data;
    } catch (error) {
      return false;
    }
  }
}

class InPlayer {
  constructor() {
    // API Models
    this.User = new User();
  }
}

return InPlayer;

}());
