import { basicApi } from '../Utils/http';

/**
 * Contains all Requests regarding branding.
 *
 * @class Branding
 */
class Branding {
  config: any;
  constructor(config: any) {
    this.config = config;
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
   * @return {Object}
   */
  async getBranding(clientId: string, brandingId: string) {
    return basicApi.get(this.config.API.getBranding(clientId, brandingId));
  }
}

export default Branding;
