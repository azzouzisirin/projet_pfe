const { ConversationRepository } = require("../database");
const { FormateData } = require("../utils");
const { APIError } = require('../utils/app-errors');

// All Business logic will be here
class postservice {

    constructor(){
        this.repository = new ConversationRepository();
    }

    async CreateConversation(ConversationInputs){
        try{
            const ConversationResult = await this.repository.CreateConversation(ConversationInputs)
            return FormateData(ConversationResult);
        }catch(err){
            throw new APIError('Data Not found')
        }
    }
    
    async Getposts(){
        try{
            const posts = await this.repository.posts();
    
            let categories = {};
    
            posts.map(({ type }) => {
                categories[type] = type;
            });
            
            return FormateData({
                posts,
                categories:  Object.keys(categories) ,
            })

        }catch(err){
            throw new APIError('Data Not found')
        }
    }


    async GetConversationDescription(ConversationId){
        try {
            const Conversation = await this.repository.FindById(ConversationId);
            return FormateData(Conversation)
        } catch (err) {
            throw new APIError('Data Not found')
        }
    }

    async GetpostsByCategory(category){
        try {
            const posts = await this.repository.FindByCategory(category);
            return FormateData(posts)
        } catch (err) {
            throw new APIError('Data Not found')
        }

    }

    async GetSelectedposts(selectedIds){
        try {
            const posts = await this.repository.FindSelectedposts(selectedIds);
            return FormateData(posts);
        } catch (err) {
            throw new APIError('Data Not found')
        }
    }

    async GetConversationById(ConversationId){
        try {
            return await this.repository.FindById(ConversationId);
        } catch (err) {
            throw new APIError('Data Not found')
        }
    }

    async GetConversationPayload(userId, { ConversationId, qty}, event) {
        
        const Conversation = await this.repository.FindById(ConversationId);

        if(Conversation){
            const payload = {
                event: event,
                data: { userId, Conversation, qty}
            }
            return FormateData(payload)
        }else{
            return FormateData({error: 'No Conversation available'})
        }


    }
     
}

module.exports = postservice;