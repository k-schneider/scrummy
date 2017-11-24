// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { FirebaseAppConfig } from 'angularfire2';

const firebaseConfig: FirebaseAppConfig = {
  apiKey: 'AIzaSyB7phq5k8wD_NmlQDZvatFT_uDJruEYBdI',
  authDomain: 'scrummy-5fc39.firebaseapp.com',
  databaseURL: 'https://scrummy-5fc39.firebaseio.com',
  projectId: 'scrummy-5fc39',
  storageBucket: 'scrummy-5fc39.appspot.com',
  messagingSenderId: '283067007749'
};

export const environment = {
  firebaseConfig,
  production: false
};
