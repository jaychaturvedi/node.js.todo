const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const cors = require('cors')
const route = require('./route')

app.use(bodyparser.json())
app.use(cors())


//Routes//
app.use('/api', route)

app.listen(5000,(req,res)=>{console.log('in server at 5000')})