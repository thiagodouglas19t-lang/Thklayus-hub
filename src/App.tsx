import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Polyline, TileLayer, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type LatLng = [number, number];

type RiskPoint = {
  id: number;
  title: string;
  level: "baixo" | "médio" | "alto";
  position: LatLng;
};

const userIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const riskIcon = new L.DivIcon({
  className: "",
  html: '<div style="width:18px;height:18px;border-radius:999px;background:#ef4444;border:3px solid white;box-shadow:0 8px 20px rgba(0,0,0,.45)"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

function distanceKm(a: LatLng, b: LatLng) {
  const earth = 6371;
  const dLat = ((b[0] - a[0]) * Math.PI) / 180;
  const dLon = ((b[1] - a[1]) * Math.PI) / 180;
  const lat1 = (a[0] * Math.PI) / 180;
  const lat2 = (b[0] * Math.PI) / 180;
  const x = Math.sin(dLat / 2) ** 2 + Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return earth * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

function ReloadMap({ center }: { center: LatLng }) {
  const map = useMap();

  useEffect(() => {
    const t1 = window.setTimeout(() => {
      map.invalidateSize();
      map.setView(center, 16);
    }, 250);

    const t2 = window.setTimeout(() => {
      map.invalidateSize();
    }, 900);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [center, map]);

  return null;
}

function ClickHandler({ onPick }: { onPick: (point: LatLng) => void }) {
  useMapEvents({
    click(e) {
      onPick([e.latlng.lat, e.latlng.lng]);
    },
  });

  return null;
}

export default function App() {
  const [userPos, setUserPos] = useState<LatLng | null>(null);
  const [dest, setDest] = useState<LatLng | null>(null);
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserPos([pos.coords.latitude, pos.coords.longitude]),
      () => setLocationError("Permita a localização para usar o Radar Seguro."),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  const risks = useMemo<RiskPoint[]>(() => {
    if (!userPos) return [];
    return [
      { id: 1, title: "Ponto escuro", level: "médio", position: [userPos[0] + 0.0014, userPos[1] + 0.001] },
      { id: 2, title: "Área de atenção", level: "alto", position: [userPos[0] + 0.0023, userPos[1] + 0.0022] },
      { id: 3, title: "Rua com pouco movimento", level: "baixo", position: [userPos[0] - 0.0012, userPos[1] + 0.0015] },
    ];
  }, [userPos]);

  const route = userPos && dest ? [userPos, dest] : [];

  const nearbyRisks = useMemo(() => {
    if (!dest || !userPos) return [];
    return risks.filter((risk) => distanceKm(risk.position, dest) < 0.35 || distanceKm(risk.position, userPos) < 0.35);
  }, [dest, risks, userPos]);

  const safety = nearbyRisks.some((risk) => risk.level === "alto") ? "perigosa" : nearbyRisks.length ? "atenção" : "segura";
  const routeColor = safety === "perigosa" ? "#ef4444" : safety === "atenção" ? "#f59e0b" : "#22c55e";

  if (!userPos) {
    return (
      <main className="grid min-h-screen place-items-center bg-black px-6 text-center text-white">
        <div>
          <h1 className="text-3xl font-black">Radar Seguro</h1>
          <p className="mt-3 text-zinc-400">{locationError || "Pegando sua localização..."}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-black text-white">
      <MapContainer center={userPos} zoom={16} zoomControl={true} className="absolute inset-0 z-0 h-full w-full">
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ReloadMap center={userPos} />
        <ClickHandler onPick={setDest} />

        <Marker position={userPos} icon={userIcon} />
        {dest && <Marker position={dest} icon={userIcon} />}
        {route.length > 0 && <Polyline positions={route} color={routeColor} weight={6} opacity={0.9} />}
        {risks.map((risk) => <Marker key={risk.id} position={risk.position} icon={riskIcon} />)}
      </MapContainer>

      <section className="pointer-events-none absolute left-0 right-0 top-0 z-[500] p-4">
        <div className="pointer-events-auto rounded-[1.7rem] border border-white/10 bg-black/80 p-4 shadow-2xl backdrop-blur-2xl">
          <p className="text-[11px] font-black uppercase tracking-[0.24em] text-zinc-500">Radar Seguro</p>
          <h1 className="mt-1 text-2xl font-black tracking-[-0.05em]">Rotas com segurança visual</h1>
          <p className="mt-2 text-sm text-zinc-400">Toque no mapa para escolher um destino.</p>
        </div>
      </section>

      <section className="pointer-events-none absolute bottom-0 left-0 right-0 z-[500] p-4">
        <div className="pointer-events-auto rounded-[1.7rem] border border-white/10 bg-black/85 p-4 shadow-2xl backdrop-blur-2xl">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Status da rota</p>
              <h2 className="mt-1 text-2xl font-black capitalize">{dest ? safety : "sem destino"}</h2>
            </div>
            <div className="h-4 w-4 rounded-full" style={{ background: dest ? routeColor : "#71717a" }} />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-bold">
            <div className="rounded-2xl bg-white/10 p-3"><p className="text-lg font-black">{dest ? distanceKm(userPos, dest).toFixed(2) : "0"}</p><p className="text-zinc-500">km</p></div>
            <div className="rounded-2xl bg-white/10 p-3"><p className="text-lg font-black">{nearbyRisks.length}</p><p className="text-zinc-500">riscos</p></div>
            <div className="rounded-2xl bg-white/10 p-3"><p className="text-lg font-black">MVP</p><p className="text-zinc-500">rota</p></div>
          </div>
        </div>
      </section>
    </main>
  );
}
