import { authenticatedApi, getToken } from '../Utils/http';
import { DlcData } from '../Interfaces/IAsset&Access';

/**
 * Contains mixed various types of function for dlcs, discounts, branding, etc.
 *
 * @class DLC
 */
class DLC {
  config: any;
  Account: any;
  constructor(config: any, Account: any) {
    this.config = config;
    this.Account = Account;
  }
  /**
   * Gets all DLC links
   * @method getDlcLinks
   * @async
   * @param {number} data {
   *  id: number
   * }
   * @example
   *     InPlayer.DLC
   *     .getDlcLinks(36320)
   *     .then(data => console.log(data));
   * @return {Object}
   */
  async getDlcLinks(data: DlcData) {
    const body = {
      id: data.assetId,
    };

    return authenticatedApi.get(this.config.API.getDlcLinks(body.id), {
      headers: {
        Authorization: `Bearer ${getToken().token}`,
      },
    });
  }
}

export default DLC;
