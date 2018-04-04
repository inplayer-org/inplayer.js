import { config } from '../config.js';

export const API = config => {
    return {
        //User
        signIn: `${config.BASE_URL}/accounts/login`,
        signOut: `${config.BASE_URL}/accounts/logout`,
        signUp: `${config.BASE_URL}/accounts`,
        requestNewPassword: `${config.BASE_URL}/accounts/forgot-password`,
        setNewPassword: token =>
            `${config.BASE_URL}/accounts/forgot-password/${token}`,
        getAccountInfo: `${config.BASE_URL}/accounts`,
        social: state => `${config.BASE_URL}/accounts/social?state=${state}`,
        updateAccount: `${config.BASE_URL}/accounts`,
        changePassword: `${config.BASE_URL}/accounts/change-password`,
        getRegisterFields: merchant_uuid =>
            `${config.BASE_URL}/accounts/register-fields/${merchant_uuid}`,
        getPurchaseHistory: (status, page = 0, limit = 5) =>
            `${
                config.BASE_URL
            }/reporting/access/customers?status=${status}&page=${page}&limit=${limit}`,
        //Asset
        checkAccess: id => `${config.BASE_URL}/items/${id}/access`,
        findAsset: (assetId, merchant_uuid) =>
            `${config.BASE_URL}/items/${merchant_uuid}/${assetId}`,
        findExternalAsset: (assetType, externalId) =>
            `${
                config.BASE_URL
            }/items/assets/external/${assetType}/${externalId}`,
        findPackage: id => `${config.BASE_URL}/items/packages/${id}`,
        findAccessFees: id => `${config.BASE_URL}/items/${id}/access-fees`,
        freemium: `${config.BASE_URL}/items/access/unlimited`,
        //Payment
        getPaymentMethods: `${config.BASE_URL}/payments/methods`,
        getPaymentTools: paymentMethodId =>
            `${config.BASE_URL}/payments/method/${paymentMethodId}/tools`,
        payForAsset: `${config.BASE_URL}/payments`,
        externalPayments: `${config.BASE_URL}/external-payments`,
        //Subscriptions
        getSubscriptions: `${config.BASE_URL}/subscriptions`,
        subscribe: `${config.BASE_URL}/subscriptions`,
        //Misc
        getDlcLinks: id => `${config.BASE_URL}/dlc/${id}/links`,
        getDiscount: `${config.BASE_URL}/vouchers/discount`,
        getBranding: merchant_uuid =>
            `${config.BASE_URL}/branding/paywall/${merchant_uuid}`,
        downloadFile: (assetId, filename) =>
            `${config.BASE_URL}/dlc/${assetId}/${filename}`,
    };
};
