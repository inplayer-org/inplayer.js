import * as Cookies from 'js-cookie';

import {
  API
} from '../../constants/endpoints';

import { config } from '../../config';

class User {

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
      return false;
    }
  }


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

  isSignedIn(){
    return Cookies.get(config.INPLAYER_TOKEN_NAME) !== undefined;
  }

  token(){
    return Cookies.get(config.INPLAYER_TOKEN_NAME);
  }
  setTokenInCookie(token){
    Cookies.set(config.INPLAYER_TOKEN_NAME, token);
  }

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
