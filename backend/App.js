const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const express = require('express')

const appRoutes = require('./routes/routes')
require('dotenv').config()
app = express()
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')

  next()
})

app.use(bodyParser.json())
app.use(appRoutes)

mongoose
  .connect(process.env.MONGOCONNECTIONURL)
  .then(() => {
    app.listen(process.env.SERVERPORT)
    console.log('Connnection Successful')
    console.log('Server Listening on Port:', process.env.SERVERPORT)
  })
  .catch((err) => {
    console.log(err)
  })
