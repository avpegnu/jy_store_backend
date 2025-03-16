const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
// const bodyParser = require("body-parser");

const db = require("./src/config/connectDB");
db.connect();

dotenv.config();
const route = require("./src/routes/index");
app.use(express.json());
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", route);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
