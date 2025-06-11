import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ToDoList from "./pages/ToDoList";

import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function PrivateRoute({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setChecking(false);
    });
    return () => unsubscribe();
  }, []);

  if (checking) {
    return <div style={styles.loading}>جاري التحقق...</div>;
  }

  return user ? children : <Navigate to="/login" />;
}

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("خطأ أثناء تسجيل الخروج:", error.message);
    }
  };

  return (
    <>
      <nav style={styles.nav}>
        <div style={styles.logo}>📌 مهامي</div>
        <div style={styles.links}>
          <Link to="/" style={styles.link}>🏠 الرئيسية</Link>
          {!currentUser && (
            <>
              <Link to="/login" style={styles.link}>🔐 تسجيل الدخول</Link>
              <Link to="/register" style={styles.link}>📝 إنشاء حساب</Link>
            </>
          )}
          {currentUser && (
            <>
              <Link to="/todo" style={styles.link}>✅ قائمة المهام</Link>
              <button onClick={handleLogout} style={styles.logoutButton}>
                🚪 تسجيل الخروج
              </button>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/todo"
          element={
            <PrivateRoute>
              <ToDoList />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

// التنسيقات
const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: "15px 30px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', sans-serif",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#333",
  },
  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    padding: "8px 16px",
    borderRadius: "8px",
    backgroundColor: "#e0e0e0",
    color: "#333",
    textDecoration: "none",
    fontWeight: "500",
    transition: "background-color 0.3s, color 0.3s",
  },
  logoutButton: {
    padding: "8px 16px",
    borderRadius: "8px",
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
  },
  loading: {
    textAlign: "center",
    padding: "40px",
    fontSize: "1.2rem",
    color: "#555",
  },
};
