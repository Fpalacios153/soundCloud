const express = require('express')

const {Song} = require('../../db/models');
const {Artist} = require('../../db/models');
const {Album} = require('../../db/models');
const {Comment} = require('../../db/models');
const {requireAuth, isAuthorizedComment} = require('../../utils/auth');
const {check} = require('express-validator');
const{handleValidationErrors} = require('../../utils/validation');


const router = express.Router();

router.get('/:artistId/albums', async(req, res)=>{
    let {artistId} = req.params;

    const allAlbums = await Album.findAll({
        where:{
            artistId: artistId
        }
        })

    if(!allAlbums.length){
        res.status(404);
        res.json({
            "message": "Artist couldn't be found",
            "statusCode": 404
          })
    }
    res.json({Albums:allAlbums})



})

router.get('/:artistId/songs', async(req, res)=>{
    let {artistId} = req.params;

    const allSongs = await Song.findAll({
        where:{
            artistId: artistId
        },
    })
    if(!allSongs.length ){
        res.status(404),
        res.json({
            "message": "Artist couldn't be found",
            "statusCode": 404
          })
    }
    return res.json({Songs:allSongs})
})

router.get('/:artistId', async(req,res)=>{
    let {artistId} = req.params;

    const artist = await Artist.findByPk(artistId,{
        attributes:[
            "name","totalSongs","totalAblums","previewImages"
        ]
        });
    if(!artist){
        res.status(404)
        res.json({
            message: "Artist couldn't be found",
            "statusCode": 404
          })
    }
    res.json(artist)
})



module.exports= router;
