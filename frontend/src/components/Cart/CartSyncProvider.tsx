import {
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { API_BASE_URL } from "@/config/env";
import { AuthContext } from "@/contexts/authContextValue";
import { useCartStore, type CartItem } from "@/stores/cart.store";
import { CartConflictModal } from "./CartConflictModal";

type ApiCartItem = {
  productId: string;
  quantity: number;
  product: {
    id: string;
    sku: string;
    name: string;
    price: number;
    discount: number;
    image: string;
  };
};

function areCartItemsEqual(
  localItems: CartItem[],
  serverItems: CartItem[],
): boolean {
  if (localItems.length !== serverItems.length) return false;

  const normalize = (items: CartItem[]) =>
    [...items]
      .map((item) => ({ id: item.id, quantity: item.quantity }))
      .sort((first, second) => first.id.localeCompare(second.id));

  const normalizedLocalItems = normalize(localItems);
  const normalizedServerItems = normalize(serverItems);

  return normalizedLocalItems.every(
    (item, index) =>
      item.id === normalizedServerItems[index].id &&
      item.quantity === normalizedServerItems[index].quantity,
  );
}

export function CartSyncProvider({ children }: { children: ReactNode }) {
  const auth = useContext(AuthContext);
  const [serverItems, setServerItems] = useState<CartItem[]>([]);
  const [showConflictModal, setShowConflictModal] = useState(false);
  const wasAuthenticated = useRef<boolean | null>(null);

  const fetchServerItems = async (): Promise<CartItem[]> => {
    const response = await fetch(`${API_BASE_URL}/cart/sync`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Não foi possível sincronizar o carrinho.");
    }

    const cart = (await response.json()) as { items?: ApiCartItem[] };
    return (cart.items ?? []).map<CartItem>((item) => ({
      id: item.productId || item.product.id,
      sku: item.product.sku,
      name: item.product.name,
      price: item.product.price,
      discount: item.product.discount,
      image: item.product.image,
      quantity: item.quantity,
    }));
  };

  const saveItemToServer = async (item: CartItem): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/cart/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ productId: item.id, quantity: item.quantity }),
    });

    if (!response.ok) {
      throw new Error("Não foi possível salvar o item no carrinho.");
    }
  };

  const replaceServerCart = async (
    currentServerItems: CartItem[],
    localItems: CartItem[],
  ): Promise<void> => {
    await Promise.all(
      currentServerItems.map(async (item) => {
        const response = await fetch(`${API_BASE_URL}/cart/items/${item.id}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Não foi possível limpar o carrinho da conta.");
        }
      }),
    );

    await Promise.all(localItems.map(saveItemToServer));
  };

  const syncCart = useCallback(async (): Promise<void> => {
    const currentServerItems = await fetchServerItems();
    const currentLocalItems = useCartStore.getState().items;

    if (areCartItemsEqual(currentLocalItems, currentServerItems)) {
      useCartStore.setState({ items: currentServerItems });
      setShowConflictModal(false);
    } else if (
      currentLocalItems.length === 0 &&
      currentServerItems.length > 0
    ) {
      useCartStore.setState({ items: currentServerItems });
    } else if (
      currentLocalItems.length > 0 &&
      currentServerItems.length === 0
    ) {
      await Promise.all(currentLocalItems.map(saveItemToServer));
    } else if (currentLocalItems.length > 0 && currentServerItems.length > 0) {
      setServerItems(currentServerItems);
      setShowConflictModal(true);
    }
  }, []);

  useEffect(() => {
    if (auth?.loading) return;

    if (auth?.isAuthenticated) {
      wasAuthenticated.current = true;
      startTransition(() => {
        void syncCart().catch((error: unknown) => {
          console.error("Erro ao sincronizar carrinho:", error);
        });
      });
      return;
    }

    const isLogout = wasAuthenticated.current === true;
    wasAuthenticated.current = false;

    if (isLogout) {
      useCartStore.getState().clearCart();
      localStorage.removeItem("cart-storage");
    }

    startTransition(() => {
      setServerItems([]);
      setShowConflictModal(false);
    });
  }, [auth?.isAuthenticated, auth?.loading, syncCart]);

  const handleKeepLocal = async (): Promise<void> => {
    try {
      await replaceServerCart(serverItems, useCartStore.getState().items);
      setShowConflictModal(false);
    } catch (error) {
      console.error("Erro ao manter o carrinho local:", error);
    }
  };

  const handleKeepServer = (): void => {
    useCartStore.setState({ items: serverItems });
    setShowConflictModal(false);
  };

  return (
    <>
      {children}
      <CartConflictModal
        isOpen={showConflictModal}
        onKeepLocal={handleKeepLocal}
        onKeepServer={handleKeepServer}
      />
    </>
  );
}
