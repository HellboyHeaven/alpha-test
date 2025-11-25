import { Heart, Trash2 } from "lucide-react";
import type { Product } from "../types/product";
import { useProductStore } from "../store/useProductStore";

type Props = {
  product: Product,
  onClick: () => void | Promise<void>;
}

function ProductCard({ product, onClick }: Props) {
  const { likedIds, toggleLike, deleteProduct } = useProductStore();
  const isLiked = likedIds.has(product.id);

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 h-14 text-black">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2 h-10">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-blue-600">${product.price}</span>
          <div className="flex gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); toggleLike(product.id); } }
              className={`p-2 rounded-full transition-colors ${isLiked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
            >
              <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); deleteProduct(product.id); } }
              className="p-2 rounded-full bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-600 transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

