import { useEffect, useState } from "react";
import "./style/Modal.css";
import { Button } from "./Input";

export default function UnifiedModal({
  isOpen,
  onClose,
  mode, // "select" | "status"
  title,
  saveList,
  content = [],
  url,
  type, // for status mode: "success" | "error"
  message,
}) {
  const [allItems, setAllItems] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isClosing, setIsClosing] = useState(false);

  // Fetch data & set preselection in "select" mode
  useEffect(() => {
    if (mode !== "select" || !url) return;

    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          headers: { "Content-Type": "application/json" },
        });
        const result = await res.json();
        const fetchedItems = result?.data?.content || [];

        setAllItems(fetchedItems); // ✅ full fresh list
        setSelectedIds(content.map((ele) => ele.id)); // ✅ preselect after fetch
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, [url, content, mode]);

  // Smooth close handler
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 250); // match CSS animation time
  };

  if (!isOpen && !isClosing) return null;

  // Toggle select/unselect
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className={`modal-content ${isClosing ? "closing" : "opening"} ${
          mode === "status" ? type : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={handleClose}>
            ✖
          </button>
        </header>

        <div className="modal-body">
          {/* SELECT MODE */}
          {mode === "select" &&
            allItems.map((ele) => (
              <div key={ele.id} className="checkbox-item">
                <label>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(ele.id)}
                    onChange={() => toggleSelect(ele.id)}
                  />
                  {ele[`${title}Name`] || ele.name || `Item ${ele.id}`}
                </label>
              </div>
            ))}

          {/* STATUS MODE */}
          {mode === "status" && <p>{message}</p>}
        </div>

        {/* Footer buttons */}
        <div className="footer-btn">
          {mode === "select" && (
            <Button onClick={() => saveList(selectedIds)}>Save Changes</Button>
          )}
          {mode === "status" && <button onClick={handleClose}>OK</button>}
        </div>
      </div>
    </div>
  );
}
