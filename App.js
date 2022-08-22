const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')

const app = express()

const PORT = process.env.PORT || 3000

const postRoute = require('./routes/postRoute')
const authRoute = require('./routes/authRoute')
const authenticate = require('./middleware/authenticate')

dotenv.config()

app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/public', express.static("public")); 

mongoose.connect(process.env.DB_CONNECTION_URL, () => console.log("Database Connected..."))

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`))

app.get('/', (req, res) => res.send('Hello world1'))
app.use('/post', authenticate, postRoute)
app.use('/user', authRoute)