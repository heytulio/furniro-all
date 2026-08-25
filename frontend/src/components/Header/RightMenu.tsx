import clsx from "clsx";
import { Link } from "react-router";
import { useCartStore } from "../../stores/cart.store";
import { useAuth } from "@/contexts/useAuth";
import { UserDropdown } from "./UserDropdown";

type RightMenuProps = {
  className?: string;
};

const LinkHover = "hover:cursor-pointer hover:scale-110 transition";

const RightMenu = ({ className }: RightMenuProps) => {
  const { isAuthenticated } = useAuth();
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

      <Link to="/cart" className={clsx(LinkHover, "relative")}>
        <img
          src="/Icons/shop.svg"
          alt="Ícone de carrinho de compras"
          className="max-h-[22.05px]"
        />
        {totalItems > 0 && (
          <span
            className={clsx(
              "absolute -top-3 -right-3",
              "w-4.5 h-4.5",
              "rounded-full",
              "bg-over-secundary",
              "text-white text-xs font-bold",
              "flex justify-center items-center",
            )}
          >
            {totalItems}
          </span>
        )}
      </Link>
    </div>
  );
};

export default RightMenu;
