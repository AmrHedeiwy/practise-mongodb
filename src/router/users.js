const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../auth/authentication')


router.post('/users/sign-up', async(req, res) => {
   const newUser = new User(req.body)

   try {
     const token = await newUser.createToken()
     res.status(201).send({newUser, token}) 
   } catch(e) {
    res.status(400).send(e)
   }
   
})

router.post('/users/login', async(req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.createToken()
    
    res.send({ user, token })
  } catch(e) {
    res.status(400).send(e.message)
  }
    
})

router.get('/users/profile', auth, async(req, res) => {
    res.send(req.user)
})
module.exports = router
