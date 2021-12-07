export const API = {
  // Account
  signUp: '/accounts',
  signUpV2: 'v2/accounts',
  signIn: '/accounts/authenticate',
  signInV2: '/v2/accounts/authenticate',
  signOut: '/accounts/logout',
  changePassword: '/accounts/change-password',
  requestNewPassword: '/accounts/forgot-password',
  setNewPassword: (token: string): string => `/accounts/forgot-password/${token}`,
  getAccountInfo: '/accounts',
  updateAccount: '/accounts',
  exportData: '/accounts/export',
  deleteAccount: '/accounts/erase',
  getSocialLoginUrls: (state: string): string => `/accounts/social?state=${state}`,
  getRegisterFields: (merchantUuid: string): string =>
    `/accounts/register-fields/${merchantUuid}`,
  reportSSOtoken: (ssoDomain: string): string => `${ssoDomain}/sso/cookie`,
  sendPinCode: '/v2/accounts/pin-codes/send',
  validatePinCode: '/v2/accounts/pin-codes/validate',
  requestDataCaptureNoAuthAccess: '/v2/accounts/customers/data-capture',
  externalAccount: (integration: string): string => `/v2/accounts/external/${integration}`,
  // restrictions
  merchantRestrictionSettings: (merchantUuid: string): string =>
    `/restrictions/settings/${merchantUuid}`,

  // Items
  getAsset: (id: number, merchantUuid: string): string =>
    `/items/${merchantUuid}/${id}`,
  getExternalAsset: (
    assetType: string,
    externalId: string,
    merchantUuid?: string,
  ): string => {
    let url = `/items/assets/external/${assetType}/${externalId}`;
    if (merchantUuid) {
      url += `?merchant_uuid=${merchantUuid}`;
    }
    return url;
  },
  checkAccessForAsset: (id: number): string => `/items/${id}/access`,
  checkFreeTrial: (id: number): string => `/items/used-trial-period/${id}`,
  getPackage: (id: number): string => `/items/packages/${id}`,
  getAssetAccessFees: (id: number): string => `v2/items/${id}/access-fees`,
  getCloudfrontURL: (id: number, videoUrl: string): string =>
    `/items/${id}/access/cloudfront?url=${videoUrl}`,
  getPurchaseHistory: (status: string, page: number, size: number): string =>
    `/items/access/customers?status=${status}&page=${page}&size=${size}`,
  // code only
  requestCodeAccess: '/items/access/codes/entry',
  requestAccessCodeSessions: (codeId: number): string => `items/access/codes/${codeId}/sessions`,
  terminateSession: (codeId: number, fingerprint: string): string => `items/access/codes/${codeId}/${fingerprint}`,
  // donation
  getDonations: (id: number): string => `v2/items/${id}/donations`,

  // Payments
  getPaymentMethods: '/payments/methods',
  payForAsset: '/payments',
  payForAssetV2: '/v2/payments',
  getDefaultCreditCard: '/v2/payments/cards/default',
  setDefaultCreditCard: '/v2/payments/cards/default',
  getPayPalParams: '/external-payments',
  getDirectDebitMandate: '/v2/payments/direct-debit/mandate',
  createDirectDebitMandate: '/v2/payments/direct-debit/mandate',
  payForAssetDonation: '/v2/payments/donation',
  confirmForAssetDonation: '/v2/payments/donation:confirm',
  validateReceipt: (platform: string): string => `v2/external-payments/${platform}/validate`,
  getAssetsHistory: (
    size: number,
    page: number,
    startDate?: string,
    endDate?: string,
    type?: string,
  ): string => {
    let url = `/payments/transactions?exclude=store-payment&size=${size}&page=${page}`;

    if (startDate) {
      url += `&startDate=${startDate}`;
    }
    if (endDate) {
      url += `&endDate=${endDate}`;
    }
    if (type) {
      url += `&type=${type}`;
    }

    return url;
  },

  // Subscriptions
  getSubscriptions: (limit: number, page: number, status?: string): string => {
    let url = `/subscriptions?limit=${limit}&page=${page}`;
    if (status) {
      url += `&status=${status}`;
    }
    return url;
  },
  getSubscription: (id: string): string => `/subscriptions/${id}`,
  cancelSubscription: (url: string): string => `${url}`,
  subscribe: '/subscriptions',
  subscribeV2: '/v2/subscriptions',

  // Vouchers
  getDiscount: '/vouchers/discount',

  // Branding
  getBranding: (clientId: string, brandingId: string | number): string =>
    `/branding/paywall/${clientId}/${brandingId}`,
};
