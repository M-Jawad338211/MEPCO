import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import mepcologo from "../assets/mepco_logo.png";
import emailicon from "../assets/email_icon.png";
import phone from "../assets/mobileicon.png";
import { Box, Button, Grid, TextField } from '@mui/material';
import '../styles/ForgotPasswordotp.scss'
import { useFormik } from 'formik';
import { forgotpasswordSchema } from '../schemas/forgotpassword';
import { ToastContainer, toast } from 'react-toastify';
export default function ForgotPassword() {
    let navigate = useNavigate();
    const handleClickLoadProfile = () => {
        var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    "email": Email,
                    "contactNo": ""
                });

                var requestOptions : any = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch("http://117.20.28.178:8039/appUser/forgotPasswordOTP", requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        if(result.status === '200'){
                         let otpVal = result.otp
                         navigate('/Verificationotp', { state: { otpVal, CNIC} });
                        }

                    })
            .catch(error => console.log('error', error));

    }
    const initialValues = {

    };
    const { state } = useLocation();
    const { Email, CNIC } = state;
    const [email, setEmail] = useState();
     useEffect(() => {
    setEmail(Email)
  }, [])

  useEffect(() => {
    console.log(email, 'EMAIL')
  }, [email])


return (
    <div className="forgotPassword">
        <div className="form">
            <img src={mepcologo} alt="" className='logo' />
            <Box className='formInformation'>
                <label className='heading'>Forgot Password ?</label>
                <label className='passwordHeading'>Select which contact details should we use to reset your password.</label>
                <Box className="mainBox" onClick={handleClickLoadProfile}>
                    <Grid container item spacing={2} >
                        <Grid item lg={4}><img src={emailicon} alt="" style={{ width: " 35%", height: "75%", marginLeft: '60%', }} /></Grid>
                        <Grid item lg={8} style={{ marginTop: '-3%' }}>
                            <Grid item lg={12}><p style={{ color: "black", fontSize: '12px', width: '25%' }}>via email</p></Grid>
                            <Grid item lg={12}><p style={{ color: "black", fontSize: '12px', width: '30%', marginTop: '-5%' }}>{Email}</p></Grid>
                        </Grid>
                    </Grid>
                </Box>

                <Box className="mainBox" onClick={handleClickLoadProfile}>
                    <Grid container item spacing={2} >
                        <Grid item lg={4}><img src={phone} alt="" style={{ width: " 25%", height: "75%", marginLeft: '60%', }} /></Grid>
                        <Grid item lg={8} style={{ marginTop: '-3%' }}>
                            <Grid item lg={12}><p style={{ color: "black", fontSize: '12px', width: '20%' }}>via sms</p></Grid>
                            <Grid item lg={12}><p style={{ color: "black", fontSize: '12px', width: '30%', marginTop: '-4%' }}></p></Grid>
                        </Grid>
                    </Grid>
                </Box>

            </Box>
        </div>
        <ToastContainer />
    </div>
);
}