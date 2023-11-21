import mongoose from "mongoose";
import { House, houseSchema } from "./houses";
import Joi from "joi";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: "tenant" | "landlord";
  houses: House[];
}

const userSchema = 
  new mongoose.Schema<User>({
    firstName: { type: String, required: true, maxLength: 255 },
    lastName: { type: String, required: true, maxLength: 255 },
    email: { type: String, required: true, maxLength: 255 },
    password: { type: String, required: true, maxLength: 255 },
    userType: { type: String, enum: ["tenant", "landlord"], required: true },
    houses: { type: [houseSchema] },
  });

  const User = mongoose.model("User",userSchema)

const validateUser = (user: User) => {
  const schema = Joi.object({
    firstName: Joi.string().required().max(255),
    lastName: Joi.string().required().max(255),
    email: Joi.string().required().max(255),
    password: Joi.string().required().max(255),
    userType: Joi.string().valid("tenant", "landlord").required(),
  });

  return schema.validate(user);
};


export {validateUser, }
