import { deleteToken, findOneToken } from "../models/session_token.models.js"


export const logout = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const findToken = await findOneToken({ token })
        if (!findToken) {
            throw new Error('Token not access')
        }
        await deleteToken({ token })
        res.status(200).send({
            message: 'Success'
        })
    } catch (error) {
        res.send({
            message: error.message
        })
    }

}