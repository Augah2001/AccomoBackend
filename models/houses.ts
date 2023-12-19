import Joi from "joi";
import mongoose from "mongoose";
import {  locationSchema } from "./locations";
import {  UserType, userSchema } from "./users";

export interface HouseInterface {
  houseNumber: number;
  description: string;
  curfew: boolean;
  price: number;
  distance: string;
  services: any[];
  backgroundImage: string;
  images: any[];
  location: any;
  owner: UserType;
  capacity: number;
  occupied: number;
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
  location: { type: locationSchema },
  owner: userSchema,
  capacity: Number,
  occupied: Number,
});

const House = mongoose.model("House", houseSchema);

const validateHouse = (house: HouseInterface) => {
  const schema = Joi.object({
    houseNumber: Joi.number().required(),
    description: Joi.string().max(255),
    curfew: Joi.string(),
    price: Joi.number().required(),
    distance: Joi.string().required(),
    services: Joi.array().items(Joi.string()),
    backgroundImage: Joi.string().allow(""),
    images: Joi.array().items(Joi.string()),
    location: Joi.string().allow(""),
    ownerId: Joi.string().required(),
    capacity: Joi.number().integer().required(),
    occupied: Joi.number()
      .integer()
      .required(),
  });

  return schema.validate(house);
};

export { validateHouse, houseSchema, House };
