import React from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useRouter } from "next/router";
import { Navbar as NavBS, Nav } from "react-bootstrap";

const Navbar = () => {
  const router = useRouter();
  console.log("router", router);

  const routes = [
    {
      label: "Add Penyakit",
      href: "/",
    },
    {
      label: "Test DNA",
      href: "/test-dna",
    },
    {
      label: "Search",
      href: "/search",
    },
  ];

  return (
    <NavBS bg="primary" variant="dark" className="mb-3 justify-content-center">
      <Nav className="mx-2">
        {routes.map((route, idx) => {
          return (
            <Link href={route.href} key={idx}>
              <a
                className={
                  "nav-item nav-link mx-2 " +
                  (route.href === router.pathname ? "active" : "")
                }
              >
                {route.label}
              </a>
            </Link>
          );
        })}
      </Nav>
    </NavBS>
  );
};

export default Navbar;
