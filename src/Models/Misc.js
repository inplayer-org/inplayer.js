import {
  API
} from '../../constants/endpoints';

class Misc{
  async getDlcLinks(token,assetId){
    try{
      const response = await fetch(API.getDlcLinks(assetId), {
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

  async getDiscount(token, data) {
    try{
      const response = await fetch(API.getDiscount, {
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

  async getBranding(merchant_uuid) {
    try{
      const response = await fetch(API.getBranding(merchant_uuid), {
        method: 'GET'
      });

      const data = await response.json();

      return data;
    }catch(error){
      return false;
    }
  }

  async downloadProtectedFile(token, assetId, filename) {
    try{
      const response = await fetch(API.downloadFile(assetId, filename), {
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

  async fetchWPContent(url, token) {
    try{
      const response = await fetch(url, {
        credentials: 'same-origin'
      });

      const data = await response.json();

      return data;
    }catch(error){
      return false;
    }
  }
}

export default Misc;
