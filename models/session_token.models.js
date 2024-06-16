import mongoose from "mongoose"
import SessionTokenSchema from "../utils/SessionTokenSchema.js"



const SessionTokenModel = mongoose.model('session_token', SessionTokenSchema)

export const createToken = (token) => {
    return SessionTokenModel.create(token)
}

export const findOneToken = (condition) => {
    return SessionTokenModel.findOne(condition)
}

export const deleteToken = (condition) => {
    return SessionTokenModel.deleteOne(condition)
}