import type { FocusEvent } from "react";
import type { UseFormRegister, FieldErrors, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import type { CheckoutFormData } from "@/schemas/checkoutSchema";
import toast from "react-hot-toast";

type BillingDetailsProps = {
  register: UseFormRegister<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
  setValue: UseFormSetValue<CheckoutFormData>;
  trigger: UseFormTrigger<CheckoutFormData>;
};

export const BillingDetails = ({
  register,
  errors,
  setValue,
  trigger,
}: BillingDetailsProps) => {
  const handleZipCodeBlur = async (e: FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");

    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
          toast.error("CEP não encontrado.");
          return;
        }

        setValue("countryRegion", "Brasil");
        setValue("streetAddress", data.logradouro || "");
        setValue("townCity", data.localidade || "");
        setValue("province", data.uf || "");

        trigger(["countryRegion", "streetAddress", "townCity", "province"]);
        toast.success("Endereço localizado com sucesso!");
      } catch {
        toast.error("Erro ao buscar o CEP.");
      }
    }
  };

  const inputClass = (error?: string) =>
    `w-full border rounded-md px-4 py-3 text-sm focus:outline-none transition-colors ${
      error ? "border-red-500" : "border-gray-300 focus:border-[#B88E2F]"
    }`;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="mb-2 text-2xl font-bold text-black">Billing details</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">First Name</label>
          <input
            {...register("firstName")}
            className={inputClass(errors.firstName?.message)}
          />
          {errors.firstName?.message && (
            <span className="text-xs text-red-500">
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Last Name</label>
          <input
            {...register("lastName")}
            className={inputClass(errors.lastName?.message)}
          />
          {errors.lastName?.message && (
            <span className="text-xs text-red-500">
              {errors.lastName.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Company Name (Optional)</label>
        <input {...register("companyName")} className={inputClass()} />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">ZIP code</label>
        <input
          {...register("zipCode")}
          onBlur={(e) => {
            register("zipCode").onBlur(e);
            handleZipCodeBlur(e);
          }}
          placeholder="00000-000"
          className={inputClass(errors.zipCode?.message)}
        />
        {errors.zipCode?.message && (
          <span className="text-xs text-red-500">
            {errors.zipCode.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Country / Region</label>
        <input
          {...register("countryRegion")}
          className={inputClass(errors.countryRegion?.message)}
        />
        {errors.countryRegion?.message && (
          <span className="text-xs text-red-500">
            {errors.countryRegion.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Street address</label>
        <input
          {...register("streetAddress")}
          className={inputClass(errors.streetAddress?.message)}
        />
        {errors.streetAddress?.message && (
          <span className="text-xs text-red-500">
            {errors.streetAddress.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Town / City</label>
        <input
          {...register("townCity")}
          className={inputClass(errors.townCity?.message)}
        />
        {errors.townCity?.message && (
          <span className="text-xs text-red-500">
            {errors.townCity.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Province</label>
        <input
          {...register("province")}
          className={inputClass(errors.province?.message)}
        />
        {errors.province?.message && (
          <span className="text-xs text-red-500">
            {errors.province.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Add-on address</label>
        <input {...register("addonAddress")} className={inputClass()} />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Email address</label>
        <input
          type="email"
          {...register("email")}
          className={inputClass(errors.email?.message)}
        />
        {errors.email?.message && (
          <span className="text-xs text-red-500">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Additional information</label>
        <textarea
          rows={3}
          {...register("additionalInfo")}
          placeholder="Additional information"
          className="resize-none rounded-md border border-gray-300 px-4 py-3 text-sm focus:border-[#B88E2F] focus:outline-none"
        />
      </div>
    </div>
  );
};
