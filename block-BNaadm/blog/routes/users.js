var express = require('express');
var router = express.Router();

var Article = require('../modals/article')
var Comment = require('../modals/comment')
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/new' ,(req , res) =>{
  res.render('articleForm')
})

router.post('/' ,(req ,res ,next) =>{
  //req.body.tag = req.body.tag.split(' ')
  Article.create(req.body , (err ,createArticle) => {
    console.log(createArticle)
    if(err) return next(err)
    res.redirect('/users/new')

  })
})


router.get('/' ,(req ,res ,next) => {
  Article.find({} ,(err ,articles) => {
    if(err) return next(err)
    res.render('articles' ,{articles :articles})
  })
})

router.get('/:id' ,(req ,res ,next) => {
  Article.findById(req.params.id ,(err ,article) => {
    console.log(article)
    if(err) return next(err)
    Comment.find({articleId : req.params.id} ,(err ,comment) => {
      res.render('singleArticle' ,{article ,comment})
    })
    
  })
})


router.get('/:id/edit' ,(req ,res ,next) => {
  Article.findById(req.params.id ,(err ,UpdateArticle) => {
    if(err) return next(err)
    res.render('editArticle' ,{UpdateArticle :UpdateArticle})
    // res.redirect('/users/' +req.params.id)
  })
})

router.post('/:id' ,(req ,res ,next) => {
  Article.findByIdAndUpdate(req.params.id ,req.body,(err ,UpdateArticle) => {
    if(err) return next(err)
     res.redirect('/users/' +req.params.id)
  })
})

//delete
router.get('/:id/delete' ,(req ,res ,next) => {
  Article.findByIdAndDelete(req.params.id ,(err ,deleteArticle) => {
    console.log(deleteArticle)
    if(err) return next(err)
    res.redirect('/users')
  })
})


// likes

router.get('/:id/likes' ,(req ,res ,next) => {
  var id  = req.params.id
  Article.findByIdAndUpdate(id ,{$inc :{likes : 1}},(err ,article) => {
    console.log(article)
    
    //if(err) return next(err)
    res.redirect('/users/' + id)
  })
})


//dislikes

router.get('/:id/dislikes' ,(req ,res ,next) => {
  var id  = req.params.id
  Article.findByIdAndUpdate(id ,{$inc :{likes : -1}},(err ,article) => {
    console.log(article)
    
    //if(err) return next(err)
    res.redirect('/users/' + id)
  })
})


//add comment
router.post('/:id/comments',(req ,res ,next) =>{
 req.body.articleId =req.params.id;
 Comment.create(req.body ,(err ,comments) =>{
   console.log(comments)
   if(err) return next(err);
   res.redirect('/users/' + req.params.id)
 })
})


module.exports = router;
