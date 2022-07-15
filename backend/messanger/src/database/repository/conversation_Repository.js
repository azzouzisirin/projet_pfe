const { ConversationModel } = require("../models");
const { APIError,BadRequestError } = require('../../utils/app-errors')

//Dealing with data base operations
class ConversationRepository {
 
 
    async CreateConversation({ userId, desc, img }){

        try {
            const Conversation = new ConversationModel({
                userId, desc, img
            })
    
            const ConversationResult = await Conversation.save();
            return ConversationResult;
            
        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Conversation')
        }
        
    }


     async posts(){
         try{
             return await ConversationModel.find();
         }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Get posts')
         }
    }
   
    async FindById(id){
        try{
            return await ConversationModel.findById(id);
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Conversation')
        }

    }

    async FindByCategory(category){

        try{
            const posts = await ConversationModel.find({ type: category});
             return posts;
            
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Category')
        }
    }

    async FindSelectedposts(selectedIds){
        try{
            const posts = await ConversationModel.find().where('_id').in(selectedIds.map(_id => _id)).exec();
            return posts;
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Conversation')
        }
       
    }
    
}

module.exports = ConversationRepository;