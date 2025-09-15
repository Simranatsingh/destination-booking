import { useState } from "react";
import { addDestination } from "../api/api";

export default function AddDestination({ onAdded }) {
  const [destination, setDestination] = useState({
    name: "",
    country: "",
    description: "",
    coordinates: { lat: "", lon: "" },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "lat" || name === "lon") {
      setDestination({
        ...destination,
        coordinates: { ...destination.coordinates, [name]: value },
      });
    } else {
      setDestination({ ...destination, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDestination({
      ...destination,
      coordinates: {
        lat: Number(destination.coordinates.lat),
        lon: Number(destination.coordinates.lon),
      },
    });
    setDestination({
      name: "",
      country: "",
      description: "",
      coordinates: { lat: "", lon: "" },
    });
    onAdded && onAdded();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={destination.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="country"
        value={destination.country}
        onChange={handleChange}
        placeholder="Country"
        required
      />
      <input
        name="description"
        value={destination.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        name="lat"
        value={destination.coordinates.lat}
        onChange={handleChange}
        placeholder="Latitude"
        required
      />
      <input
        name="lon"
        value={destination.coordinates.lon}
        onChange={handleChange}
        placeholder="Longitude"
        required
      />
      <button type="submit">Add Destination</button>
    </form>
  );
}
