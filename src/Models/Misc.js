import {
  API
} from '../../constants/endpoints';

/**
 * Contains mixed various types of functiosn for dlcs, discounts, branding, etc.
 *
 * @class Misc
 */
class Misc{

  /**
   * Gets all DLC links
   * @method getDlcLinks
   * @async
   * @param {String} token - The Authorization token
   * @param {Number} assetId - The id of the asset
   * @example
   *     InPlayer.Misc
   *     .getDlcLinks('eyJ0eXAiOiJKPECENR5Y',36320)
   *     .then(data => console.log(data));
   * @return {Object}
  */
  async getDlcLinks(token, assetId){
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

  /**
   * Gets the discount for a given ..
   * @method getDiscount
   * @async
   * @param {String} token - The Authorization token
   * @param {Object} data - {
   *   voucher_code: String,
   *   merchant_id: String,
   *   access_fee_id: Number
   * }
   * @example
   *     InPlayer.Misc
   *     .getDiscount('eyJ0eXAiOiJKPECENR5Y',{
   *        voucherCode: '120fwjhniudh42i7',
   *        merchantId: 'hghfqw92dm29-1g',
   *        accessFeeId: 2
   *     })
   *     .then(data => console.log(data));
   * @return {Object}
  */
  async getDiscount(token, data) {

    const fd = new FormData();
    fd.append('access_fee_id', data.accessFeeId);
    fd.append('voucherCode', data.voucherCode);
    fd.append('merchantId', data.merchantId);

    try{
      const response = await fetch(API.getDiscount, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: fd
      });

      const data = await response.json();

      return data;
    }catch(error){
      return false;
    }
  }

  /**
   * Gets branding for given merchant
   * @method getBranding
   * @async
   * @param {String} merchantUid - The UUID of the merchant
   * @example
   *     InPlayer.Misc
   *     .getBranding('eyJ0e-XAiOi-JKPEC-ENR5Y')
   *     .then(data => console.log(data));
   * @return {Object}
  */
  async getBranding(merchantUid) {
    try{
      const response = await fetch(API.getBranding(merchantUid), {
        method: 'GET'
      });

      const data = await response.json();

      return data;
    }catch(error){
      return false;
    }
  }

  /**
   * Downloads a file
   * @method downloadProtectedFile
   * @async
   * @param {String} token - The Authorization token
   * @param {number} assetId - The Id of the asset
   * @param {String} filename - The name of the file
   * @example
   *     InPlayer.Misc
   *     .downloadProtectedFile('eyJ0eXAiOiJKPECENR5Y',2234, 'test.js')
   *     .then(data => console.log(data));
   * @return {Object}
  */
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
}

export default Misc;
