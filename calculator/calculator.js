const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  var n1 = Number(req.body.num1);
  var n2 = Number(req.body.num2);

  res.send("The sum is: " + (n1 + n2));
});

app.get("/bmiCalculator", (req, res) => {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmiCalculator", (req, res) => {
  var weight = Number(req.body.weight);
  var height = Number(req.body.height);

  var bmi = height / (weight * weight);
  res.send("Your BMI is: " + bmi);
});

app.listen(3000, () => {
  console.log("Server is now running on port 3000....");
});
