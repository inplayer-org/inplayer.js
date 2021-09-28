import Credentials from '../factories/credentials';
import { CredentialsConfig } from '../models/CommonInterfaces';

export const buildURLwithQueryParams = (urlString: string, params: Record<string, string>): string => {
  const {
    url,
    url: { searchParams },
  } = { url: new URL(urlString) };

  Object.keys(params).forEach((key: string) => {
    searchParams.set(key, params[key]);
  });

  return url.href;
};

export const isPromise = (
  object: void | string | CredentialsConfig | null | Promise<void | string | CredentialsConfig | null>,
): boolean => {
  if (Promise && Promise.resolve) {
    return Promise.resolve(object) === object;
  }

  throw 'Promise not supported in your environment';
};

export const createCredentials = (tokenObject: string): Credentials => {
  if (!tokenObject) {
    return new Credentials();
  }

  return new Credentials(JSON.parse(tokenObject));
};

export const createTimestamp = (): number => Math.floor(Date.now() / 1000);
