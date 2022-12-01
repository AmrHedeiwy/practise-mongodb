const jwt = require('jsonwebtoken')
const User = require('../models/user')


const auth = async(req, res, next) => {
    try {
    const token = req.header('Authorization') // getting token of last login/sign-in
    const decode = jwt.verify(token, 'mysec')  // verfiying token 
    const user = await User.findOne({ _id: decode._id, 'tokens.token': token}) // finding user with their id and their token to later check if the token has not expired
    if(!user) {
        throw new Error('time expired, login again')
    }
    
    req.user = user  // used to gather the users information to be used if needed

    next()
} catch(e) {
    res.status(400).send(e.message)
}
}

module.exports = auth