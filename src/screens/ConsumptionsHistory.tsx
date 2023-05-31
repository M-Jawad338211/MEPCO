



import React, {useState, useRef, useMemo} from 'react'
import { Box, Button, IconButton, Input, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// import '../styles/Highchart.scss';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// import MaterialReactTable, { type MRT_ColumnDef } from 'material-react-table';
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
    day: string,
    date: string,
    offPeak: number,
    peak: number,
    total: number,
   
  ) {
    return { day, date,offPeak, peak, total};
  }
  
  const rows = [
    createData('Sunday','Nov-21', 16.32, 4.02,20.34),
    createData('Monday','Dec-21', 8.99, 14.49,23.88),
    createData('Tuesday','Jan-22', 17.63, 28.85,46.48),
    createData('Wednesday','Feb-22', 22.11, 12.09,34.2),
    createData('Thursday','Mar-22', 12.33, 9.22,22.55),
    createData('Friday','Apr-22', 15.61, 10.91,26.52),
    createData('Saturday','May-22', 16.71, 8.71, 24.31),
  ];

  function createData2(
    month2: string,
    units: number,
   
  ) {
    return { month2, units};
  }
  
  const rows2 = [
    createData2('Nov 21',3621),
    createData2('Dec 21',2250),
    createData2('Jan 22',2187),
    createData2('Feb 22',2449),
    createData2('Mar 22',1859),
    createData2('Apr 22',2985),
    createData2('May 22',9.82),
  ];
  
  function createData3(
    month3: string,
    units2: number,
   
  ) {
    return { month3, units2};
  }
  
  const rows3 = [
    createData3('Jun 22', 4050),
    createData3('Jul 22',3799),
    createData3('Aug 22',3616),
    createData3('Sept 22',2722),
    createData3('Oct 22',3764),
    createData3('Nov 22',3325),
    createData3('Dec 22',2715)
  ];
  



const options: Highcharts.Options = { 
    
    chart: {
        
        
        height: '30%' ,
        type: 'column',
    },
    
    
    title: {
        text: ''
    },
  
    xAxis: {
        
        height: 200,
        categories: ['25-Dec Sunday', '26-Dec Monday','27-Dec Tuesday', '28-Dec Wednesday', '29-Dec Thursday', '30-Dec Friday', '31-Dec Saturday'],
        crosshair: true,
        title: {
          text: ''
        }  
      },

    
      yAxis: {
        width: '100%',
      height:200,
        min: 0,
        title: {
            text: ''
          } ,
          labels:{
            overflow:'justify'
          }
      
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
        layout: 'horizontal',
        align: 'right',
        verticalAlign: 'top',
        x: -5,
        y: -9,
        floating: false,
        borderWidth: 0,
        borderRadius: 1,
        // backgroundColor:'white',
        shadow: false,
        enabled:true,
        
          
      },

      credits: {
        enabled: false
      },
    
    series: [{
        name: 'Off Peak Units',
        type: 'column',
        color: 'green',
        data: [16.32, 8.99,17.63,22.11,12.33,15.61, 16.71]
    },
    {
        name: 'Peak Units',
        type: 'column',
        color: 'red',
        data: [4.02,14.49,28.85,12.09,9.22,10.91, 8.71]
    },
    {
        name: 'Total Units',
        type: 'column',
        color: 'orange',
        data: [20.34,23.88,46.48,34.2,22.55,26.52, 24.31]
    }
    ]
};


const options2: Highcharts.Options = { 
    
    chart: {
        
        
        height: '30%' ,
        type: 'column',
    },
    
    
    title: {
        text: ''
    },
  
    xAxis: {
        
        height: 200,
        categories: ['Nov 21', 'Dec 21', 'Jan 22', 'Feb 22', 'Mar 22', 'Apr 22', 'May 22', 'Jun 22', 'Jul 22', 'Aug 22', 'Sep 22', 'Oct 22', 'Nov 22', 'Dec 22' ],
        crosshair: true,
        title: {
          text: ''
        }  
      },

    
      yAxis: {
        width: '100%',
      height:200,
        min: 0,
        title: {
            text: ''
          } ,
          labels:{
            overflow:'justify'
          }
      
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
        layout: 'horizontal',
        align: 'right',
        verticalAlign: 'top',
        x: -5,
        y: -9,
        floating: false,
        borderWidth: 0,
        borderRadius: 1,
        // backgroundColor:'white',
        shadow: false,
        enabled:true,
        
          
      },

      credits: {
        enabled: false
      },
    
    series: [{
        name: 'Same Month Comparison',
        type: 'column',
        color: 'skyblue',
        data: [3621,2250,2187,2449,1859,2985,9.82, 4050,3799,3616,2722,3764,3325,2715]
    },
    // {
    //     name: 'Peak Units',
    //     type: 'column',
    //     color: 'red',
    //     data: [4.02,14.49,28.85,12.09,9.22,10.91, 8.71]
    // },
    // {
    //     name: 'Total Units',
    //     type: 'column',
    //     color: 'orange',
    //     data: [20.34,23.88,46.48,34.2,22.55,26.52, 24.31]
    // }
    ]
};


const ConsumptionsHistory:React.FC = (props: HighchartsReact.Props) => {

    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
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

        <Box sx={{ width: '85%', paddingRight: '-20%', marginRight: "6%"}}>
            
            <Typography sx={{ color: 'black', fontSize: 16.5, fontWeight: 'semibold', alignContent: 'center', alignItems: 'center', marginLeft: '50%', marginTop: '3%'}}>
                Consumption
            </Typography>
        
            <TabContext value={value}>

                    <Box sx={{ marginLeft: '8%',marginRight: '-20%',marginTop: '1.5%'}}>
                            
                        <TabList onChange={handleChange}>
                            
                            <Tab label="Daily" value="1" sx={{textTransform: 'capitalize'}} />
                            <Tab label="Monthly" value="2" sx={{textTransform: 'capitalize'}} />
                            
                        </TabList>
                                
                            
                        <TabPanel value="1" sx={{width: '70%', marginLeft: '-2%', marginTop: '0.5%'}}>

                                    <Box sx={{ width: '97%',border: 2, paddingTop: '3.5%',paddingLeft: '1.5%',paddingRight: '1.5%',paddingBottom: '1.5%', borderColor: 'lightgrey',  borderRadius: 3}}>
                                        
                                        <HighchartsReact
                                            highcharts={Highcharts}
                                            options={options}
                                            
                                    
                                            />

                                    </Box>

                            

                                <TableContainer sx={{ width: '100%', marginTop: '2%',height: 450,border: 2, borderColor: 'lightgrey',  borderRadius: 3}} component={Paper}>
                                    
                                        <Table sx={{ maxWidth: '90%', marginBottom: '1%',marginLeft: '5%', marginTop: '2%',height: 20 }} size="medium">
                                            <TableHead>
                                                    <TableRow >
                                                        
                                                            <StyledTableCell align='center' >
                                                                Day
                                                            </StyledTableCell>

                                                            <StyledTableCell align='center' >
                                                                Date
                                                            </StyledTableCell>

                                                            <StyledTableCell align='center' >
                                                                Off Peak
                                                            </StyledTableCell>

                                                            <StyledTableCell align='center' >
                                                                Peak
                                                            </StyledTableCell>

                                                            <StyledTableCell align='center' >
                                                                Total
                                                            </StyledTableCell>

                                                    </TableRow>
                                            </TableHead>
                                            

                                            <TableBody>
                                                    {rows.map((row) => (

                                                        <StyledTableRow key={row.day} >

                                                            <StyledTableCell align='center' component="th" scope="row">
                                                                {row.day}
                                                            </StyledTableCell>

                                                            <StyledTableCell align='center' >
                                                                {row.date}
                                                            </StyledTableCell>

                                                            <StyledTableCell align='center' >
                                                                {row.offPeak}
                                                            </StyledTableCell>

                                                            <StyledTableCell align='center' >
                                                                {row.peak}
                                                            </StyledTableCell>

                                                            <StyledTableCell align='center' >
                                                                {row.total}
                                                            </StyledTableCell>

                                                        </StyledTableRow>

                                                    ))}
                                            </TableBody>

                                        </Table>

                                </TableContainer>

                        </TabPanel>

                        <TabPanel value="2" sx={{width: '75%', marginLeft: '1%', marginTop: '0.5%'}}> 
                                
                                <Box sx={{ width: '97%',border: 2,paddingTop: '3.5%',paddingLeft: '1.5%',paddingRight: '1.5%',paddingBottom: '1.5%', borderColor: 'lightgrey',  borderRadius: 3}}>
                                        
                                        <HighchartsReact
                                            highcharts={Highcharts}
                                            options={options2}
                                            
                                    
                                            />

                                </Box>

                            
                                <Box sx={{display:'flex', flexDirection: 'row'}}>

                                    <TableContainer sx={{ width: '50%', marginTop: '2%',height: 430,border: 2, borderColor: 'lightgrey',  borderRadius: 3}} component={Paper}>
                                        
                                            <Table sx={{ maxWidth: '90%', marginBottom: '1%',marginLeft: '5%', marginTop: '1%',height: 10 }} size="medium">
                                                <TableHead>
                                                        <TableRow >
                                                            
                                                                <StyledTableCell align='left' >
                                                                    Months
                                                                </StyledTableCell>

                                                                <StyledTableCell align='right' >
                                                                    Units
                                                                </StyledTableCell>

                                                                

                                                        </TableRow>
                                                </TableHead>
                                                

                                                <TableBody>
                                                        {rows2.map((rows2) => (

                                                            <StyledTableRow key={rows2.month2} >

                                                                <StyledTableCell align='left' component="th" scope="row">
                                                                    {rows2.month2}
                                                                </StyledTableCell>

                                                                <StyledTableCell align='right' >
                                                                    {rows2.units}
                                                                </StyledTableCell>

                                                            </StyledTableRow>

                                                        ))}
                                                </TableBody>

                                            </Table>

                                    </TableContainer>

                                    <TableContainer sx={{ width: '50%', marginLeft: '1%',marginTop: '2%',height: 430,border: 2, borderColor: 'lightgrey',  borderRadius: 3}} component={Paper}>
                                        
                                            <Table sx={{ maxWidth: '90%', marginBottom: '1%',marginLeft: '5%', marginTop: '1%',height: 10 }} size="medium">
                                                <TableHead>
                                                        <TableRow >
                                                            
                                                                <StyledTableCell align='left' >
                                                                    Months
                                                                </StyledTableCell>

                                                                <StyledTableCell align='right' >
                                                                    Units
                                                                </StyledTableCell>

                                                                

                                                        </TableRow>
                                                </TableHead>
                                                

                                                <TableBody>
                                                        {rows3.map((rows3) => (

                                                            <StyledTableRow key={rows3.month3} >

                                                                <StyledTableCell align='left' component="th" scope="row">
                                                                    {rows3.month3}
                                                                </StyledTableCell>

                                                                <StyledTableCell align='right' >
                                                                    {rows3.units2}
                                                                </StyledTableCell>

                                                            </StyledTableRow>

                                                        ))}
                                                </TableBody>

                                            </Table>

                                    </TableContainer>

                                </Box>
                                
                        
                        </TabPanel> 
                                
                                
                        
                    </Box>

                    
            </TabContext>
       </Box>
       </Box>
    )
};

export default ConsumptionsHistory
