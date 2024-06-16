import mongoose from "mongoose";
import ProjectSchema from "../utils/ProjectSchema.js";


const ProjectModel = mongoose.model('projects', ProjectSchema)


export const createProjectDB = (body) => {
    return ProjectModel.insertMany(body)
}

export const createOneProjectDB = (body) => {
    return ProjectModel.create(body)
}

export const updateProject = (id, data) => {
    return ProjectModel.updateOne({ _id: id }, data)
}

export const findProject = (condition) => {
    return ProjectModel.find(condition)
}

export const deleteProject = (filter) => {
    return ProjectModel.deleteMany(filter)
}