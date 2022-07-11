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
        .withMessage('Please provide a vaild email')
        // .custom(async (value)  => {
        //     const foundUser = await User.findAll({
        //         where:{
        //             email: value
        //         }
        //     })
        //      console.log(foundUser)
        //         if (foundUser) {
        //             throw new Error ("User with that email already exists")

        //         } else return value
        // }),
        ,
    check('username')
        .exists({checkFalsy:true})
        .isLength({min:4})
        .withMessage('Please provide with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email'),
    check('password')
        .exists({checkFalsy:true})
        .isLength({min:6})
        .withMessage('Password must be 6 characters or more.'),
    check('firstName')
        .exists({checkFalsy:true})
        .withMessage('First Name is required'),
    check('lastName')
        .exists({checkFalsy:true})
        .withMessage('Last Name is required'),
    handleValidationErrors
]
router.get('/', async(req,res)=>{//delete this
    const users = await User.findAll()
    res.json(users)
})

router.post('/',validateSignUp, async (req,res)=>{
    const { firstName ,lastName ,email, password, username, isArtist} = req.body;
    const foundUserEmail = await User.findOne({
        where:{
            email: email
        }})
        if (foundUserEmail) {
            return res.json({
                "message": "User already exists",
                "statusCode": 403,
                "errors": {
                  "email": "User with that email already exists"
                }
              })
            }
    const foundUserUserName = await User.findOne({
                where:{
                    username: username
                }})
        if(foundUserUserName){
            return res.json({
                "message": "User already exists",
                "statusCode": 403,
                "errors": {
                  "username": "User with that username already exists"
                }
            })
        }
    const user = await User.signup({firstName ,lastName,email, username, password, isArtist});

    await setTokenCookie(res,user);

    return res.json({user})
});




module.exports= router;
