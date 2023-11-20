import Joi, { any, string } from "joi";
import mongoose from "mongoose";
import { locationSchema } from "./locations";

export interface House {
  houseNumber: number;
  description: string;
  curfew: boolean;
  price: number;
  distance: string;
  services: ["jacuzzi", "gas", "wifi"];
  backgroundImage: string;
  images: any[];
  location: Location;
}

const houseSchema = new mongoose.Schema<House>({
  houseNumber: { type: Number, required: true, unique: true },
  description: { type: String, maxLength: 255 },
  curfew: Boolean,
  price: { type: Number, required: true },
  distance: { type: String, required: true },
  services: [String],
  backgroundImage: String,
  images: [],
  location: { type: locationSchema, required: true },
});

const House = mongoose.model("House", houseSchema)

const validateHouse = (house: House) => {
  const schema = Joi.object({
    houseNumber: Joi.number().required(),
    description: Joi.string().max(255),
    curfew: Joi.boolean(),
    price: Joi.number().required(),
    distance: Joi.string().required(),
  services: Joi.array().items(Joi.string()),
  backgroundImage: Joi.string(),
  images: Joi.array().items(Joi.string()),
  locationId: Joi.string().required()

  });

  return schema.validate(house)
};

export {validateHouse ,houseSchema, House}
