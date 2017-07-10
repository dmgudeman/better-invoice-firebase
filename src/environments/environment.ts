// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAfldBZz7sGRngB3p1GKgRTHxsEzT5rHGo",
    authDomain: "better-invoice-firebase.firebaseapp.com",
    databaseURL: "https://better-invoice-firebase.firebaseio.com",
    projectId: "better-invoice-firebase",
    storageBucket: "better-invoice-firebase.appspot.com",
    messagingSenderId: "1016088883434"
  }
};
