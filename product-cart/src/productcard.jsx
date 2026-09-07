function Productcard({ name, price, specs, stock }) {
  return (
    <div style={{ border: "2px solid red" }}>
      <p>Product name : {name}</p>
      <p>Product price : {price}</p>
      <p>Product specs : {specs}</p>
      <p>Product Stock : {stock}</p>
      <button>Buy Now</button>
      <button>Add to Cart</button>
    </div>
  );
}
export default Productcard;