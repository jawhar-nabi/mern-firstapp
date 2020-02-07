const UserSession = require('../../models/UserSession');
const User = require('../../models/user');
const express = require('express');
const bcrypt = require('bcryptjs');
const passport=require('passport');
const router = express.Router();
const ErrorMsg = require('../../client/src/components/ErrorMsg');
// router.post('/api/signin', (req, res, next) => {
//     const { body } = req;
//     const {
//       password
//     } = body;
//     let {
//       email
//     } = body;
//     if (!email) {
//       return res.send({
//         success: false,
//         message: 'Error: Email cannot be blank.'
//       });
//     }
//     if (!password) {
//       return res.send({
//         success: false,
//         message: 'Error: Password cannot be blank.'
//       });
//     }
//     email = email.toLowerCase();
//     email = email.trim();
//     User.find({
//       email: email
//     }, (err, users) => {
//       if (err) {
//         console.log('err 2:', err);
//         return res.send({
//           success: false,
//           message: 'Error: server error'
//         });
//       }
//       if (users.length != 1) {
//         return res.send({
//           success: false,
//           message: 'Error: Invalid'
//         });
//       }
//       const user = users[0];
//       if (!user.validPassword(password)) {
//         return res.send({
//           success: false,
//           message: 'Error: Invalid'
//         });
//       }
//       // Otherwise correct user
//       const userSession = new UserSession();
//       userSession.userId = user._id;
//       userSession.save((err, doc) => {
//         if (err) {
//           console.log(err);
//           return res.send({
//             success: false,
//             message: 'Error: server error'
//           });
//         }
//         return res.send({
//           success: true,
//           message: 'Valid sign in',
//           token: doc._id
//         });
//       });
//     });
//   });

router.get('/',(req,res)=>{
    
    let newUser= new User({
        email: req.body.email,
        password: req.body.password
    });
    console.log('worked fine...')
    console.log(email,' 1925 ',password)
      email = email.toLowerCase();
      email = email.trim();
      // Steps:o

      // 1. Verify email doesn't exist
      // 2. Save
      User.find({
        email: email
      }, (err, previousUsers) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        } else if (previousUsers.length = 0) {
          // res.flash('/');
          // ErrorMsg('account don\'t exist');
        }else if (previousUsers.length = 1) {

            return res.send({
              success: true,
              message: 'login confirmed'
            });
        }
    });
});


module.exports = router;