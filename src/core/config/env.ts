// Environment-specific configuration
const ENV = {
  development: {
    apiBaseUrl: 'http://localhost:3000/api',
  },
  production: {
    apiBaseUrl: 'https://api.refillvendor.com/api',
  },
};

const getEnvConfig = () => {
  return ENV.development;
};

export default getEnvConfig();
