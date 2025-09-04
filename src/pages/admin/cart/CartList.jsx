import { useEffect, useState } from "react";
import { getAllCart } from "../../../service/cartService";
import "./CartList.css"; // 👈 add CSS file
import { useNavigate } from "react-router";
import { Button } from "../../../components/Input";
import Header from "../../../components/Header";

export default function CartList() {
  const [cartData, setCartData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const size = 10;

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getAllCart({
          page,
          size,
        });
        setCartData(data?.data?.content || []);
        setTotalPages(data?.data?.page?.totalPages || 0);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, [page]);

  // useEffect(() => {
  //   console.log(cartData);
  // }, [cartData]);

  const userCartDetails = (cartData) => {
    navigate(`/admin/cart/cart-details/userId/${cartData.userId}`, {
      state: cartData,
    });
  };

  return (
    <div className="cart-container">
      <Header heading={"User Cart Details"} />
      <div className="cart-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Restaurant ID</th>
              <th>User Name</th>
              <th>Total Cart Item</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {cartData.map((cart) => (
              <tr key={cart?.cartId} onClick={() => userCartDetails(cart)}>
                <td>{cart?.cartId}</td>
                <td>{cart?.userId}</td>
                <td>{cart?.userCartItem?.restaurantId}</td>
                <td>{cart?.userName}</td>
                <td>{cart?.userCartItem?.totalCartItem}</td>
                <td>{cart?.userCartItem?.cartPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* simple pagination */}
      <div className="pagination">
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <button
          disabled={page + 1 === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
