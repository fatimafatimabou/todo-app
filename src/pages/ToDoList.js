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

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "30px",
    backgroundColor: "#f1f5f9",
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    fontFamily: "'Cairo', sans-serif",
    position: "relative",
  },
  logoutButton: {
    position: "absolute",
    top: "20px",
    left: "20px",
    backgroundColor: "#e2e8f0",
    color: "#1e293b",
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background-color 0.3s",
  },
  logoutButtonHover: {
    backgroundColor: "#cbd5e1",
  },
  title: {
    textAlign: "center",
    color: "#1e293b",
    marginBottom: "30px",
    fontSize: "2rem",
    fontWeight: "700",
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "25px",
  },
  input: {
    flexGrow: 1,
    padding: "12px 16px",
    borderRadius: "10px",
    border: "2px solid #cbd5e1",
    fontSize: "1rem",
    outline: "none",
  },
  inputFocus: {
    borderColor: "#3b82f6",
  },
  button: {
    padding: "12px 20px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    fontWeight: "600",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#2563eb",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    backgroundColor: "#ffffff",
    padding: "14px 16px",
    borderRadius: "10px",
    marginBottom: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  editInput: {
    flexGrow: 1,
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1.5px solid #3b82f6",
    outline: "none",
  },
  smallButton: (bgColor) => ({
    backgroundColor: bgColor,
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    marginLeft: "10px",
    transition: "background-color 0.3s",
  }),
};

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [logoutHover, setLogoutHover] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [hover, setHover] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/login");
    });

    const q = query(collection(db, "todos"), orderBy("createdAt", "asc"));
    const unsubscribeTodos = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setTodos(items);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeTodos();
    };
  }, [navigate]);

  const addTodo = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    await addDoc(collection(db, "todos"), {
      text: input.trim(),
      createdAt: serverTimestamp(),
    });
    setInput("");
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    if (editingId === id) {
      setEditingId(null);
      setEditText("");
    }
  };

  const saveEdit = async (id) => {
    if (editText.trim() === "") return;
    await updateDoc(doc(db, "todos", id), { text: editText.trim() });
    setEditingId(null);
    setEditText("");
  };

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <button
        style={{
          ...styles.logoutButton,
          ...(logoutHover ? styles.logoutButtonHover : {}),
        }}
        onClick={logout}
        onMouseEnter={() => setLogoutHover(true)}
        onMouseLeave={() => setLogoutHover(false)}
      >
        تسجيل الخروج
      </button>

      <h2 style={styles.title}>قائمة المهام اليومية</h2>
      <form style={styles.form} onSubmit={addTodo}>
        <input
          type="text"
          placeholder="أضف مهمة جديدة..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            ...styles.input,
            ...(inputFocused ? styles.inputFocus : {}),
          }}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />
        <button
          type="submit"
          style={{
            ...styles.button,
            ...(hover ? styles.buttonHover : {}),
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          إضافة
        </button>
      </form>

      <ul style={styles.list}>
        {todos.map((todo) => (
          <li key={todo.id} style={styles.listItem}>
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={styles.editInput}
                />
                <button
                  onClick={() => saveEdit(todo.id)}
                  style={styles.smallButton("#10b981")}
                >
                  حفظ
                </button>
                <button
                  onClick={() => {
                    setEditingId(null);
                    setEditText("");
                  }}
                  style={styles.smallButton("#ef4444")}
                >
                  إلغاء
                </button>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                <div>
                  <button
                    onClick={() => {
                      setEditingId(todo.id);
                      setEditText(todo.text);
                    }}
                    style={styles.smallButton("#f59e0b")}
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    style={styles.smallButton("#dc2626")}
                  >
                    حذف
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
