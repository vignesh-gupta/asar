import { useState } from "react";
import { useEffect } from "react";

export default function App() {

  const [position, setPosition] = useState({}); 

  // Get user location data
  useEffect(() => {

    const geolocationOptions = {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 5000,
    };

    const errorCallback = (error) => {
      console.error(error);
      setPosition("Error getting the location" , error)
    }
    
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude);
      setPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }, errorCallback , geolocationOptions);

    
  }, []);

  return <h1 className="text-3xl font-bold underline">{JSON.stringify(position)}</h1>;
}
