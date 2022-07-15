const Page = require("../database/models/Page");


//get pages + search
exports.searchPage = async (req,res)=>{
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { desc: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const pages = await Page.find(keyword);

  res.send(pages);
}

   //follow a page 
 
   exports.Following = async (req, res, next) => {
  
      try {
        const page = await Page.findById(req.params.PageId);
        if (!page.likes.includes(req.body.userId)) {
              res.status(200).json({data:"false"});
        } else {
          res.status(403).json({data:"true"});
        }
      } catch (err) {
        res.status(500).json(err);
      }
   } 
//follow a page 
  
exports.followPage = async (req, res, next) => {
  
      const page = await Page.findById(req.params.PageId);
 
     

      if (!page.likes.includes(req.body.userId)) {
        await page.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json("page has been followed");
      } else {
        res.status(403).json("you allready follow this page");
      }
 
 }
//unfollow a page
exports.unfollowUser = async (req, res, next) => {
    try {
      const page = await Page.findById(req.params.PageId);
      if (page.likes.includes(req.body.userId)) {
        await page.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

 




//create a Page
exports.createpage = async (req, res, next) => {
    const newPage = new Page(req.body);
    try {
      const savedPage = await newPage.save();
      res.status(200).json(savedPage);
    } catch (err) {
      res.status(500).json(err);
    }}

//update a Page
    exports.updatepage = async (req, res, next) => {
        try {
            const page = await Page.findById(req.params.id);
            if (page.userId === req.body.userId) {
              await page.updateOne({ $set: req.body });
              res.status(200).json("the page has been updated");
            } else {
              res.status(403).json("you page update only your page");
            }
          } catch (err) {
            res.status(500).json(err);
          }
       }

       exports.deletepage = async (req, res, next) => {
        try {
            const page = await Page.findById(req.params.id);
            if (page.userId === req.body.userId) {
              await page.deleteOne();
              res.status(200).json("the Page has been deleted");
            } else {
              res.status(403).json("you can delete only your Page");
            }
          } catch (err) {
            res.status(500).json(err);
          }
       }

       //like / dislike a Page
       exports.likepage = async (req, res, next) => {
        try {
            const page = await Page.findById(req.params.id);
            if (!page.likes.includes(req.body.userId)) {
              await page.updateOne({ $push: { likes: req.body.userId } });
              res.status(200).json("The Page has been liked");
            } else {
              await page.updateOne({ $pull: { likes: req.body.userId } });
              res.status(200).json("The Page has been disliked");
            }
          } catch (err) {
            res.status(500).json(err);
          }
       }
 
       //get a Page
       exports.getpage = async (req, res, next) => {
        try {
          const page = await Page.find({name:req.params.name});
          res.status(200).json(page);
        } catch (err) {
          res.status(500).json(err);
        }
       }


       //get a Page by Id
       exports.getpageId = async (req, res, next) => {
        try {
          const page = await Page.findById(req.params.id);
          res.status(200).json(page);
        } catch (err) {
          res.status(500).json(err);
        }
       }
       exports.getAllPageSuivi = async (req, res, next) => {
        const Pages = await Page.find({likes:req.params.userId});
        res.status(200).json(
          Pages
        );
       }
       exports.getPageCreer = async (req, res, next) => {
        const Pages = await Page.find({userId:req.params.userId});
        res.status(200).json(
          Pages
        );
       }
       exports.likepage = async (req, res, next) => {
        try {
            const page = await Page.findById(req.params.id);
            if (!page.likes.includes(req.body.userId)) {
              await page.updateOne({ $push: { likes: req.body.userId } });
              res.status(200).json("The Page has been liked");
            } else {
              await page.updateOne({ $pull: { likes: req.body.userId } });
              res.status(200).json("The Page has been disliked");
            }
          } catch (err) {
            res.status(500).json(err);
          }
       }