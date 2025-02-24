require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise"); // Use promise-based MySQL
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors()); // Note: For production, restrict CORS origins
app.use(bodyParser.json());

// Create a MySQL connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "kishor",
  database: process.env.DB_NAME || "easyapply_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Handle sign-up form submission
app.post("/signup", async (req, res) => {
  try {
    const {
      name,
      father_name,
      mother_name,
      email,
      mobile,
      aadhaar,
      dob,
      gender,
      nationality,
      blood_group,
      password_hash,
    } = req.body;

    // Basic input validation
    if (!name || !email || !password_hash) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required" });
    }

    // Check if user already exists
    const [existingUsers] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password_hash, 10);

    // Insert user into the database
    await db.query(
      "INSERT INTO users (name, father_name, mother_name, email, mobile, aadhaar, dob, gender, nationality, blood_group, password_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        father_name,
        mother_name,
        email,
        mobile,
        aadhaar,
        dob,
        gender,
        nationality,
        blood_group,
        hashedPassword, // Store the hashed password, not the plain text
      ]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in signup:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {
    // Test database connection on startup
    await db.query("SELECT 1");
    console.log("Connected to MySQL database");
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit if the database connection fails
  }
});
