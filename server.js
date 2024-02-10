const express = require("express");
const port = 2100;
const { connectDatabase } = require("./db");
const urlRoute = require("./routes/urlRoutes");
const URL = require("./models/urlModel");

const app = express();

app.use(express.json());

app.use("/", urlRoute); // this route can handle both get and post request having ("/").


connectDatabase();

app.listen(port, () => {
  console.log(`Server is started at ${port}`);
});
