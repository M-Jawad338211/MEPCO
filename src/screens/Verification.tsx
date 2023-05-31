import { Box } from '@mui/material';
import { SetStateAction, useEffect, useState } from 'react';
import mepcologo from "../assets/mepco_logo.png";
import Otpinput from '../components/otpinput';
import '../styles/Verification.scss'
import { MuiOtpInput } from 'mui-one-time-password-input';
import { useFormik } from 'formik';
import { signUpSchema } from '../schemas/signup';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Verification() {

  const { state } = useLocation();
  const { otpVal, raw } = state;
  const [user, setUser] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    setUser(raw)
  }, [])

  useEffect(() => {
    console.log(user, 'User details')
  }, [user])
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
      // Code to navigate to the next screen goes here
      // console.log("OTP verified. Moving to next screen...");
      if (otp === otpVal) {
        var myHeaders = new Headers();
        let userObject = JSON.parse(raw)
        userObject.status = "2"
        let raw1 = JSON.stringify(userObject)
        console.log(raw1, "user object in verification")
        myHeaders.append("Content-Type", "application/json");
        var requestOptions: any = {
          method: 'POST',
          headers: myHeaders,
          body: raw1,
          redirect: 'follow',
        };
        fetch("http://117.20.28.178:8039/appUser/signUp", requestOptions)
          .then(response => response.json())
          .then(result => {
            if (result.status === '200') {
              console.log(result, '-----res')
              window.localStorage.setItem('user-name', userObject.name)
              window.localStorage.setItem('user-phone', userObject.contactNo)
              window.localStorage.setItem('user-email', userObject.email)
              window.localStorage.setItem('user-cnic', userObject.cnic)
              window.localStorage.setItem('user-id', userObject.userId)
              navigate('/Home');
            }
            else {
              toast.error(result.message, {position: toast.POSITION.TOP_RIGHT})
            }

          }).catch()
      }
    }
  }, [otp]);

  const otphandle = (newvalue: any) => {
    if (newvalue.length <= 4) {
      // Update the OTP state variable
      setotp(newvalue);
    }

    // if (otp === otpVal) {
    //   navigate('/Home', { state: raw })

    // }
    // else {
    //   toast.error("Invalid OTP")
    // }
  }
  // handleSubmit()

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