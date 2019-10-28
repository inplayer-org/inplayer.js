export const API = (baseUrl: string) => ({
  // Account
  signIn: `${baseUrl}/accounts/authenticate`,
  signOut: `${baseUrl}/accounts/logout`,
  signUp: `${baseUrl}/accounts`,
  requestNewPassword: `${baseUrl}/accounts/forgot-password`,
  setNewPassword: (token: any) => `${baseUrl}/accounts/forgot-password/${token}`,
  getAccountInfo: `${baseUrl}/accounts`,
  getSocialLoginUrls: (state: any) => `${baseUrl}/accounts/social?state=${state}`,
  updateAccount: `${baseUrl}/accounts`,
  changePassword: `${baseUrl}/accounts/change-password`,
  getRegisterFields: (merchantUuid: any) => `${
    baseUrl
  }/accounts/register-fields/${merchantUuid}?rnd=${Math.random() * 15}`,
  getPurchaseHistory: (status: any, page = 0, size = 5) =>
    `${baseUrl}/items/access/customers?status=${status}&page=${page}&size=${size}`,
  getAssetsHistory: (size: any, page: any, startDate: any, endDate: any) => {
    let url = `${baseUrl}/payments/transactions?exclude=store-payment&size=${size}&page=${page}`;

    if (startDate) {
      url += `&startDate=${startDate}`;
    }

    if (endDate) {
      url += `&endDate=${endDate}`;
    }

    return url;
  },
  deleteAccount: `${baseUrl}/accounts/erase`,
  exportData: `${baseUrl}/accounts/export`,
  reportSSOtoken: (ssoDomain: any) => `${ssoDomain}/sso/cookie`,
  sendPinCode: `${baseUrl}/v2/accounts/pin-codes/send`,
  validatePinCode: `${baseUrl}/v2/accounts/pin-codes/validate`,
  merchantRestrictionSettings: (merchantUuid: string) =>
    `${baseUrl}/restrictions/settings/${merchantUuid}`,
  // Asset
  checkAccessForAsset: (id: any) => `${baseUrl}/items/${id}/access`,
  checkFreeTrial: (id: any) => `${baseUrl}/items/used-trial-period/${id}`,
  getAsset: (assetId: any, merchantUuid: any) => `${baseUrl}/items/${merchantUuid}/${assetId}`,
  getExternalAsset: (assetType: any, externalId: any, merchantUuid: any) => {
    if (merchantUuid) {
      return `${baseUrl}/items/assets/external/${assetType}/${externalId}?merchant_uuid=${merchantUuid}`;
    }
    return `${baseUrl}/items/assets/external/${assetType}/${externalId}`;
  },
  getPackage: (id: any) => `${baseUrl}/items/packages/${id}`,
  getAssetAccessFees: (id: any) => `${baseUrl}/items/${id}/access-fees`,
  getCloudfrontURL: (assetId: any, videoUrl: any) =>
    `${baseUrl}/items/${assetId}/access/cloudfront?url=${videoUrl}`,
  // Payment
  getPaymentMethods: `${baseUrl}/payments/methods`,
  getPaymentTools: (paymentMethodId: any) => `${baseUrl}/payments/method/${paymentMethodId}/tools`,
  payForAsset: `${baseUrl}/payments`,
  payForAssetV2: `${baseUrl}/v2/payments`,
  getPayPalParams: `${baseUrl}/external-payments`,
  getDefaultCreditCard: `${baseUrl}/v2/payments/cards/default`,
  setDefaultCreditCard: `${baseUrl}/v2/payments/cards/default`,
  getDirectDebitMandate: `${baseUrl}/v2/payments/direct-debit/mandate`,
  createDirectDebitMandate: `${baseUrl}/v2/payments/direct-debit/mandate`,
  // Subscriptions
  getSubscriptions: (limit: number, page: number) => `${baseUrl}/subscriptions?limit=${limit}&page=${page}`,
  getSubscription: (id: number) => `${baseUrl}/subscriptions/${id}`,
  subscribe: `${baseUrl}/subscriptions`,
  cancelSubscription: (url: string) => `${url}`,
  subscribeV2: `${baseUrl}/v2/subscriptions`,
  // Misc
  getDlcLinks: (id: any) => `${baseUrl}/dlc/${id}/links`,
  getDiscount: `${baseUrl}/vouchers/discount`,
  getBranding: (merchantUuid: any, brandingId: any) =>
    `${baseUrl}/branding/paywall/${merchantUuid}/${brandingId}`,
  downloadFile: (assetId: any, filename: any) => `${baseUrl}/dlc/${assetId}/${filename}`,
  requestCodeAccess: `${baseUrl}/items/access/codes`,
  releaseAccessCode: (code: string | number) => `${baseUrl}/items/access/codes/${code}`,
});
