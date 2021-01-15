export const buildURLwithQueryParams = (urlString: string, params: Record<string, string>) => {
  const {
    url,
    url: { searchParams },
  } = { url: new URL(urlString) };

  Object.keys(params).forEach((key: string) => {
    searchParams.set(key, params[key]);
  });

  return url.href;
};

export const isPromise = (object: any) => {
  if (Promise && Promise.resolve) {
    return Promise.resolve(object) === object;
  } else {
    throw 'Promise not supported in your environment';
  }
};

export const createCredentials = (tokenObject: string) => {
  if (!tokenObject) {
    return new Credentials();
  }

  return new Credentials(JSON.parse(tokenObject));
};

export const createTimestamp = () => Math.floor(Date.now() / 1000);
