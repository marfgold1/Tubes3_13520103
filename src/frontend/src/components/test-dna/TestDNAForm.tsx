import { useState, useRef } from "react";

import { ApiSrv } from "../../services";
import styles from "./TestDNAForm.module.css";

const TestDNAForm = () => {
  const [name, setName] = useState<string>("");
  const [sequenceDNA, setSequenceDNA] = useState<File | undefined>();
  const [prediction, setPrediction] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const inputFile = useRef<HTMLInputElement>(null);

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSequenceDNA(e.target.files[0]);
    }
  };

  const submit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    console.log("pengguna", name);
    console.log("dna", sequenceDNA);
    console.log("penyakit", prediction);

    if (name && prediction && sequenceDNA) {
      const formData = new FormData();
      formData.append("pengguna", name);
      formData.append("dna", sequenceDNA);
      formData.append("penyakit", prediction);

      const res: any = await new ApiSrv("check/").post(formData);
      console.log("res", res);
      setResult(
        `${res.data.CreatedAt} - ${res.data.Pengguna} - ${res.data.Penyakit} - ${res.data.Match} - ${res.data.Result}`
      );
    }

    setName("");
    setSequenceDNA(undefined);
    setPrediction("");

    if (inputFile.current) {
      inputFile.current.files = null;
      inputFile.current.value = "";
    }

    // setResult(
    //   "<Tanggal> - <Pengguna> - <Penyakit> - <similarity> - <True/False>"
    // );
  };

  return (
    <div className={styles.container}>
      <form className={styles.formContainer}>
        <div className={styles.topForm}>
          <h1 className="text-center">Test DNA</h1>
        </div>
        <div
          className={styles.inputContainer + " d-flex justify-content-between"}
        >
          <div className={styles.nameInput}>
            <label>Nama Pengguna</label>
            <div className={styles.inputStringContainer}>
              <input
                type="text"
                className={styles.inputString}
                placeholder="<Pengguna>"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.dnaInput}>
            <label>Sequence DNA</label>
            <div className={styles.inputFileContainer}>
              <input type="file" ref={inputFile} onChange={uploadFile} />
            </div>
          </div>
          <div className={styles.predictionInput}>
            <label>Prediksi Penyakit</label>
            <div className={styles.inputStringContainer}>
              <input
                type="text"
                className={styles.inputString}
                placeholder="<Penyakit>"
                value={prediction}
                onChange={(e) => setPrediction(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div
          className={styles.submitContainer + " d-flex justify-content-center"}
        >
          <button className={styles.submitButton} onClick={(e) => submit(e)}>
            Submit
          </button>
        </div>
      </form>
      <div className={styles.divider + " text-center"}>
        -------------------------------------
      </div>
      <div className={styles.resultContainer}>
        <p className={styles.resultTitle + " text-center"}>Hasil Tes</p>
        <p className={styles.result + " text-center"}>{result}</p>
      </div>
    </div>
  );
};

export default TestDNAForm;
