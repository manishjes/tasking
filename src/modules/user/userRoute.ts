import express from "express"
import controller from "./userController"
import validation from "./userValidation"

const router = express.Router()

router.post(`/register`,
   // validation.register,
    controller.register
)


router.post(`/login`,
    validation.login,
    controller.login
)


export default router