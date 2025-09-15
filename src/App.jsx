import { useEffect, useState } from "react";
import AddDestination from "./components/AddDestination";
import AddHotel from "./components/AddHotel";
import HotelList from "./components/HotelList";
import DestinationSelect from "./components/DestinationSelect";
import { getDestinations, getHotels } from "./api/api";

export default function App() {
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    getDestinations().then((res) => setDestinations(res.data));
  }, []);

  useEffect(() => {
    if (selectedDestination) {
      getHotels(selectedDestination).then((res) => setHotels(res.data));
    }
  }, [selectedDestination]);

  const reloadDestinations = () =>
    getDestinations().then((res) => setDestinations(res.data));
  const reloadHotels = () => {
    if (selectedDestination) {
      getHotels(selectedDestination).then((res) => setHotels(res.data));
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(120deg, #a1c4fd, #c2e9fb 100%)",
        fontFamily: "Segoe UI, Verdana, Geneva, Tahoma, sans-serif",
        color: "#133e69",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: 850,
          margin: "40px auto",
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 8px 16px #c2d3f0aa",
          padding: 32,
        }}
      >
        <h1 style={{ textAlign: "center", fontWeight: "bold", fontSize: 32 }}>
          Booking App — Destinations & Hotels
        </h1>
        <DestinationSelect
          destinations={destinations}
          selected={selectedDestination}
          onChange={setSelectedDestination}
        />
        <div style={{ marginTop: 21 }}>
          <AddDestination onAdded={reloadDestinations} />
        </div>
        {selectedDestination && (
          <div style={{ marginTop: 40 }}>
            <HotelList hotels={hotels} />
            <div
              style={{
                marginTop: 32,
                marginBottom: 12,
                padding: 18,
                background: "#e3f0fd",
                borderRadius: 9,
                boxShadow: "0 2px 8px #ddedfa77",
                color: "#305785",
              }}
            >
              <h2 style={{ fontWeight: "600", marginBottom: 12 }}>
                Add a Hotel
              </h2>
              <AddHotel
                destinationId={selectedDestination}
                onAdded={reloadHotels}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
