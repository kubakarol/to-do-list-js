const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
const Todo = require("./models/todo");

mongoose.connect(
  "mongodb+srv://todo:todo@cluster0.yntaf1q.mongodb.net/?retryWrites=true&w=majority"
);

app.get("/", function (req, res) {
  Todo.find().then((result) => {
    res.render("index", {
      data: result,
    });
  });
});

app.post("/", function (req, res) {
  const todo = new Todo({
    todo: req.body.todoValue,
  });
  todo.save().then((result) => {
    res.redirect("/");
  });
});

app.delete("/:id", (req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.send("Deleted successfully");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});

app.listen(port, function () {
  console.log("listening on port " + port);
});
