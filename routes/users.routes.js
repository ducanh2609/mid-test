import { Router } from "express";
import { getAllUser, getOneUser, updateUser } from "../controllers/users.controllers.js";


const userRouter = Router()

userRouter.get('/', getAllUser)

userRouter.get('/:user_id', getOneUser)

userRouter.put('/:user_id', updateUser)

export default userRouter