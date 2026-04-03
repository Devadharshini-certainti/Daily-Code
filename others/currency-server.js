const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;
const API_KEY = "87016bbb6d2d44de67768859";
app.get("/convert", async (req, res) => {
  const { from, to, amount } = req.query;
  if (!from || !to || !amount) {
    return res.json({ message: "from, to, amount required" });
  }
  try {
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from.toUpperCase()}`;
    const response = await axios.get(url);
    const data = response.data;
    const rate = data.conversion_rates[to.toUpperCase()];
    if (!rate) {
      return res.json({ message: "Invalid currency code" });
    }
    const convertedAmount = amount * rate;
    res.json({
      from,
      to,
      amount,
      rate,
      convertedAmount
    });
  } catch (error) {
    console.log(error.message);
    res.json({ message: "Error fetching currency data" });
  }
});
app.listen(PORT, () => {
  console.log("Server starting...");
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});