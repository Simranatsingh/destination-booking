import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DestinationSelect from "../components/DestinationSelect.jsx";
import HotelList from "../components/HotelList.jsx";
import { getDestinations, getHotels } from "../api/api.jsx";

export default function Landing() {
  const [destinations, setDestinations] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    getDestinations()
      .then(setDestinations)
      .catch(() => setDestinations([]));
  }, []);
  useEffect(() => {
    if (selectedId)
      getHotels(selectedId)
        .then((res) => setHotels(res.data))
        .catch(() => setHotels([]));
    else setHotels([]);
  }, [selectedId]);

  return (
    <div>
      <h1 className="heading">Hotel Search</h1>
      <div className="topbar">
        <DestinationSelect
          destinations={destinations}
          selectedId={selectedId}
          onChange={setSelectedId}
          big
        />
        <div className="actions">
          <Link to="/add-destination" className="btn primary">
            Add Destination
          </Link>
          <Link to="/add-hotel" className="btn secondary">
            Add Hotel
          </Link>
        </div>
      </div>

      <HotelList hotels={hotels} />
    </div>
  );
}
