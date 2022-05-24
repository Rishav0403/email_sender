import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Navbar = () => {
  return (
  <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{backgroundColor:'#ecf0f3', maxWidth:'95%', margin: '2.5%', marginTop: '0.5%', borderRadius: '10px'}} position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, color:'black', fontWeight:'700' }}>
            Email sender
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  </>
  );
}

export default Navbar;