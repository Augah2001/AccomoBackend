import Joi from "joi";
import mongoose from "mongoose";




export interface LocationInterface {
    name: string;
    id:number;
    distance: string
}


const locationSchema = new mongoose.Schema<LocationInterface>({
    name: {type: String, required: true, minLength: 2 , maxLength: 255},
    id: {type: Number, required: true},
    distance: {type: String || null}
})

const Location = mongoose.model("Location", locationSchema)


const validateLocation = (location: LocationInterface ) => {


    const schema = Joi.object({
        name: Joi.string().min(2).max(255).required(),
        id: Joi.number().required(),
        distance: Joi.string()
    })

    return schema.validate(location)
}

export {Location, validateLocation, locationSchema}