const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "people_db",
});

app.get("/api/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.status(200).json({
      status: "OK",
      message: "Backend and database running",
      time: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: "Database connection failed",
      error: error.message,
    });
  }
});

app.get("/api/people", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM people ORDER BY id ASC");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "SERVER_ERROR" });
  }
});

app.get("/api/people/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM people WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "PERSON_NOT_FOUND" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "SERVER_ERROR" });
  }
});

app.post("/api/people", async (req, res) => {
  const { full_name, email } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!full_name || !email) {
    return res.status(400).json({ error: "MISSING_FIELDS" });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "INVALID_EMAIL_FORMAT" });
  }

  try {
    const existing = await pool.query("SELECT * FROM people WHERE email = $1", [email]);

    if (existing.rows.length > 0) {
      return res.status(409).json({ error: "EMAIL_ALREADY_EXISTS" });
    }

    const result = await pool.query(
      "INSERT INTO people (full_name, email) VALUES ($1, $2) RETURNING *",
      [full_name, email]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "SERVER_ERROR" });
  }
});

app.put("/api/people/:id", async (req, res) => {
  const { id } = req.params;
  const { full_name, email } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!full_name || !email) {
    return res.status(400).json({ error: "MISSING_FIELDS" });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "INVALID_EMAIL_FORMAT" });
  }

  try {
    const existingPerson = await pool.query("SELECT * FROM people WHERE id = $1", [id]);

    if (existingPerson.rows.length === 0) {
      return res.status(404).json({ error: "PERSON_NOT_FOUND" });
    }

    const emailOwner = await pool.query(
      "SELECT * FROM people WHERE email = $1 AND id != $2",
      [email, id]
    );

    if (emailOwner.rows.length > 0) {
      return res.status(409).json({ error: "EMAIL_ALREADY_EXISTS" });
    }

    const result = await pool.query(
      "UPDATE people SET full_name = $1, email = $2 WHERE id = $3 RETURNING *",
      [full_name, email, id]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "SERVER_ERROR" });
  }
});

app.delete("/api/people/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM people WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "PERSON_NOT_FOUND" });
    }

    res.status(200).json({ message: "Person deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "SERVER_ERROR" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
