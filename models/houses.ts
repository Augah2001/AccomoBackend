import Joi, { any, string } from "joi";
import mongoose from "mongoose";
import { locationSchema } from "./locations";
import { User, UserType, userSchema } from "./users";

export interface HouseInterface {
  houseNumber: number;
  description: string;
  curfew: boolean;
  price: number;
  distance: string;
  services: ["jacuzzi", "gas", "wifi"];
  backgroundImage: string;
  images: any[];
  location: Location;
  owner: UserType
}

const houseSchema = new mongoose.Schema<HouseInterface>({
  houseNumber: { type: Number, required: true },
  description: { type: String, maxLength: 255 },
  curfew: Boolean,
  price: { type: Number, required: true },
  distance: { type: String, required: true },
  services: [String],
  backgroundImage: String,
  images: [],
  location: { type: locationSchema, required: true },
  owner: userSchema
});

const House = mongoose.model("House", houseSchema)

const validateHouse = (house: HouseInterface) => {
  const schema = Joi.object({
    houseNumber: Joi.number().required(),
    description: Joi.string().max(255),
    curfew: Joi.boolean(),
    price: Joi.number().required(),
    distance: Joi.string().required(),
  services: Joi.array().items(Joi.string()),
  backgroundImage: Joi.string(),
  images: Joi.array().items(Joi.string()),
  locationId: Joi.string().required(),
  ownerId: Joi.string().required()

  });

  return schema.validate(house)
};

export {validateHouse ,houseSchema, House}
