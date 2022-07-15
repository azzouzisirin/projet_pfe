import "./messenger.css";
import axios from "axios";
import Message from "../../components/message/Message";
import React,{ useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useParams } from "react-router";
import { io } from "socket.io-client";
import Conversation from "../../components/conversations/Conversation"
import Topbar from "../../components/topbar/Topbar";
import "../../components/search/SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
export  function Messenger(props) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const { user } = useContext(AuthContext);
  const socket = useRef();
  const [Nouv, setNouv] = useState(null);
  const [friends, setFriends] = useState([]);

  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);

  const [newMessage, setNewMessage] = useState("");
  const [UserDeux, setUserDeux] = useState([]);
  const [conversations, setConversations] = useState([]);

  let { conversationId } = useParams();
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
      
  useEffect(() => {
    const getFriends = async () => { 
      try { 
        const friendList = await axios.post("http://localhost:8000/user/getAllUser" );
         
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, []);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("http://localhost:8000/messanger/getALLmessage/" + conversationId);
         
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, []);
  useEffect(() => {
    const userInfo = async () => {
      try {
        const res = await axios.get("http://localhost:8000/messanger/getUserConv/" + conversationId+"/"+user._id);
        const res2=await axios.get("http://localhost:8000/user/findUser/"+res.data);

        setUserDeux(res2.data)
        
      } catch (err) {
        console.log(err);
      }
    };
    userInfo()
 
    
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
 

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("http://localhost:8000/messanger/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
 
  }, [user._id]);

  
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: conversationId,
    };

   

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId:UserDeux._id,
      text: newMessage,
    });

    try {
      const res = await axios.post("http://localhost:8000/messanger", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
 
  
 const NouveauxConv = ()=>{
  setNouv("yes")
  
 }
 function SearchBar({ data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [placeholder, setplaceholder] = useState("A:");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.username.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
async function NouveauMembre(user_p){
  setWordEntered("")
  setFilteredData([])
  const res = await axios.get("http://localhost:8000/messanger/find/" + user._id+"/"+user_p._id);
if(res.data==null){
  setplaceholder(user_p.username)
  const ress = await axios.post("http://localhost:8000/messanger/addConv/" + user._id+"/"+user_p._id);
  window.location.assign("/messenger/"+ress.data)


}else{
  window.location.assign("/messenger/"+res.data)

}
}
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
     <input
          type="text"
          placeholder={ placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
       
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
    
      </div> 
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
         <a className="dataItem"  onClick={() => {NouveauMembre(value)}}>
                <p>{value.username} </p>
              </a>
            )
          })}
        </div>
       
      )}
               

 
    </div>
  );
}

    return (<>
      <Topbar />
  
      <div className="messenger">
    
      <div className="chatMenu">
          <div className="chatMenuWrapper">
          <div className="conversation">
            <input placeholder="rechercher dans messenger" />
            <AddCircleOutlineIcon style={ {margin: "1%" }} onClick={NouveauxConv}/>
            </div>
            {conversations.map((c) => (
                    

              <div onClick={() => {setCurrentChat(c) ;window.location.href = c._id}}>
      
       
                <Conversation conversation={c} currentUser={user} />
              </div>
             ))}
        
          </div>
        </div>
       
          {!Nouv ? (
              <> <div className="chatBox">
              <div className="chatBoxWrapper">
         <div className="chatBoxTop">
                  {messages.map((m) => (
       
                    <div ref={scrollRef}>
                   
                      <Message message={m} own={m.sender === user._id} img={ user.profilePicture} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="écris quelque chose..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                  Envoyer
                  </button>
                  </div>
                  </div></div>
                  </>
            ) : (
            <>
            <div className="chatBox">
            <div className="chatBoxWrapper">
       <div className="chatBoxTop">
              <h1>Nouveau Message</h1>
              <div className="App">
      <SearchBar data={friends} />
    </div>              </div>
              </div></div>
              </>
            )}
                  



                  {!Nouv ? (
        <div className="userInfo">
             
            
            
             <img
                className="profileImg"
                src={
                  UserDeux.profilePicture
                   
                }
                alt=""
              />
            
              <h2 className="infoName">{UserDeux.username}</h2>
              <h4 className="info">{UserDeux.desc}</h4>
             
         
        </div>): (
              ""
            )}
          
        </div>
               
             
      </>
    );
  }
export default Messenger;
