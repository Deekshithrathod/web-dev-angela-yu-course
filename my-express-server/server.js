const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello world, home page");
});

app.get("/contact", (req, res) => {
  res.send("contace me: super@ddd.com");
});

app.get("/about", (req, res) => {
  res.send("Super passionate web-developer");
});

app.listen(3000, () => {
  console.log("Server is now listening on port 3000...");
});
