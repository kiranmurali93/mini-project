// dashboard details
const mongoose = require('mongoose')


const dashboardSchema = new mongoose.Schema({
    image:{
        type: String,
        required: true,
    },
    timestamps: true 
})

const Dashboard = mongoose.model('Dashboard', dashboardSchema)

module.exports = Dashboard