import { useEffect, useState } from "react";
import "./style/Modal.css";
import { Button } from "./Input";

export default function Modal({
  isOpen,
  onClose,
  title,
  saveList,
  content,
  url,
}) {
  const [allItems, setAllItems] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  // Preselect IDs from the content prop
  useEffect(() => {
    setSelectedIds(content.map((ele) => ele.id));
  }, [content]);

  // Fetch API data and merge with content without losing API results
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await res.json();
        const fetchedItems = result?.data?.content || [];

        // Merge API + content without duplicates
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
  }, [url, content]);

  if (!isOpen) return null;

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

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
          {allItems.map((ele) => (
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
        </div>
        <Button onClick={() => saveList(selectedIds)} label={"Save Changes"} />
      </div>
    </div>
  );
}
