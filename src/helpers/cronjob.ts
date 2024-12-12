

import { schedule } from "node-cron";
import mongoose from "mongoose";
import Task from "../models/task";


const taskExpireCheck = async()=>{
 try {
  const expiretask:any = await Task.find({
    isDeleted: false,
    dueDate: {$lte: new Date(Date.now())}
  })

  for(const expire of expiretask){
    const userId = expire.userId;
    await Task.updateMany(
      { userId: userId, isDeleted:false }, 
      { $set: { isDeleted: true } } 
    );
  }
}
catch(err){
  console.log( err)
}
}

const cronjob = async () => {

  
  schedule("* * * * *", async () => {
     await taskExpireCheck()
  });
};

export default cronjob;
