import React from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { Navbar as NavBS, Container, Nav } from "react-bootstrap";

const Navbar = () => {
  return (
    <NavBS bg="dark" variant="dark" className="mb-3 justify-content-center">
      <Nav className="mx-2">
        <Link href="/">
          <a className="nav-item nav-link">Home</a>
        </Link>
        <Link href="/test-dna">
          <a className="nav-item nav-link">Test DNA</a>
        </Link>
        <Link href="/search">
          <a className="nav-item nav-link">Search</a>
        </Link>

        {/* <Nav.Link href="/">Add Penyakit</Nav.Link>
        <Nav.Link href="/test-dna">Test DNA</Nav.Link>
        <Nav.Link href="/search">Search</Nav.Link> */}
      </Nav>
    </NavBS>
  );
};

export default Navbar;
