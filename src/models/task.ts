import mongoose, { Schema, model } from "mongoose";
import constants from "../utils/constants";

const taskSchema = new Schema(
  {
    title: { type: String, required: true },


    description: {
      type: String,
      required: true,
    },
   
    priority: {
      type: String,
      required: true,
      enum: [
        constants.priority.low,
        constants.priority.medium,
        constants.priority.high
      ],
    },
    status: {
        type: String,
        required: true,
        enum: [
          constants.taskStatus.inprogress,
          constants.taskStatus.completed,
        ],
      },
    dueDate: { type: Date },

    tags: { type: Array, required: true },

    userId: { type: Schema.Types.ObjectId, ref: "User" },

    isDeleted: { type: Boolean, required: true, default: false },

  },
  { timestamps: true }
);


const Task = model("taskmanagement", taskSchema);

export default Task;

