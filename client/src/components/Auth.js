import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import Navbar from './Navbar';
import Input from './Input';

import useStyles from './styles';
import axios from 'axios';

const initialState = { email: '', subject: '', emailBody: '' };

const Auth = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/v1/sendmail', formData)
    .then((res) => {
      setSuccessMsg(res.data);
      console.log(res.data)
    }).catch((err) => {
      console.log(err.response);
    });
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
              <Input name='subject' label='Subject' handleChange={handleChange} />
              <Input name='emailBody' label='Body' handleChange={handleChange} />
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