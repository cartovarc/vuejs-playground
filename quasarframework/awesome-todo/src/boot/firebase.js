import { firebaseConfig } from '../../credentials/firebase-config.js'

var firebase = require("firebase/app");

require("firebase/auth");

let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();

export { firebaseAuth }
