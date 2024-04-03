import {
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function MyMap({ positions }) {
  // const { position, zoom } = props;
  const DEFAULT_CENTER = [19.3057726, 72.8624543];

  console.log("Map", positions);

  return (
    <MapContainer
      center={
        positions.length > 0
          ? [positions[0].lat, positions[0].long]
          : DEFAULT_CENTER
      }
      height={400}
      className="mx-4"
      zoom={13}
    >
      <LayersControl>
        <LayersControl.BaseLayer name="Open Street Map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer checked name="Google Map">
          <TileLayer
            attribution="Google Maps"
            url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Google Map Satellite">
          <LayerGroup>
            <TileLayer
              attribution="Google Maps Satellite"
              url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
            />
            <TileLayer url="https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}" />
          </LayerGroup>
        </LayersControl.BaseLayer>
      </LayersControl>

      {positions.map((pos) => (
        <Marker
          key={`marker-${pos.lat}-${pos.long}`}
          position={[pos.lat, pos.long]}
        ></Marker>
      ))}
    </MapContainer>
  );
}

function Square(props) {
  const context = useLeafletContext();

  useEffect(() => {
    const bounds = L.latLng(props.center).toBounds(props.size);
    const square = new L.Rectangle(bounds);
    const container = context.layerContainer || context.map;
    container.addLayer(square);

    return () => {
      container.removeLayer(square);
    };
  });

  return null;
}
