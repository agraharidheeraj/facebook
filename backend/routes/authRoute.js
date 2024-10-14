const express = require('express');
const { registerUser, loginUser, logout } = require('../controllers/authController');
const passport = require('passport');
const { generateToken } = require('../utils/generateToken');
const router = express.Router();



router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/logout', logout)



//google oauth routes
router.get('/google',passport.authenticate('google',{
    scope: ['profile', 'email ']
}))

//google callback routes
router.get('/google/callback', passport.authenticate('google', {failureRedirect: `${process.env.FRONTEND_URL}/user-login`, session:false}),
 (req,res) =>{ 
    const accessToken = generateToken(req?.user);
    res.cookie("auth_token",accessToken,{
        httpOnly: true,
        sameSite:"none",
        secure:true
    })
   res.redirect(`${process.env.FRONTEND_URL}`)
 }
)

module.exports = router;