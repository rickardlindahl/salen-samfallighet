import { credential, firestore } from "firebase-admin";
import type { App, AppOptions } from "firebase-admin/app";
import { getApp, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirebaseConfig } from "~/firebase.config";
import { postConverter } from "./converters";

const firebaseClientEmail = process.env.FIREBASE_CLIENT_EMAIL;
if (!firebaseClientEmail) {
  throw new Error("FIREBASE_CLIENT_EMAIL must be set");
}

const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY;
if (!firebasePrivateKey) {
  throw new Error("FIREBASE_PRIVATE_KEY must be set");
}

const { projectId } = getFirebaseConfig(process.env.USE_FIREBASE_EMULATOR === "true");

const getAppOptions = (isDevelopment: boolean): AppOptions =>
  isDevelopment
    ? { projectId }
    : {
        credential: credential.cert({
          clientEmail: firebaseClientEmail,
          privateKey: firebasePrivateKey,
          projectId,
        }),
      };
export const app: App =
  getApps().length === 0 ? initializeApp(getAppOptions(process.env.NODE_ENV === "development")) : getApp();

export const auth = getAuth();

const firestoreDB = firestore();

export const db = {
  posts: firestoreDB.collection("posts").withConverter(postConverter),
};
