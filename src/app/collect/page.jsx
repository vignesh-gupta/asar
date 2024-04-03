"use client";

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function CollectData() {
  const [position, setPosition] = useState({});

  useEffect(() => {
    const geolocationOptions = {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 5000,
    };

    const errorCallback = (error) => {
      console.error(error);
      setPosition("Error getting the location", error);
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      errorCallback,
      geolocationOptions
    );
  }, []);

  const handleSendData = async () => {
    console.log("Send data to the server");

    if (!position.latitude || !position.longitude) {
      alert("No data to send, reset the location permission and try again.");
      return console.error("No data to send");
    }

    const url = `https://api.thingspeak.com/update?api_key=6Q2U99CFB05024LM&field7=${position.latitude}&field8=${position.longitude}`;

    console.log(position, url);
    const res = await axios
      .get(url)
      .then((res) => res.data)
      .catch(console.error);

    console.log(res);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        className="px-4 py-2 border rounded-lg bg-violet-300"
        onClick={handleSendData}
      >
        Send Data
      </button>
      <p>Latitude: {position.latitude}</p>
      <p>Longitude: {position.longitude}</p>
    </div>
  );
}
