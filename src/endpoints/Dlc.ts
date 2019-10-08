import { ApiConfig } from '../Interfaces/CommonInterfaces';
import BaseExtend from '../extends/base';

/**
 * Contains mixed various types of function for dlcs, discounts, branding, etc.
 *
 * @class DLC
 */
class DLC extends BaseExtend {
  constructor(config: ApiConfig) {
    super(config);
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
    return this.request.authenticatedApi.get(this.config.API.getDlcLinks(assetId), {
      headers: {
        Authorization: `Bearer ${this.request.getToken().token}`,
      },
    });
  }
}

export default DLC;
