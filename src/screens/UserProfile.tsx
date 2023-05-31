import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import { Box, Button, IconButton, Input, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import { Person, Create, AccountCircle, Phone, Email, ContactMail, Close, VpnKey } from '@mui/icons-material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Modal from '@mui/material/Modal';
import '../styles/UserProfile.scss'
import Sidebar from '../components/sidebar';
import Drawer from '@mui/material/Drawer';
import singlem from '../assets/singlemeter.png';


const UserProfile: React.FC = () => {

    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [isEditableName, setisEditableName] = React.useState(false);
    const updateState1 = () => {
        setisEditableName(!isEditableName)
        setisEditableemail(false)
        setisEditablePhone(false)
        setisEditableUser(false)
        setisEditablePassword(false)

    }


    const [isEditableemail, setisEditableemail] = React.useState(false);
    const updateState2 = () => {
        setisEditableemail(!isEditableemail)
        setisEditableName(false)
        setisEditablePhone(false)
        setisEditableUser(false)
        setisEditablePassword(false)
    }


    const [isEditablePhone, setisEditablePhone] = React.useState(false);
    const updateState3 = () => {
        setisEditablePhone(!isEditablePhone)
        setisEditableemail(false)
        setisEditableName(false)
        setisEditableUser(false)
        setisEditablePassword(false)
    }


    const [isEditableUser, setisEditableUser] = React.useState(false);
    const updateState4 = () => {
        setisEditableUser(!isEditableUser)
        setisEditableemail(false)
        setisEditableName(false)
        setisEditablePassword(false)
        setisEditablePhone(false)
    }


    const [isEditablePassword, setisEditablePassword] = React.useState(false);
    const updateState5 = () => {
        setisEditablePassword(!isEditablePassword)
        setisEditableemail(false)
        setisEditableName(false)
        setisEditableUser(false)
        setisEditablePhone(false)
    }

    const [isEditableForm, setisEditableForm] = React.useState(true);
    const updateStateForm = () => {
        setisEditableForm(!isEditableForm)
        setisEditableName(false)
        setisEditableemail(false)
        setisEditablePhone(false)
        setisEditableUser(false)
        setisEditablePassword(false)
    }


    const MeterDetails = [
        {
            name: "MAJID ALI 1",
            reference: 271517100680001,
            meterType: "Normal",
            phase: "1-Phase",
            image: singlem
        },
        {
            name: "MAJID ALI 2",
            reference: 271517100680002,
            meterType: "AB_Normal 1",
            phase: "1-Phase 1",
            image: singlem
        },
        {
            name: "MAJID ALI 3",
            reference: 271517100680003,
            meterType: "AB_Normal 2",
            phase: "1-Phase 2",
            image: singlem
        },
        {
            name: "MAJID ALI 4",
            reference: 271517100680004,
            meterType: "AB_Normal 3",
            phase: "1-Phase 3",
            image: singlem
        }
    ];

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
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>

                    <Box className='HeaderTXT' sx={{ borderBottom: 1, height: 1000, marginLeft: '6%', marginRight: '-20%', marginTop: '2%', alignItems: 'center', alignContent: 'center', justifyItems: 'center', justifyContent: 'center' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">

                            <Tab label="Basic Information" value="1" />
                            <Tab label="Meter Information" value="2" />

                        </TabList>


                        <TabPanel value="1" className='MainHeading'>

                            <Paper elevation={2} className='Form'>
                                <Box className='Bar1'>

                                    <Box className='Inputview1'>

                                        <Box className='IconTxt'>

                                            <Box sx={{ marginLeft: 0.5 }}>
                                                <Person className='Icon' sx={{ fontSize: 17 }} />
                                            </Box>

                                            <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 10, fontWeight: 'bold', marginTop: 0.35, marginLeft: 1 }}>
                                                Name
                                            </Typography>

                                        </Box>
                                        <Box className='TextFieldView' >
                                            {isEditableName ?
                                                <TextField className="NameInputFlield" label="Enter Name" variant="outlined" size="small" sx={{ backgroundColor: '#EEF1F8', border: 0 }} />
                                                :
                                                <TextField disabled className="NameInputFlield" label="Enter Name" variant="outlined" size="small" sx={{ backgroundColor: '#EEF1F8', border: 0 }} />}
                                            <Create className='IconPencil' sx={{ fontSize: 22 }} onClick={updateState1} />
                                        </Box>

                                    </Box>


                                    <Box className='Inputview2'>

                                        <Box className='IconTxt'>

                                            <Box sx={{ marginLeft: 0.5 }}>
                                                <Email className='Icon' sx={{ fontSize: 17 }} />
                                            </Box>

                                            <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 10, fontWeight: 'bold', marginTop: 0.35, marginLeft: 1 }}>
                                                Email
                                            </Typography>

                                        </Box>
                                        <Box className='TextFieldView'>
                                            {isEditableemail ?
                                                <TextField className="NameInputFlield" label="Enter Email" variant="outlined" size="small" sx={{ backgroundColor: '#EEF1F8', border: 0, }} />
                                                : <TextField disabled className="NameInputFlield" label="Enter Email" variant="outlined" size="small" sx={{ backgroundColor: '#EEF1F8', border: 0, }} />
                                            }<Create className='IconPencil' sx={{ fontSize: 22 }} onClick={updateState2} />
                                        </Box>

                                    </Box>



                                </Box>

                                <Box className='Bar2'>

                                    <Box className='Inputview1'>

                                        <Box className='IconTxt'>

                                            <Box sx={{ marginLeft: 0.5 }}>
                                                <Phone className='Icon' sx={{ fontSize: 17 }} />
                                            </Box>

                                            <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 10, fontWeight: 'bold', marginTop: 0.35, marginLeft: 1 }}>
                                                Phone No.
                                            </Typography>

                                        </Box>
                                        <Box className='TextFieldView'>
                                            {isEditablePhone ?
                                                <TextField className="NameInputFlield" label="Enter Phone No." variant="outlined" size="small" sx={{ backgroundColor: '#EEF1F8', border: 0, }} />
                                                :
                                                <TextField disabled className="NameInputFlield" label="Enter Phone No." variant="outlined" size="small" sx={{ backgroundColor: '#EEF1F8', border: 0, }} />
                                            }<Create className='IconPencil' sx={{ fontSize: 22 }} onClick={updateState3} />
                                        </Box>

                                    </Box>


                                    <Box className='Inputview2'>

                                        <Box className='IconTxt'>

                                            <Box sx={{ marginLeft: 0.5 }}>
                                                <ContactMail className='Icon' sx={{ fontSize: 17 }} />
                                            </Box>

                                            <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 10, fontWeight: 'bold', marginTop: 0.35, marginLeft: 1 }}>
                                                CNIC No.
                                            </Typography>

                                        </Box>
                                        <Box className='TextFieldView'>
                                            <TextField disabled className="NameInputFlield" label="Enter CNIC No." variant="outlined" size="small" sx={{ backgroundColor: '#EEF1F8', border: 0, }} />

                                        </Box>

                                    </Box>



                                </Box>

                                <Box className='Bar3'>

                                    <Box className='Inputview1'>

                                        <Box className='IconTxt'>

                                            <Box sx={{ marginLeft: 0.5 }}>
                                                <AccountCircle className='Icon' sx={{ fontSize: 17 }} />
                                            </Box>

                                            <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 10, fontWeight: 'bold', marginTop: 0.35, marginLeft: 1 }}>
                                                User Id
                                            </Typography>

                                        </Box>
                                        <Box className='TextFieldView'>
                                            {isEditableUser ?
                                                <TextField className="NameInputFlield" label="Enter User Id" variant="outlined" size="small" sx={{ backgroundColor: '#EEF1F8', border: 0, }} />
                                                :
                                                <TextField disabled className="NameInputFlield" label="Enter User Id" variant="outlined" size="small" sx={{ backgroundColor: '#EEF1F8', border: 0, }} />
                                            }<Create className='IconPencil' sx={{ fontSize: 22 }} onClick={updateState4} />
                                        </Box>

                                    </Box>


                                    <Box className='Inputview2'>

                                        <Box className='IconTxt'>

                                            <Box sx={{ marginLeft: 0.5 }}>
                                                <VpnKey className='Icon' sx={{ fontSize: 17 }} />
                                            </Box>

                                            <Typography variant="h5" className='InputAboveTxt' sx={{ fontSize: 10, fontWeight: 'bold', marginTop: 0.35, marginLeft: 1 }}>
                                                Password
                                            </Typography>

                                        </Box>
                                        <Box className='TextFieldView'>
                                            {isEditablePassword ?
                                                <TextField className="NameInputFlield" label="Enter Password" type="password" InputProps={{ endAdornment: (false) }} variant="outlined" size="small" sx={{ backgroundColor: '#EEF1F8', border: 0 }} />
                                                : <TextField disabled className="NameInputFlield" label="Enter Password" type="password" InputProps={{ endAdornment: (false) }} variant="outlined" size="small" sx={{ backgroundColor: '#EEF1F8', border: 0, }} />
                                            }

                                            <Create className='IconPencil' sx={{ fontSize: 22 }} onClick={handleOpen} />


                                            <Modal
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >

                                                <Box sx={{ marginLeft: '33.5%', flexDirection: 'column', display: 'flex', marginTop: '12.5%', borderRadius: 5, position: 'absolute' as 'absolute', width: 450, height: 350, boxShadow: 20, backgroundColor: 'white', zIndex: '30' }}>
                                                    <Close className='Icon' sx={{ fontSize: 20, marginLeft: '90%', marginTop: '5%' }} onClick={handleClose} />
                                                    <TextField className="NewPassword" label="Current Password" type="password" InputProps={{ endAdornment: (false) }} variant="outlined" size="small" sx={{ backgroundColor: '#EEF1F8', borderRadius: 3, width: '78%', marginTop: '9.5%', marginLeft: '11.5%' }} />
                                                    <TextField className="NewPassword" label="New Password" type="password" InputProps={{ endAdornment: (false) }} variant="outlined" size="small" sx={{ backgroundColor: '#EEF1F8', borderRadius: 3, width: '78%', marginTop: '3.5%', marginLeft: '11.5%' }} />
                                                    <TextField className="NewPassword" label="Confirm Password" type="password" InputProps={{ endAdornment: (false) }} variant="outlined" size="small" sx={{ backgroundColor: '#EEF1F8', borderRadius: 3, width: '78%', marginTop: '3.5%', marginLeft: '11.5%' }} />
                                                    <Button className="UpdatePasswordButton" variant="contained" sx={{ fontSize: 14, display: 'flex', height: '12.5%', marginTop: "8%", width: '44%', marginLeft: '30.5%' }} >
                                                        Update Password
                                                    </Button>
                                                </Box>

                                            </Modal>


                                        </Box>

                                    </Box>



                                </Box>
                            </Paper>

                            <Button className="UpdateButton" variant="contained" sx={{ fontSize: 16, display: 'flex', marginLeft: "60%", marginTop: "2%" }} onClick={updateStateForm}>
                                Update Profile
                            </Button>
                        </TabPanel>

                        <TabPanel value="2" className='MainHeading2' sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '70%' }}>
                            {MeterDetails.map((item, index) => (
                                <Box className='MeterView' sx={{ display: 'flex', flexDirection: 'row', marginleft: -10 }}>

                                    <Box className='Meter1' sx={{ borderRadius: 4, width: '90%', height: 110 }}>

                                        {/* <img src={require('../assets/single_phase_meter_icon 1.png')} style={{width: '11%', height: '65%', marginLeft: '9%', marginTop: '5%'}}/>
                             */}

                                        <img src={item.image} style={{ width: '15%', height: '65%', marginLeft: '9%', marginTop: '5%' }} />

                                        <Box className='MeterTextView' key={index}>
                                            <Box className='TextBox1'>
                                                <Typography sx={{ fontSize: 11, width: 80, marginLeft: '15%', fontWeight: 'semibold', marginTop: '14%' }} className='Txt1'>Name:</Typography>
                                                <Typography sx={{ fontSize: 11, width: 120, marginLeft: '-21%', marginTop: '14%' }} className='Txt2'>{item.name}</Typography>
                                            </Box>

                                            <Box className='TextBox1'>
                                                <Typography sx={{ fontSize: 11, width: 80, marginLeft: '15%', fontWeight: 'semibold', marginTop: '0.2%' }} className='Txt1'>Reference:</Typography>
                                                <Typography sx={{ fontSize: 11, width: 120, marginLeft: '-7%', marginTop: '0.2%' }} className='Txt2'>{item.reference}</Typography>
                                            </Box>

                                            <Box className='TextBox1'>
                                                <Typography sx={{ fontSize: 11, width: 80, marginLeft: '15%', fontWeight: 'semibold', marginTop: '0.2%' }} className='Txt1'>Meter Type:</Typography>
                                                <Typography sx={{ fontSize: 11, width: 120, marginLeft: '-4%', marginTop: '0.2%' }} className='Txt2'>{item.meterType}</Typography>
                                            </Box>

                                            <Box className='TextBox1'>
                                                <Typography sx={{ fontSize: 11, width: 80, marginLeft: '15%', fontWeight: 'semibold', marginTop: '0.2%' }} className='Txt1'>Meter Phase:</Typography>
                                                <Typography sx={{ fontSize: 11, width: 120, marginLeft: '1.2%', marginTop: '0.2%' }} className='Txt2'>{item.phase}</Typography>
                                            </Box>
                                        </Box>

                                    </Box>



                                    {/* <Box className='Meter1' sx={{ borderRadius: 4, width: '60%', marginLeft: '2%', height: 110}}>
                            <Box sx={{width: '100%', height: '65%', marginLeft: '9%', marginTop: '5%'}}>
                            <img src={require('../assets/single_phase_meter_icon 1.png')} style={{width: '11%', height: '65%', marginLeft: '9%', marginTop: '5%'}}/>
                            </Box>
                            <Box className='MeterTextView'>
                                <Box className='TextBox1'>
                                <Typography sx={{ fontSize: 11,width: 80, marginLeft: '15%',fontWeight: 'semibold', marginTop: '14%'}} className='Txt1'>Name:</Typography>
                                <Typography sx={{ fontSize: 11,width: 120, marginLeft: '-21%', marginTop: '14%'}} className='Txt2'>{item.name}</Typography>
                                </Box>

                                <Box className='TextBox1'>
                                <Typography sx={{ fontSize: 11,width: 80, marginLeft: '15%',fontWeight: 'semibold', marginTop: '0.2%'}} className='Txt1'>Reference:</Typography>
                                <Typography sx={{ fontSize: 11,width: 120, marginLeft: '-7%', marginTop: '0.2%'}} className='Txt2'>{item.reference}</Typography>
                                </Box>

                                <Box className='TextBox1'>
                                <Typography sx={{ fontSize: 11,width: 80, marginLeft: '15%',fontWeight: 'semibold', marginTop: '0.2%'}} className='Txt1'>Meter Type:</Typography>
                                <Typography sx={{ fontSize: 11,width: 120, marginLeft: '-4%', marginTop: '0.2%'}} className='Txt2'>{item.meterType}</Typography>
                                </Box>

                                <Box className='TextBox1'>
                                <Typography sx={{ fontSize: 11,width: 80, marginLeft: '15%',fontWeight: 'semibold', marginTop: '0.2%'}} className='Txt1'>Meter Phase:</Typography>
                                <Typography sx={{ fontSize: 11,width: 120, marginLeft: '1.2%', marginTop: '0.2%'}} className='Txt2'>{item.phase}</Typography>
                                </Box>
                            </Box>

                        </Box> */}

                                </Box>
                            ))}
                        </TabPanel>



                    </Box>


                </TabContext>
            </Box>
        </Box>
    )
}

export default UserProfile