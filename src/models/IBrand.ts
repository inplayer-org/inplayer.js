import { AxiosResponse } from 'axios';
import { BaseExtend } from './CommonInterfaces';

export interface BrandingDetails {
  id: number;
  exists: boolean;
  brand_name: string;
  paywall_cover_photo: string;
  paywall_brand_logo: string;
  paywall_primary_color: string;
  paywall_secondary_color: string;
  paywall_buttons_bg_color: string;
  paywall_buttons_text_color: string;
  preview_top_border: boolean;
  inplayer_protected_label: boolean;
  paywall_footer: string;
  default: boolean;
  template_id: number;
  terms_url: string;
}

export interface Branding extends BaseExtend {
  getBranding(
    clientId: string,
    brandingId?: string | number
  ): Promise<AxiosResponse<BrandingDetails>>;
}
