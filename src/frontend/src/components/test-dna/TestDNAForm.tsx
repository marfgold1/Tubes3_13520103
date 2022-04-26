import { useState, useRef, useEffect } from "react";
import {
  Form,
  Button,
  Spinner,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { ApiSrv } from "../../services";
import ITestDNARes from "../../interface/ITestDNARes";
import ISearchRes from "../../interface/ISearchRes";
import styles from "./TestDNAForm.module.css";
import { SearchRes } from "..";

const TestDNAForm = () => {
  const [name, setName] = useState<string>("");
  const [sequenceDNA, setSequenceDNA] = useState<File | undefined>();
  const [prediction, setPrediction] = useState<string>("");
  const [result, setResult] = useState<ISearchRes>();
  const [loading, setLoading] = useState<boolean>(true);
  const [listPenyakit, setListPenyakit] = useState<string[]>([]);
  const [method, setMethod] = useState<string>("");

  const inputFile = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getListPenyakit();
  }, []);

  const getListPenyakit = async () => {
    setLoading(true);
    const res = await new ApiSrv("penyakit/").get();
    setLoading(false);

    if (res) {
      const lst = res.data.map((datum: ITestDNARes) => datum.Penyakit);
      console.log(lst);
      setListPenyakit(lst);
    }
  };

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

    if (name && prediction && sequenceDNA && method) {
      const formData = new FormData();
      formData.append("pengguna", name);
      formData.append("dna", sequenceDNA);
      formData.append("penyakit", prediction);
      formData.append("method", method);

      const res = await new ApiSrv("check/").post(formData);
      if (res) {
        const data: ISearchRes = res.data;
        console.log("res", res);
        setResult(data);
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
      {loading ? (
        <div className="d-flex justify-content-center align-items-center h-100">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <div className={styles.topContainer + " mb-4 mx-auto"}>
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
                <Form.Control
                  type="file"
                  onChange={uploadFile}
                  ref={inputFile}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPenyakit">
                <Form.Label>Prediksi Penyakit</Form.Label>
                <DropdownButton
                  id="dropdown-basic-button"
                  title={prediction ? prediction : "Pilih Nama Penyakit"}
                >
                  {listPenyakit.map((penyakit: string, index: number) => {
                    return (
                      <Dropdown.Item
                        key={index}
                        onClick={() => setPrediction(penyakit)}
                      >
                        {penyakit}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPenyakit">
                <Form.Label>Metode</Form.Label>
                <DropdownButton
                  id="dropdown-basic-button"
                  title={method ? method : "Pilih Metode Test"}
                >
                  {["kmp", "bm"].map((method: string, index: number) => {
                    return (
                      <Dropdown.Item
                        key={index}
                        onClick={() => setMethod(method)}
                      >
                        {method}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  type="submit"
                  onClick={(e) => submit(e)}
                  disabled={!name || !prediction || !sequenceDNA || !method}
                  className="px-4"
                >
                  Submit
                </Button>
              </div>
            </Form>
          </div>
          <div className={styles.resultContainer}>
            <h5 className={styles.resultTitle + " text-center"}>Hasil Tes</h5>
            {result && <SearchRes data={result} />}
          </div>
        </>
      )}
    </div>
  );
};

export default TestDNAForm;
