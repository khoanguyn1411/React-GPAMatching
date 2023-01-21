import firebase from "firebase/compat/app";
// Need to import as namespace to avoid warning of firebaseui.
// Please do not remove this or pressing `ctrl + shift + O`.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as firebaseUI from "react-firebaseui/StyledFirebaseAuth";

// Configure FirebaseUI.
export const firebaseUIConfig: firebaseui.auth.Config = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // We will display Google as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};
