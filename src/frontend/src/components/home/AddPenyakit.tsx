import React, { useState, useRef } from "react";
import styles from "./AddPenyakit.module.css";
import { ApiSrv } from "../../services";
import { Form, Button } from "react-bootstrap";

const AddPenyakit = () => {
  const [penyakit, setPenyakit] = useState<string>("");
  const [fileDNA, setFileDNA] = useState<File | undefined>(undefined);
  const inputFile = useRef<HTMLInputElement>(null);

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileDNA(e.target.files[0]);
    }
  };

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log("penyakit", penyakit);
    console.log("fileDNA", fileDNA);

    if (penyakit && fileDNA) {
      const formData = new FormData();
      formData.append("penyakit", penyakit);
      formData.append("dna", fileDNA);

      const res = await new ApiSrv("penyakit/").post(formData);
      if (res) {
        console.log("res", res);
        alert("successfully add new penyakit");
      }
    }

    setPenyakit("");
    setFileDNA(undefined);
    if (inputFile.current) {
      inputFile.current.files = null;
      inputFile.current.value = "";
    }
  };

  return (
    <div className={styles.container}>
      <Form>
        <div className={styles.topForm}>
          <h2 className="text-center">Tambahkan Penyakit</h2>
        </div>
        <Form.Group className="mb-3" controlId="formNamaPenyakit">
          <Form.Label>Nama Penyakit</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan penyakit"
            value={penyakit}
            onChange={(e) => setPenyakit(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Upload Sequence DNA</Form.Label>
          <Form.Control type="file" onChange={uploadFile} ref={inputFile} />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => onSubmit(e)}
          disabled={!fileDNA || !penyakit}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddPenyakit;
