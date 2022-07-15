const { userRepository } = require("../database");
const { FormateData,GenerateSalt, GeneratePassword, GenerateSignature, ValidatePassword } = require('../utils');
const { APIError, BadRequestError } = require('../utils/app-errors')


// All Business logic will be here
class userService {

    constructor(){
        this.repository = new userRepository();
    }

    async SignIn(userInputs){

        const { email, password } = userInputs;
        
        try {
            
            const existingCustomer = await this.repository.Finduser({ email});
            if(existingCustomer){
            
                const validPassword = await ValidatePassword(password, existingCustomer.password, existingCustomer.salt);

                if(validPassword){
                    const token = await GenerateSignature({ email: existingCustomer.email, _id: existingCustomer._id});
           
                  return FormateData({
                    _id: existingCustomer._id,
                    username: existingCustomer.username,
                    CIN: existingCustomer.CIN,
                    email: existingCustomer.email,
                    password: existingCustomer.password,
                    profilePicture: existingCustomer.profilePicture,
                    coverPicture: existingCustomer.coverPicture,
                    followers: existingCustomer.followers,
                    followings: existingCustomer.followings,
                    role: existingCustomer.role,
                    desc: existingCustomer.desc,
                    city: existingCustomer.city,
                     token });
             
                } 
            }
    
            return FormateData(null);
 
        } catch (err) {
            throw new APIError('Data Not found', err)
        }

       
    }

    
    async SignUp(userInputs){
        
        const {  username,CIN, email, password, profilePicture,coverPicture,desc,numero, city } = userInputs;
        
        try{
            // create salt
            let salt = await GenerateSalt();
            
            let userPassword = await GeneratePassword(password, salt);
            const existingCustomer = await this.repository.Createuser({  password: userPassword,  salt, username,CIN, email, profilePicture,coverPicture,desc,numero, city});

            const token = await GenerateSignature({ email: email, _id: existingCustomer._id});

            return FormateData("attendre l'acceptation d'administrateur");

        }catch(err){
            throw new APIError('Data Not found', err)
        }

    }

    async SignRest(userInputs){
        
        const {  username,CIN, email, password, role } = userInputs;
        
        try{
            // create salt
            let salt = await GenerateSalt();
            
            let userPassword = await GeneratePassword(password, salt);
            const existingCustomer = await this.repository.CreateRest({  password: userPassword,  salt, username,CIN, email,role});

            const token = await GenerateSignature({ email: email, _id: existingCustomer._id});

            return FormateData("ok");

        }catch(err){
            throw new APIError('Data Not found', err)
        }

    }

    async GetProfile(id){

        try {
            const existinguser = await this.repository.FinduserById({id});
            return FormateData(existinguser);
            
        } catch (err) {
            throw new APIError('Data Not found', err)
        }
    }

    async GetShopingDetails(id){

        try {
            const existinguser = await this.repository.FinduserById({id});
    
            if(existinguser){
               return FormateData(existinguser);
            }       
            return FormateData({ msg: 'Error'});
            
        } catch (err) {
            throw new APIError('Data Not found', err)
        }
    }

    async GetWishList(userId){

        try {
            const wishListItems = await this.repository.Wishlist(userId);
            return FormateData(wishListItems);
        } catch (err) {
            throw new APIError('Data Not found', err)           
        }
    }

    async AddToWishlist(userId, product){
        try {
            const wishlistResult = await this.repository.AddWishlistItem(userId, product);        
           return FormateData(wishlistResult);
    
        } catch (err) {
            throw new APIError('Data Not found', err)
        }
    }

    async ManageCart(userId, product, qty, isRemove){
        try {
            const cartResult = await this.repository.AddCartItem(userId, product, qty, isRemove);        
            return FormateData(cartResult);
        } catch (err) {
            throw new APIError('Data Not found', err)
        }
    }

    async ManageOrder(userId, order){
        try {
            const orderResult = await this.repository.AddOrderToProfile(userId, order);
            return FormateData(orderResult);
        } catch (err) {
            throw new APIError('Data Not found', err)
        }
    }

    async SubscribeEvents(payload){
 
        const { event, data } =  payload;

        const { userId, product, order, qty } = data;


        switch(event){
            case 'ADD_TO_WISHLIST':
            case 'REMOVE_FROM_WISHLIST':
                this.AddToWishlist(userId,product)
                break;
            case 'ADD_TO_CART':
                this.ManageCart(userId,product, qty, false);
                break;
            case 'REMOVE_FROM_CART':
                this.ManageCart(userId,product,qty, true);
                break;
            case 'CREATE_ORDER':
                this.ManageOrder(userId,order);
                break;
            default:
                break;
        }
 
    }

}

module.exports = userService;