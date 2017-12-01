import {
  API
} from '../../constants/endpoints';

class Subscriptions {

  async getSubscriptions(token){
    try{
      const response = await fetch(API.getSubscriptions,{
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      const data = response.json();

      return data;
    }catch(error){
      return false;
    }
  }

  async cancelSubscription(unsubscribe_url, token){
    try{
      const response = await fetch(unsubscribe_url, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      const data = response.json();

      return data;
    }catch(error){
      return false;
    }
  }

  async assetSubscribe(token, data) {
    try{
      const response = await fetch(API.subscribe, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: data
      });

      const data = await response.json();

      return data;
    }catch(error){
      return false;
    }
  }
}

export default Subscriptions;
