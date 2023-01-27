const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const location = req.body.location;
  const apiKey = "b52fd4b268ccf78fb1a2d9dec99a5ddf";
  const unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${unit}`;
  const iconUrl = "http://openweathermap.org/img/wn/";
  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      res.write(
        "<h1>The temp in " + location + " is " + temp + " degree Celcius</h1>"
      );
      res.write("<p>" + desc + "</p>");
      res.write(`<img src= ${iconUrl + weatherData.weather[0].icon}@2x.png> `);
      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("Server is now lisetening on port 3000...");
});
