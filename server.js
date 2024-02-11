const express = require("express");
const port = 2100;
const { connectDatabase } = require("./db");
const urlRoute = require("./routes/urlRoutes");
const ejs = require("ejs");
const staticRouter = require("./routes/staticRoutes");
const URL = require("./models/urlModel");
const path = require("path");

const app = express();

app.set("views", path.resolve("./views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/", urlRoute); // this route can handle both get and post request having ("/").

app.use("/", staticRouter);
connectDatabase();

app.listen(port, () => {
  console.log(`Server is started at ${port}`);
});
