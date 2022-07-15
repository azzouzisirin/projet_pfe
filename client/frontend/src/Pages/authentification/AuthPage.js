import {
  Box,
  Container,
  Tab, 
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Login from "../../components/Authentication/Login";
import Signup from "../../components/Authentication/Signup";

function AuthPage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) history.push("/home");
  }, [history]);

  return (
    <div className="App">
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        backgroundColor={"#F5F5DC"}
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans" >
         Polytech
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px" backgroundColor={"#F5F5DC"}>
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Connexion</Tab>
            <Tab>S'inscrire</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
    </div>
  );
}

export default AuthPage;
