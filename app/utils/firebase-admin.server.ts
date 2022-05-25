import type { App, AppOptions } from "firebase-admin/app";
import { applicationDefault, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirebaseConfig } from "~/firebase.config";

const getAppOptions = (isDevelopment: boolean): AppOptions =>
  isDevelopment
    ? { projectId: getFirebaseConfig(process.env.USE_FIREBASE_EMULATOR === "true").projectId }
    : { credential: applicationDefault() };

export const app: App =
  getApps().length === 0 ? initializeApp(getAppOptions(process.env.NODE_ENV === "development")) : getApp();

export const auth = getAuth();
