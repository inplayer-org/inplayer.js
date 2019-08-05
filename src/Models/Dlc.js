import { checkStatus, checkAuthentication } from '../Utils';

/**
 * Contains mixed various types of function for dlcs, discounts, branding, etc.
 *
 * @class DLC
 */
class DLC {
    constructor(config, Account) {
        this.config = config;
        this.Account = Account;
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
    async getDlcLinks(assetId) {
        checkAuthentication();

        const t = this.Account.getToken();

        const response = await fetch(this.config.API.getDlcLinks(assetId), {
            headers: {
                Authorization: 'Bearer ' + t.token
            }
        });

        checkStatus(response);

        return await response.json();
    }
}

export default DLC;
