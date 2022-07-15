const Page = require("../database/models/Page");
const pageController=require('./pages')

module.exports = (app) => {

 
 
    app.get('/searchPages', pageController.searchPage); 
 
    app.post('/isLikes/:PageId',  pageController.Following);
    
    app.put('/followPage/:PageId', pageController.followPage);
    app.put('/unfollowPage/:PageId',  pageController.unfollowUser);
    app.post('/getAllPageSuivi/:userId',  pageController.getAllPageSuivi);
    app.post('/getPagecree/:userId',  pageController.getPageCreer);
    
    app.post('/newPage', pageController.createpage);
    
    app.put('/:id/likepage', pageController.getpage);
    app.get('/:id', pageController.getpageId);
     
    //get timeline Pages
    app.put('/updatepage/:id',  pageController.updatepage);
    app.delete('/deletepage/:id', pageController.deletepage);
    app.put('/:id/like', pageController.likepage);
    app.get('/pages/:name',pageController.getpage);
    
    app.put('/:id/likepage', pageController.getpage);
    
    app.get("/timeline/:userId", async (req, res) => {
      try {
        const currentUser = await User.findById(req.params.userId);
        const userPages = await Page.find({ userId: currentUser._id });
        const friendPages = await Promise.all(
          currentUser.followings.map((friendId) => {
            return Page.find({ userId: friendId });
          })
        );
        res.status(200).json(userPages.concat(...friendPages));
      } catch (err) {
        res.status(500).json(err);
      }
    });
    
    //get user's all Pages
    
    app.get("/profile/:userId", async (req, res) => {
      try {
        const Pages = await Page.find({ userId: req.params.userId});
        res.status(200).json(Pages);
      } catch (err) {
        res.status(500).json(err);
      }
    });

}