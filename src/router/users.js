const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.post('/users/sign-up', async(req, res) => {
   const newUser = new User(req.body)

   try {
     await newUser.createToken()
    res.send({newUser})
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
module.exports = router
