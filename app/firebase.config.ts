import type { FirebaseOptions } from "firebase/app";

const getProjectId = (projectId: string, useEmulator: boolean = false): string =>
  useEmulator ? `demo-${projectId}` : projectId;

export const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyCyRtPTOd0qF3eP0uZIyF3lKz23oMRm7m0",
  authDomain: "salen-samfallighetsforening.firebaseapp.com",
  projectId: getProjectId("salen-samfallighetsforening", process.env.USE_FIREBASE_EMULATOR === "true"),
  storageBucket: "salen-samfallighetsforening.appspot.com",
  messagingSenderId: "450572822450",
  appId: "1:450572822450:web:ed077bdcf026e78e4b26ab",
  measurementId: "G-02BBWBP5NG",
};
