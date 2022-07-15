const { userModel } = require('../models');
const { APIError, BadRequestError, STATUS_CODES } = require('../../utils/app-errors')

//Dealing with data base operations
class userRepository {

    async Createuser({ username,CIN,salt, email, password, profilePicture,coverPicture,desc,numero, city}){
        try{
            const user = new userModel({
                username,CIN, salt,
                email, password, profilePicture,coverPicture,desc,numero, city,
            })

            const userResult = await user.save();

            return userResult;
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create user')
        }
    }
    async CreateRest({ username,CIN,salt, email, password, role}){
        try{
            const user = new userModel({
                username,CIN, salt,
                email, password, role,
            })

            const userResult = await user.save();

            return userResult;
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create user')
        }
    }
    
  

    async Finduser({ email }){
        try{
            const existinguser = await userModel.findOne({ email: email });
            return existinguser;
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find user')
        }
    }

    async FinduserById({ id }){

        try {
            const existinguser = await userModel.findById(id)
            
            return existinguser;
        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find user');
        }
    }

    async Wishlist(userId){
        try{
            const profile = await userModel.findById(userId).populate('wishlist');
           
            return profile.wishlist;
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Get Wishlist ')
        }
    }

    async AddWishlistItem(userId, { _id, name, desc, price, available, banner }){

      
        const product = {
            _id, name, desc, price, available, banner 
        };
        
        try{
            const profile = await userModel.findById(userId).populate('wishlist');
           
            if(profile){
    
                 let wishlist = profile.wishlist;
      
                if(wishlist.length > 0){
                    let isExist = false;
                    wishlist.map(item => {
                        if(item._id.toString() === product._id.toString()){
                           const index = wishlist.indexOf(item);
                           wishlist.splice(index,1);
                           isExist = true;
                        }
                    });
    
                    if(!isExist){
                        wishlist.push(product);
                    }
    
                }else{
                    wishlist.push(product);
                }
    
                profile.wishlist = wishlist;
            }
    
            const profileResult = await profile.save();      
    
            return profileResult.wishlist;

        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Add to WishList')
        }

    }


    async AddCartItem(userId, {  _id, name, price, banner }, qty, isRemove){

        try{

            const profile = await userModel.findById(userId).populate('cart');
    
            if(profile){ 
     
                const cartItem = {
                    product: { _id, name, price, banner},
                    unit: qty,
                };
              
                let cartItems = profile.cart;
                
                if(cartItems.length > 0){
                    let isExist = false;
                     cartItems.map(item => {

                        if(item.product._id.toString() === _id.toString()){
                            if(isRemove){
                                cartItems.splice(cartItems.indexOf(item), 1);
                            }else{
                                item.unit = qty;
                            }
                            isExist = true;
                        }
                    });
    
                    if(!isExist){
                        cartItems.push(cartItem);
                    } 
                }else{
                    cartItems.push(cartItem);
                }
    
                profile.cart = cartItems;
    
                const cartSaveResult = await profile.save();

                return cartSaveResult;
            }
            
            throw new Error('Unable to add to cart!');

        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create user')
        }

    }

    async AddOrderToProfile(userId, order){
 
        
        try{

            const profile = await userModel.findById(userId);

            if(profile){ 
                
                if(profile.orders == undefined){
                    profile.orders = []
                }
                profile.orders.push(order);

                profile.cart = [];

                const profileResult = await profile.save();

                return profileResult;
            }
            
            throw new Error('Unable to add to order!');

        }catch(err){

            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create user')
        }
        
    }

}

module.exports = userRepository;