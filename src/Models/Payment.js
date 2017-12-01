import {
  API
} from '../../constants/endpoints';


class Payment {
  async getPaymentMethod(merchant_uuid){
    try{
      const response = await fetch(API.getPaymentMethod(merchant_uuid),{
        method: 'GET'
      });

      const data = await response.json();

      return data;
    }catch(error){
      return false;
    }
  }

  async getPaymentMethods(token){
    try{
      const response = await fetch(API.getPaymentMethods,{
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

  async getPaymentTools(token, paymentMethodId){
    try{
      const response = await fetch(API.getPaymentTools(paymentMethodId), {
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

  async payForAsset(token, data) {
    try{
      const response = await fetch(API.payForAsset,{
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

  async getPayPalParams(token, data) {
    try{
      const response = await fetch(API.externalPayments,{
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

export default Payment;
