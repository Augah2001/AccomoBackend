import Joi from "joi";
import mongoose, { mongo } from "mongoose";

interface authCode {
    authorization_key: string
}


const authSchema = new mongoose.Schema({
    authorization_key: {type: String, required: true}
})


const Authorize = mongoose.model("Auth", authSchema)



const validateAuth = (code: authCode) => {
    const schema = Joi.object({
      authorization_key: Joi.string().required()
    });
  
    return schema.validate(code);
  };


export {validateAuth, Authorize}  