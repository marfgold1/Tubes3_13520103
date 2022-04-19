import { Navbar, TestDNAForm } from "../components/index";

import styles from "../styles/TestDNA.module.css";

const TestDNA = () => {
  return (
    <div>
      <Navbar />
      <div
        className={
          styles.content + " d-flex justify-content-center align-items-center"
        }
      >
        <TestDNAForm />
      </div>
    </div>
  );
};

export default TestDNA;
