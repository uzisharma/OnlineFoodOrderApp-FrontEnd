import { useRole } from "../context/RoleContext";

export default function UserCart() {
  const { userDetails } = useRole();
  console.log(userDetails?.userCart?.cartItems);
  //   const data = userDetails?.userCart?.cartItems;
  return (
    <>
      <h2>This is user cart</h2>
      <div className="user-cart">{<UserCartList />}</div>
    </>
  );
}

export function UserCartList() {
  const { userDetails } = useRole();
  const data = userDetails?.userCart?.cartItems;
  return (
    <>
      {data?.map((fd) => (
        <div className="food-cart" key={fd.id}>
          <div>{fd?.food?.foodName}</div>
          <div>{fd?.quantity}</div>
          <div></div>
        </div>
      ))}
    </>
  );
}
