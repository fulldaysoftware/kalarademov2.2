import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import About from '@mui/icons-material/Help';
import { Reviews, Logout, Person2, Person } from '@mui/icons-material';
import {useNavigate} from 'react-router-dom'
import { signOut } from '../Scripts/Server';
import TenantAdminChoice from './TenantAdminChoice';
import {useSelector} from "react-redux"
import AdminChoice from './AdminChoices';
import HeadChoice from './HeadChoices';
import ManagerChoice from './ManagerChoice';
import {useDispatch} from "react-redux"
import {removeForm} from "../States/Reducers/FormSlice"
import {removeUser} from "../States/Reducers/UserSlice"
import {notAdmin} from "../States/Reducers/adminSlice"
import {removeHotel} from "../States/Reducers/hotelDetail"
import {removePlace} from "../States/Reducers/placesSlice"
import {logout as  userlogout} from "../States/Reducers/sessionSlice"
import {removeTenant} from "../States/Reducers/tenatId"
import HotelCard from './HotelCard';
import ManagerHome from '../Components/Dashboards/Manager/Home';


const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});
const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);




export default function MiniDrawer({child}) {
  const theme = useTheme();
  const dispatch = useDispatch()
    const role = useSelector(state => state.user.role);
    const places = useSelector(state => state.places);

    // console.log(places);
  const [open, setOpen] = React.useState(false);
 const nav = useNavigate()
const logout = async () =>{
  console.log("Im coooooooooooooooooooold");
  
    // const resp = await signOut()
    // console.log(resp);
    // if(resp.success || true){
      const initialState = {
        session: null,
        admin: null,
        form: {},
        tenant: null,
        user: null,
        places: [],
        hotels: [],
        reviewForm: null,
      };
      localStorage.clear()

      dispatch(removeForm())
      dispatch(notAdmin())
      dispatch(removeHotel())
      dispatch(removePlace())
      dispatch(removeTenant())
      dispatch(removeUser())
      dispatch(userlogout())
      console.log("Logged Out")
      nav("/login")
    // }
}



  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
    const menu = <IconButton
            
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start">
            <MenuIcon style = {{color: theme.palette.primary.main}} />
            </IconButton>
  const menuClose = (
  <Grid container alignItems="center" justifyContent="space-between" style={{ marginLeft: '10%' }}>
    <Typography variant="h6" noWrap  style = {{color: theme.palette.primary.main}} >
      {role == "tenantAdmin"? "Tenant Admin": role}
    </Typography>
    <IconButton onClick={handleDrawerClose}>
      {theme.direction === "rtl" ? <ChevronRightIcon  style = {{color: theme.palette.primary.main}}  /> : <ChevronLeftIcon  style = {{color: theme.palette.primary.main}}  />}
    </IconButton>
  </Grid>
);

// const chooseInit = (role) => {
//   if(role == "Manager"){
//     return places.map((item) => {
//       return <HotelCard theme={theme} key={item.id} id = {item.id} image={item.imageUrl} title={item.displayName} description ={item.formattedAddress}/>
//     })
//     // return <HotelCard image = {} , title, description, onClick />
//   }
//   else if(role == "Admin"){
//     // return <AdminChoice theme={theme} open={open}/>
//   }
//   else if(role == "tenantAdmin"){
//     // return <TenantAdminChoice theme={theme} open={open}/>
//   }
//   if(role == "Head"){
//     // return <HeadChoice theme={theme} open={open}/>
//   }
// }
const chooseUI = (role) => {
  if(role == "Manager"){
    return <ManagerChoice theme={theme} open={open}/>
  }
  else if(role == "Admin"){
    return <AdminChoice theme={theme} open={open}/>
  }
  else if(role == "tenantAdmin"){
    return <TenantAdminChoice theme={theme} open={open}/>
  }
  if(role == "Head"){
    return <HeadChoice theme={theme} open={open}/>
  }
}

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
            {open ? (menuClose) : menu}
        </DrawerHeader>
        <Divider  style = {{color: theme.palette.primary.main}}  />
        {chooseUI(role)}
        
        <Divider />
        <List>
          <ListItem key="profile" disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                    <Person style = {{color: theme.palette.primary.main}}  />
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                </ListItemIcon>
                <ListItemText style = {{color: theme.palette.primary.main}} primary="Profile" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          <ListItem key="logou" disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() =>{logout()}}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                    <Logout style = {{color: theme.palette.primary.main}}  />
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                </ListItemIcon>
                <ListItemText style = {{color: theme.palette.primary.main}} primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        </List>
        <Divider/>
        <List>
          <ListItem key="about" disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                    <About style = {{color: theme.palette.primary.main}} />
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                </ListItemIcon>
                <ListItemText style = {{color: theme.palette.primary.main}} primary="About Us" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        </List>
        
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {child}
        {/* {role == "Manager" && <ManagerHome />} */}
        {/* {chooseInit(role)} */}
         {/* <ResponsiveAppBar rounded elevation={5} /> */}
         {/* <Form/> */}
        
      </Box>
    </Box>
  );
}