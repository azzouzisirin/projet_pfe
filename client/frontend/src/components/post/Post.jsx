import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Delete, Update} from "@material-ui/icons";
import Dialog from "./Dialog";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Button } from "@chakra-ui/button";
import Model from "./Model";

import { AuthContext } from "../../Context/AuthContext";
import Popup from "../../components/Popup";

import {
  Menu,
  MenuButton,

  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import Comments from "../comments/Comments";
import "../comments/index.css";

export default function Post({ post }) {

  const [dialog, setDialog] = useState({
    isLoading: false,
    //Update
    Likes: null
  });
  const handleDialog = ( isLoading ,Likes) => {
    
    setDialog({
      isLoading,
      Likes,
    });
  
  };
  const areUSureDelete = (choose) => {
    if (choose) {
    
      handleDialog( false,null);
    } else {
      handleDialog(false,null);
    }
  };

  const [like, setLike] = useState(post.likes.length);
   var [setFriends] = useState([]);
   const [recordForEdit, setRecordForEdit] = useState(null)
   const [openPopup, setOpenPopup] = useState(false)

  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const [Likes,setLikes]=useState([])
  var user_p= JSON.parse(localStorage.getItem('user'))
var email=localStorage.getItem("email")
  var userId=user_p._id;
  const [hidden, setHidden] = useState(true);
function CommentPub(id, user){
  
  return(<div>
   
    <Comments
      commentsUrl="http://localhost:3004/comments"
      currentUserId="1"
      id={id}
      user={user}
    />
  </div>)
} 
 
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);
  

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:8000/user?userId=${post.userId}`);

      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

 function  PostMenu({post}){

  
     if(post.userId===user_p._id){
       return (
        <div className="postTopRight">
            <Menuitem post={post}/>
          </div>
        )
     }
     return "";
 }
 function  PostImg({post}){ 

 
  if(post.img===undefined){
    return ""
  }
    else{
    return (
      <img className="postImg" src={ post.img} alt="" />
     )
  }}
  
  const openInPopup = item => {
    setRecordForEdit(item)
    setOpenPopup(true)
  }
  const addOrEdit =async (values, resetForm) => {
      try {
        const config = {
          headers: { 
            "Content-type": "application/json",
          }, 
        };
        const { res } = await axios.put(
          "http://localhost:8000/post/"+values._id,
          values
           ,
          
          config
        );
     
        console.log(res);
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
      
      } catch (error) {
        console.log(error);
    
      }
 }
 function  Menuitem({post}){

  return (<div>
            <Menu >
            <MenuButton as={Button} rightIcon={<MoreVert className="MenuButton" />}>


    </MenuButton>
    <MenuList >
    <MenuItem onClick={() =>openInPopup(post)}><Update/>Modifier la publication</MenuItem>
    <MenuItem onClick={() =>supprimerPub(post._id)}> <Delete/>Déplacer dans la corbeille</MenuItem> 
    </MenuList>
          </Menu></div>)}



  const supprimerPub = (id) => {
    try {
    
      axios.delete("/post/"+id,{data:{email,userId}}).then(() => alert('votre publication à supprimer' ));
      window.location.reload();
  
   } catch (err) {
     console.log(err); 
   }
  }
  
  const handleLikeList =async (id) => {
    //Update
    try {
      const friendList = await axios.post("http://localhost:8000/post/likes/" + id);
      setFriends(friendList.data);
      getFriends(friendList.data);
    } catch (err) {
      console.log(err);
    }

    
  };


 async function getFriends (friends)  {

   if(friends.likes.length===0){

   }else{

     aaa(friends)
   }
};

async function aaa(friends){


  const fetchUser = async () => {

   

    const response =  await axios.post('http://localhost:8000/user/findListUser', friends)
    setLikes(response.data);
    handleDialog( true,Likes);
  };
  fetchUser();


}

  const likeHandler = () => {
    

    try {
      alert(currentUser._id )
      axios.put("http://localhost:8000/post/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user._id}`}>
            <img
                className="postProfileImg"
                src={
                  user.profilePicture
                
                } 
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
    
            <span className="postDate">{post.createdAt.substr(0, 10)} </span>
          </div>
       <PostMenu post={post}/>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}       {user.id}</span>
          <PostImg post={post}/>


        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
         
  <ThumbUpIcon  onClick={likeHandler}/>
           <Link onClick={() => handleLikeList(post._id)}>  <span className="postLikeCounter">{like} aiment ça</span> </Link>
          </div>
          <div className="postBottomRight">
            
      
           
             
             <span className="postCommentText" onClick={() => setHidden(s => !s)} >{post.Commentaires.length} commentaires</span>
             </div>
               
             
          
               </div>
             {!hidden ?     CommentPub (post._id, user) : null}

              
   
      </div>
      <Popup
                title="Modifier la publication"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <Model   recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit}/>
            </Popup>
     {dialog.isLoading && (
        <Dialog
          //Update
          onDialog={areUSureDelete}
          Likes={Likes}
        />
      )}
    </div>
  );
}