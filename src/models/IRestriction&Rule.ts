import { CommonResponse } from './CommonInterfaces';

export interface CreateGlobalAgeRestriction {
    code: number;
    message: string;
}

export interface CreateGlobalAgeRestrictionError extends CommonResponse { }

export interface DeleteGlobalAgeRestriction {
    code: number;
    message: string;
}

export interface DeleteGlobalAgeRestrictionError extends CommonResponse { }

export interface ReturnGlobalAgeRestriction {
    min_age: number;
    merchant_uuid: string;
    created_at: number;
    updated_at: number;
}

export interface ReturnGlobalAgeRestrictionError {
    code: number;
}

export interface ReturnAgeRestrictionForItem {
    min_age: number;
    item_id: number;
    merchant_id: number;
    created_at: number;
    updated_at: number;
}

export interface ReturnAgeRestrictionForItemError extends CommonResponse { }

export interface CreateAgeRestrictionForItem {
    code: number;
    message: string;
}

export interface CreateAgeRestrictionForItemError extends CommonResponse { }

export interface DeleteAgeRestrictionForItem {
    code: number;
    message: string;
}

export interface DeleteAgeRestrictionForItemError extends CommonResponse { }

export interface DomainRestrictionPerMerchant {
    id: number;
    merchant_id: number;
    domain: string;
    type: string;
}

export interface ReturnDomainRestrictionsPerMerchant {
    collection: DomainRestrictionPerMerchant[];
}

export interface ReturnDomainRestrictionsPerMerchantError extends CommonResponse { }

export interface DeleteGlobalDomain {
    code: number;
    message: string;
}

export interface DeleteGlobalDomainError extends CommonResponse { }

export interface CreateOrUpdateGlobalDomainRestriction {
    code: number;
    message: string;
}

export interface CreateOrUpdateGlobalDomainRestrictionError extends CommonResponse { }

export interface CreateOrUpdateDomainRestrictionsForGivenAsset {
    code: number;
    message: string;
}

export interface CreateOrUpdateDomainRestrictionsForGivenAssetError extends CommonResponse { }

export interface ReturnDomainRestrictionsPerItem {
    id: number;
    item_id: number;
    merchant_id: number;
    domain: string;
    type: string;
}

export interface ReturnDomainRestrictionsPerItemError extends CommonResponse { }

export interface DeleteAssetDomain {
    code: number;
    message: string;
}

export interface DeleteAssetDomainError extends CommonResponse { }

export interface Country {
    id: number;
    country: string;
}

export interface CountrySet {
    id: number;
    merchant_id: number;
    name: string;
    type: string;
    global: boolean;
    countries: Country[];
    created_at: number;
}

export interface ReturnAllCountrySetsPerMerchant extends CountrySet { }

export interface ReturnAllCountrySetsPerMerchantError extends CommonResponse { }

export interface CreateNewCountrySet extends CountrySet { }

export interface CreateNewCountrySetError extends CommonResponse { }

export interface ReturnCountrySetWithCountries extends CountrySet { }

export interface ReturnCountrySetWithCountriesError extends CommonResponse { }

export interface EditCountrySet extends CountrySet { }

export interface EditCountrySetError extends CommonResponse { }

export interface DeleteCountrySet {
    code: number;
    message: string;
}

export interface DeleteCountrySetError extends CommonResponse { }

export interface RemoveCountryFromCountrySet {
    code: number;
    message: string;
}

export interface RemoveCountryFromCountrySetError extends CommonResponse { }

export interface SetCountrySetForAsset extends CountrySet { }

export interface SetCountrySetForAssetError extends CommonResponse { }

export interface UpdateCountrySetForAsset extends CountrySet { }

export interface UpdateCountrySetForAssetError extends CommonResponse { }

export interface RemoveCountrySetForAsset {
    code: number;
    message: string;
}

export interface RemoveCountrySetForAssetError extends CommonResponse { }

export interface ReturnCountrySetForAsset extends CountrySet { }

export interface ReturnCountrySetForAssetError extends CommonResponse { }

export interface CreateOrUpdateRestrictionSettingsForGivenMerchant {
    code: number;
    message: string;
}

export interface CreateOrUpdateRestrictionSettingsForGivenMerchantError extends CommonResponse { }

export interface ReturnRestrictionSettingsPerMerchant {
    age_verification_type: string;
    age_verification_enabled: boolean;
    merchant_uuid: string;
    created_at: number;
    updated_at: number;
}

export interface ReturnRestrictionSettingsPerMerchantError extends CommonResponse { }
