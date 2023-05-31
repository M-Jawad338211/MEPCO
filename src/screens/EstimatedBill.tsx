import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import { Box, Button, FormControl, IconButton, Input, InputAdornment, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import Sidebar from '../components/sidebar';
import Drawer from '@mui/material/Drawer';
import yellow from '../assets/yellow.png';
import blue from '../assets/blue.png';
import { Padding } from '@mui/icons-material';


const EstimatedBill: React.FC = () => {
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

            <Box sx={{ width: '100%', typography: 'body1', marginLeft: '3%', marginRight: '3%' }}>

                <Grid container item spacing={2} sx={{}}>
                    <Grid item lg={12}><p style={{ fontWeight: "500", textAlign: 'center' }}>Bill Estimator</p></Grid>
                        <Grid item lg={12} sx={{ backgroundColor: '#EAEFF5', borderRadius: "6px", padding: 5, marginLeft:'1.5%' }}>
                            <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center', paddingTop: 3 }}>
                                Total Estimated Bill
                            </Typography>
                            <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 20, fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>
                                RS. 125,030
                            </Typography>
                        </Grid>


                   
                </Grid>

                <Box style={{ border: '1px solid gray', borderRadius: '6px', marginTop: '1%', padding: 10, paddingLeft:'3%',paddingRight:'3%'}}>
                    <Paper >
                        <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: 'bold', textAlign: 'center', padding: 1}}>
                            Components Name
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#E6EAEC',padding:1 }}>
                            <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginLeft: '20%' }}>
                                Electricity charges
                            </Typography>
                            <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginRight: '20%' }}>
                                123.965
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',padding:1 }}>
                            <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginLeft: '20%' }}>
                               Variable charges
                            </Typography>
                            <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginRight: '20%' }}>
                                774.00
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#E6EAEC',padding:1}}>
                            <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginLeft: '20%' }}>
                                AQTA
                            </Typography>
                            <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginRight: '20%' }}>
                                50.87
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',padding:1 }}>
                            <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginLeft: '20%' }}>
                                M.Rent
                            </Typography>
                            <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginRight: '20%' }}>
                                0.00
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#E6EAEC',padding:1 }}>
                            <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginLeft: '20%' }}>
                            S.Rent
                            </Typography>
                            <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginRight: '20%' }}>
                                0.00
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',padding:1}}>
                            <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginLeft: '20%' }}>
                                LPF Penalty
                            </Typography>
                            <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginRight: '20%' }}>
                                0.00
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#E6EAEC' ,padding:1}}>
                            <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginLeft: '20%' }}>
                                F.C SUR
                            </Typography>
                            <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginRight: '20%' }}>
                                43.00
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' ,padding:1}}>
                            <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginLeft: '20%' }}>
                               E.D
                            </Typography>
                            <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginRight: '20%' }}>
                                12.37
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#E6EAEC' ,padding:1}}>
                            <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginLeft: '20%' }}>
                               GST
                            </Typography>
                            <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginRight: '20%' }}>
                               149.64
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',padding:1}}>
                            <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginLeft: '20%' }}>
                                Rtax
                            </Typography>
                            <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginRight: '20%' }}>
                                0.00
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#E6EAEC' ,padding:1}}>
                            <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginLeft: '20%' }}>
                               Ftax
                            </Typography>
                            <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginRight: '20%' }}>
                                0.00
                            </Typography>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Box>
    )
}

export default EstimatedBill