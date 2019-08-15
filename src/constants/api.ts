interface EnvironmentVariables {
  staging: string;
  production: string;
  sandbox: string;
}

const ENVIRONMENT_VARIABLES: EnvironmentVariables = {
  staging: 'https://staging-v2.inplayer.com/',
  production: 'https://services.inplayer.com/',
  sandbox: 'https://sandbox.inplayer.com/',
};

const { NODE_ENV } = process.env;

const environmentVariables = NODE_ENV ? ENVIRONMENT_VARIABLES[NODE_ENV] : ENVIRONMENT_VARIABLES.staging;

export { environmentVariables };
