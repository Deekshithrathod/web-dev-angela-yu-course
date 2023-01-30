const express = require("express");
const bodyParse = require("body-parser");

const ejs = require("ejs");

const date = require(__dirname + "/date");
const app = express();
app.set("view engine", "ejs");

app.use(bodyParse.urlencoded({ extended: true }));
app.use(express.static("public"));

const items = ["first item", "eat", "sleep"];
const workItems = [];

app.get("/", (req, res) => {
  const dayString = date.getDate();
  res.render("list", {
    day: dayString,
    newListItems: items,
    listTitle: "Regular",
  });
});

app.get("/work", (req, res) => {
  const dayString = date.getDay();
  res.render("list", {
    day: dayString,
    listTitle: "Work",
    newListItems: workItems,
  });
});

app.post("/", (req, res) => {
  const item = req.body.todo;
  const list = req.body.list;

  if (list === "Work") {
    workItems.push(item);
    res.render("list", {
      listTitle: "Work",
      day: date.getDay(),
      newListItems: workItems,
    });
  } else {
    items.push(item);
    res.render("list", {
      newListItems: items,
      day: date.getDate(),
      listTitle: "Regular",
    });
  }
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is now running on PORT 3000..");
});
