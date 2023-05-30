const express = require("express");
const cors = require("cors");
const connectDB = require ("./db");


var app = express();

connectDB ();
app.use(express.json());
app.use(cors());

app.use("/api/login", require("./routes/login"));
app.use("/api/register", require("./routes/register"));
app.use("/api", require("./routes/users"));
app.use("/api", require("./routes/series"));
app.use("/api", require("./routes/movies"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });
}

app.listen(5000, function () {
  console.log("Servidor arrancado en el puerto 5000!");
});
