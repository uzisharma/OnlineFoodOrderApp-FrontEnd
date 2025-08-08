import { useEffect, useState } from "react";
import "./style/NestedObj.css";

export default function NestedObj({ nestedObj, setNestedObj }) {
  const [allItems, setAllItems] = useState([]);

  const url = "http://localhost:8080/api/food/getAll";

  // Fetch all food items
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setAllItems(data.data.content); // Assuming this is an array of food items
      } catch (error) {
        console.error("Failed to fetch food items", error);
      }
    };
    fetchData();
  }, []);

  // Toggle handler: add or remove from nestedObj
  const onToggleHandler = (item) => {
    const exists = nestedObj.some((el) => el.id === item.id);

    if (exists) {
      // Remove
      setNestedObj((prev) => prev.filter((el) => el.id !== item.id));
    } else {
      // Add
      setNestedObj((prev) => [...prev, item]);
    }
  };

  // Check if item is selected
  const isChecked = (item) => nestedObj.some((el) => el.id === item.id);

  return (
    <div className="list-obj">
      <h3>All Food Items</h3>
      <ul>
        {allItems.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={isChecked(item)}
              onChange={() => onToggleHandler(item)}
            />
            {item.foodName}
          </li>
        ))}
      </ul>

      <h3>Selected Items (nestedObj)</h3>
      <ul>
        {nestedObj.map((item) => (
          <li key={item.id}>{item.foodName}</li>
        ))}
      </ul>
    </div>
  );
}
