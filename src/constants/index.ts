export const API = {
  // Account
  signIn: '/accounts/authenticate',
  signOut: '/accounts/logout',
  signUp: '/accounts',
  requestNewPassword: '/accounts/forgot-password',
  setNewPassword: (token: any) => `/accounts/forgot-password/${token}`,
  getAccountInfo: '/accounts',
  getSocialLoginUrls: (state: any) => `/accounts/social?state=${state}`,
  updateAccount: '/accounts',
  changePassword: '/accounts/change-password',
  getRegisterFields: (merchantUuid: any) => `/accounts/register-fields/${merchantUuid}?rnd=${Math.random() * 15}`,
  getPurchaseHistory: (status: any, page = 0, size = 5) =>
    `/items/access/customers?status=${status}&page=${page}&size=${size}`,
  getAssetsHistory: (size: any, page: any, startDate: any, endDate: any) => {
    let url = `/payments/transactions?exclude=store-payment&size=${size}&page=${page}`;

    if (startDate) {
      url += `&startDate=${startDate}`;
    }

    if (endDate) {
      url += `&endDate=${endDate}`;
    }

    return url;
  },
  deleteAccount: '/accounts/erase',
  exportData: '/accounts/export',
  reportSSOtoken: (ssoDomain: any) => `${ssoDomain}/sso/cookie`,
  sendPinCode: '/v2/accounts/pin-codes/send',
  validatePinCode: '/v2/accounts/pin-codes/validate',
  merchantRestrictionSettings: (merchantUuid: string) =>
    `/restrictions/settings/${merchantUuid}`,
  // Asset
  checkAccessForAsset: (id: any) => `/items/${id}/access`,
  checkFreeTrial: (id: any) => `/items/used-trial-period/${id}`,
  getAsset: (assetId: any, merchantUuid: any) => `/items/${merchantUuid}/${assetId}`,
  getExternalAsset: (assetType: any, externalId: any, merchantUuid: any) => {
    if (merchantUuid) {
      return `/items/assets/external/${assetType}/${externalId}?merchant_uuid=${merchantUuid}`;
    }
    return `/items/assets/external/${assetType}/${externalId}`;
  },
  getPackage: (id: any) => `/items/packages/${id}`,
  getAssetAccessFees: (id: any) => `/items/${id}/access-fees`,
  getCloudfrontURL: (assetId: any, videoUrl: any) =>
    `/items/${assetId}/access/cloudfront?url=${videoUrl}`,
  // Payment
  getPaymentMethods: '/payments/methods',
  getPaymentTools: (paymentMethodId: any) => `/payments/method/${paymentMethodId}/tools`,
  payForAsset: '/payments',
  payForAssetV2: '/v2/payments',
  getPayPalParams: '/external-payments',
  getDefaultCreditCard: '/v2/payments/cards/default',
  setDefaultCreditCard: '/v2/payments/cards/default',
  getDirectDebitMandate: '/v2/payments/direct-debit/mandate',
  createDirectDebitMandate: '/v2/payments/direct-debit/mandate',
  // Subscriptions
  getSubscriptions: (limit: number, page: number) => `/subscriptions?limit=${limit}&page=${page}`,
  getSubscription: (id: number) => `/subscriptions/${id}`,
  subscribe: '/subscriptions',
  cancelSubscription: (url: string) => `${url}`,
  subscribeV2: '/v2/subscriptions',
  // Misc
  getDlcLinks: (id: any) => `/dlc/${id}/links`,
  getDiscount: '/vouchers/discount',
  getBranding: (merchantUuid: any, brandingId: any) =>
    `/branding/paywall/${merchantUuid}/${brandingId}`,
  downloadFile: (assetId: any, filename: any) => `/dlc/${assetId}/${filename}`,
  requestCodeAccess: '/items/access/codes',
  releaseAccessCode: (code: string | number) => `/items/access/codes/${code}`,
};