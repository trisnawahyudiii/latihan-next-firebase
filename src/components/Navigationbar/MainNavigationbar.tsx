import styles from "./Main.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

const Navigationbar = () => {
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.main}>
      <h1>MyApp</h1>

      <div className={`${styles["navlinks"]} ` + (isOpen ? styles.open : "")}>
        {navigations.map((navigation) => {
          return (
            <button
              key={navigation.id}
              className={
                `${styles["navlink"]} ` +
                (router.pathname === navigation.href ? styles["active"] : "")
              }
              onClick={() => {
                setIsOpen(false);
                router.push(navigation.href);
              }}
            >
              {navigation.name}
            </button>
          );
        })}
      </div>

      <button
        className={styles["contact-btn"]}
        onClick={() => {
          setIsOpen(false);
          router.push("/contact");
        }}
      >
        Contact Us
      </button>
      <button
        className={`${styles["navbar-toogle"]} ` + (isOpen ? styles.open : "")}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.bar}></div>
      </button>
    </nav>
  );
};

export default Navigationbar;
