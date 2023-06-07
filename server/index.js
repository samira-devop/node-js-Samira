const cors = require('cors')
const express = require('express')
const { body, check, param, validationResult, Result } = require('express-validator')
const pool=require('./PromisePool').promisePool

const PORT = 80
const app = express()
const corsOptions = { origin: ['http://localhost:3000'], optionsSuccessStatus: 200 }

// Middleware...
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Your endpoints here..
//ex 1 endpoint
app.get('/message', cors(corsOptions),async(req,res)=>{
    res.send({message:'Hello World!!!'})
})

//ex2 endpoint
app.get('/car/:id', cors(corsOptions), async(req, res)=>{
    let car_id = req.params['id']
    const [result] = await pool.query('Select * FROM car where car_id= ?', [car_id])
    //Read request body. 
    // const body = result [0]
    res.send(result)
    }) 

app.listen(PORT, () => {
    console.log(`Express web API running on port: ${PORT}.`)
})



