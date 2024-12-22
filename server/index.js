const express = require('express')
const app = express();
require('dotenv').config();

// middlewares
const userRoutes = require('./routes/User')
const profileRoutes = require('./routes/Profile')
const paymentRoutes = require('./routes/Payment')
const courseRoutes = require('./routes/Course')

const database = require('./config/database')
const cookieParser = require('cookie-parser')

const cors = require('cors')
const {cloudinaryConnect} = require('./config/cloudinary')
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv').config()

const PORT = process.env.PORT || 4001

// database connect 
database.connect()
// middlwares 
app.use(express.json())
app.use(cookieParser())
app.use(
        cors({
                origin: "http://localhost:3005",
                credentials: true
        })
)

app.use(
        fileUpload({
                useTempFiles: true,
                tempFileDir: '/tmp/'
        })
)

// cloudinary connection 
cloudinaryConnect()
// routes 
app.use('/api/v1/auth', userRoutes)
app.use('/api/v1/profile', profileRoutes)
app.use('/api/v1/course', courseRoutes)
app.use('/api/v1/payment', paymentRoutes)

// default routes 
app.get('/', (req, res) => {
        return res.json({
                success: true,
                message: "hello world"
        })
})

// server up 
app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`)
})