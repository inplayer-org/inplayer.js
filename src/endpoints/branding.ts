import { AxiosResponse } from 'axios';
import { ApiConfig, Request as RequestType } from '../models/Config';
import BaseExtend from '../extends/base';
import { API } from '../constants';
import { BrandingDetails } from '../models/IBrand';

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
   * Gets branding details for given merchant.
   * @method getBranding
   * @async
   * @param {string} clientId The Merchant's unique universal identifier (Merchant UUID).
   * You can find it on the InPlayer's dashboard at the Account Details section as Account ID.
   * @param {string | number} brandingId The id of created branding theme in InPlayer Dashboard.
   * If it is not set the default branding details will be returned.
   * @example
   *     InPlayer.Branding
   *     .getBranding('eyJ0e-XAiOi-JKPEC-ENR5Y', '123')
   *     .then(data => console.log(data));
   * @returns {AxiosResponse<BrandingDetails>} Contains the data:
   * ```typescript
   * {
   *    id: number;
   *    exists: boolean;
   *    brand_name: string;
   *    paywall_cover_photo: string;
   *    paywall_brand_logo: string;
   *    paywall_primary_color: string;
   *    paywall_secondary_color: string;
   *    paywall_buttons_bg_color: string;
   *    paywall_buttons_text_color: string;
   *    preview_buttons_bg_color: string;
   *    preview_buttons_text_color: string;
   *    preview_top_border: boolean;
   *    inplayer_protected_label: boolean;
   *    paywall_footer: string;
   *    default: boolean;
   *    template_id: number;
   *    terms_url: string;
   *    dark_mode: boolean;
   * }
   * ```
   */
  async getBranding(clientId: string, brandingId = 'default'): Promise<AxiosResponse<BrandingDetails>> {
    return this.request.get(API.getBranding(clientId, brandingId));
  }
}

export default Branding;
