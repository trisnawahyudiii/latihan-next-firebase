import styles from "./Login.module.css";

import { useState } from "react";
import { BsGoogle } from "react-icons/bs";

interface LoginProps {
  login: () => void;
}

const Login = ({ login }: LoginProps) => {
  const [phone, setPhone] = useState<string>("");

  return (
    <div className={styles.main}>
      <h2>Login</h2>
      <form className={styles["login-form"]}>
        <label className={styles["phone-input"]}>
          <small>Phone Number</small>
          <input
            type="text"
            name="phone-number"
            id="phone-number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="08******"
          />
        </label>
        <button onClick={login} className={styles["login-btn"]}>
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

      <button onClick={login} className={styles["google-btn"]}>
        <BsGoogle />
        <span>Google</span>
      </button>
    </div>
  );
};

export default Login;
