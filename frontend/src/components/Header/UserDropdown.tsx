import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { User, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/useAuth";

export const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
  };
  return (
    <div
      className="relative inline-block text-left font-poppins"
      ref={dropdownRef}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 text-sm font-medium text-black transition-colors hover:text-[#B88E2F] focus:outline-none"
      >
        <User size={24} />
        <span>Hello, {user?.name?.split(" ")[0] || "Usuário"}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-3 w-48 rounded-md border border-[#E8D8C4] bg-white py-2 shadow-md animate-in fade-in zoom-in-95 duration-100">
          <Link
            to="/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-[#F9F1E7] hover:text-[#B88E2F]"
          >
            <User size={16} />
            Profile
          </Link>

          <hr className="my-1 border-gray-100" />

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
