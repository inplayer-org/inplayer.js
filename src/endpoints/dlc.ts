import { ApiConfig, Request } from '../models/CommonInterfaces';
import BaseExtend from '../extends/base';
import { API } from '../constants/endpoints';

/**
 * Contains mixed various types of function for dlcs, discounts, branding, etc.
 *
 * @class DLC
 */
class DLC extends BaseExtend {
  constructor(config: ApiConfig, request: Request) {
    super(config, request);
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
    return this.request.authenticatedGet(API.getDlcLinks(assetId), {
      headers: {
        Authorization: `Bearer ${this.request.getToken().token}`,
      },
    });
  }
}

export default DLC;