const express = require("express");
const port = 2100;
const { connectDatabase } = require("./db");
const urlRoute = require("./routes/urlRoutes");
const staticRouter = require("./routes/staticRoutes");
const userRoute = require("./routes/userRoute");
const URL = require("./models/urlModel");
const path = require("path");
const cookieParser = require("cookie-parser");
const { checkForAuthentication, restrictTo } = require("./middleware/auth");

const app = express();

app.set("views", path.resolve("./views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/api",restrictTo(["user", "admin"]), urlRoute); // this route can handle both get and post request having ("/").
// when we use /api url then first our middl. check for user is login or not
app.use("/user", userRoute);
app.use("/",  staticRouter);

connectDatabase();

app.listen(port, () => {
  console.log(`Server is started at ${port}`);
});
