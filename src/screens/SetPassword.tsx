import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import mepcologo from "../assets/mepco_logo.png";
import passwordicon from '../assets/password_icon.png'
import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material';
import '../styles/SetPassword.scss'
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { resetpasswordSchema } from '../schemas/resetpassword';
export default function SetPassword() {

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  let navigate = useNavigate();
  const { state } = useLocation();
  const { CNIC } = state;
  const [cnic, setCNIC] = useState();

  const Submit = () => {
    handleSubmit()
  }
  useEffect(() => {
    setCNIC(CNIC)
  }, [])

  useEffect(() => {
    console.log(cnic, 'CNIC')
  }, [cnic])

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: resetpasswordSchema,
      onSubmit: (values, resetForm) => {
        // console.log(values.password)

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        var raw = JSON.stringify({
          "cnic": cnic,
          "password": values.password
        });

        var requestOptions: any = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("http://117.20.28.178:8039/appUser/setNewPassword", requestOptions)
          .then(response => response.json())
          .then(result => {
            if (result.status === '200') {
              // console.log(result)
              toast.success(result.message, { position: toast.POSITION.TOP_RIGHT })
              navigate('/Home');
            } else {
              toast.error(result.message, { position: toast.POSITION.TOP_RIGHT })
            }
          })
        .catch(error => console.log('error', error));
      },
    });

  return (
    <div className="forgotPassword">
      <div className="form">
        <img src={mepcologo} alt="" className='logo' />
        <Box className='formInformation'>
          <label className='heading'>Reset Password </label>
          {/* <label className='enterCnicHeading'>Enter your CNIC. number associated with your account.</label>
          <label className='statement'>An OTP (one time password) will be sent to your registered phone number or email to reset your passowrd.</label> */}
          <>
            <div className="imageLabel" >
              <img className="icon" src={passwordicon} alt="left label icon" />
              <label className="label" >Password</label>
            </div>
            <TextField
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              className='textfield'
              required
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" className='input-adornments'>
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              id="password"
              name='password'
              label=""
              autoComplete=""

              size='small'
            />
            <Box sx={{ color: 'red', textAlign: 'left', fontSize: 'small' }}>
              {errors.password && touched.password ? errors.password : null}
            </Box>
          </>

          <>
            <div className="imageLabel" >
              <img className="icon" src={passwordicon} alt="left label icon" />
              <label className="label" >Confirm Password</label>
            </div>
            <TextField
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              className='textfield'
              required
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" className='input-adornments'>
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              id="confirmPassword"
              name='confirmPassword'
              label=""
              autoComplete=""

              size='small'
            />
            <Box sx={{ color: 'red', textAlign: 'left', fontSize: 'small' }}>
              {errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : null}
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
          >Confirm
          </Button>
        </Box>
      </div>
      <ToastContainer />
    </div>
  );
}