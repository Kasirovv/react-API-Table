import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import BackupIcon from '@mui/icons-material/Backup';
import axios from 'axios';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'white',
    boxShadow: 24,
    p: 5,
    display:'flex',
  };

function ToDoAdd() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const BaseURL = 'http://2.56.213.92:5001/todos';
    
    const postUser = async (obj) => {
        try {
          const { data } = await axios.post(BaseURL,obj)
        } catch (error) {
          console.log(error)
        }
    }

    const text = (elem) => {
      elem.preventDefault();
      const obj = {
        title:elem.target['title'].value,
        message:elem.target['message'].value,
        comlete:false,
      }
      postUser(obj);
      handleClose();
  }


  return (
    <div className='flex justify-center py-7'>
        <Button variant="contained" endIcon={<BackupIcon />} onClick={handleOpen}> Upload </Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <form onSubmit={text}>  
            <Box sx={style}>
                <TextField  name='title' id="outlined-basic" label="Title" variant="outlined" sx={{marginX:'15px'}} />
                <TextField  name='message' id="outlined-multiline-flexible" label="Message" multiline maxRows={4} sx={{marginX:'15px'}} />
                <Button     type='submit' variant="contained" endIcon={<SendIcon />} sx={{marginX:'15px', width:'130px'}} > Send </Button>  
            </Box>
          </form>  

      </Modal>
    </div>
  )
}

export default ToDoAdd