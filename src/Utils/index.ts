export const buildURLwithQueryParams = (urlString: string, params: string[]) => {
  const {
    url,
    url: { searchParams },
  } = { url: new URL(urlString) };

  Object.keys(params).forEach((key: string) => {
    searchParams.set(key, params[key]);
  });

  return url.href;
};
