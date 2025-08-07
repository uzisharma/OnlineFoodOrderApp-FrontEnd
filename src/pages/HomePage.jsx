import "./style/HomePage.css";

export default function HomePage() {
  return (
    <>
      <title>Home Page</title>
      <div className="homepage-container">
        <h1>Welcome to Online Food Order</h1>
        <h2>Order your favorite meals quickly and easily!</h2>
        <button className="start-order-btn">Start Ordering</button>
      </div>
    </>
  );
}
