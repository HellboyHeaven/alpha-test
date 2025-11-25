import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";
import { useEffect } from "react";
import ProductDetailsView from "../components/ProductDetailsView";
import HomeBackButton from "../components/HomeBackButton";

export default function ProductPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { products, addProduct } = useProductStore();
  const product = products.find((p) => p.id === Number(id));

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => addProduct(data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Product not found</p>
        <button
          onClick={() => nav("/")}
          className="text-blue-600 hover:underline"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white items-center p-10 flex flex-col space-y-10">
      <ProductDetailsView id={Number(id)} />
      <HomeBackButton />
    </div>
  );
}
