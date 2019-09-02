import { CommonResponse, AdvanceError } from './CommonInterfaces';

export interface CreateBrandTheme {
    id: number;
}

export interface CreateBrandThemeError extends CommonResponse { }

export interface CreateBrandThemeError422 extends AdvanceError { }

// TODO: No 200 responce for UpdateBrandTheme

export interface UpdateBrandThemeError extends CommonResponse { }

export interface UpdateBrandThemeError422 extends AdvanceError { }

// TODO: No 200 responce for DeleteBrandTheme

export interface DeleteBrandThemeError extends CommonResponse { }

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

export interface GetBrandDetails extends Brand { }

export interface GetBrandDetailsError extends CommonResponse { }

export interface GetDefaultBrandDetails extends Brand { }

export interface GetDefaultBrandDetailsError extends CommonResponse { }

export interface BrandingData {
    brandingId: number;
    merchantUUID: string;
}

export interface Branding {
  getBranding(clientId: string, brandingId: string): object;
}
