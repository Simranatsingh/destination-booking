import { useState, useEffect } from "react";
import { addHotel } from "../api/api";

export default function AddHotel({ destinationId, onAdded }) {
  const [hotel, setHotel] = useState({
    name: "",
    address: "",
    stars: "",
    rating: "",
    priceFrom: "",
  });

  const [roomTypeFields, setRoomTypeFields] = useState([
    { name: "", price: "", facilities: "" },
  ]);
  const [attractionFields, setAttractionFields] = useState([
    { name: "", distance: "" },
  ]);
  const [photoFields, setPhotoFields] = useState([""]);

  useEffect(() => {
    setHotel((prev) => ({ ...prev, destinationId }));
  }, [destinationId]);

  const handleHotelChange = (e) => {
    const { name, value } = e.target;
    setHotel((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoomTypeChange = (index, e) => {
    const newRoomTypes = [...roomTypeFields];
    newRoomTypes[index][e.target.name] = e.target.value;
    setRoomTypeFields(newRoomTypes);
  };

  const addRoomType = () =>
    setRoomTypeFields([
      ...roomTypeFields,
      { name: "", price: "", facilities: "" },
    ]);

  const handleAttractionChange = (index, e) => {
    const newAttractions = [...attractionFields];
    newAttractions[index][e.target.name] = e.target.value;
    setAttractionFields(newAttractions);
  };

  const addAttraction = () =>
    setAttractionFields([...attractionFields, { name: "", distance: "" }]);

  const handlePhotoChange = (index, e) => {
    const newPhotos = [...photoFields];
    newPhotos[index] = e.target.value;
    setPhotoFields(newPhotos);
  };

  const addPhoto = () => setPhotoFields([...photoFields, ""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addHotel({
        ...hotel,
        stars: Number(hotel.stars),
        rating: Number(hotel.rating),
        priceFrom: Number(hotel.priceFrom),
        destinationId,
        roomTypes: roomTypeFields.map((rt) => ({
          name: rt.name,
          price: Number(rt.price),
          facilities: rt.facilities
            ? rt.facilities.split(",").map((f) => f.trim())
            : [],
        })),
        nearbyAttractions: attractionFields.map((na) => ({
          name: na.name,
          distance: na.distance,
        })),
        photos: photoFields.filter(Boolean).map((url) => ({ url })),
      });
      setHotel({
        name: "",
        address: "",
        stars: "",
        rating: "",
        priceFrom: "",
      });
      setRoomTypeFields([{ name: "", price: "", facilities: "" }]);
      setAttractionFields([{ name: "", distance: "" }]);
      setPhotoFields([""]);
      if (onAdded) onAdded();
    } catch (err) {
      console.error("Failed to add hotel:", err);
      alert("Failed to add hotel! See console for details.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={hotel.name}
        onChange={handleHotelChange}
        placeholder="Hotel Name"
        required
        style={{ marginRight: 8 }}
      />
      <input
        name="address"
        value={hotel.address}
        onChange={handleHotelChange}
        placeholder="Address"
        required
        style={{ marginRight: 8 }}
      />
      <input
        name="stars"
        type="number"
        value={hotel.stars}
        onChange={handleHotelChange}
        placeholder="Stars"
        required
        min="1"
        max="5"
        style={{ marginRight: 8 }}
      />
      <input
        name="rating"
        type="number"
        value={hotel.rating}
        onChange={handleHotelChange}
        placeholder="Rating"
        required
        min="0"
        max="5"
        step="0.1"
        style={{ marginRight: 8 }}
      />
      <input
        name="priceFrom"
        type="number"
        value={hotel.priceFrom}
        onChange={handleHotelChange}
        placeholder="Price From"
        required
        style={{ marginBottom: 12 }}
      />
      <hr />
      <div>
        <strong>Room Types</strong>
        {roomTypeFields.map((field, i) => (
          <div key={i} style={{ marginBottom: 6 }}>
            <input
              name="name"
              value={field.name}
              onChange={(e) => handleRoomTypeChange(i, e)}
              placeholder="Room Type Name"
              required
              style={{ marginRight: 5 }}
            />
            <input
              name="price"
              type="number"
              value={field.price}
              onChange={(e) => handleRoomTypeChange(i, e)}
              placeholder="Price"
              required
              style={{ marginRight: 5 }}
            />
            <input
              name="facilities"
              value={field.facilities}
              onChange={(e) => handleRoomTypeChange(i, e)}
              placeholder="Facilities (comma separated)"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addRoomType}
          style={{ marginBottom: 12 }}
        >
          Add Room Type
        </button>
      </div>
      <hr />
      <div>
        <strong>Nearby Attractions</strong>
        {attractionFields.map((field, i) => (
          <div key={i} style={{ marginBottom: 6 }}>
            <input
              name="name"
              value={field.name}
              onChange={(e) => handleAttractionChange(i, e)}
              placeholder="Attraction Name"
              required
              style={{ marginRight: 6 }}
            />
            <input
              name="distance"
              value={field.distance}
              onChange={(e) => handleAttractionChange(i, e)}
              placeholder="Distance"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addAttraction}
          style={{ marginBottom: 8 }}
        >
          Add Attraction
        </button>
      </div>
      <hr />
      <div>
        <strong>Photos</strong>
        {photoFields.map((url, i) => (
          <div key={i} style={{ marginBottom: 6 }}>
            <input
              value={url}
              onChange={(e) => handlePhotoChange(i, e)}
              placeholder="Photo URL"
            />
          </div>
        ))}
        <button type="button" onClick={addPhoto} style={{ marginBottom: 8 }}>
          Add Photo
        </button>
      </div>
      <button
        type="submit"
        style={{
          background: "#3498db",
          color: "#fff",
          fontWeight: "bold",
          border: "none",
          borderRadius: 6,
          padding: "8px 20px",
          marginTop: 16,
          cursor: "pointer",
        }}
      >
        Add Hotel
      </button>
    </form>
  );
}
