import React ,{  useEffect, useState } from "react";

import "./ListRechrche.css";
import axios from "axios";
import {MonProfile,AutreProfile,LikePage} from "../Follow/Follow"

import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
export  function ListRechrcheUser({ cherche }) {

  const [data, setData] = useState([]);
  const [query] = useState("");

 	var user= JSON.parse(localStorage.getItem('user'))
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8000/user/search?q=${cherche}`,{
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
 
      });
      console.log(res.data)
      setData(res.data);
    };
    if (query.length === 0 || query.length > 0) fetchData();
  }, [query]);


  if(data===""){ 
    return ""
  }else{
  return (
<>
    <h1>Personnes</h1>
   


          {data.map((item) => (<Box
    
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={1}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={item.name}
        src={item.pic}
      />
      <Box>
        <Text>{item.username}</Text>
        <Text fontSize="xs">
          <b>Description : </b>
          {item.desc}
        </Text>
        <div className="ss"> {user._id===item._id  ? <MonProfile /> : <AutreProfile id={item._id}  />}
           </div>
      </Box>
    </Box>))}
          </>
    );
}};



  export  function ListRechrchePages({ cherche }) {

    const [data, setData] = useState([]);
    const [query] = useState("");
  

  
    var user= JSON.parse(localStorage.getItem('user'))
     
    useEffect(() => {
      const fetchData = async () => {
        const res = await axios.get(`http://localhost:8000/page/searchPages?search=${cherche}`,{
          headers: {
            Authorization: `Bearer ${user.token}`,
          }
  
        });
        console.log(res.data)
        setData(res.data);
      };
      if (query.length === 0 || query.length > 0) fetchData();
    }, [query]);
  
  
    if(data===""){ 
      return ""
    }else{
    return (
  <>
      <h1>Pages</h1>
     
  
  
            {data.map((item) => (<Box
      
        cursor="pointer"
        bg="#E8E8E8"
        _hover={{
          background: "#38B2AC",
          color: "white",
        }}
        w="100%"
        d="flex"
        alignItems="center"
        color="black"
        px={3}
        py={1}
        mb={2}
        borderRadius="lg"
      >
        <Avatar
          mr={2}
          size="sm"
          cursor="pointer"
          name={item.name}
          src={item.pic}
        />
        <Box>
          <Text>{item.name}</Text>
          <Text fontSize="xs">
            <b>Description : </b>
            {item.desc}
          </Text>
          <div className="ss"> <LikePage id={item._id}/>
             </div>
        </Box>
      </Box>))}
            </>
      );
  }};
   
   