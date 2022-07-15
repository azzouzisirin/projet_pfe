const  Post = require('./posts');
const  UserAuth = require('./middlewares/auth');
const CommentController=require('./comment')

module.exports = (app) => {
  

    app.post('/newPost',Post.createPost);
    app.post('/:id',Post.getPost);
    app.put('/:id',Post.updatePost);
    app.delete('/:id',Post.deletePost);
    app.post('/likes/:postId', Post.getlikepost);
    app.put('/:id/like',  Post.likePost);
    app.post('/timeline/:userId',  Post.gettimelinePost);

    app.post('/post_profile/:_id',Post.getAllPostUser);
    app.put('/:id/commantaire',Post.commantairePost);
    app.put('/deletPostComment/:CommentId',Post.DeletcommantairePost);

     
          app.post('/newcomment/:postId', CommentController.createComment);
    app.get('/getcomment/:postId', CommentController.getComment);
    
    app.put('/updateComment/:id', CommentController.updateComment);
    app.delete('/deletComment/:CommentId', CommentController.deletComment);
    
}