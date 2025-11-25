import { useState } from "react";
import { Heart } from "lucide-react";
import { useProductStore } from "../store/useProductStore";
import EditProductForm from "./EditProductForm";

type Props = {
  id: number
}

export default function ProductDetailsView({ id }: Props) {
  const {
    products, likedIds, toggleLike
  } = useProductStore();

  const [isEditing, setIsEditing] = useState(false);

  const product = products.find((p) => p.id === id)!;
  const isLiked = likedIds.has(id);

  



  return (
    <div className="w-7xl ">
      <div className="bg-white rounded-lg">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
            <img
              src={product?.image}
              alt={product?.title}
              className="max-w-full max-h-96 object-contain" />
          </div>

          <div>
            {isEditing ? <EditProductForm id = {id} complete={() => setIsEditing(false)}/> : (
              <>
                <h1 className="text-3xl font-bold mb-4 text-black">{product.title}</h1>

                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-bold text-blue-600">${product.price}</span>
                  <button
                    onClick={() => toggleLike(product.id)}
                    className={`p-2 rounded-full ${isLiked ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"}`}
                  >
                    <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
                  </button>
                </div>

                <div className="mb-4">
                  <span className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {product.category}
                  </span>
                </div>

                {product.rating && (
                  <div className="mb-4 text-gray-600">
                    Rating: {product.rating.rate} ⭐ ({product.rating.count} reviews)
                  </div>
                )}

                <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Edit Product
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

