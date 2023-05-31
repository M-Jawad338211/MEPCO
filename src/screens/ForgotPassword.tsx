import React from 'react';
import { useNavigate } from 'react-router-dom';
import mepcologo from "../assets/mepco_logo.png";
import cnicicon from "../assets/cnic_icon.png";
import { Box, Button, TextField } from '@mui/material';
import '../styles/ForgotPassword.scss'
import { useFormik } from 'formik';
import { forgotpasswordSchema } from '../schemas/forgotpassword';
import { ToastContainer, toast } from 'react-toastify';
export default function ForgotPassword() {
  let navigate = useNavigate();
  const Submit = () => {
    // let path = `/Verification`;
    // navigate(path)
    handleSubmit()
  }
  const initialValues = {
    cnic: "",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: forgotpasswordSchema,
      onSubmit: (values, resetForm) => {
        console.log(values.cnic)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let CNIC = values.cnic
      
        var raw = JSON.stringify({
          "cnic": values.cnic
        });

        var requestOptions: any = {
          method: 'POST',                                   
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("http://117.20.28.178:8039/appUser/forgotPasswordInitiation", requestOptions)
          .then(response => response.json())
          .then(result => {
            if (result.status === '200') {
              let Email = result.data[0].email;
              navigate('/ForgotPasswordotp', { state: { Email,  CNIC} });
              // let userEmail = result.data[0].email;                              

              // var myHeadersOTP = new Headers();
              // myHeadersOTP.append("Content-Type", "application/json");
              // var rawOTP = JSON.stringify({
              //   "email": userEmail,
              //   "contactNo": ""
              // });

              // var requestOptions: any = {
              //   method: 'POST',
              //   headers: myHeadersOTP,
              //   body: rawOTP,
              //   redirect: 'follow',
              // };
              // fetch("http://117.20.28.178:8039/appUser/forgotPasswordOTP", requestOptions)
              //   .then(response => response.json())
              //   .then(result => {
              //     if (result.status === '200') {
              //       console.log(result, '-----res')
              //       let otpVal = result.otp
              //       navigate('/ForgotPasswordotp', { state: { otpVal,  CNIC} });
              //     }
              //     else {
              //       toast.error(result.message, { position: toast.POSITION.TOP_RIGHT })
              //     }

              //   }).catch()
            }
            else {
              toast.error(result.message, { position: toast.POSITION.TOP_RIGHT })
            }
          })
        // .catch(error => console.log('error', error));
      },
    });
  return (
    <div className="forgotPassword">
      <div className="form">
        <img src={mepcologo} alt="" className='logo' />
        <Box className='formInformation'>
          <label className='heading'>Forgot Password ?</label>
          <label className='enterCnicHeading'>Enter your CNIC. number associated with your account.</label>
          <label className='statement'>An OTP (one time password) will be sent to your registered phone number or email to reset your passowrd.</label>
          <>
            <div className="imageLabel" >
              <img className="icon" src={cnicicon} alt="left label icon" />
              <label className="label" >CNIC. No.</label>
            </div>
            <TextField
              margin="normal"
              className='textfield'
              required
              fullWidth
              value={values.cnic}
              onChange={handleChange}
              onBlur={handleBlur}
              id="cnic"
              name='cnic'
              label=""
              autoComplete=""
              size='small' />
            <Box sx={{ color: 'red', textAlign: 'left', fontSize: 'small' }}>
              {errors.cnic && touched.cnic ? errors.cnic : null}
            </Box>
          </>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className='button'
            onClick={Submit}
            sx={{
              mt: 1, backgroundColor: '#3760E7', fontSize: 'small', textTransform: 'capitalize',
              height: 32
            }}
          >Submit
          </Button>
        </Box>
      </div>
      <ToastContainer />
    </div>
  );
}