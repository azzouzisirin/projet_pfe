const express = require('express');

const app = express();

app.use(express.json());

app.use('/', (req,res,next) => {

    return res.status(200).json({"msg": "Hello from messanger"})
})


app.listen(8004, () => {
    console.log('messanger is Listening to Port 8004')
})