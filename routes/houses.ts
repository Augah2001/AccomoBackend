import express from "express";
import ApiSever from "../utilities/ApiServer";
import { House, HouseInterface, validateHouse } from "../models/houses";
import { asyncMiddleware } from "../middleware/asyncMiddleware";
import { User } from "../models/users";
import { Location, LocationInterface } from "../models/locations";
import _ from "lodash";

const Router = express.Router();

class HousesApiExtended extends ApiSever<HouseInterface> {
  constructor() {
    super(Router, House, validateHouse);
  }

  Delete = () => {
    Router.delete(
      "/:id",
      asyncMiddleware(async (req, res) => {
        const house = await House.findByIdAndDelete(req.params.id);
        if (!house) return res.status(404).send(`not fount`);
        const isThereOther = await House.findOne({ location: house.location });
        console.log(isThereOther)
        if (isThereOther === null) {
          console.log("how are you")
          await Location.findOneAndDelete({name: house.location.name})}

        res.send(house);
      })
    );
  };

  Put = () => {
    Router.put(
      "/:id",
      asyncMiddleware(async (req, res) => {
        

        const house = await House.findByIdAndUpdate(
          req.body._id,

         {$set: {
            occupied: req.body.occupied
         }}
        );
        if (!house) return res.status(404).send(`house not found`);
        res.send(house);
      })
    );
  }

  Post = () => {
    Router.post(
      "/",
      asyncMiddleware(async (req, res) => {
        console.log(req.body);
        const { error } = validateHouse(req.body);
        if (error) return res.status(400).send(error.message);

        const owner = await User.findById(req.body.ownerId);
        if (!owner) return res.status(404).send("user not found");

        let location = await Location.findOne({
          name: req.body.location.toLowerCase(),
        });
        const randomNumber = Math.floor(Math.random() * 10000000) + 1;

        if (!location) {
          const newLocation = new Location<LocationInterface>({
            name: req.body.location.toLowerCase(),
            id: randomNumber,
            distance: "200",
          });

          location = await newLocation.save();
        }

        const newLocation = await Location.findOne({ id: location.id });
        console.log(newLocation);

        let house = new House<HouseInterface>({
          houseNumber: req.body.houseNumber,
          description: req.body.description,
          curfew: req.body.curfew,
          price: req.body.price,
          distance: req.body.distance,
          services: req.body.services,
          backgroundImage: req.body.backgroundImage,
          images: req.body.images,
          location: location,
          owner: owner,
          capacity: req.body.capacity,
          occupied: req.body.occupied
        });

        house = await house.save();
        res.send(house);
      })
    );
  };
}

const { GetMany, GetOne, Post, Put, Delete } = new HousesApiExtended();

GetMany();
GetOne();
Post();
Put();
Delete();

export default Router;
