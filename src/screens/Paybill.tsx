import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Sidebar from '../components/sidebar';
import meter from '../assets/smart_meter_white_icon.png';
import { Button, FormControl, FormControlLabel, Grid, Modal, Radio, RadioGroup, Typography, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import upload from '../assets/ic_upload_icon.png';
// import del from '../assets/delete.png';
import wrongMeterReading from '../components/userContextFile/UsersContext';
import userContext from '../components/userContextFile/UsersContext';
import { Close } from '@mui/icons-material';


export default function Paybill() {
  const a: any = useContext(userContext);
  const [name, setName] = useState('')
  const [address, setaddress] = useState('')
  const [refernceNumber, setReferenceNumber] = useState('')
  const [meterCatagory, setMeterCatagory] = useState('')
  const [wrongmeter, setWrongMeter] = useState(false)
  const [meterChangeType, setMeterChangeType] = useState('')
  const [mTerminal, setMTerminal] = useState('')
  const [meterStolen, setMeterStolen] = useState('')
  const [firstImage, setFirstImage] = useState<File | null>(null);
  const [secondImage, setSecondImage] = useState<File | null>(null);
  const [changeOfMeter, setChangeOfMeter] = useState('')
  // const [meterChanged, setMeterChanged] = useState(true)
  // const [meterTerminalsBurnt, setMeterTerminalBurnt] = useState(false)
  // const [meterTerm, setMeterTerm] = useState(false)
  let navigate = useNavigate();
  const display = () => {
    setMeterChangeType('No Display');
    // setMeterChanged(true);
    // setMeterTerminalBurnt(false);
    // setMeterTerm(false);
    console.log(meterChangeType, '----change')
  };
  useEffect(() => {
    console.log(firstImage, 'printing image')
    display();
  }, [firstImage, display])
  useEffect(() => {
    console.log(secondImage, 'in applicant second function');
  }, [secondImage]);

  useEffect(() => {
    paymentConsumptions()

  }, [refernceNumber])
 
  const Terminal = () => {
    setMeterChangeType('Meter Terminal Burnt');
    // setMeterChanged(false);
    // setMeterTerminalBurnt(true);
    // setMeterTerm(false);
    console.log(meterChangeType, '----terminal')
  };
  const Stolen = () => {
    setMeterChangeType('Meter Stolen');
    // setMeterChanged(false);
    // setMeterTerminalBurnt(false);
    // setMeterTerm(true);
    console.log(meterChangeType, '----stolen')
  };

  const meterReading = (result: any) => {

    a.metersInfo = result.metersInfo;
    a.basicInfo = result.basicInfo;
    a.histInfo = result.histInfo;
    <wrongMeterReading.Provider value={data1}>
      {result.children}
    </wrongMeterReading.Provider>
  }

  const data1 = {
    "metersInfo": a.metersInfo,
    "basicInfo": a.basicInfo,
    "histInfo": a.histInfo,
  }

  const paymentConsumptions = async () => {
    var requestOptions: any = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://bill.pitc.com.pk/bill/info/27151250363540", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === true) {
          meterReading(result)
          console.log(result, '-----res')
          let ref = result.basicInfo.refNo
          let characterRef = ref.toString().replace(/[A-Z]/g, '').replace(/\s/g, '')
          setReferenceNumber(characterRef)
          setMeterCatagory(result.basicInfo.cons_type)
          setName(result.basicInfo.consumerName)
          setaddress(result.basicInfo.consumerAddress1)

        }
      })
  }
  const meterChange = () => {
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
          let cfpToken = result.token


          var formdata = new FormData();
          formdata.append("refNo", refernceNumber);
          formdata.append("meterStatus", "active");
          formdata.append("meterType", "amr");
          formdata.append("meterPhase", "three phase");
          formdata.append("meterChangeType", meterChangeType);
          formdata.append("name", "Asim");
          formdata.append("applicantCNIC", "1234567891234");
          formdata.append("address", "saadd");
          formdata.append("lastBillImage", "Last Bill");
          formdata.append("policeReportImage", "");
          formdata.append("createdBy", "M Ahmad");
          formdata.append("isOnline", "1");
          formdata.append("submittedThrough", "MEPCO APP");
          formdata.append("subDivisionCode", "15171");
          formdata.append("divisionCode", "1517");
          formdata.append("circleCode", "151");
          formdata.append("companyCode", "15");
          formdata.append("token", cfpToken);

          var requestOptions: any = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
          };

          fetch("http://117.20.28.178:8038/changeOfMeterRequest/changeOfMeterRequest", requestOptions)
            .then(response => response.json())
            .then(result => {
              // console.log(result, '------result----')
              if (result.status == '200') {
                console.log(result, '------result----')
                setChangeOfMeter(result.changeOfMeterRequestId)
                console.log(result.changeOfMeterRequestId, '---------changeeeeeeeee')
                localStorage.setItem('id', result.changeOfMeterRequestId)
                navigate('/MeterChangeId');


              }
            })
            .catch(error => console.log('error', error));
        }
      })
      .catch(error => console.log('error', error));
  }
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [base64String, setBase64String] = useState('');
  const [firstbase64String, setFirstBase64String] = useState('');
  const [secondbase64String, setSecondBase64String] = useState('');

  const handleImageChange = async (event: any) => {
    setUploadImage(event.target.files?.[0] || null);

  };
  useEffect(() => {
    console.log(uploadImage, 'printing image')

  }, [uploadImage])


  const handleFirstImageChange = async (event: any) => {
    console.log('click')
     setFirstImage(event.target.files?.[0] || null);
    // const files = event.target.files;

    // if (files && files.length > 0) {
    //   const file = files[0];
    //   setFirstImage(file);
    //   try {
    //     const String = await convertImageToBase64(file);
    //     setFirstBase64String(String);
    //     console.log(String, '64444');
    //     // await sendImageToAPI(base64String);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }

  };

  const handleSecondImageChange = async (event: any) => {
     setSecondImage(event.target.files?.[0] || null);
    // const files = event.target.files;

    // if (files && files.length > 0) {
    //   const file = files[0];
    //   setSecondImage(file);
    //   try {
    //     const String = await convertImageToBase64(file);
    //     setSecondBase64String(String);
    //     console.log(String, '644442');
    //     // await sendImageToAPI(base64String);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
  };
  // function convertImageToBase64(file: File): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       if (typeof reader.result === 'string') {
  //         resolve(reader.result);
  //       } else {
  //         reject(new Error('Failed to convert image to base64.'));
  //       }
  //     };

  //     reader.onerror = () => {
  //       reject(new Error('Error occurred while reading the image.'));
  //     };

  //     reader.readAsDataURL(file);
  //   });
  // }
  const handleDelete = () => {
    setUploadImage(null)
  }
  const handleDeleteFirst = () => {
    setFirstImage(null)

  }
  const handleDeleteSecond = () => {
    setSecondImage(null)

  }
  const [isOpen, setIsOpen] = useState(false);
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const firstModal = () => {
    setFirstOpen(true);
  };

  const firstClose = () => {
    setFirstOpen(false);
  };
  const secondModal = () => {
    setSecondOpen(true);
  };

  const secondClose = () => {
    setSecondOpen(false);
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

        >
          <Sidebar />
        </Drawer>
      </Box>

      <Grid container item spacing={2} sx={{ marginLeft: '3%', marginRight: '3%' }} >
        <Grid item lg={12}><p style={{ fontWeight: "500", color: 'black', marginTop: "3%", textAlign: 'center' }}>Meter Change Request</p>
        </Grid>

        <Grid item lg={12} style={{ backgroundColor: '#114D9C', borderRadius: "6px", display: 'flex', justifyContent: 'space-between', padding: '12px', marginTop: "1%" }}>
          <Box>
            <p style={{ color: "white" }}>{name}</p>
            <p style={{ marginTop: "-9%", color: "white" }}>Ref: {refernceNumber}</p>
            <p style={{ marginTop: "-9%", color: "white" }}>{address}</p>
          </Box>
          <Box style={{ width: " 12%" }}>
            <img src={meter} alt="" style={{ width: " 50%" }} />
            <p style={{ marginTop: "5%", color: "white", fontSize: "10px", marginLeft: '10%' }}>{meterCatagory}</p>
          </Box>
        </Grid>
        <FormControl sx={{ marginTop: '4%', width: '100%', marginLeft: '1%' }}>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            defaultValue="display"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="display" onClick={display} control={<Radio />} label="No Display" sx={{ backgroundColor: '#EAEFF5', borderRadius: '5px', padding: '10px', width: '44%' }} />
            <FormControlLabel value="terminal" onClick={()=>Terminal()} control={<Radio />} label="Meter Terminals Burnt" sx={{ backgroundColor: '#EAEFF5', borderRadius: '5px', padding: '10px', marginLeft: '4%', width: '42%' }} />
            <FormControlLabel value="stolen" onClick={()=>Stolen()} control={<Radio />} label="Meter Stolen" sx={{ backgroundColor: '#EAEFF5', borderRadius: '5px', padding: '10px', width: '42%', marginTop: '2%' }} />

          </RadioGroup>

        </FormControl>
        {/* <FormControl sx={{ marginTop: '4%', width: '100%', marginLeft: '1%' }}>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            defaultValue="display"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="display" onClick={()=>display()} control={<Radio />} label="No Display" sx={{ backgroundColor: '#EAEFF5', borderRadius: '5px', padding: '10px', width: '42%' }} />
            <FormControlLabel value="terminal" onClick={()=>meterTerminal()} control={<Radio />} label="Meter Terminals Burnt" sx={{ backgroundColor: '#EAEFF5', borderRadius: '5px', padding: '10px', marginLeft: '10%', width: '42%' }} />
            <FormControlLabel value="stolen" onClick={()=>meterstolen()} control={<Radio />} label="Meter Stolen" sx={{ backgroundColor: '#EAEFF5', borderRadius: '5px', padding: '10px', width: '42%', marginTop: '2%' }} />
          </RadioGroup>
        </FormControl> */}

        {(meterChangeType === 'No Display' || meterChangeType === 'Meter Terminal Burnt') && (
          <>
            <Grid lg={12}>
              <Typography className='InputAboveTxt' sx={{ fontSize: 15, fontWeight: '520', color: '#114D9C', marginTop: '2%', width: '100%' }}>
                Last Paid Bill Image
              </Typography>
              <Box sx={{ width: '30%', marginLeft: '35%' }}>

                {uploadImage && (
                  <div>
                    <img src={URL.createObjectURL(uploadImage)} alt="First Image" style={{ width: '20%', height: '4%', marginLeft: '24%' }} onClick={openModal} />
                  </div>
                )}
                {uploadImage ?
                  <>
                    <Box onClick={handleDelete} sx={{ display: 'flex', width: '65%', border: '1px solid #bb0303', borderRadius: '9px', padding: '6px', marginTop: '1%' }}>
                      {/* <img src={del} style={{ marginLeft: '30%', width: '7%', height: '1%', marginTop: '2%' }} /> */}
                      <Typography className='InputAboveTxt' sx={{ fontSize: 18, fontWeight: '500', color: '#bb0303', marginLeft: '3%' }}>Delete</Typography>
                    </Box>
                  </>
                  :
                  <>
                  {/* <Button onClick={() => document.getElementsByTagName('input')[0].click()} sx={{ display: 'flex', width: '100%', border: '1px solid blue', borderRadius: '9px', padding: '10px', marginTop: '1%' }}> */}
                  <Button sx={{ display: 'flex', width: '100%', border: '1px solid blue', borderRadius: '9px', padding: '10px', marginTop: '1%' }}>
                  <input type="file" accept="image/*" id="fileInput" onChange={handleFirstImageChange} style={{ display: 'none' }} />
                    <img src={upload} style={{ marginLeft: '30%', width: '10%', height: '3%', marginTop:'1%' }} />
                    <Typography className='InputAboveTxt' sx={{ fontSize: 18, fontWeight: '500', color: '#114D9C', marginLeft: '3%' }}>Upload</Typography>
                  </Button>
                  </>
                }
              </Box>
            </Grid>
          </>
        )}

        <Box sx={{ width: '100%', marginLeft: '15%', marginRight: '15%' }}>
          {meterChangeType === 'Meter Stolen' &&
            (
              <Grid lg={12} sx={{ display: 'flex', justifyContent: 'space-between', marginLeft: '10%', marginRight: '10%' }}>
                <Grid lg={6}>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 16, fontWeight: '400', color: '#114D9C', marginTop: '1%', marginLeft: '11%' }}>
                    Police Report Image
                  </Typography>
                  {firstImage && (
                    <div>
                      <img src={URL.createObjectURL(firstImage)} alt="First Image" style={{ width: '20%', height: '4%', marginLeft: '24%' }} onClick={firstModal} />
                    </div>
                  )}
                  {firstImage ?
                    <>
                      <Box onClick={handleDeleteFirst} sx={{ display: 'flex', width: '65%', border: '1px solid #bb0303', borderRadius: '9px', padding: '6px', marginTop: '1%' }}>
                        {/* <img src={del} style={{ marginLeft: '30%', width: '7%', height: '1%', marginTop: '2%' }} /> */}
                        <Typography className='InputAboveTxt' sx={{ fontSize: 18, fontWeight: '500', color: '#bb0303', marginLeft: '3%' }}>Delete</Typography>
                      </Box>
                    </>
                    :
                    <>
                  {/* <Button onClick={() => document.getElementsByTagName('input')[0].click()} sx={{ display: 'flex', width: '100%', border: '1px solid blue', borderRadius: '9px', padding: '10px', marginTop: '1%' }}> */}
                  <Button sx={{ display: 'flex', width: '100%', border: '1px solid blue', borderRadius: '9px', padding: '10px', marginTop: '1%' }}>
                  
                  <input type="file" accept="image/*" id="fileInput" onChange={handleFirstImageChange} style={{ display: 'none' }} />
                    <img src={upload} style={{ marginLeft: '30%', width: '10%', height: '3%', marginTop:'1%' }} />
                    <Typography className='InputAboveTxt' sx={{ fontSize: 18, fontWeight: '500', color: '#114D9C', marginLeft: '3%' }}>Upload</Typography>
                  </Button>
                    </>
                  }
                </Grid>
                <Grid lg={6} >
                  <Typography className='InputAboveTxt' sx={{ fontSize: 16, fontWeight: '400', color: '#114D9C', marginTop: '1%', marginLeft: '17%' }}>
                    Last Paid Bill Image
                  </Typography>
                  {secondImage && (
                    <div>
                      <img src={URL.createObjectURL(secondImage)} alt="Second Image" style={{ width: '20%', height: '4%', marginLeft: '24%' }} onClick={secondModal} />
                    </div>
                  )}
                  {secondImage ?
                    <>
                      <Box onClick={handleDeleteSecond} sx={{ display: 'flex', width: '65%', border: '1px solid #bb0303', borderRadius: '9px', padding: '6px', marginTop: '1%' }}>
                        {/* <img src={del} style={{ marginLeft: '30%', width: '7%', height: '1%', marginTop: '2%' }} /> */}
                        <Typography className='InputAboveTxt' sx={{ fontSize: 18, fontWeight: '500', color: '#bb0303', marginLeft: '3%' }}>Delete</Typography>
                      </Box>
                    </>
                    :
                    <>
                  {/* <Button onClick={() => document.getElementsByTagName('input')[0].click()} sx={{ display: 'flex', width: '100%', border: '1px solid blue', borderRadius: '9px', padding: '10px', marginTop: '1%' }}> */}
                  
                  <Button sx={{ display: 'flex', width: '100%', border: '1px solid blue', borderRadius: '9px', padding: '10px', marginTop: '1%' }}>
                  <input type="file" accept="image/*" id="fileInput" onChange={handleSecondImageChange} style={{ display: 'none' }} />
                    <img src={upload} style={{ marginLeft: '30%', width: '10%', height: '3%', marginTop:'1%' }} />
                    <Typography className='InputAboveTxt' sx={{ fontSize: 18, fontWeight: '500', color: '#114D9C', marginLeft: '3%' }}>Upload</Typography>
                  </Button>
                      </>
                  }
                </Grid>
              </Grid>
            )
          }
        </Box>


        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={meterChange}
          sx={{
            mt: 5, backgroundColor: '#114D9C', fontSize: 'small', textTransform: 'capitalize',
            height: 37, width: '33%', marginLeft: '30%', marginBottom: '3%', borderRadius: 20
          }}
        >
          Proceed
        </Button>

        <Modal
          open={firstOpen}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >

          <Box sx={{ marginLeft: '27%', flexDirection: 'column', display: 'flex', marginTop: '5%', borderRadius: 5, position: 'absolute' as 'absolute', width: "50%", height: '80%', boxShadow: 20, backgroundColor: 'white', zIndex: '30' }}>
            <Close className='Icon' sx={{ fontSize: 25, fontWeight: 'bold', marginBottom: '1%', marginLeft: '90%', marginTop: '2%' }} onClick={closeModal} />
            <img src={firstbase64String}
              style={{ width: '83%', height: '89%', marginLeft: '8.5%', borderRadius: '4%' }} />
          </Box>
        </Modal>

        <Modal
          open={secondOpen}
          onClose={firstClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >

          <Box sx={{ marginLeft: '27%', flexDirection: 'column', display: 'flex', marginTop: '5%', borderRadius: 5, position: 'absolute' as 'absolute', width: "50%", height: '80%', boxShadow: 20, backgroundColor: 'white', zIndex: '30' }}>
            <Close className='Icon' sx={{ fontSize: 25, fontWeight: 'bold', marginBottom: '1%', marginLeft: '90%', marginTop: '2%' }} onClick={firstClose} />
            <img src={secondbase64String}
              style={{ width: '83%', height: '89%', marginLeft: '8.5%', borderRadius: '4%' }} />
          </Box>
        </Modal>

        <Modal
          open={isOpen}
          onClose={secondClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >

          <Box sx={{ marginLeft: '27%', flexDirection: 'column', display: 'flex', marginTop: '5%', borderRadius: 5, position: 'absolute' as 'absolute', width: "50%", height: '80%', boxShadow: 20, backgroundColor: 'white', zIndex: '30' }}>
            <Close className='Icon' sx={{ fontSize: 25, fontWeight: 'bold', marginBottom: '1%', marginLeft: '90%', marginTop: '2%' }} onClick={secondClose} />
            <img src={base64String}
              style={{ width: '83%', height: '89%', marginLeft: '8.5%', borderRadius: '4%' }} />
          </Box>
        </Modal>
      </Grid>
    </Box>
  )
}