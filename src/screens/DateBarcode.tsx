import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Sidebar from '../components/sidebar';
import { Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Barcode from 'react-barcode';

const  DateBarcode: React.FC = () =>{
  let navigate = useNavigate()
  const [value, setValue] = React.useState<number>(0);
  const ID : any = window.localStorage.getItem('id')


  return (
    <Box sx={{ display: 'flex' }}>
            <Box
        component="nav"
        sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, borderTopRightRadius: '15px', backgroundColor: "#EAEFF5" },
          }}
        >
          <Sidebar />
        </Drawer>
      </Box>

      <Grid container item spacing={2} sx={{ marginLeft: '3%', marginRight: '3%' }} >
      <Grid item lg={12}><p style={{ fontWeight: "600", color: 'black', marginTop: "3%", textAlign: 'center',fontSize: 15, }}>Due Date </p></Grid>
      <Grid item lg={12}><p style={{fontSize: 20, fontWeight: 'bold',   color: 'black', marginTop: "3%", textAlign: 'center' }}> Your due date Id </p></Grid>

            <Box className='barcode' sx ={{alignItems:'center', marginTop:'4%', marginLeft:'39%'}}>
                <Barcode value={ID} />
            </Box>
      
       <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={() => navigate("/Services")}
          // onClick={LoginHandler}
          sx={{
            mt: 8, backgroundColor: '#114D9C', fontSize: 'small', textTransform: 'capitalize',
            height: 32, width: '30%', marginLeft: '35%', marginBottom: '2%', borderRadius: 20
          }}
        >
          Continue
        </Button> 
      </Grid>
    </Box>
  )
}
export default DateBarcode
