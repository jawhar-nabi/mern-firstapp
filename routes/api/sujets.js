const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const objectID = mongoose.Types.ObjectId;

// Sujet model
const Sujet = require('../../models/sujet');
const Comment = require('../../models/sujet').comments;

const comm = Sujet.comments;
//@route GET api/users
//@desc GET All User
//@access Public
router.get('/',(req,res)=>{
    Sujet.find().populate('author')
        .sort({date: -1})
        .then(Sujet => res.json(Sujet))

});
router.get('/recent',(req,res)=>{
    Sujet.find()
        .sort({date: -1})
        .then(Sujet => res.json(Sujet))

});

router.get('/mostcommented',(req,res)=>{
    Sujet.find()
        .sort({totalcomments: -1})
        .then(Sujet => res.json(Sujet))

});

router.get('/byuserid/:userid', function(req,res){
    Sujet.find({author: req.params.userid})
        .then(Sujet => res.json(Sujet))
    });


router.get('/affich-sujet/:idsujet', function(req,res){
    //const {id} = req.body;
    const id  = req.params.idsujet;
    //var findid = req.param('idsujet');
    console.log('wezza', id  );
    Sujet.findById(req.params.idsujet).populate('author')
        .then(Sujet => res.json(Sujet), console.log('sujet found'))
    });


//Upvoting a comment
router.post('/upvote/:idsujet/',(req,res)=>{
    console.log('sujet id : ', req.params.idsujet);
    console.log('com id : ', req.body.comid);
    console.log('user id : ', req.body.userid);

    Sujet.findById(req.params.idsujet)
        .then( Sujet => {
            let comment = Sujet.comments.find(comm => comm._id.toString() === req.body.comid)
            var b = !!comment.upvotes.find(vote => vote.toString() === req.body.userid)
            if(b){
            comment.upvotes = comment.upvotes.filter(arr=> arr !== req.body.userid) ;
            console.log('comment', comment.upvotes);
            Sujet.save(comment);
            }  
            else{          
            comment.upvotes.push(req.body.userid);
            console.log('comment', comment.upvotes);
            Sujet.save(comment);
            }
        })
    })

//downvoting a comment
router.post('/downvote/:idsujet/',(req,res)=>{
    console.log('sujet id : ', req.params.idsujet);
    console.log('com id : ', req.body.comid);
    console.log('user id : ', req.body.userid);

    Sujet.findById(req.params.idsujet)
        .then( Sujet => {
            let comment = Sujet.comments.find(comm => comm._id.toString() === req.body.comid)
            var b = !!comment.downvotes.find(vote => vote.toString() === req.body.userid)
            if(b){
            comment.downvotes = comment.downvotes.filter(arr=> arr !== req.body.userid) ;
            console.log('comment', comment.downvotes);
            Sujet.save(comment);
            }  
            else{          
            comment.downvotes.push(req.body.userid);
            console.log('comment', comment.downvotes);
            Sujet.save(comment);
            }
        })
    })


router.post('/addcomment/:idsujet',(req,res)=>{
    //var ArrayOfComments=[];
   // const user = JSON.parse(localStorage.getItem('token'));
     var comm=[];
    const comment ={"date": req.body.date,"user": req.body.name,"content": req.body.commentaire,"upvotes":[],"downvotes":[]};
    console.log('rr'+ JSON.stringify(comment))
    console.log('user is this user : ',req.body.name);

    // Sujet.findOne({_id: req.params.idsujet})
    //     .then(Sujet =>( console.log(Sujet.comments), comm = Sujet.comments ,console.log('comm is : ', comm),
    //     comm.push(comment), console.log('new comm is : ', comm),Sujet.comments= comm, console.log(Sujet)))

    Sujet.findOne({_id: req.params.idsujet}, (err,res) => {
        if(!res){console.log('error occured')}
        else{
            console.log(res.comments);
            comm = res.comments ;
            console.log('comm is : ', comm);
            comm.push(comment);
            console.log('new comm is : ', comm);
            res.totalcomments += 1;
            res.comments= comm; 
            console.log(res);
            res.save(function(err) {
                if (err)
                  console.log('error...')
                else
                  console.log('success')
              });          
        }



        // .then(Sujet =>( console.log(Sujet.comments), comm = Sujet.comments ,console.log('comm is : ', comm),
        // comm.push(comment), console.log('new comm is : ', comm),Sujet.comments= comm, console.log(Sujet)))
    })
    // newSujet =  Sujet.findOneAndUpdate({_id: req.params.idsujet},{comments: comm},{new: true})
    //    .then(Sujet =>( console.log('batta... ',comm), console.log(Sujet)))
           //Sujet => res.json(Sujet.comm), console.log('sujet'+req.params.idsujet+' update: {comment added}'))
    // var newSujet = new Sujet({
    //     comments: comm

    // });
    // var newSujet = new Sujet({})
    // console.log('new sujet is :  ', newSujet );
   //newSujet.save().then(Sujet => res.json(Sujet+ 'success... 200Ok...'));

});


//@route POST api/users
//@desc POST All Users
//@access Public
router.post('/',(req,res)=>{
    const newSujet= new Sujet({
        title: req.body.title,
        text: req.body.text,
        date: req.body.date,
        author: req.body.id,
        totalcomments: 0,
        comments: req.body.comments
    });

    newSujet.save().then(Sujet => res.json(Sujet+ 'success... 200Ok...'));

});

//@route DELETE api/users/:id
//@desc DELETE a User
//@access Public
router.delete('/delete-sujet/:id',(req,res)=>{
    Sujet.findById(req.params.id)
        .then(Sujet => Sujet.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));

    });

router.post('/delete-commentaire/:idsujet/',(req,res)=>{
    console.log('this worked nodejs...');
    Sujet.findOne({_id: req.params.idsujet})
   
                .then(Sujet =>{
            let fc = Sujet.comments.filter(com => com._id.toString() !== req.body.commentaireid.toString())
           // var filtered = Sujet.comments.filter(comm => comm!==fc);
           console.log('fcccccc',fc);
           console.log(req.body.commentaireid);
           
            Sujet.comments = fc;
            Sujet.totalcomments -=1;
            Sujet.save()
            res.json(Sujet.comments) 
       })
        })


    

module.exports = router ;