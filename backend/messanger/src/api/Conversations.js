const conversationservice = require('../services/conversationService');
const  UserAuth = require('./middlewares/auth');


    
    const service = new conversationservice();

    exports.createConversation = async (req, res, next) => {
        const  member= [req.params.userId1, req.params.userId2];

  const conversation = await Conversation.findOne({
    members: { $all: member },
  })
  if (!conversation){
  const newPost = new Conversation({
  
    members: member,
  }); 
  try { 
    const savedPost = await newPost.save();
    res.status(200).json(savedPost._id);
  } catch (err) {
    res.status(500).json(err);
  }
}else{
  res.status(200).json("conversation existe");
}
    };

  