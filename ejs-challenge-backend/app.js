const { homeStartingContent, aboutContent, contactContent } = require("./data");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose.connect("mongodb://localhost:27017/blogDB");

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Post = mongoose.model("Post", postSchema);

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  Post.find({}, (err, postsList) => {
    if (err) {
      console.log(err);
    } else {
      res.render("home", { content: homeStartingContent, posts: postsList });
    }
  });
});

app.get("/about", (req, res) => {
  res.render("about", { content: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { content: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = new Post(req.body);
  post.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

app.get("/post/:id", (req, res) => {
  const id = req.params.id;
  Post.findById(id, (err, foundPost) => {
    if (err) {
      console.log(err);
    } else {
      res.render("post", foundPost);
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
