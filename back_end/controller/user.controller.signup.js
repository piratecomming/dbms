import bcrypt from "bcrypt";
import db from "../index.js"; 

const signup = async (req, res) => {
  try {
    const { name, contact, email, password, profileImage, role } = req.body;

    // 1. Basic validation
    if (!name || !contact || !email || !password) {
      return res.status(400).json({ error: "All required fields must be filled" });
    }

    // 2. Check if email already exists
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      if (results.length > 0) {
        return res.status(400).json({ error: "Email already registered" });
      }

      // 3. Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // 4. Insert user into database
      const sql = `
        INSERT INTO users (name, contact, email, password, profileImage, role)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      db.query(sql, [name, contact, email, hashedPassword, profileImage || "", role || "guide"], (err, result) => {
        if (err) {
          console.error("Error inserting user:", err);
          return res.status(500).json({ error: "Database insert error" });
        }

        return res.status(201).json({ message: "User registered successfully" });
      });
    });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export default signup;
