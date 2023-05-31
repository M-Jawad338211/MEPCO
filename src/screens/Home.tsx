import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import meter from '../assets/smart_meter_white_icon.png';
import { Button, Grid, Modal, TextField, Typography } from '@mui/material';
import Sidebar from '../components/sidebar';
import offpeak from '../assets/off_peak_unit_icon.png';
import peak from '../assets/peak_unit_icon.png';
import unit from '../assets/total_unit_icon.png';
import billdetail from '../assets/billingdetails.png';
import { billingDetails } from '../network/BillingApi';
import { Close } from '@mui/icons-material';

const drawerWidth = 240;

export default function Home() {
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
  const [perviousBill, setPerviousBill] = useState('')
  const [latePaymentSurcharge, setLatePaymentSurcharge] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [bill, setBill] = useState('')
  const [payment, setPayment] = useState()
  const [meterTypes, setMeterTypes] = useState('')
  const [meterPhase, setMeterPhase] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  const [estimatedBill, setEstimatedBill] = useState('')
  const [monthlyReporting, setMonthlyReporting] = useState('')
  const [dailyReporting, setDailyReporting] = useState('')
  const [offPeaks, setOffPeaks] = useState('')
  const [peaks, setPeaks] = useState('')
  const [totalUnit, setTotalUnit] = useState('')
  const Token = window.localStorage.getItem('token')
  const PrivateKey: any = window.localStorage.getItem('privatekey')
  const [open, setOpen] = React.useState(false);
  const [connectioncategory, setConnectionCategory] = useState('')
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    console.log(refernceNumber, '-----refNo')
    paymentConsumptions()
    EstimatedBill()
    getConsumption()

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
  //  useEffect(()=>{

  // console.log(meterCatagory, '-----meter')
  // console.log(dueDate, '-----duedate')
  // console.log(perviousBill, '-----prevoius Bill')
  // console.log(latePaymentSurcharge, '-----payment surcharge')
  //  },[ meterCatagory, dueDate, perviousBill, latePaymentSurcharge])
  const getConsumption = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("privatekey", PrivateKey);

    var formdata = new FormData();
    formdata.append("reference_number", "27151715511501");
    formdata.append("date", currentDate);

    var requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };


    fetch("http://119.63.135.120:2526/api/get_consumption", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === '1') {
          console.log(result, "Get Consumption Result")
          let datereport = result.data.daily_data_reporting_time
          let date = datereport.slice(0, 6)
          setDailyReporting(date)
          let monthreport = result.data.monthly_data_reporting_time
          let month = monthreport.slice(0, 6)
          setMonthlyReporting(month)
          let offpeak = result.data.active_energy_consumption_t1
          let numWithoutDecimal = parseInt(offpeak.toString().replace(".", ""))
          setOffPeaks(numWithoutDecimal.toLocaleString())
          let peak = result.data.active_energy_consumption_t2
          let peakConsmption = parseInt(peak.toString().replace(".", ""))
          setPeaks(peakConsmption.toLocaleString())
          let unit = result.data.active_energy_consumption_tl
          let unitConsmption = parseInt(unit.toString().replace(".", ""))
          setTotalUnit(unitConsmption.toLocaleString())
          console.log(result.data.daily_data_reporting_time, '----dailydate')
          console.log(result.data.monthly_data_reporting_time, '----month')

        }
      })
    // .catch(error => console.log('error', error));
  }
  const EstimatedBill = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "refNo": "27151710924700U",
      "token": Token,
      "date": currentDate,
    });

    var requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://117.20.28.178:8039/estimatedBill/estimateBill", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === '200') {
          console.log(result, '-----result')
          let billestimate = parseInt(result.billed)
          let number = billestimate.toLocaleString()
          setEstimatedBill(number)
          console.log(number);
          // console.log(result.billed, 'printing bill')

        }
      })
  }
  const paymentConsumptions = async () => {
    //   const result = await billingDetails(refernceNumber)
    // console.log(result,'billing')
    var requestOptions: any = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://bill.pitc.com.pk/bill/info/27151710924700", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === true) {
          console.log(result, '-----res')
          // console.log(result.basicInfo.refNo, "printing basic info")
          console.log(result.basicInfo.cons_type, "printing meter")
          // console.log(result.basicInfo.billDueDate, "printing date")
          // console.log(result.basicInfo.gbHistAssment13, "printing prviousbill")
          // console.log(result.basicInfo.LatePaymentSurcharge, " print surcharge")
          setReferenceNumber(result.basicInfo.refNo)
          setMeterCatagory(result.basicInfo.cons_type)

          setName(result.basicInfo.consumerName)
          setaddress(result.basicInfo.consumerAddress1)
          let billDueDate = result.basicInfo.billDueDate
          let bill = billDueDate.slice(0, 10)
          setDueDate(bill)
          let billPrevoius = parseInt(result.histInfo.gbHistAssment13)
          setPerviousBill(billPrevoius.toLocaleString())
          let latePayment = parseInt(result.basicInfo.LatePaymentSurcharge)
          setLatePaymentSurcharge(latePayment.toLocaleString())
          setConnectionCategory(result.basicInfo.conn_catg)
          setMeterTypes(result.basicInfo.meterType)
          setMeterPhase(result.basicInfo.phase)
          console.log(result.basicInfo.conn_catg, '----- connection')
        }
      })
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {/* <CssBaseline /> */}
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
        <Grid item lg={6}><p style={{ fontWeight: "450" }}>Welcome,</p></Grid>
        <Grid item lg={6}><p style={{ fontWeight: "450", textAlign: 'right', }}>29-Dec-23</p></Grid>
        <Grid item lg={12}><p style={{ fontWeight: "500", color: '#114D9C', marginTop: "-3%" }}>Ejaz Hussain</p></Grid>
        <Grid item lg={12} style={{ backgroundColor: '#114D9C', borderRadius: "6px", display: 'flex', justifyContent: 'space-between', padding: '12px' }} onClick={handleOpen}>
          <Box>
            <p style={{ color: "white" }}>{name}</p>
            <p style={{ marginTop: "-10%", color: "white" }}>Ref: {refernceNumber}</p>
            <p style={{ marginTop: "-10%", color: "white" }}>{address}</p>
          </Box>
          <Box style={{ width: " 12%" }}>
            <img src={meter} alt="" style={{ width: " 50%" }} />
            <p style={{ marginTop: "5%", color: "white", fontSize: "10px" }}>{meterCatagory}</p>
          </Box>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >

            <Box sx={{ marginLeft: '33.5%', flexDirection: 'column', display: 'flex', marginTop: '1%', borderRadius: 5, position: 'absolute' as 'absolute', width: 450, boxShadow: 20, backgroundColor: 'white', zIndex: '30' }}>
              <Close className='Icon' sx={{ fontSize: 20, marginLeft: '90%', marginTop: '5%' }} onClick={handleClose} />
              <Box sx={{ alignSelf: 'center', marginTop: '1%' }}>
                <img src={billdetail} alt="" style={{ width: "35%", marginLeft: '35%' }} />
                <p style={{ marginTop: "2%", color: "black", fontSize: "15px", fontWeight: '500', textAlign: 'center' }}>Billing Detail</p>
              </Box>
              <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: 'bold', marginLeft: 1, color: 'black', textAlign: 'end', marginRight: '5%', marginTop:'-4%' }}>
                08 APR 23
              </Typography>
              <hr style={{ marginTop: "0.5%", color: "gray", width: "89%" }} />
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: '5%', marginRight: '5%' }}>

                <Box sx={{ width: '15%', display: 'flex', flexDirection: 'row' }}>
                  <Box sx={{ backgroundColor: 'green', borderRadius: '6px', height: '70%', width: '13%' }}></Box>
                  <Box sx={{ marginLeft: '12%' }}>
                    <p style={{ fontSize: 12, fontWeight: 'bold', color: 'black', marginTop: '-0.5%' }}>27508</p>
                    <p style={{ fontSize: 10, color: 'grey', marginTop: '-30%' }}>@27.88</p>
                  </Box>
                </Box>

                <Box sx={{ width: '15%', display: 'flex', flexDirection: 'row' }}>
                  <Box sx={{ backgroundColor: 'red', borderRadius: '6px', height: '70%', width: '12%' }}></Box>
                  <Box sx={{ marginLeft: '12%' }}>
                    <p style={{ fontSize: 12, fontWeight: 'bold', color: 'black', marginTop: '-0.5%' }}>13119</p>
                    <p style={{ fontSize: 10, color: 'grey', marginTop: '-30%' }}>@33.85</p>
                  </Box>
                </Box>

                <Box sx={{ width: '15%', display: 'flex', flexDirection: 'row' }}>
                  <Box sx={{ backgroundColor: 'orange', borderRadius: '6px', height: '70%', width: '12%' }}></Box>
                  <Box sx={{ marginLeft: '12%', marginTop: '-9%' }}>
                    <p style={{ fontSize: 12, fontWeight: 'bold', color: 'black' }}>40618 </p>
                  </Box>
                </Box>
              </Box>
              {/* <Box sx={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: '2%', marginRight: '2%', }}>
                <Box sx={{ flexDirection: 'row', width: "35%" }}>

                </Box>
              </Box> */}
              <Box sx={{ marginLeft: '3%', marginRight: '3%' }}>
                <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: 'bold', marginLeft: 1, color: '#114D9C' }}>
                  Electricity Charges
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', marginLeft: '2%', marginRight: '2%' }}>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: '400', color: 'black' }}>
                    Energy  Charges
                  </Typography>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: '400', color: 'black' }}>
                    20,180
                  </Typography>

                </Box>
                <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', marginLeft: '2%', marginRight: '2%' }}>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: '400', color: 'black' }}>
                    Fix  Charge
                  </Typography>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: '400', color: 'black' }}>
                    20,180
                  </Typography>

                </Box>
                <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', marginLeft: '2%', marginRight: '2%' }}>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: '400', color: 'black' }}>
                    Meter Rent
                  </Typography>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: '400', color: 'black' }}>
                    20,180
                  </Typography>

                </Box>
                <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', marginLeft: '2%', marginRight: '2%' }}>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: '400', color: 'black' }}>
                    Service Rent
                  </Typography>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: '400', color: 'black' }}>
                    20,180
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', marginLeft: '2%', marginRight: '2%' }}>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: '400', color: 'black' }}>
                    Others
                  </Typography>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: '400', color: 'black' }}>
                    Rs. 2180
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', marginLeft: '2%', marginRight: '2%', backgroundColor: '#EAEFF5' }}>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: '400', color: 'black', marginLeft: '2%' }}>
                    Sub Total
                  </Typography>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: '400', color: 'black', marginRight: '2%' }}>
                    Rs. 2118
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ marginLeft: '3%', marginRight: '3%' }}>
                <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: 'bold', marginLeft: 1, color: '#114D9C' }}>
                  Taxes / Govt. Charges
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', marginLeft: '2%', marginRight: '2%' }}>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: '400', color: 'black' }}>
                    E.D
                  </Typography>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: '400', color: 'black' }}>
                    20,180
                  </Typography>

                </Box>
                <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', marginLeft: '2%', marginRight: '2%' }}>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: '400', color: 'black' }}>
                    GST
                  </Typography>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: '400', color: 'black' }}>
                    20,180
                  </Typography>

                </Box>
                <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', marginLeft: '2%', marginRight: '2%' }}>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: '400', color: 'black' }}>
                    Income Tax
                  </Typography>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: '400', color: 'black' }}>
                    20,180
                  </Typography>

                </Box>
                <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', marginLeft: '2%', marginRight: '2%' }}>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: '400', color: 'black' }}>
                    F.C Surcharges
                  </Typography>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: '400', color: 'black' }}>
                    20,180
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', marginLeft: '2%', marginRight: '2%' }}>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: '400', color: 'black' }}>
                    Others
                  </Typography>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: '400', color: 'black' }}>
                    Rs.180
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', marginLeft: '2%', marginRight: '2%', backgroundColor: '#EAEFF5' }}>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: '400', color: 'black', marginLeft: '2%' }}>
                    Sub Total
                  </Typography>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: '400', color: 'black', marginRight: '2%' }}>
                    Rs.2018
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ marginLeft: '3%', marginRight: '3%' }}>
                <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: 'bold', marginLeft: 1, color: '#114D9C' }}>
                  Miscellaneous
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', marginLeft: '2%', marginRight: '2%' }}>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: '400', color: 'black' }}>
                    Adjustments
                  </Typography>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: '400', color: 'black' }}>
                    Rs. 180
                  </Typography>

                </Box>
                <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', marginLeft: '2%', marginRight: '2%' }}>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: '400', color: 'black' }}>
                    Arrears
                  </Typography>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: '400', color: 'black' }}>
                    Rs.20,180
                  </Typography>

                </Box>
                <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', marginLeft: '2%', marginRight: '2%' }}>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: '400', color: 'black' }}>
                    FPA
                  </Typography>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: '400', color: 'black' }}>
                    Rs. 0
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', marginLeft: '2%', marginRight: '2%', backgroundColor: '#EAEFF5' }}>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: '400', color: 'black', marginLeft: '2%' }}>
                    Sub Total
                  </Typography>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 12, fontWeight: '400', color: 'black', marginRight: '2%' }}>
                    Rs. 20,180
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ alignSelf: 'center', marginTop: '1%' }}>
                <p style={{ marginTop: "1%", color: "black", fontSize: "15px", fontWeight: '500', textAlign: 'center' }}>Total Payable Bill</p>
                <p style={{ marginTop: "-12%", color: "blue", fontSize: "15px", fontWeight: '500', textAlign: 'center' }}>Rs. 58,233</p>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between', marginLeft:'5%', marginRight:'5%'}}>
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={handleClose}
                  // onClick={() => handleSubmit}
                  // onClick={LoginHandler}
                  sx={{
                    mt: -0.5, backgroundColor: 'white', fontSize: 'small', textTransform: 'capitalize',
                    height: 32, width: '47%', marginBottom: '2%',  color:"#3760E7"
                  }}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  // onClick={() => handleSubmit}
                  // onClick={LoginHandler}
                  sx={{
                    mt: -0.5, backgroundColor: '#3760E7', fontSize: 'small', textTransform: 'capitalize',
                    height: 32, width: '47%',  marginBottom: '2%'
                  }}
                >
                  Pay Now
                </Button>
              </Box>
            </Box>

          </Modal>
        </Grid>

        <Grid container item spacing={2} sx={{ marginTop: "1%", display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          {/* {  bill && */}
          <Grid item lg={5.8} sx={{ backgroundColor: '#EAEFF5', borderRadius: "6px", padding: '20px' }} >
            <Box style={{ display: 'flex', justifyContent: 'space-between', }}>
              <Box >
                <p style={{ color: "black", fontSize: '12px' }}>prevoius Bill</p>
                <p style={{ marginTop: "-12%", color: "black", fontSize: '13px', fontWeight: '600' }}>RS.{perviousBill}</p>
                <p style={{ marginTop: "-10%", color: "blue", fontSize: '12px' }}>* View </p>
              </Box>
              <Box >
                <p style={{ color: "black", fontSize: '12px' }}>Bill status</p>
                <p style={{ marginTop: "-10%", color: "red", fontSize: '13px' }}>Unpaid</p>
                <span style={{ marginTop: '-15%', color: "gray", fontSize: '12px' }}>Last date:</span>
                <span style={{ color: "black", fontSize: '12px' }}>{dueDate}</span>
              </Box>
            </Box>
            <span style={{ marginTop: "-2%", color: "black", fontSize: '12px' }}>pay your bill within the due date and save</span>
            <span style={{ color: "black", fontSize: '12px', fontWeight: '600' }}> Rs. {latePaymentSurcharge}</span>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className='button'
              // onClick={LoginHandler}
              // disabled={isLoading}
              sx={{
                mt: 2, backgroundColor: '#114D9C', fontSize: 'small', textTransform: 'capitalize',
                height: 32
              }}
            >
              pay Now
            </Button>
          </Grid>
          {/* } */}

          {(meterTypes === 'AMR' || connectioncategory === '01' && meterPhase === "3-PHASE") &&
            <Grid item lg={5.8} sx={{ backgroundColor: '#EAEFF5', borderRadius: "6px", padding: '20px' }}>
              <Box style={{ display: 'flex', justifyContent: 'space-between', }}>
                <Box >
                  <p style={{ color: "black", fontSize: '12px' }}>Current</p>
                  <p style={{ marginTop: "-10%", color: "black", fontSize: '12px' }}>Estimared Bill</p>
                  <p style={{ marginTop: "-10%", color: "black", fontSize: '13px', fontWeight: '600' }}>Rs. {estimatedBill} </p>
                </Box>
                <Box sx={{ height: "10%" }} >
                  {/* <p style={{ color: "black", fontSize: "10px" }}>15 Days</p> */}
                  <p style={{ marginTop: "12%", color: "Black", fontSize: "10px" }}>Estimated</p>
                  <p style={{ marginTop: "-12%", color: "gray", fontSize: "12px" }}>Month Cycle </p>
                  <p style={{ marginTop: "-12%", color: "black", fontSize: "12px", fontWeight: '600' }}>{monthlyReporting} to {dailyReporting} </p>
                </Box>
              </Box>
              <hr style={{ marginTop: "1%", color: "gray", width: "99%" }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box >
                  <Box sx={{ display: 'flex', flexDirection: 'row', width: "49%" }}>
                    <img src={offpeak} alt="" style={{ width: '50%', height: '30%' }} />
                    <p style={{ color: "gray", fontSize: '10px', }}>Off Peak Units</p>
                  </Box>
                  <p style={{ marginTop: '-3%', color: "black", fontSize: '12px' }}>{offPeaks} KWh</p>
                </Box>

                <Box sx={{ textAlign: 'center', justifyItems: 'center' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', width: "45%", marginLeft: '35%' }}>
                    <img src={peak} alt="" style={{ width: '50%', height: '30%' }} />
                    <p style={{ color: "gray", fontSize: '10px', }}>Peak Units</p>
                  </Box>
                  <p style={{ marginTop: '-3%', color: "black", fontSize: '12px' }}>{peaks} KWh</p>
                </Box>

                <Box sx={{ textAlign: 'end', }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', width: "45%", marginLeft: '55%' }}>
                    <img src={unit} alt="" style={{ width: '50%', height: '30%' }} />
                    <p style={{ color: "gray", fontSize: '10px', }}>Total Units</p>
                  </Box>
                  <p style={{ marginTop: '-3%', color: "black", fontSize: '12px' }}>{totalUnit} KWh</p>
                </Box>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className='button'
                // onClick={LoginHandler}
                // disabled={isLoading}
                sx={{ mt: 2, backgroundColor: '#114D9C', fontSize: 'small', textTransform: 'capitalize', height: 32, }}
              >
                pay Now
              </Button>
            </Grid>
          }
        </Grid>
      </Grid>
    </Box>
  );
}