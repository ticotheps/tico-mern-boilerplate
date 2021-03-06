const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configures the MongoDB with the URI
// const db = require('./config/keys').mongoURI;

// connect to MongoDB
// mongoose
//     .connect(db, { useNewUrlParser: true })
//     .then(() => {
//         console.log('The MongoDB has successfully connected with server.js!');
//     })
//     .catch(err => {
//         console.log(err)
//     });

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    `\n** Your MERN App's back-end server is up and running on port ${port} **\n`
  );
});