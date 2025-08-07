import "./FoodSelector.css";

// FoodSelector.jsx

export default function FoodSelector({ selectedFood = [], onUpdate }) {
  const allFoods = [
    { id: 1, name: "Paneer Butter Masala" },
    { id: 2, name: "Dosa" },
    { id: 3, name: "Chole Bhature" },
    { id: 4, name: "Idli Sambar" },
  ];

  const toggleFood = (id) => {
    const updated = selectedFood.includes(id)
      ? selectedFood.filter((fid) => fid !== id)
      : [...selectedFood, id];
    onUpdate(updated);
  };

  return (
    <div className="food-selector">
      <h4>Available Food Items</h4>
      <ul>
        {allFoods.map((food) => (
          <li key={food.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedFood.includes(food.id)}
                onChange={() => toggleFood(food.id)}
              />
              {food.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
