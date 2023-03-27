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
