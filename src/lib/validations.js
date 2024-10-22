import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  storeName: z.string().optional(),
});

export const warehouseSchema = z.object({
  warehouseName: z.string().min(1, "Warehouse name is required"),
  contactPerson: z.string().min(1, "Contact person is required"),
  mobileNo: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits"),
  flatHouseNo: z.string().min(1, "Address (Flat/House No) is required"),
  areaColony: z.string().min(1, "Area/Colony is required"),
  pinCode: z.string().regex(/^\d{6}$/, "Pin code must be 6 digits"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
});
