import { Box } from '@mui/material';
import { SetStateAction, useEffect, useState } from 'react';
import mepcologo from "../assets/mepco_logo.png";
import Otpinput from '../components/otpinput';
import '../styles/Verification.scss'
import { MuiOtpInput } from 'mui-one-time-password-input';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Verificationotp() {

  const { state } = useLocation();
  const { otpVal, CNIC } = state;
  // const [cnic, setCNIC] = useState();
  let navigate = useNavigate();

  useEffect(() => {
    // setCNIC(CNIC)
    console.log(otpVal, "otpval")
  }, [])

  // useEffect(() => {
  //   console.log(cnic, 'CNIC')
  // }, [cnic])
  // useEffect(() => {
  //   // If the OTP is complete (i.e., when the user has entered all four digits), navigate to the next screen
  //   if (otp.length === 4) {
  //     // Code to navigate to the next screen goes here
  //     console.log("OTP verified. Moving to next screen...");
  //   }
  // }, [otp]);

  const [otp, setotp] = useState('')


  useEffect(() => {
    // If the OTP is complete (i.e., when the user has entered all four digits), navigate to the next screen
    if (otp.length === 4) {
      console.log(otp, "OTP value")
      // Code to navigate to the next screen goes here
      // console.log("OTP verified. Moving to next screen...");
      if (otp === otpVal) {
        navigate('/SetPassword', { state: { CNIC } }
        );
      }
    }
  }, [otp]);

  const otphandle = (newvalue: any) => {
    if (newvalue.length <= 4) {
      // Update the OTP state variable
      setotp(newvalue);
    }


  }


  return (
    <div className="verification">
      <div className="verifyForm">
        <img src={mepcologo} alt="" className='logo' />
        <Box className='formInformation'>
          <label className='verifyHeading'>Verification</label>

          <div className='heading'>
            <label className='enterOtpHeading'>Enter OTP sent to registered email and phone No. </label>
          </div>
          {/* <Otpinput
            value={otp} valueLength={4} onChange={onChange}
          /> */}
          <Box className='otpbox'>
            <MuiOtpInput length={4} className="otp" value={otp} onChange={otphandle} />
          </Box>

          <label className='resendOtp'>Resend OTP </label>
        </Box>
      </div>
      <ToastContainer />
    </div>
  );
}