import mongoose from "mongoose";
import WorkSchema from "../utils/WorkSchema.js";


const WorkModel = mongoose.model('works', WorkSchema)


export const createWorkDB = (body) => {
    return WorkModel.insertMany(body)
}

export const createOneWorkDB = (body) => {
    return WorkModel.create(body)
}

export const updateWork = (id, data) => {
    return WorkModel.updateOne({ _id: id }, data)
}

export const findWork = (condition) => {
    return WorkModel.find(condition)
}

export const deleteWork = (filter) => {
    return WorkModel.deleteMany(filter)
}