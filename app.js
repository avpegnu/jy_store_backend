const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const socketIo = require("socket.io");
const setupSocket = require("./src/socket/socketHandler");
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

setupSocket(io);
app.use((req, res, next) => {
  req.io = io; // cho phép controller dùng socket
  next();
});

app.use("/", route);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
