import React, { useEffect, useState } from 'react';

const DEFAULT_LOCATION = {
  latitude: 40.7295,
  longitude: 73.9965
}

function App() {

  const [location, setLocation] = useState(DEFAULT_LOCATION);

  useEffect(() => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });

      });
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
