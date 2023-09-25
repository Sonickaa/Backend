const express = require("express");
const app = express();
require(`colors`);
require(`dotenv`).config();
const { Pool, Client } = require("pg");

app.use(express.json());
const cors = require("cors");
app.use(cors());

const PORT = 8080;

const pool = new Pool();
/* user: proccess.env.user,
  host: proccess.env.host,
  database: proccess.env.database,
  password: process.env.password,
  port: 5432, */
app.get("/", (req, res) => {
  res.send("welcome son son");
});

app.get("/fighters", (req, res) => {
  pool
    .query("SELECT * FROM fighters;")
    .then((data) => res.send(data))
    .catch((e) => res.sendStatus(500).send("no nonoo"));
});

//parameterized queries
app.get("/fighters/:id", (req, res) => {
  const { id } = req.params;
  pool
    .query("SELECT * FROM fighters WHERE id = $1 ;", [id])
    .then((data) => res.json(data.rows))
    .catch((el) => res.sendStatus(500).json(e));
});

/* app.post("/fighters", (req, res) => {
  const { first_name, last_name, country_id, style } = req.body;

  pool.query(
    "INSERT INTO fighters (first_name, last_name, country_id, style) VALUES ($1, $2, $3 $4) RETURNING *"
  ),
    [first_name, last_name, country_id, style])
    .then((data) => res.json(data.rows))
    .catch((e)=>res.sendStatus(500).send.json(e))

}); */

app.get("/time", (req, res) => {
  pool.query(`SELECT NOW()`, (err, response) => {
    if (err) return res.status(500).send("internal server error:went wrong");
    /*  console.log("err:", err, "res:", res.rows); */
    res.send(response.rows[0]);
    /* pool.end(); */
  });
});

app.listen(PORT, () => {
  console.log(`cuutest sunshine today http://localhost${PORT}`.rainbow);
});
