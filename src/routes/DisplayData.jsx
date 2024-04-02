import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

export default function DisplayData() {
  const [noOfData, setNoOfData] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.thingspeak.com/channels/2380629/feeds.json?api_key=UUYUJTQF1ALW8SMM&results=5`;
      const res = await fetch(url).then((res) => res.json());
      setData(
        res.feeds?.map((feed) => ({ lat: feed.field7, long: feed.field8 }))
      );
    };
    fetchData();
  }, []);

  return (
    <div className="w-full h-screen">
      <h1>Number of Data: {noOfData}</h1>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}></Marker>
      </MapContainer>
    </div>
  );
}
