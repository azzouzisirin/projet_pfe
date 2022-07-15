import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./dashbord.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidbarDashbord/Sidebar";

export default function Home() {
  return (<div >
  <Topbar/>
  <div className="dashbord">
    <div className="Sidebar">
    <Sidebar/>
    </div>
    <div className="home">

      <FeaturedInfo />
      <Chart data={userData} title="Analyse des utilisateurs" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
    </div>
    </div>
  );
} 
