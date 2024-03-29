import { Navbar, SearchForm } from "../components";

import styles from "../styles/Search.module.css";

const Search = () => {
  return (
    <div>
      <Navbar />
      <div
        className={
          styles.content + " d-flex justify-content-center align-items-center mb-5"
        }
      >
        <SearchForm />
      </div>
    </div>
  );
};

export default Search;
