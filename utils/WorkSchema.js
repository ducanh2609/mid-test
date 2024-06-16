import mongoose from "mongoose";

const WorkSchema = new mongoose.Schema({
    profile_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'profiles',
    },
    company_name: {
        type: String,
    },
    position: {
        type: String,
    },
    start_time: {
        type: Date,
    },
    end_time: {
        type: Date,
    },
})

export default WorkSchema