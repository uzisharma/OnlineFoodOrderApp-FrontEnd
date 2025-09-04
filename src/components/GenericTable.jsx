import "./style/GenericTable.css";

export default function GenericTable({ title, data }) {
  const colHeader = data.length > 0 ? Object.keys(data[0]) : [];
  const formatHeader = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const heading = title + "";

  return (
    <div className="generic-table">
      <header>
        <h2>{heading.charAt(0).toUpperCase() + heading.slice(1)}</h2>
      </header>
      <table>
        <thead>
          <tr>
            {colHeader.map((colName) => (
              <th key={colName}>{formatHeader(colName)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {colHeader.map((colName) => (
                <td key={colName}>{row[colName] ?? "N/A"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
