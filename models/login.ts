import mongoose from "mongoose";
import { UserType, userSchema } from "./users";
import Joi, { string } from "joi";

interface LoginType {
  user: UserType;
}

const loginSchema = new mongoose.Schema<LoginType>(
  {
    user: userSchema,
  },

  { timestamps: true }
);

const Login = mongoose.model("Login", loginSchema)



const validateLogin = (loginData: {userId: string}) => {

    const schema = Joi.object({
        userId: string,

    })

    return schema.validate(loginData)
}
