import React from "react";

interface CartConflictModalProps {
  isOpen: boolean;
  onKeepLocal: () => void;
  onKeepServer: () => void;
}

export const CartConflictModal: React.FC<CartConflictModalProps> = ({
  isOpen,
  onKeepLocal,
  onKeepServer,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 font-poppins">
      <div className="w-full max-w-md rounded-lg border border-[#E8D8C4] bg-white p-6 shadow-xl">
        <h3 className="font-montserrat text-xl font-bold text-black">
          Carrinho Encontrado
        </h3>
        <p className="mt-3 text-sm text-gray-600">
          Você já possui itens salvos na sua conta e também adicionou itens
          nesta sessão. Qual carrinho você deseja manter?
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onKeepLocal}
            className="flex-1 rounded border border-black py-2.5 text-xs font-semibold text-black transition hover:bg-black hover:text-white"
          >
            Manter Itens Atuais
          </button>
          <button
            onClick={onKeepServer}
            className="flex-1 rounded bg-[#B88E2F] py-2.5 text-xs font-semibold text-white transition hover:opacity-90"
          >
            Manter Carrinho da Conta
          </button>
        </div>
      </div>
    </div>
  );
};
