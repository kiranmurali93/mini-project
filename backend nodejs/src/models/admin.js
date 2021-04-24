// admin details
const mongoose = require('mongoose')


const adminSchema = new mongoose.Schema({
    adminName:{
        type: String,
        required: true,
    },
    designation:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin