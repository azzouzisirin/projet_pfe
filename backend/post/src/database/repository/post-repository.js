const { ProductModel } = require("../models");
const { APIError,BadRequestError } = require('../../utils/app-errors')

//Dealing with data base operations
class ProductRepository {


    async CreateProduct({ userId, desc, img }){

        try {
            const product = new ProductModel({
                userId, desc, img
            })
    
            const productResult = await product.save();
            return productResult;
            
        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Product')
        }
        
    }


     async posts(){
         try{
             return await ProductModel.find();
         }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Get posts')
         }
    }
   
    async FindById(id){
        try{
            return await ProductModel.findById(id);
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Product')
        }

    }

    async FindByCategory(category){

        try{
            const posts = await ProductModel.find({ type: category});
             return posts;
            
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Category')
        }
    }

    async FindSelectedposts(selectedIds){
        try{
            const posts = await ProductModel.find().where('_id').in(selectedIds.map(_id => _id)).exec();
            return posts;
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Product')
        }
       
    }
    
}

module.exports = ProductRepository;