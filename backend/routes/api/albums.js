const express = require('express')

const { Song } = require('../../db/models');
const { Album } = require('../../db/models');
const { Artist } = require('../../db/models');
const { requireAuth, isAuthorized } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');




const router = express.Router();
const validateAlbums = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Album title is required'),
    handleValidationErrors
]

router.get('/user', requireAuth, async (req, res) => {
    const { user } = req;

    const artist = await Artist.findOne({
        where: {
            userId: req.user.id
        }
    });
    if (!artist) {
        // res.status(404);
        return res.json([])
    }
    const albums = await artist.getAlbums();
    return res.json(albums)

})


router.get('/:albumId', async (req, res) => {
    let { albumId } = req.params

    const albumsById = await Album.findByPk(albumId, {
        include: [{
            model: Artist,
            attributes: ['id', 'name', 'previewImage', 'userId']
        },
        {
            model: Song
        }]
    })
    if (!albumsById) {
        res.status(404);
        res.json({
            message: "Album couldn't be found",
            "statusCode": 404
        })
    }

    res.json(albumsById)
})
router.get('/', async (req, res) => {
    const albums = await Album.findAll({
        include:
        {
            model: Artist,
            attributes: ['id', 'name', 'previewImage', 'userId']
        }
    });

    res.json(albums)
})

router.post('/', validateAlbums, requireAuth, async (req, res) => {

    let { title, description, imageUrl } = req.body;
    let id = req.user.id
    const getArtist = await Artist.findOne({
        where: {
            userId: id
        }
    });
    if (!getArtist) {

        const newArtists = await Artist.create({
            name: req.user.username,
            userId: req.user.id,
            previewImage: 'image url'
        })
        const newAlbum = await newArtists.createAlbum({
            title,
            description,
            previewImage: imageUrl
        })
        return res.json(newAlbum)
    }
    const newAlbum = await getArtist.createAlbum({
        // artistId :getArtist.id,
        title,
        description,
        previewImage: imageUrl
    })
    res.json(newAlbum)
});

router.put('/:albumId', validateAlbums, requireAuth, isAuthorized, async (req, res) => {

    let { albumId } = req.params;

    let { title, description, imageUrl } = req.body

    const album = await Album.findByPk(albumId)


    album.title = title,
        album.description = description,
        album.previewImage = imageUrl

    await album.save()
    return res.json(album)
})

router.delete('/:albumId', requireAuth, isAuthorized, async (req, res) => {

    let { albumId } = req.params;

    const album = await Album.findByPk(albumId);

    await album.destroy();

    res.json({
        message: "Successfully deleted",
        "statusCode": 200
    })

})



module.exports = router;
