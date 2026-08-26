import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  checkoutSchema,
  type CheckoutFormData,
} from "@/schemas/checkoutSchema";
import { useCartStore } from "@/stores/cart.store";
import { BillingDetails } from "@/components/BillingDetails";
import { OrderSummary } from "@/components/OrderSummary";

function Checkout() {
  const clearCart = useCartStore((state) => state.clearCart);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    watch,
    reset,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      countryRegion: "Brasil",
    },
  });

  const onSubmit = () => {
    toast.success("Order placed successfully!");
    clearCart();
    reset({ countryRegion: "Brasil" });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <BillingDetails
              register={register}
              errors={errors}
              setValue={setValue}
              trigger={trigger}
            />
          </div>

          <div className="lg:col-span-5">
            <OrderSummary register={register} errors={errors} watch={watch} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
