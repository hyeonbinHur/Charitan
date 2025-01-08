import { useError } from "../../context/ErrorContext";
import { createPortal } from "react-dom";
import ErrorModal from "./ErrorModal";

const ErrorContainer = () => {
  const { error, setError } = useError();
  if (!error) return null;
  const modalRoot = document.getElementById("modal");
  if (!modalRoot) return null;
  return createPortal(
    <div>
      <ErrorModal err={error} setError={setError} />
    </div>,
    modalRoot
  );
};

export default ErrorContainer;
