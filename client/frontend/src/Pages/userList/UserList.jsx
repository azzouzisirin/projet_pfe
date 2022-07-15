import "./userList.css";
import React, { useEffect, useState,useRef } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import Dialog from "./Dialog";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidbarDashbord/Sidebar";
import { Delete, Update} from "@material-ui/icons";

export default function UserList() {
  const [membres, setmembres] = useState([]);
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [modal] = useState(false);
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    //Update
    id: ""
  });
  const idProductRef = useRef();
  const handleDialog = (message, isLoading, id) => {
    
    setDialog({
      message,
      isLoading,
      //Update
      id,
    });
  
  };
 
  const handleDelete = (email,id) => {
    //Update
  
     
    handleDialog(email, true, id);
    idProductRef.current = user._id;
  };
  const areUSureDelete = (choose) => {
    if (choose) {
    
      setmembres(membres.filter((p) => p._id !== idProductRef.current));
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };


 
	useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8000/user/search?q=${query}`);
      setData(res.data);
    };
    if (query.length === 0 || query.length > 0) fetchData();
  }, [query]);


  function VisiteurMembre({ user }) {
   
    if (user.role==="visiteur") {
      
      return (
         <Link
            onClick={() => handleDelete(user.email,user._id)}
         
          >
         <Update/>
          </Link>
      );
    }
    return ""
   
  }
  const Table = ({ data }) => {
    return (
      <table>
        <tbody>
          <tr>
          <th>Nom</th>
      
      <th>role</th>
      <th>Date</th>
      <th>Actions</th>

          </tr>
          {data.map((item) => (
           
            <tr key={item._id}>
              <td>{item.username}</td>
              
              <td>{item.role}</td>
              <td>{item.createdAt.substr(0, 10)}    </td>
              <td>
          
<Link  onClick={() => supprimerClick(item._id)}>   <Delete /></Link>
<VisiteurMembre user={item}/>


   </td>

            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

	var user= JSON.parse(localStorage.getItem('user'))

  

  const supprimerClick = (id) => {
    try {
    
      axios.delete("/user/delete/"+id, {data:{email:user.email}}).then(() => console.log('l utilisateur à supprimer' ));
     
  
   } catch (err) {
     console.log(err);
   }
  }

  
  return (
   <div>
  <Topbar/>
  <div className="dashbord">
    <div className="Sidebar">
    <Sidebar/>
    </div>
    <div className="app">
        <input
          className="search"
          placeholder="recherche ..."
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
       

      {<Table data={data} />}
 

       {dialog.isLoading && (
        <Dialog
          //Update
          id={dialog.id}
          onDialog={areUSureDelete}
          message={dialog.message}
        />
      )}

    </div></div></div> );
}
