const express = require('express')

const { Song } = require('../../db/models');
const { Album } = require('../../db/models');
const { Artist } = require('../../db/models');
const { requireAuth, isAuthorized, isAuthorizedSong } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

const validateSongs = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Song title is required'),
    check('url')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Audio is required'),

    handleValidationErrors
]

router.get('/user', requireAuth, async (req, res) => {
    const { user } = req;

    const artist = await Artist.findOne({
        where: {
            userId: req.user.id
        }
    })
    if (!artist) {
        res.status(404)
        return res.json({
            "message": "User does not have any songs",
            "statusCode": 404
        })
    }
    const songs = await artist.getSongs({
        // include:
        // {
        //     model: Artist,
        //     attributes: ['id', 'name', 'previewImage', 'userId']
        // }
    });
    return res.json(songs)

})

router.get('/:songId', async (req, res) => {
    let { songId } = req.params

    const songById = await Song.findByPk(songId, {
        include:
            [{
                model: Artist,
                attributes: ['id', 'name', 'previewImage', 'userId']
            },
            {
                model: Album,
                attributes: ['id', 'title', 'previewImage']
            }]
    })
    if (!songById) {
        res.status(404);
        res.json({
            message: "Song couldn't be found",
            statusCode: 404
        })
    }
    res.json(songById)
})

router.post('/:albumId', validateSongs, requireAuth, isAuthorized, async (req, res) => {

    let { albumId } = req.params
    let { title, description, imageUrl, url } = req.body

    const album = await Album.findByPk(albumId);
    const artist = album.artistId
    const songInAlbum = await album.createSong({
        title,
        description,
        url,
        previewImage: imageUrl, //added this to check later
        artistId: artist
    })

    res.json(songInAlbum)
})

router.put('/:songId', validateSongs, requireAuth, isAuthorizedSong, async (req, res) => {

    let { title, description, url, imageUrl } = req.body
    let { songId } = req.params

    const song = await Song.findByPk(songId)

    song.title = title,
        song.description = description,
        song.url = url,
        song.previewImage = imageUrl

    await song.save()

    res.json(song)

})
router.delete('/:songId', requireAuth, isAuthorizedSong, async (req, res) => {

    let { songId } = req.params
    let songDelete = await Song.findOne({
        where: {
            id: songId
        }
    })

    await songDelete.destroy()
    return res.json({
        message: "Successfully deleted",
        "statusCode": 200
    })

})

const validateParams = [
    check('page')
        .default(value = 1)
        .custom((value, { req, }) => {
            if (value < 0) {
                throw new Error('Page must be greater than or equal to 0')
            } else return value
        }),
    check('size')
        .default(value = 20)
        .custom((value, { req, res }) => {
            if (value < 0) {
                throw new Error('Size must be greater than or equal to 0');
            } else return value
        }),
    handleValidationErrors
]
router.get('/', validateParams, async (req, res) => {
    let { page, size } = req.query;


    if (isNaN(page) || page <= 0) {
        page = 1
    }
    if (isNaN(size) || size <= 0) {
        size = 20
    }

    if (size > 20) {
        size = 20
    }
    const songs = await Song.findAll({
        // include:
        // {
        //     model: Artist,
        //     attributes: ['id', 'name', 'previewImage', 'userId']
        // },
        limit: size,
        offset: (page - 1) * size

    });
    return res.json(
        songs,
        page,
        size
    )

})


module.exports = router;
