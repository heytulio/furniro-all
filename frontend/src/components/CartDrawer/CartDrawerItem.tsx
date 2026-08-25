import type { LucideIcon } from "lucide-react";
import { formatPrice } from "@/utils/price";
import { getImage } from "../../lib/assets";
import { useCartStore } from "../../stores/cart.store";

type CartDrawerItemProps = {
  id: string;
  image: string;
  name: string;
  quantity: number;
  price: number;
  icon: LucideIcon;
};

const CartDrawerItem = ({
  id,
  image,
  name,
  quantity,
  price,
  icon: Icon,
}: CartDrawerItemProps) => {
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="flex items-center justify-between gap-4">
      <img
        src={getImage(image)}
        alt={name}
        className="h-26.25 w-26.25 rounded-[10px] object-cover bg-cart"
      />
      <div className="flex-1">
        <h3 className="font-normal text-black text-base">{name}</h3>
        <p className="mt-2 text-xs flex items-center gap-3">
          <span className="font-light">{quantity}</span>
          <span className="text-xs font-light">X</span>
          <span className="font-medium text-over-secundary">
            {formatPrice(price)}
          </span>
        </p>
      </div>
      <button
        type="button"
        aria-label={`Remove ${name}`}
        onClick={() => removeItem(id)}
        className="text-gray-400 transition hover:text-red-500 cursor-pointer"
      >
        <Icon size={20} />
      </button>
    </div>
  );
};

export default CartDrawerItem;
