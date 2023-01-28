import { GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";

import { firebaseAuth } from "@/firebase/firebase-config";

export namespace UserService {
  export function signInWithGoogle(
    onSuccess?: (result: UserCredential) => void,
    onError?: (error: unknown) => void,
  ): void {
    const provider = new GoogleAuthProvider();
    signInWithPopup(firebaseAuth, provider)
      .then((result) => onSuccess?.(result))
      .catch((error) => onError?.(error));
  }
}
