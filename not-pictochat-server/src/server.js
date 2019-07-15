const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const socketIo = require("socket.io");
const http = require("http");
var cors = require("cors");

let app = express();

// Middleware
app.use(bodyParser.json());
var corsOptions = {
  origin: "*",
  credentials: false
};
app.use(cors({ corsOptions }));

// MongoDB
const dbURI = require("../keys/config").mongoURI;
mongoose
  .connect(dbURI)
  .then(() => console.log("MongoDB successfully connected."))
  .catch(err => console.log({ err }));

// Use routes
app.use("/api/room", require("./routes/api/room"));
app.use("/api/message", require("./routes/api/message"));

// Landing page
app.use(express.static("../public/index.html"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

// Start Server
const port = process.env.PORT || 4000;
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

let io = socketIo.listen(server);

io.origins((origin, callback) => {
  console.log(origin);
  // if (origin !== 'https://foo.example.com') {
  //   return callback('origin not allowed', false);
  // }
  callback("allowed", true);
});

io.on("connection", socket => {
  console.log("a user connected");
  socket.on("disconnect", function() {
    console.log("A user disconnected");
  });

  socket.on("message", data => {
    console.log("message recieved " + data.msg);
    socket.broadcast.emit("message", data);
  });

  socket.emit("message", { sender: "Server", msg: "Connected" });

  //Send a message after a timeout of 4seconds
  // setTimeout(function() {
  //   socket.send("Sent a message 4seconds after connection!");
  // }, 4000);
  //socket.broadcast.emit("hello everyone");
});
