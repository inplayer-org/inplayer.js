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
     * @param {String} subdomain - Used only if SSO is enabled - contains the subdomain
     * @example
     *     InPlayer.Account.authenticate({
     *      email: 'test@test.com',
     *      password: 'test123',
     *      clientId: '123-123-hf1hd1-12dhd1',
     *     }, 'testing/subdomain')
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async authenticate(data = {}, subdomain = '') {
        // Add into form data
        const fd = new FormData();
        fd.append('username', data.email);
        fd.append('password', data.password);
        fd.append('client_id', data.clientId);
        fd.append('grant_type', 'password');

        // request
        const response = await fetch(this.config.API.authenticate, {
            method: 'POST',
            body: fd,
        });

        const responseData = await response.json();

        /* set cookies */
        if (responseData.access_token && subdomain) {
            const fd2 = new FormData();
            fd2.append('token', responseData.access_token);

            const cookieResponse = await fetch(
                this.config.API.ssoCookie(subdomain),
                {
                    method: 'POST',
                    body: fd2,
                    credentials: 'include',
                }
            );

            const cookieResponseData = await cookieResponse.json();

            localStorage.setItem(
                this.config.INPLAYER_TOKEN_NAME,
                JSON.stringify(responseData)
            );
        } else if (responseData.access_token && !subdomain) {
            localStorage.setItem(
                this.config.INPLAYER_TOKEN_NAME,
                JSON.stringify(responseData)
            );
        }

        return responseData;
    }

    /**
     * Signs in the user
     * @method signIn
     * @async
     * @param {Object} data - Contains {
     *  email: string,
     *  password: string,
     *  merchantUuid: string,
     *  referrer: string,
     * }
     * @example
     *     InPlayer.Account.signIn({
     *      email: 'test@test.com',
     *      password: 'test123',
     *      merchantUuid: '123-123-hf1hd1-12dhd1',
     *      referrer: 'http://localhost.com'
     *     })
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async signIn(data = {}) {
        // Add into form data
        const fd = new FormData();
        fd.append('email', data.email);
        fd.append('password', data.password);
        fd.append('merchant_uuid', data.merchantUuid);
        fd.append('referrer', data.referrer);

        // request
        const response = await fetch(this.config.API.signIn, {
            method: 'POST',
            body: fd,
        });

        const responseData = await response.json();

        /* set cookies */
        if (responseData.access_token) {
            localStorage.setItem(
                this.config.INPLAYER_TOKEN_NAME,
                responseData.access_token
            );
        }

        return responseData;
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
        if (token) {
            token = JSON.parse(token).access_token;
        }

        const response = await fetch(this.config.API.signOut, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        const data = await response.json();
        // if response is okay
        if (data.explain) {
            localStorage.removeItem(this.config.INPLAYER_TOKEN_NAME);
            localStorage.removeItem(this.config.INPLAYER_IOT_NAME);
        }

        return true;
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
        var result = 'shit';
        // Add into form data
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

        var parent = this;
        result = response.json().then(async function(responseData) {
            if (responseData.errors) {
                let result = new Promise((resolve, reject) => {
                    resolve(responseData);
                });
                return result;
            }

            const loginResponse = parent.authenticate({
                email: data.email,
                password: data.password,
                clientId: data.clientId,
                referrer: data.referrer,
            });

            return loginResponse;
        });

        return result;
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
    async isAuthenticated(clientId = null, subdomain = null) {
        const token = localStorage.getItem(this.config.INPLAYER_TOKEN_NAME);
        const tokenExists = token !== undefined && token !== null;
        var isSSOSignedIn = false;

        if (!tokenExists && clientId !== null && subdomain !== null) {
            //check SSO
            const iframe = document.createElement('iframe');
            const url = `${subdomain}/sso/login#${clientId}`;
            iframe.setAttribute('src', url);
            iframe.style.display = 'none';
            var parent = this;
            iframe.onload = function() {
                var configToken = parent.config.INPLAYER_TOKEN_NAME;

                window.addEventListener('message', function(event) {
                    const jsonData = JSON.parse(event.data);

                    localStorage.setItem(
                        configToken,
                        JSON.stringify({
                            access_token: jsonData.access_token,
                            expires: jsonData.expires,
                        })
                    );
                    isSSOSignedIn = true;
                });
                iframe.contentWindow.postMessage('', subdomain);
            };

            document.body.prepend(iframe);
        } else {
            const tokenExpires = JSON.parse(token).expires;
            const nowDate = Math.round(new Date().getTime() / 1000);

            return nowDate < tokenExpires && tokenExists;
        }

        if (isSSOSignedIn) {
            return true;
        }
    }

    /**
     * Checks if user is signed in
     * @method isSignedIn
     * @example
     *    InPlayer.Account
     *    .isSignedIn()
     * @return {Boolean}
     */
    isSignedIn() {
        return (
            localStorage.getItem(this.config.INPLAYER_TOKEN_NAME) !==
                undefined &&
            localStorage.getItem(this.config.INPLAYER_TOKEN_NAME) !== null
        );
    }

    /** Retruns the OAuth token
     *  @method getToken
     *  @example
     *  InPlayer.Account.getToken()
     *  @return {String}
     */
    getToken() {
        const token = localStorage.getItem(this.config.INPLAYER_TOKEN_NAME);

        if (token === undefined || token === null)
            return { token: null, expired: false, expires_at: null };

        const tokenExpires = JSON.parse(token).expires;
        const nowDate = Math.round(new Date().getTime() / 1000);

        if (nowDate > tokenExpires) {
            return { token: null, expired: true, expires_at: tokenExpires };
        }

        return {
            token: JSON.parse(token).access_token,
            expired: false,
            expires_at: JSON.parse(token).expires,
        };
    }
    /**
     * Returns users Auth token
     * @method token
     * @async
     * @example
     *     InPlayer.Account
     *     .token()
     * @return {String}
     */
    token() {
        return localStorage.getItem(this.config.INPLAYER_TOKEN_NAME);
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
        const token = localStorage.getItem(this.config.INPLAYER_TOKEN_NAME);

        if (token === undefined || token === null) {
            throw new Error(
                'The token must exist in order to refresh it. Please use InPlayer.Account.authenticate()'
            );
        }

        const fd = new FormData();
        fd.append('refresh_token', JSON.parse(token).refresh_token);
        fd.append('client_id', clientId);
        fd.append('grant_type', 'refresh_token');
        // request
        const response = await fetch(this.config.API.authenticate, {
            method: 'POST',
            body: fd,
        });

        const responseData = await response.json();

        /* set cookies */
        if (responseData.access_token) {
            localStorage.setItem(
                this.config.INPLAYER_TOKEN_NAME,
                JSON.stringify(responseData)
            );
        }

        return responseData;
    }

    /**
     * Sets Auth token into cookies
     * @method token
     * @param {String} token - The Authorization token which needs to be set
     * @example
     *     InPlayer.Account
     *     .setTokenInCookie('aed1g284i3dnfrfnd1o23rtegk')
     * @return {void}
     */
    setTokenInCookie(token = '') {
        localStorage.setItem(this.config.INPLAYER_TOKEN_NAME, token);
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
        let result = {};
        if (response.status >= 200 && response.status <= 300) {
            result.code = response.status;
            result.message = 'The password has been successfully changed.';
        } else {
            result = response.json().then(async function(responseData) {
                let result = new Promise((resolve, reject) => {
                    resolve(responseData);
                });
                return result;
            });
        }

        return result;
    }

    /**
     * Gets the user/account information for a given auth token
     * @method getAccountInfo
     * @async
     * @param {String} token - The authorization token
     * @example
     *     InPlayer.Account
     *     .getAccountInfo('afhqi83rji74hjf7e43df')
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async getAccountInfo(token = '') {
        const response = await fetch(this.config.API.getAccountInfo, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        return await response.json();
    }

    /**
     * Gets the social login urls for fb/twitter/google
     * @method getSocialLoginUrls
     * @async
     * @param {String} state - The state for the social
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

        return await response.json();
    }

    /**
     * Updates the account info. Metadata fields must be from the Inplayer.getRegisterFields()
     * @method updateAccount
     * @async
     * @param {Object} data - The new data for the account
     * @param {String} token - The authorization token
     * @example
     *     InPlayer.Account
     *     .updateAccount({fullName: 'test test', metadata: {country: 'Germany'}},'123124-1r-1r13ur1h1')
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async updateAccount(data = {}, token = '') {
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
                Authorization: 'Bearer ' + token,
                'Content-Type': 'x-www-form-urlencoded',
            },
        });

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
    async changePassword(data = {}, token = '') {
        const fd = new FormData();
        fd.append('old_password', data.oldPassword);
        fd.append('password', data.password);
        fd.append('password_confirmation', data.passwordConfirmation);

        const response = await fetch(this.config.API.changePassword, {
            method: 'POST',
            body: fd,
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

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

        return await response.json();
    }

    /**
     * Gets the purchase history
     * @method getPurchaseHistory
     * @async
     * @param {String} token - The authorization token
     * @param {String} status - The status of the purchase - active/inactive
     * @param {Number} page - The current page
     * @param {Number} limit - The number of items per page
     * @example
     *     InPlayer.Account
     *     .getPurchaseHistory('fg1h213f8g9fefgud23fg','active', 0, 5)
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async getPurchaseHistory(token = '', status = 'active', page, limit) {
        const response = await fetch(
            this.config.API.getPurchaseHistory(status, page, limit),
            {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            }
        );

        return await response.json();
    }

    /**
     * Returns purchase history with types
     * @method getAssetsHistory
     * @async
     * @param {String} token - The authorization token
     * @param {Number} size - The page size
     * @param {Number} page - The current page / starting index = 0
     * @param {String} startDate - Staring date filter
     * @param {String} endDate - Ending date filter
     * @example
     *     InPlayer.Account
     *     .getAssetsHistory('1dfh1f-1g1f2e-1gg')
     *     .then(data => console.log(data))
     * @return {Array}
     */
    async getAssetsHistory(
        token = '',
        size = 10,
        page = 0,
        startDate = null,
        endDate = null
    ) {
        const response = await fetch(
            this.config.API.assetsHistory(size, page, startDate, endDate),
            {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            }
        );

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
     * @return {Boolean}
     */

    async deleteAccount(token = '', password = '') {
        const fd = new FormData();

        fd.append('password', password);

        const response = await fetch(this.config.API.deleteAccount, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            body: fd,
        });

        if (response.status > 200 && response.status < 400) {
            localStorage.removeItem(this.config.INPLAYER_TOKEN_NAME);
            localStorage.removeItem(this.config.INPLAYER_IOT_NAME);
            return true;
        }
        return false;
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
     * @return {Boolean}
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

        if (response.status > 200 && response.status < 400) {
            return true;
        }
        return false;
    }
}

export default Account;
