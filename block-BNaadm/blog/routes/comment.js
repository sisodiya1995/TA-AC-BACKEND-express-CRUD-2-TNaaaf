
var express = require('express')
var router = express.Router()
var Comment = require('../modals/comment')


//update comment
router.get('/:id/edit' ,(req ,res,next) => {
    var id = req.params.id;
    Comment.findById(id ,(err ,comment) => {
        console.log(comment)
      if(err) return next(err)
      res.render('updatecomment' ,{comment :comment})
    })
   })



   router.post('/:id',(req ,res ,next) =>{
       var id = req.params.id;
       Comment.findByIdAndUpdate(id ,req.body ,(err ,updatecomment) =>{
           res.redirect('/users/' + updatecomment.articleId)
       })
   })

   // delete comment

   router.get('/:id/delete' ,(req,res ,next) => {
       var id = req.params.id;
       Comment.findByIdAndDelete(id ,(err ,deleteComment) =>{
           if (err) return next(err);
           Comment.deleteMany({articleId :deleteComment.id} ,(err ,deletearticle) => {
               if(err) return next(err)
            res.redirect('/users/' + deleteComment.articleId)
           })
          
       })

   })

   // likes

router.get('/:id/likes' ,(req ,res ,next) => {
    var id  = req.params.id
    Comment.findByIdAndUpdate(id ,{$inc :{likes : 1}},(err ,article) => {
      console.log(article)
      
      //if(err) return next(err)
      res.redirect('/users/' + article.articleId)
    })
  })
  
  
  //dislikes
  
  router.get('/:id/dislikes' ,(req ,res ,next) => {
    var id  = req.params.id
    Comment.findByIdAndUpdate(id ,{$inc :{likes : -1}},(err ,article) => {
      console.log(article)
      
      //if(err) return next(err)
      res.redirect('/users/' + article.articleId)
    })
  })
   module.exports = router; 