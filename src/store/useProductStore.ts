import { create } from "zustand";
import { type Product } from "../types/product";

interface Store {
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

export const useProductStore = create<Store>((set, _) => ({
  products: [],
  likedIds: new Set<number>(),
  currentPage: 1,
  searchQuery: "",
  categoryFilter: "all",

  setProducts: (products) =>
    set((state) => {
      const map = new Map<number, Product>();

      for (const p of products) map.set(p.id, p);
      for (const p of state.products) map.set(p.id, p);

      const merged = Array.from(map.values());

      merged.sort((a, b) => b.id - a.id); // 🔥 сортировка по id (DESC)

      return { products: merged };
    }),

  toggleLike: (id) =>
    set((state) => {
      const newSet = new Set(state.likedIds);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return { likedIds: newSet };
    }),

  deleteProduct: (id) =>
    set((state) => ({ products: state.products.filter((p) => p.id !== id) })),

  addProduct: (product) =>
    set((state) => {
      const exists = state.products.some((p) => p.id === product.id);

      if (exists) {
        return {
          products: state.products.map((p) =>
            p.id === product.id ? product : p
          ),
        };
      }
      return {
        products: [product, ...state.products],
      };
    }),

  updateProduct: (product) =>
    set((state) => {
      // const newSet = state.products.map(p => p.id === product.id ? product : p);
      const map = Array.from(
        new Map(
          state.products.map((p) => [p.id, p.id === product.id ? product : p])
        ).values()
      );
      return { products: Array.from(map.values()) };
    }),

  setCurrentPage: (page) => set({ currentPage: page }),

  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),

  setCategoryFilter: (category) =>
    set({ categoryFilter: category, currentPage: 1 }),
}));
