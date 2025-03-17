const express  = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// middlw ware
app.use(express.json());
app.use(cors());

//all currences
app.get("/getAllCurrencies", async (req, res) => {
    const namesURl = "https://openexchangerates.org/api/currencies.json?prettyprint=false&show_alternative=false&show_inactive=false&app_id=36c9fe0aedfb46ad977c252004508b92?app_id=36c9fe0aedfb46ad977c252004508b92";
    try {
      const namesResponse = await axios.get(namesURl);
      const namesData = namesResponse.data;
  
      return res.json(namesData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred" });
    }
  });

// listen to port 
app.listen(5001,()=>{
    console.log("SERVER STARTED");
});