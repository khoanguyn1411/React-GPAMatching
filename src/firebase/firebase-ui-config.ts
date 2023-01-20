import "react-firebaseui/StyledFirebaseAuth";

import firebase from "firebase/compat/app";
// Configure FirebaseUI.
export const firebaseUIConfig: firebaseui.auth.Config = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};
