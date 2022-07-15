const userService = require('../services/user-service');
const  UserAuth = require('./middlewares/auth');
const  User = require('./user');
const accessController=require('./accessController');

module.exports = (app) => {
 
    const service = new userService();
//get a user
   app.get("/", User.searchUserById);
   
    app.post('/register',User.register);
    app.post('/registerResult',User.registerResult);

    app.post('/login',  accessController.allowIfLoggedin,accessController.grantAccess('updateOwn', 'profile'), User.login);
    app.get('/gettProfile', UserAuth ,accessController.allowIfLoggedin,accessController.grantAccess('updateOwn', 'profile'), User.GetProfil);
    app.get('/findUser/:userId',  User.findUserId);
    app.post('/findListUser',  User.findListUser);
 
    app.put('/updateUser/:PageId/:userId',  User.updateUser);
 
    app.get('/search',User.search);

    app.get('/searchVisiteur',User.searchVisiteur);

    app.get('/searchUser/:key', UserAuth ,accessController.allowIfLoggedin,accessController.grantAccess('updateOwn', 'profile'), User.searchkey);
    app.post('/getAllUser', User.allUsers);
    app.post('/isFollowing/:id', UserAuth ,accessController.allowIfLoggedin,accessController.grantAccess('updateOwn', 'profile'), User.Following);
    app.put('/updateprofil/:id', User.updateprofile);
    app.put('/followUser/:id', UserAuth ,accessController.allowIfLoggedin,accessController.grantAccess('updateOwn', 'profile'), User.followUser);
    app.put('/unfollowUser/:id', UserAuth ,accessController.allowIfLoggedin,accessController.grantAccess('updateOwn', 'profile'), User.unfollowUser);
  
    app.put('/followpage/:id',  User.followPage);
    app.put('/unfollowpage/:id',User.unfollowPage);
  
    app.get('/getuser/:username', UserAuth ,accessController.allowIfLoggedin,accessController.grantAccess('updateOwn', 'profile'), User.getuserByUsername);
    app.get('/friends/:userId',User.getfriends);
    app.delete('/delete/:id', accessController.allowIfLoggedin, accessController.grantAccess('deleteAny', 'profile'), User.deleteUser);



    app.get('/ALLUsersVisiteur', accessController.allowIfLoggedin, accessController.grantAccess('updateAny', 'profile'), User.getUsersVisiteur);
    app.put('/acceptEtudiant/:id',  User.acceptEtudiant);
    app.put('/acceptEnseignant/:id',  User.acceptEnseignant);

    app.put('/acceptadministrateur/:id', User.acceptadministrateur);
    app.post('/ALLUsers',  User.getUsers);
    app.delete('/delete/:id', accessController.allowIfLoggedin, accessController.grantAccess('deleteAny', 'profile'), User.deleteUser);
      

}   