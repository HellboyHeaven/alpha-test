import type { Product } from './types/product';

export interface Store {
  products: Product[];
  likedIds: Set<number>;
  currentPage: number;
  searchQuery: string;
  categoryFilter: string;
  setProducts: (products: Product[]) => void;
  toggleLike: (id: number) => void;
  deleteProduct: (id: number) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  setCurrentPage: (page: number) => void;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string) => void;
}
