import { NextFunction, Request, Response } from "express"



export const asyncMiddleware =  (handler: (req: Request, res: Response)=> void) => {

    return (req: Request, res: Response, next: NextFunction)=> {

        try {
            handler(req, res)
        } catch (ex) {
           next(ex) 
        }
    }
}

