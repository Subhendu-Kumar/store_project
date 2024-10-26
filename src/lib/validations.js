import { z } from "zod";

/*---------- Auth ----------*/
export const signupSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  storeName: z.string().optional(),
});

/*---------- Warehouse ----------*/
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

/*---------- Category ----------*/
export const categorySchema = z.object({
  categoryName: z.string().min(1, { message: "Category name is required" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(500, { message: "Description should not exceed 500 characters" }),
  active: z.boolean(),
});

/*---------- Product ----------*/
export const productSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  categoryId: z.string().min(1, "Category is required"),
  actualPrice: z
    .string()
    .regex(
      /^\d{1,6}(\.\d{1,2})?$/,
      "Actual price must be a number with up to 6 digits and optionally 2 decimal places"
    )
    .refine((val) => parseFloat(val) > 0, {
      message: "Actual price must be greater than 0",
    }),
  discountedPrice: z
    .string()
    .regex(
      /^\d{1,6}(\.\d{1,2})?$/,
      "Discounted price must be a number with up to 6 digits and optionally 2 decimal places"
    )
    .optional(),
  productDesc: z.string().optional(),
  weight: z
    .string()
    .regex(
      /^\d{1,6}(\.\d{1,2})?$/,
      "Weight must be a number with up to 6 digits and optionally 2 decimal places"
    )
    .refine((val) => parseFloat(val) >= 0, {
      message: "Weight must be greater than or equal to 0",
    }),
  hsnCode: z.string().optional(),
  photoPublicId: z.array(z.string()).max(6, "Maximum of 6 images allowed"),
  inventoryList: z
    .record(z.string(), z.number().nonnegative("Quantity must be positive"))
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one inventory is required",
    }),
});
