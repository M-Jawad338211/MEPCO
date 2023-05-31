
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import meter from '../assets/smart_meter_white_icon.png';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button, FormControl, Grid, IconButton, InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material';
import Sidebar from '../components/sidebar';
import '../styles/cnicupdation.scss';

import { billingDetails } from '../network/BillingApi';

const drawerWidth = 240;

const DueDate: React.FC = () => {
  // const { window } = props;
  // const [mobileOpen, setMobileOpen] = React.useState(false);
  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };
  // const container = window !== undefined ? () => window().document.body : undefined;
  const [billingData, setBillingData] = useState();

  const [name, setName] = useState('')
  const [address, setaddress] = useState('')
  const [refernceNumber, setReferenceNumber] = useState('')
  const [meterCatagory, setMeterCatagory] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  const Token: any = window.localStorage.getItem('cfptoken')
  const [requestType, setRequestType] = useState<number>(1);
  const [extendedDate, setExtendedDate] = useState('')

  const handleRequestTypeChange = (e: (any)) => {
    setRequestType(e.target.value);
  };
  let navigate = useNavigate();

  const Procced = () => {
    dateConsumption()

  }

  useEffect(() => {
    console.log(refernceNumber, '-----refNo')
    paymentConsumptions()
    date()
  }, [refernceNumber])

  const date = async () => {

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    // await storeDataToStorage(Keys.date, year + '-' + month + '-' + date)

    setCurrentDate(
      year + '-' + month + '-' + date

    );
    console.log(currentDate, '----date')
  }


  useEffect(() => {
    const data = (initialDate: any, numberOfDaysToAdd: any) => {
      let futureDate = new Date(initialDate.getTime() + (numberOfDaysToAdd * 24 * 60 * 60 * 1000));
      return futureDate.toDateString();
    }
    let startDate = new Date(dueDate);
    let numberOfDaysToAdd = 3;
    let futureDate = data(startDate, requestType);
    let originalDate = new Date(futureDate);
    let year = originalDate.getFullYear();
    let month = ("0" + (originalDate.getMonth() + 1)).slice(-2);
    let day = ("0" + originalDate.getDate()).slice(-2);
    let formattedDate = `${year}-${month}-${day}`;
    setExtendedDate(formattedDate)
    console.log(futureDate);
    console.log(extendedDate, 'extend ----')
  })



  const paymentConsumptions = async () => {
    var requestOptions: any = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://bill.pitc.com.pk/bill/info/27151710924700", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === true) {
          console.log(result, '-----res')
          setReferenceNumber(result.basicInfo.refNo)
          setMeterCatagory(result.basicInfo.cons_type)
          setName(result.basicInfo.consumerName)
          setaddress(result.basicInfo.consumerAddress1)
          let billDueDate = result.basicInfo.billDueDate
          let bill = billDueDate.slice(0, 10)
          setDueDate(bill)
        }
      })
  }

  const dateConsumption = () => {
    var formdata = new FormData();
    formdata.append("refNo", "12345678912345");
    formdata.append("name", "abc");
    formdata.append("dueDate", "08-04-2023");
    formdata.append("extendedDueDate", "09-04-2023");
    formdata.append("createdBy", "acv");
    formdata.append("subDivisionCode", "15175");
    formdata.append("divisionCode", "1517");
    formdata.append("circleCode", "151");
    formdata.append("companyCode", "15");
    formdata.append("token", Token);

    var requestOptions: any = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://117.20.28.178:8038/DateExtention/dueDateExtention", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === '200') {
          console.log(result, '-----dateconsumption')
          console.log(result.dueDateExtentionRequestId, '-----res')
          localStorage.setItem('id', result.dueDateExtentionRequestId)
          navigate('/Datebarcode');
        }
      })

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
        >
          <Sidebar />
        </Drawer>
      </Box>

      <Grid container item spacing={2} sx={{ marginLeft: '3%', marginRight: '3%' }} >

        <Grid item lg={12}><p style={{ fontWeight: "500", color: 'black', marginTop: "3%", textAlign: 'center' }}>Due Date Extension</p></Grid>
        <Grid item lg={12} style={{ backgroundColor: '#114D9C', borderRadius: "6px", display: 'flex', justifyContent: 'space-between', padding: '12px', marginTop: "1%" }}>
          <Box>
            <p style={{ color: "white" }}>{name}</p>
            <p style={{ marginTop: "-10%", color: "white" }}>Ref: {refernceNumber}</p>
            <p style={{ marginTop: "-10%", color: "white" }}>{address}</p>
          </Box>
          <Box style={{ width: " 12%" }}>
            <img src={meter} alt="" style={{ width: " 50%" }} />
            <p style={{ marginTop: "5%", color: "white", fontSize: "10px" }}>{meterCatagory}</p>
          </Box>
        </Grid>

        <Box sx={{ marginTop: "1%", width: "100%" }}>
          <Typography className='InputAboveTxt' sx={{ fontSize: 13, marginTop: "0.5%", marginLeft: 1, color: 'black' }}>
            Due Date
          </Typography>
          <TextField
            margin="normal"
            className='textfield'
            sx={{ marginTop: '-0.2%', backgroundColor: "#EAEFF5" }}
            required
            fullWidth
            value={dueDate}
            autoComplete=""
            size='small' />
          {/* <Box sx={{ backgroundColor: '#EAEFF5', padding: '0.3%', borderRadius: '5px' }}>
            <p style={{ fontSize: '12px', marginLeft: '2%' }}>{dueDate}</p>
          </Box> */}

        </Box>

        <Box sx={{ marginTop: "1%", width: "100%" }}>
          <Typography className='InputAboveTxt' sx={{ fontSize: 13, marginTop: "0.5%", color: 'black' }}>
            Extended Days
          </Typography>
          <FormControl sx={{ minWidth: "100%", backgroundColor: "#EAEFF5" }} size="small">
            <Select
              value={requestType}
              onChange={handleRequestTypeChange}
            >
              <MenuItem value="">
                <em>Extended</em>
              </MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>

          <Box>
            <Typography className='InputAboveTxt' sx={{ fontSize: 13, marginTop: "0.5%", marginLeft: 1, color: 'black' }}>
              Extended Due Date
            </Typography>
            <TextField
              margin="normal"
              className='textfield'
              sx={{ marginTop: '-0.2%', backgroundColor: "#EAEFF5" }}
              required
              fullWidth
              value={extendedDate}
              autoComplete=""
              size='small' />
          </Box>

        </Box>
        {currentDate > dueDate ? ''
          :
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={Procced}
            // onClick={LoginHandler}
            sx={{
              mt: 2, backgroundColor: '#114D9C', fontSize: 'small', textTransform: 'capitalize',
              height: 32, width: '30%', marginLeft: '30%', marginBottom: '2%', borderRadius: 20
            }}
          >
            Procced
          </Button>
        }

      </Grid>
    </Box>
  );
}
export default DueDate
