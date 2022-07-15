import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useParams } from 'react-router-dom';

import {ListRechrcheUser ,ListRechrchePages } from "../../components/ListRechrche/ListRechrche";
import "./rechrche.css"

export default function Rechrche(props) {
  let { cherche } = useParams();

  return (
    <>
          <Topbar />
      <div className="homeContainer">
     <Sidebar/>
     <div className="feed">
      <div className="feedWrapper">
      <ListRechrcheUser cherche={cherche}/>
      <ListRechrchePages cherche={cherche}/>

</div>
</div>
      </div> 
    </>
  );
}
