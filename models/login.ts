import mongoose from "mongoose";
import { UserType, userSchema } from "./users";
import Joi, { string } from "joi";

export interface LoginType {
  user: UserType;
}

const loginSchema = new mongoose.Schema<LoginType>(
  {
    user: userSchema,
  },

  { timestamps: true }
);

const Login = mongoose.model("Login", loginSchema)





export {loginSchema, Login}
 