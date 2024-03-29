const express = require('express');

const {Song} = require('../../db/models');
const {Artist} = require('../../db/models');
const {Playlist} = require('../../db/models');
const {Album} = require('../../db/models');

const router = express.Router();


router.get('/:artistId/playlists', async(req,res)=>{
    let{artistId} = req.params;

    const artist = await Artist.findByPk(artistId);
    if(!artist){
        res.status(404);
        return res.json({
            "message": "Artist couldn't be found",
            "statusCode": 404
          })
    }
    const playlist = await Playlist.findAll({
        where:{
            userId: artist.userId
        }
    })
    res.json({Playlists:playlist})

})

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

    const artist = await Artist.findByPk(artistId)
    if(!artist){
        res.status(404);
        res.json({
            "message": "Artist couldn't be found",
            "statusCode": 404
          })
    }

    const allSongs = await artist.getSongs()
    return res.json({Songs:allSongs})
})

router.get('/:artistId', async(req,res)=>{
    let {artistId} = req.params;

    const artist = await Artist.findByPk(artistId,{
        attributes:[
            'id',"name","totalSongs","totalAlbums","previewImage"
        ]
     });
     if(!artist){
         res.status(404)
         return res.json({
             message: "Artist couldn't be found",
             "statusCode": 404
           })
     }
     const totalSongs = await Song.count({
        where:{ artistId: artistId}
     })
     artist.totalSongs = totalSongs
     const totalAlbums = await Album.count({
        where:{ artistId: artistId}
     })
     artist.totalAlbums = totalAlbums
    return res.json(artist)
})



module.exports= router;
