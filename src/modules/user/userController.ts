import {Request, Response, NextFunction} from 'express'
import { responseHandler } from "../../middlewares/handler";

import {
  hashPassword,
  checkPassword
} from "../../helpers/helper";
import {tokengenerate} from "../../helpers/token"
import constants from "../../utils/constants";
import message from "./userConstants";
import User from "../../models/user";
import mongoose from 'mongoose';

const register = async (req: any, res: Response, next: NextFunction) => {
  try {
    const data: any = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: await hashPassword(req.body.password)
    });

    if (data) {
     
        res.status(constants.code.success).json({
            status: constants.status.statusTrue,
            userStatus: constants.status.statusFalse,
            message: message.userRegister,
        })
    }
  }  catch (err:any) {
    res.status(err.statusCode || constants.code.internalServerError).json({
      status: constants.status.statusFalse,
      message: err.msg ,
    });
  }
};

const login = async(req:any, res:Response, next:NextFunction)=>{
    try {
        const data = await User.findOne({ email: req.body.email })

        if(!data){
            throw {
                statusCode: constants.code.dataNotFound,
                msg: constants.message.invalidEmail,
              };
        }
        else if (
          
            (await checkPassword(req.body.password, data.password)) !== true
          ) {
            throw {
              statusCode: constants.code.preconditionFailed,
              msg: constants.message.invalidPassword,
            };
          }

          else{
            const payload = {
                id: data._id
            }

            res.status(constants.code.success).json({
                status: constants.status.statusTrue,
                message: message.loginSuccessfully,
                token:  tokengenerate(payload)
            })
          }
        
      } catch (err:any) {
        res.status(err.statusCode || constants.code.internalServerError).json({
          status: constants.status.statusFalse,
          userStatus: constants.status.statusFalse,
          message: err.msg ,
        });
      }
}




export default {
    register,
    login
}