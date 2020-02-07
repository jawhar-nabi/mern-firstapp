const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtkey = require('../../key').tokenKey;

// user model
const User = require('../../models/user');
let connected = require('../../models/user').isConnected;
//@route GET api/users
//@desc GET All User
//@access Public
router.get('/',(req,res)=>{
    User.find() 
        .then(User => res.json(User))
});

router.get('/:iduser',(req,res)=>{
  console.log('worked nodejs 2222 out of find : ',req.params.iduser)
  User.findById(req.params.iduser) 
      .then(User =>( res.json(User.lastname+User.firstname),console.log('2222 worked...'+User.lastname)))
});




//login route
router.post('/signin', async (req,res,err) => {
    const { email, password } = req.body;
    // check email
    const user = await User.findOne({ email });

    if (!user) return (res.json("user not found"));

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) return (res.json("Wrong password."));
    //User.isConnected.b=true ;
    {
      user.connected = true;
      res.json({
        id: user.id,
        name: user.firstname ,
        lastname: user.lastname });}
});


//@route POST api/users
//@desc POST All Users
//@access Public

//sign up route
router.post('/',(req,res)=>{
    const { body } = req;
    const {
      password
    } = body;
    let {
      email
    } = body;
    let newUser= new User({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    });
    if (!email) {
        return res.send({
          success: false,
          message: 'Error: Email cannot be blank.'
        });
      }
      if (!password) {
        return res.send({
          success: false,
          message: 'Error: Password cannot be blank.'
        });
      }
      email = email.toLowerCase();
      email = email.trim();
      // Steps:
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
        } else if (previousUsers.length > 0) {
          return res.send({
            success: false,
            message: 'Error: Account already exist.'
          });
        }
    });
    bcrypt.genSalt(10, (err,Salt)=>{
                bcrypt.hash(newUser.password, Salt,(err,hash)=>{
                    if(err){
                        console.log(err);
                    }
                    newUser.password=hash;
                    newUser.save()
                      .then(User =>{ 
                        jwt.sign(
                          {id: User.id},
                          jwtkey,
                          {expiresIn: 3600},
                          (err,token) =>{
                            if(err) throw err;
                            res.json(
                              {
                                token,
                              'user is here: ': User});
                            })

                      })
                      .catch(err => {
                          console.log(err);
                          res.status(400).json({success: false})
                          
                      })
                });
            });
    // newUser.save(err)
    //     .then(User => res.json(User))
    //     .catch(console.log(err+' error because not'))
        // newUser.save((err)=>{
        // if(err){
        //     console.log(err);
        //     console.log(newUser);
        //     console.log('save error 1925...');
        //     return;
        //     }else{
        //             req.flash('success','you are now registred');
        //             res.redirect('/login');
        //         }
        //     });

});

router.post('/changepassword', async (req,res)=>{
  let newpass = req.body.newpass;
  const oldpass = req.body.oldpass;
  const userid = req.body.userid;
  console.log('ancien : ', oldpass);
  console.log('new : ',newpass);
  const user = await User.findById(userid);

  const checkPassword = await bcrypt.compare(oldpass, user.password);
  if (!checkPassword) return (res.status(400).json('wrong password'));


  bcrypt.genSalt(10, (err,Salt)=>{
    bcrypt.hash(newpass, Salt,(err,hash)=>{
        if(err){
            console.log(err);
        }
        user.password=hash;
        console.log(newpass);
        user.save()
          .then( console.log('password changed successfully!!!'))
          })
        })

});


//change name
router.post('/changename', async (req,res)=>{
  const username = req.body.username;
  const lastname = req.body.lastname;
  const firstname = req.body.firstname;
  const userid = req.body.userid;
  const user = await User.findById(userid);

  if (username) {console.log('username is going to change'), user.username = username }
  if (firstname) {console.log('first is going to change'), user.firstname = firstname  }
  if (lastname) {console.log('last is going to change'), user.lastname = lastname }
  if(username || firstname || lastname){
  user.save()
    .then( console.log('information changed successfully!!!'))
  }
          
        

});


router.get('/account/:userid', function(req,res){
  User.findById(req.params.userid)
      .then(User => res.json(User))
  });

//@route DELETE api/users/:id
//@desc DELETE a User
//@access Public
router.delete('/:id',(req,res)=>{
    User.findById(req.params.id)
        .then(User => User.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));

    });


module.exports = router ;

