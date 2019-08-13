export const API = (config: any) => {
    return {
        // Account
        authenticate: `${config.BASE_URL}/accounts/authenticate`,
        signIn: `${config.BASE_URL}/accounts/login`,
        signOut: `${config.BASE_URL}/accounts/logout`,
        signUp: `${config.BASE_URL}/accounts`,
        requestNewPassword: `${config.BASE_URL}/accounts/forgot-password`,
        setNewPassword: (token: any) =>
            `${config.BASE_URL}/accounts/forgot-password/${token}`,
        getAccountInfo: `${config.BASE_URL}/accounts`,
        getSocialLoginUrls: (state: any) => `${config.BASE_URL}/accounts/social?state=${state}`,
        updateAccount: `${config.BASE_URL}/accounts`,
        changePassword: `${config.BASE_URL}/accounts/change-password`,
        getRegisterFields: (merchantUuid: any) =>
            `${
                config.BASE_URL
            }/accounts/register-fields/${merchantUuid}?rnd=${Math.random() * 15}`,
        getPurchaseHistory: (status: any, page = 0, size = 5) =>
            `${
                config.BASE_URL
            }/items/access/customers?status=${status}&page=${page}&size=${size}`,
        getAssetsHistory: (size: any, page: any, startDate: any, endDate: any) => {
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
        reportSSOtoken: (ssoDomain: any) =>
            `${ssoDomain}/sso/cookie`,
        // Asset
        checkAccessForAsset: (id: any) => `${config.BASE_URL}/items/${id}/access`,
        checkFreeTrial: (id: any) =>
            `${config.BASE_URL}/items/used-trial-period/${id}`,
        getAsset: (assetId: any, merchantUuid: any) =>
            `${config.BASE_URL}/items/${merchantUuid}/${assetId}`,
        getExternalAsset: (assetType: any, externalId: any, merchantUuid: any) => {
            if (merchantUuid) {
                return `${
                    config.BASE_URL
                }/items/assets/external/${assetType}/${externalId}?merchant_uuid=${merchantUuid}`;
            }
            return `${
                config.BASE_URL
            }/items/assets/external/${assetType}/${externalId}`;
        },
        getPackage: (id: any) => `${config.BASE_URL}/items/packages/${id}`,
        getAssetAccessFees: (id: any) => `${config.BASE_URL}/items/${id}/access-fees`,
        getFreemiumAsset: `${config.BASE_URL}/items/access/unlimited`,
        getCloudfrontURL: (assetId: any, videoUrl: any) =>
            `${config.BASE_URL}/items/${assetId}/access/cloudfront?url=${videoUrl}`,
        // Payment
        getPaymentMethods: `${config.BASE_URL}/payments/methods`,
        getPaymentTools: (paymentMethodId: any) =>
            `${config.BASE_URL}/payments/method/${paymentMethodId}/tools`,
        payForAsset: `${config.BASE_URL}/payments`,
        getPayPalParams: `${config.BASE_URL}/external-payments`,
        getDefaultCreditCard: `${config.BASE_URL}/v2/payments/cards/default`,
        setDefaultCreditCard: `${config.BASE_URL}/v2/payments/cards/default`,
        // Subscriptions
        getSubscriptions: (limit: any, page: any) =>
            `${config.BASE_URL}/subscriptions?limit=${limit}&page=${page}`,
        getSubscription: (id: any) =>
            `${config.BASE_URL}/subscriptions/reporting/subscriptions/${id}`,
        subscribe: `${config.BASE_URL}/subscriptions`,
        cancelSubscription: (url: any) => `${url}`,
        // Misc
        getDlcLinks: (id: any) => `${config.BASE_URL}/dlc/${id}/links`,
        getDiscount: `${config.BASE_URL}/vouchers/discount`,
        getBranding: (merchantUuid: any, brandingId: any) =>
            `${config.BASE_URL}/branding/paywall/${merchantUuid}/${brandingId}`,
        downloadFile: (assetId: any, filename: any) =>
            `${config.BASE_URL}/dlc/${assetId}/${filename}`,
        requestCodeAccess: `${config.BASE_URL}/items/access/codes`,
        releaseAccessCode: (code: any) =>
            `${config.BASE_URL}/items/access/codes/${code}`,
    };
};
