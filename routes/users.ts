import express from "express";
import ApiSever from "../utilities/ApiServer";
import { User, UserType, validateUser } from "../models/users";
import { asyncMiddleware } from "../middleware/asyncMiddleware";
import _ from "lodash";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const Router = express.Router();

class UserExtendedApi extends ApiSever<UserType> {
  constructor() {
    super(Router, User, validateUser);
  }

  Post = () => {
    this.Router.post(
      "/",
      asyncMiddleware(async (req, res) => {
        const { error } = validateUser(req.body, req.body.userType);
        if (error) return res.status(400).json({ message: error.message });
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send("user already exists");

        const newUser = _.pick(req.body, [
          "firstName",
          "lastName",
          "email",
          "password",
          "userType",
          "authKey",
        ])

        user = new User(req.body)
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        user = await user.save();
        const token = jwt.sign({_id: user._id, firstName: user.firstName, userType: user.userType}, "authKey")
        
        res.header("x-auth-token", token).send(user);
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
