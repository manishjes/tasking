import {sign} from 'jsonwebtoken'

import Token from '../models/token'

const tokengenerate = (payload:any)=>{
    const token:any = sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_TIME
    })

    Token.create({
        btoken: token
    })
    return token
}

export  {tokengenerate}