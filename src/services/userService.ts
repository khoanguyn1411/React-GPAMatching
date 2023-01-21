import { firebaseAuth } from "@/firebase/firebase-config";

export namespace UserService {
  /** Get firebase token of user. */
  export function getFirebaseToken(): Promise<string> {
    const currentUser = firebaseAuth.currentUser;
    if (currentUser) {
      return currentUser.getIdToken();
    }
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(null);
        return;
      }, 10000);
      const unregisterAuthObserver = firebaseAuth.onAuthStateChanged(async (user) => {
        if (user == null) {
          reject(null);
          return;
        }
        const token = await user.getIdToken();
        resolve(token);
        unregisterAuthObserver();
        clearTimeout(timeoutId);
      });
    });
  }
}
