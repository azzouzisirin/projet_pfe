import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState ,useEffect} from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const [FirstRest, setFirstRest] = useState(false);

  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  useEffect(async () => {{

    
    const  data  = await axios.post('http://localhost:8000/user/getAllUser');

    setFirstRest(data.data.length)
}})
async function RestFuntion(){
  const  data  = await axios.post('http://localhost:8000/user/registerResult');
  setFirstRest(data)
}
  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Veuillez remplir tous les champs",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:8000/user/login",
        { email, password },
        config
      );
      if(data==="attendre l'acceptation d'administrateur" ){
        toast({
          title: "attendre l'acceptation d'administrateur",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
   
  
      }else{      
      toast({
        title: "Connexion réussie",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      }); 
      localStorage.setItem("user", JSON.stringify(data));
      setLoading(false);
      history.push("/home");
    }} catch (error) {
      toast({
        title: "Erreur est survenue!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (<>
   { FirstRest? 
   <VStack spacing="10px">
      <FormControl id="email" isRequired>
        <FormLabel>Adresse e-mail</FormLabel>
        <Input
          value={email}
          type="email"
          placeholder="Adresse e-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>mot de passe</FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Cacher" : "Afficher"}
            </Button>
          </InputRightElement>
        </InputGroup>
 
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Connexion
      </Button>
     
    </VStack> : <Button onClick={RestFuntion}>Rest </Button>}
 </> );
};

export default Login;
