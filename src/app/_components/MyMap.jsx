import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function MyMap({ positions }) {
  // const { position, zoom } = props;
  const DEFAULT_CENTER = [19.3057726, 72.8624543];

  console.log("Map", positions);

  return (
    <MapContainer
      center={positions.length > 0 ? [positions[0].lat, positions[0].long] : DEFAULT_CENTER}
      height={400}
      zoom={13}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {positions.map((pos, index) => (
        <Marker key={`marker-${pos.lat}-${pos.long}`} position={[pos.lat, pos.long]}></Marker>
      ))}
    </MapContainer>
  );
}
