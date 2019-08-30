export default class Credentials {
  token: string;
  refreshToken: string;
  expires: number;
  constructor({ token = '', refreshToken = '', expires = 0 } = {}) {
    this.token = token;
    this.refreshToken = refreshToken;
    this.expires = expires;
  }

  isExpired() {
    const dateTime = Date.now();
    const timestamp = Math.floor(dateTime / 1000);

    return timestamp > this.expires;
  }

  toObject() {
    return {
      token: this.token,
      refreshToken: this.refreshToken,
      expires: this.expires,
    };
  }
}
