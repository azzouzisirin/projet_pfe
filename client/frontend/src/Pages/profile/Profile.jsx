import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile(props) {
  let { _id } = useParams();
  const [user, setUser] = useState({});
 

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:8000/user/findUser/${_id}`);
      setUser(res.data);
     
 };
    fetchUser();
 
  }, [_id]);


  return (
    <>
      <Topbar />
      <div className="profile">
 

        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                 
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    
                }
                alt=""
              /> 
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc} </span>
            </div>
          </div>
          <div className="profileRightBottom">
          <Feed id={user._id}  />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
