import Head from "next/head";
import { ReactNode } from "react";

import styles from "./MainLayout.module.css";

import MainNavigationbar from "@/components/Navigationbar/MainNavigationbar";
import MainFooter from "@/components/Footer/MainFooter";

interface LayoutProps {
  children: ReactNode;
}

const MainLayout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <>
      <Head>
        <title>Latihan NextJS Auth</title>
        <meta
          name="description"
          content="belajar cara emnggunakan nextjs dengan firebase auth"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <MainNavigationbar />
        {children}
      </main>
      <footer className={styles.main}>
        <MainFooter />
      </footer>
    </>
  );
};

export default MainLayout;
