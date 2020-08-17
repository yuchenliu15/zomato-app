import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DEFAULT_LOCATION = {
  latitude: 40.7295,
  longitude: 73.9965
}
// for easy demo, I'll leave the API key exposed
const ZOMATO = '058759b89bd02ab3ef6c3f62c57e96cd'

function App() {

  const [data, setData] = useState({});

  const fetchData = async location => {
    const data = await axios.get(
        `https://developers.zomato.com/api/v2.1/geocode?
          lat=${location.latitude}&lon=${location.longitude}`,
        {
          headers: {'user-key': ZOMATO}
        }
      );
    setData(data);
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

  return (
    <div className="App">
      <header className="App-header">
        init
      </header>
    </div>
  );
}

export default App;
