import { styled, useTheme } from '@mui/material/styles';
import {useSelector} from "react-redux"
import HotelCard from '../../../Shared/HotelCard';
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux';
import { addHotel } from '../../../States/Reducers/hotelDetail';
import Grid from "@mui/material/Unstable_Grid2"
import { getDetails } from '../../../Scripts/Server';





export default function HeadHome() {
    const theme = useTheme();
    const nav = useNavigate()
    const dispatch = useDispatch()
    const role = useSelector(state => state.user);
    const places = useSelector(state => state.places);

    async function getDetailsCaller(placeId) {
      const resultObject = await getDetails(placeId, role.tenantId)
  console.log(resultObject);
  dispatch(addHotel(resultObject))
  nav("/hotelinfo")
//   console.log(resultObject);
  // return resultObject;
}
    return (
        <>
        <h3>Welcome {role.firstName} {role.lastName}</h3>
        <h3>Branches</h3>
        <Grid container spacing={2}>
            {
        places.map((item) => {
     return <HotelCard theme={theme} key={item.id} getDetails={getDetailsCaller} id = {item.id} image={item.imageUrl} title={item.displayName} description ={item.formattedAddress}/>
     })}
        </Grid>
        
        </>
    
    )
}