import { useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
 
export default function Feed({ id }) {
  const [post, setpost] = useState([]);
 

  
	var user= JSON.parse(localStorage.getItem('user'))
  useEffect(() => {
    const fetchpost = async () => {
      const res = id
        ? await axios.post("http://localhost:8000/post/post_profile/" + id,  {
          email: user.email,
        
          }): await axios.post("http://localhost:8000/post/timeline/" + user._id,{
            followings: user.followings,
           
            })
      setpost(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      ); 
    };
    fetchpost();
  }, [id, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!id || id === user._id) && <Share />}
        {post.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
