const  Conversation = require('../database/models/Conversation');
const Message=require('../database/models/Message')
const  UserAuth = require('./middlewares/auth');
const axios = require('axios');


module.exports = (app) => {


    app.post("/addConv/:userId1/:userId2", async (req, res) => {
  
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
      }});

      app.get("/:userId", async (req, res) => {
        try {
          const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
          }).sort({createdAt:-1}); ;
          res.status(200).json(conversation);
        } catch (err) {
          res.status(500).json(err);
        } 
      }); 
      
      
      app.get("/LastConv/:userId", async (req, res) => {
        try {
          const conversation = await Conversation.findOne({
            members: { $in: [req.params.userId] },
          }).limit(1).sort({_id:-1});
          res.status(200).json(conversation._id);
        } catch (err) {
          res.status(500).json(err);
        } 
      }); 
       

      // get conv includes two userId
      app.get("/getUserConv/:conversationId/:userId", async (req, res) => {
        try {
          const conversation = await Conversation.findById(req.params.conversationId);
          const userId =req.params.userId;
          if (conversation.members[0]===userId){

        
            res.status(200).json(conversation.members[1]);
          }else{
          
            res.status(200).json(conversation.members[0]);
        }} catch (err) {
          res.status(500).json(err);
        }
      }); 
      
      app.get("/find/:firstUserId/:secondUserId", async (req, res) => {
        try {
          const conversation = await Conversation.findOne({
            members: { $all: [req.params.firstUserId, req.params.secondUserId] },
          });
          res.status(200).json(conversation._id)
        } catch (err) {
          res.status(200).json(null);
        }
      });
//add

app.post("/", async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

app.get("/getALLmessage/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

}  