import { CommonError } from './CommonInterfaces';

export interface CreateGlobalAgeRestriction {
    code: number;
    message: string;
}

export interface CreateGlobalAgeRestrictionError extends CommonError { }

export interface DeleteGlobalAgeRestriction {
    code: number;
    message: string;
}

export interface DeleteGlobalAgeRestrictionError extends CommonError { }

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

export interface ReturnAgeRestrictionForItemError extends CommonError { }

export interface CreateAgeRestrictionForItem {
    code: number;
    message: string;
}

export interface CreateAgeRestrictionForItemError extends CommonError { }

export interface DeleteAgeRestrictionForItem {
    code: number;
    message: string;
}

export interface DeleteAgeRestrictionForItemError extends CommonError { }

export interface DomainRestrictionPerMerchant {
    id: number;
    merchant_id: number;
    domain: string;
    type: string;
}

export interface ReturnDomainRestrictionsPerMerchant {
    collection: Array<DomainRestrictionPerMerchant>;
}

export interface ReturnDomainRestrictionsPerMerchantError extends CommonError { }

export interface DeleteGlobalDomain {
    code: number;
    message: string;
}

export interface DeleteGlobalDomainError extends CommonError { }

export interface CreateOrUpdateGlobalDomainRestriction {
    code: number;
    message: string;
}

export interface CreateOrUpdateGlobalDomainRestrictionError extends CommonError { }

export interface CreateOrUpdateDomainRestrictionsForGivenAsset {
    code: number;
    message: string;
}

export interface CreateOrUpdateDomainRestrictionsForGivenAssetError extends CommonError { }

export interface ReturnDomainRestrictionsPerItem {
    id: number;
    item_id: number;
    merchant_id: number;
    domain: string;
    type: string;
}

export interface ReturnDomainRestrictionsPerItemError extends CommonError { }

export interface DeleteAssetDomain {
    code: number;
    message: string;
}

export interface DeleteAssetDomainError extends CommonError { }

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
    countries: Array<Country>;
    created_at: number;
}

export interface ReturnAllCountrySetsPerMerchant extends CountrySet { }

export interface ReturnAllCountrySetsPerMerchantError extends CommonError { }

export interface CreateNewCountrySet extends CountrySet { }

export interface CreateNewCountrySetError extends CommonError { }

export interface ReturnCountrySetWithCountries extends CountrySet { }

export interface ReturnCountrySetWithCountriesError extends CommonError { }

export interface EditCountrySet extends CountrySet { }

export interface EditCountrySetError extends CommonError { }

export interface DeleteCountrySet {
    code: number;
    message: string;
}

export interface DeleteCountrySetError extends CommonError { }

export interface RemoveCountryFromCountrySet {
    code: number;
    message: string;
}

export interface RemoveCountryFromCountrySetError extends CommonError { }

export interface SetCountrySetForAsset extends CountrySet { }

export interface SetCountrySetForAssetError extends CommonError { }

export interface UpdateCountrySetForAsset extends CountrySet { }

export interface UpdateCountrySetForAssetError extends CommonError { }

export interface RemoveCountrySetForAsset {
    code: number;
    message: string;
}

export interface RemoveCountrySetForAssetError extends CommonError { }

export interface ReturnCountrySetForAsset extends CountrySet { }

export interface ReturnCountrySetForAssetError extends CommonError { }

export interface CreateOrUpdateRestrictionSettingsForGivenMerchant {
    code: number;
    message: string;
}

export interface CreateOrUpdateRestrictionSettingsForGivenMerchantError extends CommonError { }

export interface ReturnRestrictionSettingsPerMerchant {
    age_verification_type: string;
    age_verification_enabled: boolean;
    merchant_uuid: string;
    created_at: number;
    updated_at: number;
}

export interface ReturnRestrictionSettingsPerMerchantError extends CommonError { }
