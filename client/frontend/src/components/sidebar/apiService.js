
import axios from "axios";

export  const insertEmployee = async(data)=> {

    try {
      const config = {
        headers: { 
          "Content-type": "application/json",
        },
      };
      const { res } = await axios.post(
        "http://localhost:8000/page/newPage",
        
            {
              userId: data.userId,
             name: data.name,
             desc: data.desc,
             profilePicture: data.profilePicture,
             coverPicture: data.coverPicture,

            }
         ,
        
        config
      );
      console.log(res);
   
    
    } catch (error) {
      
    }
  };
export const updateEmployee = async(data)=> {

  try {
    const config = {
      headers: { 
        "Content-type": "application/json",
      },
    };
    const { res } = await axios.put(
      "http://localhost:8000/page/updatepage/"+data._id,
      data
       ,
      
      config
    );
    console.log(res); 
 
  
  } catch (error) {
    console.log(error);

  }
}