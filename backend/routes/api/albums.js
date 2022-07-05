const express = require('express')

const {Song} = require('../../db/models');
const {User} = require('../../db/models');
const {Album} = require('../../db/models');
const {Artist} = require('../../db/models');
const {requireAuth} = require('../../utils/auth');



const router = express.Router();

router.get('/', async(req, res)=>{

    const albums = await Album.findAll();

    res.json({Albums:albums})
})


module.exports= router;
