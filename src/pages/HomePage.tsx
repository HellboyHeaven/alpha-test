import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import ProductListView from '../components/ProductListView';
import { useProductStore } from '../store/useProductStore';
import { useNavigate } from 'react-router-dom';



export default function HomePage() {
  const [filter, setFilter] = useState<'all' | 'liked'>('all');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const {products, setProducts} = useProductStore();
  
  const nav = useNavigate();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Failed to fetch products:', err));
    
  }, []);

  const handleCardClick = (id: number) => {
    setSelectedId(id);
    
  };
  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Product Store</h1>
            <div className="flex gap-4">
                <button
                  onClick={() => nav('/create-product')}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  <Plus size={20} />
                  Create Product
                </button>
              </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
         <>
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-lg font-medium ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-400 hover:bg-gray-100'}`}
              >
                All Products
              </button>
              <button
                onClick={() => setFilter('liked')}
                className={`px-6 py-2 rounded-lg font-medium ${filter === 'liked' ? 'bg-blue-600 text-white' : 'bg-white text-gray-400 hover:bg-gray-100'}`}
              >
                Favorites
              </button>
            </div>
            
            <ProductListView filter={filter} />
          </>
      </main>
    </div>
  );
}