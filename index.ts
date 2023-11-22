import express from "express";
import mongoose from "mongoose";
import Locations from "./routes/locations";
import cors from "cors"
import Houses from "./routes/houses"
import Users from "./routes/users"

mongoose
  .connect("mongodb://127.0.0.1:3000/Accomodation")
  .then(() => console.log("connected to database successfully"))
  .catch((error) => console.log(error));

const app = express();
app.use(cors())

app.use(express.json());

app.use('/api/locations', Locations)
app.use('/api/houses', Houses)
app.use('/api/users', Users)

app.listen(443, () => {
  console.log("connected succeessfully to port 5000");
});
