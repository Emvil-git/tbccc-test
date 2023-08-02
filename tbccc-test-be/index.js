// Dependencies
const express = require("express");
const mongoose = require("mongooose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
