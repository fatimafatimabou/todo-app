// src/components/Navbar.jsx

import { Link, useLocation } from "react-router-dom";

function Navbar({ currentUser, handleLogout }) {
  const location = useLocation();

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>📌 مهامي</div>
      <div style={styles.links}>
        <Link
          to="/"
          style={{
            ...styles.link,
            ...(location.pathname === "/" ? styles.activeLink : {}),
          }}
        >
          🏠 الرئيسية
        </Link>

        {!currentUser ? (
          <>
            <Link
              to="/login"
              style={{
                ...styles.link,
                ...(location.pathname === "/login" ? styles.activeLink : {}),
              }}
            >
              🔐 تسجيل الدخول
            </Link>
            <Link
              to="/register"
              style={{
                ...styles.link,
                ...(location.pathname === "/register" ? styles.activeLink : {}),
              }}
            >
              📝 إنشاء حساب
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/todo"
              style={{
                ...styles.link,
                ...(location.pathname === "/todo" ? styles.activeLink : {}),
              }}
            >
              ✅ قائمة المهام
            </Link>
            <button onClick={handleLogout} style={styles.logoutButton}>
              🚪 تسجيل الخروج
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    background: "linear-gradient(to right, #e3f2fd, #fce4ec)",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    fontFamily: "'Cairo', sans-serif",
  },
  logo: {
    fontSize: "1.6rem",
    fontWeight: "bold",
    color: "#37474f",
  },
  links: {
    display: "flex",
    gap: "1.4rem",
  },
  link: {
    color: "#37474f",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "500",
    padding: "6px 14px",
    borderRadius: "8px",
    transition: "all 0.3s ease-in-out",
  },
  activeLink: {
    backgroundColor: "#ffffff",
    boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
    fontWeight: "600",
    border: "1px solid #d1d1d1",
  },
  logoutButton: {
    backgroundColor: "#ef5350",
    color: "#fff",
    padding: "6px 14px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "background-color 0.3s",
  },
};
