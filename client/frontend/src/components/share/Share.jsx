import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { useToast } from "@chakra-ui/toast";

import { useContext, useRef, useState } from "react";
import axios from "axios";

export default function Share() {

  const [profilePicture, setprofilePicture] = useState();
  const [picLoading, setprofilePictureLoading] = useState(false);

	var user= JSON.parse(localStorage.getItem('user'))
  const toast = useToast();

  const desc = useRef();
  const [file, setFile] = useState(null);

  const postDetails = (pics) => {
    setprofilePictureLoading(true);
    setFile(pics)
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setprofilePicture(data.url.toString());
          console.log(profilePicture)
          setprofilePictureLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setprofilePictureLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setprofilePictureLoading(false);
      return;
    }
  };

  const submitHandler = async () => {
    setprofilePictureLoading(true);

    const newPost = {
      email:user.email,
      userId: user._id,
      desc: desc.current.value,
      img:profilePicture,
    };
   
    try {
      await axios.post("http://localhost:8000/post/newPost", newPost);
      setprofilePictureLoading(false);

      window.location.reload();
    } catch (err) {}
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
     
            }
            alt=""
          />
          <input
            placeholder={"Quoi de neuf ,  " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo/vidéo</span>
              <input
                style={{ display: "none" }}
                p={1.5}
                type="file"
                id="file"
                accept="image/*"
                onChange={(e) => postDetails(e.target.files[0])}
              />
            </label>
        
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Sentiments</span>
            </div>
          </div>
        
          <button className="shareButton" type="submit">
          Publier
          </button>
        </form>
      </div>
    </div>
  );
}