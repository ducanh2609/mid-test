import express from 'express'
import cors from 'cors'
import connectDB from './utils/db.js'
import userRouter from './routes/users.routes.js'
import profileRouter from './routes/profiles.routes.js'
import { login, register } from './controllers/users.controllers.js'
import { Authentication, Authorization } from './middlewares/auths.middlewares.js'
import { logout } from './controllers/session_token.controllers.js'


const app = express()
const PORT = 8080

app.use(express.json())
app.use(cors())

app.get('/', () => {
    res.send('Homepage')
})
app.post('/login', login)
app.post('/register', register)
app.post('/logout', logout)


app.use(Authentication)
app.use('/users', userRouter)
app.use('/profiles', profileRouter)

app.listen(PORT, (err) => {
    if (err) throw new Error
    console.log(`Server run in http://localhost:${PORT}`);
    connectDB()
})
