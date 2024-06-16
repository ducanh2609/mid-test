import { Router } from "express";
import { createProfile, deleteProfile, getProfile, updateProfile } from "../controllers/profiles.controllers.js";
import { Authorization } from "../middlewares/auths.middlewares.js";


const profileRouter = Router()

profileRouter.get('/', getProfile)
profileRouter.use(Authorization)
profileRouter.post('/', createProfile)
profileRouter.put('/:profile_id', updateProfile)
profileRouter.delete('/:profile_id', deleteProfile)

export default profileRouter