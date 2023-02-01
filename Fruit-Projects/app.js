const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB");

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please don"t leave the name empty'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

// const fruit = new Fruit({
//   name: "Pineapple",
//   rating: 2,
//   review: "juicy!",
// });

const fruit = new Fruit({
  name: "Coconut",
  rating: 1,
  review: "Hawaiii.....!",
});

fruit.save();

// Fruit.updateOne(
//   { _id: "63d8c40d94fa34e2c0d72b8c" },
//   { name: "Peach" },
//   (err) => {
//     mongoose.connection.close();
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Updated succesfully");
//     }
//   }
// );

// Fruit.deleteOne({ _id: "63d8c40d94fa34e2c0d72b8c" }, (err) => {
//   mongoose.connection.close();
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Deleted succesfully");
//   }
// });

// const kiwi = new Fruit({
//   name: "kiwi",
//   rating: 1,
//   review: "Soour!!!",
// });

// const apple = new Fruit({
//   name: "apple",
//   rating: 2,
//   review: "Meh",
// });

// const orange = new Fruit({
//   name: "orange",
//   rating: 15,
//   review: "orange-ish",
// });

// Fruit.insertMany([kiwi, orange, apple], (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Sucessfully saved all the items");
//   }
// });

// Fruit.find((err, fruits) => {
//   if (err) {
//     console.log(err);
//   } else {
//     // console.log(fruits);
//     mongoose.connection.close();
//     fruits.forEach((fruit) => {
//       console.log(fruit.name);
//     });
//   }
// });

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favFruit: fruitSchema,
});

const Person = mongoose.model("Person", personSchema);

// const person = new Person({
//   name: "Amy",
//   age: 12,
//   favFruit: fruit,
// });

// person.save();

Person.updateOne({ name: "Super" }, { favFruit: fruit }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Updated successfully");
  }
});
