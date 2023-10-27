import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const [inputValue, setInputValue] = useState({
    username: "",
    password: ""
  })

  const [accountList, setAccountList]= useState(() => {
    const storageAccounts = JSON.parse(localStorage.getItem('account'))
    console.log(storageAccounts);
    return storageAccounts || []
  })
  const navigate = useNavigate()

  const handleLogin = () => {
    if(inputValue.username === "admin" && inputValue.password === "123456"){
      toast.success("Login successfully")
      navigate("/home")
    }
    else {
      toast.error("Invalid username or password")
    }
    // setAccountList(prev => {
    //   const newAccountList = [...prev, inputValue]
    //   const jsonAccountList = JSON.stringify(newAccountList)
    //   localStorage.setItem('account', jsonAccountList)
    //   return newAccountList;
    // })
    // toast.success("Login successfully")
    // navigate("/home")
  }
  console.log(accountList);

  console.log(inputValue);

  return (
    <Box
      sx={{
        minWidth: "100vw",
        minHeight: "100vh",
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#eee",
        padding: 10,
      }}
    >
      <Card sx={{ minWidth: 600 }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="h4" textAlign={"center"} marginBottom={2}>
            Login
          </Typography>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Username"
            variant="outlined"
            // value={editedTask.title}
            sx={{ flex: 3 }}
          // error={isValidate && editedTask.title.trim() === ""}
          // onChange={(e) => setEditedTask({
          //   ...editedTask,
          //   title: e.target.value
          // })}
          onChange={e => setInputValue({
            ...inputValue,
            username: e.target.value,
          })}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type='password'
            // value={editedTask.title}
            sx={{ flex: 3, marginTop: 2 }}
          // error={isValidate && editedTask.title.trim() === ""}
          // onChange={(e) => setEditedTask({
          //   ...editedTask,
          //   title: e.target.value
          // })}
          onChange={e => setInputValue({
            ...inputValue,
            password: e.target.value,
          })}
          />
          <Button variant='contained' fullWidth sx={{ my: 2 }} onClick={handleLogin}>Login</Button>
          <Typography variant="body" textAlign={"center"}>Don't have account?</Typography>
          <Link to={"/register"} style={{ width: "100%" }}>
            <Button variant='outlined' fullWidth sx={{ mt: 2 }}>Register</Button>
          </Link>
        </CardContent>
      </Card>

    </Box>
  )
}

export default Login