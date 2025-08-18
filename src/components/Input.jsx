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

export function Button({ type = "submit", children, onClick }) {
  return (
    <button type={type} onClick={onClick}>
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

export function SelectInput({ name, value, options, changeFun }) {
  return (
    <div className="input-container">
      {name && (
        <label htmlFor={name}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </label>
      )}
      <select
        onChange={(e) => changeFun(e.target.value)}
        id={name}
        name={name}
        value={value}
        required
      >
        <option value={""}>-- Select {name} --</option>
        {options.map((val) => (
          <option key={val} value={val}>
            {val}
          </option>
        ))}
      </select>
    </div>
  );
}
