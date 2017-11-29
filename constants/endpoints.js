import { config } from '../config.js';

export const API = {
  signIn: `${config.BASE_URL}/accounts/login`,
  signOut: `${config.BASE_URL}/accounts/logout`,
  signUp: `${config.BASE_URL}/accounts`,
  requestNewPassword: `${config.BASE_URL}/accounts/forgot-password`,
  setNewPassword: (token) => `${config.BASE_URL}/accounts/forgot-password/${token}`,
  getAccountInfo: `${config.BASE_URL}/accounts`,
  social: (state) => `${config.BASE_URL}/accounts/social?state=${state}`,
}
