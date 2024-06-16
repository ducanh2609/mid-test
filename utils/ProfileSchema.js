import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
    },
    full_name: {
        type: String,
    },
    birthday: {
        type: Date,
    },
    place_of_birth: {
        type: String,
    },
    nationality: {
        type: String,
    },
    education: {
        type: String,
    },
    hobbies: {
        type: [String],
    },
    goal: {
        type: String,
    },
    skill: {
        type: [String],
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    update_at: {
        type: Date,
        default: Date.now()
    },
})

export default ProfileSchema