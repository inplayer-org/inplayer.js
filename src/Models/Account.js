import { checkStatus } from '../Utils';

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
        const fd = new FormData();
        fd.append('username', data.email);
        fd.append('password', data.password);
        fd.append('client_id', data.clientId);
        fd.append('grant_type', data.grantType);

        const response = await fetch(this.config.API.authenticate, {
            method: 'POST',
            body: fd,
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
     * @return {Boolean}
     */
    async signOut() {
        let token = localStorage.getItem(this.config.INPLAYER_TOKEN_NAME);
        if (!token) {
            return;
        }

        token = JSON.parse(token).access_token;

        const response = await fetch(this.config.API.signOut, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        checkStatus(response);

        return await response.json();
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
        const fd = new FormData();
        fd.append('full_name', data.fullName);
        fd.append('username', data.email);
        fd.append('password', data.password);
        fd.append('password_confirmation', data.passwordConfirmation);
        fd.append('client_id', data.clientId);
        fd.append('type', data.type);
        fd.append('grant_type', 'password');
        fd.append('referrer', data.referrer);

        if (data.metadata) {
            const keys = Object.keys(data.metadata);
            if (keys.length) {
                keys.forEach(key => {
                    fd.append(`metadata[${key}]`, data.metadata[key]);
                });
            }
        }

        const response = await fetch(this.config.API.signUp, {
            method: 'POST',
            body: fd,
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
     * Checks if the user is authenticated OAuth2
     * @method isAuthenticated
     * @async
     * @param {String} clientId - Use only if SSO is enabled - contains the clientId
     * @param {String} subdomain - Use only if SSO is enabled - contains the subdomain
     * @example
     *    InPlayer.Account.isAuthenticated()
     * @return {Boolean}
     */
    async isAuthenticated() {
        const t = this.getToken();

        return !t.expired && t.token !== '';
    }

    /** Retruns the OAuth token
     *  @method getToken
     *  @example
     *  InPlayer.Account.getToken()
     *  @return {Object}
     */
    getToken() {
        const token = localStorage.getItem(this.config.INPLAYER_TOKEN_NAME);

        if (token === undefined || token === null) {
            return {
                token: '',
                expired: true,
                expires_at: 0,
                refresh_token: '',
            };
        }

        const t = JSON.parse(token);
        if (t) {
            const tokenExpires = t.expires;
            const nowDate = Math.round(new Date().getTime() / 1000);

            if (nowDate > tokenExpires) {
                return {
                    token: '',
                    expired: true,
                    expires_at: tokenExpires,
                    refresh_token: t.refresh_token,
                };
            }

            return t;
        }

        return { token: '', expired: true, expires_at: 0, refresh_token: '' };
    }

    setToken(token, refreshToken, expiresAt) {
        localStorage.setItem(
            this.config.INPLAYER_TOKEN_NAME,
            JSON.stringify({
                access_token: token,
                refresh_token: refreshToken,
                expires: expiresAt,
                expired: false,
            })
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
        if (!t.refresh_token) {
            throw new Error('The refresh token is not present');
        }

        const fd = new FormData();
        fd.append('refresh_token', t.refresh_token);
        fd.append('client_id', clientId);
        fd.append('grant_type', 'refresh_token');

        const response = await fetch(this.config.API.authenticate, {
            method: 'POST',
            body: fd,
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
        // Add into from FormData
        const fd = new FormData();
        fd.append('email', data.email);
        fd.append('merchant_uuid', data.merchantUuid);

        const response = await fetch(this.config.API.requestNewPassword, {
            method: 'POST',
            body: fd,
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
        const body = `password=${data.password}&password_confirmation=${
            data.passwordConfirmation
        }`;

        const response = await fetch(this.config.API.setNewPassword(token), {
            method: 'PUT',
            body: body,
            headers: {
                'Content-Type': 'x-www-form-urlencoded',
            },
        });

        checkStatus(response);

        return await response.json();
    }

    /**
     * Gets the user/account information for a given auth token
     * @method getAccountInfo
     * @async
     * @example
     *     InPlayer.Account
     *     .getAccountInfo()
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async getAccountInfo() {
        if (!this.isAuthenticated()) {
            throw new Error('The user is not authenticated');
        }

        const t = this.getToken();

        const response = await fetch(this.config.API.getAccountInfo, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + t.access_token,
            },
        });

        checkStatus(response);

        return await response.json();
    }

    /**
     * Gets the social login urls for fb/twitter/google
     * @method getSocialLoginUrls
     * @async
     * @param {String} state - Social login state
     * @example
     *     InPlayer.Account
     *     .getSocialLoginUrls('123124-1r-1r13ur1h1')
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async getSocialLoginUrls(state) {
        const response = await fetch(this.config.API.social(state), {
            method: 'GET',
        });

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
            throw new Error('The user is not authenticated');
        }
        const t = this.getToken();

        let queryString = '';

        Object.keys(data).forEach(function(key) {
            let newKey = '';

            if (key === 'fullName') {
                newKey = 'full_name';
                queryString +=
                    (queryString ? '&' : '') + `${newKey}=${data[key]}`;
            } else if (key === 'metadata') {
                Object.keys(data[key]).forEach(metadata_key => {
                    queryString +=
                        (queryString ? '&' : '') +
                        `metadata[${metadata_key}]=${data[key][metadata_key]}`;
                });
            }
        });

        const response = await fetch(this.config.API.updateAccount, {
            method: 'PUT',
            body: queryString,
            headers: {
                Authorization: 'Bearer ' + t.access_token,
                'Content-Type': 'x-www-form-urlencoded',
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
            throw new Error('The user is not authenticated');
        }
        const t = this.getToken();

        const fd = new FormData();
        fd.append('old_password', data.oldPassword);
        fd.append('password', data.password);
        fd.append('password_confirmation', data.passwordConfirmation);

        const response = await fetch(this.config.API.changePassword, {
            method: 'POST',
            body: fd,
            headers: {
                Authorization: 'Bearer ' + t.access_token,
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
     *     .deleteAccount('f1hg1f-1g1hg183-g1ggh-13311','1231231')
     *     .then(data => console.log(data))
     * @return {Object}
     */

    async deleteAccount(password = '') {
        if (!this.isAuthenticated()) {
            throw new Error('The user is not authenticated');
        }
        const t = this.getToken();

        const fd = new FormData();

        fd.append('password', password);

        const response = await fetch(this.config.API.deleteAccount, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + t.access_token,
            },
            body: `password=${password}`,
        });

        checkStatus(response);

        localStorage.removeItem(this.config.INPLAYER_TOKEN_NAME);
        localStorage.removeItem(this.config.INPLAYER_IOT_NAME);

        return { code: response.status };
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

    async exportData(token = '', password = '') {
        const fd = new FormData();

        fd.append('password', password);

        const response = await fetch(this.config.API.exportData, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            body: fd,
        });

        const result = await response;
        return { code: response.status };
    }
}

export default Account;
