import mongoose from "mongoose";
import ProfileSchema from "../utils/ProfileSchema.js";


const ProfileModel = mongoose.model('profiles', ProfileSchema)


export const createProfileDB = (body) => {
    return ProfileModel.create(body)
}

export const findProfileById = (id) => {
    return ProfileModel.findById(id)
}

export const findProfile = (condition) => {
    return ProfileModel.findOne(condition)
}

export const updateProfileDB = (id, data) => {
    return ProfileModel.updateOne({ _id: id }, data)
}

export const deleteProfileDB = (filter) => {
    return ProfileModel.deleteOne(filter)
}