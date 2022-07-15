const { messageRepository } = require("../database");
const { FormateData } = require("../utils");
const { APIError } = require('../utils/app-errors');

// All Business logic will be here
class postservice {
 
    constructor(){
        this.repository = new messageRepository();
    }

    async Createmessage(messageInputs){
        try{
            const messageResult = await this.repository.Createmessage(messageInputs)
            return FormateData(messageResult);
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


    async GetmessageDescription(messageId){
        try {
            const message = await this.repository.FindById(messageId);
            return FormateData(message)
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

    async GetmessageById(messageId){
        try {
            return await this.repository.FindById(messageId);
        } catch (err) {
            throw new APIError('Data Not found')
        }
    }

    async GetmessagePayload(userId, { messageId, qty}, event) {
        
        const message = await this.repository.FindById(messageId);

        if(message){
            const payload = {
                event: event,
                data: { userId, message, qty}
            }
            return FormateData(payload)
        }else{
            return FormateData({error: 'No message available'})
        }


    }
     
}

module.exports = postservice;