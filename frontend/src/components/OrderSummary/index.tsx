import type { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import type { CheckoutFormData } from "@/schemas/checkoutSchema";
import { formatPrice } from "@/utils/price";
import { useCartStore } from "@/stores/cart.store";

type OrderSummaryProps = {
  register: UseFormRegister<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
  watch: UseFormWatch<CheckoutFormData>;
};

export const OrderSummary = ({
  register,
  errors,
  watch,
}: OrderSummaryProps) => {
  const selectedPayment = watch("paymentMethod");
  const paymentField = register("paymentMethod");
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const total = useCartStore((state) => state.getTotal());

  return (
    <div className="flex flex-col gap-6 py-4">
      <div className="flex justify-between border-b pb-4">
        <span className="text-xl font-bold">Product</span>
        <span className="text-xl font-bold">Subtotal</span>
      </div>

      {items.map((item) => (
        <div key={item.id} className="flex justify-between text-sm">
          <span className="text-gray-500">
            {item.name}{" "}
            <strong className="font-semibold text-black">
              X {item.quantity}
            </strong>
          </span>
          <span className="font-medium">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      ))}

      <div className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span className="font-medium">{formatPrice(subtotal)}</span>
      </div>

      <div className="flex justify-between border-b pb-6 text-sm">
        <span>Total</span>
        <span className="text-xl font-bold text-[#B88E2F]">
          {formatPrice(total)}
        </span>
      </div>

      <div className="mt-2 flex flex-col gap-4">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="radio"
            value="direct_bank"
            {...paymentField}
            className="mt-1 accent-black"
          />
          <div>
            <span
              className={`text-sm font-medium ${selectedPayment === "direct_bank" ? "text-black" : "text-gray-400"}`}
            >
              Direct Bank Transfer
            </span>
            {selectedPayment === "direct_bank" && (
              <p className="mt-2 text-xs leading-relaxed text-gray-400">
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference.
              </p>
            )}
          </div>
        </label>

        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="radio"
            value="cod"
            {...paymentField}
            className="mt-1 accent-black"
          />
          <span
            className={`text-sm font-medium ${selectedPayment === "cod" ? "text-black" : "text-gray-400"}`}
          >
            Cash On Delivery
          </span>
        </label>

        {errors.paymentMethod?.message && (
          <span className="text-xs text-red-500">
            {errors.paymentMethod.message}
          </span>
        )}
      </div>

      <p className="mt-2 text-xs leading-relaxed text-gray-500">
        Your personal data will be used to support your experience throughout
        this website, to manage access to your account, and for other purposes
        described in our <strong className="text-black">privacy policy</strong>.
      </p>

      <div className="mt-4 flex justify-center">
        <button
          type="submit"
          className="rounded-xl border border-black px-16 py-3 text-sm font-normal transition-colors hover:bg-black hover:text-white"
        >
          Place order
        </button>
      </div>
    </div>
  );
};
