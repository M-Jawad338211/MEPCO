import React, {useState, useRef, useMemo} from 'react'
import { Box, Button, IconButton, Input, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// import '../styles/poweroutage.scss';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
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
    date: string,
    start: string,
    end: string,
    duration: string,
    reason: string,
   
  ) {
    return { date, start, end, duration, reason};
  }
  
  const rows = [
    createData('15 Nov','04:50', '06:23', '01:33','Scheduled'),
    createData('15 Nov','06:23', '06:46', '00:23','Maintenance'),
    createData('15 Nov','06:52', '06:58', '00:06','Scheduled'),
    createData('15 Nov','08:12', '08:33', '00:21','Maintenance'),
    createData('15 Nov','08:45', '08:52', '00:07','Scheduled'),
    
  ];

//   function createData2(
//     month2: string,
//     units: number,
   
//   ) {
//     return { month2, units};
//   }
  
//   const rows2 = [
//     createData2('Nov 21',3621),
//     createData2('Dec 21',2250),
//     createData2('Jan 22',2187),
//     createData2('Feb 22',2449),
//     createData2('Mar 22',1859),
//     createData2('Apr 22',2985),
//     createData2('May 22',9.82),
//   ];
  
//   function createData3(
//     month3: string,
//     units2: number,
   
//   ) {
//     return { month3, units2};
//   }
  
//   const rows3 = [
//     createData3('Jun 22', 4050),
//     createData3('Jul 22',3799),
//     createData3('Aug 22',3616),
//     createData3('Sept 22',2722),
//     createData3('Oct 22',3764),
//     createData3('Nov 22',3325),
//     createData3('Dec 22',2715)
//   ];
  
 function datetimeStrToUTC(date_time_str:any) {
    var now = new Date(date_time_str);
    return Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
}
// var max_dat = Date.UTC(2022, 08, 12, 59, 59, 59);


const options: Highcharts.Options = ({
    


    chart: {
					renderTo: 'events-alarms-chart-container62f67ece59753',
					type: 'area',
                    height: '30%' ,
					// zoomType: 'x'
				},
				title: {
					text: ''
				},
				subtitle: {
					text: 'Date: 11-Aug-2022 - 12-Aug-2022'
				},
				xAxis: {
					title: {
                        text: ''
                      },
                    width: '100%',
					type: 'datetime',
				},
				yAxis: {
					max: 2,
					// title: {
					// 	text: '',
					// },
                    
					labels: {
						formatter: function () {
							if (this.value == 2) {
								return 'OFF';
							} else if (this.value == 0) {
								return 'ON';
							} else {
								return '';
							}
						}
					}
				},
                credits: {
                    enabled: false
                  },
				tooltip: { 
					enabled: true,
					formatter: function () {
						var label = 'ON';
						if (this.y == 2) {
							var label = 'OFF';
						}
						// var now = new Date(this.x);
                        var now = new Date();

						var hrs = now.getUTCHours();
						var min = now.getUTCMinutes();
						var sec = now.getUTCSeconds();
						// return hrs+':'+min+':'+sec;
						return 'Power <b>' +
							(label) + '</b><br/> at ' + hrs + ':' + min + ':' + sec;
					}
				},
				plotOptions: { 
                    
					area: {
						marker: {
							enabled: false,
							symbol: 'circle',
							radius: 2,
							states: {
								hover: {
									enabled: true
								}
							}
						}
					}
				},
				legend: { //chart legends
					enabled: false,
				},
				series: [
                    {
                      //legend data
                      name: 'Power OFF',
                      lineWidth:0,
                      animation: {
                        // animation of chart rendering
                        easing: 'swing',
                        duration: 3000,
                        
                      },
                      fillColor: {
                        linearGradient: {x1:0, x2:0, y1:0,y2: 600},
                        stops: [
                          [0, '#BF0F15'],
                          [1, '#363636'],
                        ],
                      },
                      color: '#AA2222',
                      type: 'area',
                      data: [
                        [datetimeStrToUTC('Aug 11, 2022 00:00'), 2],
						[datetimeStrToUTC('Aug 11, 2022 00:15'), 2],
						[datetimeStrToUTC('Aug 11, 2022 00:15'), 0],
						[datetimeStrToUTC('Aug 11, 2022 08:24'), 0],
						[datetimeStrToUTC('Aug 11, 2022 08:24'), 2],
						[datetimeStrToUTC('Aug 11, 2022 14:09'), 2],
						[datetimeStrToUTC('Aug 11, 2022 14:09'), 0],
						[datetimeStrToUTC('Aug 11, 2022 23:51'), 0],
						[datetimeStrToUTC('Aug 11, 2022 23:51'), 2],
						[datetimeStrToUTC('Aug 11, 2022 23:56'), 2],
						[datetimeStrToUTC('Aug 11, 2022 23:56'), 0],
						[datetimeStrToUTC('Aug 12, 2022 09:24'), 0],
						[datetimeStrToUTC('Aug 12, 2022 09:24'), 2],
						[datetimeStrToUTC('Aug 12, 2022 10:23'), 2],
						[datetimeStrToUTC('Aug 12, 2022 10:23'), 0],
						[datetimeStrToUTC('Aug 12, 2022 21:24'), 0],
						[datetimeStrToUTC('Aug 12, 2022 21:24'), 0],
                                                
                    ],
                    },
                  ],
			});




const PowerOutage:React.FC = (props: HighchartsReact.Props) => {

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
        <Box  sx={{ width: '85%', marginLeft: '7%'}}>
            
            <Typography  sx={{ color: 'black', fontSize: 16.5, fontWeight: 'semibold', alignContent: 'center', alignItems: 'center', marginLeft: '50%', marginTop: '3%'}}>
                Power Outage
            </Typography>
        
            <TabContext value={value}>

                    <Box sx={{        marginLeft: '20%',
        marginRight: '-20%',
        marginTop: '1.5%'}}>
                            
                        <TabList onChange={handleChange}>
                            
                            <Tab autoCapitalize='false' label="Actual" value="1" />
                            <Tab autoCapitalize='false' label="Loadshedding Schedule" value="2" />
                            
                        </TabList>
                        
                       
                            
                        <TabPanel value="1" sx={{width: '70%', marginLeft: '1%', marginTop: '0.5%'}}>
                                
                                {/* <Box sx={{display: 'flex',flexDirection: 'row', width: '75%', height: 75,marginTop:'1%'}}> */}
                                    <Box sx={{display: 'flex',flexDirection: 'row', width: '100%',marginLeft: '0%', height: 90, backgroundColor: '#f0f0f0',marginBottom:'2%', borderRadius: 2.5}}>
                                        <Typography sx={{ color: 'grey', fontSize: 14.5, fontWeight: 'semibold',  marginLeft: '17%', marginTop: '3.2%'}}>
                                            Feeder Name
                                        </Typography>
                                        <Typography sx={{ color: 'black', fontSize: 16, fontWeight: 'semibold', marginLeft: '45%', marginTop: '3.2%'}}>
                                            Mehmood Kot
                                        </Typography>
                                    </Box>

                                    {/* <Box sx={{display: 'flex',flexDirection: 'row', width: '46%',marginLeft: '2%', height: '100%', backgroundColor: 'lightgrey',marginTop:'0%', borderRadius: 2.5}}>
                                        <Typography sx={{ color: 'grey', fontSize: 11.5, fontWeight: 'semibold', marginLeft: '20%', marginTop: '5%'}}>
                                            Current Status
                                        </Typography>
                                        <Typography sx={{ color: 'blue', fontSize: 14, fontWeight: 'semibold',  marginLeft: '20%', marginTop: '5%'}}>
                                            ON
                                        </Typography>
                                    </Box> */}
                                {/* </Box> */}

                                <Box sx={{ width: '97%',border: 2, paddingTop: '3.5%',paddingLeft: '1.5%',paddingRight: '1.5%',paddingBottom: '1.5%', borderColor: 'lightgrey',  borderRadius: 3}}>
                                    
                                    <HighchartsReact
                                        highcharts={Highcharts}
                                        options={options}
                                        
                                
                                        />

                                </Box>

                            

                                <TableContainer sx={{ width: '100%', marginTop: '2%',height: 210,border: 2, borderColor: 'lightgrey',  borderRadius: 3}} component={Paper}>
                                    
                                        <Table sx={{ maxWidth: '90%', marginBottom: '1%',marginLeft: '5%', marginTop: '2%',height: 10 }} size="small">
                                            <TableHead>
                                                    <TableRow >
                                                        
                                                            <StyledTableCell align='center' >
                                                                Date
                                                            </StyledTableCell>

                                                            <StyledTableCell align='center' >
                                                                Start
                                                            </StyledTableCell>

                                                            <StyledTableCell align='center' >
                                                                End
                                                            </StyledTableCell>

                                                            <StyledTableCell align='center' >
                                                                Duration
                                                            </StyledTableCell>

                                                            <StyledTableCell align='center' >
                                                                Reason
                                                            </StyledTableCell>

                                                    </TableRow>
                                            </TableHead>
                                            

                                            <TableBody>
                                                    {rows.map((row) => (

                                                        <StyledTableRow key={row.date} >

                                                            <StyledTableCell align='center' component="th" scope="row">
                                                                {row.date}
                                                            </StyledTableCell>

                                                            <StyledTableCell align='center' >
                                                                {row.start}
                                                            </StyledTableCell>

                                                            <StyledTableCell align='center' >
                                                                {row.end}
                                                            </StyledTableCell>

                                                            <StyledTableCell align='center' >
                                                                {row.duration}
                                                            </StyledTableCell>

                                                            <StyledTableCell align='center' >
                                                                {row.reason}
                                                            </StyledTableCell>

                                                        </StyledTableRow>

                                                    ))}
                                            </TableBody>

                                        </Table>

                                </TableContainer>

                        </TabPanel>

                        <TabPanel value="2" sx={{           width: '75%',
            marginTop: '0.5%',
            marginLeft:' 1%'}}> 
                                
                                {/* <Box sx={{ width: '97%',border: 2,paddingTop: '3.5%',paddingLeft: '1.5%',paddingRight: '1.5%',paddingBottom: '1.5%', borderColor: 'lightgrey',  borderRadius: 3}}>
                                        
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
                                 */}
                        
                        </TabPanel> 
                                
                                
                        
                    </Box>

                    
            </TabContext>
       </Box></Box>
    )
};

export default PowerOutage
