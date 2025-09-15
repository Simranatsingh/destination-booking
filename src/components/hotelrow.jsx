import React from "react";

export default function HotelRow({ hotel, deleteHotel }) {
  return (
    <div className="hotel-row">
      <div>
        <h4>{hotel.name}</h4>
        <p>
          Stars: {hotel.stars} | Price from: ${hotel.priceFrom}
        </p>
        <p>Address: {hotel.address}</p>
      </div>
      <div className="hotel-row-buttons">
        <button onClick={() => alert("Edit coming soon!")}>Edit</button>
        <button onClick={() => deleteHotel(hotel._id)}>Delete</button>
      </div>
    </div>
  );
}
