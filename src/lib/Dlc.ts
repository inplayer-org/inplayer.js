import { checkStatus, errorResponse } from '../Utils';
import { authenticatedApi } from '../Utils/http';
import { GetDlcData } from '../Interfaces/IAsset&Access';

const DLC_PATH = '/dlc';
const LINKS_PATH = '/links';

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
  async getDlcLinks(data: GetDlcData) {
    const body = {
      id: data.assetId,
    };

    return authenticatedApi.get(`${DLC_PATH}/${body.id}/${LINKS_PATH}`, {
      Authorization: `Bearer ${this.Account.getToken().token}`,
    });
  }
}

export default DLC;
