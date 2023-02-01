const express = require("express");
require("dotenv").config();

const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// mongoose.connect("mongodb://localhost:27017/itemsDB");
mongoose.connect(process.env.MONGO_URL);
const itemSchema = new mongoose.Schema({
  name: String,
});

const listSchema = new mongoose.Schema({
  name: String,
  list: [itemSchema],
});

const Item = mongoose.model("Item", itemSchema);
const List = mongoose.model("List", listSchema);

const item1 = new Item({
  name: "To-Do 1",
});

const item2 = new Item({
  name: "To-Do 2",
});

const item3 = new Item({
  name: "To-Do 3",
});

const defaultItems = [item1, item2, item3];

app.get("/", function (req, res) {
  Item.find({}, (err, items) => {
    if (err) {
      console.log(err);
    } else {
      if (items.length === 0) {
        Item.insertMany(defaultItems, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.redirect("/");
          }
        });
      } else {
        res.render("list", { listTitle: "Today", newListItems: items });
      }
    }
  });
});

app.post("/", function (req, res) {
  const item = req.body.newItem;
  const newItem = new Item({
    name: item,
  });
  if (req.body.list === "Today") {
    newItem.save();
    res.redirect("/");
  } else {
    const listName = req.body.list;
    List.findOne({ name: listName }, (err, list) => {
      if (err) {
        console.log(err);
      } else {
        list.list.push(newItem);
        list.save();
      }
      res.redirect("/" + listName);
    });
  }
});

app.post("/delete", (req, res) => {
  const id = req.body.checkbox;
  const listName = req.body.listName;
  if (listName === "Today") {
    Item.findByIdAndDelete(id, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { list: { _id: id } } },
      (err, foundList) => {
        if (err) {
          console.log(err);
        } else res.redirect("/" + listName);
      }
    );
  }
});

app.get("/:customListName", (req, res) => {
  const listName = _.lowerCase(req.params.customListName);
  List.findOne({ name: listName }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result) {
        res.render("list", {
          listTitle: result.name,
          newListItems: result.list,
        });
      } else {
        const list = new List({
          name: listName,
          list: [...defaultItems],
        });
        list.save();
        res.render("list", { listTitle: list.name, newListItems: list.list });
      }
    }
  });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
