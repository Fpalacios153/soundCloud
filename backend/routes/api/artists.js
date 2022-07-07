const express = require('express')

const {Song} = require('../../db/models');
const {Artist} = require('../../db/models');
const {Album} = require('../../db/models');

const router = express.Router();

router.get('/:artistId/albums', async(req, res)=>{
    let {artistId} = req.params;

    const artist = await Artist.findByPk(artistId)
    if(!artist){
        res.status(404);
        res.json({
            "message": "Artist couldn't be found",
            "statusCode": 404
          })
    }
    const allAlbums = await artist.getAlbums({
        where:{
            artistId: artistId
        }
    })

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
            "name","totalSongs","totalAblums","previewImage"
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
