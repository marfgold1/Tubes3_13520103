import ISearchRes from "../../interface/ISearchRes";
import styles from "./SearchRes.module.css";
import { Row, Col, Container } from "react-bootstrap";
import { useMediaQuery } from "usehooks-ts";

const SearchRes = ({
  data,
  className,
}: {
  data: ISearchRes;
  className?: string | undefined;
}) => {
  const bigScreen = useMediaQuery("(min-width: 768px)");

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

  return (
    <Container className={"text-center " + className}>
      {bigScreen ? (
        <Row className={styles.rowWrapper + " justify-content-center"}>
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
            {data.Match.toFixed(2) + "%"}
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
      ) : (
        <>
          <Row className="mb-2">
            <Col
              className={
                styles.itemContainer + " " + (data.Result ? "" : styles.false)
              }
            >
              {formatDate(data.CreatedAt)}
            </Col>
            <Col
              className={
                styles.itemContainer + " " + (data.Result ? "" : styles.false)
              }
            >
              {data.Pengguna}
            </Col>{" "}
          </Row>
          <Row className="mt-2">
            <Col
              className={
                styles.itemContainer + " " + (data.Result ? "" : styles.false)
              }
            >
              {data.Penyakit}{" "}
            </Col>
            <Col
              className={
                styles.itemContainer + " " + (data.Result ? "" : styles.false)
              }
            >
              {data.Match.toFixed(2) + "%"}
            </Col>
            <Col
              className={
                styles.itemContainer + " " + (data.Result ? "" : styles.false)
              }
            >
              {data.Result ? "True" : "False"}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default SearchRes;
