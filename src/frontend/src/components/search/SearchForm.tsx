import React, { useState } from "react";

import { ApiSrv } from "../../services";
import styles from "./SearchForm.module.css";

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log("query", query);
    console.log("results", results);

    const res = await new ApiSrv("check/").get();
    console.log("res", res);
    setResults(res?.data);
  };

  return (
    <div className={styles.container + " d-flex flex-column"}>
      <div
        className={
          styles.topForm +
          " d-flex flex-column justify-content-center align-items-center"
        }
      >
        <div className={styles.inputContainer}>
          <input
            type="text"
            className={styles.inputString + " text-center"}
            placeholder="Input your search here"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className={styles.btnContainer}>
          <button
            className={styles.submitButton + " btn btn-primary"}
            onClick={(e) => onSubmit(e)}
          >
            Search
          </button>
        </div>
      </div>
      <div
        className={
          styles.resContainer +
          " d-flex flex-column justify-content-center align-items-center"
        }
      >
        {results.map((result, idx) => {
          console.log("result", result);
          console.log("idx", idx);
          return (
            <div className={styles.resCard + " text-center"} key={idx}>
              {idx}. {JSON.stringify(result)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchForm;
