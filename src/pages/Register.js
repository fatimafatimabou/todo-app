import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/todo");
    } catch (err) {
      let message = "حدث خطأ أثناء التسجيل. حاول مرة أخرى.";
      if (err.code === "auth/email-already-in-use") {
        message = "البريد الإلكتروني مستخدم من قبل.";
      } else if (err.code === "auth/weak-password") {
        message = "كلمة المرور ضعيفة. يجب أن تكون 6 أحرف على الأقل.";
      } else if (err.code === "auth/invalid-email") {
        message = "البريد الإلكتروني غير صالح.";
      }
      setError(message);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>إنشاء حساب جديد</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            إنشاء حساب
          </button>
          {error && <p style={styles.error}>{error}</p>}
        </form>
        <p style={styles.switch}>
          لديك حساب؟{" "}
          <Link to="/login" style={styles.link}>
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #e3f2fd, #fce4ec)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Cairo', sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "1.9rem",
    color: "#37474f",
    fontWeight: "700",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "12px 16px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1.5px solid #cbd5e1",
    fontSize: "1rem",
    outline: "none",
  },
  button: {
    padding: "12px",
    backgroundColor: "#5d1049",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    fontSize: "1rem",
    cursor: "pointer",
  },
  error: {
    marginTop: "15px",
    color: "#b71c1c",
    fontSize: "0.95rem",
    textAlign: "center",
    backgroundColor: "#ffcdd2",
    padding: "10px",
    borderRadius: "8px",
  },
  switch: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "0.95rem",
    color: "#607d8b",
  },
  link: {
    color: "#5d1049",
    textDecoration: "none",
    fontWeight: "600",
  },
};
