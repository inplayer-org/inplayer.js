const commonConfig = {
  INPLAYER_TOKEN_KEY: 'inplayer_token',
  INPLAYER_IOT_KEY: 'inplayer_iot',
  INPLAYER_ACCESS_CODE_NAME: (assetId: number) => `access_code_${assetId}`,
  IOT_NOTIF_URL: 'a3gkl64duktvc4-ats.iot.eu-west-1.amazonaws.com',
};

const devConfig = {
  ...commonConfig,
  BASE_URL: 'https://staging-v2.inplayer.com',
  AWS_IOT_URL: 'https://o3871l8vj7.execute-api.eu-west-1.amazonaws.com/staging/iot/keys',
};

const prodConfig = {
  ...commonConfig,
  BASE_URL: 'https://services.inplayer.com',
  AWS_IOT_URL: 'https://eynmuj2g26.execute-api.eu-west-1.amazonaws.com/prod/iot/keys',
};

const config = {
  development: devConfig,
  production: prodConfig,
};

export default config;
