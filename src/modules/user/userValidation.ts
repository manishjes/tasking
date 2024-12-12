import { Request, Response, NextFunction } from "express";
import validator from "../../helpers/validator";
import {getMessage} from "../../helpers/helper"
import constants from "../../utils/constants";

const register = async(req:any, res:Response, next:NextFunction)=>{
    try{
        const validationRule = {
            name: "required|string",
            email:"required|string",
            password: "required|string"
        }
        const msg = {

        }

        await validator(req.body, validationRule, msg,
            async(err:object, status:boolean)=>{
                if(!status){
                    res.status(constants.code.preconditionFailed).json({
                        status: false,
                        message: await getMessage(err),
                      });
                }
                else{
                    next()
                }
            }
        )
    } catch(err){
        next(err)
    }
}


const login = async(req:any, res:Response, next:NextFunction)=>{
    try{
        const validationRule = {
            email:"required|string",
            password: "required|string"
        }
        const msg = {

        }

        await validator(req.body, validationRule, msg,
            async(err:object, status:boolean)=>{
                if(!status){
                    res.status(constants.code.preconditionFailed).json({
                        status: false,
                        message: await getMessage(err),
                      });
                }
                else{
                    next()
                }
            }
        )
    } catch(err){
        next(err)
    }
}



export default {
    register,
    login
}