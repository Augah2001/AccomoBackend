import express from "express";
import mongoose from "mongoose";
import Locations from "./routes/locations";
import cors from "cors";
import Houses from "./routes/houses";
import Users from "./routes/users";
import Logins from "./routes/login";
import Auth from "./routes/auth";
import error from "./middleware/error";

mongoose
  .connect("mongodb://127.0.0.1:3000/Accomodation")
  .then(() => console.log("connected to database successfully"))
  .catch((error) => console.log(error));

const app = express();
app.use(cors());
app.use(function (req, res, next) {
  // Set the Access-Control-Expose-Headers header to allow client access to custom headers
  res.header("Access-Control-Expose-Headers", "x-auth-token");
  next();
});

app.use(express.json());

app.use("/api/locations", Locations);
app.use("/api/houses", Houses);
app.use("/api/users", Users);
app.use("/api/logins", Logins);
app.use("/api/auth", Auth);
app.use(error);

app.listen(443, () => {
  console.log("connected succeessfully to port 5000");
});
