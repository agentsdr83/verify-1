import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiSmartphone } from "react-icons/fi";
import "./styles.css";

export default function MobileVerify() {
  const navigate = useNavigate();
  const { phone } = useParams();

  const API_URL = process.env.REACT_APP_API_URL;
  console.log("API_URL", API_URL);

  const inputs = useRef([]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [time, setTime] = useState(45);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (time === 0) return;
    const timer = setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [time]);

  const handleChange = (val, i) => {
    if (!/^\d*$/.test(val)) return;

    const updated = [...otp];
    updated[i] = val.slice(-1);
    setOtp(updated);

    if (val && i < 5) inputs.current[i + 1].focus();
  };

  const handleVerify = async () => {
    if (otp.join("") !== "123456") {
      alert("Invalid OTP");
      return;
    }

    try {
      setLoading(true);

      await fetch(`${API_URL}/verify-mobile/${phone}`, {
        method: "POST",
      });

      navigate("/success", { state: { type: "mobile" } });

    } catch (err) {
      console.error(err);
      alert("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mobile-page">
      <div className="card">

        <div className="icon-circle blue">
          <FiSmartphone size={26} />
        </div>

        <h2>Verify Your Mobile</h2>

        <p className="subtext">
          We’ve sent a 6-digit OTP to <br />
          <span className="highlight">+91 {phone}</span>
        </p>

        <div className="otp-box">
          {otp.map((d, i) => (
            <input
              key={i}
              ref={(el) => (inputs.current[i] = el)}
              value={d}
              onChange={(e) => handleChange(e.target.value, i)}
              maxLength={1}
            />
          ))}
        </div>

        <p className="resend">
          {time > 0 ? (
            <>
              Resend OTP in{" "}
              <span>00:{time.toString().padStart(2, "0")}</span>
            </>
          ) : (
            <span
              style={{ color: "#2563eb", cursor: "pointer" }}
              onClick={() => setTime(45)}
            >
              Resend OTP
            </span>
          )}
        </p>

        <button
          className="blue-btn"
          onClick={handleVerify}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

      </div>
    </div>
  );
}