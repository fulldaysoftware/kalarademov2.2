import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import MiniDrawer from './AdminPanel';
import { useSelector } from "react-redux";
import { Rating } from "@mui/material";
import ImageCarousel from './ImageCarousel';
import ReviewsTable from './ReviewTable';
import extractJSONFromString from "../Scripts/JSONExtractor";
import LineGraph from './Graph';
import formatDate from '../Components/Dashboards/Misc/DateConverter';
import { PieChart } from '@mui/icons-material';
import BasicPie from './PieChartDrawer';
import {calculateAverageRatingsMonthly, calculateAverageRatingsWeekly, sortByPublishTime} from '../Components/Dashboards/Misc/GrpahRating';
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';


export default function HotelInformation({ Info }) {
  
  const hotel = useSelector(state => state.hotels);

  const paperStyle = { padding: "20px" }
  

  let tempData = sortByPublishTime(hotel.graph)
  const myData = {
    labels: tempData.map((item) => formatDate(item.publishTime)),
    label: 'Reviews',
    values: tempData.map((item) => item.rating),
  };
  const [graphState, setGraphState] = useState(myData)

  
  const reviewPie = [hotel.review_sentiments.Great, hotel.review_sentiments.Good, hotel.review_sentiments.Neutral, hotel.review_sentiments.Bad,hotel.review_sentiments.Worst ];
  const foodPie = [hotel.food_sentiments.Great, hotel.food_sentiments.Good, hotel.food_sentiments.Neutral, hotel.food_sentiments.Bad,hotel.food_sentiments.Worst ];
  const roomPie = [hotel.room_sentiments.Great, hotel.room_sentiments.Good, hotel.room_sentiments.Neutral, hotel.room_sentiments.Bad,hotel.room_sentiments.Worst ];
  const servicePie = [hotel.service_sentiments.Great, hotel.service_sentiments.Good, hotel.service_sentiments.Neutral, hotel.service_sentiments.Bad,hotel.service_sentiments.Worst ]



  const [selection, setSelection] = useState('Individual'); // Initial selection

  const handleChange = (event) => {
    setSelection(event.target.value);
    if(event.target.value == "Monthly"){
      let data = calculateAverageRatingsMonthly(hotel.graph)
      const monthData = {
    labels: data.map((item) => formatDate(item.publishTime)),
    label: 'Reviews Monthly',
    values: data.map((item) => item.averageRating),
  };
      setGraphState((prev) => {return monthData})
    }
    if(event.target.value == "Weekly"){
      let data = calculateAverageRatingsWeekly(hotel.graph)
      const monthData = {
    labels: data.map((item) => formatDate(item.publishTime)),
    label: 'Reviews Weekly',
    values: data.map((item) => item.averageRating),
  };
      setGraphState((prev) => {return monthData})
    }
    if(event.target.value == "Individual"){
      const myData = {
    labels: sortByPublishTime(hotel.graph).map((item) => formatDate(item.publishTime)),
    label: 'Reviews',
    values: sortByPublishTime(hotel.graph).map((item) => item.rating),
  };
      setGraphState((prev) => {return myData})
    }
  };


  const mainChild = <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Paper elevation={5} style={{ margin: "10px" }}>
              <Grid container style={{ padding: "20px" }} justifyContent="space-between">
                <Grid item xs={6} alignContent={'center'}>
                  <h3>{hotel.displayName}</h3>
                  <h4>{hotel.address}</h4>
                </Grid>
                <Grid item xs={6} alignContent={'right'} textAlign={"right"}>
                  <h4>Average Rating {hotel.averageRating}</h4>
                  <Rating name="read-only" value={hotel.averageRating} precision={0.25} readOnly />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={8} style={{ margin: "10px", padding: "20px" }}>
              <h4>Photos</h4>
              <ImageCarousel images={hotel.photo} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={8} style={{ margin: "10px", padding: "20px" }}>
              <h4>Editorial Summary</h4>
              <p>{hotel.editorialSummary}</p>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={8} style={{ margin: "10px", padding: "20px" }}>
              <h4>Summary</h4>
              <p>{hotel.summary}</p>
            </Paper>
          </Grid>
          
          
          <Grid item xs={12} sm={6}>
            <Paper elevation={8} style={{ margin: "10px", padding: "20px" }}>
              <h4>Reviews Sentiment Analysis</h4>
              <BasicPie data = {reviewPie} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={8} style={{ margin: "10px", padding: "20px" }}>
              <h4>Food Sentiment Analysis</h4>
              <BasicPie data = {foodPie} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={8} style={{ margin: "10px", padding: "20px" }}>
              <h4>Room Sentiment Analysis</h4>
              <BasicPie data={roomPie} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={8} style={{ margin: "10px", padding: "20px" }}>
              <h4>Service Sentiment Analysis</h4>
              <BasicPie data={servicePie} />
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12} width={"100%"} sm={6}>
            <Paper elevation={8} style={{ margin: "10px", padding: "20px" }}>
              <h4>Reviews Graph ({selection})</h4>
              <FormControl sx={{ minWidth: 400 }}>  {/* Set minimum width */}
                <InputLabel id="selection-label">Selection</InputLabel>
                <Select
                  labelId="selection-label"
                  id="selection"
                  value={selection}
                  onChange={handleChange}
                >
                  <MenuItem value="Individual">Individual</MenuItem>
                  <MenuItem value="Weekly">Weekly</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                </Select>
              </FormControl>
              <LineGraph data={graphState} />
            </Paper>
          </Grid>
        <Grid item xs={12} width={"100%"} sm={6}>
            <Paper elevation={8} style={{ margin: "10px", padding: "20px" }}>
              <h4>Point of Intervention</h4>
              <ReviewsTable reviewsArray={extractJSONFromString(hotel.detailSummary)} />
            </Paper>
          </Grid>
      </Box>
    </>


  return (
    <>
    {hotel && <MiniDrawer child={mainChild}  />}
    </>
  );
}