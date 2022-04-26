import { SearchRes } from "..";
import ISearchRes from "../../interface/ISearchRes";
import styles from "./SearchResWithIndex.module.css";
import { Row, Col, Container } from "react-bootstrap";

const SearchResWithIndex = ({
  idx,
  data,
}: {
  idx: number;
  data: ISearchRes;
}) => {
  console.log("IDX: " + idx);
  console.log("SEARCH RES", data);

  return (
    <div className="d-flex justify-content-center my-2 w-100">
      <div className={styles.itemContainer + " me-2 " + (data.Result ? "" : styles.false)}>{idx + 1 + "."}</div>
      <SearchRes data={data} className={styles.grow2} />
    </div>
  );
};

export default SearchResWithIndex;
