//require('dotenv').config();
const config = require("./configuration/config");
const router = require("./routes/index");
const errorMiddleware = require("./middleware/error.middleware");

const express = require("express");
const app = express();

const { port, hostname } = config;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.use(errorMiddleware);

app.listen(port, hostname, () => {
  console.log(`Server is running on port http://${hostname}:${port}`);
});
