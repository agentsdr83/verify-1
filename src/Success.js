import { useLocation } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import "./styles.css";

export default function Success() {
  const location = useLocation();
  const type = location.state?.type || "mobile";

  return (
    <div className="success-container">
      <div className="success-card">

        <div className="success-circle">
          <FiCheck size={36} />
        </div>

        <h2>Success!</h2>

        <p className="success-text">
          Your {type === "email" ? "email" : "mobile"} is verified.
        </p>

      </div>
    </div>
  );
}