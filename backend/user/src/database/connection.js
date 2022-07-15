const mongoose = require('mongoose');
const { DB_URL } = require('../config');

module.exports = async() => {
    if (process.env.NODE_ENV === 'test') {
        const Mockgoose = require('mockgoose').Mockgoose;
        const mockgoose = new Mockgoose(mongoose);
  
        mockgoose.prepareStorage()
          .then(() => {
                mongoose.connect(DB_URL,
              { useNewUrlParser: true, useCreateIndex: true })
              .then((res, err) => {
                if (err) return reject(err);
                resolve();
              })
          })
      } else {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Db Connected');
        
    } catch (error) {
        console.log('Error ============')
        console.log(error);
        process.exit(1);
    }}
 
};

 