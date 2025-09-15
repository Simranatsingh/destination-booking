export default function HotelList({ hotels }) {
  if (!hotels.length) return <p>No hotels found for this destination.</p>;

  return (
    <div>
      {hotels.map((hotel) => (
        <div
          key={hotel._id}
          style={{
            background: "#fff",
            padding: 20,
            marginBottom: 20,
            borderRadius: 8,
            boxShadow: "0 4px 12px #eee",
          }}
        >
          <h2 style={{ margin: 0 }}>{hotel.name}</h2>
          <p>{hotel.address}</p>
          <p>
            Stars: {hotel.stars} | Rating: {hotel.rating} | Price From: $
            {hotel.priceFrom}
          </p>
          {hotel.roomTypes && (
            <div>
              <h4>Room Types</h4>
              <ul>
                {hotel.roomTypes.map((rt, idx) => (
                  <li key={idx}>
                    <strong>{rt.name}:</strong> ${rt.price} <br />
                    Facilities: {rt.facilities && rt.facilities.join(", ")}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {hotel.nearbyAttractions && (
            <div>
              <h4>Nearby Attractions</h4>
              <ul>
                {hotel.nearbyAttractions.map((na, idx) => (
                  <li key={idx}>
                    {na.name} ({na.distance})
                  </li>
                ))}
              </ul>
            </div>
          )}
          {hotel.photos && hotel.photos.length > 0 && (
            <div>
              <h4>Photos</h4>
              <div style={{ display: "flex", gap: 10 }}>
                {hotel.photos.map((photo, idx) => (
                  <img
                    key={idx}
                    src={photo.url || photo}
                    alt="Hotel"
                    style={{
                      width: 120,
                      height: 80,
                      objectFit: "cover",
                      borderRadius: 4,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
