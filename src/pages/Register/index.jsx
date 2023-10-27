import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function Register() {
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
        <CardContent sx={{ display:"flex", flexDirection:"column", alignItems:"center"}}>
          <Typography variant="h4" textAlign={"center"} marginBottom={2}>
            Register
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
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Password"
            variant="outlined"
            // value={editedTask.title}
            sx={{ flex: 3, marginTop: 2  }}
          // error={isValidate && editedTask.title.trim() === ""}
          // onChange={(e) => setEditedTask({
          //   ...editedTask,
          //   title: e.target.value
          // })}
          />
          <Button variant='contained' fullWidth sx={{my:2}}>Register</Button>
          <Typography  variant="body" textAlign={"center"}>Have account?</Typography>
          <Link to={"/login"} style={{ width: "100%" }}>
          <Button variant='outlined' fullWidth sx={{mt:2}} style={{with:"100%"}}>Login</Button>
          </Link>
          

        </CardContent>
      </Card>

    </Box>
  )
}

export default Register