const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// เชื่อมต่อฐานข้อมูล MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "project",
});

db.connect((err) => {
  if (err) {
    console.error("ไม่สามารถเชื่อมต่อ MySQL:", err.message);
  } else {
    console.log("เชื่อมต่อ MySQL สำเร็จ!");
  }
});

// ทดสอบ API
app.get("/", (req, res) => {
  res.send("API พร้อมใช้งาน!");
});

// สมัครสมาชิก
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(sql, [username, email, hashedPassword], (err, result) => {  
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }
      res.json({ success: true, message: "สมัครสมาชิกสำเร็จ!" });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในการสมัครสมาชิก" });
  }
});

// เข้าสู่ระบบ
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.message });

    if (results.length > 0) {
      const isMatch = await bcrypt.compare(password, results[0].password);
      if (isMatch) {
        res.json({ success: true, message: "เข้าสู่ระบบสำเร็จ!", user: results[0] });
      } else {
        res.json({ success: false, message: "รหัสผ่านไม่ถูกต้อง!" });
      }
    } else {
      res.json({ success: false, message: "ไม่พบผู้ใช้!" });
    }
  });
});

// ดึง Task ทั้งหมดของผู้ใช้
app.get("/tasks/:user_id", (req, res) => {
  const { user_id } = req.params;
  db.query("SELECT * FROM tasks WHERE user_id = ?", [user_id], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, tasks: results });
  });
});

// เพิ่ม Task ใหม่
app.post("/tasks", (req, res) => {
  const { user_id, title, start_date, end_date, note } = req.body;
  const sql = "INSERT INTO tasks (user_id, title, start_date, end_date, note) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [user_id, title, start_date, end_date, note], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, message: "เพิ่ม Task สำเร็จ!", taskId: result.insertId });
  });
});

// อัปเดต Task
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, start_date, end_date, note } = req.body;

  const sql = "UPDATE tasks SET title=?, start_date=?, end_date=?, note=? WHERE id=?";
  db.query(sql, [title, start_date, end_date, note, id], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, message: "อัปเดต Task สำเร็จ!" });
  });
});

// ลบ Task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM tasks WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: err.message });

    if (result.affectedRows > 0) {
      res.json({ success: true, message: "ลบ Task สำเร็จ!" });
    } else {
      res.status(404).json({ success: false, message: "ไม่พบ Task ที่ต้องการลบ!" });
    }
  });
});

// ดึง Task ทั้งหมด
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
});

// เปิดเซิร์ฟเวอร์
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
