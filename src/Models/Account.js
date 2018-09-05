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
     * }
     * @example
     *     InPlayer.Account.authenticate({
     *      email: 'test@test.com',
     *      password: 'test123',
     *      clientId: '123-123-hf1hd1-12dhd1',
     *      grantType: 'password'
     *     })
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async authenticate(data = {}) {
        let body = {
            client_id: data.clientId,
            grant_type: 'password',
        };

        if (data.clientSecret) {
            body.client_secret = data.clientSecret;
            body.grant_type = 'client_credentials';
        } else {
            body.username = data.email;
            body.password = data.password;
        }

        const response = await fetch(this.config.API.authenticate, {
            method: 'POST',
            body: params(body),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        checkStatus(response);

        const respData = await response.json();

        this.setToken(
            respData.access_token,
            respData.refresh_token,
            respData.expires
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
     *  type: number
     *  referrer: string,
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
     *     })
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async signUp(data = {}) {
        let body = {
            full_name: data.fullName,
            username: data.email,
            password: data.password,
            password_confirmation: data.passwordConfirmation,
            client_id: data.clientId,
            type: data.type,
            referrer: data.referrer,
            grant_type: 'password',
            metadata: data.metadata,
        };

        const response = await fetch(this.config.API.signUp, {
            method: 'POST',
            body: params(body),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        checkStatus(response);

        const respData = await response.json();

        this.setToken(
            respData.access_token,
            respData.refresh_token,
            respData.expires
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
                message: 'User is not authenticated',
            });
        }
        const t = this.getToken();

        const response = await fetch(this.config.API.signOut, {
            headers: {
                Authorization: 'Bearer ' + t.token,
            },
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
        const t = this.getToken();

        return !t.isExpired() && t.token !== '';
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

    setToken(token, refreshToken, expiresAt) {
        const credentials = new Credentials({
            token: token,
            refreshToken: refreshToken,
            expires: expiresAt,
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
                message: 'The refresh token is not present',
            });
        }

        let body = {
            refresh_token: t.refreshToken,
            client_id: clientId,
            grant_type: 'refresh_token',
        };

        const response = await fetch(this.config.API.authenticate, {
            method: 'POST',
            body: params(body),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        checkStatus(response);
        const responseData = await response.json();

        this.setToken(
            responseData.access_token,
            responseData.refresh_token,
            responseData.expires
        );

        return responseData;
    }

    /**
     * Requests new password for a given user
     * @method requestNewPassword
     * @async
     * @param {Object} data - Contains {
     *  email: String,
     *  merchantUuid: string
     * }
     * @example
     *     InPlayer.Account
     *     .requestNewPassword({
     *      email: "test32@test.com",
     *      merchantUuid: "528b1b80-5868-4abc-a9b6-4d3455d719c8",
     *     })
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async requestNewPassword(data = {}) {
        let body = {
            email: data.email,
            merchant_uuid: data.merchantUuid,
        };

        const response = await fetch(this.config.API.requestNewPassword, {
            method: 'POST',
            body: params(body),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
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
     * }
     * @param {String} token - The reset token
     * @example
     *     InPlayer.Account
     *     .setNewPassword({
     *      password: "12345",
     *      passwordConfirmation: "12345",
     *     }, 'afhqi83rji74hjf7e43df')
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async setNewPassword(data = {}, token = '') {
        let body = {
            password: data.password,
            password_confirmation: data.passwordConfirmation,
        };

        const response = await fetch(this.config.API.setNewPassword(token), {
            method: 'PUT',
            body: params(body),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        checkStatus(response);

        return await response.json();
    }

    /**
     * Gets the account information for a given auth token
     * @method getAccountInfo
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
                message: 'User is not authenticated',
            });
        }

        const t = this.getToken();

        const response = await fetch(this.config.API.getAccountInfo, {
            headers: {
                Authorization: 'Bearer ' + t.token,
            },
        });

        checkStatus(response);

        return await response.json();
    }

    /**
     * Gets the social login urls for fb/twitter/google
     * @method getSocialLoginUrls
     * @async
     * @param {String} state - Social login state.
     * The state needs to be json and base64 encoded to be sent as a query parameter.
     * Example: btoa(JSON.stringify({uuid: 'foo', redirect: 'http://example.com'}))
     * @example
     *     InPlayer.Account
     *     .getSocialLoginUrls('123124-1r-1r13ur1h1')
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async getSocialLoginUrls(state) {
        const response = await fetch(this.config.API.social(state));

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
     *     .updateAccount({fullName: 'test test', metadata: {country: 'Germany'}})
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async updateAccount(data = {}) {
        if (!this.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated',
            });
        }
        const t = this.getToken();

        let body = {
            full_name: data.fullName,
        };

        if (data.metadata) {
            body.metadata = data.metadata;
        }

        const response = await fetch(this.config.API.updateAccount, {
            method: 'PUT',
            body: params(body),
            headers: {
                Authorization: 'Bearer ' + t.token,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        checkStatus(response);

        return await response.json();
    }

    /**
     * Changes password for a given user
     * @method changePassword
     * @async
     * @param {Object} data - Contains new password
     * @param {String} token - The authorization token
     * @example
     *     InPlayer.Account
     *     .changePassword({
     *       oldPassword: 'old123',
     *       password: 'test123',
     *       passwordConfirmation: 'test123'
     *     },'123124-1r-1r13ur1h1')
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async changePassword(data = {}) {
        if (!this.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated',
            });
        }
        const t = this.getToken();

        let body = {
            old_password: data.oldPassword,
            password: data.password,
            password_confirmation: data.passwordConfirmation,
        };

        const response = await fetch(this.config.API.changePassword, {
            method: 'POST',
            body: params(body),
            headers: {
                Authorization: 'Bearer ' + t.token,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        checkStatus(response);

        return await response.json();
    }

    /**
     * Gets register fields
     * @method getRegisterFields
     * @async
     * @param {String} merchantUuid - The merchant UUID
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
     * @param {String} token - The authorization token
     * @param {String} password - The password of the account
     * @example
     *     InPlayer.Account
     *     .deleteAccount('1231231')
     *     .then(data => console.log(data))
     * @return {Object}
     */

    async deleteAccount(password) {
        if (!this.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated',
            });
        }
        const t = this.getToken();

        let body = {
            password: password,
        };

        const response = await fetch(this.config.API.deleteAccount, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + t.token,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params(body),
        });

        checkStatus(response);

        localStorage.removeItem(this.config.INPLAYER_TOKEN_NAME);
        localStorage.removeItem(this.config.INPLAYER_IOT_NAME);

        return {
            code: response.status,
            message: 'Account has been successfuly deleted',
        };
    }

    /**
     * Exports account data to the users' email
     * @method exportData
     * @async
     * @param {String} token - The authorization token
     * @param {String} password - The password of the account
     * @example
     *     InPlayer.Account
     *     .exportData('f1hg1f-1g1hg183-g1ggh-13311','1231231')
     *     .then(data => console.log(data))
     * @return {Object}
     */

    async exportData(password) {
        if (!this.isAuthenticated()) {
            errorResponse(401, {
                code: 401,
                message: 'User is not authenticated',
            });
        }
        const t = this.getToken();

        let body = {
            password: password,
        };

        const response = await fetch(this.config.API.exportData, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + t.token,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params(body),
        });

        return {
            code: response.status,
            message: 'Your data is being exported, please check your email.',
        };
    }
}

export default Account;
