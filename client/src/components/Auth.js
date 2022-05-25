import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import Navbar from './Navbar';
import Input from './Input';

import useStyles from './styles';
import axios from 'axios';

const initialState = { subject: '', emailBody: '' };

const Auth = () => {
  const classes = useStyles();
  const [Data, setData] = useState(initialState);
  const [successMsg, setSuccessMsg] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("subject", Data.subject);
    formData.append("emailBody", Data.emailBody);
    formData.append("excelFile", file);
 
    axios.post('/api/v1/sendmail', formData)
    .then((res) => {
      setSuccessMsg(res.data);
      console.log(res.data)
    }).catch((err) => {
      console.log(err.response);
    });
  }

  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  }
  
  const handleFile = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files);
  }
  
  return (
    <>
      <Navbar/>
      <Container component='main' maxWidth='xs'>
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography variant='h5'> Send Email </Typography>
          <form className={classes.form} onSubmit={handleSubmit} encType="multipart/form-data" >
            <Grid container spacing={2}>
              {/* <Input name='email' label='Email Address' handleChange={handleChange} type='email' /> */}
              <Input name='subject' label='Subject' handleChange={handleChange} />
              <Input name='emailBody' label='Body' handleChange={handleChange} />
              <div className='form-group'>
                <label htmlFor='file'>Choose the excel file</label>
                <input type="file" name='file' onChange={handleFile} />
              </div>
            </Grid>
            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
              Submit
            </Button>
            {successMsg && 
              <Typography variant='h5'>{successMsg}</Typography>
            }
          </form>
        </Paper>
      </Container>
    </>
  )
}

export default Auth;