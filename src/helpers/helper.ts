import {HASH_PASSWORD, CHECK_PASSWORD} from "../types/helper"
import { compareSync, hashSync } from "bcrypt";



export const hashPassword: HASH_PASSWORD = async (password) => {
    const saltRounds = 15;
    return hashSync(password, saltRounds);
  };

  export const checkPassword: CHECK_PASSWORD = async (password, hash) => {
    return compareSync(password, hash);
  };

  export const getMessage = async(msg:any)=>{
    const errMsg:any = Object.values(msg.errors)[0]
    return errMsg[0]
}