import { SearchRes } from "..";
import ISearchRes from "../../interface/ISearchRes";
import styles from "./SearchResWithIndex.module.css";
import { ApiSrv } from "../../services";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";

const SearchResWithIndex = ({
  idx,
  data,
  onDelete,
}: {
  idx: number;
  data: ISearchRes;
  onDelete: Function;
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="d-flex justify-content-center my-2 w-100">
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Title className="p-3 text-center">Are you sure?</Modal.Title>
        <Modal.Footer className="justify-content-between">
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              onDelete(data.ID);
              setShowModal(false);
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <div
        className={
          styles.itemContainer + " me-2 " + (data.Result ? "" : styles.false)
        }
      >
        {idx + 1 + "."}
      </div>
      <SearchRes data={data} className={styles.grow2} />
      <Button
        variant="danger"
        className="ms-2"
        onClick={() => setShowModal(true)}
      >
        Delete
      </Button>
    </div>
  );
};

export default SearchResWithIndex;
