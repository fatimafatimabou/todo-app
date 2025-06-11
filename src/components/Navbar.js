import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>📋 ToDo App</div>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>الرئيسية</Link>
        <Link to="/login" style={styles.link}>تسجيل الدخول</Link>
        <Link to="/register" style={styles.link}>إنشاء حساب</Link>
        <Link to="/todo" style={styles.link}>قائمة المهام</Link>
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
    backgroundColor: "#007bff",
    color: "white",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  logo: {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    gap: "1.2rem",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
    transition: "color 0.3s",
  },
};
