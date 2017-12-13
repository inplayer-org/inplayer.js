import * as Cookies from 'js-cookie';

import {
  API
} from '../../constants/endpoints';

import { config } from '../../config';

/**
 * Contains all Requests regarding user/account and authentication
 *
 * @class User
 */
class User {

  /**
   * Signs in the user
   * @method signIn
   * @async
   * @param {Object} data - Contains {
   *  email: string,
   *  password: string,
   *  merchant_uuid: string,
   *  referrer: string,
   * }
   * @example
   *     InPlayer.User.signIn({
   *      email: 'test@test.com',
   *      password: 'test123',
   *      merchant_uuid: '123-123-hf1hd1-12dhd1',
   *      referrer: 'http://localhost.com'
   *     })
   *     .then(data => console.log(data));
   * @return {Object}
  */
  async signIn(data){
    // Add into form data
    const fd = new FormData();
    fd.append('email', data.email);
    fd.append('password', data.password);
    fd.append('merchant_uuid', data.merchant_uuid);
    fd.append('referrer', data.referrer);
    // request
    try{
      const response = await fetch(API.signIn, {
        method: 'POST',
        body: fd,
      });

      const data = await response.json();

      /* set cookies */
      if(data.access_token){
        Cookies.set(config.INPLAYER_TOKEN_NAME, data.access_token);
      }

      return data;

    } catch(error) {
      return error;
    }
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
  async signOut(){
    const token = Cookies.get(config.INPLAYER_TOKEN_NAME);

    try{
      const response = await fetch(API.signOut, {
          headers: {
              'Authorization': 'Bearer ' + token
          }
      });

      const data = await response.json();
      // if response is okay
      if(data.explain){
        Cookies.remove(config.INPLAYER_TOKEN_NAME);
      }
      return true;

    } catch(error){
      return false;
    }

  }

  /**
   * Signs up/Registers user
   * @method signUp
   * @async
   * @param {Object} data - Contains {
   *  full_name: string,
   *  email: string
   *  password: string,
   *  password_confirmation: string,
   *  merchant_uuid: string,
   *  type: number
   *  referrer: string,
   * }
   * @example
   *     InPlayer.User.signUp({
   *      full_name: "test",
   *      email: "test32@test.com",
   *      password: "12345678",
   *      password_confirmation: "12345678",
   *      merchant_uuid: "528b1b80-5868-4abc-a9b6-4d3455d719c8",
   *      type: "consumer",
   *      referrer: "http://localhost:3000/",
   *     })
   *     .then(data => console.log(data));
   * @return {Object}
  */
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

    try{
      const response = await fetch(API.signUp, {
        method: 'POST',
        body: fd,
      });

      const data = await response.json();

      return data;

    }catch(error) {
      return false;
    }
  }

  /**
   * Checks if user is signed in
   * @method isSignedIn
   * @example
   *    InPlayer.User
   *    .isSignedIn()
   * @return {Boolean}
  */
  isSignedIn(){
    return Cookies.get(config.INPLAYER_TOKEN_NAME) !== undefined;
  }

  /**
   * Returns users Auth token
   * @method token
   * @example
   *     InPlayer.User
   *     .token()
   * @return {String}
  */
  token(){
    return Cookies.get(config.INPLAYER_TOKEN_NAME);
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
  setTokenInCookie(token){
    Cookies.set(config.INPLAYER_TOKEN_NAME, token);
  }

  /**
   * Requests new password for a given user
   * @method requestNewPassword
   * @async
   * @param {Object} data - Contains {
   *  email: String,
   *  merchant_uuid: string
   * }
   * @example
   *     InPlayer.User
   *     .requestNewPassword({
   *      email: "test32@test.com",
   *      merchant_uuid: "528b1b80-5868-4abc-a9b6-4d3455d719c8",
   *     })
   *     .then(data => console.log(data));
   * @return {Object}
  */
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

    }catch(error){
      return false;
    }

  }

  /**
   * Sets new password for the user
   * @method setNewPassword
   * @async
   * @param {Object} data - Contains {
   *  password: string
   *  password_confirmation: string
   * }
   * @param {String} token - The authorization token
   * @example
   *     InPlayer.User
   *     .setNewPassword({
   *      password: "12345",
   *      password_confirmation: "12345",
   *     }, 'afhqi83rji74hjf7e43df')
   *     .then(data => console.log(data));
   * @return {Object}
  */
  async setNewPassword(data, token) {

        const body = `password=${data.password}&password_confirmation=${data.password_confirmation}`;

        try{
          const response = await fetch(API.setNewPassword(token),{
            method: 'PUT',
            body: body,
            headers: {
              'Content-Type': 'x-www-form-urlencoded'
            }
          });

          const data = await response.json();

          return data;

        }catch(error){
          return false;
        }
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
    try{
      const response = await fetch(API.getAccountInfo, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      const data = await response.json();
      if(data)
        return data;

    }catch(error){
      return false;
    }
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
    try{
      const response = await fetch(API.social(state), {
        method: 'GET',
      });

      const data = await response.json();

      if(data)
        return data;

    }catch(error){
      return false;
    }
  }

  /**
   * Updates the account info
   * @method updateAccount
   * @async
   * @param {Object} data - The new data for the account
   * @param {String} token - The authorization token
   * @example
   *     InPlayer.User
   *     .updateAccount({},'123124-1r-1r13ur1h1')
   *     .then(data => console.log(data));
   * @return {Object}
  */
  async updateAccount(data, token) {
    try{
      const response = await fetch(API.updateAccount, {
        method: 'PUT',
        body: data,
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'x-www-form-urlencoded'
        }
      });

      const data = await response.json();

      return data;
    }catch(error){
      return false;
    }
  }

  /**
   * Changes password for a given user
   * @method changePassword
   * @async
   * @param {Object} data - Contains new password
   * @param {String} token - The authorization token
   * @example
   *     InPlayer.User
   *     .updateAccount({},'123124-1r-1r13ur1h1')
   *     .then(data => console.log(data));
   * @return {Object}
  */
  async changePassword(data, token) {
    try{
      const response = await fetch(API.changePassword, {
        method: 'POST',
        body: data,
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      const data = await response.json();

      return data;
    }catch(error){
      return false;
    }
  }

  /**
   * Gets register fields
   * @method getRegisterFields
   * @async
   * @param {String} merchant_uuid - The merchant UUID
   * @example
   *     InPlayer.User
   *     .getRegisterFields('123124-1r-1r13ur1h1')
   *     .then(data => console.log(data));
   * @return {Object}
  */
  async getRegisterFields(merchant_uuid){
    try{
      const response = await fetch(API.getRegisterFields(merchant_uuid));

      const data = await response.json();

      return data;
    }catch(error){
      return false;
    }
  }
}

export default User;
