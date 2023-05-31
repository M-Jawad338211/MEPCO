import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Sidebar from '../components/sidebar';
import meter from '../assets/smart_meter_white_icon.png';
import { Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import exlam from '../assets/exclamination.png';
import wrongMeterReading from '../components/userContextFile/UsersContext';
import userContext from '../components/userContextFile/UsersContext';


export default function Complaints() {
  const a: any = useContext(userContext);
  const [name, setName] = useState('')
  const [address, setaddress] = useState('')
  const [refernceNumber, setReferenceNumber] = useState('')
  const [meterCatagory, setMeterCatagory] = useState('')
  const [wrongmeter, setWrongMeter] = useState(false)
  const [typeId, setTypeId] = useState('')
  const Token: any = window.localStorage.getItem('cfptoken')
  let navigate = useNavigate();
  const Procced = () => {
    if (wrongmeter) {
      // let path = ;
      navigate(`/WrongMeterReading`);
    }
  }
  const handleRadioChange = (event: any) => {
    const { value } = event.target;
    if (value === 'wmeter') {
      setWrongMeter(true); // set wrongmeter state to true if 'Defective Meter' is selected
    } else {
      setWrongMeter(false); // set wrongmeter state to false otherwise
    }
  };
  useEffect(() => {
    // console.log(refernceNumber, '-----refNo')
    paymentConsumptions()
      // cfpSignin()
 
  }, [refernceNumber])
  useEffect(() => {   
      // cfpSignin()
 
  }, [])

   const powerOutage = () => {
     setTypeId('1');
     console.log(typeId,'----p')
   };
   const lowVoltage = () => {
    setTypeId('6');
    console.log(typeId,'----l')
  };
  const fluctuation = () => {
    setTypeId('4');
    console.log(typeId,'----f')
  };
  const defectiveMeter = () => {
    setTypeId('2');
    console.log(typeId,'----d')
  }; 
  const phase = () => {
    setTypeId('8');
    console.log(typeId,'----phase')
  };
  const fallenWire = () => {
    setTypeId('14');
    console.log(typeId,'----fall')
  };
  const wrongMeter = () => {
    setTypeId('101');
    console.log(typeId,'----w')
  };
  const delayed = () => {
    setTypeId('102');
    console.log(typeId,'----del')
  };
   const meterReading = (result: any) =>{

    a.metersInfo=result.metersInfo;
    a.basicInfo=result.basicInfo;
    a.histInfo=result.histInfo;
    <wrongMeterReading.Provider value={data1}>
      {result.children}
    </wrongMeterReading.Provider>
   }

   const data1 = {
    "metersInfo" : a.metersInfo,
    "basicInfo" : a.basicInfo,
    "histInfo"  : a.histInfo,
   }

  const paymentConsumptions = async () => {
    var requestOptions: any = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://bill.pitc.com.pk/bill/info/27151715511501", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === true) {
          meterReading(result)
          console.log(result, '-----res')
          let ref = result.basicInfo.refNo
          let characterRef = ref.toString().replace(/[A-Z]/g, '').replace(/\s/g,'')
          setReferenceNumber(characterRef)
          setMeterCatagory(result.basicInfo.cons_type)
          setName(result.basicInfo.consumerName)
          setaddress(result.basicInfo.consumerAddress1)
          
        }
      })
  }
  const cfpSignin = () => {
    var formdata = new FormData();
    formdata.append("userId", "Afan");
    formdata.append("password", "Afan");

    var requestOptions: any = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://117.20.28.178:8038/customerFaciliationPortal/signIn", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === '200') {
          console.log(result, '-----cfphit')
          console.log(result.token, '-----res')
          localStorage.setItem('cfptoken', result.token)
        }
      })
    // .catch(error => console.log('error', error));
  }

  const complaint = () => {
    var formdata = new FormData();
    formdata.append("refNo", refernceNumber);
    formdata.append("phoneNo", "3008737047");
    formdata.append("name", "A-D WATER SUPPLY");
    formdata.append("nearest_place", "NAQSHBAND COLONY              MULTAN");
    formdata.append("cat_id", "1");
    formdata.append("type_id", typeId);
    formdata.append("tariff", "");
    formdata.append("meterPhase", "3-PHASE");
    formdata.append("meterNo", "");
    formdata.append("meterType", "MMR");
    formdata.append("billingMonth", "2023-02");
    formdata.append("offPeakPre", "");
    formdata.append("offPeakCur", "");
    formdata.append("peakPre", "");
    formdata.append("peakCur", "");
    formdata.append("offPeakImportImg", "");
    formdata.append("offPeakImportExp", "");
    formdata.append("peakImportImg", "");
    formdata.append("peakImportExp", "");
    formdata.append("latestOffPeakImportImg", "");
    formdata.append("latestOffPeakImportExp", "");
    formdata.append("latestPeakImportImg", "");
    formdata.append("latestPeakImportExp", "");
    formdata.append("token", Token);
    console.log(refernceNumber,'------ref')
    // console.log(Token,'------token')
    console.log(typeId, '-----idddd')

    var requestOptions: any = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://117.20.28.178:8038/powerComplaints/registerComplaint", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result,'result')
         if(result.status === '200'){
        console.log(result, '------complaint')
        // setCompaintId(result.complaintId)
          console.log(result.complaintId, '-----id')
          localStorage.setItem('id', result.complaintId)
         navigate(`/Datebarcode`);
         }
      }
)
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

      <Grid container item spacing={2} sx={{ marginLeft: '3%', marginRight: '3%' }} >
        <Grid item lg={12}><p style={{ fontWeight: "500", color: 'black', marginTop: "3%", textAlign: 'center' }}>Meter Reading Correction</p></Grid>
        <Grid item lg={12} style={{ backgroundColor: '#114D9C', borderRadius: "6px", display: 'flex', justifyContent: 'space-between', padding: '12px', marginTop: "1%" }}>
          <Box>
            <p style={{ color: "white" }}>{name}</p>
            <p style={{ marginTop: "-9%", color: "white" }}>Ref: {refernceNumber}</p>
            <p style={{ marginTop: "-9%", color: "white" }}>{address}</p>
          </Box>
          <Box style={{ width: " 12%" }}>
            <img src={meter} alt="" style={{ width: " 50%" }} />
            <p style={{ marginTop: "5%", color: "white", fontSize: "10px" }}>{meterCatagory}</p>
          </Box>
        </Grid>

        <Typography className='InputAboveTxt' sx={{ fontSize: 15, fontWeight: '550', color: '#114D9C', marginTop: '1%' }}>
          Power
        </Typography>
        <FormControl sx={{ marginTop: '1%', width: '100%', marginLeft: '1%' }}>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            defaultValue="power"
            name="row-radio-buttons-group"
            onChange={handleRadioChange}
          >
            <FormControlLabel value="power"  onClick={powerOutage} control={<Radio />} label="Power Outage" sx={{ backgroundColor: '#EAEFF5', borderRadius: '5px', padding: '10px', width: '44%' }} />
            <FormControlLabel value="low" onClick={lowVoltage} control={<Radio />} label="Low Voltage" sx={{ backgroundColor: '#EAEFF5', borderRadius: '5px', padding: '10px', marginLeft: '4%', width: '44%' }} />
            <FormControlLabel value="fluc" onClick={fluctuation} control={<Radio />} label="Fluctuation" sx={{ backgroundColor: '#EAEFF5', borderRadius: '5px', padding: '10px', width: '44%', marginTop: '1%' }} />
            <FormControlLabel value="defect" onClick={defectiveMeter} control={<Radio />} label="Defective Meter" sx={{ backgroundColor: '#EAEFF5', borderRadius: '5px', padding: '10px', marginLeft: '4%', width: '44%', marginTop: '1%' }} />
            <FormControlLabel value="phase" onClick={phase} control={<Radio />} label="Phase Issue " sx={{ backgroundColor: '#EAEFF5', borderRadius: '5px', padding: '10px', width: '44%', marginTop: '1%' }} />
            <FormControlLabel value="fall" onClick={fallenWire} control={<Radio />} label="Live Fallen Wire " sx={{ backgroundColor: '#EAEFF5', borderRadius: '5px', padding: '10px', marginLeft: '4%', width: '44%', marginTop: '1%' }} />
            <Typography className='InputAboveTxt' sx={{ fontSize: 15, fontWeight: '550', color: '#114D9C', marginTop: '1%', width: '100%' }}>
              Commercial
            </Typography>
            <FormControlLabel value="wmeter"onClick={wrongMeter} control={<Radio />} label="Wrong Meter Reading" sx={{ backgroundColor: '#EAEFF5', borderRadius: '5px', padding: '10px', width: '44%', marginTop: '1%' }} />
            <FormControlLabel value="delay"onClick={delayed} control={<Radio />} label="Delayed/No Meter Reading" sx={{ backgroundColor: '#EAEFF5', borderRadius: '5px', padding: '10px', marginLeft: '4%', width: '44%', marginTop: '1%' }} />
          </RadioGroup>
        </FormControl>

        <Grid lg={12} sx={{ width: '100%', marginTop: '1.5%', padding: '10px', backgroundColor: '#FFF3F3', marginRight: '1%' }}>
          <Box sx={{ flexDirection: 'row', display: 'flex' }}>
            <img src={exlam} style={{ width: '2.5%', height: '2%', marginLeft: '3%' }} />
            <Typography style={{ fontSize: 17, fontWeight: '400', color: 'red', marginLeft: '2%', marginTop: '0.3%' }}>
              Any illegal or obscence material upload will criminaly be prosecuted </Typography>
          </Box></Grid>
        { typeId === '101'?  
        <Button
          type="submit"
          fullWidth
          variant="contained"
          // onClick={() => navigate("/WrongMeterReading")}
          onClick={Procced}
          sx={{
            mt: 3, backgroundColor: '#114D9C', fontSize: 'small', textTransform: 'capitalize',
            height: 32, width: '30%', marginLeft: '30%', marginBottom: '3%', borderRadius: 20
          }}
        >
          Procced
        </Button>
        :         <Button
        type="submit"
        fullWidth
        variant="contained"
        // onClick={() => navigate("/WrongMeterReading")}
        onClick={complaint}
        sx={{
          mt: 3, backgroundColor: '#114D9C', fontSize: 'small', textTransform: 'capitalize',
          height: 32, width: '30%', marginLeft: '30%', marginBottom: '3%', borderRadius: 20
        }}
      >
        Procced
      </Button>
        }
      </Grid>
    </Box>
  )
}
