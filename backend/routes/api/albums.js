const express = require('express')

const {Song} = require('../../db/models');
const {User} = require('../../db/models');
const {Album} = require('../../db/models');
const {Artist} = require('../../db/models');
const {requireAuth} = require('../../utils/auth');
const {check} = require('express-validator');
const{handleValidationErrors} = require('../../utils/validation');
const ablum = require('../../db/models/ablum');




const router = express.Router();
const validateAlbums =[
    check('title')
        .exists({checkFalsy:true})
        .withMessage('Album title is required'),
    handleValidationErrors
]

router.get('/user', requireAuth,async (req,res)=>{
    const {user} = req;
    if(!requireAuth){
        res.status(403);
        return res.json({
            message: "Authentication required",
            "statusCode": 401
        })
    }
    if(user) {
        const artist = await Artist.findOne({
         where: {
            userId : req.user.id
         }
        });
        const albums = await artist.getAlbums();
        return res.json({Albums: albums})
    }
})
router.get('/:albumId',async(req,res)=>{
    let {albumId} = req.params

    const albumsById = await Album.findByPk(albumId,{
        include: [{
            model: Artist
        },
        {
            model: Song
        }]
    })
    if(!albumsById){
        res.status(404);
        res.json({
            message: "Album couldn't be found",
            "statusCode": 404})
    }

    res.json(albumsById)
})
router.get('/', async(req, res)=>{


    const albums = await Album.findAll();

    res.json({Albums:albums})
})

router.post('/',validateAlbums,requireAuth,async (req,res)=>{
    if(!requireAuth){
        res.status(403);
        res.json({
            "message": "Authentication required",
            "statusCode": 401
          })
    }
    let {title, description, imageUrl} = req.body;
    let id = req.user.id
    const getArtist = await Artist.findOne({
        where:{
            userId : id
        }
    });
    const newAlbum = await Album.create({
        artistId :getArtist.id,
        title,
        description,
        previewImage:imageUrl
    })
    res.json(newAlbum)
});

router.put('/:albumId',validateAlbums,requireAuth, async(req,res)=>{
    if(!requireAuth){
        res.status(403);
        res.json({
            "message": "Authentication required",
            "statusCode": 401
          })
    }
    let {albumId} = req.params;

    let {title, description, imageUrl} =req.body

    const album = await Album.findByPk(albumId)
    if(!album){
        res.status(404)
        return res.json({
            "message": "Album couldn't be found",
            "statusCode": 404
          })
    }

    album.title =title,
    album.description = description,
    album.previewImage = imageUrl

    await album.save()
    return res.json(album)
})

router.delete('/:albumId',requireAuth ,async(req,res)=>{
    if(!requireAuth){
        res.status(403);
        res.json({
            "message": "Authentication required",
            "statusCode": 401
          })
    }

    let {albumId} = req.params;

    const album = await Album.findByPk(albumId);

    if(!album){
        res.status(404)
        res.json({
            message: "Album couldn't be found",
            "statusCode": 404
          })
    }

    await album.destroy();

    res.json({
        message: "Successfully deleted",
        "statusCode": 200
      })

})



module.exports= router;
