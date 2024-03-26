import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Grid } from '@mui/material';
import { PlayArrow, Preview, PreviewOutlined, PreviewRounded, PreviewTwoTone, Visibility } from '@mui/icons-material';

const HotelCard = ({ image, theme, id, title, description, getDetails }) => {
  return (
    <Card sx={{ display: 'flex', bgcolor: 'background.paper', width: '300px', margin: "10px" }} elevation={4}>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CardMedia
        component="img"
        image={image}
        style={{ width: "100%", height: 150, objectFit: 'cover' }}
      />
            <Typography variant="h6" component="div" style={{ color: theme.palette.text.main }}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ color: theme.palette.text.main }}>
              {description}
            </Typography>
          </Grid>
          <Grid item xs={12} align={"right"}>
            <IconButton onClick={() => getDetails(id)} aria-label="play" sx={{ marginLeft: 'auto' }}>
              <Visibility style={{ color: theme.palette.primary.main }} />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default HotelCard;

