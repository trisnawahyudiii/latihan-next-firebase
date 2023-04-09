import { useState } from "react";
import Image from "next/image";

import { auth } from "@/lib/firebase";
import {
  RecaptchaVerifier,
  signInWithPopup,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  signOut,
  ConfirmationResult,
} from "firebase/auth";

import styles from "@/styles/Home.module.css";
import Login from "@/components/Form/Login";

type User = {
  displayName: string | null;
  email?: string;
  photoURL?: string;
};

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    confirmationResult: ConfirmationResult; // 👈 turn off type checking
  }
}
export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("login");

  const googleAuth = new GoogleAuthProvider();
  const loginWithGoogle = async () => {
    signInWithPopup(auth, googleAuth)
      .then((response) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(response);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user_data = response.user;

        if (user_data) {
          const { displayName, email, photoURL } = user_data;

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

  /**
   * login with phone number
   */

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState<string>("");
  const [confirmResult, setConfirmResult] = useState<any>(null);

  const handleGetPhone = (data: string) => {
    setPhone(data);
  };

  const handleGetOTP = (data: string) => {
    setOtp(data);
  };

  const loginWithPhone = () => {
    setUpRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, `+${phone}`, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        console.log("confirmation Result", confirmationResult);
        window.confirmationResult = confirmationResult;
        // console.log(confirmationResult);
        console.log("OTP is sent");
      })
      .catch(function (error) {
        console.log(error);
        window.recaptchaVerifier.render().then(function (widgetId) {
          grecaptcha.reset(widgetId);
        });
      });
  };

  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: function (response: any) {
          console.log("Captcha Resolved");
          // loginWithPhone();
          setStatus("input_otp");
        },
        defaultCountry: "ID",
      },
      auth
    );
  };

  const handleSubmitOTP = () => {
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(user);
        const { phoneNumber } = user.providerData[0];
        setUser({ displayName: phoneNumber });
        setStatus("login");
        // ...
      })
      .catch((err) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log("otp error!, ", err);
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

  const loginProps = {
    user: user,
    error: error,
    setUser: setUser,
    setError: setError,
  };

  return (
    <>
      <div className={styles.main}>
        <div>
          {!error ? (
            <div>
              {user ? (
                <div className={styles["user-container"]}>
                  {user.photoURL && (
                    <Image
                      src={user.photoURL}
                      width={200}
                      height={200}
                      objectFit="cover"
                      alt="user profile image"
                      unoptimized
                      className={styles["user-image"]}
                    />
                  )}
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
                  <div id="recaptcha-container"></div>
                  <Login
                    status={status}
                    loginWithGoogle={loginWithGoogle}
                    loginWithPhone={loginWithPhone}
                    handleGetPhone={handleGetPhone}
                    handleGetOTP={handleGetOTP}
                    handleSubmitOTP={handleSubmitOTP}
                  />
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
