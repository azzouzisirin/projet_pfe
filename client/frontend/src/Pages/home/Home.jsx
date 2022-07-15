
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css"
import { useEffect } from "react";
import { useHistory } from "react-router";

export default function Home() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {

    if (!user) history.push("/");
  }, [history]);

  return (
    <>
          <Topbar />
      <div className="homeContainer">
     <Sidebar/>
      <Feed/>
      <Rightbar/>
      </div>
    </>
  );
}

