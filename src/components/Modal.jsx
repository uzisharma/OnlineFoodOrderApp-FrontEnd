import { useEffect, useState } from "react";
import "./style/Modal.css";

export default function Modal({ isOpen, onClose, title, content, url }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log(data);
        setData(data?.data?.content);
      } catch (error) {
        console.error("failed to fetch data", error);
      }
    };
    fetchData();
  }, [url]);

  if (!isOpen) return null; // Don't render if closed
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
        </header>
        <div className="modal-body">
          <ul>
            {content.map((food) => (
              <li key={food.id}>{food.foodName}</li>
            ))}
          </ul>
          <ol>
            {data.map((ele) => (
              <li key={ele.id}>{ele.foodName}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
