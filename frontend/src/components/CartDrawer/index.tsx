import { formatPrice } from "@/utils/price";
import { XCircle } from "lucide-react";
import { Link } from "react-router";
import CartDrawerItem from "./CartDrawerItem";
import { useCartStore } from "../../stores/cart.store";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const discounts = useCartStore((s) => s.getTotalDiscount());
  const total = useCartStore((s) => s.getTotal());

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end font-poppins">
      <div
        className="fixed inset-0 bg-black/20 transition-opacity"
        onClick={closeCart}
      />

      <div className="relative z-10 flex h-full w-full max-w-104.25 flex-col bg-white p-7.5 shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between border-b border-[#D9D9D9] pb-6">
          <h2 className="font-montserrat text-2xl font-bold text-black">
            Shopping Cart
          </h2>
          <button
            onClick={closeCart}
            className="text-gray-400 transition hover:text-black cursor-pointer"
          >
            <img
              src="/Icons/CloseCart.svg"
              alt="Bag with a X inside"
              className="hover:cursor-pointer hover:scale-110 transition"
            />
          </button>
        </div>

        <div className="my-6 flex-1 overflow-y-auto space-y-5 pr-2">
          {items.length === 0 ? (
            <p className="py-10 text-center text-sm text-footer-gray">
              Your cart is empty.
            </p>
          ) : (
            items.map((item) => (
              <CartDrawerItem
                key={item.id}
                id={item.id}
                image={item.image}
                name={item.name}
                quantity={item.quantity}
                price={item.price}
                icon={XCircle}
              />
            ))
          )}
        </div>

        <div className="border-t border-[#D9D9D9] pt-6">
          <div className="mb-7 flex flex-col gap-2">
            {discounts > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-normal text-black">
                  Discounts:
                </span>
                <span className="text-sm font-semibold text-green-600">
                  - {formatPrice(discounts)}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-sm font-normal text-black">Subtotal:</span>
              <span className="text-sm font-semibold text-footer-gray">
                {formatPrice(subtotal)}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <span className="text-base font-bold text-black">Total:</span>
              <span className="text-base font-bold text-over-secundary">
                {formatPrice(total)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-6 border-t border-[#D9D9D9]">
            <Link
              to="/cart"
              onClick={closeCart}
              className="rounded-full border border-black px-7 py-1.5 text-xs text-black transition hover:bg-black hover:text-white"
            >
              Cart
            </Link>
            <Link
              to="/checkout"
              onClick={closeCart}
              className="rounded-full border border-black px-7 py-1.5 text-xs text-black transition hover:bg-black hover:text-white"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
