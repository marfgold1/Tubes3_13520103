import ISearchRes from "../../interface/ISearchRes";
import styles from "./SearchRes.module.css";
import { Row, Col, Container } from "react-bootstrap";

const SearchRes = ({
  data,
  className,
}: {
  data: ISearchRes;
  className?: string | undefined;
}) => {
  const formatDate = (data: string) => {
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

    const date = new Date(data);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return `${day} ${monthNamesIdn[month]} ${year}`;
  };

  console.log("SEARCH RES", data);

  return (
    <Container className="text-center">
      <Row>
        <Col
          className={
            styles.itemContainer +
            " " +
            styles.grow1 +
            " " +
            (data.Result ? "" : styles.false)
          }
        >
          {formatDate(data.CreatedAt)}
        </Col>
        <Col
          className={
            styles.itemContainer +
            " " +
            styles.grow2 +
            " " +
            (data.Result ? "" : styles.false)
          }
        >
          {data.Pengguna}
        </Col>
        <Col
          className={
            styles.itemContainer +
            " " +
            styles.grow1 +
            " " +
            (data.Result ? "" : styles.false)
          }
        >
          {data.Penyakit}{" "}
        </Col>
        <Col
          className={
            styles.itemContainer +
            " " +
            styles.grow0 +
            " " +
            (data.Result ? "" : styles.false)
          }
        >
          {data.Match}
        </Col>
        <Col
          className={
            styles.itemContainer +
            " " +
            styles.grow0 +
            " " +
            (data.Result ? "" : styles.false)
          }
        >
          {data.Result ? "True" : "False"}
        </Col>
      </Row>
    </Container>
  );
};

export default SearchRes;

{
  /* <div
className={
  styles.container + " d-flex" + " justify-content-between " + className
}
>
<div
  className={
    styles.itemContainer + " " + (data.Result ? "" : styles.false)
  }
>
  {formatDate(data.CreatedAt)}
</div>
<div
  className={
    styles.itemContainer +
    " " +
    styles.width2 +
    " " +
    (data.Result ? "" : styles.false)
  }
>
  {data.Pengguna}
</div>
<div
  className={
    styles.itemContainer +
    " " +
    styles.width3 +
    " " +
    (data.Result ? "" : styles.false)
  }
>
  {data.Penyakit}
</div>
<div
  className={
    styles.itemContainer + " " + (data.Result ? "" : styles.false)
  }
>
  {data.Match + "%"}
</div>
<div
  className={
    styles.itemContainer + " " + (data.Result ? "" : styles.false)
  }
>
  {data.Result ? "True" : "False"}
</div>
</div> */
}
