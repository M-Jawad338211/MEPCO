import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Grid } from "@mui/material";
import Sidebar from "../components/sidebar";
import loadprofile from "../assets/load_profile_icon.png";
import outage from "../assets/outage_icon.png";
import billestimator from '../assets/bill_estimator.png'
import newconnection from '../assets/new_connection_icon.png'
import changeofname from '../assets/chnge_name_load_icon.png'
import optforsmartmeter from '../assets/smart_meter_icon.png'
import disconnection from '../assets/disconnection_icon.png'
import reconnection from '../assets/Reconnection_request.png'
import temporaryconnection from '../assets/temp_connection_icon.png'
import meterreading from '../assets/reading_correction_icon.png'
import meterchange from '../assets/relocation_meter_icon.png'
import duedate from '../assets/date_extention_icon.png'
import reduceload from '../assets/reduction_load_icon.png'
import paybill from '../assets/duplicate.png'
import {  useNavigate } from "react-router-dom";




const drawerWidth = 240;



interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}
export default function Services(props: Props) {


  let navigate = useNavigate();
  const handleClickOptMeter = () => {
    navigate('/OptForMeter');
    
  }
  const handleClickComplaints = () => {
    navigate('/Complaints');
    
  }
  const handleClickPayBill = () => {
    navigate('/Paybill');
    
  }
  const handleClickNewConnection = () => {
    navigate('/NewConnection');
    
  }
  const handleClickCnicUpdation= () => {
    navigate('/CnicUpdation');
    
  }
  const handleClickChangeOfAttributes= () => {
    navigate('/ChangeOfName');
    
  }
  const handleClickMeterChange= () => {
    navigate('/MeterChange');
    
  }
  const handleClickDueDate= () => {
    navigate('/DueDate');
    
  }
  const handleClickMeterReading= () => {
    navigate('/MeterReadingCorrection');
    
  }
  const handleClickBillEstimator= () => {
    navigate('/BillEstimator');
    
  }
  
 




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
          <Grid sx={{display:'flex',flexWrap:'wrap',width:"100%",margin:"2%"}}>
          <Grid
          item
          lg={12}
          sx={{
            marginTop: "1%",
            borderRadius: "10px",
            border: "3px solid #EAEFF5",
            padding: "1px",
            cursor:'pointer',
            width:"100%"
          }}
          onClick={handleClickOptMeter}
        >
          <Box sx={{ flexDirection: "row", display: "flex" }}>
            <img
              src={disconnection}
              alt="/"
              style={{
                width: "3%",
                height: "4%",
                marginTop:"1%",
                marginLeft: "2%",
                marginRight: "2%",
              }}
              
            />

            <Box sx={{width:"15%",flexDirection:"row"}}>
              <p style={{ fontWeight: "600" ,marginTop:"10%"}}>Opt for Smart Meter</p>
            </Box>
            <Box sx={{width:"100%"}}>
              <p style={{ marginLeft: "6%" ,width:"100%"}}>
                Replace your Normal meter with the smart one to get real time consumption informtion.
              </p>
            </Box>
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
            cursor:'pointer',
            width:"100%"
          }}
          onClick={handleClickComplaints}
        >
          <Box sx={{ flexDirection: "row", display: "flex" }}>
            <img
              src={meterreading}
              alt="/"
              style={{
                width: "3%",
                height: "2%",
                marginTop:"1%",
                marginLeft: "2%",
                marginRight: "2%",
              }}
              
            />

            <Box sx={{ flexDirection: "row",width:"20%"}}>
              <p style={{ fontWeight: "600" ,marginTop:"10%"}}>Complaints</p>
            </Box>
            <Box sx={{width:"100%"}}>
              <p style={{ marginLeft: "2%" ,width:"100%",marginTop:"2%"}}>
                Submit your power complaints and suggestions 24/7 through online services.
              </p>
            </Box>
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
            cursor:'pointer',
            width:"100%"
          }}
          onClick={handleClickPayBill}
        >
          <Box sx={{ flexDirection: "row", display: "flex" }}>
            <img
              src={paybill}
              alt="/"
              style={{
                width: "3%",
                height: "2%",
                marginTop:"1%",
                marginLeft: "2%",
                marginRight: "2%",
              }}
              
            />

            <Box sx={{ flexDirection: "row",width:"20%"}}>
              <p style={{ fontWeight: "600" ,marginTop:"10%"}}>Pay Bill</p>
            </Box>
            <Box sx={{width:"100%"}}>
              <p style={{ marginLeft: "2%" ,width:"100%",marginTop:"2%"}}>
                Service to get duplicate bill.
              </p>
            </Box>
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
            cursor:'pointer',
            width:"100%"
          }}
          onClick={handleClickNewConnection}
        >
          <Box sx={{ flexDirection: "row", display: "flex" }}>
            <img
              src={newconnection}
              alt="/"
              style={{
                width: "3%",
                height: "2%",
                marginTop:"1%",
                marginLeft: "2%",
                marginRight: "2%",
                
              }}
              
            />

            <Box sx={{ flexDirection: "row",width:"15%"}} >
              <p style={{ fontWeight: "600" ,marginTop:"9%"}}>New Connection</p>
            </Box>
            <Box sx={{width:"100%"}}>
              <p style={{ marginLeft: "6%" ,width:"100%"}}>
                Paperless new connection with ease to apply for anywhere.
              </p>
            </Box>
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
            cursor:'pointer',
            width:"100%"
          }}
          onClick={handleClickCnicUpdation}
        >
          <Box sx={{ flexDirection: "row", display: "flex" }}>
            <img
              src={meterreading}
              alt="/"
              style={{
                width: "3%",
                height: "2%",
                marginTop:"1%",
                marginLeft: "2%",
                marginRight: "2%",
              }}
              
            />

            <Box sx={{ flexDirection: "row",width:"20%"}}>
              <p style={{ fontWeight: "600" ,marginTop:"8%"}}>CNIC. Updation</p>
            </Box>
            <Box sx={{width:"100%"}}>
              <p style={{ marginLeft: "2%" ,width:"100%"}}>
                Service to update the name,CNIC,phone and email residing in the property having power connection.
              </p>
            </Box>
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
            cursor:'pointer',
            width:"100%"
          }}
          onClick={handleClickChangeOfAttributes}
        >
          <Box sx={{ flexDirection: "row", display: "flex" }}>
            <img
              src={changeofname}
              alt="/"
              style={{
                width: "3%",
                height: "2%",
                marginTop:"1%",
                marginLeft: "2%",
                marginRight: "2%",
              }}
              
            />

            <Box sx={{ flexDirection: "row",width:"20%"}}>
              <p style={{ fontWeight: "600" ,marginTop:"8%"}}>Change of Attributes</p>
            </Box>
            <Box sx={{width:"100%"}}>
              <p style={{ marginLeft:"2%",width:"100%"}}>
               Change the owner name,load or tariff of any existing power connection.
              </p>
            </Box>
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
            cursor:'pointer',
            width:"100%"
          }}
          onClick={handleClickMeterChange}
        >
          <Box sx={{ flexDirection: "row", display: "flex" }}>
            <img
              src={meterchange}
              alt="/"
              style={{
                width: "3%",
                height: "2%",
                marginTop:"1%",
                marginLeft: "2%",
                marginRight: "2%",
              }}
              
            />

            <Box sx={{ flexDirection: "row",width:"20%"}}>
              <p style={{ fontWeight: "600" ,marginTop:"8%"}}>Meter Change Request</p>
            </Box>
            <Box sx={{width:"100%"}}>
              <p style={{ marginLeft: "2%" ,width:"100%"}}>
                Replace your damaged meter with a new one through meter change service.
              </p>
            </Box>
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
            cursor:'pointer',
            width:"100%"
          }}
          onClick={handleClickDueDate}
        >
          <Box sx={{ flexDirection: "row", display: "flex" }}>
            <img
              src={duedate}
              alt="/"
              style={{
                width: "3%",
                height: "2%",
                marginTop:"1%",
                marginLeft: "2%",
                marginRight: "2%",
              }}
              
            />

            <Box sx={{ flexDirection: "row",width:"20%"}}>
              <p style={{ fontWeight: "600" ,marginTop:"8%"}}>Due Date Extensions</p>
            </Box>
            <Box sx={{width:"100%"}}>
              <p style={{ marginLeft: "2%" ,width:"100%"}}>
                Extend your deadline of electricity bill payments.
              </p>
            </Box>
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
            cursor:'pointer',
            width:"100%"
          }}
          onClick={handleClickMeterReading}
        >
          <Box sx={{ flexDirection: "row", display: "flex" }}>
            <img
              src={meterreading}
              alt="/"
              style={{
                width: "3%",
                height: "2%",
                marginTop:"1%",
                marginLeft: "2%",
                marginRight: "2%",
              }}
              
            />

            <Box sx={{ flexDirection: "row",width:"20%"}}>
              <p style={{ fontWeight: "600" ,marginTop:"10%"}}>Meter Reading Correction</p>
            </Box>
            <Box sx={{width:"100%"}}>
              <p style={{ marginLeft: "2%" ,width:"100%",marginTop:"2%"}}>
                Service to submit complaint for meter correction.
              </p>
            </Box>
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
            cursor:'pointer',
            width:"100%"

          }}
          onClick={handleClickBillEstimator}
        >
          <Box sx={{ flexDirection: "row", display: "flex" }}>
            <img
              src={billestimator}
              alt="/"
              style={{
                width: "3%",
                height: "2%",
                marginLeft: "2%",
                marginRight: "2%",
                marginTop:"1%"
              }}
              
            />

            <Box sx={{ flexDirection: "row",width:"10%"}}>
              <p style={{ fontWeight: "600" ,marginTop:"18%"}}>Bill Estimator</p>
            </Box>
            <Box sx={{width:"100%"}}>
              <p style={{ marginLeft: "10%" ,width:"100%"}}>
                Develop on real business logic to give the most accurate bill estimation.
              </p>
            </Box>
          </Box>
        </Grid>
       
        {/* <Grid
          item
          lg={12}
          sx={{
            marginTop: "1%",
            borderRadius: "10px",
            border: "3px solid #EAEFF5",
            padding: "1px",
            cursor:'pointer',
            width:"100%"
          }}
        //   onClick={handleClickLoadProfile}
        >
          <Box sx={{ flexDirection: "row", display: "flex" }}>
            <img
              src={disconnection}
              alt="/"
              style={{
                width: "3%",
                height: "4%",
                marginTop:"1%",
                marginLeft: "2%",
                marginRight: "2%",
              }}
              
            />

            <Box>
              <p style={{ fontWeight: "600" ,marginTop:"13%"}}>Disconnections</p>
            </Box>
            <Box sx={{width:"100%"}}>
              <p style={{ marginLeft: "6%" ,width:"100%"}}>
                Contrary to popular belief ,Lorem Ipsum is not simply random
                text
              </p>
            </Box>
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
            cursor:'pointer',
            width:"100%"
          }}
        //   onClick={handleClickLoadProfile}
        >
          <Box sx={{ flexDirection: "row", display: "flex" }}>
            <img
              src={reconnection}
              alt="/"
              style={{
                width: "3%",
                height: "2%",
                marginTop:"1%",
                marginLeft: "2%",
                marginRight: "2%",
              }}
              
            />

            <Box>
              <p style={{ fontWeight: "600" ,marginTop:"13%"}}>Reconnections</p>
            </Box>
            <Box sx={{width:"100%"}}>
              <p style={{ marginLeft: "6%" ,width:"100%"}}>
                Contrary to popular belief ,Lorem Ipsum is not simply random
                text
              </p>
            </Box>
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
            cursor:'pointer',
            width:"100%"
          }}
        //   onClick={handleClickLoadProfile}
        >
          <Box sx={{ flexDirection: "row", display: "flex" }}>
            <img
              src={temporaryconnection}
              alt="/"
              style={{
                width: "3%",
                height: "2%",
                marginTop:"1%",
                marginLeft: "2%",
                marginRight: "2%",
              }}
              
            />

            <Box sx={{ flexDirection: "row",width:"20%"}}>
              <p style={{ fontWeight: "600" ,marginTop:"8%"}}>Temporary Connection</p>
            </Box>
            <Box sx={{width:"100%"}}>
              <p style={{ marginLeft: "3%" ,width:"100%"}}>
                Contrary to popular belief ,Lorem Ipsum is not simply random
                text
              </p>
            </Box>
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
            cursor:'pointer',width:"100%"
          }}
        //   onClick={handleClickLoadProfile}
        >
          <Box sx={{ flexDirection: "row", display: "flex" }}>
            <img
              src={loadprofile}
              alt="/"
              style={{
                width: "3%",
                height: "2%",
                marginTop:"1%",
                marginLeft: "2%",
                marginRight: "2%",
              }}
              
            />

            <Box sx={{ flexDirection: "row",width:"20%"}}>
              <p style={{ fontWeight: "600" ,marginTop:"12%"}}>Extension of Load</p>
            </Box>
            <Box sx={{width:"100%"}}>
              <p style={{ marginLeft: "7%" ,width:"100%"}}>
                Contrary to popular belief ,Lorem Ipsum is not simply random
                text
              </p>
            </Box>
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
            cursor:'pointer',
            width:"100%"
          }}
        //   onClick={handleClickLoadProfile}
        >
          <Box sx={{ flexDirection: "row", display: "flex" }}>
            <img
              src={reduceload}
              alt="/"
              style={{
                width: "3%",
                height: "2%",
                marginTop:"1%",
                marginLeft: "2%",
                marginRight: "2%",
              }}
              
            />

            <Box sx={{ flexDirection: "row",width:"20%"}}>
              <p style={{ fontWeight: "600" ,marginTop:"12%"}}>Reduction of Load</p>
            </Box>
            <Box sx={{width:"100%"}}>
              <p style={{ marginLeft: "7%" ,width:"100%"}}>
                Contrary to popular belief ,Lorem Ipsum is not simply random
                text
              </p>
            </Box>
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
            cursor:'pointer',
            width:"100%"
          }}
        //   onClick={handleClickLoadProfile}
        >
          <Box sx={{ flexDirection: "row", display: "flex" }}>
            <img
              src={outage}
              alt="/"
              style={{
                width: "3%",
                height: "2%",
                marginTop:"1%",
                marginLeft: "2%",
                marginRight: "2%",
              }}
              
            />

            <Box sx={{ flexDirection: "row",width:"20%"}}>
              <p style={{ fontWeight: "600" ,marginTop:"8%"}}>Power Outage Complaint</p>
            </Box>
            <Box sx={{width:"100%"}}>
              <p style={{ marginLeft: "4%" ,width:"100%"}}>
                Contrary to popular belief ,Lorem Ipsum is not simply random
                text
              </p>
            </Box>
          </Box>
        </Grid> */}
        </Grid>




          </Box>
          
          
        
        
          );
}