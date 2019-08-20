import { checkStatus, params, errorResponse } from '../Utils';
import Credentials from '../Credentials';

/**
 * Contains all Requests regarding user/account and authentication
 *
 * @class Account
 */
class Account {
    constructor(config) {
        this.config = config;
    }

    /**
 * Signs in the user
 * @method authenticate
 * @async
 * @param {Object} data - Contains {
 *  email: string,
 *  password: string,
 *  clientId: string,
 *  clientSecret: string,
 *  referrer: string,
 *  refreshToken: string,
 * }
 * @example
 *     InPlayer.Account.authenticate({
 *      email: 'test@test.com',
 *      password: 'test123',
 *      clientId: '123-123-hf1hd1-12dhd1',
 *      referrer: 'http://localhost:3000/',
 *      refreshToken: '528b1b80-ddd1hj-4abc-gha3j-111111'
 *     })
 *     .then(data => console.log(data));
 * @return {Object}
 */
    async authenticate({
        clientId,
        referrer,
        clientSecret,
        refreshToken,
        email,
        password
    }) {
        let body = {
            client_id: clientId,
            grant_type: 'password',
            referrer: referrer
        };

        if (clientSecret) {
            body.client_secret = clientSecret;
            body.grant_type = 'client_credentials';
        }

        if (refreshToken) {
            body.refresh_token = refreshToken;
            body.grant_type = 'refresh_token';
        } else {
            body.username = email;
            body.password = password;
        }

        const response = await fetch(this.config.API.authenticate, {
            method: 'POST',
            body: params(body),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        checkStatus(response);

        const respData = await response.json();
        const { access_token, refresh_token, expires } = respData;

        this.setToken(
            access_token,
            refresh_token,
            expires
        );

        return respData;
    }

    /**
 * Signs up/Registers user
 * @method signUp
 * @async
 * @param {Object} data - Contains {
 *  fullName: string,
 *  email: string
 *  password: string,
 *  passwordConfirmation: string,
 *  clientId: string,
 *  type: string,
 *  referrer: string,
 *  brandingId?: number,
 *  metadata?: { [key: string]: string }
 *  dateOfBirth?: string,
 * }
 * @example
 *     InPlayer.Account.signUp({
 *      fullName: "test",
 *      email: "test32@test.com",
 *      password: "12345678",
 *      passwordConfirmation: "12345678",
 *      clientId: "528b1b80-5868-4abc-a9b6-4d3455d719c8",
 *      type: "consumer",
 *      referrer: "http://localhost:3000/",
 *      brandingId?: 12345,
 *      metadata : { country: "Macedonia" },
 *      dateOfBirth: '2019-05-03'
 *     })
 *     .then(data => console.log(data));
 * @return {Object}
 */
    async signUp({
        fullName,
        email,
        password,
        passwordConfirmation,
        clientId,
        type,
        referrer,
        metadata,
        brandingId,
        dateOfBirth
    }) {
        let body = {
            full_name: fullName,
            username: email,
            password,
            password_confirmation: passwordConfirmation,
            client_id: clientId,
            type,
            referrer,
            grant_type: 'password',
            metadata,
            branding_id: brandingId,
            date_of_birth: dateOfBirth,
        };

        const response = await fetch(this.config.API.signUp, {
            method: 'POST',
            body: params(body),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        checkStatus(response);

        const respData = await response.json();
        const { access_token, refresh_token, expires } = respData;

        this.setToken(
            access_token,
            refresh_token,
            expires
        );

        return respData;
    }

    /**
 * Signs out the user and destroys cookies
 * @method signOut
 * @async
 * @example
 *     InPlayer.Account.signOut()
 *     .then(data => console.log(data));
 * @return {Object}
 */
    async signOut() {
        if (!this.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated'
            });
        }

        const response = await fetch(this.config.API.signOut, {
            headers: {
                Authorization: `Bearer ${this.getToken().token}`
            }
        });

        checkStatus(response);

        this.setToken('', '', 0);

        return await response.json();
    }

    /**
 * Checks if the user is authenticated
 * @method isAuthenticated
 * @example
 *    InPlayer.Account.isAuthenticated()
 * @return {Boolean}
 */
    isAuthenticated() {
        return !this.getToken().isExpired() && this.getToken().token !== '';
    }

    /** Retruns the OAuth token
 *  @method getToken
 *  @example
 *  InPlayer.Account.getToken()
 *  @return {Credentials}
 */
    getToken() {
        const token = localStorage.getItem(this.config.INPLAYER_TOKEN_NAME);

        if (token === undefined || token === null) {
            return new Credentials();
        }

        return new Credentials(JSON.parse(token));
    }

    /** Sets the Token
  *  @method setToken
  *  @param {string} token
  *  @param {string} refreshToken
  *  @param {number} expiresAt
  *  @example
  *  InPlayer.Account.setToken('344244-242242', '123123121-d1-t1-1ff',1558529593297)
  */
    setToken(token, refreshToken, expiresAt) {
        const credentials = new Credentials({
            token: token,
            refreshToken: refreshToken,
            expires: expiresAt
        });

        localStorage.setItem(
            this.config.INPLAYER_TOKEN_NAME,
            JSON.stringify(credentials)
        );
    }

    /**
 * Refreshes the token
 * @method refreshToken
 * @async
 * @param clientId - The merchant's clientId
 * @example
 *     InPlayer.Account.refreshToken('123123121-d1-t1-1ff').then(data => console.log(data))
 * @return {Object}
 */
    async refreshToken(clientId) {
        const t = this.getToken();

        if (!t.refreshToken) {
            errorResponse(401, {
                code: 400,
                message: 'The refresh token is not present'
            });
        }

        let body = {
            refresh_token: t.refreshToken,
            client_id: clientId,
            grant_type: 'refresh_token'
        };

        const response = await fetch(this.config.API.authenticate, {
            method: 'POST',
            body: params(body),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        checkStatus(response);

        const responseData = await response.json();
        const { access_token, refresh_token, expires } = responseData;

        this.setToken(
            access_token,
            refresh_token,
            expires
        );

        return responseData;
    }

    /**
 * Reports the generated SSO token to the SSO domain.
 * @param {string} ssoDomain - The SSO domain.
 * @param {string} tokenData - The token data.
 * @param {boolean} retire - Should the token be retired or activated.
 */
    async reportSSOtoken(ssoDomain, tokenData, retire = false) {
        const body = new FormData();

        body.append('token', tokenData.token);
        body.append('delete', retire ? 1 : 0);

        const response = await fetch(this.config.API.reportSSOtoken(ssoDomain), {
            method: 'POST',
            body,
            credentials: 'include'
        });

        checkStatus(response);

        return await response.json();
    }

    /**
 * Requests new password for a given user
 * @method requestNewPassword
 * @async
 * @param {Object} data - Contains {
 *  email: string,
 *  merchantUuid: string
 *  brandingId?: number
 * }
 * @example
 *     InPlayer.Account
 *     .requestNewPassword({
 *      email: "test32@test.com",
 *      merchantUuid: "528b1b80-5868-4abc-a9b6-4d3455d719c8",
 *      brandingId: 12345,
 *     })
 *     .then(data => console.log(data));
 * @return {Object}
 */
    async requestNewPassword({ email, merchantUuid, brandingId }) {
        let body = {
            email,
            merchant_uuid: merchantUuid,
            branding_id: brandingId
        };

        const response = await fetch(this.config.API.requestNewPassword, {
            method: 'POST',
            body: params(body),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        checkStatus(response);

        return await response.json();
    }

    /**
 * Sets new password for the user
 * @method setNewPassword
 * @async
 * @param {Object} data - Contains {
 *  password: string
 *  passwordConfirmation: string
 *  brandingId?: number
 * }
 * @param {String} token - The reset token
 * @example
 *     InPlayer.Account
 *     .setNewPassword({
 *      password: "password",
 *      passwordConfirmation: "password",
 *      brandingId: "12345",
 *     }, 'afhqi83rji74hjf7e43df')
 *     .then(data => console.log(data));
 * @return {Object}
 */
    async setNewPassword({ password, passwordConfirmation, brandingId }, token = '') {
        const body = `password=${password}&password_confirmation=${
            passwordConfirmation
        }&branding_id=${brandingId}`;

        const response = await fetch(this.config.API.setNewPassword(token), {
            method: 'PUT',
            body: body,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        checkStatus(response);

    // Response is 204: No Content, nothing to return.
    }

    /**
 * Gets the account information for a given auth token
 * @method getAccount
 * @async
 * @example
 *     InPlayer.Account
 *     .getAccount()
 *     .then(data => console.log(data));
 * @return {Object}
 */
    async getAccount() {
        if (!this.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated'
            });
        }

        const response = await fetch(this.config.API.getAccountInfo, {
            headers: {
                Authorization: `Bearer ${this.getToken().token}`
            }
        });

        checkStatus(response);

        return await response.json();
    }

    /**
 * Gets the social login urls for fb/twitter/google
 * @method getSocialLoginUrls
 * @async
 * @param {string} state - Social login state.
 * The state needs to be json and base64 encoded to be sent as a query parameter.
 * Example: btoa(JSON.stringify({uuid: 'foo', redirect: 'http://example.com'}))
 * @example
 *     InPlayer.Account
 *     .getSocialLoginUrls('123124-1r-1r13ur1h1')
 *     .then(data => console.log(data));
 * @return {Object}
 */
    async getSocialLoginUrls(state) {
        const response = await fetch(this.config.API.getSocialLoginUrls(state));

        checkStatus(response);

        return await response.json();
    }

    /**
 * Updates the account info. Metadata fields must be from the Inplayer.getRegisterFields()
 * @method updateAccount
 * @async
 * @param {Object} data - The new data for the account
 * @example
 *     InPlayer.Account
 *     .updateAccount({fullName: 'test test', metadata: {country: 'Germany'}, dateOfBirth: '1999-03-05'})
 *     .then(data => console.log(data));
 * @return {Object}
 */
    async updateAccount({ fullName, metadata, dateOfBirth }) {
        if (!this.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated'
            });
        }

        let body = {
            full_name: fullName,
        };

        if (metadata) {
            body.metadata = metadata;
        }
        if (dateOfBirth) {
            body.date_of_birth = dateOfBirth;
        }

        const response = await fetch(this.config.API.updateAccount, {
            method: 'PUT',
            body: params(body),
            headers: {
                Authorization: `Bearer ${this.getToken().token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        checkStatus(response);

        return await response.json();
    }

    /**
 * Changes password for a given user
 * @method changePassword
 * @async
 * @param {Object} data - Contains {
 *  oldPassword: string
 *  password: string
 *  passwordConfirmation: string
 *  brandingId?: number
 * }
 * @param {string} token - The reset token
 * @example
 *     InPlayer.Account
 *     .changePassword({
 *       oldPassword: 'old123',
 *       password: 'test123',
 *       passwordConfirmation: 'test123'
 *       brandingId: 1234
 *     },'123124-1r-1r13ur1h1')
 *     .then(data => console.log(data));
 * @return {Object}
 */
    async changePassword({
        oldPassword,
        password,
        passwordConfirmation,
        brandingId
    }) {
        if (!this.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated'
            });
        }

        let body = {
            old_password: oldPassword,
            password,
            password_confirmation: passwordConfirmation,
            branding_id: brandingId
        };

        const response = await fetch(this.config.API.changePassword, {
            method: 'POST',
            body: params(body),
            headers: {
                Authorization: `Bearer ${this.getToken().token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        checkStatus(response);

        return await response.json();
    }

    /**
 * Gets register fields
 * @method getRegisterFields
 * @async
 * @param {string} merchantUuid - The merchant UUID
 * @example
 *     InPlayer.Account
 *     .getRegisterFields('123124-1r-1r13ur1h1')
 *     .then(data => console.log(data));
 * @return {Object}
 */
    async getRegisterFields(merchantUuid = '') {
        const response = await fetch(
            this.config.API.getRegisterFields(merchantUuid)
        );

        checkStatus(response);

        return await response.json();
    }

    /**
 * Deletes an account
 * @method deleteAccount
 * @async
 * @param {Object} data - Contains {
 *  password: string,
 *  brandingId?: number,
 * }
 * @example
 *     InPlayer.Account.deleteAccount({
 *      password: "password",
 *      brandingId: 1234,
 *     })
 *     .then(data => console.log(data));
 * @return {Object}
 */

    async deleteAccount({ password, brandingId }) {
        if (!this.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated'
            });
        }

        let body = {
            password,
            branding_id: brandingId
        };

        const response = await fetch(this.config.API.deleteAccount, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.getToken().token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params(body)
        });

        checkStatus(response);

        localStorage.removeItem(this.config.INPLAYER_TOKEN_NAME);
        localStorage.removeItem(this.config.INPLAYER_IOT_NAME);

        return {
            code: response.status,
            message: 'Account has been successfuly deleted'
        };
    }

    /**
 * Exports account data to the users' email
 * @method exportData
 * @async
 * @param {Object} data - Contains {
 *  password: string,
 *  brandingId?: number,
 * }
 * @example
 *     InPlayer.Account.exportData({
 *        password: "password",
 *        brandingId: 1234,
 *     })
 *     .then(data => console.log(data));
 * @return {Object}
 */

    async exportData({ password, brandingId }) {
        if (!this.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated'
            });
        }

        let body = {
            password,
            branding_id: brandingId
        };

        const response = await fetch(this.config.API.exportData, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.getToken().token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params(body)
        });

        checkStatus(response);

        if (!response.ok) {
            return await response.json();
        }

        return {
            code: response.status,
            message: 'Your data is being exported, please check your email.'
        };
    }

    /**
* Creates pin code and sends it to the users' email
* @method sendPinCode
* @async
* @param {number} brandingId - Optional parametar
* @example
*     InPlayer.Account.sendPinCode(1234)
*     .then(data => console.log(data));
* @return {Object}
*/

    async sendPinCode(brandingId) {
        if (!this.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated'
            });
        }

        let body = {
            branding_id: brandingId
        };

        const response = await fetch(this.config.API.sendPinCode, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.getToken().token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params(body)
        });

        checkStatus(response);

        if (!response.ok) {
            return await response.json();
        }

        return {
            code: response.status,
            message: response.message,
        };
    }

    /**
* Checks validity of pin code
* @method validatePinCode
* @async
* @param {string} pinCode - Code from received email message
* @example
*     InPlayer.Account.validatePinCode('5566')
*     .then(data => console.log(data));
* @return {Object}
*/

    async validatePinCode(pinCode) {
        if (!this.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated'
            });
        }

        let body = {
            pin_code: pinCode
        };

        const response = await fetch(this.config.API.validatePinCode, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.getToken().token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params(body)
        });

        checkStatus(response);

        if (!response.ok) {
            return await response.json();
        }

        return {
            code: response.status,
            message: response.message,
        };
    }

    /**
* Return restriction settings per Merchant
* @method loadMerchantRestrictionSettings
* @async
* @param {string} merchantUuid - The merchant UUID
* @example
*     InPlayer.Account
*     .loadMerchantRestrictionSettings("528b1b80-5868-4abc-a9b6-4d3455d719c8")
*     .then(data => console.log(data));
* @return {Object} Contains the data - {
    "age_verification_type": "pin_code",
    "age_verification_enabled": true,
    "merchant_uuid": "3b39b5ab-b5fc-4ba3-b770-73155d20e61f",
    "created_at": 1532425425,
    "updated_at": 1532425425
}
*/
    async loadMerchantRestrictionSettings(merchantUuid) {
        const response = await fetch(this.config.API.merchantRestrictionSettings(merchantUuid));

        await checkStatus(response);

        return await response.json();
    }
}

export default Account;
