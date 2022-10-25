require("dotenv").config;
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb' }));

const CONNECTION_URL =
"mongodb+srv://Hoshen:LaBbJUrrmpzDKafG@cluster0.bjc7k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


mongoose.connect(
  CONNECTION_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to Database")
);

const postSchema = mongoose.Schema({
  title: String,
  description: String,
  imgUrl : String
});

const Post = mongoose.model("Post", postSchema);

app.get("/", (req, res) => {
    res.send("express is here");
  });

app.post("/create", (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    description: req.body.description,
    imgUrl: req.body.imgUrl,
  });
  newPost
    .save()
    .then((doc) => console.log("doc"))
    .catch((err) => console.log(err));
  });

  app.get("/posts", (req, res) => {
    Post.find()
      .then((items) => res.json(items))
      .catch((err) => console.log(err));
  });

  app.delete("/delete/:id", (req, res) => {
    console.log(req.params);
    Post.findByIdAndDelete({ _id: req.params.id })
      .then((doc) => console.log(doc))
      .catch((err) => console.log(err));
  });

  app.put("/update/:id", (req, res) => {
    Post.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title: req.body.title,
        description: req.body.description,
      }
    )
      .then((doc) => console.log("doc"))
      .catch((err) => console.log(err));
  });
  

  app.listen( process.env.PORT || 3001, function () {
    console.log("Express server is running");
  });