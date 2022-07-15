import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">des Avis</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">2,415</span>
          <span className="featuredMoneyRate">
            -11.4 <ArrowDownward  className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Par rapport au mois dernier</span>

      </div>
     
      <div className="featuredItem">
        <span className="featuredTitle">Commentaires</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Par rapport au mois dernier</span>
      </div>
    </div>
  );
}
