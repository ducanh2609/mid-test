import mongoose from "mongoose"

const SessionTokenSchema = new mongoose.Schema({
    token: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
})

export default SessionTokenSchema
