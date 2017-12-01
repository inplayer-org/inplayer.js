import {
  API
} from '../../constants/endpoints';

/**
 * Contains all Requests connected with assets/items
 *
 * @class Asset
 */
class Asset {

  /**
   * Checks whether a given authenticated user has access for an asset
   * @method checkAccessForAsset
   * @async
   * @param {String} token - The Authorization token
   * @param {Number} id - The id of the asset
   * @example
   * InPlayer.Asset.checkAccessForAsset('eyJ0eXAiOiJKPECENR5Y',36320)
   * .then(data => console.log(data));
   * @return {Object}
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

  /**
   * Checks whether a given authenticated user has access for an array of assets
   * @method checkAccessForMultipleAssets
   * @async
   * @param {String} token - The Authorization token
   * @param {Array} ids - Array with asset ids
   * @example
   * InPlayer.Asset.checkAccessForMultipleAssets('eyJ0eXAiOiJKPECENR5Y',[36320,27215])
   * .then(data => console.log(data));
   * @return {Object}
  */
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

  /**
   * Get the asset info for a given asset ID and merchant UUID
   * @method findAsset
   * @async
   * @param {Numer} assetId - The ID of the asset
   * @param {String} merchant_uuid - The merchant UUID string
   * @example
   * InPlayer.Asset.findAsset(2,'a1f13-dd1dfh-rfh123-dhd1hd-fahh1dl')
   * .then(data => console.log(data));
   * @return {Object}
  */
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

  /**
   * Get an external assets' info
   * @method findExternalAsset
   * @async
   * @param {Numer} assetType - The type ID of the asset
   * @param {Number} externalId - The ID of the external asset
   * @example
   * InPlayer.Asset.findExternalAsset(2,44237)
   * .then(data => console.log(data));
   * @return {Object}
  */
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

  /**
   * Get package info for a given Package ID
   * @method findPackage
   * @async
   * @param {Numer} id - The type ID of the package
   * @example
   * InPlayer.Asset.findPackage(4444)
   * .then(data => console.log(data));
   * @return {Object}
  */
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

  /**
   * Get the access fees for a given asset ID
   * @method getAssetAccessFees
   * @async
   * @param {Numer} id - The ID of the asset
   * @example
   * InPlayer.Asset.getAssetAccessFees(555)
   * .then(data => console.log(data));
   * @return {Object}
  */
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

  /**
   * Get the freemium asset data
   * @method getAssetAccessFees
   * @async
   * @param {String} token - The authorization token
   * @param {Object} data - {}
   * @example
   * InPlayer.Asset.freemiumAsset('uoifhadafefbad1312nfuqd123', {})
   * .then(data => console.log(data));
   * @return {Object}
  */
  async freemiumAsset(token, data) {
    try{
      const response = await fetch(API.freemium, {
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

export default Asset;
