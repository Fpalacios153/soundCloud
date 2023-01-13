
const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3')


const router = express.Router();


const validateSignUp = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a vaild email'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('First Name is required'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Last Name is required'),
    handleValidationErrors
]

router.get('/', async (req, res) => {//delete this
    const users = await User.findAll()
    res.json(users)
})

router.post('/', validateSignUp, async (req, res, next) => {
    const { firstName, lastName, email, password, username, isArtist } = req.body;
    const foundUserEmail = await User.findOne({
        where: {
            email: email
        }
    })
    if (foundUserEmail) {
        const err = new Error('User already exists')
        err.status = 403
        err.errors = []
        err.errors.push('User with that email already exists')
        return next(err)
    }
    const foundUserUserName = await User.findOne({
        where: {
            username: username
        }
    })
    if (foundUserUserName) {
        const err = new Error('User already exists')
        err.status = 403
        err.errors = []
        err.errors.push("User with that username already exists")
        return next(err)
    }
    const user = await User.signup({ firstName, lastName, email, username, password, isArtist });

    await setTokenCookie(res, user);

    return res.json({ user })
});




module.exports = router;
