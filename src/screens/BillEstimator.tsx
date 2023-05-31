import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import { Box, Button, FormControl, IconButton, Input, InputAdornment, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import Sidebar from '../components/sidebar';
import Drawer from '@mui/material/Drawer';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';

const BillEstimator: React.FC = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const [kwProfile, setKwProfile] = useState(true);
  const [currentProfile, setCurrentProfile] = useState(false);
  const [voltageProfile, setVoltageProfile] = useState(false);
  const [isKwActive, setIsKwActive] = useState(true);
  const [isCurrentActive, setIsCurrentActive] = useState(false);
  const [isVoltageActive, setIsVoltageActive] = useState(false);
  const emailHandler = () => {
    setKwProfile(true);
    setCurrentProfile(false);
    setVoltageProfile(false);
    setIsKwActive(true);
    setIsCurrentActive(false);
    setIsVoltageActive(false);
    // setLabel("Email");
  };
  const cnicHandler = () => {
    // setLabel("cnic");
    setKwProfile(false);
    setCurrentProfile(true);
    setVoltageProfile(false);
    setIsCurrentActive(true);
    setIsKwActive(false);
    setIsVoltageActive(false);
  };
  const phoneHandler = () => {
    // setLabel("phone");
    setKwProfile(false);
    setCurrentProfile(false);
    setVoltageProfile(true);
    setIsVoltageActive(true);
    setIsKwActive(false);
    setIsCurrentActive(false);
  };
  let navigate = useNavigate();

  const LoginHandler = () => {
    window.localStorage.setItem('Name', "Ammad")
    let path = `/EstimatedBill`;
    navigate(path)
  }

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
        // open
        >
          <Sidebar />
        </Drawer>
      </Box>




      <Grid container item spacing={2} sx={{ marginLeft: '3%', marginRight: '3%' }}>
        <Grid item lg={12}><p style={{ fontWeight: "500", textAlign: 'center' }}>Bill Estomator</p></Grid>
        <div style={{
          flexDirection: "row",
          display: "flex",
          marginLeft: "3%",
          width: "85%",
        }}>
          <div style={{ color: isKwActive ? "blue" : "black", backgroundColor: "white" }}
            onClick={emailHandler} >
            <label style={{ fontSize: '14px', fontWeight: '600', }}>Meter List</label>
          </div>
          <div style={{ color: isCurrentActive ? "blue" : "black", backgroundColor: "white", marginLeft: '2%' }}
            onClick={cnicHandler}>
            <label style={{ fontSize: '14px', fontWeight: '600', }} >Bill Estimator</label>
          </div>
          {/* <div style={{ color: isVoltageActive ? "blue" : "black", backgroundColor: "white", marginLeft: '2%' }}
            onClick={phoneHandler} >
            <label style={{ fontSize: '12px', fontWeight: '600' }}>Voltage Profile</label>
          </div> */}
        </div>

        {currentProfile &&
          <Box sx={{ marginTop: '3%', marginLeft: '2%', width: '100%', typography: 'body1' }}>
            <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 14, fontWeight: 'bold', marginTop: 0.35, marginLeft: 1 }}>
              Select Tariff
            </Typography>
            <FormControl sx={{ minWidth: 1000, backgroundColor: '#E6EAEC', marginTop: '1%' }} size="small">
              <Select
                value={age}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <Grid container item spacing={2} sx={{ marginTop: "1%", display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Grid item lg={4} >
                <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 14, fontWeight: 'bold', marginTop: 0.35, marginLeft: 1 }}>
                  Off Peak Units
                </Typography>
                <TextField
                  margin="normal"
                  // className='textfield'
                  sx={{ backgroundColor: '#E6EAEC', marginTop: '1%' }}
                  required
                  fullWidth
                  // value={values.email}
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                  id="email"
                  name="email"
                  label=""
                  autoComplete=""
                  size='small' />
              </Grid>
              <Grid item lg={4} >
                <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 14, fontWeight: 'bold', marginTop: 0.35, marginLeft: 1 }}>
                  Peak Units
                </Typography>
                <TextField
                  margin="normal"
                  // className='textfield'
                  sx={{ backgroundColor: '#E6EAEC', marginTop: '1%' }}
                  required
                  fullWidth
                  // value={values.email}
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                  id="email"
                  name="email"
                  label=""
                  autoComplete=""
                  size='small' />
              </Grid>
              <Grid item lg={4} >
                <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 14, fontWeight: 'bold', marginTop: 0.35, marginLeft: 1 }}>
                  Total Units
                </Typography>
                <TextField
                  margin="normal"
                  // className='textfield'
                  sx={{ marginTop: '1%' }}
                  required
                  fullWidth
                  // value={values.email}
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                  id="email"
                  name="email"
                  label=""
                  autoComplete=""
                  size='small' />
              </Grid>
            </Grid>

            <Grid container item spacing={2} sx={{ marginTop: "1%", display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Grid item lg={6} >
                <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 14, fontWeight: 'bold', marginTop: 0.35, marginLeft: 1 }}>
                  Standard Classification Code
                </Typography>
                <FormControl sx={{ minWidth: 490, backgroundColor: '#E6EAEC', marginTop: '1%' }} size="small">
                  <Select
                    value={age}
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item lg={6} >
                <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 14, fontWeight: 'bold', marginTop: 0.35, marginLeft: 1 }}>
                  Sanctioned Load
                </Typography>
                <TextField
                  margin="normal"
                  // className='textfield'
                  sx={{ backgroundColor: '#E6EAEC', marginTop: '1%' }}
                  required
                  fullWidth
                  // value={values.email}
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                  id="email"
                  name="email"
                  label=""
                  autoComplete=""
                  size='small' />
              </Grid>
            </Grid>

            <Grid container item spacing={2} sx={{ marginTop: "1%", display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Grid item lg={6} >
                <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 14, fontWeight: 'bold', marginTop: 0.35, marginLeft: 1 }}>
                  MDI Peak
                </Typography>
                <TextField
                  margin="normal"
                  // className='textfield'
                  sx={{ backgroundColor: '#E6EAEC', marginTop: '1%' }}
                  required
                  fullWidth
                  // value={values.email}
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                  id="email"
                  name="email"
                  label=""
                  autoComplete=""
                  size='small' />
              </Grid>
              <Grid item lg={6} >
                <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 14, fontWeight: 'bold', marginTop: 0.35, marginLeft: 1 }}>
                  MDI Off Peak
                </Typography>
                <TextField
                  margin="normal"
                  // className='textfield'
                  sx={{ backgroundColor: '#E6EAEC', marginTop: '1%' }}
                  required
                  fullWidth
                  // value={values.email}
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                  id="email"
                  name="email"
                  label=""
                  autoComplete=""
                  size='small' />
              </Grid>
            </Grid>

            <Grid container item spacing={2} sx={{ marginTop: "1%", display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Grid item lg={6} >
                <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 14, fontWeight: 'bold', marginTop: 0.35, marginLeft: 1 }}>
                  KVARH Peak
                </Typography>
                <TextField
                  margin="normal"
                  // className='textfield'
                  sx={{ backgroundColor: '#E6EAEC', marginTop: '1%' }}
                  required
                  fullWidth
                  // value={values.email}
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                  id="email"
                  name="email"
                  label=""
                  autoComplete=""
                  size='small' />
              </Grid>
              <Grid item lg={6} >
                <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 14, fontWeight: 'bold', marginTop: 0.35, marginLeft: 1 }}>
                  KVARH Off Peak
                </Typography>
                <TextField
                  margin="normal"
                  // className='textfield'
                  sx={{ backgroundColor: '#E6EAEC', marginTop: '1%' }}
                  required
                  fullWidth
                  // value={values.email}
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                  id="email"
                  name="email"
                  label=""
                  autoComplete=""
                  size='small' />
              </Grid>
            </Grid>

            <Box style={{ border: '1px solid gray', borderRadius: '6px', marginTop: '1%', padding: '10px' }}>
              <Grid container item spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Grid item lg={4} sx={{ display: 'flex', flexDirection: 'row' }}><Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: 'bold', marginTop: '4%', }}>
                  Seasonal Code
                </Typography><Checkbox sx={{ marginLeft: '30%' }} defaultChecked />
                </Grid>
                <Grid item lg={4} sx={{ display: 'flex', flexDirection: 'row' }}><Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: 'bold', marginTop: '4%', }}>
                  F Tax Exempt
                </Typography><Checkbox sx={{ marginLeft: '30%' }} defaultChecked />
                </Grid>
                <Grid item lg={4} sx={{ display: 'flex', flexDirection: 'row' }}><Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: 'bold', marginTop: '4%', }}>
                  Rs Tax Exempt
                </Typography><Checkbox sx={{ marginLeft: '30%' }} defaultChecked />
                </Grid>
                <Grid item lg={4} sx={{ display: 'flex', flexDirection: 'row', marginTop: '-2%' }}><Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: 'bold', marginTop: '4%', }}>
                  ED Exempt
                </Typography><Checkbox sx={{ marginLeft: '38%' }} defaultChecked />
                </Grid>
                <Grid item lg={4} sx={{ display: 'flex', flexDirection: 'row', marginTop: '-2%' }}><Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: 'bold', marginTop: '4%', }}>
                  GST Exempt
                </Typography><Checkbox sx={{ marginLeft: '32%' }} defaultChecked />
                </Grid>
                <Grid item lg={4} sx={{ display: 'flex', flexDirection: 'row', marginTop: '-2%' }}><Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: 'bold', marginTop: '4%', }}>
                  IT Tax Exempt
                </Typography><Checkbox sx={{ marginLeft: '31%' }} defaultChecked />
                </Grid>
                <Grid item lg={4} sx={{ display: 'flex', flexDirection: 'row', marginTop: '-2%' }}><Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: 'bold', marginTop: '4%', }}>
                  Sales Tax Exempt
                </Typography><Checkbox sx={{ marginLeft: '26%' }} defaultChecked />
                </Grid>
                <Grid item lg={8} sx={{ display: 'flex', flexDirection: 'row', marginTop: '-2%' }}><Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: 'bold', marginTop: '2%', }}>
                  E Tax Exempt
                </Typography><Checkbox sx={{ marginLeft: '15%' }} defaultChecked />
                </Grid>


              </Grid>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              // onClick={() => handleSubmit}
              onClick={LoginHandler}
              sx={{
                mt: 3, backgroundColor: '#3760E7', fontSize: 'small', textTransform: 'capitalize',
                height: 32, width: '30%', marginLeft: '30%', marginBottom: '5%', borderRadius: 20
              }}
            >
              Procced
            </Button>

          </Box>


        }
        {kwProfile &&
          <Box>
            <FormControl sx={{ m: 1, minWidth: 800 }} size="small">
              <Select
                value={age}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>


        }
        {/* {
          voltageProfile &&
          <Box>
          <FormControl sx={{ m: 1, minWidth:800 }} size="small">
           <Select
             value={age}
             onChange={handleChange}
           >
             <MenuItem value="">
               <em>None</em>
             </MenuItem>
             <MenuItem value={10}>Ten</MenuItem>
             <MenuItem value={20}>Twenty</MenuItem>
             <MenuItem value={30}>Thirty</MenuItem>
           </Select>
         </FormControl>
          </Box>
        } */}

      </Grid>
    </Box>
  )
}

export default BillEstimator