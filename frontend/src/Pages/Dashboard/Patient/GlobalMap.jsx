import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// All communities
const communities = [
  { name: "PDMDS (Parkinson’s Disease & Movement Disorder Society)", lat: 19.076, lng: 72.8777, link: "https://www.parkinsonssocietyindia.com" },
  { name: "Basal Ganglia Support Group (Brains Hospital, Bengaluru)", lat: 12.9716, lng: 77.5946, link: "https://brainshospital.com/Basal-Ganglia-Support-Group" },
  { name: "SoulUp – Movement Disorder Support", lat: 28.6139, lng: 77.209, link: "https://www.soulup.in/products/support-groups-living-with-a-movement-disorder" },
  { name: "Parkinson’s Disease Society of Karnataka (PDSK)", lat: 12.9716, lng: 77.5946, link: "mailto:pdsk.blr@gmail.com" },
  { name: "NIMHANS Movement Disorder Clinic", lat: 12.9436, lng: 77.5963, link: "https://nimhans.ac.in" },
  { name: "Manipal Hospitals – Young Onset Parkinson’s Clinic", lat: 12.9719, lng: 77.6412, link: "https://www.manipalhospitals.com" },
  { name: "Amrita Institute – Parkinson’s Support Group", lat: 10.03, lng: 76.318, link: "https://www.amrita.edu/news/parkinsons-disease-patient-support-group" },
  { name: "Apollo BGS Parkinson’s Support Cell (Mysuru)", lat: 12.2958, lng: 76.6394, link: "https://www.apollobgs.com" },
  { name: "KMC Mangalore Neurology Support Group", lat: 12.9141, lng: 74.856, link: "https://manipal.edu/kmc-mangalore.html" },
  { name: "KIMS Hubballi Parkinson’s Rehabilitation Center", lat: 15.3647, lng: 75.1239, link: "https://kimshubli.org" },
  { name: "Hospet Parkinson’s Support & Rehabilitation Center", lat: 15.29, lng: 76.3909, link: "#" },

  // Global
  { name: "Parkinson’s Foundation – USA", lat: 40.7128, lng: -74.0060, link: "https://www.parkinson.org" },
  { name: "Michael J. Fox Foundation – USA", lat: 40.758, lng: -73.9855, link: "https://www.michaeljfox.org" },
  { name: "Parkinson’s UK", lat: 51.5074, lng: -0.1278, link: "https://www.parkinsons.org.uk" },
  { name: "EPDA – Belgium", lat: 50.8503, lng: 4.3517, link: "https://www.epda.eu.com" },
  { name: "World Parkinson’s Program – Canada", lat: 43.6532, lng: -79.3832, link: "https://pdprogram.org" },
  { name: "Shake It Up Australia Foundation", lat: -33.8688, lng: 151.2093, link: "https://shakeitup.org.au" },
  { name: "Parkinson’s Africa", lat: 6.5244, lng: 3.3792, link: "https://parkinsonsafrica.org" },
  { name: "Japan Parkinson’s Disease Association", lat: 35.6895, lng: 139.6917, link: "https://www.movementdisorders.org" },
  { name: "Parkinson’s Network Singapore", lat: 1.3521, lng: 103.8198, link: "https://www.parkinson.org.sg" },
  { name: "Parkinson’s South Africa", lat: -26.2041, lng: 28.0473, link: "https://www.parkinsonsza.org" },
];

// ---------------------------
// Countries / major regions
// ---------------------------
const locations = {
  India: [21.1466, 79.0889],
  Karnataka: [15.3173, 75.7139],
  Kerala: [10.8505, 76.2711],
  USA: [37.09, -95.71],
  Australia: [-25.27, 133.77],
  Canada: [56.13, -106.34],
  "United Kingdom": [54, -2],
  Japan: [36.20, 138.25],
  Singapore: [1.3521, 103.8198],
  "South Africa": [-30.55, 22.93],
  Belgium: [50.85, 4.35],
};

// ---------------------------
// Helper to jump on map
// ---------------------------
function FlyToLocation({ target }) {
  const map = useMap();

  useEffect(() => {
    if (target && map) {
      map.flyTo(target.coords, target.zoom);
    }
  }, [target, map]);
  return null;
}

export default function GlobalMap() {
  const [targetLocation, setTargetLocation] = React.useState(null);

  const handleGo = () => {
    const value = document.getElementById("locationSelect").value;

    if (!value) return alert("Choose a location or community!");

    // Country/state
    if (locations[value]) {
      setTargetLocation({ coords: locations[value], zoom: 6 });
      return;
    }

    // Community
    const c = communities.find((x) => x.name === value);
    if (c) {
      setTargetLocation({ coords: [c.lat, c.lng], zoom: 10 });
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {/* HEADER */}
      <div style={{
        background: "#004d40",
        color: "#fff",
        padding: "1rem",
        marginBottom: "1rem",
        boxShadow: "0px 2px 6px rgba(0,0,0,0.3)"
      }}>
        <h1>🌍 Global Parkinson’s Community Map</h1>
        <p>Explore Parkinson’s support groups around the world</p>
      </div>

      {/* BACK BUTTON */}
      <div className="flex justify-start mb-4 ml-28">
        <Link
            to="/community"
            className="inline-block bg-teal-600 text-white px-4 py-2 rounded-lg font-bold shadow  hover:bg-white hover:text-black"
        >
            ← Back to Community
        </Link>
       </div>


      {/* DROPDOWN */}
      <div style={{
        margin: "1rem auto",
        background: "white",
        padding: "0.5rem",
        width: "fit-content",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}>
        <select id="locationSelect" style={{ padding: "6px", borderRadius: "6px" }}>
          <option value="">🌍 Select Location</option>

          {/* Country options */}
          {Object.keys(locations).map((loc) => (
            <option key={loc} value={loc}>
              🌍 {loc}
            </option>
          ))}

          <option disabled>—— Communities ——</option>

          {/* Community options */}
          {communities.map((c) => (
            <option key={c.name} value={c.name}>
              🏥 {c.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleGo}
          style={{
            marginLeft: "8px",
            padding: "6px 10px",
            background: "#00796b",
            color: "white",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer"
          }}
        >
          Go
        </button>
      </div>

      {/* MAP */}
      <div style={{ width: "90%", margin: "auto" }}>
        <MapContainer
          center={[20, 0]}
          zoom={2.3}
          style={{ height: "70vh", width: "100%", borderRadius: "1rem" }}
        >
          <FlyToLocation target={targetLocation} />

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap"
          />

          {communities.map((c) => (
            <Marker key={c.name} position={[c.lat, c.lng]}>
              <Popup>
                <strong>{c.name}</strong> <br />
                {c.link ? (
                  c.link === "#" ? (
                    <span>No link available</span>
                  ) : c.link.startsWith("mailto:") ? (
                    <a href={c.link}>Contact</a>
                  ) : (
                    <a href={c.link} target="_blank" rel="noopener noreferrer">Visit</a>
                  )
                ) : null}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
