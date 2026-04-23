import SidebarFilter from "../components/SidebarFilter";
import ProductCard from "../components/ProductCard";
import { useProduct } from "../context/ProductContext";

export default function Home() {
  const { products, setSearch } = useProduct();
  return (
    <>
      <div className="search-box">
        <input
          placeholder="Search By Name"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="container">
        <SidebarFilter />

        <div className="products">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </>
  );
}
