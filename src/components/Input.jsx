import "./Input.css";

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
      {name && <label htmlFor={name}>{placeholder}</label>}
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

export function Button({ type = "submit", label, onClick }) {
  return (
    <button type={type} onClick={onClick}>
      {label}
    </button>
  );
}
