import { Request, Response, NextFunction } from "express";
import constants from "../utils/constants";



export const responseHandler = async (
  req: any,
  res: Response,
  message: string,
  data?: any
) => {
  return res.status(constants.code.success).json({
    status: constants.status.statusTrue,
    userStatus: req.status || constants.status.statusFalse,
    message: message,
    data: data,
  });
};
