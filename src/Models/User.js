import LocalStorage from 'node-localstorage';

import { API } from '../../constants/endpoints';

import { config } from '../../config';

/**
 * Contains all Requests regarding user/account and authentication
 *
 * @class User
 */
class User {
    constructor() {
        if (typeof localStorage === 'undefined' || localStorage === null) {
            localStorage = new LocalStorage('./scratch');
        }
    }

    /**
     * Signs in the user
     * @method signIn
     * @async
     * @param {Object} data - Contains {
     *  email: string,
     *  password: string,
     *  merchantUid: string,
     *  referrer: string,
     * }
     * @example
     *     InPlayer.User.signIn({
     *      email: 'test@test.com',
     *      password: 'test123',
     *      merchantUid: '123-123-hf1hd1-12dhd1',
     *      referrer: 'http://localhost.com'
     *     })
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async signIn(data) {
        // Add into form data
        const fd = new FormData();
        fd.append('email', data.email);
        fd.append('password', data.password);
        fd.append('merchant_uuid', data.merchantUid);
        fd.append('referrer', data.referrer);

        // request
        const response = await fetch(API.signIn, {
            method: 'POST',
            body: fd,
        });

        const responseData = await response.json();

        /* set cookies */
        if (responseData.access_token) {
            localStorage.setItem(config.INPLAYER_TOKEN_NAME, data.access_token);
        }

        return responseData;
    }

    /**
     * Signs out the user and destroys cookies
     * @method signOut
     * @async
     * @example
     *     InPlayer.User.signOut()
     *     .then(data => console.log(data));
     * @return {Boolean}
     */
    async signOut() {
        const token = localStorage.getItem(config.INPLAYER_TOKEN_NAME);

        const response = await fetch(API.signOut, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });

        const data = await response.json();
        // if response is okay
        if (data.explain) {
            localStorage.removeItem(config.INPLAYER_TOKEN_NAME);
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
     *  merchantUid: string,
     *  type: number
     *  referrer: string,
     * }
     * @example
     *     InPlayer.User.signUp({
     *      fullName: "test",
     *      email: "test32@test.com",
     *      password: "12345678",
     *      passwordConfirmation: "12345678",
     *      merchantUid: "528b1b80-5868-4abc-a9b6-4d3455d719c8",
     *      type: "consumer",
     *      referrer: "http://localhost:3000/",
     *     })
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async signUp(data) {
        // Add into form data
        const fd = new FormData();
        fd.append('full_name', data.fullName);
        fd.append('email', data.email);
        fd.append('password', data.password);
        fd.append('password_confirmation', data.passwordConfirmation);
        fd.append('merchant_uuid', data.merchantUid);
        fd.append('type', data.type);
        fd.append('referrer', data.referrer);

        const response = await fetch(API.signUp, {
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
     *    InPlayer.User
     *    .isSignedIn()
     * @return {Boolean}
     */
    isSignedIn() {
        return localStorage.getItem(config.INPLAYER_TOKEN_NAME) !== undefined;
    }

    /**
     * Returns users Auth token
     * @method token
     * @example
     *     InPlayer.User
     *     .token()
     * @return {String}
     */
    token() {
        return localStorage.getItem(config.INPLAYER_TOKEN_NAME);
    }

    /**
     * Sets Auth token into cookies
     * @method token
     * @param {String} token - The Authorization token which needs to be set
     * @example
     *     InPlayer.User
     *     .setTokenInCookie('aed1g284i3dnfrfnd1o23rtegk')
     * @return {void}
     */
    setTokenInCookie(token) {
        localStorage.setItem(config.INPLAYER_TOKEN_NAME, token);
    }

    /**
     * Requests new password for a given user
     * @method requestNewPassword
     * @async
     * @param {Object} data - Contains {
     *  email: String,
     *  merchantUid: string
     * }
     * @example
     *     InPlayer.User
     *     .requestNewPassword({
     *      email: "test32@test.com",
     *      merchantUid: "528b1b80-5868-4abc-a9b6-4d3455d719c8",
     *     })
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async requestNewPassword(data) {
        // Add into from FormData
        const fd = new FormData();
        fd.append('email', data.email);
        fd.append('merchant_uuid', data.merchantUid);

        const response = await fetch(API.requestNewPassword, {
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
     * @param {String} token - The authorization token
     * @example
     *     InPlayer.User
     *     .setNewPassword({
     *      password: "12345",
     *      passwordConfirmation: "12345",
     *     }, 'afhqi83rji74hjf7e43df')
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async setNewPassword(data, token) {
        const body = `password=${data.password}&password_confirmation=${
            data.passwordConfirmation
        }`;

        const response = await fetch(API.setNewPassword(token), {
            method: 'PUT',
            body: body,
            headers: {
                'Content-Type': 'x-www-form-urlencoded',
            },
        });

        const responseData = await response.json();

        return responseData;
    }

    /**
     * Gets the user/account information for a given auth token
     * @method getAccountInfo
     * @async
     * @param {String} token - The authorization token
     * @example
     *     InPlayer.User
     *     .getAccountInfo('afhqi83rji74hjf7e43df')
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async getAccountInfo(token) {
        const response = await fetch(API.getAccountInfo, {
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
     *     InPlayer.User
     *     .getSocialLoginUrls('123124-1r-1r13ur1h1')
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async getSocialLoginUrls(state) {
        const response = await fetch(API.social(state), {
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
     *     InPlayer.User
     *     .updateAccount({fullName: 'test test', metadata: {country: 'Germany'}},'123124-1r-1r13ur1h1')
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async updateAccount(data, token) {
        const snakeCaseData = {
            full_name: data.fullName,
            metadata: data.metadata,
        };
        const response = await fetch(API.updateAccount, {
            method: 'PUT',
            body: snakeCaseData,
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
     *     InPlayer.User
     *     .updateAccount({
     *       email: 'test@test.com',
     *       password: 'test123',
     *       passwordConfirmation: 'test123'
     *     },'123124-1r-1r13ur1h1')
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async changePassword(data, token) {
        const fd = new FormData();
        fd.append('token', data.email);
        fd.append('password', data.password);
        fd.append('password_confirmation', data.passwordConfirmation);

        const response = await fetch(API.changePassword, {
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
     * @param {String} merchantUid - The merchant UUID
     * @example
     *     InPlayer.User
     *     .getRegisterFields('123124-1r-1r13ur1h1')
     *     .then(data => console.log(data));
     * @return {Object}
     */
    async getRegisterFields(merchantUid) {
        const response = await fetch(API.getRegisterFields(merchantUid));

        const data = await response.json();

        return data;
    }
}

export default User;
