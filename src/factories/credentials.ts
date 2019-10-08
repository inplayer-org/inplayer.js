import { createTimestamp } from '../utils';

class Credentials {
  token: string;
  refreshToken: string;
  expires: number;
  constructor({ token = '', refreshToken = '', expires = 0 } = {}) {
    this.token = token;
    this.refreshToken = refreshToken;
    this.expires = expires;
  }

  isExpired() {
    return createTimestamp() > this.expires;
  }

  toObject() {
    return {
      token: this.token,
      refreshToken: this.refreshToken,
      expires: this.expires,
    };
  }
}

export default Credentials;
