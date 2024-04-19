require("dotenv").config();
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

const express = require("express");
const router = require("./routes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: process.env.NODE_ENV == "development" ? "./tmp" : "/tmp",
  })
);
app.use(express.static("../public"));
app.use("/api", router);

app.use("*", (req, res) => {
  res.status(404).json({
    data: null,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  let statusCode = 500;
  let message = "500 | Internal Server Error!";

  if (err.statusCode) statusCode = err.statusCode;
  if (err.message) message = err.message;

  res.status(statusCode).json({
    data: null,
    message: message,
  });
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
