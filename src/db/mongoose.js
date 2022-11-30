const mongoose = require('mongoose')

// connection to mongodb database 
async function main() {
    try {
    await mongoose.connect('mongodb://127.0.0.1:27017/practice')
    console.log('connected to the database')
    } catch (e) {
        console.log('unable to connect to database')
    }
}

main()