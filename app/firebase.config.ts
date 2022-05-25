import type { FirebaseOptions } from "firebase/app";

export const getFirebaseConfig = (useEmulator: boolean): FirebaseOptions => {
  const projectId = "salen-samfallighetsforening";

  return {
    apiKey: "AIzaSyCyRtPTOd0qF3eP0uZIyF3lKz23oMRm7m0",
    authDomain: "salen-samfallighetsforening.firebaseapp.com",
    projectId: `${useEmulator ? "demo-" : ""}${projectId}`,
    storageBucket: "salen-samfallighetsforening.appspot.com",
    messagingSenderId: "450572822450",
    appId: "1:450572822450:web:ed077bdcf026e78e4b26ab",
    measurementId: "G-02BBWBP5NG",
  };
};
