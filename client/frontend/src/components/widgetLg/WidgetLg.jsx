import "./widgetLg.css";
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";

import { Delete} from "@material-ui/icons";

export default function WidgetLg() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  var email = localStorage.getItem('email');
  const [modal] = useState(false);
 

 

 

 
	useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8000/user/search?q=${query}`);
      setData(res.data);
    };
    if (query.length === 0 || query.length > 0) fetchData();
  }, [query]);

 

 
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


  

  const supprimerClick = (id) => {
    try {
    
      axios.delete("/user/delete/"+id, {data:{email}}).then(() => console.log('l utilisateur à supprimer' ));
     
  
   } catch (err) { 
     console.log(err);
   }
  }

 
  return (
    <div className="widgetLg">
    <h3 className="widgetLgTitle">Latest transactions</h3>     
       <input
          className="search"
          placeholder="recherche ..."
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
       

      {<Table data={data} />}
 


    </div> );
}
