import "./sidebar.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Controls from "../../components/controls/Controls";
import AddIcon from '@material-ui/icons/Add';
import {  makeStyles} from '@material-ui/core';
import Popup from "../../components/Popup";
import Model from "./Model";
import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import * as apiService from './apiService'

import {

  Chat,
  PlayCircleFilledOutlined,
  
} from "@material-ui/icons";
const useStyles = makeStyles(theme => ({
  pageContent: {
      margin: theme.spacing(5),
      padding: theme.spacing(3)
  },
  searchInput: {
      width: '75%'
  },
  newButton: {
      position: 'absolute',
      right: '10px'
  }
}))
export default function Sidebar() {
  const [hidden, setHidden] = useState(true);
  const [hiddenPageLikes, setHiddenPageLikes] = useState(true);

  const classes = useStyles();
  const history = useHistory();

  const [Pageslikes, setPagesLikes] = useState([]);
  const [TonPages, setTonPages] = useState([]);

  const [LastUser, setLastUser] = useState(["0"]);
  const [openPopup, setOpenPopup] = useState(false)
  const [recordForEdit, setRecordForEdit] = useState(null)




var user=localStorage.getItem('user')
const addOrEdit = (values, resetForm) => {

 
    if(values._id===''){
      apiService.insertEmployee(values)

    }else {
      apiService.updateEmployee(values)
    }

    
  
  resetForm()
  setRecordForEdit(null)
  setOpenPopup(false)
}

var user_p=JSON.parse(localStorage.getItem('user'))
  useEffect(() => {
    const getPages = async () => {
      try {
        const PageList = await axios.post("http://localhost:8000/page/getAllPageSuivi/"+user_p._id,{
          email: user.email,
        
          });
         
        setPagesLikes(PageList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPages();
  }, [user]); 
 
  useEffect(() => {
    const getPages = async () => {
      try {
        const PageList = await axios.post("http://localhost:8000/page/getPagecree/"+user_p._id,{
          email: user.email,
        
          });
         
          setTonPages(PageList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPages();
  }, [user]); 

  useEffect(() => {
    const geLastUser = async () => {
      try {
        const res = await axios.get("http://localhost:8000/messanger/LastConv/" + user_p._id);
        setLastUser(res.data);
       
      } catch (err) {
        console.log(err);
      }
    };
 geLastUser();
    
  }, []);

function Reinion (){
  if(user_p.role==="Enseignant" || user_p.role==="administrateur"){
  return(

    <>      
    <li className="sidebarListItem">
    <Link to={{ pathname: "http://localhost:9800" }} target="_blank" >

    <PlayCircleFilledOutlined className="sidebarIcon" />
    <span className="sidebarListItemText">
   Nouvelle Réunion</span>

   </Link>
  </li>

  
    </>
  )}
  else return ""
}

const openInPopup = item => {
  setRecordForEdit(item)
  setOpenPopup(true)
}
 function  supprimePage (item ){

  if (window.confirm("voulez vous supprimer page") ) {
var email=user_p.email
var userId=user_p._id
  

    const res1 =  axios.delete("/page/deletepage/"+item._id, {

      headers: {
        'Content-Type': 'application/json',
      },
      data:{
        email , 
        userId, 
      },
    
    })
}}

  const PagesLikes = () => {
    return (
      <>
      
       {Pageslikes.map((Page) => (
            <li className="sidebarListItem">
              
              <img className="sidebarPagesImg" src={Page.profilePicture} alt="" />
                <span className="sidebarFriendName">{Page.name}</span>
                </li>
          ))}
          
      </>
    );}

    const PagesCreer = () => {
      return (
        <>
        
         {TonPages.map((Page) => (
              <li className="sidebarListItem">
                
                <img className="sidebarPagesImg" src={Page.profilePicture} alt="" />
                  <span className="sidebarFriendName">{Page.name}</span>
                <button  onClick={() => { openInPopup(Page) }}> <EditOutlinedIcon/></button> 
                <button  onClick={ () => {supprimePage (Page)}}>  <CloseIcon/></button> 
                  </li>
            ))}
            
        </>
      );}
  function PageEnseignant (){
    if(user_p.role==="Enseignant" || user_p.role==="administrateur"){

    return( <> 
    <li className="sidebarListItem">
    <Controls.Button
                        text="Creer Page"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
  </li>
    <ul className="sidebarFriendList">
    <button className="buttonPage" onClick={() => setHidden(s => !s)}> Vos Pages     {!hidden ?  <ArrowCircleUpIcon/>  :  <ArrowCircleDownIcon/> }
 </button>
    {!hidden ?     <PagesCreer/>: null}


    </ul></>  )
   } else{
    return ""
    }
  }

  function PageLikes (){

    return( <> 
     
    <ul className="sidebarFriendList">
    <button className="buttonPage" onClick={() => setHiddenPageLikes(s => !s)}>  Pages aimées    {!hiddenPageLikes ?  <ArrowCircleUpIcon/>  :  <ArrowCircleDownIcon/> }
 </button>
    {!hiddenPageLikes ?           <PagesLikes/>: null}


    </ul></>  )
   
  }
  function Dashboard_admin(){
    if( user_p.role==="administrateur"){
return(
    <Controls.Button
    text="Tableau De Bord"
    variant="outlined"
    startIcon={<AddIcon />}
    className={classes.newButton}
    onClick={() => {   history.push("/dashbord");  }}
/>
 )}else{
   return ""
 } }
  return (
    <div className="sidebar">
       <Dashboard_admin/>
    <div className="sidebarWrapper"> 
 
      <ul className="sidebarList">
      <button className="buttonHrf" onClick={() => history.push("/messenger/"+LastUser)}>

        <li className="sidebarListItem">
          <Chat className="sidebarIcon" />
          <span className="sidebarListItemText "> 
       
        Messenger</span>
           
        </li>
        </button>


       <Reinion/>
       
      
        
      </ul>
      <hr className="sidebarHr" />
      <h3>Pages</h3>
      <br/>
 
    
      <PageEnseignant /> 
     <PageLikes/>
    
    </div>
    <Popup
                title="Page"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <Model   recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit}/>
            </Popup>
  </div>
);
}
