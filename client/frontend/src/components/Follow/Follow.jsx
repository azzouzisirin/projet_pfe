import './follow.css'

import { useEffect, useState } from "react";
import axios from "axios";

import { Add, Remove } from "@material-ui/icons";
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

export function MonProfile(){
  return""
}
var user= JSON.parse(localStorage.getItem('user'))

export function AutreProfile({ id }){

  const [isfollowed, setisfollowed] = useState([]);



  useEffect(() => {

  
     getFollowed(id)

    }, [id]);
    async function getFollowed(id) {
    


      const response = await fetch('http://localhost:8000/user/isFollowing/'+id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${user.token}`

        },
        body: JSON.stringify({
          email:user.email,
          userId:user._id,
        }),
      })
     
      const res = await response.json()
      setisfollowed(res.data)
   
    }  
     const followClick = async () => {
    
        if (isfollowed==="false") {
       
         setisfollowed("true")
         await fetch("http://localhost:8000/user/followUser/"+ id ,{
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
  
          },
          body: JSON.stringify({
            email:user.email,
                    userId:user._id,
          }),
        })
        } 
        if (isfollowed==="true") {
       
          setisfollowed("false")
          await fetch("http://localhost:8000/user/unfollowUser/"+ id,{
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
    
            },
            body: JSON.stringify({
              email:user.email,
                      userId:user._id,
            }),
          })
        }
      
    };

  return ( 
   <button className="rightbarFollowButton" style={{width:"100px"}} onClick={followClick}>
            {isfollowed==="true" ? "Suivi" : "Suivre"}
            {isfollowed==="true" ? <Remove /> : <Add />}
          </button>
    

  );
}


export function LikePage({ id }){

  const [isfollowed, setisfollowed] = useState([]);



  useEffect(() => {

  
     getFollowed(user.email, user._id,id)

    }, [id]);
    async function getFollowed(email, userId,id) {
    


      const response = await fetch('http://localhost:8000/page/isLikes/'+id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
    
          userId:user._id,
        }),
      })
    
      const res = await response.json()
      setisfollowed(res.data)
   
    }  
     const handleClick = async () => {

      const body = {email:user.email,
                    userId:user._id,}
        if (isfollowed==="false") { 
       
         setisfollowed("true")
         await axios.put("http://localhost:8000/page/followPage/"+ id, body)
         await axios.put("http://localhost:8000/user/followpage/"+ id, body)

        } 
        if (isfollowed==="true") {

          setisfollowed("false")
          await axios.put("http://localhost:8000/page/unfollowPage/"+ id, body)
          await axios.put("http://localhost:8000/user/unfollowpage/"+ id, body)

        } 
      
    };

  return ( 
   <button className="buttonLike" style={{width:"100px"}} onClick={handleClick}>
            {isfollowed==="true" ? <ThumbDownAltIcon /> : <ThumbUpIcon />}
          </button>
    
    
  );
}

export default function Follow() {
 
  return ( <>
   
      </>
  );
}
 


