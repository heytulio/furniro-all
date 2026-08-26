import clsx from "clsx";
import { Link } from "react-router";
import { useCartStore } from "../../stores/cart.store";
import { useAuth } from "@/contexts/useAuth";
import { UserDropdown } from "./UserDropdown";
import { ShoppingCart } from "lucide-react";

type RightMenuProps = {
  className?: string;
};

const LinkHover = "hover:cursor-pointer hover:scale-110 transition";

const RightMenu = ({ className }: RightMenuProps) => {
  const { isAuthenticated } = useAuth();
  const openCart = useCartStore((s) => s.openCart);
  const totalItems = useCartStore((s) => s.getTotalItems());

  return (
    <div className={clsx("flex items-center gap-[40px]", className)}>
      {isAuthenticated ? (
        <UserDropdown />
      ) : (
        <Link to="/login" className={clsx(LinkHover, "relative")}>
          <img
            src="/Icons/alert.svg"
            alt="Ícone de perfil sem autenticação"
            className="max-h-6"
          />
        </Link>
      )}

      <button
        type="button"
        onClick={openCart}
        className="relative cursor-pointer transition hover:scale-105"
      >
        <ShoppingCart size={24} />
        {totalItems > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-over-secundary text-xs font-bold text-white">
            {totalItems}
          </span>
        )}
      </button>
    </div>
  );
};

export default RightMenu;
