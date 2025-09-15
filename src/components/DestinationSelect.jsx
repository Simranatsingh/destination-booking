export default function DestinationSelect({
  destinations,
  selected,
  onChange,
}) {
  return (
    <div>
      <h3>Select Destination</h3>
      <select
        style={{ padding: "8px", width: "100%", fontSize: "1em" }}
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">-- Select Destination --</option>
        {destinations.map((dest) => (
          <option key={dest._id} value={dest._id}>
            {dest.name}
          </option>
        ))}
      </select>
    </div>
  );
}
