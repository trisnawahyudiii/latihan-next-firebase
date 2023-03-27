import styles from "./MainFooter.module.css";
import { useRouter } from "next/router";

const Footer = () => {
  const navigations = [
    {
      id: 1,
      name: "Dashboard",
      href: "/",
    },
    {
      id: 2,
      name: "Work",
      href: "/work",
    },
    {
      id: 3,
      name: "About",
      href: "/about",
    },
    {
      id: 4,
      name: "Contact",
      href: "/contact",
    },
  ];

  const router = useRouter();

  return (
    <div className={styles.main}>
      <div className={styles.navigation}>
        {navigations.map((navigation) => {
          return (
            <button
              key={navigation.id}
              className={
                `${styles["btn"]} ` +
                (router.pathname === navigation.href ? styles["active"] : "")
              }
              onClick={() => router.push(navigation.href)}
            >
              {navigation.name}
            </button>
          );
        })}
      </div>
      <div className={styles.copyright}>
        <span>Salam resolve conflict nih bang!</span>
      </div>
    </div>
  );
};

export default Footer;
