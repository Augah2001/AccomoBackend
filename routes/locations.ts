import express from "express";
import { Location, validateLocation } from "../models/locations";
import { asyncMiddleware } from "../middleware/asyncMiddleware";

import ApiSever from "../utilities/ApiServer";

const Router = express.Router();




const {GetMany, GetOne, Post, Put, Delete} = new ApiSever<Location>(Router,Location, validateLocation)





GetMany()
Post()
GetOne()
Put()
Delete()

export default Router;
