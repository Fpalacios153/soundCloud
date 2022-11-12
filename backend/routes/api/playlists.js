const express = require('express')

const { Song } = require('../../db/models');
const { Playlist } = require('../../db/models');
const { SongsPlaylist } = require('../../db/models');
const { requireAuth, isAuthorizedPlaylist } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validatePlaylist = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Playlist name is required'),
    handleValidationErrors
]
// users playlist
router.get('/user', requireAuth, async (req, res) => {
    const id = req.user.id

    const usersPlaylist = await Playlist.findAll({
        where: {
            userId: id
        },
        include: {
            model: Song, through: { attributes: [] }
        }
    })
    res.json(usersPlaylist)
})
// get playlist by id
router.get('/:playlistId', async (req, res) => {
    let { playlistId } = req.params

    const playlists = await Playlist.findByPk(playlistId, {
        include: {
            model: Song, through: { attributes: [] }
        }
    })
    console.log(playlists)
    if (!playlists) {
        res.status(404);
        return res.json({
            "message": "Playlist couldn't be found",
            "statusCode": 404
        })
    }
    return res.json(playlists)
})
// to add song to playlist
router.post('/:playlistId', requireAuth, isAuthorizedPlaylist, async (req, res) => {
    let { playlistId } = req.params;

    let { songId } = req.body;

    // const playlist = await Playlist.findByPk(playlistId);
    const song = await Song.findByPk(songId)
    if (!song) {
        res.status(404);
        res.json({
            "message": "Song couldn't be found",
            "statusCode": 404
        })
    }
    const addSongToPlaylist = await SongsPlaylist.create({
        songId: songId,
        playlistId: playlistId

    })
    return res.json(addSongToPlaylist)
})
// to add a playlist
router.post('/', requireAuth, validatePlaylist, async (req, res) => {
    let { name, imageUrl } = req.body

    const newPlaylist = await Playlist.create({
        userId: req.user.id,
        name,
        previewImage: imageUrl
    })
    return res.json(newPlaylist)
});


router.put('/:playlistId', validatePlaylist, requireAuth, isAuthorizedPlaylist, async (req, res) => {
    let { playlistId } = req.params;

    let { name, imageUrl } = req.body

    const playlist = await Playlist.findByPk(playlistId);

    playlist.name = name
    playlist.previewImage = imageUrl

    await playlist.save()
    return res.json(playlist)

})
// to delete playlist
router.delete('/:playlistId', requireAuth, isAuthorizedPlaylist, async (req, res) => {
    let { playlistId } = req.params;

    const playlist = await Playlist.findByPk(playlistId);
    // const songlist = await SongsPlaylist.findAll({
    //     where: {
    //         playlistId: playlist.id
    //     }
    // })
    // if(songlist.length){
    //     for (let index = 0; index < songlist.length; index++) {
    //         const element = songlist[index];
    //         await element.destroy()
    //     }

    // }
    await SongsPlaylist.destroy({
        where: {
            playlistId: playlist.id
        }
    })
    await playlist.destroy();
    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})




module.exports = router;
