import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import meter from "../assets/smart_meter_white_icon.png";
import { Grid } from "@mui/material";
import Sidebar from "../components/sidebar";
import loadprofile from "../assets/load_profile_icon.png";
import consumption from "../assets/consumptions_icon.png";
import outage from "../assets/outage_icon.png";
import smartpayment from "../assets/smart_payment_icon.png";
import advisor from "../assets/advisor_setting_icon.png";
import {  useNavigate } from "react-router-dom";
import path from "path";



const drawerWidth = 240;



interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function SmartView(props: Props) {
  let navigate = useNavigate();
  const handleClickLoadProfile = () => {
    navigate('/LoadProfile');
    
  }
  const handleClickConsumption =()=>{
    
    navigate('/ConsumptionsHistory')}
  const handleClickOutage =()=>{
   
    navigate('/PowerOutage')
  }
  const handleClickSmartPayement =()=>{
    
    navigate('/PaymentHistory')
  }
  const handleClickAdvisor =()=>{
    
    navigate('/Threshold')
  }
    
  
  // const { window } = props;
  // const [mobileOpen, setMobileOpen] = React.useState(false);

  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };

  // const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      {/* <CssBaseline /> */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderTopRightRadius: "15px",
              backgroundColor: "#EAEFF5",
            },
          }}
          // open
        >
          <Sidebar />
        </Drawer>
      </Box>

      <Grid
        container
        item
        spacing={2}
        sx={{ marginLeft: "6%", marginRight: "6%" }}
      >
        {/* <Grid item lg={6}><p style={{fontWeight:"450"}}>Welcome,</p></Grid>
        <Grid item lg={6}><p style={{fontWeight:"450",textAlign: 'right',}}>29-Dec-23</p></Grid>
        <Grid item lg={12}><p style={{fontWeight:"500", color:'blue', marginTop:"-3%"}}>Ejaz Hussain</p></Grid> */}
        <Grid
          item
          lg={12}
          sx={{
            backgroundColor: "#114D9C",
            marginTop: "3%",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between",
            padding: "18px",
          }}
        >
          <Box>
            <p style={{ color: "white", fontWeight: "600" }}>Ejaz Hussain</p>
            <p style={{ marginTop: "-10%", color: "white" }}>
              Ref: 27151740365027
            </p>
            <p style={{ marginTop: "-10%", color: "white" }}>
              Gulgasht Colony, Multan
            </p>
          </Box>
          <Box style={{ width: "10%" }}>
            <img
              src={meter}
              alt=""
              style={{ width: " 60%", marginLeft: "15%" }}
            />
            <p
              style={{
                marginTop: "-1%",
                color: "white",
                fontSize: "11px",
                marginLeft: "10%",
              }}
            >
              Smart / Three Phase
            </p>
          </Box>
        </Grid>

        <Grid
          item
          lg={12}
          sx={{
            marginTop: "1%",
            borderRadius: "10px",
            border: "3px solid #EAEFF5",
            padding: "1px",
            display:'flex',
            cursor:'pointer'
          }}
          onClick={handleClickLoadProfile}
        >
          <Box sx={{ flexDirection: "row", display: "flex" }}>
            <img
              src={loadprofile}
              alt="/"
              style={{
                width: "12%",
                height: "40%",
                marginLeft: "3%",
                marginRight: "1%",
                marginTop:'2%'
              }}
              
            />

            <Box sx={{ flexDirection: "row",width:"30%"}}>
              <p style={{ fontWeight: "600" ,marginTop:"27%",marginLeft:'13%'}}>Load Profile</p>
            </Box>
            <Box sx={{width:"100%"}}>
              <p style={{ marginLeft: "22%" ,width:"150%",marginTop:'8%'}}>
               Check your load,current and voltage profile for last 5 days.
              </p>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          lg={12}
          sx={{
            border: "3px solid #EAEFF5",
            marginTop: "1%",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between",
            padding: "1px",
            cursor:'pointer'
  
          }}
          onClick={handleClickConsumption}
        >
          <Box sx={{ flexDirection: "row", display: "flex" }}>
            <img
              src={consumption}
              alt="/"
              style={{
                width: "10%",
                height: "50%",
                marginTop:"1%",
                marginLeft: "4%",
                marginRight: "2%",}}
            />

            <Box>
              <p style={{ fontWeight: "600" ,marginTop:'15%'}}>Consumptions</p>
            </Box>
            <Box sx={{width:"100%"}}>
              <p style={{ marginLeft: "15%",width:"150%"}}>
               Check daily consumption for 7 days & monthly consumption for 1 year.
              </p>
            </Box>
          </Box>
        </Grid>
        {/* <Grid
          item
          lg={12}
          sx={{
            border: "3px solid #EAEFF5",
            marginTop: "1%",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between",
            // padding: "1px",
            cursor:'pointer'
          }}
          onClick={handleClickSmartPayement}
        >
          <Box sx={{ flexDirection: "row", display: "flex" ,backgroundColor:'red'}}>
            <img
              src={smartpayment}
              alt="/"
              style={{
                width: "20%",
                height: "40%",
                marginTop:"1%",
                marginLeft: "6%",
                marginRight: "5%",
                backgroundColor:'green'
              }}
            />

            <Box sx={{width:"80%"}} >
              <p style={{ fontWeight: "600" ,marginTop:'12%'}}>Smart Payments</p>
            </Box>
            <Box sx={{width:"100%"}}>
              <p style={{ marginLeft: "11%" ,width:"150%"}}>
              Pay smartly as per your convenience.
              </p>
            </Box>
          </Box>
        </Grid> */}

<Grid
          item
          lg={12}
          sx={{
            border: "3px solid #EAEFF5",
            marginTop: "1%",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between",
            padding: "1px",
            cursor:'pointer'
          }}
          onClick={handleClickSmartPayement}
        >
          <Box sx={{ flexDirection: "row", display: "flex"  }}>
            <img
              src={smartpayment}
              alt="/"
              style={{
                width: "15%",
                height: "50%",
                marginTop:"2%",
                marginLeft: "6%",
                marginRight: "2%",
               
              }}
            />

            <Box sx={{ width:'200%',flexDirection:'row',display:'flex'}}>
              <p style={{ fontWeight: "600" ,marginTop:'12%',marginLeft:'6%' }}>Smart Payments</p>
              
            </Box>
            <Box sx={{width:"180%"}}>
            <p style={{ marginLeft: "1%",width:"180%",marginTop:"12%" }}>Pay smartly as per your convenience.</p>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          lg={12}
          sx={{
            border: "3px solid #EAEFF5",
            marginTop: "1%",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between",
            padding: "1px",
            cursor:'pointer'
          }}
          onClick={handleClickOutage}
        >
          <Box sx={{ flexDirection: "row", display: "flex" }}>
            <img
              src={outage}
              alt="/"
              style={{
                width: "13%",
                height: "50%",
                marginTop:"1%",
                marginLeft: "6%",
                marginRight: "2%"
              }}
            />

            <Box sx={{flexDirection:'row',width:'30%'}}>
              <p style={{ fontWeight: "600" ,marginTop:'20%' }}>Power Outage</p>
            </Box>
            <Box sx={{width:"100%"}}>
              <p style={{ marginLeft: "13%",width:"150%",marginTop:"6%" }}>
              Check your actual and planned Load Shedding for 24 hours.
               
              </p>
            </Box>
          </Box>
        </Grid>
        
        <Grid
          item
          lg={12}
          sx={{
            border: "3px solid #EAEFF5",
            marginTop: "1%",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between",
            padding: "1px",
            cursor:'pointer'
          }}
          onClick={handleClickAdvisor}
        >
          <Box sx={{ flexDirection: "row", display: "flex" }}>
            <img
              src={advisor}
              alt="/"
              style={{
                width: "15%",
                height: "45%",
                marginTop:"1%",
                marginLeft: "5%",
                marginRight: "2%",
              }}
            />

            <Box sx={{ flexDirection: "row",width:"70%"}}>
              <p style={{ fontWeight: "600",width:"100%",marginTop:"10%",marginLeft:'10%' }}>Energy Advisor</p>
            </Box>
            <Box sx={{width:"100%",flexDirection:"row"}}>
              <p style={{ marginLeft: "6%",width:"150%" ,marginTop:"7%"}}>
              Manage your consumption by setting target.
              </p>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
