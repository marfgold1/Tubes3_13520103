import React, { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Form, Spinner } from "react-bootstrap";
import { ApiSrv } from "../../services";
import ISearchRes from "../../interface/ISearchRes";
import styles from "./SearchForm.module.css";
import { SearchResWithIndex } from "..";

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
      "Desember",
    ];

    const date = new Date(data.CreatedAt);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return `${data.Pengguna} ${data.Penyakit} ${day} ${monthNames[month]} ${
      monthNamesIdn[month]
    } ${year} ${year}-${month + 1}-${day} ${day}-${month + 1}-${year}`;
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
      "Desember",
    ];

    const date = new Date(datum.CreatedAt);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return `${datum.Pengguna} ${datum.Penyakit} ${day} ${monthNamesIdn[month]} ${year} ${datum.Result} ${datum.Match}%`;
  };

  const onQueryChange = (e: React.ChangeEvent<any>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    const allRegex = newQuery.split(" ").map((query: string) => {
      return new RegExp(query, "i");
    });

    const filteredResults = data.filter((datum) => {
      const str = convertToString(datum);

      return allRegex.every((regex: RegExp) => {
        return regex.test(str);
      });
    });
    setResults(filteredResults);
  };

  const onTypeChange = useDebouncedCallback(onQueryChange, 1000);

  return (
    <div className={styles.container + " d-flex flex-column"}>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center h-100">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <h2 className="text-center">Search</h2>
          <Form>
            <Form.Group className="mb-3" controlId="formSearchQuery">
              <Form.Control
                type="text"
                placeholder="Input your search here"
                className={styles.input + " text-center my-3 mx-auto"}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  onTypeChange(e);
                }}
              />
            </Form.Group>
          </Form>
          <div
            className={
              styles.resContainer + " d-flex flex-column align-items-center"
            }
          >
            {results.map((result, idx) => {
              console.log("result", result);
              console.log("idx", idx);
              return <SearchResWithIndex data={result} key={idx} idx={idx} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchForm;
