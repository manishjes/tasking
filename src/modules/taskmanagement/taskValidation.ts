import { Request, Response, NextFunction } from "express";
import validator from "../../helpers/validator";
import {getMessage} from "../../helpers/helper"
import constants from "../../utils/constants";

const createTask = async(req:any, res:Response, next:NextFunction)=>{
    try{
        const validationRule = {
            title: "required|string",
            description:"required|string",
            priority: "required|string",
            status: "required|string",
            dueDate: "required|string",
            tags: "required"
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


const updateTask = async(req:any, res:Response, next:NextFunction)=>{
    try{
        const validationRule = {
            title: "required|string",
            description:"required|string",
            priority: "required|string",
            status: "required|string",
            dueDate: "required|string",
            tags: "required"
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


const taskDetail = async (req:any, res:Response, next:NextFunction)=>{
    try {
      const validationRule = {
        task_id: "required|string|min:24",
      };
      const msg = {};
  
      await validator(
        req.params,
        validationRule,
        msg,
        async (err: any, status: boolean) => {
          if (!status) {
            res.status(constants.code.preconditionFailed).json({
              status: constants.status.statusFalse,
              userStatus: constants.status.statusFalse,
              message: await getMessage(err),
            });
          } else {
            next();
          }
        }
      );
    } catch (err) {
      res.status(constants.code.preconditionFailed).json({
        status: constants.status.statusFalse,
        userStatus: req.status,
        message: err,
      });
    }
  }
export default{
    createTask,
    updateTask,
    taskDetail
}