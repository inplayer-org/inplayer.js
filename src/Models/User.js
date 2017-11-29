import * as Cookies from 'js-cookie';

import {
  API
} from '../../constants/endpoints';

import { config } from '../../config';

class User {

  /* SIGN IN */
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

  /* SIGN OUT */
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

    }catch(error){
      return false;
    }

  }

   /* Set new password */
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

  /* Account info */
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


  /* Social login URLs */
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
}

export default User;
