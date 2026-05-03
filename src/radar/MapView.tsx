import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import { LatLng, RiskPoint } from "./types";

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
});

export default function MapView({
  userPos,
  dest,
  route,
  risks,
}: {
  userPos: LatLng;
  dest: LatLng | null;
  route: LatLng[];
  risks: RiskPoint[];
}) {
  return (
    <MapContainer center={userPos} zoom={15} className="h-full w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={userPos} icon={icon} />

      {dest && <Marker position={dest} icon={icon} />}

      {route.length > 0 && <Polyline positions={route} color="lime" />}

      {risks.map((risk) => (
        <Marker key={risk.id} position={risk.position} icon={icon} />
      ))}
    </MapContainer>
  );
}
