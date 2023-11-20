import express from "express";
import mongoose from "mongoose";

const app = express();
mongoose
  .connect("mongodb://127.0.0.1:3000/Accomodation")
  .then(() => console.log("connected to database successfully"))
  .catch((error) => console.log(error));

app.listen(3000, () => {
  console.log("connected succeessfully to port 3000");
});
