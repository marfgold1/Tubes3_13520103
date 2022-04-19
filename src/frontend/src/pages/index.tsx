import type { NextPage } from "next";
import Head from "next/head";

import { Navbar, AddPenyakit } from "../components";

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container + " d-flex flex-column"}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <div
        className={
          styles.content + " d-flex justify-content-center align-items-center"
        }
      >
        <AddPenyakit />
      </div>
    </div>
  );
};

export default Home;
