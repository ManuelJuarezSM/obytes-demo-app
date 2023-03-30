import type { ConfigContext, ExpoConfig } from '@expo/config';
const path = require('path');

const APP_ENV = process.env.RN_APP_ENV ?? 'development';
const envPath = path.resolve(__dirname, `.env.${APP_ENV}`);

require('dotenv').config({
  path: envPath,
});

const { Env, withEnvSuffix } = require('./env');

// 0. MAJOR
// 1. MINOR
// 345. BUILD_NUMBER
// ac76v3c SHORT COMMIT HASH

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.NAME,
  description: `${Env.NAME} Mobile App`,
  slug: 'obytesapp',
  version: Env.VERSION.toString(),
  orientation: 'portrait',
  icon: `${withEnvSuffix('./assets/icon')}.png`,
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#F75469',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: Env.BUNDLE_ID,
    buildNumber: Env.VERSION.toString(), // BUILD NUMBER FOR VERSIONING
  },
  android: {
    adaptiveIcon: {
      foregroundImage: `${withEnvSuffix('./assets/icon')}.png`,
      backgroundColor: '#FFFFFF',
    },
    package: Env.PACKAGE,
    versionCode: Env.VERSION_CODE, // BUILD NUMBER FOR VERSIONING
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: [
    ['@bacons/link-assets', ['./assets/fonts/Inter.ttf']],
    'expo-localization',
  ],
  extra: {
    APP_ENV: Env.APP_ENV,
    eas: {
      projectId: Env.EAS_PROJECT_ID,
    },
  },
});
