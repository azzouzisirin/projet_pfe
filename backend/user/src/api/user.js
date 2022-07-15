const userService = require('../services/user-service');
const  UserAuth = require('./middlewares/auth');
const User=require('../database/models/user')

    
    const service = new userService();

    exports.register = async (req, res, next) => {
        try {
            const {username,CIN, email, password, profilePicture,coverPicture,desc,numero, city} = req.body;
            const { data } = await service.SignUp({ username,CIN, email, password, profilePicture,coverPicture,desc,numero, city}); 
           return res.json(data);
            
        } catch (err) {
            next(err)
        }
 
    };
    exports.registerResult = async (req, res, next) => {
      try {
          const { data } = await service.SignRest({
            username: "sirine",
            CIN:"000", 
            email:"sirine@gmail.com",
             password:"sirine111",
            role:"administrateur"}); 
         return res.json(data);
          
      } catch (err) {
          next(err)
      }

  };

    exports.findUserId = async (req, res, next) => {
      try {
        const currentUser = await User.findById(req.params.userId);

         return res.json(currentUser);
          
      } catch (err) {
          next(err) 
      }

  };
  exports.findListUser = async (req, res, next) => {
    try {
      const currentUser = await User.find({_id:req.body.likes});

       return res.json(currentUser);
        
    } catch (err) {
        next(err)
    }

};


    exports.login = async (req, res, next) => {
        try {
            
            const { email, password } = req.body;
            const { data } = await service.SignIn({ email, password});
    
            return res.json(data);

        } catch (err) {
            next(err)
        } 


    };
    exports.GetProfil = async (req, res, next) => {
      const userId = req.params.userId;
      const username = req.query.username;
      try {
        const user = userId
          ? await User.findById(userId)
          : await User.findOne({ username: username });
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
      } catch (err) {
        res.status(500).json(err);
      }

    };
    exports.searchUserById = async (req, res, next) => {
      const userId = req.query.userId;
      const username = req.query.username;
      try {
        const user = await User.findById(userId);
  
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
      } catch (err) {
        res.status(500).json(err);
      }

  };
    exports.search = async (req, res, next) => {
        const users = await User.find({role:["Enseignant","Étudiant","administrateur"] });
    const { q } = req.query;

    const keys = ["username", "role"];
  
    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(q))
      );
    };
  
    q ? res.json(search(users).slice(0, 10)) : res.json(users.slice(0, 10));
  

    };
    
    exports.searchVisiteur = async (req, res, next) => {
      const users = await User.find({role:"visiteur"});
  const { q } = req.query;

  const keys = ["username", "role"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(q))
    );
  };

  q ? res.json(search(users).slice(0, 10)) : res.json(users.slice(0, 10));


  };
    exports.searchkey = async (req, res, next) => {
       
        let data = await User.find(
            {
                "$or":[
                    {username:{$regex:req.params.key}},
                    {role:{$regex:req.params.key}}
                ]
            }
            )

            res.send(data )
    };
    exports.allUsers = async (req, res, next) => {
       
      
    
      const users = await User.find({role:["Enseignant","Étudiant","administrateur"] });
    
      res.send(users);
    };
    exports.Following = async (req, res, next) => {
        if (req.body.userId !== req.params.id) {
            try {
              const user = await User.findById(req.params.id);
              const currentUser = await User.findById(req.body.userId);
              if (!user.followers.includes(req.body.userId)) {
                    res.status(200).json({data:"false"});
              } else {
                res.status(403).json({data:"true"});
              }
            } catch (err) {
              res.status(500).json(err);
            }
          } else {
            res.status(403).json("you cant follow yourself");
          }

    };
    exports.updateprofile = async (req, res, next) => {
     
          try {
            const user = await User.findByIdAndUpdate(req.params.id, {
              $set: req.body,
            });
            res.status(200).json("Account has been updated");
          } catch (err) {
            return res.status(500).json(err);
          }

    };
    exports.updateUser=  async (req, res, next) => {
      try {
      const currentUser = await User.findById(req.params.userId);

      await currentUser.updateOne({ $push: { followings: req.params.PageId } });
      res.status(200).json(currentUser);
    } catch (err) {
      res.status(500).json(err);
    }
    }
    exports.followUser = async (req, res, next) => {
      if (req.body.userId !== req.params.id) {
        try {
          const user = await User.findById(req.params.id);
          const currentUser = await User.findById(req.body.userId);
          if (!user.followers.includes(req.body.userId)) {
            await user.updateOne({ $push: { followers: req.body.userId } });
            await currentUser.updateOne({ $push: { followings: req.params.id } });
            res.status(200).json("user has been followed");
          } else {
            res.status(403).json("you allready follow this user");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("you cant follow yourself");
      }

    };

    exports.followPage = async (req, res, next) => {
      if (req.body.userId !== req.params.id) {
        try {
          const user = await User.findById(req.body.userId );
          if (!user.likes.includes(req.params.id)) {
            await user.updateOne({ $push: { likes: req.params.id } });
            res.status(200).json("user has been followed");
          } else {
            res.status(403).json("you allready follow this user");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("you cant follow yourself");
      }

    };
    exports.unfollowPage = async (req, res, next) => {
        if (req.body.userId !== req.params.id) {
            try {
              const user = await User.findById(req.body.userId);
              if (user.likes.includes( req.params.id)) {
                await user.updateOne({ $pull: { likes: req.params.id} });
                res.status(200).json("user has been unfollowed");
              } else {
                res.status(403).json("you dont follow this user");
              }
            } catch (err) {
              res.status(500).json(err);
            }
          } else {
            res.status(403).json("you cant unfollow yourself");
          }

    };
    exports.unfollowUser = async (req, res, next) => {
      if (req.body.userId !== req.params.id) {
          try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
              await user.updateOne({ $pull: { followers: req.body.userId } });
              await currentUser.updateOne({ $pull: { followings: req.params.id } });
              res.status(200).json("user has been unfollowed");
            } else {
              res.status(403).json("you dont follow this user");
            }
          } catch (err) {
            res.status(500).json(err);
          }
        } else {
          res.status(403).json("you cant unfollow yourself");
        }

  };
  //get friends


    exports.getuserByUsername = async (req, res, next) => {
        const users = await User.find({username:req.params.username,role:["Enseignant","Étudiant","administrateur"]});
        if(users.role=="visiteur"){

        }
        res.status(200).json(users);

    };
    //get friends
    exports.getfriends = async (req, res) => {
   
      try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
          user.followings.map((friendId) => {
            return User.findById(friendId);
          })
        );
        let friendList = [];
        friends.map((friend) => {
          const { _id, username, profilePicture } = friend;
          friendList.push({ _id, username, profilePicture });
        });
        res.status(200).json(friendList)
      } catch (err) {
        res.status(500).json(err);
      }}

    exports.deleteUser = async (req, res, next) => {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }};
    
    exports.getterUser = async (req, res, next) => {
        const user= await User.findOne({email:req.body.email});
        res.status(200).json(user);

    };

    exports.getUsersVisiteur = async (req, res, next) => {
      const users = await User.find({role:"visiteur"});
      res.status(200).json({
       data: users
      });
     }
     exports.acceptEtudiant = async (req, res, next) => {
  
    
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: {
            role :"Étudiant"
          },
        });
        res.status(200).json("Account has been updated");
      } catch (err) {
        return res.status(500).json(err);
      }}

      exports.acceptEnseignant = async (req, res, next) => {
  
    
        try {
          const user = await User.findByIdAndUpdate(req.params.id, {
            $set: {
              role :"Enseignant"
            },
          });
          res.status(200).json("Account has been updated");
        } catch (err) {
          return res.status(500).json(err);
        }}

        exports.acceptadministrateur = async (req, res, next) => {
  
     
          try {
            const user = await User.findByIdAndUpdate(req.params.id, {
              $set: {
                role :"administrateur"
              },
            });
            res.status(200).json("Account has been updated");
          } catch (err) {
            return res.status(500).json(err);
          }}
          exports.deleteUser = async (req, res, next) => {
            try {
              await User.findByIdAndDelete(req.params.id);
              res.status(200).json("Account has been deleted");
            } catch (err) {
              return res.status(500).json(err);
            }}

            exports.getUsers = async (req, res, next) => {
              const users = await User.find({});
              res.status(200).json(
                users
            );
             }