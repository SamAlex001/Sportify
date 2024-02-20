// CricketData API Key: 
// cbb20b7a-baee-46fc-99d1-5e92d5f7944d
// 7c8b88f7-73f1-4e06-a14c-51f6aedf90d9
// 38da5d04-9ec3-4e40-8a41-aef31e950fa5
// 82f3d495-6780-4fb8-a639-32a91b78d388

const express = require("express");
const route = express.Router();
const API_KEY = "cbb20b7a-baee-46fc-99d1-5e92d5f7944d";
const CRIC_URL = `https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`

route.get("/cricket", async (req, res) => {
   try {
      const response = await fetch(CRIC_URL);
      const data = await response.json();
      // console.log(data);
      res.json(data);
   } catch (error) {
      console.log("ERROR Loading Match Data: ", error);
      res.status(500).json({ error: "Internal Server Error" });
   }
});

module.exports = route;