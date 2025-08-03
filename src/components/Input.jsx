import "./Input.css";

export default function Input({ type = "text", placeholder, name, changeFun }) {
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
        required
      />
    </div>
  );
}

export function Button({ type = "submit", label }) {
  function handleClick() {
    // if (type != "submit" || type != "reset") {
    //   console.log("hello world");
    // }
    console.log("h");
  }

  return (
    <button type={type} onClick={handleClick}>
      {label}
    </button>
  );
}
