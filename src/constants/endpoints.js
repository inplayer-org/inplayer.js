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
        social: state => `${config.BASE_URL}/accounts/social?state=${state}`,
        updateAccount: `${config.BASE_URL}/accounts`,
        changePassword: `${config.BASE_URL}/accounts/change-password`,
        getRegisterFields: merchantUuid =>
            `${
                config.BASE_URL
            }/accounts/register-fields/${merchantUuid}?rnd=${Math.random(15)}`,
        getPurchaseHistory: (status, page = 0, size = 5) =>
            `${
                config.BASE_URL
            }/reporting/access/customers?status=${status}&page=${page}&size=${size}`,
        assetsHistory: (size, page, startDate, endDate) => {
            let url = `${
                config.BASE_URL
            }/reporting/transactions?exclude=store-payment&size=${size}&page=${page}`;

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
        // Asset
        checkAccess: id => `${config.BASE_URL}/items/${id}/access`,
        checkFreeTrial: id =>
            `${config.BASE_URL}/items/used-trial-period/${id}`,
        findAsset: (assetId, merchantUuid) =>
            `${config.BASE_URL}/items/${merchantUuid}/${assetId}`,
        findExternalAsset: (assetType, externalId, merchantUuid) => {
            if (merchantUuid) {
                return `${
                    config.BASE_URL
                }/items/assets/external/${assetType}/${externalId}?merchantUuid=${merchantUuid}`;
            }
            return `${
                config.BASE_URL
            }/items/assets/external/${assetType}/${externalId}`;
        },
        findPackage: id => `${config.BASE_URL}/items/packages/${id}`,
        findAccessFees: id => `${config.BASE_URL}/items/${id}/access-fees`,
        freemium: `${config.BASE_URL}/items/access/unlimited`,
        // Payment
        getPaymentMethods: `${config.BASE_URL}/payments/methods`,
        getPaymentTools: paymentMethodId =>
            `${config.BASE_URL}/payments/method/${paymentMethodId}/tools`,
        payForAsset: `${config.BASE_URL}/payments`,
        externalPayments: `${config.BASE_URL}/external-payments`,
        // Subscriptions
        getSubscriptions: (limit, page) =>
            `${config.BASE_URL}/subscriptions?limit=${limit}&page=${page}`,
        getSubscription: id =>
            `${config.BASE_URL}/reporting/subscriptions/${id}`,
        subscribe: `${config.BASE_URL}/subscriptions`,
        cancelTokenSubscribe: token => {
            if (token.endsWith('PP')) {
                return `${config.BASE_URL}/external-payments/cancel/${token}`;
            }

            return `${config.BASE_URL}/subscriptions/cancel/${token}`;
        },
        // Misc
        getDlcLinks: id => `${config.BASE_URL}/dlc/${id}/links`,
        getDiscount: `${config.BASE_URL}/vouchers/discount`,
        getBranding: (merchantUuid, brandingId) =>
            `${config.BASE_URL}/branding/paywall/${merchantUuid}/${brandingId}`,
        downloadFile: (assetId, filename) =>
            `${config.BASE_URL}/dlc/${assetId}/${filename}`,
    };
};
