import express from "express";
import Joi from "joi";
import { asyncMiddleware } from "../middleware/asyncMiddleware";
import {Authorize, validateAuth} from "../models/auth"



const Router = express.Router()

Router.post('/', asyncMiddleware(async (req,res)=> {
    console.log(req.body)

    const {error} =  validateAuth(req.body)
    console.log(error)
    if (error) return res.status(500).send(error.message)

    const auth = await Authorize.findOne({authorization_key: req.body.authorization_key})
    console.log(auth)
    if (!auth || auth === null) return res.status(500).send("invalid authorization key")
    console.log(auth)
    res.send(true)
}))


export default Router


