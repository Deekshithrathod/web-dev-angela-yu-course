const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});
const Article = mongoose.model("Article", articleSchema);

const defaultArticle = new Article({
  title: "What the ehll you say la",
  content: "I have 8yrs of experience when I was 3, you stupid",
});

app.get("/", (req, res) => {
  // defaultArticle.save();
  Article.find({}, (err, articles) => {
    if (err) {
      console.log(err);
    } else {
      res.render("home", { list: articles });
    }
  });
});

app.get("/articles", (req, res) => {
  Article.find({}, (err, list) => {
    if (err) {
      res.send(err);
    } else res.send(list);
  });
});

app.post("/articles", (req, res) => {
  const article = new Article({
    title: req.body.title,
    content: req.body.content,
  });
  article.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.send("success fully added the article");
    }
  });
  // Article.insertMany(req.body)
});

app.delete("/articles", (req, res) => {
  Article.deleteMany((err) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Deleted all articles");
    }
  });
});

app
  .route("/articles/:title")
  .get((req, res) => {
    const title = req.params.title;
    Article.findOne({ title: title }, (err, foundArticle) => {
      if (err) {
        res.send(err);
      } else {
        if (foundArticle) {
          res.send(foundArticle);
        } else {
          res.send("couldnot find any article with title: " + title);
        }
      }
    });
    // res.send("Sanding the correct response...");
  })
  .put((req, res) => {
    Article.updateOne(
      { title: req.params.title },
      { title: req.body.title, content: req.body.content },
      (err) => {
        if (err) {
          res.send(err);
        } else {
          res.send("Successfully edited the article");
        }
      }
    );
  });

app.listen(3000, () => {
  console.log("Server is now running on 3000....");
});
