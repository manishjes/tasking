import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"
import Token from "../models/token"
import User from "../models/user"
import mongoose from "mongoose"
import constants from "../utils/constants"

const checkAuth = {
   user: async(req:any, res:Response, next:NextFunction)=>{
    try{
        if(!req.headers.authorization){
            throw{
                statusCode:constants.code.unAuthorized,
                message: constants.message.reqAccessToken
            }
        }
        else{
            const bearer = req.headers.authorization.split(" ");
            const bearerToken = bearer[1];

            Token.findOne({
                btoken:bearerToken
            }).then((data)=>{
                if(!data){
                    throw{
                        statusCode:constants.code.unAuthorized,
                        message: constants.message.invalidAccessToken
                    }
                }
                else{

                    const token:any = data.btoken
                    verify(token, process.env.JWT_SECRET, (err:any, jwt_payload:any)=>{
                        if(err){
                            throw{
                                statusCode:constants.code.unAuthorized,
                                msg: constants.message.invalidAccessToken,
                            }
                        }
                        else{
                            User.findOne({
                                _id: new mongoose.Types.ObjectId(jwt_payload.id)
                            }).then((user:any) => {
                                if (!user) {
                                  throw {
                                    statusCode:constants.code.unAuthorized,
                                    msg: constants.message.invalidAccessToken,
                                  };
                                } else {
                                    req.id = user._id;
                                  next();
                                }
                              })
                              .catch((err) => {
                                res.status(constants.code.preconditionFailed).json({
                                  message: err.msg,
                                });
                              });
                        }

                    })
                }
            }).catch((err)=>{
        res.status(constants.code.preconditionFailed).json({
            message:err.message
        })
    })

        }
    } catch(err){
        res.status(constants.code.internalServerError).json({
            message:err
        })
    }
   }
}



export default checkAuth