const axios= require('axios')
const express = require("express");
const mongoose = require("mongoose");

const app = express();
mongoose.pluralize(null)

app.use(express.static("public"));
const Dosschema = new mongoose.Schema({
  industry_code_ANZSIC: String,
  industry_name_ANZSIC: String,
  rme_size_grp:String,
  unit:String,
  value:String,
  variable:String,
  year:String
})

const DOS = mongoose.model("DOS", Dosschema);
var requests=0
app.get('/', async (req, res) => {
  try {
      // Make a GET request to the external API
      const data = await DOS.find().limit(1000)

      // Extract the data from the response
      // const employees = response.data.data;

      // Send the data to the frontend
      console.log(requests);
      requests+=1
      res.json(data);
  } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error.message);
      res.status(500).send('Internal Server Error');
  }
});
mongoose.connect("mongodb://localhost:27017/DOS");


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
