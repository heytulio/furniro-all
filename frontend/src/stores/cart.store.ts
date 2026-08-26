import type { Product } from "@/types/product";
import { calculateDiscount } from "@/utils/price";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartProduct = Pick<
  Product,
  "id" | "sku" | "name" | "price" | "discount" | "image"
>;

export interface CartItem extends CartProduct {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;

  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  addItem: (product: CartProduct, quantity?: number) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isEmpty: () => boolean;

  getItemQuantity: (id: string) => number;
  getItemSubtotal: (id: string) => number;
  getTotalDiscount: () => number;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id,
          );

          if (existingItem) {
            return {
              isOpen: true,
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
            };
          }

          return {
            isOpen: true,
            items: [...state.items, { ...product, quantity }],
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      increaseQuantity: (id) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }));
      },

      decreaseQuantity: (id) => {
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
            )
            .filter((item) => item.quantity > 0),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      isEmpty: () => get().items.length === 0,

      getItemQuantity: (id) => {
        return get().items.find((item) => item.id === id)?.quantity ?? 0;
      },

      getItemSubtotal: (id) => {
        const item = get().items.find((item) => item.id === id);
        return item ? item.price * item.quantity : 0;
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },

      getTotalDiscount: (): number => {
        return get().items.reduce((total, item) => {
          const discountPerUnit =
            item.price - calculateDiscount(item.price, item.discount);

          return total + discountPerUnit * item.quantity;
        }, 0);
      },

      getTotal: () => {
        return get().items.reduce(
          (total, item) =>
            total +
            calculateDiscount(item.price, item.discount) * item.quantity,
          0,
        );
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
