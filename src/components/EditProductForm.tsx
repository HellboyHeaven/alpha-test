import { useEffect, useState } from "react";
import { useProductStore } from "../store/useProductStore";

type Props = {
    id: number
    complete: () => void
}

export default function EditProductForm({ id, complete }: Props) {
  const { products, updateProduct } = useProductStore();
  const [editForm, setEditForm] = useState({
    title: "",
    price: "",
    description: "",
  });

  const product = products.find((p) => p.id === id)!;

  useEffect(() => {
    if (product) {
      setEditForm({
        title: product.title,
        price: product.price.toString(),
        description: product.description,
      });
    }
  }, [product]);
  const handleSave = () => {
    updateProduct({
      ...product,
      title: editForm.title,
      price: parseFloat(editForm.price),
      description: editForm.description,
    });
    complete();
  };
  return (
    <div className="space-y-4">
      <input
        type="text"
        value={editForm.title}
        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />
      <input
        type="number"
        step="0.01"
        value={editForm.price}
        onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />
      <textarea
        value={editForm.description}
        onChange={(e) =>
          setEditForm({ ...editForm, description: e.target.value })
        }
        rows={6}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save
        </button>
        <button
          onClick={complete}
          className="px-4 py-2 bg-gray-300 text-gray-400 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
