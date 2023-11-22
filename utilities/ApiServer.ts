import { Router } from "express-serve-static-core";
import { asyncMiddleware } from "../middleware/asyncMiddleware";

import { Model } from "mongoose";
import { ValidationResult } from "joi";

class ApiSever<T> {
  Router: Router;
  Model: Model<T>;
  validationFn: (data: T) => ValidationResult<any>

  constructor(Router: Router, Model: Model<T>, validationFn: (data: T) => ValidationResult<any>) {
    this.Router = Router;
    this.Model = Model;
    this.validationFn  = validationFn
  }

  Post = () => {
    this.Router.post(
      "/",
      asyncMiddleware(async (req, res) => {
        const { error } = this.validationFn(req.body);
        if (error) return res.status(400).send(error.message);

        let document = new this.Model<T>(req.body);

        const savedDoc = await document.save();
        res.send(savedDoc);
      })
    );
  };

  Put = () => {
    this.Router.put(
      "/:id",
      asyncMiddleware(async (req, res) => {
        const { error } = this.validationFn(req.body);
        if (error) return res.status(400).send(error.message);

        const document = await this.Model.findByIdAndUpdate(
          req.params.id,
          req.body
        );
        if (!document) return res.status(404).send(`${document} not found`);
        res.send(document);
      })
    );
  };

  GetMany = () => {
    this.Router.get(
      "/",
      asyncMiddleware(async (req, res) => {
        const document = await this.Model.find();
        if (!document || document.length === 0)
          return res.status(404).send(`${document} not found`);
        res.send(document);
      })
    );
  };

  GetOne = () => {
    this.Router.get(
      "/:id",
      asyncMiddleware(async (req, res) => {
        const document = await this.Model.findById(req.params.id);
        if (!document)
          return res.status(404).send(`${document} not found`);
        res.send(document);
      })
    );
  };

  Delete = () => {
    this.Router.delete(
      "/:id",
      asyncMiddleware(async (req, res) => {
        const document = await this.Model.findByIdAndRemove(req.params.id);
        if (!document) return res.status(404).send(`${document} not fount`);
        res.send(document);
      })
    );
  };
}

export default ApiSever;
