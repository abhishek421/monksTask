const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static("public"));

const uri = "mongodb-uri"

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const postsRouter = require("./routes/posts");
app.use("/posts", postsRouter);

app.listen(port, () => {
  console.log(`Server is running on por t: ${port}`);
});
