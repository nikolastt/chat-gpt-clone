import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqBD10RgDbXd80vhlktNFPr9iNg97omNU",
  authDomain: "chat-gpt-clone-1a333.firebaseapp.com",
  projectId: "chat-gpt-clone-1a333",
  storageBucket: "chat-gpt-clone-1a333.appspot.com",
  messagingSenderId: "178219276290",
  appId: "1:178219276290:web:9d1fa1fc487346c213ef1b",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
