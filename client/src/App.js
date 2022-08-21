import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import './App.css';

const url = 'http://localhost:8000';

function App() {
  const [firstName, setFirstName] = useState("Omic");
  const [lastName, setLastName] = useState("Rocks");
  const [phone, setPhone] = useState("5558675309");
  const [userDetails, setUserDetails] = useState([]);

  async function getUsers(){
   const response = await axios.get(url);
   setUserDetails(response.data);
  }

  useEffect(() => {
    getUsers();
  }, [])
  

  async function handleAddUser(){
    await axios.post(`${url}/users/`, { firstname: firstName, lastname: lastName, phone: phone });
    getUsers();
  }

  return (
    <div className="phonebook__form">
       <Typography sx={{textAlign: "center", mb: 2}} variant="h3">Phone book</Typography>
       <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="firstname"
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <Button 
      variant="contained" 
      sx={{m: 1, width: "100%"}} 
      size="large"
      onClick={handleAddUser}
      >Add User</Button>
    </Box>

    <TableContainer component={Paper} sx={{mt: 15}}>
      <Table sx={{ width: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userDetails.sort((a, b) => a.lastname.localeCompare(b.lastname)).map((user, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.firstname}
              </TableCell>
              <TableCell align="right">{user.lastname}</TableCell>
              <TableCell align="right">{user.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  
  );
}

export default App;
