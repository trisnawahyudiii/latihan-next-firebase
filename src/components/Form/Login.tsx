import { FormEventHandler } from "react";
import PhoneInput from "react-phone-input-2";
import OtpInput from "otp-input-react-18";

import styles from "./Login.module.css";
import "react-phone-input-2/lib/style.css";

import { useState, useEffect } from "react";
import { BsGoogle } from "react-icons/bs";

interface LoginProps {
  loginWithGoogle: () => void;
}

const Login = ({ loginWithGoogle }: LoginProps) => {
  const [phone, setPhone] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [status, setStatus] = useState<string>("login");

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    console.log({ phone });
    setStatus("input_otp");
  };

  useEffect(() => {
    console.log({ otp });
  }, [otp]);

  return (
    <div className={styles.main}>
      {/* state login */}
      {status === "login" && (
        <div className={styles["full-container"]}>
          <h2>Login</h2>
          <form onSubmit={handleSubmit} className={styles["login-form"]}>
            <label className={styles["phone-input"]}>
              <small>Phone Number</small>
              <PhoneInput country={"id"} value={phone} onChange={setPhone} />
            </label>
            <button className={styles["login-btn"]}>
              <span>Login</span>
            </button>
          </form>

          <div className={styles.divider}>
            <div className={styles["divider-left"]}>
              <hr />
            </div>
            <span>Or sign in with</span>
            <div className={styles["divider-right"]}>
              <hr />
            </div>
          </div>

          <button onClick={loginWithGoogle} className={styles["google-btn"]}>
            <BsGoogle />
            <span>Google</span>
          </button>
        </div>
      )}

      {/* state input OTP */}
      {status === "input_otp" && (
        <div className={styles["full-container"]}>
          <div className={styles["otp-header"]}>
            <h2>OTP</h2>
            <p>Please enter the OTP sent to your mobile number</p>
          </div>

          <div className={styles["otp-body"]}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              containerStyle={{
                widh: "100%",
                justifyContent: "space-between",
              }}
              inputStyle={{
                height: "36px",
                width: "32px",
              }}
            />
            <button className={styles["login-btn"]}>
              <span>Validate</span>
            </button>
          </div>
        </div>
      )}

      {/* state input loading */}
      {status === "loading" && (
        <div className={styles["full-container"]}>
          <span>Input loading</span>
        </div>
      )}
    </div>
  );
};

export default Login;
