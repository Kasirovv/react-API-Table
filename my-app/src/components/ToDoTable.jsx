import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import { Delete, Edit, Send, ThumbDown, ThumbUp } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'white',
  boxShadow: 24,
  p: 5,
  display:'flex',
};

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function ToDoTable() {
  
  const [id,setId] = useState()
  const [valueTxt,setValueTxt] = useState({})
  const [open, setOpen] = React.useState(false);
  const handleOpen = (obj) => {setOpen(true) 
    setId(obj.id)
    setValueTxt(obj);
  };
  const handleClose = () => setOpen(false);

  const handleText = (elem) => {
    const {value} = elem.target;
    setValueTxt({title: value.title, message: value.message});
}

  const BaseURL = 'http://2.56.213.92:5001/todos';
  const [data,setData] = useState([]);

  
  const getUser = async () => {
    try {
      const { data } = await axios.get(BaseURL)
      setData(data);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  } 

  const isComplete = async (obj) => {
    try {
        const {data} = await axios.put(`${BaseURL}/${obj.id}`,{...obj,complete:!obj.complete});
        console.log(obj);
    } catch (error) {
      console.log(error)
    }
    getUser();
  }

  const delUser = async (id) => {
    try {
      const {data} = await axios.delete(`${BaseURL}/${id}`);
      setData(data);
      console.log(data)
    } catch (error) {
      console.log(error)
    }
    getUser();
  }

  const editUser = async (obj) => {
    try {
        const {data} = await axios.put(`${BaseURL}/${obj.id}`,obj);
        console.log(obj);
    } catch (error) {
      console.log(error)
    }
    getUser();
  }
  
  const text = (elem) => {
    elem.preventDefault();
    const obj = { 
      title:elem.target['title'].value,
      message:elem.target['message'].value,
      comlete:false,
      id
    }
    editUser(obj);
    handleClose();
  }
  
  useEffect(()=>{
      getUser();
      console.log(data)
  },[])
  
  return (
    <div>
        <table className='w-[1200px] border text-center'>
            <tr>
                    <th className='border w-[20px]'><Checkbox {...label} color="success" /></th>
                    <th className='border w-[70px]'>ID</th>
                    <th className='border w-[400px] '>Title</th>
                    <th className='border w-[400px] '>Message</th>
                    <th className='border w-[80px] '>Read</th>
                    <th className='border'>Actions</th>
            </tr>
            {
            data?.map((item) => {
             return (
                <tr key={item.id}>
                    {item.complete?<td className='border w-[20px]'><Checkbox {...item} defaultChecked onClick={()=>isComplete(item)} /></td>:<td className='border w-[20px]'><Checkbox {...item} onClick={()=>isComplete(item)} /></td>}
                    <td className='border' >{item.id}</td>
                    <td className='border' >{item.title}</td>
                    <td className='border' >{item.message}</td>
                    <td className='border' >{item.complete?<ThumbUp color='success'/>:<ThumbDown color='error'/>}</td>
                    <td className='border space-x-[30px]' ><IconButton color='warning' onClick={()=>handleOpen(item)}> <Edit /> </IconButton> <Delete color='error' onClick={()=>delUser(item.id)} /> </td>
                </tr>
             )})
            }
        </table>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <form onSubmit={text}> 
        <Box sx={style}>
           <TextField sx={{marginX:'15px'}} id="filled-basic" value={valueTxt.title} onChange={handleText} label="Title" variant="filled"   name='title'  />
           <TextField sx={{marginX:'15px'}} id="filled-basic" value={valueTxt.message} onChange={handleText} label="Message" variant="filled" name='message' />
           <Button    type='submit' variant="contained" endIcon={<SendIcon />} sx={{marginX:'15px', width:'130px'}} > Send </Button> 
        </Box>
      </form>
      </Modal>
    </div>
  )
}

export default ToDoTable
