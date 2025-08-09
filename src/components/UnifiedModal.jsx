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

  // Preselection for select mode
  useEffect(() => {
    if (mode === "select") {
      setSelectedIds(content.map((ele) => ele.id));
    }
  }, [content, mode]);

  // Fetch & merge in select mode
  useEffect(() => {
    if (mode !== "select" || !url) return;
    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          headers: { "Content-Type": "application/json" },
        });
        const result = await res.json();
        const fetchedItems = result?.data?.content || [];
        const merged = [
          ...content,
          ...fetchedItems.filter(
            (apiItem) => !content.some((c) => c.id === apiItem.id)
          ),
        ];
        setAllItems(merged);
      } catch (error) {
        console.error("failed to fetch data", error);
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
          {mode === "select" &&
            allItems.map((ele) => (
              <div key={ele.id} className="checkbox-item">
                <label>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(ele.id)}
                    onChange={() => toggleSelect(ele.id)}
                  />
                  {ele[`${title}Name`]}
                </label>
              </div>
            ))}

          {mode === "status" && <p>{message}</p>}
        </div>

        {mode === "select" && (
          <Button onClick={() => saveList(selectedIds)} label="Save Changes" />
        )}
        {mode === "status" && <button onClick={handleClose}>OK</button>}
      </div>
    </div>
  );
}
