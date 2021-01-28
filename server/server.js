require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const googleRoutes = require("./routes/googleRoutes");
const passport = require("passport"); // at header
const contactRoutes = require("./routes/contactRoutes");
const workspaceRoutes = require("./routes/workspaceRoutes");

const app = express();

// Allow the app to accept JSON on req.body
app.use(express.json());

//Initializing Passport
app.use(passport.initialize());
//passport template
require("./config/passport");

//To pass CORS policy..which will help to run React and Node separately on diff. hosts
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

//Routes
app.use("/contact", contactRoutes);
app.use("/api/dashboard/workspace", workspaceRoutes);
app.use("/api", authRoutes);
app.use("/", googleRoutes);

// For any unknown API request
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(500).json({ message: error.message || "Something went wrong" });
});

//Setting up database and backend Server

const port = process.env.PORT || 8000;
mongoose
  .connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-shard-00-00.kyz02.mongodb.net:27017,cluster0-shard-00-01.kyz02.mongodb.net:27017,cluster0-shard-00-02.kyz02.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-72j8yq-shard-0&authSource=admin&retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`MongoDB Connected 😊 and Connection started at ${port}`);
      console.log(`Local -> http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
