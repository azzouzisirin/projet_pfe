import "./topbar.css";
import { Search } from "@material-ui/icons";
import { Link,useHistory } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from "@chakra-ui/button";
import {  ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import Model from "./Model";
import * as apiService from './apiService'

import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { useState} from "react";
 
import Popup from "../../components/Popup";

export default function Topbar() {
  const history = useHistory();
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false)


  const [cherche, setcherche] = useState('')

 
  const user=JSON.parse(localStorage.getItem("user"))

    const logoutclick = async () => {
      localStorage.removeItem("user");
      history.push("/");
    
  }
  const addOrEdit = (values, resetForm) => {

 
      apiService.updateEmployee(values)
    

    
  
  resetForm()
  setRecordForEdit(null)
  setOpenPopup(false)
}

  const openInPopup = item => {
    setRecordForEdit(item)
    setOpenPopup(true)
  }
	const rechercheClick = (e) => {
    
	  e.preventDefault();
    window.location.href = `/rechrche/${cherche}`


	};
	 
  
  return (
    
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <span className="logo">Polytech</span>
        </Link>
      </div>
     
      <logout/>
      <div className="topbarCenter">
        <div className="searchbar">
        <Link to={`/rechrche/${cherche}`} style={{ textDecoration: "none" }}>
    <Search className="searchIcon" onClick={rechercheClick} />  </Link>
          <input
            placeholder="Rechercher un ami "
            className="searchInput" 
            onChange={(e) => setcherche(e.target.value)}
          />
        </div>
      </div>
    
      <div className="topbarRight">
      
 
 
    
        <Menu bg="#1877f2">
            <MenuButton as={Button} bg="#1877f2" rightIcon={<ChevronDownIcon />}>
              
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.username}
                src={user.profilePicture}
              />
            </MenuButton>
            <MenuList bg="#1877f2">
              <Link to={`/profile/${user._id}`}>   <MenuItem>Profile</MenuItem>{" "}    </Link>
              <MenuItem onClick={() => { openInPopup(user) }}>Parametres </MenuItem>

              <MenuDivider />
              
              <MenuItem onClick={logoutclick}><LogoutIcon color="white" />Se déconnecter</MenuItem>
            </MenuList>
          </Menu>
          <Popup
                title="Modifier votre Compte"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <Model   recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit}/>
            </Popup>
      </div>
    </div>
  );
}
