import { useProduct } from "../context/ProductContext";

export default function SidebarFilter() {
  const { setCategory, setPrice } = useProduct();

  return (
    <div className="sidebar">
      <h3>Filter</h3>

      {/* PRICE */}
      <p>Price</p>
      <input
        type="range"
        min="0"
        max="10000"
        onChange={(e) => setPrice(Number(e.target.value))}
      />

      {/* CATEGORY */}
      <h3>Category</h3>

      <div>
        <input
          type="radio"
          name="category"
          onChange={() => setCategory("men's clothing")}
        />
        Men's Clothing
      </div>

      <div>
        <input
          type="radio"
          name="category"
          onChange={() => setCategory("women's clothing")}
        />
        Women's Clothing
      </div>

      <div>
        <input
          type="radio"
          name="category"
          onChange={() => setCategory("jewelery")}
        />
        Jewelery
      </div>

      <div>
        <input
          type="radio"
          name="category"
          onChange={() => setCategory("electronics")}
        />
        Electronics
      </div>

      <div>
        <input
          type="radio"
          name="category"
          onChange={() => setCategory("all")}
        />
        All
      </div>
    </div>
  );
}
