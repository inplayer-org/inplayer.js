export const API = config => {
    return {
        // Account
        authenticate: `${config.BASE_URL}/accounts/authenticate`,
        signIn: `${config.BASE_URL}/accounts/login`,
        signOut: `${config.BASE_URL}/accounts/logout`,
        signUp: `${config.BASE_URL}/accounts`,
        requestNewPassword: `${config.BASE_URL}/accounts/forgot-password`,
        setNewPassword: token =>
            `${config.BASE_URL}/accounts/forgot-password/${token}`,
        getAccountInfo: `${config.BASE_URL}/accounts`,
        getSocialLoginUrls: state => `${config.BASE_URL}/accounts/social?state=${state}`,
        updateAccount: `${config.BASE_URL}/accounts`,
        changePassword: `${config.BASE_URL}/accounts/change-password`,
        getRegisterFields: merchantUuid =>
            `${
                config.BASE_URL
            }/accounts/register-fields/${merchantUuid}?rnd=${Math.random(15)}`,
        getPurchaseHistory: (status, page = 0, size = 5) =>
            `${
                config.BASE_URL
            }/items/access/customers?status=${status}&page=${page}&size=${size}`,
        getAssetsHistory: (size, page, startDate, endDate) => {
            let url = `${
                config.BASE_URL
            }/payments/transactions?exclude=store-payment&size=${size}&page=${page}`;

            if (startDate) {
                url += `&startDate=${startDate}`;
            }

            if (endDate) {
                url += `&endDate=${endDate}`;
            }

            return url;
        },
        deleteAccount: `${config.BASE_URL}/accounts/erase`,
        exportData: `${config.BASE_URL}/accounts/export`,
        reportSSOtoken: ssoDomain =>
            `${ssoDomain}/sso/cookie`,
        sendPinCode: `${config.BASE_URL}/v2/accounts/pin-codes/send`,
        validatePinCode: `${config.BASE_URL}/v2/accounts/pin-codes/validate`,
        // Asset
        checkAccessForAsset: id => `${config.BASE_URL}/items/${id}/access`,
        checkFreeTrial: id =>
            `${config.BASE_URL}/items/used-trial-period/${id}`,
        getAsset: (assetId, merchantUuid) =>
            `${config.BASE_URL}/items/${merchantUuid}/${assetId}`,
        getExternalAsset: (assetType, externalId, merchantUuid) => {
            if (merchantUuid) {
                return `${
                    config.BASE_URL
                }/items/assets/external/${assetType}/${externalId}?merchant_uuid=${merchantUuid}`;
            }
            return `${
                config.BASE_URL
            }/items/assets/external/${assetType}/${externalId}`;
        },
        getPackage: id => `${config.BASE_URL}/items/packages/${id}`,
        getAssetAccessFees: id => `${config.BASE_URL}/items/${id}/access-fees`,
        getFreemiumAsset: `${config.BASE_URL}/items/access/unlimited`,
        getCloudfrontURL: (assetId, videoUrl) =>
            `${config.BASE_URL}/items/${assetId}/access/cloudfront?url=${videoUrl}`,
        // Payment
        getPaymentMethods: `${config.BASE_URL}/payments/methods`,
        getPaymentTools: paymentMethodId =>
            `${config.BASE_URL}/payments/method/${paymentMethodId}/tools`,
        payForAsset: `${config.BASE_URL}/payments`,
        getPayPalParams: `${config.BASE_URL}/external-payments`,
        getDefaultCreditCard: `${config.BASE_URL}/v2/payments/cards/default`,
        setDefaultCreditCard: `${config.BASE_URL}/v2/payments/cards/default`,
        // Subscriptions
        getSubscriptions: (limit, page) =>
            `${config.BASE_URL}/subscriptions?limit=${limit}&page=${page}`,
        getSubscription: id =>
            `${config.BASE_URL}/subscriptions/reporting/subscriptions/${id}`,
        subscribe: `${config.BASE_URL}/subscriptions`,
        cancelSubscription: url => `${url}`,
        // Misc
        getDlcLinks: id => `${config.BASE_URL}/dlc/${id}/links`,
        getDiscount: `${config.BASE_URL}/vouchers/discount`,
        getBranding: (merchantUuid, brandingId) =>
            `${config.BASE_URL}/branding/paywall/${merchantUuid}/${brandingId}`,
        downloadFile: (assetId, filename) =>
            `${config.BASE_URL}/dlc/${assetId}/${filename}`,
        requestCodeAccess: `${config.BASE_URL}/items/access/codes`,
        releaseAccessCode: code =>
            `${config.BASE_URL}/items/access/codes/${code}`,
    };
};
