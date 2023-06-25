
import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import meter from '../assets/smart_meter_white_icon.png';
import pen from '../assets/editicon.png';
import { Button, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import Sidebar from '../components/sidebar';
import '../styles/cnicupdation.scss';
import { billingDetails } from '../network/BillingApi';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import { cnicUpdationSchema } from '../schemas/cnicUpdation';



// unitfactor.org
// instagram.com/unitfactor_org
// jawad
// info@unitfactor.org

const drawerWidth = 240;

const CnicUpdation: React.FC = () => {
  const [billingData, setBillingData] = useState();
  const [name, setName] = useState('')
  const [ownerCnic, setOwnerCnic] = useState('')
  const [ownerPhone, setOwnerPhone] = useState('')
  const [address, setaddress] = useState('')
  const [refernceNumber, setReferenceNumber] = useState('')
  const [meterCatagory, setMeterCatagory] = useState('')
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [textValue, setTextValue] = useState("");
  const inputRef = useRef(null);

  // const [occupName, setOccupName] = useState('')
  // const [occupPhone, setOccupPhone] = useState('')
  // const [occupCnic, setOccupCnic] = useState('')

  const handleTextChange = (event: any) => {
    setTextValue(event.target.value);
  }
  // const ImageClick = () => {
  //   inputRef.current?.focus();
  //   setTextFieldClassName("input-border-red");
  // };
  // const handleImageClick = () => {
  //   const textField = document.getElementById('myTextField');
  //   if (textField !== null) {
  //     textField.focus();
  //     isButtonClicked(true);
  //   }
  // }  
  const handleImageClick = () => {
    setIsButtonClicked(true);
  }
  const handleInputFocus = () => {
    setIsInputFocused(true);
  };
  const handleInputBlur = () => {
    setIsInputFocused(false);
  };
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };


  useEffect(() => {
    console.log(refernceNumber, '-----refNo')
    paymentConsumptions()
    // cnicUpdation()
    // handleSubmit()
  }, [refernceNumber])

  const paymentConsumptions = async () => {
    var requestOptions: any = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://bill.pitc.com.pk/bill/info/27151710924700", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === true) {
          console.log(result, '-----res')
          setReferenceNumber(result.basicInfo.refNo)
          setMeterCatagory(result.basicInfo.cons_type)
          setName(result.basicInfo.consumerName)
          setaddress(result.basicInfo.consumerAddress1)
          setOwnerCnic(result.basicInfo.occupant_cnic)
          setOwnerPhone(result.basicInfo.consumerContactNo)
        }
      })
  }
  const CnicUpdation = () => {
    handleSubmit()
  }
  const initialValues = {
    Name: "",
    cnic: "",
    phone: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: cnicUpdationSchema,
      onSubmit: (values, resetForm) => {
        console.log("inside onsubmit")
        console.log(values.Name)
        console.log(values.cnic)
        console.log(values.phone)

        var formdata = new FormData();
        formdata.append("ref_no", refernceNumber);
        formdata.append("owner_name", name);
        formdata.append("owner_cnic", ownerCnic);
        formdata.append("owner_mobile", ownerPhone);
        formdata.append("occup_name", values.Name);
        formdata.append("occup_cnic", values.cnic);
        formdata.append("occup_mobile", values.phone);

        var requestOptions: any = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };

        fetch("http://mnr.pitc.com.pk/api/save_cnicapi.php", requestOptions)
          .then(response => response.json())
          .then(result => {
            if (result.status == '1') {
              console.log(result)
              toast.success(result.msg, { position: toast.POSITION.TOP_RIGHT })
            }
            else {
              toast.error(result.message, { position: toast.POSITION.TOP_RIGHT })
            }
          })

      }

    });
  //    const cnicUpdation = async () =>{
  //     var formdata = new FormData();
  // formdata.append("ref_no", refernceNumber);
  // formdata.append("owner_name", name);
  // formdata.append("owner_cnic", cnic);
  // formdata.append("owner_mobile", phone);
  // formdata.append("occup_name", occupName);
  // formdata.append("occup_cnic", occupCnic);
  // formdata.append("occup_mobile", occupPhone);

  // var requestOptions : any= {
  //   method: 'POST',
  //   body: formdata,
  //   redirect: 'follow'
  // };

  // fetch("http://mnr.pitc.com.pk/api/save_cnicapi.php", requestOptions)
  //   .then(response => response.json())
  //   .then(result => {
  //     if(result.status == 1){
  //       console.log(result)
  //       toast(result.msg, { position: toast.POSITION.TOP_RIGHT })
  //     }
  //   })
  //    }

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

        <Grid item lg={12}><p style={{ fontWeight: "500", color: 'black', marginTop: "3%", textAlign: 'center' }}>Cnic Updation</p></Grid>
        <Grid item lg={12} style={{ backgroundColor: '#114D9C', borderRadius: "6px", display: 'flex', justifyContent: 'space-between', padding: '12px', marginTop: "1%" }}>
          <Box>
            <p style={{ color: "white" }}>{name}</p>
            <p style={{ marginTop: "-10%", color: "white" }}>Ref: {refernceNumber}</p>
            <p style={{ marginTop: "-10%", color: "white" }}>{address}</p>
          </Box>
          <Box style={{ width: " 12%" }}>
            <img src={meter} alt="" style={{ width: " 50%" }} />
            <p style={{ marginTop: "5%", color: "white", fontSize: "10px" }}>{meterCatagory}</p>
          </Box>
        </Grid>

        <Box sx={{ marginTop: "1%", width: "100%" }}>
          <Typography className='InputAboveTxt' sx={{ fontSize: 15, fontWeight: 'bold', marginTop: "1.5%", marginLeft: 1, color: '#114D9C' }}>
            Owner's Particulars
          </Typography>
          <Typography className='InputAboveTxt' sx={{ fontSize: 13, marginTop: "0.5%", marginLeft: 1, color: 'black' }}>
            Occupant Name
          </Typography>
          <TextField
            margin="normal"
            className='textfield'
            sx={{ marginTop: '-0.2%', }}
            required
            fullWidth
            // value={values.email}
            // onChange={handleChange}
            // onBlur={handleBlur}
            value={name}
            // id="email"
            // name="email"
            // label=""
            autoComplete=""
            size='small' />
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: 'space-between' }}>
            <Box sx={{ width: "49%" }}>
              <Typography className='InputAboveTxt' sx={{ fontSize: 13, marginTop: "0.5%", marginLeft: 1, color: 'black' }}>
                CNIC No.
              </Typography>
              <TextField
                margin="normal"
                className='textfield'
                sx={{ marginTop: '-0.2%', }}
                required
                fullWidth
                // value={values.email}
                // onChange={handleChange}
                // onBlur={handleBlur}
                value={ownerCnic}
                // id="email"
                // name="email"
                // label=""
                autoComplete=""
                size='small' />
            </Box>
            <Box sx={{ width: "49%" }}>
              <Typography className='InputAboveTxt' sx={{ fontSize: 13, marginTop: "0.5%", marginLeft: 1, color: 'black' }}>
                Mobile No.
              </Typography>
              <TextField
                margin="normal"
                className='textfield'
                sx={{ marginTop: '-0.2%' }}
                required
                fullWidth
                // value={values.email}
                // onChange={handleChange}
                // onBlur={handleBlur}
                value={ownerPhone}
                // id="email"
                // name="email"
                // label=""
                autoComplete=""
                size='small' />
            </Box>
          </Box>

        </Box>

        <Box sx={{ marginTop: "1%", width: "100%" }}>
          <Typography className='InputAboveTxt' sx={{ fontSize: 15, fontWeight: 'bold', marginTop: "0.8%", marginLeft: 1, color: '#114D9C', }}>
            Occupant's Particulars
          </Typography>
          <>
          <Typography className='InputAboveTxt' sx={{ fontSize: 13, marginTop: "0.5%", marginLeft: 1, color: 'black' }}>
            Name
          </Typography>
          <TextField
            margin="normal"
            className='textfield'
            sx={{ marginTop: '-0.2%', backgroundColor: "#EAEFF5" }}
            required
            fullWidth
            // value={textValue} onChange={handleTextChange}
            value={values.Name}
            onChange={handleChange}
            onBlur={handleBlur}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" className='input-adornments'>
                  <IconButton
                    onClick={handleImageClick}
                    // onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    <img src={pen} alt="" style={{ width: "50%", marginRight: '5%' }} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            id="Name"
            name="Name"
            label=""
            autoComplete=""
            size='small' />
          <Box sx={{ color: 'red', textAlign: 'left', fontSize: 'small' }}>
            {errors.Name && touched.Name ? errors.Name : null}
          </Box>
          </>
          <>
          <Typography className='InputAboveTxt' sx={{ fontSize: 13, marginTop: "0.5%", marginLeft: 1, color: 'black' }}>
            CNIC No.
          </Typography>
          <TextField
            margin="normal"
            ref={inputRef}
            // className={`${isButtonClicked && isInputFocused ? "input-focus" : ""}`}
            sx={{ marginTop: '-0.2%', backgroundColor: "#EAEFF5", }}
            required
            fullWidth
            inputProps={{maxLength:13}}
            // value={textValue} onChange={handleTextChange}
            onFocus={handleInputFocus}
            // onBlur={handleInputBlur}
            value={values.cnic}
            onChange={handleChange}
            onBlur={handleBlur}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" className='input-adornments'>
                  <IconButton
                     onClick={handleImageClick}
                    // onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    <img src={pen} alt="" style={{ width: "50%", marginRight: '10%' }} />
                  </IconButton>
                </InputAdornment>
              )
            }}
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
          <>
          <Typography className='InputAboveTxt' sx={{ fontSize: 13, marginTop: "0.5%", marginLeft: 1, color: 'black' }}>
            Mobile No.
          </Typography>
          <TextField
            margin="normal"
            className='textfield'
            sx={{ marginTop: '-0.2%', backgroundColor: "#EAEFF5", borderColor: 'blue' }}
            required
            fullWidth
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            inputProps={{maxLength:11}}
            // value={textValue} onChange={handleTextChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" className='input-adornments'>
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleImageClick}
                    edge="end"
                  >
                    <img src={pen} alt="" style={{ width: "50%", marginRight: '5%' }} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            id="phone"
            name="phone"
            label=""
            autoComplete=""
            size='small' />
          <Box sx={{ color: 'red', textAlign: 'left', fontSize: 'small' }}>
            {errors.phone && touched.phone ? errors.phone : null}
          </Box>
          </>
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          // onClick={() => Procced}
          // onClick={LoginHandler}
          onClick={CnicUpdation}
          sx={{
            mt: 2, backgroundColor: '#114D9C', fontSize: 'small', textTransform: 'capitalize',
            height: 32, width: '30%', marginLeft: '30%', marginBottom: '2%', borderRadius: 20
          }}
        >
          Procced
        </Button>

      </Grid>
      <ToastContainer />
    </Box>
  );
}
export default CnicUpdation
