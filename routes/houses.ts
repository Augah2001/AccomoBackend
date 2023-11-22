import express from "express";
import ApiSever from "../utilities/ApiServer";
import { House, HouseInterface, validateHouse } from "../models/houses";
import { asyncMiddleware } from "../middleware/asyncMiddleware";
import { User } from "../models/users";
import { Location } from "../models/locations";



const Router = express.Router()




class HousesApiExtended extends ApiSever<HouseInterface> {

    constructor() {
        super(Router, House, validateHouse)
    }

    Post = () => {
        Router.post('/', asyncMiddleware(async (req,res)=> {
            const {error} = validateHouse(req.body)
            if (error) return res.status(400).send(error.message)

            const owner = await User.findById(req.body.userId)
            if (!owner) return res.status(404).send('user not found')

            const location = await Location.findById(req.body.locationId)
            if (!location) return res.status(404).send('location not found')

            let house = new House({
                houseNumber: req.body.houseNumber,
                description: req.body.description,
                curfew: req.body.curfew,
                price: req.body.price,
                distance: req.body.distance,
              services: req.body.services,
              backgroundImage: req.body.backgroundImage,
              images: req.body.images,
              location: location,
              owner: owner 

            })

            house = await house.save()
        }))
    }
}

const {GetMany, GetOne, Post, Put, Delete} = new HousesApiExtended()


GetMany()
GetOne()
Post()
Put()
Delete()

export default Router