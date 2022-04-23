import React, { useState, useRef } from "react";
import styles from "./AddPenyakit.module.css";
import { ApiSrv } from "../../services";

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
    <form
      className={
        styles.formContainer +
        " d-flex flex-column justify-content-between align-items-center"
      }
    >
      <div className={styles.topForm}>
        <p className="text-center">Tambahkan Penyakit</p>
      </div>
      <div className={styles.centerForm + " d-flex justify-content-between"}>
        <div className={styles.namaPenyakitInputContainer}>
          <label>Nama Penyakit</label>
          <div>
            <input
              type="text"
              className={styles.namaPenyakitInput}
              value={penyakit}
              onChange={(e) => setPenyakit(e.target.value)}
              placeholder="penyakit..."
            />
          </div>
        </div>
        <div className={styles.sequenceDNAInputContainer}>
          <label>Sequence DNA</label>
          <div className={styles.uploadFileContainer}>
            <input
              type="file"
              className={styles.sequenceDNAInput}
              onChange={uploadFile}
              ref={inputFile}
            />
          </div>
        </div>
      </div>
      <div className={styles.bottomForm}>
        <button
          type="submit"
          className={styles.submitButton}
          onClick={(e) => onSubmit(e)}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddPenyakit;
