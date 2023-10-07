import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Container,
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

function App() {

  const [task, setTask] = useState({
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
    const isValid = validationAll()
    if (!isValid) return
    toast.success('Add task successfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTaskList(prev => {
      const newTaskList = [...prev, task]
      //Luu gia tri
      const jsonTaskList = JSON.stringify(newTaskList)
      localStorage.setItem('tasks', jsonTaskList)
      return newTaskList

    })
    setTask({
      id: "",
      title: "",
      priority: "high",
      isDone: false
    })
  }

  //Validate
  const [msgValidation, setMsg] = useState('')
  const validationAll = () => {

    const msg = {}
    if (isEmpty(task.title)) {
      msg.title = "*Required"
    }
    setMsg(msg)
    if (Object.keys(msg).length === 0) return true;
    console.log("It empty");
    return false
  }

  //Lọc task (chỉ chọn 1 filter thôi)
  const [statuses, setStatus] = useState([])
  const [filter, setFilter] = useState("all")
  console.log(statuses);

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
  console.log(taskList);

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
                        ? (
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
                              aria-label="delete"
                              size="large"
                              onClick={handleOpen}

                            >
                              <EditIcon fontSize="inherit" />
                            </IconButton>
                            <Modal
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                  Text in a modal
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                  Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                </Typography>
                              </Box>
                            </Modal>
                            <IconButton
                              aria-label="delete"
                              size="large"
                              onClick={() => handleDelete(index)}
                            >

                              <DeleteIcon fontSize="inherit" />

                            </IconButton>
                          </Stack>
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
              <p style={{ color: "#cc0000", fontFamily: "Arial", fontSize: "12px" }}>{msgValidation.title}</p>
              <Stack direction={"row"} gap={2}>
                <TextField
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  value={task.title}
                  sx={{ flex: 3 }}
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
