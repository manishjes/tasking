import {Request, Response, NextFunction} from 'express'
import constants from "../../utils/constants";
import Task from '../../models/task';
import message from './taskconstants';
import mongoose, { Mongoose } from 'mongoose';
import { title } from 'process';


const createTask = async(req:any, res:Response, next:NextFunction)=>{
    try {
        const data: any = await Task.create({
           title:req.body.title,
           description:req.body.description,
           priority:req.body.priority,
           status:req.body.status,
           dueDate: req.body.dueDate,
           tags: req.body.tags,
           userId:req.id
        });
    
        if (!data) {
         throw{
            statusCode: constants.code.preconditionFailed,
            msg: message.taskcreationfailed,
         }
         
        }
        else{
            res.status(constants.code.success).json({
                status: constants.status.statusTrue,
                userStatus: constants.status.statusTrue,
                message: message.taskCreated,
            })
        }
      }  catch (err:any) {
        res.status(err.statusCode || constants.code.internalServerError).json({
          status: constants.status.statusFalse,
          message: err.msg ,
        });
      }
}


const updateTask = async(req:any, res:Response, next:NextFunction)=>{
    try {
        const data: any = await  Task.findOneAndUpdate(
            {
              _id: new mongoose.Types.ObjectId(req.params.task_id),
            },
            {
                title:req.body.title,
                description:req.body.description,
                priority:req.body.priority,
                status:req.body.status,
                dueDate: req.body.dueDate,
                tags: req.body.tags,
                userId:req.id
            },
            { new: true }
          )
        if (!data) {
         throw{
            statusCode: constants.code.preconditionFailed,
            msg: message.taskUpdation,
         }
         
        }
        else{
            res.status(constants.code.success).json({
                status: constants.status.statusTrue,
                userStatus: constants.status.statusTrue,
                message: message.taskupdated,
            })
        }
      }  catch (err:any) {
        res.status(err.statusCode || constants.code.internalServerError).json({
          status: constants.status.statusFalse,
          message: err.msg ,
        });
      }
}

const listTask = async(req:any, res:Response,next:NextFunction)=>{
    try {
        const page = Number(req.query.page);
        const limit = Number(req.query.limit);
        const skip = page * limit;
        const data = limit !== 0 ? [{ $skip: skip }, { $limit: limit }] : [];
    
   const taskData= await Task.aggregate([
          {
            $match: {
                userId: new mongoose.Types.ObjectId(req.id),
                isDeleted:false,
                $and: [
                    {
                      $or: [
                        {
                          title: {
                            $regex: "^" + req.query.search + ".*",
                            $options: "i",
                          },
                        },
                      
                      ],
                    },
                    {
                      ...(req.query.filter.priority
                        ? { priority: req.query.filter.priority }
                        : {}),
                    },
                  ],
            },
          },
          {
            $project: {
              title: 1,
              description: 1,
              priority: 1,
              status: 1,
              dueDate: 1,
              createdAt: 1,
            },
          },
        
          
          {
            $sort: { createdAt: -1 },
          },
          {
            $facet: {
              metadata: [
                { $count: "total" },
                { $addFields: { page: Number(page) } },
                {
                  $addFields: {
                    totalPages: {
                      $cond: [
                        Number(req.query.limit) !== 0,
                        { $ceil: { $divide: ["$total", limit] } },
                        { $sum: [Number(page), Number(1)] },
                      ],
                    },
                  },
                },
                {
                  $addFields: {
                    hasPrevPage: {
                      $cond: [
                        Number(req.query.limit) !== 0,
                        {
                          $cond: [
                            {
                              $lt: [{ $subtract: [page, Number(1)] }, Number(0)],
                            },
                            false,
                            true,
                          ],
                        },
                        false,
                      ],
                    },
                  },
                },
                {
                  $addFields: {
                    prevPage: {
                      $cond: [
                        Number(req.query.limit) !== 0,
                        {
                          $cond: [
                            {
                              $lt: [{ $subtract: [page, Number(1)] }, Number(0)],
                            },
                            null,
                            { $subtract: [page, Number(1)] },
                          ],
                        },
                        null,
                      ],
                    },
                  },
                },
                {
                  $addFields: {
                    hasNextPage: {
                      $cond: [
                        Number(req.query.limit) !== 0,
                        {
                          $cond: [
                            {
                              $gt: [
                                {
                                  $subtract: [
                                    {
                                      $ceil: { $divide: ["$total", limit] },
                                    },
                                    Number(1),
                                  ],
                                },
                                "$page",
                              ],
                            },
                            true,
                            false,
                          ],
                        },
                        false,
                      ],
                    },
                  },
                },
                {
                  $addFields: {
                    nextPage: {
                      $cond: [
                        Number(req.query.limit) !== 0,
                        { $sum: [page, Number(1)] },
                        null,
                      ],
                    },
                  },
                },
              ],
              data: data,
            },
          },
        ])
        if (!taskData[0].data.length) {
            throw {
                statusCode: constants.code.dataNotFound,
                msg: constants.message.dataNotFound,
              };
          } else {
            res.status(constants.code.success).json({
                status: constants.status.statusTrue,
                userStatus: constants.status.statusTrue,
                message: message.taskListed,
                taskData
            })
          }
      } catch (err) {
        next(err);
      }
}


const taskDetail = async(req:any, res:Response, next:NextFunction)=>{
    try{

        const data=  await Task.findOne({_id:req.params.task_id})
          if(!data){
              throw{
                  statusCode:constants.code.dataNotFound,
                  message: constants.message.dataNotFound
              }
          }
          else{
              res.status(constants.code.success).json({
                  status:constants.status.statusTrue,
                  userStatus:constants.status.statusTrue,
                  message: message.taskDetail,
                  data:data
              })
          }
  
      } catch(err){
          next(err)
      }
}

const updateStatus = async(req:any, res:Response, next:NextFunction)=>{
    try {
        const data: any = await  Task.findOneAndUpdate(
            {
              _id: new mongoose.Types.ObjectId(req.params.task_id),
            },
            {
                status:req.body.status,
            },
            { new: true }
          )
        if (!data) {
         throw{
            statusCode: constants.code.preconditionFailed,
            msg: constants.message.dataNotFound,
         }
         
        }
        else{
            res.status(constants.code.success).json({
                status: constants.status.statusTrue,
                userStatus: constants.status.statusTrue,
                message: message.taskstatus,
            })
        }
      }  catch (err:any) {
        res.status(err.statusCode || constants.code.internalServerError).json({
          status: constants.status.statusFalse,
          message: err.msg ,
        });
      }
}


const deletTask = async(req:any, res:Response, next:NextFunction)=>{
    try {
        const data: any = await  Task.findOneAndUpdate(
            {
              _id: new mongoose.Types.ObjectId(req.params.task_id),
            },
            {
                isDeleted:true
            },
            { new: true }
          )
        if (!data) {
         throw{
            statusCode: constants.code.preconditionFailed,
            msg: message.failedDelete,
         }
         
        }
        else{
            res.status(constants.code.success).json({
                status: constants.status.statusTrue,
                userStatus: constants.status.statusTrue,
                message: message.taskDeleted,
            })
        }
      }  catch (err:any) {
        res.status(err.statusCode || constants.code.internalServerError).json({
          status: constants.status.statusFalse,
          message: err.msg ,
        });
      }
}

export default {
    createTask,
    updateTask,
    listTask,
    taskDetail,
    deletTask,
    updateStatus
}