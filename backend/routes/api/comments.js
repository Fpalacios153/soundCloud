const express = require('express')

const {Song} = require('../../db/models');
const {Comment} = require('../../db/models');
const {requireAuth, isAuthorizedComment} = require('../../utils/auth');
const {check} = require('express-validator');
const{handleValidationErrors} = require('../../utils/validation');


const router = express.Router();
const validateComments =[
    check('body')
        .exists({checkFalsy:true})
        .withMessage('Comment body text is required'),

    handleValidationErrors
]


router.get('/:songId',async(req, res)=>{

    let {songId} = req.params;

    const commentsBySongId = await Comment.findAll({
        where:{
            songId : songId
        }
    })
    res.json(commentsBySongId)

});

router.post('/:songId',requireAuth,validateComments, async(req, res)=>{
    let {songId} =req.params;

    let {body}=req.body

    const song = await Song.findByPk(songId);
    if(!song){
        res.status(404)
        res.json({
                message: "Song couldn't be found",
                "statusCode": 404
              })
    }
     const newSong = await song.createComment({
        userId: req.user.id,
        songId: songId,
        body
    })
    res.json(newSong)
})

router.put('/:commentId',validateComments,requireAuth, async(req,res)=>{
    let {commentId} = req.params;
    let {body} =req.body

    const comment = await Comment.findByPk(commentId);

    if(!comment){
        res.status(404);
        res.json({
            message: "Comment couldn't be found",
            "statusCode": 404
          })
    }

    comment.body = body
    await comment.save()
    return res.json(comment)
})

router.delete('/:commentId',validateComments,requireAuth,isAuthorizedComment,async (req,res)=>{

    let {commentId} = req.params;
    const comment = await Comment.findByPk(commentId);

    if(!comment){
        res.status(404);
        res.json({
            message: "Comment couldn't be found",
            "statusCode": 404
          })
    }

    await comment.destroy()
    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })

})

module.exports= router;
