




import React, {useState, useRef, useMemo} from 'react'
import { Box, Button, IconButton, Input, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import '../styles/Threshold.scss';
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import Modal from '@mui/material/Modal';
import { Close} from '@mui/icons-material';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import offpeak from '../assets/off_peak_unit_icon.png';
import peak from '../assets/peak_unit_icon.png';
import unit from '../assets/total_unit_icon.png'
import Sidebar from '../components/sidebar';
import Drawer from '@mui/material/Drawer';


const Threshold:React.FC = () => {

    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [value, setValue] = React.useState<number>(0);

    const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
    };

    const [value2, setValue2] = React.useState<number>(0);

    const handleChange2 = (event: Event, newValue: number | number[]) => {
    setValue2(newValue as number);
    };

    const percentage = value;
    const percentage2 = value2;


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
        <Box className='MainBoxView' sx={{ width: '85%', marginLeft: '4%'}}>
            
            <Typography  className='Headingtxt' sx={{fontSize: '22.5', fontWeight: 'bold'}} >
                Advisor Target
            </Typography>

            <Box className='ChartViewMainBox'>
                <Box className='SliderChartViewBox' sx={{border: 2, borderRadius: 2.5}}>
                    <Typography sx={{ color: 'black', fontSize: 9,  marginLeft: '7%', marginTop: '6.6%'}}>
                        Please set your target to get Smart Energy Advisor notification
                    </Typography>
                    <Typography sx={{ color: 'black', fontSize: 11.3, fontWeight: 'bold',  marginLeft: '7%', marginTop: '3.6%', width: '100%'}}>
                        Off Peak (kWh)
                    </Typography>
                    <Slider sx={{width: '80%', marginLeft: '7%', color: '#39BC86'}} size='medium' min={0} max={1200} aria-label="Volume" value={value} onChange={handleChange} />
                    <Box sx={{display: 'flex', marginLeft: '7%',marginTop: '0.2%', flexDirection: 'row', width: '80%'}}>
                    <Typography align='left' sx={{ color: 'black', fontSize: 10, fontWeight: 'bold',  marginLeft: '0.1%', width: '100%'}}>
                        20kWh
                    </Typography>
                    <Typography align='right' sx={{ color: 'black', fontSize: 10, fontWeight: 'bold',  marginLeft: '15%',  width: '100%'}}>
                        1200 kWh
                    </Typography>
                    </Box>

                    <Typography sx={{ color: 'black', fontSize: 11.3, fontWeight: 'bold',  marginLeft: '7%', marginTop: '2.6%', width: '100%'}}>
                        Peak (kWh)
                    </Typography>
                    <Slider sx={{width: '80%', marginLeft: '7%', color: 'red'}} size='medium' min={0} max={3500} aria-label="kWh" value={value2} onChange={handleChange2} />
                    <Box sx={{display: 'flex', marginLeft: '7%',marginTop: '0.2%', flexDirection: 'row', width: '80%'}}>
                    <Typography align='left' sx={{ color: 'black', fontSize: 10, fontWeight: 'bold',  marginLeft: '0.1%', width: '100%'}}>
                        20kWh
                    </Typography>
                    <Typography align='right' sx={{ color: 'black', fontSize: 10, fontWeight: 'bold',  marginLeft: '15%',  width: '100%'}}>
                        3500 kWh
                    </Typography>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'row', marginTop: '5%', marginLeft: '7%', marginBottom: '5%'}}>
                        <Box sx={{display: 'flex', flexDirection: 'column', width: '20%'}}>
                            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                <img src={offpeak} style={{width: '38%',marginRight: '1%', height: '100%'}}/>
                                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                    <Typography sx={{ color: 'grey', fontSize: 11, fontWeight: 'bold', marginTop: '10%'}}>Off Peak</Typography>
                                    <Typography sx={{ color: 'grey', fontSize: 11, fontWeight: 'bold'}}>Units</Typography>
                                </Box>
                            </Box>
                            <Typography sx={{ color: 'black', fontWeight: 'bold', marginTop: '2%', fontSize: 14}}>{value} kWh</Typography>
                        </Box>

                        <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: '15%', width: '20%'}}>
                            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                <img src={peak} style={{width: '38%',marginRight: '1%', height: '100%'}}/>
                                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                    <Typography sx={{ color: 'grey', fontSize: 11, fontWeight: 'bold', marginTop: '10%'}}>Peak</Typography>
                                    <Typography sx={{ color: 'grey', fontSize: 11, fontWeight: 'bold'}}>Units</Typography>
                                </Box>
                            </Box>
                            <Typography sx={{ color: 'black', fontWeight: 'bold', marginTop: '2%', fontSize: 14}}>{value2} kWh</Typography>
                        </Box>


                        <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: '15%', width: '20%'}}>
                            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                <img src={unit} style={{width: '38%',marginRight: '1%', height: '100%'}}/>
                                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                    <Typography sx={{ color: 'grey', fontSize: 11, fontWeight: 'bold', marginTop: '10%'}}>Total</Typography>
                                    <Typography sx={{ color: 'grey', fontSize: 11, fontWeight: 'bold'}}>Units</Typography>
                                </Box>
                            </Box>
                            <Typography sx={{ color: 'black', fontWeight: 'bold', marginTop: '2%', fontSize: 14}}>{(value+value2)} kWh</Typography>
                        </Box>

                        
                        
                        {/* <Box sx={{display: 'flex', flexDirection: 'column', marginTop: '5%', border: 1, borderColor: 'black'}}></Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', marginTop: '5%', border: 1, borderColor: 'black'}}></Box> */}

                    </Box>
                </Box>
                <Box className='CircularChartViewBox' sx={{border: 2, borderRadius: 2.5}}>
                    <Box className='CircularChartView1'>
                        <Typography sx={{ color: 'black', fontSize: 12, fontWeight: 'bold',  marginLeft: '31%', marginTop: '15%', width: '100%'}}>
                            Off Peak (kWh)
                        </Typography>
                        <div style={{ width: 170, height: 170, marginTop: '5.5%', marginLeft: '15%' }}>
                        <CircularProgressbar value={(percentage/1200)*100} maxValue={100} text={`${Math.floor((percentage/1200)*100)}%`} 
                        styles={buildStyles({
                            strokeLinecap: 'butt',
                            pathColor: `#39BC86`,
                            textSize: '13px',
                            textColor: '#39BC86',
                            trailColor: '#d6d6d6',
                            backgroundColor: '#3e98c7'
                            })}
                        />
                        </div>

                    <Typography sx={{ color: 'grey', fontSize: 10, fontWeight: 'normal',   marginLeft: '35%', marginTop: '5%', width: '100%'}}>
                        Total 1200kWh
                    </Typography>
                    </Box>
                    <Box className='CircularChartView2'>
                    <Typography sx={{ color: 'black', fontSize: 12, fontWeight: 'bold',   marginLeft: '35%', marginTop: '15%', width: '100%'}}>
                        Peak (kWh)
                    </Typography>
                        <div style={{ width: 170, height: 170, marginTop: '5.5%', marginLeft: '15%' }}>
                            <CircularProgressbar value={(percentage2/3500)*100} maxValue={100} text={`${Math.floor((percentage2/3500)*100)}%`} 
                            styles={buildStyles({
                                strokeLinecap: 'butt',
                                pathColor: `red`,
                                textSize: '13px',
                                textColor: 'black',
                                trailColor: '#d6d6d6',
                                backgroundColor: '#3e98c7'
                                })}
                            />
                        </div>

                    <Typography sx={{ color: 'grey', fontSize: 10, fontWeight: 'normal',   marginLeft: '35%', marginTop: '5%', width: '100%'}}>
                        Total 3500kWh
                    </Typography>
                    </Box>
                </Box>
            </Box>

            <Box className='TextView' sx={{borderRadius: 2.5}}>
                    <Box className='TextView1'>
                    <Typography sx={{ color: 'black', fontSize: 19, fontWeight: 'bold',  marginLeft: '7%', marginTop: '1.6%'}}>
                        Estimated Bill
                    </Typography>
                    
                    <Typography sx={{ color: 'black', fontSize: 19.5, fontWeight: 'bold', marginLeft: '66.8%', marginTop: '1.6%'}}>
                        Rs 125,030
                    </Typography>
                    </Box>
                    <Box className='TextView2'>
                    <Typography sx={{ color: 'black', fontSize: 14, fontWeight: 'semibold',  marginLeft: '7%', marginTop: '0.01%', marginBottom: '2%'}}>
                        Estimated Bill, according to selected target.
                    </Typography>
                    
                    <Typography sx={{ color: 'red', fontSize: 14.5, fontWeight: 'semibold', marginLeft: '38.3%', marginTop: '0.01%', marginBottom: '2%'}}>
                        *Subject to month end bill adjustments
                    </Typography> 
                    </Box>
            </Box>


            <Button className="UpdateButton" variant="contained" onClick={handleOpen}>
                    Set Target
            </Button>
            
            <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >

                <Box sx={{marginLeft: '36.5%', flexDirection: 'column',display: 'flex',marginTop: '12.5%', borderRadius: 5, position: 'absolute' as 'absolute', width: 450, height: 350, boxShadow: 20, backgroundColor: 'white', zIndex: '30'}}>
                    <Close sx={{ fontSize: 20, marginLeft: '90%', marginTop: '5%' }} onClick={handleClose}/>
                    <img src={require('../assets/Group 102.png')} style={{width: '18%',marginLeft: '43%',marginTop: '4%', height: '21%'}}/>
                    <Typography sx={{ fontSize: 26, fontWeight: 'bold', marginLeft: '33%', marginTop: '4%', width: '100%', alignContent: 'center', alignItems: 'center', justifyContent: 'center', justifyItems: 'center'  }}>Target Saved!</Typography>
                    <Typography align='center' sx={{ fontSize: 15,color: 'grey', marginLeft: '22%',  marginTop: '1%', width: '60%'  }}>Congratulations! Your selected targets has been saved for Smart Energy Advisor notification</Typography>
                </Box>

            </Modal>
           
       </Box>
       </Box>
    )
};

export default Threshold