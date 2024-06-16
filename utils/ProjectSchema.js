import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    profile_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'profiles',
    },
    name: {
        type: String,
    },
    content: {
        type: String,
    },
    role: {
        type: String,
    },
    start_time: {
        type: Date,
    },
    end_time: {
        type: Date,
    },
})

export default ProjectSchema