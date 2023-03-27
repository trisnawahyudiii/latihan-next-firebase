import { useState } from "react";
import Image from "next/image";

import { auth } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

import styles from "@/styles/Home.module.css";
import Login from "@/components/Form/Login";

type User = {
  displayName: string;
  email: string;
  photoURL: string;
};

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const googleAuth = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
    signInWithPopup(auth, googleAuth)
      .then((response) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(response);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = response.user;

        if (user) {
          const { displayName, email, photoURL } = user.providerData[0];
          if (displayName && email && photoURL) {
            setUser({ displayName, email, photoURL });
          }
        }

        if (token) {
          localStorage.setItem("accessToken", token);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };

  const logout = async () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser(null);
        localStorage.removeItem("accessToken");
      })
      .catch((err) => {
        // An error happened.
        console.log(err);
        setError(err.message);
      });
  };

  return (
    <>
      <div className={styles.main}>
        <div>
          {!error ? (
            <div>
              {user ? (
                <div className={styles["user-container"]}>
                  <Image
                    src={user.photoURL}
                    width={200}
                    height={200}
                    objectFit="cover"
                    alt="user profile image"
                    unoptimized
                    className={styles["user-image"]}
                  />
                  <h3 className={styles.username}>
                    Wellcome, {user.displayName}!
                  </h3>
                  <button className={styles.btn} onClick={() => logout()}>
                    Logout
                  </button>
                </div>
              ) : (
                <div>
                  <h1>Wellcome To My App!</h1>
                  <Login loginWithGoogle={loginWithGoogle} />
                </div>
              )}
            </div>
          ) : (
            <div>
              <div>
                <h2>Oops!</h2>
                <p>{error}</p>
              </div>
              <button className={styles.btn} onClick={() => setError(null)}>
                Go back
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
