
import axios from "axios";


export const updateEmployee = async(data)=> {
  try {
    const config = {
      headers: { 
        "Content-type": "application/json",
      }, 
    };
    const { res } = await axios.put(
      "http://localhost:8000/user/updateprofil/"+data._id,
      data
       ,
      
      config
    );
    localStorage.setItem("user", JSON.stringify(data));

    console.log(res);
 
  
  } catch (error) {
    console.log(error);

  }
}