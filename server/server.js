const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());
app.use(express.static("../../ind-train"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect("mongodb://localhost:27017/userData", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("Error", () => console.log("Database connection problem"));
db.once("open", () =>
  console.log(`Database Connected on ${port} : successfully`)
);

const SchemaTemplate = require("./models/SchemaModel");

app.post("/send", (req, res) => {
  const data = new SchemaTemplate({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    subject: req.body.subject,
    email: req.body.email,
    message: req.body.message,
  });

  db.collection("indData").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    } else {
      console.log("Data inserted");
    }
  });
  return res.redirect("message_sent.html");
});

app.get("/", (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
  });
  return res.redirect("index.html");
});

app.listen(port, () => {
  console.log(`Server started on ${port} : success`);
});
