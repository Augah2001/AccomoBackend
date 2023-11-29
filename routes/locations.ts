import express from "express";
import { Location, LocationInterface, validateLocation } from "../models/locations";
import { asyncMiddleware } from "../middleware/asyncMiddleware";

import ApiSever from "../utilities/ApiServer";

const Router = express.Router();




const {GetMany, Post,GetOne,Put,Delete} = new ApiSever<LocationInterface>(Router,Location, validateLocation)




GetMany()
Post()
GetOne()
Put()
Delete()

export default Router;
