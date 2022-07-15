import AuthPage from "./Pages/authentification/AuthPage";
import home from "./Pages/home/Home";
import Rechrche from "./Pages/recherche/Rechrche";
import Profile from "./Pages/profile/Profile";
import Messenger from "./Pages/messenger/Messenger";
import Test from "./Pages/Test";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import dashbord from "./Pages/Dashbord/Dashbord"
import UserList from "./Pages/userList/UserList"
import { useEffect } from "react";

function App() {
  
  return (
    <Router>
    <Switch>
      <Route path="/" component={AuthPage} exact />
      <Route path="/home" component={home}  /> 
      <Route path="/dashbord" component={dashbord}  />
      <Route path="/users" component={UserList}  />
      <Route path="/test" component={Test}  />

      <Route path="/profile/:_id" component={Profile}  />
      <Route path="/rechrche/:cherche" component={Rechrche}  />
      <Route path="/messenger/:conversationId" component={Messenger}  />
  
      </Switch>
    </Router>
  );
} 

export default App;
