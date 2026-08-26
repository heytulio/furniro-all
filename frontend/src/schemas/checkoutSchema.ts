import { z } from "zod";

export const checkoutSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  companyName: z.string().optional(),
  zipCode: z
    .string()
    .min(8, "ZIP Code must have at least 8 digits")
    .transform((val) => val.replace(/\D/g, "")),
  countryRegion: z.string().min(1, "Country/Region is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  townCity: z.string().min(1, "Town/City is required"),
  province: z.string().min(1, "Province is required"),
  addonAddress: z.string().optional(),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  additionalInfo: z.string().optional(),
  paymentMethod: z.enum(["direct_bank", "cod"], {
    message: "Payment method is required",
  }),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
