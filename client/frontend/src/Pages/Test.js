import React, {  useState } from 'react'
import axios from "axios";

function Test() {

  function update(){
   switch(selectedOption) {
    
    case 'Étudiant':
    alert("e") ;
      case 'Enseignant':
        alert("b") ;
        case 'administrateur':
          alert("c") ;
    default:
      return 'foo';
  }
  

  }

  
  const [selectedOption, setSelectedOption] = useState();

    return (
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          backgroundColor: "rgba(0,0,0,0.5)"
        }}
      >

          
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            background: "white",
            padding: "20px",
            borderRadius: "10px"
          }}
        >
          <h2 stlye={{ color: "#111", fontSize: "16px" }}>accepter comme</h2>
<br/>

        <div>
    <select  value={selectedOption}
    onChange={(e) => setSelectedOption(e.target.value)}>
    <option  key="" value="">--accepter comme--</option>
    <option  key="Étudiant" value="Étudiant">Étudiant</option>
    <option  key="Enseignant" value="Enseignant">Enseignant</option>
    <option  key="administrateur" value="administrateur">administrateur</option>
  
</select>
<br/><br/><br/>
</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              onClick={() => update() }
              style={{
                background: "red",
                color: "white",
                padding: "10px",
                marginRight: "4px",
                border: "none",
                cursor: "pointer"
              }}
            >
              Oui
            </button>
            <button
              style={{
                background: "green",
                color: "white",
                padding: "10px",
                marginLeft: "4px",
                border: "none",
                cursor: "pointer"
              }}
            >
              Non
            </button>
          </div>
        </div>
      </div>
    );
  }
  export default Test;
  