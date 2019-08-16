import { basicApi } from '../Utils/http';
import { Brand, GetBrandingData } from '../Interfaces/IBrand';

const BRANDING_PATH = '/branding/paywall';

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
         * @param {Object} data - Contains {
         *  brandingId: number,
         *  merchantUUID: string
         * }
         * @example
         *     InPlayer.Branding
         *     .getBranding('/branding/paywall', 'eyJ0e-XAiOi-JKPEC-ENR5Y', '123')
         *     .then(data => console.log(data));
         * @return {Brand}
    */
    // eslint-disable-next-line class-methods-use-this
    async getBranding(data: GetBrandingData) {
      const body = {
        id: data.brandingId,
        merchant_uuid: data.merchantUUID,
      };

      return basicApi.get(`${BRANDING_PATH}/${body.merchant_uuid}/${body.id}`);
    }
}

export default Branding;
