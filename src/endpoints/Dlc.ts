import { authenticatedApi, getToken } from '../Utils/http';
import { Account } from '../Interfaces/IAccount&Authentication';
import { ApiConfig } from '../Interfaces/CommonInterfaces';

/**
 * Contains mixed various types of function for dlcs, discounts, branding, etc.
 *
 * @class DLC
 */
class DLC {
  config: ApiConfig;
  Account: Account;
  constructor(config: ApiConfig, account: Account) {
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
     * @return {AxiosResponse<DlcLink>}
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
