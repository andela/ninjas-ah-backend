import 'dotenv/config';

const { APP_URL_BACKEND, APP_URL_FRONTEND } = process.env;

const frontend = {
  appUrl: APP_URL_FRONTEND,
  travis: 'https://travis-ci.com'
};

const backend = {
  appUrl: APP_URL_BACKEND,
  travis: 'https://travis-ci.com'
};

export { frontend, backend };
