import { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
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
      if (res) {
        console.log("res", res);
        setResult(
          `${res.data.CreatedAt} - ${res.data.Pengguna} - ${res.data.Penyakit} - ${res.data.Match} - ${res.data.Result}`
        );
      }
    }

    setName("");
    setSequenceDNA(undefined);
    setPrediction("");

    if (inputFile.current) {
      inputFile.current.files = null;
      inputFile.current.value = "";
    }
  };

  return (
    <div className={styles.testDNAContainer}>
      <div className={styles.topContainer + " mb-4"}>
        <Form>
          <div className={styles.topForm}>
            <h2 className="text-center">Test DNA</h2>
          </div>
          <Form.Group className="mb-3" controlId="formNamaPengguna">
            <Form.Label>Nama Pengguna</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan Nama Pengguna"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSequenceDNA">
            <Form.Label>Upload Sequence DNA</Form.Label>
            <Form.Control type="file" onChange={uploadFile} ref={inputFile} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPenyakit">
            <Form.Label>Prediksi Penyakit</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan Nama Penyakit"
              value={prediction}
              onChange={(e) => setPrediction(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={(e) => submit(e)}>
            Submit
          </Button>
        </Form>
      </div>
      <div className={styles.resultContainer}>
        <h5 className={styles.resultTitle + " text-center"}>Hasil Tes</h5>
        <p className={styles.result + " text-center"}>{result}</p>
      </div>
    </div>
  );
};

export default TestDNAForm;
