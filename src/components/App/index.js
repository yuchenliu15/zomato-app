import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InfoCard from '../Card';
import SearchField from '../SearchField';

const DEFAULT_LOCATION = {
  latitude: 40.7295,
  longitude: 73.9965
}
// for easy demo, I'll leave the API key exposed
const ZOMATO = '058759b89bd02ab3ef6c3f62c57e96cd'
const useStyles = makeStyles({
  root: {
  },
  container: {
    width: '80%',
    margin: 'auto'
  },
});

function App() {

  const classes = useStyles();
  const [data, setData] = useState({});
  const [joints, setJoints] = useState([])

  const fetchData = async location => {
    const res = await axios.get(
        `https://developers.zomato.com/api/v2.1/geocode?
          lat=${location.latitude}&lon=${location.longitude}`,
        {
          headers: {'user-key': ZOMATO}
        }
      );
    setData(res.data);
    if(res.data.nearby_restaurants)
      setJoints(res.data.nearby_restaurants)
  }

  const fetchSearchData = async name => {
    const res = await axios.get(
        `https://developers.zomato.com/api/v2.1/search?q=${name}`,
        {
          headers: {'user-key': ZOMATO}
        }
      );
    setData(res.data);
    if(res.data.restaurants)
      setJoints(res.data.restaurants)
  }

  useEffect(() => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchData({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        (error) => fetchData(DEFAULT_LOCATION)
      );
    }

  }, []);
  console.log(data)
  return (
    <div className="App">
      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={12}>
          <SearchField fetchSearchData={fetchSearchData}/>
        </Grid>
        {
          joints.map(item =>
            {
              item = item.restaurant;
              return (
                <Grid item key={item.name} >
                  <InfoCard
                    name={item.name}
                    type={item.cuisine}
                    address={item.location?.address}
                    price={item.price_range}/>
                </Grid>
                )
              })
        }
      </Grid>
    </div>
  );
}

export default App;
