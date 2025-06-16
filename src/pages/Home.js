import React from "react";

function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>👋 مرحبًا بك في تطبيق تنظيم المهام</h1>
      <p style={styles.subtitle}>
        نظّم يومك، راقب تقدمك، وحقق أهدافك بسهولة.
      </p>
      <div style={styles.features}>
        <div style={{ ...styles.card, backgroundColor: "#fef6e4" }}>
          <h3 style={styles.cardTitle}>✍️ خطط مهامك</h3>
          <p style={styles.cardText}>
            أضف المهام التي تريد إنجازها ورتّب أولوياتك بكل بساطة.
          </p>
        </div>

        <div style={{ ...styles.card, backgroundColor: "#e0f7fa" }}>
          <h3 style={styles.cardTitle}>📈 راقب التقدّم</h3>
          <p style={styles.cardText}>
            تتبع إنجازاتك اليومية وابقَ على اطلاع دائم بما أنجزته.
          </p>
        </div>

        <div style={{ ...styles.card, backgroundColor: "#f3e5f5" }}>
          <h3 style={styles.cardTitle}>🔐 تسجيل آمن</h3>
          <p style={styles.cardText}>
            سجّل الدخول بأمان واحفظ مهامك على السحابة بسهولة.
          </p>
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
    background: "linear-gradient(to bottom, #e3f2fd, #fce4ec)",
    minHeight: "100vh",
    fontFamily: "'Cairo', sans-serif",
  },
  title: {
    fontSize: "2.8rem",
    color: "#37474f",
    marginBottom: "15px",
    fontWeight: "700",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#607d8b",
    marginBottom: "50px",
  },
  features: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "30px",
  },
  card: {
    padding: "25px 20px",
    borderRadius: "16px",
    width: "280px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  cardTitle: {
    fontSize: "1.4rem",
    color: "#5d1049",
    marginBottom: "10px",
    fontWeight: "600",
  },
  cardText: {
    fontSize: "1rem",
    color: "#333",
    lineHeight: "1.6",
  },
};
