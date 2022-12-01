const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// user schema defining name, email, password and tokens
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
        // validator
    },
    age: {
        type: Number,
        default: 0
    },
    password: {
        type: String,
        requied: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// called when stringfied to not let the user see the password and unnecessary data
userSchema.methods.toJSON = function() {
    const userObject = this.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

// creating a token when users sign in or login 
userSchema.methods.createToken = async function() {
    const token = jwt.sign({ _id: this._id.toString() }, 'mysec')   
    this.tokens.push({ token })
    await this.save()
    
    return token
}

// finding a users account using email and password
userSchema.statics.findByCredentials = async function( email, password ) {
    const user = await User.findOne({ email })  // finding user with email
    
    if(!user) {
        throw new Error('incorrect email')
    }
    
    const isValid = await bcrypt.compare(password, user.password) // comparing hashed password with password provided by the user
    if(!isValid) {
        throw new Error('incorrect pass')
    }

    return user
}

// before data is saved we check if the password is modified and hash it if so
userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
         this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})


const User = mongoose.model('User', userSchema)
module.exports = User