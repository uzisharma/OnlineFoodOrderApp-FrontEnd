import { useState } from "react";
import { Button } from "./Input";

export default function UserCart() {
  const [cartItem] = useState(3);
  return (
    <>
      <Button type="reset">🛒 Cart{` ${cartItem}`}</Button>
    </>
  );
}
