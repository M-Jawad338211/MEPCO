
import React, { useEffect, useContext, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import meter from '../assets/smart_meter_white_icon.png';
import upload from '../assets/ic_upload_icon.png';
import image from '../assets/images.jpg';
// import { Link, Navigate, useNavigate } from "react-router-dom";
import Sidebar from '../components/sidebar';
import { Button, FormControl, Grid, IconButton, InputAdornment, MenuItem, Modal, Typography } from '@mui/material';
import wrongMeterReading from '../components/userContextFile/UsersContext';
import { Close, Image } from '@mui/icons-material';
import userContext from '../components/userContextFile/UsersContext';
import { useNavigate } from 'react-router-dom';

export default function WrongMeterReading() {
  let navigate = useNavigate();
  const b: any = useContext(wrongMeterReading);

  const [date, setDate] = useState('')
  const [refNumber, setRefNumber] = useState('')
  const [netMeter, setNetMeter] = useState('')
  const [meterPhase, setMeterPhase] = useState('')
  const [meterCircle, setMeterCircle] = useState('')
  const [subdivision, setSubdivision] = useState('')
  const [companyCode, setCompanyCode] = useState('')
  const [refernceNumber, setReferenceNumber] = useState('')
  const [circle, setCircle] = useState('')
  const [typeId, setTypeId] = useState('')
  const [company, setCompany] = useState('')
  const [batchNo, setBatchNo] = useState('')
  // const Token: any = window.localStorage.getItem('cfptoken')
  const [token, setToken] = useState('')


  console.log(wrongMeterReading, '-------')
  useEffect(() => {
    if (b) {
      console.log(b, 'value of b')

      const refs = b.basicInfo.refNo
      let characterRef = refs.toString().replace(/[A-Z]/g, '').replace(/\s/g, '')
      setRefNumber(characterRef)
      let number = refNumber
      setBatchNo(number.slice(0, 2))
      let code = refNumber
      setCompany(code.slice(2, 4))
      let subD = refNumber
      setSubdivision(subD.slice(2, 6))
      let subcircle = refNumber
      setMeterCircle(subcircle.slice(2, 5))
      let billmeter = b.basicInfo.billMonth;
      let billdate = billmeter.slice(0, 8);
      let bill = billdate.toString().replace(/-/g, '')
      setDate(bill)
      setNetMeter(b.basicInfo.net_meter_cd)
      setMeterPhase(b.basicInfo.phase)
      console.log(batchNo, 'batch-----')
      console.log(refNumber, '-----')
      console.log(meterCircle, 'circle-----')
      console.log(company, 'company-----')
      console.log(subdivision, 'subdivision----')
    }
   
  }, [refNumber])

  useEffect(() => {
    cfpSignin()
  }, [])

  // const [image, setImage] = useState('');
  // console.log(image, 'image first ')

  console.log("https://snaps.pitc.com.pk/" + { company } + '000' + '/' + { meterCircle } + '00' + '/' + { subdivision } + '0/202305-' + { batchNo } + '/' + { date } + { refNumber } + "1E.jpg", 'data')
  const [firstImage, setFirstImage] = useState<File | null>(null);
  const [secondImage, setSecondImage] = useState<File | null>(null);
  const [offPeakImage, setOffPeakImage] = useState<File | null>(null);
  const [peakImage, setPeakImage] = useState<File | null>(null);

  const handleFirstImageChange = (e: any) => {
    setFirstImage(e.target.files?.[0] || null);
  };

  const handleSecondImageChange = (e: any) => {
    setSecondImage(e.target.files?.[0] || null);
  };
  const OffPeakImageChange = (e: any) => {
    setOffPeakImage(e.target.files?.[0] || null);
  };
  const PeakImageChange = (e: any) => {
    setPeakImage(e.target.files?.[0] || null);
  };

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     setSelectedImage(event.target.files[0]);
  //   }
  // };


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
          setToken(result.token)
          // localStorage.setItem('cfptoken', result.token)
        }
      })
    // .catch(error => console.log('error', error));
  }


  const complaint = () => {
    var formdata = new FormData();
    formdata.append("refNo", refNumber);
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
    formdata.append("offPeakImportImg", imageURL);
    formdata.append("offPeakImportExp", "");
    formdata.append("peakImportImg", "");
    formdata.append("peakImportExp", "");
    if (firstImage !== null) {
      formdata.append("offPeakImportImg", firstImage, firstImage.name);
    } else {
      formdata.append("offPeakImportImg", "");
    }
    // formdata.append("latestOffPeakImportImg", "");
    formdata.append("latestOffPeakImportExp", "");
    formdata.append("latestPeakImportImg", "");
    formdata.append("latestPeakImportExp", "");
    formdata.append("token", token);
    // console.log(refNumber, '------ref')
    console.log(token,'------token')
    // console.log(imageURL, 'imagggggg')

    var requestOptions: any = {
      method: 'POST',
      body: formdata,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      redirect: 'follow'
    };

    fetch("http://117.20.28.178:8038/powerComplaints/registerComplaint", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result,'result')
        // if (result.status === '200') {
        //   console.log(result, '------complaint')
        //   // setCompaintId(result.complaintId)
        //   console.log(result.complaintId, '-----id')
        //   localStorage.setItem('id', result.complaintId)
        //   setImage(imageURL)
        //   navigate(`/Datebarcode`);
        // }
      }
      )
  }


  const [isOpen, setIsOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [thirdOpen, setThirdOpen] = useState(false);
  const [forthOpen, setForthOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const secondModal = () => {
    setSecondOpen(true);
  };

  const secondClose = () => {
    setSecondOpen(false);
  };
  const thirdModal = () => {
    setThirdOpen(true);
  };

  const thirdClose = () => {
    setThirdOpen(false);
  };
  const forthModal = () => {
    setForthOpen(true);
  };

  const forthClose = () => {
    setForthOpen(false);
  };


  const imageURL = `https://snaps.pitc.com.pk/${company}000/${meterCircle}00/${subdivision}0/${date}-${batchNo}/${date}${refNumber}1E.jpg`;
   console.log(imageURL, '------urrrrrl')

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
        <Grid item lg={12}><p style={{ fontWeight: "500", color: 'black', marginTop: "3%", textAlign: 'center' }}>Wrong Meter Reading</p></Grid>

        <Box sx={{ marginTop: '1%', width: '100%' }}>
          <Typography className='InputAboveTxt' sx={{ fontSize: 15, fontWeight: 'bold', color: '#114D9C' }}>
            Meter Information
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', backgroundColor: '#EAEFF5' }}>
            <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
              Name
            </Typography>
            <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
              {b.basicInfo.consumerName}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between' }}>
            <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
              Reference No.
            </Typography>
            <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
              {refNumber}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', backgroundColor: '#EAEFF5' }}>
            <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
              Tariff
            </Typography>
            <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
              {b.basicInfo.tariffDescription}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between' }}>
            <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
              Meter Phase
            </Typography>
            <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
              {b.basicInfo.phase}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', backgroundColor: '#EAEFF5' }}>
            <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
              Meter No.
            </Typography>
            <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
              00000 {b.metersInfo[0]?.mtrNo}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between' }}>
            <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
              Meter Type
            </Typography>
            <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
              {b.basicInfo.meterType}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ marginTop: '1%', width: '100%' }}>
          <Typography className='InputAboveTxt' sx={{ fontSize: 15, fontWeight: 'bold', color: '#114D9C' }}>
            Reading Information
          </Typography>
          {netMeter === '01' ?
            <>
              <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', backgroundColor: '#EAEFF5' }}>
                <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                  Billing Month
                </Typography>
                <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                  {date}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between' }}>
                <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                  Off Peak Units Import (Previous)
                </Typography>
                <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                  {b.metersInfo[0]?.mtrKwhPrvRead}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', backgroundColor: '#EAEFF5' }}>
                <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                  Off Peak Units Import (Current)
                </Typography>
                <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                  {b.metersInfo[0]?.mtrKwhPrsRead}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between' }}>
                <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                  Peak Units Import (Previous)
                </Typography>
                <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                  {b.metersInfo[1]?.mtrKwhPrvRead}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', backgroundColor: '#EAEFF5' }}>
                <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                  Peak Units Import (Current)
                </Typography>
                <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                  {b.metersInfo[1]?.mtrKwhPrsRead}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between' }}>
                <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                  Off Peak Units Export(Previous)
                </Typography>
                <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                  {b.metersInfo[2]?.mtrKwhPrvRead}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', backgroundColor: '#EAEFF5' }}>
                <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                  Off Peak Units Export (Current)
                </Typography>
                <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                  {b.metersInfo[2]?.mtrKwhPrsRead}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between' }}>
                <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                  Peak Units Export (Previous)
                </Typography>
                <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                  {b.metersInfo[3]?.mtrKwhPrvRead}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', backgroundColor: '#EAEFF5' }}>
                <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                  Peak Units Export (Current)
                </Typography>
                <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                  {b.metersInfo[3]?.mtrKwhPrsRead}
                </Typography>
              </Box>
            </>
            : (meterPhase === '3-PHASE' || meterPhase === 'THREE-PHASE') ?
              <>
                <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', backgroundColor: '#EAEFF5' }}>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                    Billing Month
                  </Typography>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                    {date}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between' }}>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                    Off Peak Units (Previous)
                  </Typography>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                    {b.metersInfo[0]?.mtrKwhPrvRead}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', backgroundColor: '#EAEFF5' }}>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                    Off Peak Units (Current)
                  </Typography>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                    {b.metersInfo[0]?.mtrKwhPrsRead}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between' }}>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                    Peak Units (Previous)
                  </Typography>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                    {b.metersInfo[1]?.mtrKwhPrvRead}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', backgroundColor: '#EAEFF5' }}>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                    Peak Units (Current)
                  </Typography>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                    {b.metersInfo[1]?.mtrKwhPrsRead}
                  </Typography>
                </Box>
              </>
              : meterPhase === '1-PHASE' || meterPhase === 'S-PHASE' ?
                <>
                  <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', backgroundColor: '#EAEFF5' }}>
                    <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                      Billing Month
                    </Typography>
                    <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                      {date}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between' }}>
                    <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                      Previous Meter Reading
                    </Typography>
                    <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                      {b.metersInfo[0]?.mtrKwhPrvRead}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', backgroundColor: '#EAEFF5' }}>
                    <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                      Current Meter Reading
                    </Typography>
                    <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                      {b.metersInfo[0]?.mtrKwhPrsRead}
                    </Typography>
                  </Box>
                </>
                :
                <>
                  <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', backgroundColor: '#EAEFF5' }}>
                    <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                      Billing Month
                    </Typography>
                    <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                      {date}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between' }}>
                    <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                      Off Peak Units (Previous)
                    </Typography>
                    <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                      {b.metersInfo[0]?.mtrKwhPrvRead}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', backgroundColor: '#EAEFF5' }}>
                    <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                      Off Peak Units (Current)
                    </Typography>
                    <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                      {b.metersInfo[0]?.mtrKwhPrsRead}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between' }}>
                    <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                      Peak Units (Previous)
                    </Typography>
                    <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                      {b.metersInfo[1]?.mtrKwhPrvRead}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', backgroundColor: '#EAEFF5' }}>
                    <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                      Peak Units (Current)
                    </Typography>
                    <Typography className='InputAboveTxt' sx={{ fontSize: 13, fontWeight: '500', color: 'black' }}>
                      {b.metersInfo[1]?.mtrKwhPrsRead}
                    </Typography>
                  </Box>
                </>
          }
        </Box>

        <Grid container item spacing={2}>
          <Typography className='InputAboveTxt' sx={{ fontSize: 15, fontWeight: 'bold', color: '#114D9C', marginTop: '1%' }}>
            Meter Images
          </Typography>
          <Grid lg={12}>

            {netMeter === '01' ?
              <>
                <Box sx={{ display: 'flex', width: '70%', marginLeft: '28%' }}>
                  <img src={image} style={{ width: '20%', height: '4%' }} onClick={openModal} />
                  <img src={`https://snaps.pitc.com.pk/${company}000/${meterCircle}00/${subdivision}0/${date}-${batchNo}/${date}${refNumber}2E.jpg`}
                    style={{ width: '20%', height: '4%', marginLeft: '4%' }} onClick={secondModal} />
                  {/* <img src={"https://snaps.pitc.com.pk/"+{company}+'000'+'/'+{meterCircle}+'00'+'/'+{subdivision}+'0/202305-'+{batchNo}+'/202305'+{refNumber}+"1E.jpg"}  style={{ width: '20%', height: '4%' }} /> */}
                </Box>
                <Box sx={{ display: 'flex', width: '70%', marginLeft: '28%', marginTop: '2%' }}>
                  <img src={`https://snaps.pitc.com.pk/${company}000/${meterCircle}00/${subdivision}0/${date}-${batchNo}/${date}${refNumber}3E.jpg`}
                    style={{ width: '20%', height: '4%' }} onClick={thirdModal} />
                  <img src={`https://snaps.pitc.com.pk/${company}000/${meterCircle}00/${subdivision}0/${date}-${batchNo}/${date}${refNumber}4E.jpg`}
                    style={{ width: '20%', height: '4%', marginLeft: '4%' }} onClick={forthModal} />
                </Box>
              </>
              : (meterPhase === '3-PHASE' || meterPhase === 'THREE-PHASE') ?
                (
                  <Box sx={{ display: 'flex', width: '70%', marginLeft: '28%' }}>
                    {imageURL ? (
                      <>
                        <img src={imageURL}
                          style={{ width: '20%', height: '4%' }} onClick={openModal} />
                        <img src={`https://snaps.pitc.com.pk/${company}000/${meterCircle}00/${subdivision}0/${date}-${batchNo}/${date}${refNumber}2E.jpg`}
                          style={{ width: '20%', height: '4%', marginLeft: '4%' }} onClick={secondModal} />
                      </>
                    ) : (
                      <Typography className='InputAboveTxt' sx={{ fontSize: 14, fontWeight: '400', color: 'red', textAlign: 'center' }}>
                        Image not available.
                      </Typography>
                    )
                    }
                  </Box>
                )
                : meterPhase === '1-PHASE' || meterPhase === 'S-PHASE' ?
                  (
                    <Box sx={{ display: 'flex', width: '70%', marginLeft: '38%' }}>
                      <img src={`https://snaps.pitc.com.pk/${company}000/${meterCircle}00/${subdivision}0/${date}-${batchNo}/${date}${refNumber}1E.jpg`}
                        onClick={openModal}
                        style={{ width: '20%', height: '4%' }} />


                      {/* <Modal isOpen={isOpen} onRequestClose={closeModal}
                                  aria-labelledby="modal-modal-title"
                                  aria-describedby="modal-modal-description">
                        <button onClick={closeModal}>Close</button>

                        <img src={`https://snaps.pitc.com.pk/${company}000/${meterCircle}00/${subdivision}0/${date}-${batchNo}/${date}${refNumber}1E.jpg`} alt="Image" /> 
                      
                      </Modal> */}

                    </Box>
                  )

                  :
                  <Typography className='InputAboveTxt' sx={{ fontSize: 14, fontWeight: '400', color: 'red', textAlign: 'center' }}>
                    Image not avaliable.
                  </Typography>
            }
          </Grid>

          <hr style={{ marginTop: "0.5%", color: "gray", width: "100%" }} />
          <Typography className='InputAboveTxt' sx={{ fontSize: 15, fontWeight: '550', color: '#114D9C', marginTop: '1%' }}>
            Latest Meter Images
          </Typography>
          {netMeter === '01' ?
            <>
              <Grid lg={12} sx={{ display: 'flex', justifyContent: 'space-between', }}>
                <Grid lg={6}>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 16, fontWeight: '400', color: 'grey', marginTop: '1%', marginLeft: '1%' }}>
                    Off Peak Images
                  </Typography>
                  {firstImage && (
                    <div>
                      <img src={URL.createObjectURL(firstImage)} alt="First Image" style={{ width: '20%', height: '4%' }} />
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleFirstImageChange} style={{ display: 'none' }} />
                  <Box onClick={() => document.getElementsByTagName('input')[0].click()} sx={{ display: 'flex', width: '60%', border: '1px solid blue', borderRadius: '9px', padding: '10px', marginTop: '1%' }}>
                    <img src={upload} style={{ marginLeft: '30%', width: '9%', height: '4%' }} />
                    <Typography className='InputAboveTxt' sx={{ fontSize: 22, fontWeight: '500', color: '#114D9C', marginLeft: '3%' }}>
                      Upload
                    </Typography>
                  </Box>
                </Grid>
                <Grid lg={6}>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 16, fontWeight: '400', color: 'gray', marginTop: '1%', marginLeft: '1%' }}>
                    Peak Imges
                  </Typography>
                  {secondImage && (
                    <div>
                      <img src={URL.createObjectURL(secondImage)} alt="Second Image" style={{ width: '20%', height: '4%' }} />
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleSecondImageChange} style={{ display: 'none' }} />
                  <Box onClick={() => document.getElementsByTagName('input')[1].click()} sx={{ display: 'flex', width: '60%', border: '1px solid blue', borderRadius: '9px', padding: '10px', marginTop: '1%' }}>
                    <img src={upload} style={{ marginLeft: '30%', width: '9%', height: '4%' }} />
                    <Typography className='InputAboveTxt' sx={{ fontSize: 22, fontWeight: '500', color: '#114D9C', marginLeft: '3%' }}>
                      Upload
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid lg={12} sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '2%' }}>
                <Grid lg={6}>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 16, fontWeight: '400', color: 'grey', marginTop: '1%', marginLeft: '1%' }}>
                    Off Peak Images
                  </Typography>
                  {offPeakImage && (
                    <div>
                      <img src={URL.createObjectURL(offPeakImage)} alt="First Image" style={{ width: '20%', height: '4%' }} />
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={OffPeakImageChange} style={{ display: 'none' }} />
                  <Box onClick={() => document.getElementsByTagName('input')[2].click()} sx={{ display: 'flex', width: '60%', border: '1px solid blue', borderRadius: '9px', padding: '10px', marginTop: '1%' }}>
                    <img src={upload} style={{ marginLeft: '30%', width: '9%', height: '4%' }} />
                    <Typography className='InputAboveTxt' sx={{ fontSize: 22, fontWeight: '500', color: '#114D9C', marginLeft: '3%' }}>
                      Upload
                    </Typography>
                  </Box>
                </Grid>
                <Grid lg={6}>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 16, fontWeight: '400', color: 'gray', marginTop: '1%', marginLeft: '1%' }}>
                    Peak Imges
                  </Typography>
                  {peakImage && (
                    <div>
                      <img src={URL.createObjectURL(peakImage)} alt="Second Image" style={{ width: '20%', height: '4%' }} />
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={PeakImageChange} style={{ display: 'none' }} />
                  <Box onClick={() => document.getElementsByTagName('input')[3].click()} sx={{ display: 'flex', width: '60%', border: '1px solid blue', borderRadius: '9px', padding: '10px', marginTop: '1%' }}>
                    <img src={upload} style={{ marginLeft: '30%', width: '9%', height: '4%' }} />
                    <Typography className='InputAboveTxt' sx={{ fontSize: 22, fontWeight: '500', color: '#114D9C', marginLeft: '3%' }}>
                      Upload
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </>
            : (meterPhase === '3-PHASE' || meterPhase === 'THREE-PHASE') ?

              <Grid lg={12} sx={{ display: 'flex', justifyContent: 'space-between', }}>
                <Grid lg={6}>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 16, fontWeight: '400', color: 'grey', marginTop: '1%', marginLeft: '1%' }}>
                    Off Peak Images
                  </Typography>
                  {firstImage && (
                    <div>
                      <img src={URL.createObjectURL(firstImage)} alt="First Image" style={{ width: '20%', height: '4%' }} />
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleFirstImageChange} style={{ display: 'none' }} />
                  <Box onClick={() => document.getElementsByTagName('input')[0].click()} sx={{ display: 'flex', width: '60%', border: '1px solid blue', borderRadius: '9px', padding: '10px', marginTop: '1%' }}>
                    <img src={upload} style={{ marginLeft: '30%', width: '9%', height: '4%' }} />
                    <Typography className='InputAboveTxt' sx={{ fontSize: 22, fontWeight: '500', color: '#114D9C', marginLeft: '3%' }} >
                      Upload
                    </Typography>
                  </Box>
                </Grid>
                <Grid lg={6}>
                  <Typography className='InputAboveTxt' sx={{ fontSize: 16, fontWeight: '400', color: 'gray', marginTop: '1%', marginLeft: '1%' }}>
                    Peak Imges
                  </Typography>
                  {secondImage && (
                    <div>
                      <img src={URL.createObjectURL(secondImage)} alt="Second Image" style={{ width: '20%', height: '4%' }} />
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleSecondImageChange} style={{ display: 'none' }} />
                  <Box onClick={() => document.getElementsByTagName('input')[1].click()} sx={{ display: 'flex', width: '60%', border: '1px solid blue', borderRadius: '9px', padding: '10px', marginTop: '1%' }}>
                    <img src={upload} style={{ marginLeft: '30%', width: '9%', height: '4%' }} />
                    <Typography className='InputAboveTxt' sx={{ fontSize: 22, fontWeight: '500', color: '#114D9C', marginLeft: '3%' }}>
                      Upload
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              : meterPhase === '1-PHASE' || meterPhase === 'S-PHASE' ?

                <Grid lg={12} sx={{ display: 'flex', justifyContent: 'space-between', }}>
                  <Grid lg={6}>
                    <Typography className='InputAboveTxt' sx={{ fontSize: 16, fontWeight: '400', color: 'grey', marginTop: '1%', marginLeft: '1%' }}>
                      Off Peak Images
                    </Typography>
                    {firstImage && (
                      <div>
                        <img src={URL.createObjectURL(firstImage)} alt="First Image" style={{ width: '20%', height: '4%' }} />
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={handleFirstImageChange} style={{ display: 'none' }} />
                    <Box onClick={() => document.getElementsByTagName('input')[0].click()} sx={{ display: 'flex', width: '60%', border: '1px solid blue', borderRadius: '9px', padding: '10px', marginTop: '1%' }}>
                      <img src={upload} style={{ marginLeft: '30%', width: '9%', height: '4%' }} />
                      <Typography className='InputAboveTxt' sx={{ fontSize: 22, fontWeight: '500', color: '#114D9C', marginLeft: '3%' }}>
                        Upload
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid lg={6}>
                    <Typography className='InputAboveTxt' sx={{ fontSize: 16, fontWeight: '400', color: 'gray', marginTop: '1%', marginLeft: '1%' }}>
                      Peak Imges
                    </Typography>
                    {secondImage && (
                      <div>
                        <img src={URL.createObjectURL(secondImage)} alt="Second Image" style={{ width: '20%', height: '4%' }} />
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={handleSecondImageChange} style={{ display: 'none' }} />
                    <Box onClick={() => document.getElementsByTagName('input')[1].click()} sx={{ display: 'flex', width: '60%', border: '1px solid blue', borderRadius: '9px', padding: '10px', marginTop: '1%' }}>
                      <img src={upload} style={{ marginLeft: '30%', width: '9%', height: '4%' }} />
                      <Typography className='InputAboveTxt' sx={{ fontSize: 22, fontWeight: '500', color: '#114D9C', marginLeft: '3%' }}>
                        Upload
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                :
                <Grid lg={12} sx={{ display: 'flex', justifyContent: 'space-between', }}>
                  <Grid lg={6}>
                    <Typography className='InputAboveTxt' sx={{ fontSize: 16, fontWeight: '400', color: 'grey', marginTop: '1%', marginLeft: '1%' }}>
                      Off Peak Images
                    </Typography>
                    {firstImage && (
                      <div>
                        <img src={URL.createObjectURL(firstImage)} alt="First Image" style={{ width: '20%', height: '4%' }} />
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={handleFirstImageChange} style={{ display: 'none' }} />
                    <Box onClick={() => document.getElementsByTagName('input')[0].click()} sx={{ display: 'flex', width: '60%', border: '1px solid blue', borderRadius: '9px', padding: '10px', marginTop: '1%' }}>
                      <img src={upload} style={{ marginLeft: '30%', width: '9%', height: '4%' }} />
                      <Typography className='InputAboveTxt' sx={{ fontSize: 22, fontWeight: '500', color: '#114D9C', marginLeft: '3%' }}>
                        Upload
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid lg={6}>
                    <Typography className='InputAboveTxt' sx={{ fontSize: 16, fontWeight: '400', color: 'gray', marginTop: '1%', marginLeft: '1%' }}>
                      Peak Imges
                    </Typography>
                    {secondImage && (
                      <div>
                        <img src={URL.createObjectURL(secondImage)} alt="Second Image" style={{ width: '20%', height: '4%' }} />
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={handleSecondImageChange} style={{ display: 'none' }} />
                    <Box onClick={() => document.getElementsByTagName('input')[1].click()} sx={{ display: 'flex', width: '60%', border: '1px solid blue', borderRadius: '9px', padding: '10px', marginTop: '1%' }}>
                      <img src={upload} style={{ marginLeft: '30%', width: '9%', height: '4%' }} />
                      <Typography className='InputAboveTxt' sx={{ fontSize: 22, fontWeight: '500', color: '#114D9C', marginLeft: '3%' }}>
                        Upload
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
          }

        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={complaint}
          // onClick={submit}
          // onClick={LoginHandler}
          sx={{
            mt: 3, backgroundColor: '#114D9C', fontSize: 'small', textTransform: 'capitalize',
            height: 32, width: '30%', marginLeft: '30%', marginBottom: '3%', borderRadius: 20
          }}
        >
          Submit
        </Button>

        <Modal
          open={isOpen}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >

          <Box sx={{ marginLeft: '27%', flexDirection: 'column', display: 'flex', marginTop: '5%', borderRadius: 5, position: 'absolute' as 'absolute', width: "50%", height: '80%', boxShadow: 20, backgroundColor: 'white', zIndex: '30' }}>
            <Close className='Icon' sx={{ fontSize: 25, fontWeight: 'bold', marginBottom: '1%', marginLeft: '90%', marginTop: '2%' }} onClick={closeModal} />
            <img src={`https://snaps.pitc.com.pk/${company}000/${meterCircle}00/${subdivision}0/${date}-${batchNo}/${date}${refNumber}1E.jpg`}
              style={{ width: '83%', height: '89%', marginLeft: '8.5%', borderRadius: '4%' }} />
          </Box>
        </Modal>

        <Modal
          open={secondOpen}
          onClose={secondClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >

          <Box sx={{ marginLeft: '27%', flexDirection: 'column', display: 'flex', marginTop: '5%', borderRadius: 5, position: 'absolute' as 'absolute', width: "50%", height: '80%', boxShadow: 20, backgroundColor: 'white', zIndex: '30' }}>
            <Close className='Icon' sx={{ fontSize: 25, fontWeight: 'bold', marginBottom: '1%', marginLeft: '90%', marginTop: '2%' }} onClick={secondClose} />
            <img src={`https://snaps.pitc.com.pk/${company}000/${meterCircle}00/${subdivision}0/${date}-${batchNo}/${date}${refNumber}2E.jpg`}
              style={{ width: '83%', height: '89%', marginLeft: '8.5%', borderRadius: '4%' }} />
          </Box>
        </Modal>

        <Modal
          open={thirdOpen}
          onClose={thirdClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >

          <Box sx={{ marginLeft: '27%', flexDirection: 'column', display: 'flex', marginTop: '5%', borderRadius: 5, position: 'absolute' as 'absolute', width: "50%", height: '80%', boxShadow: 20, backgroundColor: 'white', zIndex: '30' }}>
            <Close className='Icon' sx={{ fontSize: 25, fontWeight: 'bold', marginBottom: '1%', marginLeft: '90%', marginTop: '2%' }} onClick={thirdClose} />
            <img src={`https://snaps.pitc.com.pk/${company}000/${meterCircle}00/${subdivision}0/${date}-${batchNo}/${date}${refNumber}3E.jpg`}
              style={{ width: '83%', height: '89%', marginLeft: '8.5%', borderRadius: '4%' }} />
          </Box>
        </Modal>

        <Modal
          open={forthOpen}
          onClose={forthClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >

          <Box sx={{ marginLeft: '27%', flexDirection: 'column', display: 'flex', marginTop: '5%', borderRadius: 5, position: 'absolute' as 'absolute', width: "50%", height: '80%', boxShadow: 20, backgroundColor: 'white', zIndex: '30' }}>
            <Close className='Icon' sx={{ fontSize: 25, fontWeight: 'bold', marginBottom: '1%', marginLeft: '90%', marginTop: '2%' }} onClick={forthClose} />
            <img src={`https://snaps.pitc.com.pk/${company}000/${meterCircle}00/${subdivision}0/${date}-${batchNo}/${date}${refNumber}4E.jpg`}
              style={{ width: '83%', height: '89%', marginLeft: '8.5%', borderRadius: '4%' }} />
          </Box>
        </Modal>
        <div>

        </div>
      </Grid>
    </Box>
  )
}
