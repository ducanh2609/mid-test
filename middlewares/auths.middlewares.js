import { findOneToken } from "../models/session_token.models.js"
import { getOneUserDB } from "../models/users.models.js"
import jwt from 'jsonwebtoken'

export const Authorization = async (req, res, next) => {
    const { user_id } = req.query
    try {
        const token = req.headers.authorization.split(' ')[1]
        const userInfo = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (userInfo._id !== user_id) {
            throw new Error('Forbiden')
        }
        next()
    } catch (error) {
        res.status(403).send({
            error: error.message
        })
    }
}

export const Authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const findToken = await findOneToken({ token })
        if (!findToken) {
            throw new Error('Unauthorization')
        }
        const userInfo = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await getOneUserDB(userInfo._id)
        if (!user) {
            throw new Error('User is not login')
        }
        next()
    } catch (error) {
        res.status(401).send({
            error: error.message
        })
    }
}