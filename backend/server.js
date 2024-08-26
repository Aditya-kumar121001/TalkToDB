const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const axios = require("axios");
const app = express();
const connection = require('./connection'); 

//middleware
app.use(express.json());
app.use(cors());

const { GoogleGenerativeAI } =  require("@google/generative-ai"); 

// Access your API key as an environment variable.
const genAI = new GoogleGenerativeAI(API_KEY);

app.post("/", (req,res) => {
  async function dataCollection(query) {
    const sql = query;
    connection.query(sql, (error, data) => {
      if (error) {
        console.error('Error fetching data:', error.stack);
        return;
      }
      //console.log(data);
      res.send(data)
    });
  }


  async function run() {
    if (!req.body.contents || !Array.isArray(req.body.contents)) {
      return res.status(400).send("Invalid request format: 'contents' is required.");
    }
    const question = `write a simple query for ${req.body.contents[0]?.parts[0]?.text}. just need only query in text and the schema of the customer table is cid,gender,age,payment_method`;
    

    if (!question) {
      return res.status(400).send("Invalid request format: 'text' is required.");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const prompt = question
  
    const result = await model.generateContent(prompt);
    console.log(result)
    const response = result.response;
    const text = response.text();
    const query = text.substring(6, text.length - 5);
    console.log(query)
    dataCollection(query)
  }
  run()
});

app.listen(3000, () => {
  console.log("Server is running on 3000");
});
