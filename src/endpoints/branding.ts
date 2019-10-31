import { ApiConfig, Request as RequestType } from '../models/CommonInterfaces';
import BaseExtend from '../extends/base';
import { API } from '../constants';

/**
 * Contains all Requests regarding branding.
 *
 * @class Branding
 */

class Branding extends BaseExtend {
  constructor(config: ApiConfig, request: RequestType) {
    super(config, request);
  }

  /**
   * Gets branding params for given merchant
   * @method getBranding
   * @async
   * @param {string} clientId - The Client id
   * @param {string} brandingId - The branding id or 'default'
   * @example
   *     InPlayer.Branding
   *     .getBranding('eyJ0e-XAiOi-JKPEC-ENR5Y', '123')
   *     .then(data => console.log(data));
   * @returns  {AxiosResponse<Brand>}
   */
  async getBranding(clientId: string, brandingId: string | number) {
    return this.request.get(API.getBranding(clientId, brandingId));
  }
}

export default Branding;
