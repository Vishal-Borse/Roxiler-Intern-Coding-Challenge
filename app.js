const express = require("express");
const app = express();
const dotenv = require("dotenv");
const indexRoute = require("./routes/index");
const cors = require("cors");
dotenv.config();

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "Hello, world!",
  });
});
app.use("/api", indexRoute);

app.listen(process.env.PORT, (err) => {
  if (err) console.error(err);
  else console.log(`Listening on ${process.env.PORT}`);
});
