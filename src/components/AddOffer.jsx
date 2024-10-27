import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { offerSchema } from "@/lib/validations";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

const AddOffer = ({
  open,
  errors,
  formData,
  setErrors,
  setFormData,
  onOpenChange,
  handleSubmitOffer,
}) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    const result = offerSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors(formattedErrors);
    } else {
      setErrors({});
      console.log("Form submitted successfully:", result.data);
      handleSubmitOffer();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[50rem] h-[40rem]">
        <DialogHeader className={"hidden"}>
          <DialogTitle />
        </DialogHeader>
        <div className="w-full h-full">
          <h1 className="text-xl font-sans font-medium hidden">Add Offers</h1>
          <div className="w-full absolute h-[calc(100%-28px)] overflow-y-scroll left-0 bottom-0 flex flex-col items-start justify-start gap-3 px-6 pt-4 pb-8">
            <div className="w-full h-auto flex flex-col items-start justify-start gap-6">
              <h2 className="text-xl font-semibold">Add New Offer</h2>
              <div className="w-full h-auto flex flex-col items-start justify-start gap-1">
                <label
                  htmlFor="offerName"
                  className="block text-sm font-medium "
                >
                  Offer Name
                </label>
                <Input
                  type="text"
                  id="offerName"
                  name="offerName"
                  onChange={handleChange}
                  placeholder="Offer Name"
                  value={formData.offerName}
                  className="border-gray-400 h-10"
                />
                {errors.offerName && (
                  <span className="text-red-500">
                    {errors.offerName._errors[0]}
                  </span>
                )}
              </div>
              <div className="w-full h-auto flex flex-col items-start justify-start gap-1">
                <label
                  htmlFor="offerCode"
                  className="block text-sm font-medium "
                >
                  Offer Code
                </label>
                <Input
                  type="text"
                  id="offerCode"
                  name="offerCode"
                  onChange={handleChange}
                  placeholder="Offer Code"
                  value={formData.offerCode}
                  className="border-gray-400 h-10"
                />
                {errors.offerCode && (
                  <span className="text-red-500">
                    {errors.offerCode._errors[0]}
                  </span>
                )}
              </div>
              <div className="flex w-full h-auto items-center justify-start gap-4">
                <label
                  className={`p-4 border rounded-lg cursor-pointer flex items-center ${
                    formData.offerType === "PERCENTAGE_DISCOUNT"
                      ? "border-blue-500 shadow-md"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.offerType === "PERCENTAGE_DISCOUNT"}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        offerType: "PERCENTAGE_DISCOUNT",
                      })
                    }
                    className="hidden"
                  />
                  <span
                    className={`w-4 h-4 mr-2 rounded-full border-2 flex items-center justify-center ${
                      formData.offerType === "PERCENTAGE_DISCOUNT"
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-400"
                    }`}
                  >
                    {formData.offerType === "PERCENTAGE_DISCOUNT" && (
                      <span className="w-2 h-2 bg-white rounded-full"></span>
                    )}
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Percentage Discount
                    </h3>
                    <p className="text-sm text-gray-500">
                      E.g. Get <span className="font-semibold">50% off</span> by
                      using GET50
                    </p>
                  </div>
                </label>
                <label
                  className={`p-4 border rounded-lg cursor-pointer flex items-center ${
                    formData.offerType === "FLAT_AMOUNT_DISCOUNT"
                      ? "border-blue-500 shadow-md"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.offerType === "FLAT_AMOUNT_DISCOUNT"}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        offerType: "FLAT_AMOUNT_DISCOUNT",
                      })
                    }
                    className="hidden"
                  />
                  <span
                    className={`w-4 h-4 mr-2 rounded-full border-2 flex items-center justify-center ${
                      formData.offerType === "FLAT_AMOUNT_DISCOUNT"
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-400"
                    }`}
                  >
                    {formData.offerType === "FLAT_AMOUNT_DISCOUNT" && (
                      <span className="w-2 h-2 bg-white rounded-full"></span>
                    )}
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Flat Amount Discount
                    </h3>
                    <p className="text-sm text-gray-500">
                      E.g. Get <span className="font-semibold">₹250 off</span>{" "}
                      by using GET250
                    </p>
                  </div>
                </label>
                {errors.offerType && (
                  <span className="text-red-500">
                    {errors.offerType._errors[0]}
                  </span>
                )}
              </div>
              {formData.offerType === "PERCENTAGE_DISCOUNT" && (
                <div className="w-full h-auto flex flex-col items-start justify-start gap-1">
                  <label
                    htmlFor="percentageValue"
                    className="block text-sm font-medium "
                  >
                    Percentage Value
                  </label>
                  <Input
                    type="text"
                    name="percentageValue"
                    id="percentageValue"
                    value={formData.percentageValue}
                    onChange={handleChange}
                    placeholder="Percentage Value"
                    className="border-gray-400 h-10"
                  />
                  {errors.percentageValue && (
                    <span className="text-red-500">
                      {errors.percentageValue._errors[0]}
                    </span>
                  )}
                </div>
              )}
              {formData.offerType === "FLAT_AMOUNT_DISCOUNT" && (
                <div className="w-full h-auto flex flex-col items-start justify-start gap-1">
                  <label
                    htmlFor="flatAmountValue"
                    className="block text-sm font-medium "
                  >
                    Flat Amount Value
                  </label>
                  <Input
                    type="text"
                    name="flatAmountValue"
                    id="flatAmountValue"
                    value={formData.flatAmountValue}
                    onChange={handleChange}
                    placeholder="Flat Amount Value"
                    className="border-gray-400 h-10"
                  />
                  {errors.flatAmountValue && (
                    <span className="text-red-500">
                      {errors.flatAmountValue._errors[0]}
                    </span>
                  )}
                </div>
              )}
              <div className="w-full h-auto flex flex-col items-start justify-start gap-1">
                <label
                  htmlFor="minimumPurchaseAmount"
                  className="block text-sm font-medium "
                >
                  Minimum Purchase Amount
                </label>
                <Input
                  type="text"
                  name="minimumPurchaseAmount"
                  id="minimumPurchaseAmount"
                  value={formData.minimumPurchaseAmount}
                  onChange={handleChange}
                  placeholder="Minimum Purchase Amount"
                  className="border-gray-400 h-10"
                />
                {errors.minimumPurchaseAmount && (
                  <span className="text-red-500">
                    {errors.minimumPurchaseAmount._errors[0]}
                  </span>
                )}
              </div>
              <div className="w-full h-auto flex flex-col items-start justify-start gap-1">
                <label
                  htmlFor="maximumDiscountAmount"
                  className="block text-sm font-medium "
                >
                  Maximum Discount Amount
                </label>
                <Input
                  type="text"
                  name="maximumDiscountAmount"
                  id="maximumDiscountAmount"
                  value={formData.maximumDiscountAmount}
                  onChange={handleChange}
                  placeholder="Maximum Discount Amount"
                  className="border-gray-400 h-10"
                />
                {errors.maximumDiscountAmount && (
                  <span className="text-red-500">
                    {errors.maximumDiscountAmount._errors[0]}
                  </span>
                )}
              </div>
              <div className="w-full h-auto flex flex-col items-start justify-start gap-1">
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium "
                >
                  Start Date
                </label>
                <Input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  placeholder="Start Date"
                  className="border-gray-400 h-10"
                />
                {errors.startDate && (
                  <span className="text-red-500">
                    {errors.startDate._errors[0]}
                  </span>
                )}
              </div>
              <div className="w-full h-auto flex flex-col items-start justify-start gap-1">
                <label htmlFor="endDate" className="block text-sm font-medium ">
                  End Date
                </label>
                <Input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  placeholder="End Date"
                  className="border-gray-400 h-10"
                />
                {errors.endDate && (
                  <span className="text-red-500">
                    {errors.endDate._errors[0]}
                  </span>
                )}
              </div>
              <div className="w-full h-auto flex flex-col items-start justify-start gap-1">
                <label
                  htmlFor="visibilityType"
                  className="block text-sm font-medium "
                >
                  Visibility Type
                </label>
                <Select
                  name="visibilityType"
                  id="visibilityType"
                  value={formData.visibilityType}
                  onValueChange={(value) =>
                    handleChange({ target: { name: "visibilityType", value } })
                  }
                >
                  <SelectTrigger className="w-full h-10 border-gray-400">
                    <SelectValue placeholder="Select Visibility Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VISIBLE_ON_STORE">
                      Visible on Store
                    </SelectItem>
                    <SelectItem value="HIDDEN_ON_STORE">
                      Hidden on Store
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.visibilityType && (
                  <span className="text-red-500">
                    {errors.visibilityType._errors[0]}
                  </span>
                )}
              </div>
              <div className="w-full h-auto flex flex-col items-start justify-start gap-1">
                <label
                  htmlFor="usageType"
                  className="block text-sm font-medium "
                >
                  Usage Type
                </label>
                <Select
                  name="usageType"
                  id="usageType"
                  value={formData.usageType}
                  onValueChange={(value) =>
                    handleChange({ target: { name: "usageType", value } })
                  }
                >
                  <SelectTrigger className="w-full h-10 border-gray-400">
                    <SelectValue placeholder="Select Usage Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ONLY_ONCE">Only Once</SelectItem>
                    <SelectItem value="CUSTOM">Custom</SelectItem>
                  </SelectContent>
                </Select>
                {errors.usageType && (
                  <span className="text-red-500">
                    {errors.usageType._errors[0]}
                  </span>
                )}
              </div>
              {formData.usageType === "CUSTOM" && (
                <div className="w-full h-auto flex flex-col items-start justify-start gap-1">
                  <label
                    htmlFor="usageLimit"
                    className="block text-sm font-medium"
                  >
                    Usage Limit
                  </label>
                  <Input
                    type="text"
                    name="usageLimit"
                    id="usageLimit"
                    value={formData.usageLimit}
                    onChange={handleChange}
                    placeholder="Usage Limit"
                    className="border-gray-400 h-10"
                  />
                  {errors.usageLimit && (
                    <span className="text-red-500">
                      {errors.usageLimit._errors[0]}
                    </span>
                  )}
                </div>
              )}
              <div className="w-full h-auto flex flex-col items-start justify-start gap-1">
                <label
                  htmlFor="customerType"
                  className="block text-sm font-medium "
                >
                  Customer Type
                </label>
                <Select
                  name="customerType"
                  id="customerType"
                  value={formData.customerType}
                  onValueChange={(value) =>
                    handleChange({ target: { name: "customerType", value } })
                  }
                >
                  <SelectTrigger className="w-full h-10 border-gray-400">
                    <SelectValue placeholder="Select Customer Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ANY_CUSTOMER">Any Customer</SelectItem>
                    <SelectItem value="FIRST_CUSTOMER">
                      First Customer
                    </SelectItem>
                    <SelectItem value="REPEAT_CUSTOMER">
                      Repeat Customer
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.customerType && (
                  <span className="text-red-500">
                    {errors.customerType._errors[0]}
                  </span>
                )}
              </div>
              <div className="w-full h-auto flex items-center justify-end mt-4">
                <Button onClick={handleSubmit}>Submit Offer</Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddOffer;
