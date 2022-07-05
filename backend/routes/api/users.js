const express = require('express')

const {setTokenCookie, requireAuth} = require('../../utils/auth');
const {User} = require('../../db/models');

const {check} = require('express-validator');
const{handleValidationErrors} = require('../../utils/validation');

const router=express.Router();


const validateSignUp =[
    check('email')
        .exists({checkFalsy:true})
        .isEmail()
        .withMessage('Please provide a vaild email'),
    check('username')
        .exists({checkFalsy:true})
        .isLength({min:4})
        .withMessage('Please provide wiht at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email'),
    check('password')
        .exists({checkFalsy:true})
        .isLength({min:6})
        .withMessage('Password must be 6 characters or more.'),

    handleValidationErrors

]
router.get('/', async(req,res)=>{//delete this
    const users = await User.findAll()
    console.log(users)

    res.json(users)
})

router.post('/',validateSignUp, async (req,res)=>{
    const { email, password, username} = req.body;
    const user = await User.signup({ email, username, password});

    await setTokenCookie(res,user);

    return res.json({user})
});




module.exports= router;
