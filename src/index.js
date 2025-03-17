const express  = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// middlw ware
app.use(express.json());
app.use(cors());