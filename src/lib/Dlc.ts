import { authenticatedApi, getToken } from '../Utils/http';
import { Account } from '../Interfaces/IAccount&Authentication';

/**
 * Contains mixed various types of function for dlcs, discounts, branding, etc.
 *
 * @class DLC
 */
class DLC {
  config: any;
  Account: Account;
  constructor(config: any, account: Account) {
    this.config = config;
    this.Account = account;
  }
  /**
     * Gets all DLC links
     * @method getDlcLinks
     * @async
     * @param {number} assetId - The id of the asset
     * @example
     *     InPlayer.DLC
     *     .getDlcLinks(36320)
     *     .then(data => console.log(data));
     * @return {Object}
     */
  async getDlcLinks(assetId: number) {
    return authenticatedApi.get(this.config.API.getDlcLinks(assetId), {
      headers: {
        Authorization: `Bearer ${getToken().token}`,
      },
    });
  }
}

export default DLC;
