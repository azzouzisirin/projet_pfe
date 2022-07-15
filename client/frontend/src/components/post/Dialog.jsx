import React from 'react'

import "./post.css";
import {MonProfile,AutreProfile} from "../Follow/Follow"

function Dialog({  onDialog,Likes }) {
  var user_p= JSON.parse(localStorage.getItem('user'))

  
 

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0,0,0,0.5)"
      }}
      onClick={() => onDialog(false)}
    >
        
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          background: "white",
          padding: "20px",
          borderRadius: "10px" 
        }}
      >

    
      <div >
 
      <ul className="sidebarFriendList">
   
      {Likes.map((friend) => (
                      <li className="sidebarListItem">
                      <img className="sidebarPagesImg" src={friend.profilePicture} alt="" />
                  <span className="sidebarFriendName">{friend.username}</span>
                  <div className="ss"> {user_p._id===friend._id  ? <MonProfile /> : <AutreProfile id={friend._id}  />}  </div>  
 
                  </li>
                ))}
</ul>
         </div>
  </div>
  
  </div>
  );
  }
  export default Dialog;