import { useEffect, useState } from "react";

export default function ListItem() {
  const [list, setList] = useState([]);
  const url = "http://localhost:8080/api/food/getAll";

  useEffect(() => {
    const fetchData = async () => {
      const list = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      console.log(list.data.content);
      setList(list.data.content);
    };
    fetchData();
  }, []);
  return (
    <>
      <ul>
        {list.map((ele) => (
          <li key={ele.id}>{ele.foodName}</li>
        ))}
      </ul>
    </>
  );
}
