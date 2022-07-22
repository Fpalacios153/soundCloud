const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const songsRouter = require('./songs.js');
const albumsRouter = require('./albums.js');
const commentsRouter = require('./comments');
const artistsRouter = require('./artists');
const playlistsRouter = require('./playlists');
const { restoreUser } = require('../../utils/auth');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/songs',songsRouter)

router.use('/albums',albumsRouter)

router.use('/comments',commentsRouter)

router.use('/artists',artistsRouter)

router.use('/playlists',playlistsRouter)


// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
//   });



module.exports =router;
