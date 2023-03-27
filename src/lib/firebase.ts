import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2rI16wRl1N8_hXOFa1IZU_5dCxq9ROr0",
  authDomain: "latihan-nextjs-auth.firebaseapp.com",
  projectId: "latihan-nextjs-auth",
  storageBucket: "latihan-nextjs-auth.appspot.com",
  messagingSenderId: "648876437695",
  appId: "1:648876437695:web:16a3cc13d84e6c6aea960a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// const {
//   NEXT_PUBLIC_FIREBASE_API_KEY,
//   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   NEXT_PUBLIC_FIREBASE_APP_ID,
// } = process.env;

// const firebaseConfig = {
//   apiKey: NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: NEXT_PUBLIC_FIREBASE_APP_ID,
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
