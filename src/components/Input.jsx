import "./style/Input.css";

export default function Input({
  type = "text",
  placeholder,
  name,
  changeFun,
  value,
}) {
  const textChange = (e) => {
    changeFun(e.target.value);
  };
  return (
    <div className="input-container">
      {name && (
        <label htmlFor={name}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
        onChange={textChange}
        value={value}
        required
      />
    </div>
  );
}

export function Button({ type = "submit", children, onClick, state }) {
  return (
    <button type={type} onClick={onClick} disabled={state}>
      {children}
    </button>
  );
}

export function CheckboxInput({ children, onChange }) {
  return (
    <label className="checkbox-label">
      {children}
      <input type="checkbox" onChange={onChange} />
    </label>
  );
}

export function SelectInput({ label, value, options, onChange }) {
  return (
    <div className="input-container">
      {label && <label>{label}</label>}
      <select value={value} onChange={(e) => onChange(e.target.value)} required>
        <option value="">-- Select {label} --</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}