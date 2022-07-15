import "./rightbar.css";
import {  useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {MonProfile,AutreProfile} from "../Follow/Follow"

export default function Rightbar({ user }) {
  const [friends, setFriends] = useState([]);

var user_p=  JSON.parse(localStorage.getItem("user"));


  


  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("http://localhost:8000/user/friends/" + user_p._id,{
         body : {
          email:user_p.email ,
        
        }});
         
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

 
 
  const HomeRightbar = () => {

  
      return (
        <>
        
          <img className="rightbarAd" src="assets/ad.png" alt="" />
       
        </>
      );
    }
   

  const ProfileRightbar = () => {
    return (
      <>
          {user && user_p._id===user._id  ? <MonProfile /> : <AutreProfile id={user._id}  />}

        
      
        <h4 className="rightbarTitle">Vos informations</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Ville:</span>
            <span className="rightbarInfoValue">{user.city}</span>  </div>
            <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Role:</span>
            <span className="rightbarInfoValue">{user.role}</span>  </div>
            <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">CIN:</span>
            <span className="rightbarInfoValue">{user.CIN}</span>
          </div>
      
       
          
        </div>
        <h4 className="rightbarTitle">Amis</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend._id}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                  
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
