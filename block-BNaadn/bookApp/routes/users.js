var express = require('express');
var router = express.Router();
var Book = require('../modals/book')
var Author = require('../modals/author')
var Catagary = require('../modals/catagary')
/* GET users listing. */

// create

router.get('/new', (req, res, next) =>{
  
  res.render('bookform');
});

router.post('/', (req, res, next) =>{
  Book.create(req.body ,(err ,createbooks) => {
    console.log(err ,createbooks)
    res.redirect('/users/new')
  })
  
});

// read
router.get('/' ,(req ,res ,next) => {
  Book.find({} ,(err ,books) => {
    if(err) return next(err)
    res.render('Books' ,{books :books})
  })
})

// router.get('/:id' ,(req ,res ,next) => {
//   Book.findById(req.params.id ,(err ,book) => {
//     console.log(book)
//     if(err) return next(err)
//     res.render('singleBooks' ,{book :book})
    
//   })
// })

router.get('/:id' ,(req ,res ,next) => {
  var id = req.params.id
  Book.findById(id).populate('authors').populate('catagarys').exec((err ,book) =>{
    console.log(err ,book)
    if(err) return next(err)
    res.render('singleBooks' ,{book :book})
  })
})
//edit
router.get('/:id/edit' ,(req ,res ,next) => {
  Book.findById(req.params.id ,(err ,Updatebook) => {
    if(err) return next(err)
    res.render('editbook' ,{Updatebook :Updatebook})
    // res.redirect('/users/' +req.params.id)
  })
})

router.post('/:id' ,(req ,res ,next) => {
  Book.findByIdAndUpdate(req.params.id ,req.body,(err ,UpdateArticle) => {
    if(err) return next(err)
     res.redirect('/users/' +req.params.id)
  })
})

//delete
router.get('/:id/delete' ,(req ,res ,next) => {
  Book.findByIdAndDelete(req.params.id ,(err ,deleteBook) => {
    console.log(deleteBook)
    if(err) return next(err)
    res.redirect('/users')
  })
})


//add author
router.post('/:id/author',(req ,res ,next) =>{
  req.body.bookId =req.params.id;
  Author.create(req.body ,(err ,author) =>{
    console.log(author)
    if(err) return next(err);
    Book.findByIdAndUpdate(req.params.id,{$push:{authors  : author.id}} ,(err ,updatebook) =>{
     console.log(err ,updatebook)
     res.redirect('/users/' + req.params.id)
    })
    
  })
 })

 //add catagory
 router.post('/:id/catagary',(req ,res ,next) =>{
  //req.body.bookId =req.params.id;
  Catagary.create(req.body ,(err ,catagary) =>{
    console.log(catagary)
    if(err) return next(err);
    Book.findByIdAndUpdate(req.params.id,{$push:{catagarys : catagary.id}} ,(err ,updatebook) =>{
     console.log(err ,updatebook)
     res.redirect('/users/' + req.params.id)
    })
    
  })
 })
module.exports = router;
