const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

let app = express();

// Middleware
app.use(bodyParser.json());

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
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
