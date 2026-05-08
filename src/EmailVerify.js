import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import "./styles.css";

export default function EmailVerify() {
  const navigate = useNavigate();
  const { email } = useParams();
  const decodedEmail = decodeURIComponent(email);

  const inputs = useRef([]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [time, setTime] = useState(45);

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

  const handleBackspace = (e, i) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputs.current[i - 1].focus();
    }
  };

  const handleVerify = () => {
    if (otp.join("") === "123456") {
      navigate("/success", { state: { type: "email" } });
    } else {
      alert("Invalid Code");
    }
  };

  return (
    <div className="email-wrapper">

      {/* LEFT */}
      <div className="email-left">
        <div className="logo">LOS</div>
        <h1>Verify your email</h1>
        <p>
          Enter the 6-digit verification code sent to your email
          to complete authentication.
        </p>
      </div>

      {/* RIGHT */}
      <div className="email-right">
        <div className="email-card">

          <div className="back" onClick={() => navigate(-1)}>
            <FiArrowLeft />
          </div>

          <div className="icon-circle purple">
            <FiMail size={26} />
          </div>

          <h2>Email Verification</h2>

          <p className="subtext">
            We’ve sent a code to <br />
            <span className="email-text">{decodedEmail}</span>
          </p>

          <div className="otp-box">
            {otp.map((d, i) => (
              <input
                key={i}
                ref={(el) => (inputs.current[i] = el)}
                value={d}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleBackspace(e, i)}
                maxLength={1}
              />
            ))}
          </div>

          <p className="resend">
            {time > 0 ? (
              <>
                Resend code in{" "}
                <span>00:{time.toString().padStart(2, "0")}</span>
              </>
            ) : (
              <span
                style={{ color: "#7c3aed", cursor: "pointer" }}
                onClick={() => setTime(45)}
              >
                Resend Code
              </span>
            )}
          </p>

          <button
            className="purple-btn"
            disabled={otp.join("").length !== 6}
            onClick={handleVerify}
          >
            Verify Code
          </button>

        </div>
      </div>
    </div>
  );
}