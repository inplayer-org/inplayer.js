import { AxiosResponse } from 'axios';

export interface Brand {
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
}

export interface BrandingData {
  brandingId: number;
  merchantUUID: string;
}

export interface Branding {
  getBranding(
    clientId: string,
    brandingId: string | number
  ): Promise<AxiosResponse<Brand>>;
}
