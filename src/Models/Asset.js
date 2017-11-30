import {
  API
} from '../../constants/endpoints';


class Asset {

  /*
   * @desc Checks whether a given authenticated user has access for an asset
   * @param {string} token The Authorization token
   * @param {number} id The id of the asset
   * @example
   * InPlayer.Asset.checkAccessForAsset('eyJ0eXAiOiJKPECENR5Y',36320)
   * .then(data => console.log(data));
   * @return {Boolean}
   */
  async checkAccessForAsset(token, id){
    try{
      const response = await fetch(API.checkAccess(id), {
          headers: {
              'Authorization': 'Bearer ' + token
          }
      });

      const data = await response.json();

      return data;

    } catch(error){
      return false;
    }
  }

  async checkAccessForMultipleAssets(token, ids){
    try{
      const response = await fetch(API.checkAccess(ids, true), {
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

  async findAsset(assetId, merchant_uuid){
    try{
      const response = await fetch(API.findAsset(assetId,merchant_uuid),{
        method: 'GET',
      });

      const data = await response.json();

      return data;
    }catch(error){
      return false;
    }
  }

  async findExternalAsset(assetType, externalId){
    try{
      const response = await fetch(API.findExternalAsset(assetType, externalId),{
        method: 'GET',
      });

      const data = await response.json();

      return data;
    }catch(error){
      return false;
    }
  }

  async findPackage(id){
    try{
      const response = await fetch(API.findPackage(id), {
        method: 'GET',
      });

      const data = await response.json();

      return data;
    }catch(error){
      return false;
    }
  }

  async getAssetAccessFees(id) {
    try{
      const response = await fetch(API.findAccessFees(id), {
        method: 'GET',
      });

      const data = await response.json();

      return data;
    }catch(error){
      return false;
    }
  }

  async freemiumAsset(token, data) {
    try{
      const response = await fetch(API.freemium, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: data
      })
    }catch(error){
      return false;
    }
  }
}

export default Asset;
