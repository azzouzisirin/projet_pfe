import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [ setUser] = useState(null);
  const [UserDeux, setUserDeux] = useState([]);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    
    const getUser = async () => {
      try {
        const res = await axios("http://localhost:8000/user/search?q=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  useEffect(() => {
    const userInfo = async () => {
      try {
        const res = await axios.get("http://localhost:8000/messanger/getUserConv/" + conversation._id+"/"+currentUser._id);
        const res2=await axios.get("http://localhost:8000/user/findUser/"+res.data);

        setUserDeux(res2.data)
        
      } catch (err) {
        console.log(err);
      }
    };
    userInfo()
 
   
  }, []);


  return (
    <div className="conversation">

      <img
        className="conversationImg"
        src={
          UserDeux.profilePicture
        
        }
        alt=""
      />
     
      <span className="conversationName">{UserDeux.username}</span>

    </div>
  );
}
