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
export const productSchema = z
  .object({
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
        "Discounted price must be less than or equal toactual price"
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
  })
  .refine(
    (data) => {
      // Convert actualPrice and discountedPrice to numbers before comparison
      const actualPrice = parseFloat(data.actualPrice);
      const discountedPrice = data.discountedPrice
        ? parseFloat(data.discountedPrice)
        : undefined;
      return !discountedPrice || actualPrice >= discountedPrice;
    },
    {
      message: "Discounted price must be less than or equal to actual price",
      path: ["discountedPrice"],
    }
  );

/*---------- Store ----------*/
export const storeSchema = z.object({
  name: z.string().min(1, "Store name is required"),
  storeLink: z
    .string()
    .min(1, "Store link is required")
    .regex(/^\S*$/, "Store link can't contain spaces"),
  mobileNo: z
    .string()
    .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits")
    .optional(),
  ownerName: z.string().min(1, "Owner name is required"),
  storeEmail: z.string().email("Invalid email address"),
  country: z.string().optional(),
  storeAddress: z.string().optional(),
});

/*---------- Offer ----------*/
export const offerSchema = z.object({
  offerName: z.string().min(1, "Offer name is required"),
  offerCode: z.string().min(1, "Offer code is required"),
  offerType: z.enum(["PERCENTAGE_DISCOUNT", "FLAT_AMOUNT_DISCOUNT"]),
  percentageValue: z
    .string()
    .regex(/^(100|[1-9]?[0-9])$/)
    .optional(),
  flatAmountValue: z
    .string()
    .regex(/^\d+(\.\d+)?$/)
    .optional(),
  minimumPurchaseAmount: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Minimum purchase amount must be a valid number"),
  maximumDiscountAmount: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Maximum discount amount must be a valid number")
    .refine((value, ctx) => {
      const minPurchase = ctx?.parent.minimumPurchaseAmount;
      const percentValue = ctx?.parent.percentageValue;
      if (minPurchase !== undefined && percentValue !== undefined) {
        const minPurchaseNum = parseFloat(minPurchase);
        const percentValueNum = parseFloat(percentValue);
        const maxAllowedDiscount = (minPurchaseNum * percentValueNum) / 100;
        if (parseFloat(value) >= maxAllowedDiscount) {
          ctx?.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "Maximum discount amount must be less than the percentage of minimum purchase amount",
          });
          return false;
        }
      }
      return true;
    }),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  usageLimit: z
    .string()
    .regex(/^\d+$/, "Usage limit must be a valid integer")
    .optional(),
  visibilityType: z.enum(["VISIBLE_ON_STORE", "HIDDEN_ON_STORE"]),
  usageType: z.enum(["ONLY_ONCE", "CUSTOM"]),
  customerType: z.enum(["ANY_CUSTOMER", "FIRST_CUSTOMER", "REPEAT_CUSTOMER"]),
  active: z.boolean(),
});
