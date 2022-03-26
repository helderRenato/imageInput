const express = require('express')
const route = express.Router()
const path = require('path')
const multer = require('multer')
const database = require('./database')
const upload = require('../config/upload')
const { dirname } = require('path')
const { resourceLimits } = require('worker_threads')

//multer object
const imageUpload = multer(upload)

//upload of images route
route.post('/image', imageUpload.single('image'), async (req, res) => {
    try{
    const filePath = req.file.path
    const {filename, mimetype, size} = req.file
    const imageUrl = 'http://localhost:4000/files/'+filename

    await database.query('INSERT INTO "Images"("fileName", "filePath","imageUrl", "mimeType", size) VALUES ($1, $2, $3, $4, $5);', [filename, filePath, imageUrl, mimetype, size])
    res.json('success')
    }catch(err){
        console.log(err)
    }
})

route.get('/image/:filename', async (req, res) => {
    try{
        const {filename} = req.params
        const image = await database.query('SELECT * from "Images" WHERE "fileName" = $1', [filename])
        
        if(image.rowCount > 0){
            return res.send(image.rows[0])  
        }else{
            return res.json('Image does not exist')
        }
    }catch(err){
        console.log(err)
    }
})


route.get('/allImages', async (req, res) => {
    const images = await database.query('SELECT * FROM "Images"')
    return res.send(images.rows)
})
module.exports = route