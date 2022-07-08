const express = require('express')

const {Song} = require('../../db/models');
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
                model: Artist,
                attributes:['id','name','previewImage']
            },
            {
                model: Album,
                attributes:['id','title','previewImage']
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

let {albumId} = req.params
let {title, description, url, imageUrl}= req.body

 const album = await Album.findByPk(albumId);
 const artist = album.artistId
    const songInAlbum =await album.createSong({
        title,
        description,
        url,
        previewImage: imageUrl, //added this to check later
        artistId:artist
    })

    res.json(songInAlbum)
})

router.put('/:songId', validateSongs,requireAuth, isAuthorizedSong, async(req,res)=>{

    let {title, description,url,imageUrl} = req.body
    let {songId} = req.params

    const song = await Song.findByPk(songId)

    song.title = title,
    song.description= description,
    song.url =url,
    song.previewImage = imageUrl

    await song.save()

    res.json(song)

})
router.delete('/:songId', requireAuth,isAuthorizedSong, async(req ,res)=>{

    let {songId} = req.params
    let songDelete = await Song.findOne({
        where: {
            id :songId
        }
    })

    await songDelete.destroy()
    return res.json({
        message: "Successfully deleted",
        "statusCode": 200
      })

})
module.exports= router;
