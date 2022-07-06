const express = require('express')

const {Song} = require('../../db/models');
const {User} = require('../../db/models');
const {Album} = require('../../db/models');
const {Artist} = require('../../db/models');
const {requireAuth, isAuthorized, isAuthorizedSong} = require('../../utils/auth');
const {check} = require('express-validator');
const{handleValidationErrors} = require('../../utils/validation');


const router = express.Router();

const validateSongs =[
    check('title')
        .exists({checkFalsy:true})
        .withMessage('Song title is required'),
    check('url')
        .exists({checkFalsy:true})
        .isLength({min:4})
        .withMessage('Audio is required'),

    handleValidationErrors
]

router.get('/user', requireAuth, async(req,res)=>{
    const {user} = req;
    if(!requireAuth){
        res.status(403);
        res.json({
            "message": "Authentication required",
            "statusCode": 401
        })
    }
    if(user) {
        const artist = await Artist.findOne({
            where: {
                userId : req.user.id
            }}
            )
            const songs = await artist.getSongs();
            return res.json({Songs: songs})
        }
    })

router.get('/:songId', async (req,res)=>{
        let {songId}= req.params

        const songById = await Song.findByPk(songId,{
            include:
            [{
                model: Artist
            },
            {
                model: Album
            }]
        })
        if(!songById){
            res.status(404);
            res.json({
                message: "Song couldn't be found",
                statusCode: 404
            })
        }
        res.json(songById)
    })

    router.get('/', async (req,res)=>{

        const songs = await Song.findAll();

        res.json({Songs:songs})
    })

router.post('/:albumId',validateSongs, requireAuth, isAuthorized,async(req, res)=>{
    if(!requireAuth){
        res.status(403);
        res.json({
            "message": "Authentication required",
            "statusCode": 401
            })
        }
let {albumId} = req.params
let {title, description, url, imageUrl}= req.body

 const album = await Album.findByPk(albumId);
 const artist = album.artistId
 if(!album){
    res.status(404);
    res.json({
        "message": "Album couldn't be found",
        "statusCode": 404
      })
    }
    const songInAlbum =await album.createSong({
        title,
        description,
        url,
        imageUrl,
        artistId:artist
    })

    res.json(songInAlbum)
})

router.put('/:songId', validateSongs,requireAuth, isAuthorizedSong, async(req,res)=>{
    if(!requireAuth){
        res.status(403);
        res.json({
            "message": "Authentication required",
            "statusCode": 401
          })
    }
    let {title, description,url,imageUrl} = req.body
    let {songId} = req.params

    const song = await Song.findByPk(songId)
    if(!song){
        res.status(404);
        res.json({
            message: "Song couldn't be found",
            "statusCode": 404
          })
    }

    song.title = title,
    song.description= description,
    song.url =url,
    song.imageUrl = imageUrl

    await song.save()

    res.json(song)

})
router.delete('/:songId', requireAuth,isAuthorizedSong, async(req ,res)=>{
    if(!requireAuth){
        res.status(403);
        return res.json({
            "message": "Authentication required",
            "statusCode": 401
          })
        }

    let {songId} = req.params
    let songDelete = await Song.findOne({
        where: {
            id :songId
        }
    }
    )

    if(!songDelete){
        res.status(404);
        return res.json({
            message: "Song couldn't be found",
            "statusCode": 404
        })
    }
    await songDelete.destroy()
    return res.json({
        message: "Successfully deleted",
        "statusCode": 200
      })

})
module.exports= router;
