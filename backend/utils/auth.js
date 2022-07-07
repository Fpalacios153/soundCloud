const jwt = require('jsonwebtoken');
const {jwtConfig} = require('../config');
const {User} = require('../db/models')
const {Artist} = require('../db/models');
const {Album} = require('../db/models');
const {Song} = require('../db/models');
const {Comment} = require('../db/models');



const {secret, expiresIn}= jwtConfig;



// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
    // Create the token.
    const token = jwt.sign(
      { data: user.toSafeObject() },
      secret,
      { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Set the token cook
    res.cookie('token',token,{
        maxAge: expiresIn * 1000, // maxAge in milliseconds
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    });

    return token
};


const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;
    req.user = null;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
      if (err) {
        return next();
      }

      try {
        const { id } = jwtPayload.data;
        req.user = await User.scope('currentUser').findByPk(id);
      } catch (e) {
        res.clearCookie('token');
        return next();
      }

      if (!req.user) res.clearCookie('token');

      return next();
    });
  };

  const requireAuth = function (req, _res, next) {
    if (req.user) return next();

    const err = new Error('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.status = 401;
    return next(err);
  }

  const isAuthorized = async function(req, res, next){
    let {albumId} = req.params
    const album = await Album.findByPk(albumId)
    // const artist = album.artistId
    const validArtist = await album.getArtist()
    // console.log(validArtist.userId)
    if(validArtist.userId !== req.user.id){
      res.status(403)
      res.json({
        message: "Forbidden",
        "statusCode": 403
      })
    }
    else return next();
  }

  const isAuthorizedSong = async function(req, res, next){
    let {songId} = req.params

    const song = await Song.findByPk(songId)
    // const artistfromSong = song.artistId

    const validArtist = await song.getArtist()
    if(validArtist.userId !== req.user.id){
        res.status(403)
        res.json({
            message: "Forbidden",
            "statusCode": 403
          })
    }    else return next();
  }
  const isAuthorizedComment = async function(req, res, next){
    let {commentId} = req.params
    const comment = await Comment.findByPk(commentId)

  if(comment.userId !== req.user.id){
    res.status(403)
    res.json({
      message: "Forbidden",
      "statusCode": 403
    })
  }
}

  module.exports = { setTokenCookie, restoreUser, requireAuth,isAuthorized, isAuthorizedSong,isAuthorizedComment};
