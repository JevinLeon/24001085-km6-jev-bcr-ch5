require("dotenv").config();
const fileupload = require("express-fileupload");

const express = require("express");
const router = require("./routes");

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  fileupload({
    useTempFiles: true,
  })
);
app.use(express.static("../public"));
app.use("/api", router);

// app.get("/cars", router);
// app.get("/cars/:id", router);
// app.post("/cars", router);
// app.put("/cars/:id", router);
// app.delete("/cars/:id", router);

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
