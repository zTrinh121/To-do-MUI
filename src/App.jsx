import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isEmpty } from 'validator';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [isValidate, setValidate] = useState(false)
  const [statuses, setStatus] = useState([])
  const [filter, setFilter] = useState("all")
  const [task, setTask] = useState({
    id: "",
    title: "",
    priority: "high",
    isDone: false
  })
  const [editedTask, setEditedTask] = useState({
    id: "",
    title: "",
    priority: "high",
    isDone: false
  })


  const [taskList, setTaskList] = useState(() => {
    const storageTasks = JSON.parse(localStorage.getItem('tasks'))
    console.log(storageTasks);
    return storageTasks || []
  })

  // const [taskList, setTaskList] = useState([
  //   {
  //     id: 1,
  //     title: "Lau nha",
  //     priority: "low",
  //     isDone: false
  //   },
  //   {
  //     id: 2,
  //     title: "Rua bat",
  //     priority: "normal",
  //     isDone: true
  //   },
  //   {
  //     id: 3,
  //     title: "Lam bai",
  //     priority: "high",
  //     isDone: false
  //   }
  // ])
  const handleEdit = (task) => {
    setOpen(true)
    setEditedTask(task)
  }

  const changeColor = (priority) => {
    switch (priority) {
      case "high":
        return "error"
      case "normal":
        return "success"
      default:
        return "warning"
    }
  }

  //Thêm task
  const handleSubmit = () => {
    if (task.title.trim() === "") {
      setValidate(true)
      toast.error("Add task fail")
      return;
    }

    toast.success('Add task successfully')
    setTaskList([...taskList, {
      ...task,
      id: uuidv4()
    }])
    setTask({
      id: "",
      title: "",
      priority: "high",
      isDone: false
    })
    setValidate(false)
  }


  const toggleStatusFilter = (priority) => {
    if (statuses.includes(priority)) {
      const newStatusList = statuses.filter(status => status !== priority)
      setStatus(newStatusList)
    } else {
      setStatus(prev => [
        ...prev,
        priority
      ])
    }
  }

  //Xóa task
  const handleDelete = (x) => {
    toast.info('Delete task successfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    const newTaskList = taskList.filter((task, index) => index !== x)
    setTaskList(prev => {
      //Luu gia tri
      const jsonTaskList = JSON.stringify(newTaskList)
      localStorage.setItem('tasks', jsonTaskList)
      return newTaskList

    })
  }

  //Kiểm tra check hay chưa
  const toggleTask = (x) => {
    const newList = taskList.map((task, index) => {
      if (index === x) {
        return {
          ...task,
          isDone: !task.isDone,
        }
      } return task
    })
    setTaskList(newList)
  }
const handleUpdateTask = (editedTask)=> {
  console.log(editedTask);
  const newList = taskList.map((task) => {
    if(editedTask.id === task.id){
      return editedTask
    }
    return task
    
  }) 
  setTaskList(newList)
  handleClose()
  
}
  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //Style Modal
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  return (
    <>
      <Dialog maxWidth={'lg'} open={open} onClose={handleClose}>
        <DialogTitle>Edit task</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit your task</DialogContentText>
          <Stack direction={"row"} gap={2} width={600} marginTop={2}>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={editedTask.title}
              sx={{ flex: 3 }}
              error={isValidate && editedTask.title.trim() === ""}
              onChange={(e) => setEditedTask({
                ...editedTask,
                title: e.target.value
              })}
            />
            <Box sx={{ flex: 1 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Priority
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={editedTask.priority}
                  onChange={e => setEditedTask({
                    ...editedTask,
                    priority: e.target.value
                  })}
                >
                  <MenuItem value={"high"}>High</MenuItem>
                  <MenuItem value={"normal"}>Normal</MenuItem>
                  <MenuItem value={"low"}>Low</MenuItem>
                </Select>
              </FormControl>

            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleUpdateTask(editedTask)}>Submit</Button>
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          minWidth: "100vw",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#eee",
          padding: 10,
        }}
      >
        <Card sx={{ minWidth: 600 }}>
          <CardContent>
            <Typography variant="h4" textAlign={"center"}>
              Todo App MUI
            </Typography>
            <Container>
              <Typography variant="h6" marginBottom={1} marginTop={2}>
                Filter by status
              </Typography>
              <FormGroup
                sx={{
                  display: "flex",
                  flexDirection: "row"
                }}
                onClick={e => setFilter(e.target.value)}
              >
                <FormControlLabel value="all" control={<Checkbox defaultChecked
                  checked={statuses.includes("all")}
                  onClick={e => toggleStatusFilter(e.target.value)}
                />} label="All" />
                <FormControlLabel value="high" control={<Checkbox
                  checked={statuses.includes("high")}
                  onClick={e => toggleStatusFilter(e.target.value)}
                />} label="High" />
                <FormControlLabel value="normal" control={<Checkbox
                  checked={statuses.includes("normal")}
                  onClick={e => toggleStatusFilter(e.target.value)}
                />} label="Normal" />
                <FormControlLabel value="low" control={<Checkbox
                  checked={statuses.includes("low")}
                  onClick={e => toggleStatusFilter(e.target.value)}
                />} label="Low" />
              </FormGroup>
            </Container>
            <Container sx={{ height: 400 }}>
              <Typography variant="h6" marginBottom={1} marginTop={2}>
                Your tasks
              </Typography>
              <Stack direction={"column"}>
                <Container
                  sx={{
                    overflow: "auto",
                    width: "550px",
                    height: "300px"
                  }}
                >
                  {
                    taskList.map((task, index) => {
                      return statuses.length === 0 || statuses.includes(task.priority) || statuses.includes("all")
                        ?
                        (<>

                          <Stack direction={"row"} gap={1} alignItems={"center"} key={index}>
                            <Checkbox
                              checked={task.isDone}
                              onChange={() => toggleTask(index)}
                            />
                            <Typography
                              variant="body"
                              flex={1}
                              sx={{
                                textDecoration: task.isDone ? "line-through" : "none",
                                fontFamily: "Arial"
                              }}
                            >
                              {task.title}
                            </Typography>
                            <Chip
                              label={task.priority}
                              color={changeColor(task.priority)}
                            />

                            <IconButton
                              aria-label="edit"
                              size="large"
                              onClick={() => handleEdit(task)}

                            >
                              <EditIcon fontSize="inherit" />
                            </IconButton>

                            <IconButton
                              aria-label="delete"
                              size="large"
                              onClick={() => handleDelete(index)}
                            >

                              <DeleteIcon fontSize="inherit" />

                            </IconButton>
                          </Stack>
                        </>
                        ) :
                        (<></>)
                    })
                  }
                  {
                    taskList.filter((task) => (task.priority === filter || filter === "all")).length === 0 ? <p>Empty</p> : <></>
                  }


                </Container>


              </Stack>
            </Container>
            <Divider sx={{ marginY: 2 }}></Divider>
            <Container>
              <Typography variant="h6" marginBottom={1} marginTop={2}>
                Create task
              </Typography>
              {/* <p style={{ color: "#cc0000", fontFamily: "Arial", fontSize: "12px" }}>{msgValidation.title}</p> */}
              <Stack direction={"row"} gap={2}>
                <TextField
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  value={task.title}
                  sx={{ flex: 3 }}
                  error={isValidate && task.title.trim() === ""}
                  onChange={(e) => setTask({
                    ...task,
                    title: e.target.value
                  })}
                />
                <Box sx={{ flex: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Priority
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      defaultValue="high"
                      onChange={e => setTask({
                        ...task,
                        priority: e.target.value
                      })}
                    >
                      <MenuItem value={"high"}>High</MenuItem>
                      <MenuItem value={"normal"}>Normal</MenuItem>
                      <MenuItem value={"low"}>Low</MenuItem>
                    </Select>
                  </FormControl>

                </Box>
              </Stack>

              <Button variant="contained" sx={{ width: "100%", marginTop: 2 }}
                onClick={handleSubmit}
              >
                Add task
              </Button>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
              {/* Same as */}
              <ToastContainer />
            </Container>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}

export default App
