import express from "express";
import ApiSever from "../utilities/ApiServer";
import { User, UserType, validateUser } from "../models/users";
import { asyncMiddleware } from "../middleware/asyncMiddleware";
import _ from "lodash";
import bcrypt from "bcrypt";
const Router = express.Router();

class UserExtendedApi extends ApiSever<UserType> {
  constructor() {
    super(Router, User, validateUser);
  }

  Post = () => {
    this.Router.post(
      "/",
      asyncMiddleware(async (req, res) => {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).json({ message: error.message });
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send("user already exists");

        user = new User(
          _.pick(req.body, [
            "firstName",
            "lastName",
            "email",
            "password",
            "userType",
            "authKey",
          ])
        );
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        user = await user.save();
        res.send(user);
      })
    );
  };
}

const { GetMany, GetOne, Post, Put, Delete } = new UserExtendedApi();

GetMany();
GetOne();
Post();
Put();
Delete();

export default Router;
