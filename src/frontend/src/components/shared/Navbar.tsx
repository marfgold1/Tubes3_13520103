import React from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.container + " d-flex justify-content-between"}>
      <div className={styles.leftNavbar}>
        <Link href="/">Tubes Stima III</Link>
      </div>
      <div className={styles.rightNavbar}>
        <Link href="/">Home</Link>
        <Link href="/test-dna">Tes DNA</Link>
        <Link href="/search">Search</Link>
      </div>
    </div>
  );
};

export default Navbar;
