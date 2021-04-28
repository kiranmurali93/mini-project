const jwt = require('jsonwebtoken');

const Admin = require('../models/admin')

var { JWT_SECRET } = require('../data/data.json');

var Middleware = function(req, res, next){
    const { token } = req.headers
    if (!token){
        return res.status(401).json({ error: ' Your are not signed in '})
    }
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        const { id } = payload;
        Admin.findById(id)
            .then((adminData) => {
                req.user = adminData
                console.log(adminData)
                next()
            })
            .catch((err) => console.log(err))
    })
}

module.exports = Middleware