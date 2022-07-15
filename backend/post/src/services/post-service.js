const { ProductRepository } = require("../database");
const { FormateData } = require("../utils");
const { APIError } = require('../utils/app-errors');

// All Business logic will be here
class postservice {
 
    constructor(){
        this.repository = new ProductRepository();
    }

    async CreateProduct(productInputs){
        try{
            const productResult = await this.repository.CreateProduct(productInputs)
            return FormateData(productResult);
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


    async GetProductDescription(productId){
        try {
            const product = await this.repository.FindById(productId);
            return FormateData(product)
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

    async GetProductById(productId){
        try {
            return await this.repository.FindById(productId);
        } catch (err) {
            throw new APIError('Data Not found')
        }
    }

    async GetProductPayload(userId, { productId, qty}, event) {
        
        const product = await this.repository.FindById(productId);

        if(product){
            const payload = {
                event: event,
                data: { userId, product, qty}
            }
            return FormateData(payload)
        }else{
            return FormateData({error: 'No product available'})
        }


    }
     
}

module.exports = postservice;