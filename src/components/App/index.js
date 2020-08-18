import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import InfoCard from '../Card';
import SearchField from '../SearchField';
import Map from '../Map';

const DEFAULT_LOCATION = {
  latitude: 40.7295,
  longitude: -73.9965
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
  spinner: {
    margin: 'auto'
  }
});

function App() {

  const classes = useStyles();
  const [data, setData] = useState({});
  const [joints, setJoints] = useState([]);
  const [position, setPosition] = useState(DEFAULT_LOCATION);
  const [showMap, setShowMap] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async location => {
    setIsLoading(true);
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
    setIsLoading(false);
  }

  const fetchSearchData = async name => {
    setIsLoading(true);
    const res = await axios.get(
        `https://developers.zomato.com/api/v2.1/search?q=${name}`,
        {
          headers: {'user-key': ZOMATO}
        }
      );
    setData(res.data);
    if(res.data.restaurants)
      setJoints(res.data.restaurants)
    setIsLoading(false);
  }

  const onMapToggle = () => {
    if(showMap)
      setShowMap(false);
    else
      setShowMap(true)
  }

  useEffect(() => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          position = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setPosition(position);
          fetchData(position);
        },
        (error) => fetchData(DEFAULT_LOCATION)
      );
    }

  }, []);

  return (
    <div className="App">
      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={12}>
          <SearchField fetchSearchData={fetchSearchData}/>
        </Grid>
        <Grid item xs={12}>
          map mode
          <Switch
            checked={showMap}
            onChange={onMapToggle}
            name="mapCheck"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />        
        </Grid>
        {
          isLoading
            ? <CircularProgress className={classes.spinner}/>
            : (
              showMap
                ? joints.map(item =>
                  {
                    item = item.restaurant;
                    return (
                      <Grid item key={item.name} >
                        <InfoCard item={item}/>
                      </Grid>
                      )
                    })
                : <Map joints={joints} current={position} />
            )
        }
      </Grid>
    </div>
  );
}

export default App;
