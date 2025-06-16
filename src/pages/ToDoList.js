import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  doc,
  deleteDoc,
  updateDoc,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

const colors = {
  background: "linear-gradient(to bottom, #e3f2fd, #fce4ec)",
  card: "#ffffff",
  blue: "#e0f7fa",
  green: "#e8f5e9",
  pink: "#fce4ec",
  yellow: "#fff8e1",
  title: "#37474f",
  text: "#333",
  subtitle: "#607d8b",
};

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [deadline, setDeadline] = useState("");
  const [category, setCategory] = useState("شخصي");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editDeadline, setEditDeadline] = useState("");
  const [editType, setEditType] = useState("");
  const navigate = useNavigate();

  const styles = {
    container: {
      minHeight: "100vh",
      padding: "40px 20px",
      background: colors.background,
      color: colors.text,
      fontFamily: "'Cairo', sans-serif",
    },
    innerContainer: {
      maxWidth: "850px",
      margin: "0 auto",
    },
    logoutButton: {
      position: "absolute",
      top: "20px",
      left: "20px",
      backgroundColor: colors.yellow,
      color: colors.text,
      padding: "8px 16px",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
    },
    title: {
      textAlign: "center",
      color: colors.title,
      marginBottom: "30px",
      fontSize: "2.5rem",
      fontWeight: "700",
    },
    form: {
      display: "flex",
      flexWrap: "wrap",
      gap: "12px",
      justifyContent: "center",
      marginBottom: "30px",
    },
    input: {
      padding: "12px 16px",
      borderRadius: "10px",
      border: "1.5px solid #ccc",
      fontSize: "1rem",
      minWidth: "180px",
      backgroundColor: "#fff",
    },
    button: {
      padding: "12px 20px",
      backgroundColor: colors.pink,
      color: colors.text,
      fontWeight: "600",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
    },
    sectionTitle: {
      fontSize: "1.5rem",
      color: colors.subtitle,
      margin: "30px 0 15px",
      borderBottom: "2px solid #ccc",
      display: "inline-block",
    },
    taskCard: {
      backgroundColor: colors.card,
      padding: "18px",
      borderRadius: "14px",
      marginBottom: "14px",
      boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    smallButton: (bg) => ({
      backgroundColor: bg,
      color: "#000",
      border: "none",
      padding: "8px 14px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
      marginLeft: "6px",
    }),
  };

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/login");
    });

    const q = query(collection(db, "todos"), orderBy("createdAt", "asc"));
    const unsubTodos = onSnapshot(q, (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setTodos(data);
    });

    return () => {
      unsubAuth();
      unsubTodos();
    };
  }, [navigate]);

  useEffect(() => {
    const now = new Date();
    todos.forEach(todo => {
      if (todo.deadline && !todo.completed) {
        const taskDate = new Date(todo.deadline);
        const sameDay = now.toDateString() === taskDate.toDateString();
        if (sameDay) {
          setTimeout(() => {
            alert(`📌 تذكير: لديك مهمة اليوم - ${todo.text}`);
          }, 1000);
        }
      }
    });
  }, [todos]);

  function determineTaskType(deadline) {
    if (!deadline) return "يومي";
    const today = new Date();
    const taskDate = new Date(deadline);

    if (
      taskDate.getFullYear() === today.getFullYear() &&
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getDate() === today.getDate()
    ) return "يومي";

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    if (taskDate >= startOfWeek && taskDate <= endOfWeek) return "أسبوعي";
    if (taskDate.getFullYear() === today.getFullYear() && taskDate.getMonth() === today.getMonth()) return "شهري";

    return "شهري";
  }

  const addTodo = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const autoType = determineTaskType(deadline);
    await addDoc(collection(db, "todos"), {
      text: input,
      deadline,
      category,
      type: autoType,
      createdAt: serverTimestamp(),
      completed: false,
    });
    setInput("");
    setDeadline("");
    setCategory("شخصي");
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  const toggleComplete = async (id, current) => {
    await updateDoc(doc(db, "todos", id), { completed: !current });
  };

  const saveEdit = async (id) => {
    const autoType = determineTaskType(editDeadline);
    await updateDoc(doc(db, "todos", id), {
      text: editText,
      deadline: editDeadline,
      type: editType || autoType,
    });
    setEditingId(null);
  };

  const groupedTodos = {
    يومي: [],
    أسبوعي: [],
    شهري: [],
  };

  todos.forEach((t) => {
    if (groupedTodos[t.type]) groupedTodos[t.type].push(t);
  });

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <button
          style={styles.logoutButton}
          onClick={() => {
            signOut(auth);
            navigate("/login");
          }}
        >
          تسجيل الخروج
        </button>

        <h1 style={styles.title}>📋 إدارة المهام</h1>

        <form onSubmit={addTodo} style={styles.form}>
          <input
            type="text"
            placeholder="مهمة جديدة"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={styles.input}
          />
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            style={styles.input}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.input}
          >
            <option value="شخصي">شخصي</option>
            <option value="عمل">عمل</option>
            <option value="دراسة">دراسة</option>
          </select>
          <button type="submit" style={styles.button}>
            ➕ إضافة
          </button>
        </form>

        {["يومي", "أسبوعي", "شهري"].map((group) => (
          <div key={group}>
            <h2 style={styles.sectionTitle}>{group}</h2>
            {groupedTodos[group].map((todo) => (
              <div
                key={todo.id}
                style={{
                  ...styles.taskCard,
                  backgroundColor: todo.completed ? "#dcedc8" : "#fff",
                  opacity: todo.completed ? 0.6 : 1,
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {editingId === todo.id ? (
                  <>
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      style={styles.input}
                    />
                    <input
                      type="date"
                      value={editDeadline}
                      onChange={(e) => setEditDeadline(e.target.value)}
                      style={styles.input}
                    />
                    <select
                      value={editType}
                      onChange={(e) => setEditType(e.target.value)}
                      style={styles.input}
                    >
                      <option value="يومي">يومي</option>
                      <option value="أسبوعي">أسبوعي</option>
                      <option value="شهري">شهري</option>
                    </select>
                    <button
                      onClick={() => saveEdit(todo.id)}
                      style={styles.smallButton(colors.green)}
                    >
                      حفظ
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      style={styles.smallButton(colors.pink)}
                    >
                      إلغاء
                    </button>
                  </>
                ) : (
                  <>
                    <div>
                      <strong>{todo.text}</strong>
                      <div style={{ fontSize: "0.9rem", color: "#ccc" }}>
                        📅 {todo.deadline || "بدون تاريخ"} | 📁 {todo.category} | 🔁 {todo.type}
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          setEditingId(todo.id);
                          setEditText(todo.text);
                          setEditDeadline(todo.deadline);
                          setEditType(todo.type);
                        }}
                        style={styles.smallButton(colors.yellow)}
                      >
                        تعديل
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        style={styles.smallButton("#ffcccb")}
                      >
                        حذف
                      </button>
                      <button
                        onClick={() => toggleComplete(todo.id, todo.completed)}
                        style={styles.smallButton(colors.blue)}
                      >
                        {todo.completed ? "✅ مكتمل" : "إنهاء"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToDoList;
