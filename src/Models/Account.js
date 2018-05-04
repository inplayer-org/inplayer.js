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
     *     })
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async authenticate(data = {}) {
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
        if (responseData.access_token) {
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
        const token = localStorage.getItem(this.config.INPLAYER_TOKEN_NAME);

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
     *  merchantUuid: string,
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

        const keys = Object.keys(data.metadata);
        if (keys.length) {
            keys.forEach(key => {
                fd.append(`metadata[${key}]`, data.metadata[key]);
            });
        }

        const response = await fetch(this.config.API.signUp, {
            method: 'POST',
            body: fd,
        });

        const responseData = await response.json();

        return responseData;
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
        const token = localStorage.getItem(this.config.INPLAYER_TOKEN_NAME);

        const tokenExists = token !== undefined && token !== null;

        if (!tokenExists) {
            return false;
        }

        const tokenExpires = JSON.parse(token).expires;
        const nowDate = Math.round(new Date().getTime() / 1000);

        return nowDate < tokenExpires && tokenExists;
    }

    /**
     * Returns users Auth token
     * @method token
     * @async
     * @param clientId {String} - The client ID of the merchant
     * @example
     *     InPlayer.Account
     *     .token('1dasf-ad-1f-radsfsdf')
     * @return {String}
     */
    async token(clientId) {
        const token = localStorage.getItem(this.config.INPLAYER_TOKEN_NAME);

        if (token === undefined || token === null) return null;

        const tokenExpires = JSON.parse(token).expires;
        const nowDate = Math.round(new Date().getTime() / 1000);

        if (nowDate > tokenExpires) {
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
        }

        const newToken = JSON.parse(
            localStorage.getItem(this.config.INPLAYER_TOKEN_NAME)
        );

        return newToken.access_token;
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

        const responseData = await response.json();

        return responseData;
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

        return response;
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

        const data = await response.json();
        if (data) return data;
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

        const data = await response.json();

        return data;
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
        console.log(queryString);
        const response = await fetch(this.config.API.updateAccount, {
            method: 'PUT',
            body: queryString,
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'x-www-form-urlencoded',
            },
        });

        const responseData = await response.json();

        return responseData;
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

        const responseData = await response.json();

        return responseData;
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

        const data = await response.json();

        return data;
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

        const data = await response.json();

        return data;
    }
}

export default Account;
