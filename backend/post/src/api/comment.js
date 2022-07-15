

const Commentaire=require('../database/models/Commentaire')
const Post=require('../database/models/Post')
//create a Commentaire
exports.createComment = async (req, res, next) => {

    const newCommentaire = new Commentaire({
     PostId: req.params.postId,
     userId: req.body.userId,
     username: req.body.username,
     body: req.body.body,
     img: req.body.img,
     parentId: req.body.parentId
   });
   const post = await Post.findById(req.params.postId);
       try {
         
         const savedCommentaire = await newCommentaire.save();
         const commentId=savedCommentaire._id.toString()
         await post.updateOne({ $push: {
           Commentaires :commentId,
         },
       });
   
         res.status(200).json(savedCommentaire);
       } catch (err) {
         res.status(500).json(err);
       }
      }
   
   //get a comment
      exports.getComment = async (req, res, next) => {
       try {
           const commentaires = await Commentaire.find({PostId:req.params.postId});
           res.status(200).json(commentaires);
         } catch (err) {
           res.status(500).json(err);
         }
      }
   
   
      //get like post
     exports.getlikepost = async (req, res) => {
       try {
         const post = await Post.findById(req.params.postId);
         const Likes = await Promise.all(
           post.likes.map((LikesId) => {
             return User.findById(LikesId);
           })
         );
         let userLikeList = [];
         Likes.map((like) => {
           const { _id, username, profilePicture,role } = like;
           userLikeList.push({ _id, username, profilePicture,role });
         });
         res.status(200).json(userLikeList)
       
       } catch (err) {
         res.status(500).json(err);
   }}
   //update a comment
      exports.updateComment = async (req, res, next) => {
       try {
           const Comment = await Commentaire.findById(req.params.id);
           if (Comment.userId === req.body.userId) {
             
             await Comment.updateOne({ $set: req.body });
             res.status(200).json("the post has been updated");
           } else {
             res.status(403).json("you can update only your post");
           }
         } catch (err) {
           res.status(500).json(err);
         }
      }
      
   //delete a post
      exports.deletComment = async (req, res, next) => {
       
       try {
         
   
           await Commentaire.findOneAndDelete(req.params.CommentId);
           res.status(200).json("The comment has been deleted");
        
       } catch (err) {
         res.status(500).json(err);
       }
   }
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
   //commantaire
   exports.commantairePost = async (req, res, next) => {
       try {
           const post = await Post.findById(req.params.id);
           
             await post.updateOne({ $push: { Commentaire:[req.body.userId, req.body.desc] } });
             res.status(200).json("The post has been Commentaire");
           
         } catch (err) {
           res.status(500).json(err);
         }
     
   } 
   //get timeline posts
   exports.gettimelinePost = async (req, res, next) => {
     try {
       const currentUser = await User.findById(req.params.userId);
       const userPosts = await Post.find({ userId: currentUser._id });
       const friendPosts = await Promise.all(
         currentUser.followings.map((friendId) => {
           return Post.find({ userId: friendId });
         })
       );
       res.status(200).json(userPosts.concat(...friendPosts));
     } catch (err) {
       res.status(500).json(err);
     }
     
   }
   //get user's all posts
   exports.getAllPostUser = async (req, res, next) => {
     try {
       const user = await User.findOne({ _id: req.params._id });
       const posts = await Post.find({ userId: user._id });
       res.status(200).json(posts);
     } catch (err) {
       res.status(500).json(err);
     }
       }