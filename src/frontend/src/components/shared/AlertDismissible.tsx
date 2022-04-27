import { Toast } from "react-bootstrap";
import styles from "./AlertDismissible.module.css";

const AlertDismissible = ({
  header,
  content,
  show,
  setClose,
  variant,
}: {
  header: string;
  content: string[];
  show: boolean;
    setClose: () => void;
    variant: string;
}) => {
  return (
    <Toast
      show={show}
      onClose={setClose}
      className={styles.container + " position-absolute"}
      bg={variant}
    >
      <Toast.Header>
        <strong className="me-auto">{header}</strong>
      </Toast.Header>
      <Toast.Body>
        {content.map((p, idx) => {
          return <p className="m-0" key={idx}>{p}</p>;
        })}
      </Toast.Body>
    </Toast>
  );
};

export default AlertDismissible;

// <Alert variant="danger" onClose={() => setClose()} dismissible>
//   <Alert.Heading>{header}</Alert.Heading>
//   <p>{content}</p>
// </Alert>
