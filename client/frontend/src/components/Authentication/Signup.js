import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();

  const [username, setusername] = useState();
  const [CIN, setCIN] = useState();
  const [desc, setdesc] = useState();
  const [city, setcity] = useState();
 

  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [profilePicture, setprofilePicture] = useState();
  const [picLoading, setprofilePictureLoading] = useState(false);

  const submitHandler = async () => {
    setprofilePictureLoading(true);
    if (!username || !email || !password || !confirmpassword || !CIN) {
      toast({
        title: "veuillez remplir tous les champs obligatoires",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setprofilePictureLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Les mots de passe ne correspondent pas",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:8000/user/register",
        {
          username,
          CIN,
          email,
          password,
          profilePicture,
          desc,
          city,
        },
        config
      );
      toast({
        title: "Inscription réussi \n attendre l'acceptation de l'administrateur",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setprofilePictureLoading(false);
    
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setprofilePictureLoading(false);
    }
  };

  const postDetails = (pics) => {
    setprofilePictureLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setprofilePicture(data.url.toString());
          console.log(profilePicture)
          setprofilePictureLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setprofilePictureLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setprofilePictureLoading(false);
      return;
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Nom d'utilisateur</FormLabel>
        <Input
          placeholder="Entrez votre nom"
          onChange={(e) => setusername(e.target.value)}
        />
      </FormControl>
      <FormControl id="CIN" isRequired>
        <FormLabel>CIN</FormLabel>
        <Input
          placeholder="CIN"
          onChange={(e) => setCIN(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Entrez votre adresse email"
          onChange={(e) => setEmail(e.target.value)}
        />
       </FormControl>
          <FormControl id="desc" >
        <FormLabel>description</FormLabel>
        <Input
          type="text"
          placeholder="description"
          onChange={(e) => setdesc(e.target.value)}
        />
            </FormControl>
          <FormControl id="ville" >
        <FormLabel>ville</FormLabel>
        <Input
          type="text"
          placeholder="ville"
          onChange={(e) => setcity(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Mot de passe</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Cacher" : "Afficher"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirmez le mot de passe</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Cacher" : "Afficher"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Téléchargez votre profilPhoto</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}
      >
       S'inscrire
      </Button>
    </VStack>
  );
};

export default Signup;
