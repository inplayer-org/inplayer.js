export const API = {
  // Account
  signUp: '/accounts',
  signUpV2: 'v2/accounts',
  signIn: '/accounts/authenticate',
  signInV2: '/v2/accounts/authenticate',
  signOut: '/accounts/logout',
  changePassword: '/accounts/change-password',
  requestNewPassword: '/accounts/forgot-password',
  setNewPassword: (token: string): string =>
    `/accounts/forgot-password/${token}`,
  getAccountInfo: '/accounts',
  updateAccount: '/accounts',
  exportData: '/accounts/export',
  deleteAccount: '/accounts/erase',
  getSocialLoginUrls: (state: string): string =>
    `/accounts/social?state=${state}`,
  getRegisterFields: (merchantUuid: string): string =>
    `/accounts/register-fields/${merchantUuid}`,
  reportSSOtoken: (ssoDomain: string): string => `${ssoDomain}/sso/cookie`,
  sendPinCode: '/v2/accounts/pin-codes/send',
  validatePinCode: '/v2/accounts/pin-codes/validate',
  requestDataCaptureNoAuthAccess: '/v2/accounts/customers/data-capture',
  externalAccount: (integration: string): string =>
    `/v2/accounts/external/${integration}`,
  getFavorites: '/v2/accounts/media/favorites',
  getFavorite: (id: string): string => `/v2/accounts/media/favorites/${id}`,
  getWatchHistory: '/v2/accounts/media/watch-history',
  getWatchHistoryForItem: (id: string): string =>
    `/v2/accounts/media/watch-history/${id}`,

  profiles: '/v2/accounts/profiles',
  getProfilesItem: (id: string): string => `/v2/accounts/profiles/${id}`,

  // restrictions
  merchantRestrictionSettings: (merchantUuid: string): string =>
    `/restrictions/settings/${merchantUuid}`,

  // Items
  getAsset: (id: number, merchantUuid?: string): string =>
    `/items/${merchantUuid ? `${merchantUuid}/` : ''}${id}`,
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
  getAssetsInPackage: (id: number): string => `items/packages/${id}/items`,
  getAssetAccessFees: (id: number): string => `v2/items/${id}/access-fees`,
  getCloudfrontURL: (id: number, videoUrl: string): string =>
    `/items/${id}/access/cloudfront?url=${videoUrl}`,
  getPurchaseHistory: (status: string, page: number, size: number): string =>
    `/items/access/customers?status=${status}&page=${page}&size=${size}`,
  getPaymentHistory: (): string => '/v2/accounting/payment-history',
  getBillingReceipt: (trxToken: string): string =>
    `/v2/accounting/transactions/${trxToken}/receipt`,
  // code only
  requestCodeAccess: '/items/access/codes/entry',
  requestAccessCodeSessions: (codeId: number): string =>
    `items/access/codes/${codeId}/sessions`,
  terminateSession: (codeId: number, fingerprint: string): string =>
    `items/access/codes/${codeId}/${fingerprint}`,
  // donation
  getDonations: (id: number): string => `v2/items/${id}/donations`,
  // media signer
  getSignedMediaToken: (appConfigId: string, mediaId: string): string =>
    `v2/items/jw-media/token?app_config_id=${appConfigId}&media_id=${mediaId}`,

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
  validateReceipt: (platform: string): string =>
    `v2/external-payments/${platform}/validate`,
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
  subscriptionPlanChange: '/v2/subscriptions/stripe:switch',

  // Vouchers
  getDiscount: '/vouchers/discount',

  // Branding
  getBranding: (clientId: string, brandingId: string | number): string =>
    `/branding/paywall/${clientId}/${brandingId}`,

  // NFTs
  getMerchantMarketplace: (merchantUuid: string): string =>
    `/v2/nfts/marketplaces/${merchantUuid}`,
  getMerchantNFTList: (
    merchantUuid: string,
    page: number,
    size: number,
    filter: string,
  ): string =>
    `/v2/nfts/${merchantUuid}?filter=${filter}&page=${page}&size=${size}`,
  getMerchantNFT: (merchantUuid: string, nftId: number): string =>
    `/v2/nfts/${merchantUuid}/${nftId}`,
  getExchangeRates: (fiat: string, invert: boolean): string =>
    `/v2/nfts/exchange-rate/${fiat}${invert ? '?invert=true' : ''}`,
  getUserBoughtNFTs: (page: number, size: number): string =>
    `/v2/nfts?page=${page}&size=${size}`,
  makeReservation: (merchantUuid: string, nftId: number): string =>
    `/v2/nfts/${merchantUuid}/${nftId}/reserve`,

  featureFlags: '/v2/features',
};
