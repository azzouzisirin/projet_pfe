const { ProductRepository } = require("../database");
const { FormateData } = require("../utils");
const { APIError } = require('../utils/app-errors');

// All Business logic will be here
class pageservice {

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
    
    async Getpages(){
        try{
            const pages = await this.repository.pages();
    
            let categories = {};
    
            pages.map(({ type }) => {
                categories[type] = type;
            });
            
            return FormateData({
                pages,
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

    async GetpagesByCategory(category){
        try {
            const pages = await this.repository.FindByCategory(category);
            return FormateData(pages)
        } catch (err) {
            throw new APIError('Data Not found')
        }

    }

    async GetSelectedpages(selectedIds){
        try {
            const pages = await this.repository.FindSelectedpages(selectedIds);
            return FormateData(pages);
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

module.exports = pageservice;