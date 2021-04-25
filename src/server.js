import React from "react";
import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import informationAPIs from "./api/informations";
import studentAPIs from "./api/students";
import enterpriseAPIs from "./api/enterprises";
const DB = "mongodb://localhost:27017/dzw";

mongoose.connect(
  DB,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("数据库已经成功连接上了");
    const app = express();
    app.use(bodyParser.json());
    app.use(express.static("static"));
    informationAPIs(app);
    studentAPIs(app);
    enterpriseAPIs(app);
    app.listen(3000);
  }
);
