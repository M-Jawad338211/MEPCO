import React, {useState, useRef, useMemo} from 'react'
import Grid from '@mui/material/Grid';
import { Box, Button, IconButton, Input, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import { Person, Create, AccountCircle, Phone, Email, ContactMail, Close, VpnKey, Style, LabelOff } from '@mui/icons-material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Modal from '@mui/material/Modal';
import '../styles/Payments.scss';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Sidebar from '../components/sidebar';
import Drawer from '@mui/material/Drawer';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 10.5,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  function createData(
    month: string,
    billed: number,
    paid: number,
   
  ) {
    return { month, billed, paid};
  }
  
  const rows = [
    createData('Nov-21', 166752, 166752),
    createData('Dec-21', 166752, 166752),
    createData('Jan-22', 166752, 166752),
    createData('Feb-22', 166752, 166752),
    createData('Mar-22', 166752, 166752),
    createData('Apr-22', 166752, 166752),
    createData('May-22', 166752, 166752),
  ];
  

const options: Highcharts.Options = { 
    
    chart: {
        height: (9 / 60.5 * 100) + '%' ,

        type: 'bar',
    },
    
    
    title: {
        text: ''
    },
  
    xAxis: {
        
        height: 200,
        categories: ['Nov-22', 'Oct-22','Sep-22', 'Aug-22', 'Jul-22', 'Jun-22', 'May-22', 'Apr-22', 'Mar-22', 'Feb-22','Jan-22', 'Dec-21', 'Nov-21'],
        title: {
          text: ''
        }  
      },

    
      yAxis: {
        width: 800,
      height:150,
        min: 0,
        // categories: ['50k', '100k', '150k', '200k', '250k', '300k', '350k', '400k', '450k' ],
        title: {
            text: ''
          } ,
          labels:{
            overflow:'justify'
          }
      
      },
      tooltip: {
        // valueSuffix: 'k',
        // borderColor:'black',
        // borderRadius:3,
        // borderWidth:1
        
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: false
          }
        },
        
        series: {
                events: {
                    legendItemClick: function(e) {
                        e.preventDefault();
                    }
                }
            }
        
       
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -30,
        y: 10,
        floating: true,
        borderWidth: 0,
        borderRadius: 0,
        backgroundColor:'white',
        shadow: false,
        enabled:true,
        
          
      },

      credits: {
        enabled: false
      },
    
    series: [{
        name: 'Payment',
        type: 'bar',
        color: 'orange',
        data: [176752, 201765, 156756, 425756, 211756, 219756, 113756, 313756, 103756, 146756, 132756, 138756, 201000]
    }
    ]
};

const NewConnection:React.FC = (props: HighchartsReact.Props) => {

    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };


  


//     const [open, setOpen] = React.useState(false);
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);


//     const [isEditableName, setisEditableName] = React.useState(false);
//     const updateState1 = ()=>
//      { 
//         setisEditableName(!isEditableName)
//         setisEditableemail(false) 
//         setisEditablePhone(false)
//         setisEditableUser(false)
//         setisEditablePassword(false)

//       }


//     const [isEditableemail, setisEditableemail] = React.useState(false);
//     const updateState2 = ()=>
//      {
//         setisEditableemail(!isEditableemail)
//         setisEditableName(false)
//         setisEditablePhone(false)
//         setisEditableUser(false)
//         setisEditablePassword(false)
//     }


//     const [isEditablePhone, setisEditablePhone] = React.useState(false);
//     const updateState3 = ()=> 
//     {
//         setisEditablePhone(!isEditablePhone)
//         setisEditableemail(false)
//         setisEditableName(false)
//         setisEditableUser(false)
//         setisEditablePassword(false)
//     }


//     const [isEditableUser, setisEditableUser] = React.useState(false);
//     const updateState4 = ()=> 
//     {
//         setisEditableUser(!isEditableUser)
//         setisEditableemail(false)
//         setisEditableName(false)
//         setisEditablePassword(false)
//         setisEditablePhone(false)
//     }
    
    
//     const [isEditablePassword, setisEditablePassword] = React.useState(false);
//     const updateState5 = ()=> 
//     {
//         setisEditablePassword(!isEditablePassword)
//         setisEditableemail(false)
//         setisEditableName(false)
//         setisEditableUser(false)
//         setisEditablePhone(false)
//     }
    
//     const [isEditableForm, setisEditableForm] = React.useState(true);
//     const updateStateForm = ()=> 
//     {  
//         setisEditableForm(!isEditableForm)
//         setisEditableName(false)
//         setisEditableemail(false)
//         setisEditablePhone(false)
//         setisEditableUser(false)
//         setisEditablePassword(false)
//         }
 
   
//    const MeterDetails = [
//     {
//         name: "MAJID ALI 1",
//         reference: 271517100680001,
//         meterType: "Normal",
//         phase: "1-Phase",
//         image: '../assets/single_phase_meter_icon 1'
//     },
//     {
//         name: "MAJID ALI 2",
//         reference: 271517100680002,
//         meterType: "AB_Normal 1",
//         phase: "1-Phase 1",
//         image: '../assets/single_phase_meter_icon 1'
//     },
//     {
//         name: "MAJID ALI 3",
//         reference: 271517100680003,
//         meterType: "AB_Normal 2",
//         phase: "1-Phase 2",
//         image: '../assets/single_phase_meter_icon 1'
//     },
//     {
//         name: "MAJID ALI 4",
//         reference: 271517100680004,
//         meterType: "AB_Normal 3",
//         phase: "1-Phase 3",
//         image: '../assets/single_phase_meter_icon 1'
//     }
//    ];


const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

    return(
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

        <Box style ={{width: '100%'}}>
            {/* <Typography sx={{ color: 'black', fontSize: 16.5, fontWeight: 'semibold', alignContent: 'center', alignItems: 'center', marginLeft: '50%', marginTop: '3%'}}>Smart Payments</Typography> */}
        
        <TabContext value={value}>

        <Box style={{       
        marginRight: '-20%',
        marginTop:' 2%'}}>
                <TabList onChange={handleChange}>
                   
                    <Tab label="Smart Payment" value="1" />
                    <Tab label="Payment History" value="2" />
                    
                </TabList>
                    
                   
        <TabPanel value="1">


        <div>

        <Button variant="contained" component="label" startIcon={<FileUploadOutlinedIcon />}  >
                          Upload
                <input type="file" accept="image/*" onChange={handleImageChange} />
        </Button>
      <Box sx={{marginLeft: '30%', marginTop: '10%'}}>
      {previewImage && <img src={previewImage} alt="Preview" />}
      </Box>
    </div>
                
                {/* <Paper elevation={2} className='Form'>
                     <Box className='Bar1'>

                            <Box className='Inputview1'>

                                <Box className='IconTxt'>

                                    <Box sx={{marginLeft:0.5}}>
                                        <Person className='Icon' sx={{ fontSize: 17 }} />
                                    </Box>
                                        
                                    <Typography variant="h5" className='InputAboveTxt' sx={{fontSize: 10, fontWeight: 'bold', marginTop: 0.35, marginLeft: 1}}>
                                        Name
                                    </Typography>

                                </Box>
                            <Box className='TextFieldView' >
                              {isEditableName?
                                    <TextField  className="NameInputFlield" label="Enter Name" variant="outlined" size="small" sx={{backgroundColor:'#EEF1F8', border: 0 }  } />
                                        :
                                    <TextField disabled className="NameInputFlield" label="Enter Name" variant="outlined" size="small" sx={{backgroundColor:'#EEF1F8', border: 0 }  } />       } 
                                <Create className='IconPencil' sx={{ fontSize: 22 }} onClick={updateState1} />
                            </Box>
                           
                            </Box>


                            <Box className='Inputview2'>

                                <Box className='IconTxt'>

                                    <Box sx={{marginLeft:0.5}}>
                                        <Email className='Icon' sx={{ fontSize: 17 }} />
                                    </Box>
                                        
                                    <Typography variant="h5" className='InputAboveTxt' sx={{fontSize: 10, fontWeight: 'bold', marginTop: 0.35, marginLeft: 1}}>
                                        Email
                                    </Typography>

                                </Box>
                            <Box className='TextFieldView'>
                            {isEditableemail?
                                <TextField className="NameInputFlield" label="Enter Email" variant="outlined" size="small" sx={{backgroundColor:'#EEF1F8', border: 0, }}/>
                             :   <TextField disabled className="NameInputFlield" label="Enter Email" variant="outlined" size="small" sx={{backgroundColor:'#EEF1F8', border: 0, }}/>
                            }<Create className='IconPencil' sx={{ fontSize: 22 }} onClick={updateState2}/>
                            </Box>
                           
                            </Box>

                     
                     
                     </Box>

                     <Box className='Bar2'>

                            <Box className='Inputview1'>

                                <Box className='IconTxt'>

                                    <Box sx={{marginLeft:0.5}}>
                                        <Phone className='Icon' sx={{ fontSize: 17 }} />
                                    </Box>
                                        
                                    <Typography variant="h5" className='InputAboveTxt' sx={{fontSize: 10, fontWeight: 'bold', marginTop: 0.35, marginLeft: 1}}>
                                        Phone No.
                                    </Typography>

                                </Box>
                            <Box className='TextFieldView'>
                                {isEditablePhone?
                                <TextField className="NameInputFlield" label="Enter Phone No." variant="outlined" size="small" sx={{backgroundColor:'#EEF1F8', border: 0, }}/>
                                :
                                <TextField disabled className="NameInputFlield" label="Enter Phone No." variant="outlined" size="small" sx={{backgroundColor:'#EEF1F8', border: 0, }}/>
                                }<Create className='IconPencil' sx={{ fontSize: 22 }} onClick={updateState3}/>
                            </Box>
                           
                            </Box>


                            <Box className='Inputview2'>

                                <Box className='IconTxt'>

                                    <Box sx={{marginLeft:0.5}}>
                                        <ContactMail className='Icon' sx={{ fontSize: 17 }} />
                                    </Box>
                                        
                                    <Typography variant="h5" className='InputAboveTxt' sx={{fontSize: 10, fontWeight: 'bold', marginTop: 0.35, marginLeft: 1}}>
                                        CNIC No.
                                    </Typography>

                                </Box>
                            <Box className='TextFieldView'>
                                <TextField disabled className="NameInputFlield" label="Enter CNIC No." variant="outlined" size="small" sx={{backgroundColor:'#EEF1F8', border: 0, }}/>
                                
                            </Box>
                           
                            </Box>

                     
                     
                     </Box>

                     <Box className='Bar3'>

                            <Box className='Inputview1'>

                                <Box className='IconTxt'>

                                    <Box sx={{marginLeft:0.5}}>
                                        <AccountCircle className='Icon' sx={{ fontSize: 17 }} />
                                    </Box>
                                        
                                    <Typography variant="h5" className='InputAboveTxt' sx={{fontSize: 10, fontWeight: 'bold', marginTop: 0.35, marginLeft: 1}}>
                                        User Id
                                    </Typography>

                                </Box>
                            <Box className='TextFieldView'>
                                {isEditableUser?
                                <TextField className="NameInputFlield" label="Enter User Id" variant="outlined" size="small" sx={{backgroundColor:'#EEF1F8', border: 0, }}/>
                            : 
                            <TextField disabled className="NameInputFlield" label="Enter User Id" variant="outlined" size="small" sx={{backgroundColor:'#EEF1F8', border: 0, }}/>
                        }<Create className='IconPencil' sx={{ fontSize: 22 }} onClick={updateState4} />
                            </Box>
                           
                            </Box>


                            <Box className='Inputview2'>

                                <Box className='IconTxt'>

                                    <Box sx={{marginLeft:0.5}}>
                                        <VpnKey className='Icon' sx={{ fontSize: 17 }} />
                                    </Box>
                                        
                                    <Typography variant="h5" className='InputAboveTxt' sx={{fontSize: 10, fontWeight: 'bold', marginTop: 0.35, marginLeft: 1}}>
                                        Password
                                    </Typography>

                                </Box>
                            <Box className='TextFieldView'>
                                {isEditablePassword?
                                <TextField className="NameInputFlield" label="Enter Password" type="password" InputProps={{endAdornment: (false)}} variant="outlined" size="small" sx={{backgroundColor:'#EEF1F8', border: 0}}/>
                            : <TextField disabled className="NameInputFlield"  label="Enter Password" type="password" InputProps={{endAdornment: (false)}} variant="outlined" size="small" sx={{backgroundColor:'#EEF1F8', border: 0, }}/>
                        }
                        
                        <Create className='IconPencil' sx={{ fontSize: 22 }} onClick={handleOpen}/>
                       

                        <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >

                            <Box sx={{marginLeft: '33.5%', flexDirection: 'column',display: 'flex',marginTop: '12.5%', borderRadius: 5, position: 'absolute' as 'absolute', width: 450, height: 350, boxShadow: 20, backgroundColor: 'white', zIndex: '30' }}>
                                <Close className='Icon' sx={{ fontSize: 20, marginLeft: '90%', marginTop: '5%' }} onClick={handleClose}/>
                                <TextField className="NewPassword" label="Current Password" type="password" InputProps={{endAdornment: (false)}} variant="outlined" size="small" sx={{backgroundColor:'#EEF1F8',borderRadius: 3 , width: '78%',marginTop: '9.5%', marginLeft: '11.5%'}}/>
                                <TextField className="NewPassword" label="New Password" type="password" InputProps={{endAdornment: (false)}} variant="outlined" size="small" sx={{backgroundColor:'#EEF1F8',borderRadius: 3 , width: '78%',marginTop: '3.5%', marginLeft: '11.5%'}}/>
                                <TextField className="NewPassword" label="Confirm Password" type="password" InputProps={{endAdornment: (false)}} variant="outlined" size="small" sx={{backgroundColor:'#EEF1F8',borderRadius: 3 , width: '78%',marginTop: '3.5%', marginLeft: '11.5%'}}/>
                                <Button className="UpdatePasswordButton" variant="contained" sx={{ fontSize: 14, display: 'flex', height: '12.5%', marginTop: "8%", width: '44%', marginLeft: '30.5%'}} >
                                     Update Password
                                </Button>
                            </Box>

                        </Modal>


                            </Box>
                           
                            </Box>

                     
                     
                     </Box>
                </Paper>

                <Button className="UpdateButton" variant="contained" sx={{ fontSize: 16, display: 'flex', marginLeft: "60%", marginTop: "2%"}} onClick={updateStateForm}>
                    Update Profile
                </Button> */}
        </TabPanel>

        <TabPanel sx={{width: '75%'}} value="2"> 
           
            <Box className= 'Tabpanel_2_BoxView' sx={{ width: '100%',border: 2,height: 70, borderColor: 'lightgrey',  borderRadius: 3}}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                    // ref={chartComponentRef}
                    // {...props}
               
                    />
            
            </Box>

            

            <TableContainer className= 'TablecontainerView' sx={{ width: '100%', marginTop: '20%',height: 260,border: 2, borderColor: 'lightgrey',  borderRadius: 3}} component={Paper}>
                  <Table className= 'TableView' sx={{ maxWidth: '90%', marginBottom: '1%',marginLeft: '5%', marginTop: '1%',height: 10 }} size="small">
                    
                    <TableHead>

                        <TableRow >
                          <StyledTableCell align='right' >Month</StyledTableCell>
                          <StyledTableCell align='center' >Billed</StyledTableCell>
                          <StyledTableCell align='left' >Paid</StyledTableCell>
                        </TableRow>

                    </TableHead>

                    <TableBody>

                      {rows.map((row) => (
                        <StyledTableRow key={row.month} >
                          <StyledTableCell align='right' component="th" scope="row">
                            {row.month}
                          </StyledTableCell>
                          <StyledTableCell align='center' >{row.billed}</StyledTableCell>
                          <StyledTableCell align='left' >{row.paid}</StyledTableCell>
                        </StyledTableRow>
                      ))}

                    </TableBody>

                  </Table>

            </TableContainer>
                
           
        </TabPanel> 
                    
                    
               
                </Box>

                
        </TabContext>
       </Box>
       </Box>

    )
};

export default NewConnection
