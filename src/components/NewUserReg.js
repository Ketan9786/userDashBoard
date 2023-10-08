import { useState } from "react";
import { Box, Button, Container, Input } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
const NewUserReg = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
    
      if (!name || !userName || !email || !department) {
        setError("Please fill in all fields.");
        return;
      }

   
      const newUser = {
        name,
        username: userName,
        email,
        department,
      };

      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        newUser
      );

      
      console.log("User created:", response.data);
        alert("user Created please check console log");
   
      setName("");
      setUserName("");
      setEmail("");
      setDepartment("");
      setError(null);
    } catch (error) {
      console.error("Error creating user:", error);
      alert("user Not Created");
    }
  };

  return (
   
      <Box
        sx={{
           
          display: "flex",
          justifyContent: "center",
            textAlign:'center',
          flexDirection: "column",
          padding:"5%",
        
        }}
      >
        <h2>Fille the Users Details in below form </h2>
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{margin:"2%"}}
        />
        <Input
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          sx={{margin:"2%"}}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{margin:"2%"}}
        />
        <Input
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          sx={{margin:"2%"}}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
    

      <Button variant="contained" color="success" onClick={handleSubmit} sx={{margin:"5%"}}>
        Submit
      </Button>
      <Link to='/'><Button>Log In</Button></Link>
      </Box>

  );
};

export default NewUserReg;
