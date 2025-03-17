const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Get all currencies
app.get("/getAllCurrencies", async (req, res) => {
  const namesURL = "https://openexchangerates.org/api/currencies.json?prettyprint=false&show_alternative=false&show_inactive=false&app_id=36c9fe0aedfb46ad977c252004508b92";
  try {
    const namesResponse = await axios.get(namesURL);
    const namesData = namesResponse.data;

    return res.json(namesData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Currency conversion
app.get("/convert", async (req, res) => {
  const { date, sourceCurrency, targetCurrency, amountInSourceCurrency } = req.query;

  try {
    const dataUrl = `https://openexchangerates.org/api/historical/${date}.json?app_id=36c9fe0aedfb46ad977c252004508b92`; // Corrected the URL template
    const dataResponse = await axios.get(dataUrl);
    const rates = dataResponse.data.rates;

    // Perform the conversion
    const sourceRate = rates[sourceCurrency];
    const targetRate = rates[targetCurrency];

    const targetValue = (targetRate / sourceRate) * amountInSourceCurrency;
    return res.json(targetValue);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred during conversion" });
  }
});

// Listen to port
app.listen(5002, () => {
  console.log("SERVER STARTED");
});
