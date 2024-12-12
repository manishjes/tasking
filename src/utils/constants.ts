import {MESSAGE, STATUS, CODE, Priority, TASKSTATUS} from "../types/constants";

const message:MESSAGE = {
    dbconnect:"Database connected successfully",
    reqAccessToken: "Access token is required.",
    invalidAccessToken: "Invalid access token.",
    invalidEmail: "this email is invalid",
    invalidPassword: "your password is incorrect",
    dataNotFound: "data not found"
}




  const status: STATUS = {
    statusTrue: true,
    statusFalse: false,
  };

const code: CODE = {
    success: 200,
    FRBDN: 403,
    dataNotFound: 404,
    badRequest: 400,
    unAuthorized: 401,
    preconditionFailed: 412,
    internalServerError: 500,
    expectationFailed: 417,
  };

  const priority:Priority = {
    low:"low",
    medium:"medium",
    high: "high",
  }


  const taskStatus:TASKSTATUS = {
    inprogress: "in-progress",
    completed: "completed"
  }


export default{
    message,
    status,
    code,
    priority,
    taskStatus
}