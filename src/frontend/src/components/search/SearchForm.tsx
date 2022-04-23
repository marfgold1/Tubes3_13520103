import React, { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

import { ApiSrv } from "../../services";
import ISearchRes from "./ISearchRes";
import styles from "./SearchForm.module.css";

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<ISearchRes[]>([]);
  const [results, setResults] = useState<ISearchRes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const res = await new ApiSrv("check/").get();
    setLoading(false);

    if (res) {
      setData(res.data);
    }
  };

  const convertToString = (data: ISearchRes) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthNamesIdn = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember"
    ];

    const date = new Date(data.CreatedAt);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return `${data.Pengguna} ${data.Penyakit} ${day} ${monthNames[month]} ${monthNamesIdn[month]} ${year} ${year}-${month+1}-${day} ${day}-${month+1}-${year}`;
  };

  const formatData = (datum: ISearchRes) => {
    const monthNamesIdn = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember"
    ];

    const date = new Date(datum.CreatedAt);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return `${datum.Pengguna} ${datum.Penyakit} ${day} ${monthNamesIdn[month]} ${year} ${datum.Result} ${datum.Match}%`;
  }

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    const allRegex = newQuery.split(" ").map((query) => {
      return new RegExp(query, "i");
    });

    const filteredResults = data.filter((datum) => {
      const str = convertToString(datum);

      return allRegex.every((regex) => {
        return regex.test(str);
      });
    });
    setResults(filteredResults);
  };

  const onTypeChange = useDebouncedCallback(onQueryChange, 1000);

  return (
    <div className={styles.container + " d-flex flex-column"}>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
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
                onChange={(e) => {
                  setQuery(e.target.value);
                  onTypeChange(e);
                }}
              />
            </div>
          </div>
          <div
            className={
              styles.resContainer + " d-flex flex-column align-items-center"
            }
          >
            {results.map((result, idx) => {
              console.log("result", result);
              console.log("idx", idx);
              return (
                <div className={styles.resCard} key={idx}>
                  {idx + 1}. {formatData(result)}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchForm;
