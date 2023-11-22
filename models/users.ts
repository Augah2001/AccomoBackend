import mongoose from "mongoose";
import Joi from "joi";

export interface UserType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: "tenant" | "landlord";
  
}

const userSchema = 
  new mongoose.Schema<UserType>({
    firstName: { type: String, required: true, maxLength: 255 },
    lastName: { type: String, required: true, maxLength: 255 },
    email: { type: String, required: true, maxLength: 255 },
    password: { type: String, required: true, maxLength: 255 },
    userType: { type: String, enum: ["tenant", "landlord"], required: true },
    
  });

  const User = mongoose.model("User",userSchema)

const validateUser = (user: UserType) => {
  const schema = Joi.object({
    firstName: Joi.string().required().max(255),
    lastName: Joi.string().required().max(255),
    email: Joi.string().required().max(255),
    password: Joi.string().required().max(255),
    userType: Joi.string().valid("tenant", "landlord").required(),
  });

  return schema.validate(user);
};


export {validateUser, User, userSchema }
