import React from "react";

function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>👋 مرحبًا بك في تطبيق المهام</h1>
      <p style={styles.subtitle}>
        أنجز مهامك اليومية بسهولة، وابقَ منظمًا وفعّالًا.
      </p>

      <div style={styles.features}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>📌 إضافة المهام</h3>
          <p style={styles.cardText}>أضف مهامك اليومية لتبقى على المسار الصحيح.</p>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>📈 تتبع الإنجاز</h3>
          <p style={styles.cardText}>تابع تقدمك بسهولة وحدّد المهام المنجزة.</p>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🔐 حماية حسابك</h3>
          <p style={styles.cardText}>سجّل الدخول بأمان واحتفظ بمهامك في مكان واحد.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;


// التنسيقات
const styles = {
  container: {
    textAlign: "center",
    padding: "60px 20px",
    background: "linear-gradient(to right, #e0f7fa, #e1bee7)",
    minHeight: "calc(100vh - 80px)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    fontSize: "2.8rem",
    color: "#2c3e50",
    marginBottom: "15px",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#555",
    marginBottom: "50px",
  },
  features: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "25px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "25px 20px",
    borderRadius: "12px",
    width: "260px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    transition: "transform 0.3s",
  },
  cardTitle: {
    fontSize: "1.3rem",
    color: "#00796b",
    marginBottom: "10px",
  },
  cardText: {
    fontSize: "1rem",
    color: "#444",
  },
};
