import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfoCard from '../Card'

const DEFAULT_LOCATION = {
  latitude: 40.7295,
  longitude: 73.9965
}
// for easy demo, I'll leave the API key exposed
const ZOMATO = '058759b89bd02ab3ef6c3f62c57e96cd'

function App() {

  const [data, setData] = useState({});

  const fetchData = async location => {
    const res = await axios.get(
        `https://developers.zomato.com/api/v2.1/geocode?
          lat=${location.latitude}&lon=${location.longitude}`,
        {
          headers: {'user-key': ZOMATO}
        }
      );
    setData(res.data);
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
      <header className="App-header">
        {
          data.nearby_restaurants && data.nearby_restaurants.map(item =>
            {
              item = item.restaurant;
              return (<InfoCard 
                name={item.name}
                type={item.cuisine}
                address={item.location?.address}
                price={item.price_range}/>
                )
              })
        }
      </header>
    </div>
  );
}

export default App;
