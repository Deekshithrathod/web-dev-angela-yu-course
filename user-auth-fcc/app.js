const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");

// app.use(session({
//   secret: 'foo',
// }));

const dbURL = "mongodb://localhost:27017/tutorialDB";
const connection = mongoose.createConnection(dbURL);
const sessionStore = MongoStore.create({
  // mongooseConnection: connection,
  mongoUrl: dbURL,
  collectionName: "sessionsNew",
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);
app.get("/", (req, res) => {
  // console.log(req.session);
  if (req.session.timesVisited) {
    req.session.timesVisited++;
  } else {
    req.session.timesVisited = 1;
  }
  res.send(`<h1>halo wald, you visited ${req.session.timesVisited}</h1>`);
});

app.listen(3000, () => {
  console.log("Server is now listening on port 3000...");
});
