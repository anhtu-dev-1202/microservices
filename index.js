import express from "express";
import mysql from "mysql";
import "dotenv/config";

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

app.get("/readiness", async (req, res) => {
  await connection.query("SELECT NOW()", (err, results) => {
    if (err) {
      console.error("Error executing query", err.stack);
      res.status(500).send("Internal server error" + process.env.DB_HOST);
      return;
    }
    console.log("Query result:", results);
    res.send("Hello World!");
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
