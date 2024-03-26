import './App.css';
import { useSelector, Provider } from 'react-redux';
import Store from "./States/Store"
import Login from './Components/Login/Login';
import { useState } from 'react';
import MiniDrawer from './Shared/AdminPanel';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import TenantCreateForm from './Components/Dashboards/TenantAdmin/TenantCreate';
import EditTenatForm from './Components/Dashboards/TenantAdmin/EditTenant';
import HotelInformation from './Shared/HotelInfo';
import ManagerHome from './Components/Dashboards/Manager/Home';
import HeadHome from './Components/Dashboards/Heads/Home';
import Form from './Components/Dashboards/Forms/Form';
import ClientReviewForm from './ReviewForm';


function App() {
 
  const loginValue = useSelector(state => state.session.loggedin);
  const adminValue = useSelector(state => state.admin.isAdmin);
  const role = useSelector(state => state.user.role);
  let Home = {}
  const chooseInit = (role) => {
  if(role == "Manager"){
    return <ManagerHome/>
    // return <HotelCard image = {} , title, description, onClick />
  }
  else if(role == "Admin"){
    // return <AdminChoice theme={theme} open={open}/>
  }
  else if(role == "tenantAdmin"){
    // return <TenantAdminChoice theme={theme} open={open}/>
  }
  if(role == "Head"){
    return <HeadHome/>
    // return <HeadChoice theme={theme} open={open}/>
  }
}
Home = chooseInit(role)

  console.log(loginValue);
  // const adminValue = useSelector(state => state.mySlice.value);
  // const appState = Store.getState()
  const LoginPage = <Login/>
  // const [isLoggedin, setIsLoggedin] = useState(appState.session.loggedin)
  // const [isAdmin, setIsAdmin] = useState(appState.admin.isAdmin)
  // console.log(typeof(appState.admin.isAdmin));
  
  return (
    <BrowserRouter>      
      <Routes>
        {/* <Route path='/' element={loginValue ? <Login/> : <Login/>} /> */}
        
        <Route path="/feedback/:branchID" element={<ClientReviewForm />}/>
        <Route path='/' element={loginValue ? <MiniDrawer child={Home}/> : <Login/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/createForm' element={<TenantCreateForm />} />
        <Route path='/forms' element={<MiniDrawer child={<Form />} />} />
        <Route path='/editForm' element={<EditTenatForm/>} />
        <Route path='/hotelinfo' element={<HotelInformation/>} />
        {/* <Route exact path="/dashboard">
          {loginValue ? <MiniDrawer/> : <Login/>}
        </Route> */}
        {/* <Route exact path="/">
          {loggedIn ? <HomePage /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/profile">
          {loggedIn ? <ProfilePage /> : <Redirect to="/login" />}
        </Route> */}
      </Routes>
    {/* <Login/> */}
    {/* <MiniDrawer/> */}
     {/* { loginValue ? ( adminValue ? <MiniDrawer/> :<h1>Logged IN</h1>) :  <Login /> } */}
    </BrowserRouter>
      // {appState.session.loggedin ? (appState.admin.isAdmin ? <h1>Admin</h1> : <h1>Not Admin</h1>): LoginPage }
  );
}

export default App;
