const express = require('express')
const cors = require('cors')
const route = require('./routes')
const path = require('path')
const app = express()


//middlewares
app.use(express.json())
app.use(cors())

app.use(route)
app.use('/files', express.static(path.resolve(__dirname, '..', 'images')))

app.listen(4000)