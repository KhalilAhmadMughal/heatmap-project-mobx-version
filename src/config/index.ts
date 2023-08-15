import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, Firestore } from "firebase/firestore";

const envirnmentalVariables = import.meta.env;

const firebaseConfig = {
  apiKey: envirnmentalVariables.VITE_API_KEY,
  authDomain: envirnmentalVariables.VITE_AUTH_DOMAIN,
  projectId: envirnmentalVariables.VITE_PROJECT_ID,
  storageBucket: envirnmentalVariables.VITE_STORAGE_BUCKET,
  messagingSenderId: envirnmentalVariables.VITE_MESSAGING_SENDER_ID,
  appId: envirnmentalVariables.VITE_APP_ID,
  measurementId: envirnmentalVariables.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const db: Firestore = getFirestore(app);
