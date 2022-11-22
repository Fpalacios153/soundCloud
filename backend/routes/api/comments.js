const express = require('express')

const { Song, Comment, User } = require('../../db/models');
const { requireAuth, isAuthorizedComment } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();
const validateComments = [
    check('body')
        .exists({ checkFalsy: true })
        .withMessage('Comment body text is required'),

    handleValidationErrors
]


router.get('/:songId', async (req, res) => {

    let { songId } = req.params;

    const song = await Song.findByPk(songId)
    if (!song) {
        res.status(404)
        res.json({
            message: "Song couldn't be found",
            "statusCode": 404
        })
    }
    const commentsBySongId = await song.getComments({
        order: [['createdAt', 'DESC']],
        include: {
            model: User,
            attributes: ['id', 'username']
        }
    })
    res.json(commentsBySongId)

});
router.get('/', async (req, res) => {

    const comments = await Comment.findAll();

    res.json(comments)

})

router.post('/:songId', requireAuth, validateComments, async (req, res) => {
    let { songId } = req.params;

    let { body } = req.body

    const song = await Song.findByPk(songId);
    if (!song) {
        res.status(404)
        res.json({
            message: "Song couldn't be found",
            "statusCode": 404
        })
    }
    const newSong = await song.createComment({
        userId: req.user.id,
        songId: songId,
        body,
    })
    const newComment = await Comment.findByPk(newSong.id, {
        include: {
            model: User,
            attributes: ['id', 'username']
        }
    })

    return res.json(newComment)
})

router.put('/:commentId', validateComments, requireAuth, isAuthorizedComment, async (req, res) => {
    let { commentId } = req.params;
    let { body } = req.body

    const comment = await Comment.findByPk(commentId);

    comment.body = body
    await comment.save()
    const newComment = await Comment.findByPk(commentId, {
        include: {
            model: User,
            attributes: ['id', 'username']
        }
    })
    return res.json(newComment)
})

router.delete('/:commentId', [requireAuth, isAuthorizedComment], async (req, res) => {

    let { commentId } = req.params;
    const comment = await Comment.findByPk(commentId)


    await comment.destroy();
    return res.json({
        message: "Successfully deleted",
        "statusCode": 200
    })

})

module.exports = router;
