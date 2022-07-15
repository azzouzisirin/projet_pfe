// builders/product-builder.js
module.exports.Builder = {
    user: ({ 
  
    username= "sawsen",
    CIN= 66669145,
         city="monastir",
 email="sawsen@gmail.com",
  desc= "description",
  numero= 54445,

     password= "sawsen"} = {}) => ({
      username,
      CIN,
      email,
      desc,
      numero,
      password,
    }),
  }
  