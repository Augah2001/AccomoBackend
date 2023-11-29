import Joi from "joi";
import { asyncMiddleware } from "../middleware/asyncMiddleware";
import { Login, LoginType } from "../models/login";
import jwt  from "jsonwebtoken"
import express from "express";
import { User } from "../models/users";
import bcrypt from "bcrypt";
import _ = require("lodash");

interface Request {
  email: string;
  password: string;
}

const Router = express.Router();
Router.post(
  "/",
  asyncMiddleware(async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.message);
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({ message: "invalid email or password" });

    

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    
    if (!validPassword)
      return res.status(400).send("invalid email or password");

    const login = new Login<LoginType>({
        user: user
    }) 
    const userResponse = _.pick(user, ["_id","firstName", "lastName", "email", "userType"]) 

    const token = jwt.sign({_id: user._id, firstName: user.firstName, userType: user.userType}, "authKey")

    await login.save()

    

    res.header('x-auth-token', token).send(userResponse);
  })
);

const validateLogin = (request: Request) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  return schema.validate(request);
};

export default Router;
