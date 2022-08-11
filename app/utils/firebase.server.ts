import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirebaseConfig } from "~/firebase.config";

const firebaseConfig = getFirebaseConfig(process.env.USE_FIREBASE_EMULATOR === "true");

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

const auth = getAuth(getApp());

export { auth };
