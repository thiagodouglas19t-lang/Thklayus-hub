import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
});

export default function App() {
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [dest, setDest] = useState<[number, number] | null>(null);
  const [route, setRoute] = useState<[number, number][]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserPos([pos.coords.latitude, pos.coords.longitude]);
    });
  }, []);

  function ClickHandler() {
    useMapEvents({
      click(e) {
        const newDest: [number, number] = [e.latlng.lat, e.latlng.lng];
        setDest(newDest);
        if (userPos) {
          setRoute([userPos, newDest]); // MVP simples
        }
      },
    });
    return null;
  }

  return (
    <main className="h-screen w-full bg-black text-white">
      {!userPos && <p className="p-5">Pegando localização...</p>}

      {userPos && (
        <MapContainer center={userPos} zoom={15} className="h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Marker position={userPos} icon={icon} />

          {dest && <Marker position={dest} icon={icon} />}

          {route.length > 0 && (
            <Polyline positions={route} color="lime" />
          )}

          <ClickHandler />
        </MapContainer>
      )}
    </main>
  );
}
