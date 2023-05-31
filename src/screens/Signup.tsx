import React from 'react';
import mepcoLogo from '../assets/mepco_logo.png'
import emailicon from '../assets/email_icon.png'
import passwordicon from '../assets/password_icon.png'
import cnicicon from '../assets/cnic_icon.png'
import callicon from '../assets/call_icon.png'
import usericon from '../assets/user_icon.png'
import usernameicon from '../assets/username_icon.png'
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { Typography } from '@mui/material';
import '../styles/Signup.scss'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import { signUpSchema } from '../schemas/signup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  let navigate = useNavigate();
  const Continue = () => {
    // let path = `/Verification`;
    // navigate(path)
    handleSubmit()

  }
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const initialValues = {

    name: "",
    email: "",
    cnic: "",
    phoneNo: "",
    userId: "",
    password: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, resetForm) => {
        console.log("inside onsubmit")
        console.log(values.name)
        console.log(values.email)
        console.log(values.cnic)
        console.log(values.phoneNo)
        console.log(values.password)

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "name": values.name,
          "email": values.email,
          "contactNo": values.phoneNo,
          "cnic": values.cnic,
          "userId": values.userId,
          "password": values.password,
          "status": "1"
        });
        console.log(raw, "user object in sign up")
        var requestOptions: any = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };


        fetch("http://117.20.28.178:8039/appUser/signUp", requestOptions)
          .then(response => response.json())
          .then(result => {
            if (result.status === '200') {
              console.log(result.otp, '-----res')
              let otpVal = result.otp
              navigate('/Verification', { state: { otpVal, raw } });
            }

            else {
              toast.error(result.message, { position: toast.POSITION.TOP_RIGHT })
              // localStorage.setItem('user', 'test')

              // window.localStorage.setItem('user-name', JSON.stringify(result.name))
              // window.localStorage.setItem('user-phone', JSON.stringify(result.phone))
              // window.localStorage.setItem('user-email', JSON.stringify(result.email))
              // window.localStorage.setItem('user-cnic', JSON.stringify(result.cnic))
              //navigate('/Verification', { state: { otpVal, raw } });
            }

          })
      },
    });

  return (
    <div className="Signup">
      <div className="SignupForm">
        <img src={mepcoLogo} alt="" className='logo' />
        <Typography variant='h6' className='signupLabel'>Sign up</Typography>
        <Box className='formInformation'>
          <div className='mainContainer'>
            <Box className='fields'>
              <>
                <div className="imageLabel" >
                  <img className="icon" src={usericon} alt="left label icon" />
                  <label className="label" >Name</label>
                </div>
                <TextField
                  margin="normal"
                  className='textfield'
                  required
                  fullWidth
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="name"
                  name='name'
                  label=""
                  autoComplete=""
                  size='small' />
                <Box sx={{ color: 'red', textAlign: 'left', fontSize: 'small' }}>
                  {errors.name && touched.name ? errors.name : null}
                </Box></>
              <>
                <div className="imageLabel" >
                  <img className="icon" src={emailicon} alt="left label icon" />
                  <label className="label" >Email</label>
                </div>
                <TextField
                  margin="normal"
                  className='textfield'
                  required
                  fullWidth
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="email"
                  name='email'
                  label=""
                  autoComplete=""
                  size='small' />
                <Box sx={{ color: 'red', textAlign: 'left', fontSize: 'small' }}>
                  {errors.email && touched.email ? errors.email : null}
                </Box>
                </>
              <>
                <div className="imageLabel" >
                  <img className="icon" src={cnicicon} alt="left label icon" />
                  <label className="label" >CNIC No.</label>
                </div>
                <TextField
                  margin="normal"
                  className='textfield'
                  required
                  fullWidth
                  value={values.cnic}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  inputProps={{ maxLength: 13 }}
                  id="cnic"
                  name='cnic'
                  label=""
                  autoComplete=""
                  size='small'
                   />
                <Box sx={{ color: 'red', textAlign: 'left', fontSize: 'small' }}>
                  {errors.cnic && touched.cnic ? errors.cnic : null}
                </Box></>
              <>
                <div className="imageLabel" >
                  <img className="icon" src={callicon} alt="left label icon" />
                  <label className="label" >Phone No.</label>
                </div>
                <TextField
                  margin="normal"
                  className='textfield'
                  required
                  fullWidth
                  inputProps={{maxLength:11}}
                  value={values.phoneNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="phonrNo"
                  name='phoneNo'
                  label=""
                  autoComplete=""
                  size='small' />
                <Box sx={{ color: 'red', textAlign: 'left', fontSize: 'small' }}>
                  {errors.phoneNo && touched.phoneNo ? errors.phoneNo : null}
                </Box>
                </>
              <>
                <div className="imageLabel" >
                  <img className="icon" src={usernameicon} alt="left label icon" />
                  <label className="label" >User Id</label>
                </div>
                <TextField
                  margin="normal"
                  className='textfield'
                  required
                  fullWidth
                  inputProps={{maxLength:14}}
                  value={values.userId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="userId"
                  name="userId"
                  label=""
                  autoComplete=""
                  size='small' />
                <Box sx={{ color: 'red', textAlign: 'left', fontSize: 'small' }}>
                  {errors.userId && touched.userId ? errors.userId : null}
                </Box></>
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
                  inputProps={{maxLength:8}}
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
            </Box>
          </div>
          <div className='heading' >
            <label className='label'>By Continuing, you agree to our</label>
            <label className='blueLabel'>Term of Services </label>
            <label className='label'>and</label>
            <label className='blueLabel'>Privacy Policy</label>
          </div>
          <Button
            fullWidth
            variant="contained"
            className='button'
            onClick={Continue}
            sx={{
              mt: 1, backgroundColor: '#3760E7', fontSize: 'small', textTransform: 'capitalize',
              height: 32
            }}
          >Continue
          </Button>
          <div className="signIn">
            <label className='label'>Already have an account?</label>
            <Link to="/Login" className='labelSignin'>Sign in</Link>
          </div>
        </Box>
      </div>
      <ToastContainer />
    </div>
  );
}
