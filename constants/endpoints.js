import { config } from '../config.js';

export const API = {
  // User
  signIn: `${config.BASE_URL}/accounts/login`,
  signOut: `${config.BASE_URL}/accounts/logout`,
  signUp: `${config.BASE_URL}/accounts`,
  requestNewPassword: `${config.BASE_URL}/accounts/forgot-password`,
  setNewPassword: (token) => `${config.BASE_URL}/accounts/forgot-password/${token}`,
  getAccountInfo: `${config.BASE_URL}/accounts`,
  social: (state) => `${config.BASE_URL}/accounts/social?state=${state}`,
  //Asset
  checkAccess: (id, multiple = false) => {
    return multiple ? `${config.BASE_URL}/item/access?${id}`
    : `${config.BASE_URL}/items/${id}/access`;

  },
  getDlcLinks: (id) => `${config.BASE_URL}/dlc/${id}/links`,
  findAsset: (assetId, merchant_uuid) => `${config.BASE_URL}/items/${merchant_uuid}/${assetId}`,
  findExternalAsset: (assetType, externalId) => `${config.BASE_URL}/items/assets/external/${assetType}/${externalId}`,
  findPackage: (id) => `${config.BASE_URL}/items/packages/${id}`,
  findAccessFees: (id) => `${config.BASE_URL}/items/${id}/access-fees`,
  freemium: `${config.BASE_URL}/items/access/unlimited`,
}
