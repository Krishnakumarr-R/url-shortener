import { validationResult } from "express-validator";

import type { Request, Response ,NextFunction } from "express";

const vaidationError = (req:Request,res:Response,next:NextFunction):void =>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        res.status(400).json({
            code:'validationError',
            errors: errors.mapped()
        })
    }

    next()
}

export default vaidationError