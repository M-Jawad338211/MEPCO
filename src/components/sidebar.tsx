import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import home from '../assets/home .png';
import dash from '../assets/dash.png';
import duplicate from '../assets/duplicate.png';
import smartview from '../assets/data-management.png';
import phone from '../assets/costumer-service.png';
import profile from '../assets/profile.png';
import friend from '../assets/share.png';
import signout from '../assets/log-out .png';
import mepcologo from '../assets/mepco_logo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
export default function Sidebar() {

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleMenuClick = (event: any, index: any) => {
    setSelectedIndex(index);
  }


  const menu = [
    {
      text: 'Home',
      icon: home,
      link: '/home'
    },
    {
      text: 'Dashboard',
      icon: dash,
      link: '/Dashboard'
    },
    {
      text: 'Duplicate Bill',
      icon: duplicate,
      link: '/Duplicatebill'
    },
    {
      text: 'Smart View',
      icon: smartview,
      link: '/SmartView'
    },
    {
      text: 'Customer Services',
      icon: phone,
      link: '/Services'
    },
    {
      text: 'UserProfile',
      icon: profile,
      link: '/UserProfile'
    },
    {
      text: 'Invite Friend',
      icon: friend,
      link: '/UserProfile'
    },
    {
      text: 'Sign out ',
      icon: signout,
      link: '/'
    },
  ]

  return (

    <div>
      <div style={{ textAlign: 'center', justifyItems: 'center' }} >
        <img src={mepcologo} alt="" style={{ width: " 60%", height: "60%", margin: "10%", }} />
      </div>
      {/* <Toolbar
               /> */}
      <List>
        {menu.map((item, index) => (
          <Link to={item.link} style={{textDecoration:'none'}} >
            <ListItem disablePadding
              selected={selectedIndex === index}
              onClick={(event) => handleMenuClick(event, index)}
              sx={selectedIndex === index ? { backgroundColor: 'white' } : { backgroundColor: '#EAEFF5' }}>
              <ListItemButton>
                <ListItemIcon>
                  <img src={item.icon} alt="" style={{ width: " 23%", height: "23%", marginLeft: "30%", marginRight: "-0%" }} />
                </ListItemIcon>
                <ListItemText primary={item.text}  style={{fontSize:"10px", color:'black', marginLeft: "-10%"}}/>
              </ListItemButton>
            </ListItem>

          </Link>
        ))}
        {/* <Link to="/Home" className='' >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <img src={home} alt="" style={{ width: " 25%", height: "25%", marginLeft: "50%", marginRight: "-0%" }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/Home" className='' >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <img src={dash} alt="" style={{ width: " 25%", height: "25%", marginLeft: "50%", }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
        </Link>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <img src={duplicate} alt="" style={{ width: " 25%", height: "25%", marginLeft: "50%", }} />
            </ListItemIcon>
            <ListItemText primary="Duplicate Bill" />
          </ListItemButton>
        </ListItem>

        <Link to="/SmartView" className='' >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <img src={smartview} alt="" style={{ width: " 25%", height: "25%", marginLeft: "50%", }} />
              </ListItemIcon>
              <ListItemText primary="Smart View" />
            </ListItemButton>
          </ListItem>
        </Link>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <img src={phone} alt="" style={{ width: " 25%", height: "25%", marginLeft: "50%", }} />
            </ListItemIcon>
            <ListItemText primary="Services" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <img src={profile} alt="" style={{ width: " 25%", height: "25%", marginLeft: "50%", }} />
            </ListItemIcon>
            <ListItemText primary="User Profile" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <img src={friend} alt="" style={{ width: " 25%", height: "25%", marginLeft: "50%", }} />
            </ListItemIcon>
            <ListItemText primary="Invite Friend" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{ marginTop: "50%" }}>
          <ListItemButton>
            <ListItemIcon>
              <img src={signout} alt="" style={{ width: " 25%", height: "25%", marginLeft: "50%", }} />
            </ListItemIcon>
            <ListItemText primary="Sign out" />
          </ListItemButton>
        </ListItem> */}
      </List>
    </div>

  );
}