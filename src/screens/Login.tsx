import { relative } from "path";
import mepcologo from "../assets/mepco_logo.png";
import emailicon from "../assets/email_icon.png";
import passwordicon from "../assets/password_icon.png";
import cnicicon from "../assets/cnic_icon.png";
import callicon from "../assets/call_icon.png";
import { Checkbox, StepIconClassKey, Typography } from '@mui/material';
import '../styles/Login.scss';
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Box, Button, Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import { loginSchema } from '../schemas/login'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ref, object, string, boolean } from 'yup';

export default function Login() {
  const [emailLabel, setEmailLabel] = useState(true);
  const [cnicLabel, setCnicLabel] = useState(false);
  const [phonenolabel, setPhonenoLabel] = useState(false);
  const [email, setEmail] = useState("");
  const [cnic, setCnic] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [label, setLabel] = useState("Email/Username");
  const [isEmailActive, setIsEmailActive] = useState(true);
  const [isCnicActive, setIsCnicActive] = useState(false);
  const [isPhoneActive, setIsPhoneActive] = useState(false);
  const [isPrivateKey, setIsPrivateKey] = useState('')
  // const [test, setTest] = useState<string | null>(null);




  let navigate = useNavigate();
  useEffect(() => {
    privateKey()
    // cfpSignin()
  }, [])
  const LoginHandler = () => {
    // window.localStorage.setItem('Name', "Ammad")
    // let path = `/Home`;
    // navigate(path)
    handleSubmit()

  }

  let schema = object({
    is_email: boolean(),
    email: string().when('is_email', {
      is: true,
      then: (schema) => schema.email("Invalid Email!").required("Email Cannot be Empty"),
      otherwise: (schema) => schema.email("Invalid Email!").optional(),
    }),

    is_cnic: boolean(),
    cnic: string().when('is_cnic', {
      is: true,
      then: (schema) => schema.min(13, "CNIC can only be 13 digits!").max(13, "CNIC can only be 13 digits!").required("CNIC Cannot be Empty"),
      otherwise: (schema) => schema.min(13, "CNIC can only be 13 digits!").max(13, "CNIC can only be 13 digits!").optional(),
    }),

    is_phoneNo: boolean(),
    phoneNo: string().when('is_phoneNo', {
      is: true,
      then: (schema) => schema.min(11, "Phone can only be 11 digits!").max(11, "Phone can only be 11 digits!").required("Phoneno Cannot be Empty"),
      otherwise: (schema) => schema.min(11, "Phone can only be 11 digits!").max(11, "Phone can only be 11 digits!").optional(),
    }),
    password: string().min(4, "Password should be minimum 4 digits").max(8, "Password should be maximum 8 digits").required("Password Cannot be Empty"),
  });
  const privateKey = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-type", "application/json");
    myHeaders.append("username", "admin@kbk");
    myHeaders.append("password", "admin786");
    myHeaders.append("code", "1");

    var formdata = new FormData();

    var requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://119.63.135.120:2526/api/authorization_service", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === '1') {
          console.log(result, '------ hit')
          // setIsPrivateKey(result.privatekey)
          console.log(result.privatekey, '--------key')
          localStorage.setItem('privatekey', result.privatekey)
        }
      })
    // .catch(error => console.log('error', error));
  }

  // const cfpSignin = () => {
  //   var formdata = new FormData();
  //   formdata.append("userId", "Afan");
  //   formdata.append("password", "Afan");

  //   var requestOptions: any = {
  //     method: 'POST',
  //     body: formdata,
  //     redirect: 'follow'
  //   };

  //   fetch("http://117.20.28.178:8038/customerFaciliationPortal/signIn", requestOptions)
  //     .then(response => response.json())
  //     .then(result => {
  //       if (result.status === '200') {
  //         console.log(result, '-----cfphit')
  //         console.log(result.token, '-----res')
  //         localStorage.setItem('cfptoken', result.token)
  //       }
  //     })
  //   // .catch(error => console.log('error', error));
  // }

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const initialValues = {

    email: "",
    is_email: true,
    cnic: "",
    is_cnic: false,
    phoneNo: "",
    is_phoneNo: false,
    password: "",
    // emailActive: "true"

  };


  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: schema,
      onSubmit: (values, resetForm) => {
        console.log("inside onsubmit")
        console.log(values.email)
        console.log(values.cnic)
        console.log(values.phoneNo)
        console.log(values.password)

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "emailUserId": values.email,
          "contactNo": values.phoneNo,
          "cnic": values.cnic,
          "password": values.password
        });

        var requestOptions: any = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };


        fetch("http://117.20.28.178:8039/appUser/signIn", requestOptions)
          .then(response => response.json())
          .then(result => {
            if (result.status === '200') {
              console.log(result, '-----res')
              console.log(result.token, '-----res')
              localStorage.setItem('token', result.token)

              // window.localStorage.setItem('user-name', JSON.stringify(result.name))
              // window.localStorage.setItem('user-phone', JSON.stringify(result.phone))
              // window.localStorage.setItem('user-email', JSON.stringify(result.email))
              // window.localStorage.setItem('user-cnic', JSON.stringify(result.cnic))
              navigate('/Home');
            }
            else {
              toast.error(result.message, { position: toast.POSITION.TOP_RIGHT })
            }

          })
      },
    });


  const emailHandler = () => {
    setEmailLabel(true);
    values.is_email = true;
    values.is_cnic = false;
    values.is_phoneNo = false;
    setCnicLabel(false);
    setPhonenoLabel(false);
    setIsEmailActive(true);
    setIsCnicActive(false);
    setIsPhoneActive(false);
    setLabel("Email");
  };
  const cnicHandler = () => {
    setLabel("cnic");
    setEmailLabel(false);
    values.is_email = false;
    values.is_cnic = true;
    values.is_phoneNo = false;
    setCnicLabel(true);
    setPhonenoLabel(false);
    setIsCnicActive(true);
    setIsEmailActive(false);
    setIsPhoneActive(false);
  };
  const phoneHandler = () => {
    setLabel("phone");
    setEmailLabel(false);
    values.is_email = false;
    values.is_cnic = false;
    values.is_phoneNo = true;
    setCnicLabel(false);
    setPhonenoLabel(true);
    setIsPhoneActive(true);
    setIsEmailActive(false);
    setIsCnicActive(false);
  };

  return (
    <div className="Login">
      <div className="loginForm">
        <img src={mepcologo} alt="" className='logo' />
        <Typography variant='h6' className='signinLabel'>Sign In</Typography>
        <div className="buttons">
          <div className={isEmailActive ? "emailButtonActive" : "emailButtonInAcive"}
            onClick={emailHandler} >
            <label className="labelEmail">Email / User Id</label>
          </div>
          <div className={isCnicActive ? "cnicButtonActive" : "cnicButtonInActive"}
            onClick={cnicHandler}>
            <label className="labelCnic">CNIC No.</label>
          </div>
          <div className={isPhoneActive ? "phonenoButtonActive" : "phoneButtonInActive"}
            onClick={phoneHandler} >
            <label className="labelPhone">Phone No.</label>
          </div>
        </div>

        <Box className='form'>
          {emailLabel &&
            <>
              <div className="imageLabel" >
                <img className="icon" src={emailicon} alt="left label icon" />
                <label className="label" >Email / User Id.</label>
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
                name="email"
                label=""
                autoComplete=""
                size='small' />
              <Box sx={{ color: 'red', textAlign: 'left', fontSize: 'small' }}>
                {errors.email && touched.email ? errors.email : null}
              </Box>
            </>
          }

          {cnicLabel &&
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
                name="cnic"
                label=""
                autoComplete=""
                size='small'
              />
              <Box sx={{ color: 'red', textAlign: 'left', fontSize: 'small' }}>
                {errors.cnic && touched.cnic ? errors.cnic : null}
              </Box>
            </>
          }

          {phonenolabel &&
            <><div className="imageLabel" >
              <img className="icon" src={callicon} alt="left label icon" />
              <label className="label" >Phone No.</label>
            </div>
              <TextField
                margin="normal"
                className='textfield'
                required
                fullWidth
                value={values.phoneNo}
                onChange={handleChange}
                onBlur={handleBlur}
                inputProps={{ maxLength: 11 }}
                id="phoneNo"
                name="phoneNo"
                label=""
                autoComplete=""
                size='small'
              />
              <Box sx={{ color: 'red', textAlign: 'left', fontSize: 'small' }}>
                {errors.phoneNo && touched.phoneNo ? errors.phoneNo : null}
              </Box>
            </>
          }
          <Box>
            <><div className="imageLabel" >
              <img className="icon" src={passwordicon} alt="left label icon" />
              <label className="label" >Password</label>
            </div>
              <TextField
                type={showPassword ? 'text' : 'password'}
                margin="normal"
                className='textfield'
                required
                fullWidth
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                id="password"
                name="password"
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
                label=""
                autoComplete=""
                size='small'
              />
              <Box sx={{ color: 'red', textAlign: 'left', fontSize: 'small' }}>
                {errors.password && touched.password ? errors.password : null}
              </Box>
            </>
          </Box>


          <Box className="rememberPassword">
            <Box className='text'>
              <Checkbox className="checkBox" />
              <label className="label" > Remember me</label>
            </Box>
            <Box className='forgotText'>
              <Link to="/Forgotpassword" className='forgot' >
                Forgot Password?
              </Link>
            </Box>

          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            // onClick={() => handleSubmit}
            onClick={LoginHandler}
            sx={{
              mt: 2, backgroundColor: '#3760E7', fontSize: 'small', textTransform: 'capitalize',
              height: 32
            }}
          >
            Sign in
          </Button>

          <div
            className="signUp">
            <label className="label">
              Are you a new user?
            </label>
            <Link to="/Signup" className="labelSignup"
            > Sign up</Link>
          </div>
        </Box>
      </div>
      <ToastContainer />
    </div>
  );
}