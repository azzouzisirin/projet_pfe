const postservice = require('../services/post-service');

const Commentaire=require('../database/models/Commentaire')
const Post=require('../database/models/Post');
const { default: axios } = require('axios');
    
    const service = new postservice();

    exports.createPost =  async(req,res,next) => {
        
        try {
            const { userId, desc, img} = req.body; 
            // validation
            const { data } =  await service.CreateProduct({ userId, desc, img });
            return res.json(data);
            
        } catch (err) {
            next(err)    
        }
         
    }; 
 
    exports.getPost =  async(req,res,next) => {
      
        try {
            const post = await Post.findById(req.params.id);
            res.status(200).json(post);
          } catch (err) {
            res.status(500).json(err);
          }
    };
    exports.updatePost =  async(req,res,next) => {
        try {
            const post = await Post.findById(req.params.id);
            if (post.userId === req.body.userId) {
              await post.updateOne({ $set: req.body });
              res.status(200).json("the post has been updated");
            } else {
              res.status(403).json("you can update only your post");
            }
          } catch (err) {
            res.status(500).json(err);
          } 
         
    };
    exports.deletePost =  async(req,res,next) => {
        try {
            const post = await Post.findById(req.params.id);
          
      
            if (post.userId === req.body.userId) {
            
              await post.deleteOne();
              await   Commentaire.deleteMany({ PostId:req.params.id });
      
              res.status(200).json("the post has been deleted");
            } else {
              res.status(403).json("you can delete only your post");
            }
            await Commentaire.deleteMany({PostId:req.params.id})
          } catch (err) {
            res.status(500).json(err);
          }
         
    }; 
    exports.getlikepost = async (req, res) => {
      try {
        const post = await Post.findById(req.params.postId);
       
        res.status(200).json({"likes": post.likes})
      
      } catch (err) {
        res.status(500).json(err);
  }}
//like / dislike a post
exports.likePost = async (req, res, next) => {
  try { 
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
;
exports.gettimelinePost =  async(req,res,next) => {
  try{
      
         const userPosts = await Post.find({ userId: req.params.userId });
         const friendPosts = await Promise.all(
           req.body.followings.map((friendId) => {
             return Post.find({ userId: friendId });
           })
         );
        
     
         res.status(200).json(userPosts.concat(...friendPosts));
             }catch(err){
           res.status(500).json(err)
         }
      
 };
    exports.getAllPostUser =  async(req,res,next) => {
        try {
            const posts = await Post.find({ userId: req.params._id });
            res.status(200).json(posts);
          } catch (err) {
            res.status(500).json(err);
          }
         
    };
    exports.DeletcommantairePost =  async(req,res,next) => {
        try {
            const post = await Post.findById(req.body.PostId);
            
          
              await post.updateOne({ $pull: { Commentaires: req.params.CommentId } });
              res.status(200).json("The post has been disliked");
            
          } catch (err) {
            res.status(500).json(err);
          }
         
    };
    exports.commantairePost =  async(req,res,next) => {
      try {
        const post = await Post.findById(req.params.id);
        if (!post.Commentaire.includes(req.body.userId)) {
          await post.updateOne({ $push: { Commentaire: req.body.userId } });
          res.status(200).json("The post has been Commentaire");
        } 
      } catch (err) {
        res.status(500).json(err);
      }
       
  };
