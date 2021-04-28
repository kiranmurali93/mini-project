// admin login, register routes

var express = require("express");
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// make a folder named data in src
// make a data.json file and give the value for JWT_SECRET

var { JWT_SECRET } = require('../data/data.json');

var router = express.Router();

var Admin = require('../models/admin');

// middleware
const adminMiddleware = require('../middleware/adminMiddleware')

router.post('/test', (req, res)=>{
    res.send(req.body)
})

router.post('/admin/register', (req, res) =>{
    const { adminName, designation, password } = req.body;
    console.log(adminName, designation, password)
  if (!adminName || !designation || !password) {
    return res.status(422).json({ error: 'please add all the fields' });
  }
  Admin.findOne({ designation })
    .then((savedAdmin) => {
      if (savedAdmin) {
        return res.status(422).json({ error: 'Admin already exists' });
      }
      bcrypt.hash(password, 15)
        .then((hashedPassword) => {
          const admin = new Admin({
            designation,
            password: hashedPassword,
            adminName,
          });
          admin.save()
            .then((admin) => {
              res.json({ message: 'saved sucessfully' });
            })
            .catch((err) => console.log(err));
        });
    });
})

router.post('/admin/login',(req, res) =>{
  const { adminName, password } = req.body;
  if (!adminName || !password) {
    res.status(422).json({ error: 'Enter the required details' });
  }
  Admin.findOne({ adminName })
    .then((savedAdmin) => {
      if (!savedAdmin) {
        res.status(422).json({ error: 'Not registered user' });
      }
      bcrypt.compare(password, savedAdmin.password)
        .then((doMatch) => {
          if (doMatch) {
            // res.json({ message: 'Successfully signedin' });
            const token = jwt.sign({ id: savedAdmin._id }, JWT_SECRET);
            const { _id, adminName } = savedAdmin;
            res.json({ token, user: { _id, adminName } });
          } else {
            res.status(422).json({ error: 'incorrect password' });
          }
        })
        .catch((err) => console.log(err));
    });
});

router.get('/admin/dashboard', adminMiddleware,(req, res)=>{
  res.send(req.user)
})

module.exports = router;