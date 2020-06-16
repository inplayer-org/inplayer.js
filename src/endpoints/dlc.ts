import { ApiConfig, Request } from '../models/Config';
import BaseExtend from '../extends/base';
import { API } from '../constants';

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
     * @returns  {AxiosResponse<DlcLink>}
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


export const dlc = (config: ApiConfig, request: Request) => {
  /**
   * Gets all DLC links
   * @method getDlcLinks
   * @async
   * @param {number} assetId - The id of the asset
   * @example
   *     InPlayer.DLC
   *     .getDlcLinks(36320)
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<DlcLink>}
   */
  const getDlcLinks = async (assetId: number) => {
    return request.authenticatedGet(API.getDlcLinks(assetId), {
      headers: {
        Authorization: `Bearer ${request.getToken().token}`,
      },
    })
  }
  return{getDlcLinks};
}