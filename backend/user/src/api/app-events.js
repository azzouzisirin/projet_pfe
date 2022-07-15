const userService = require('../services/user-service');

module.exports = (app) => {

    const service = new userService();

    app.use('/app-events', async (req,res,next) => {

        const { payload } = req.body;

        service.SubscribeEvents(payload);

        console.log("===============  user Service Received Event ====== ");
        return res.status(200).json(payload);

    });

}