import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { warehouseSchema } from "@/lib/validations";

const AddWarehouse = ({
  open,
  setOpen,
  setErrors,
  errors,
  setFormData,
  formData,
  submitWarehouseData,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const validation = warehouseSchema.safeParse(formData);
    if (!validation.success) {
      const formErrors = validation.error.format();
      setErrors(formErrors);
    } else {
      setErrors({});
      console.log("Form submitted:", formData);
      submitWarehouseData();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[50rem]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-sans font-medium">
            Add warehouse
          </DialogTitle>
        </DialogHeader>
        <div className="w-full h-auto flex flex-col items-center justify-center gap-3">
          <div className="w-full h-auto flex flex-col items-start justify-start gap-1">
            <p>Warehouse Name</p>
            <Input
              name="warehouseName"
              type="text"
              className={`border-gray-500 h-10 ${
                errors.warehouseName ? "border-red-500" : ""
              }`}
              placeholder="Enter warehouse name"
              value={formData.warehouseName}
              onChange={handleInputChange}
            />
            {errors.warehouseName && (
              <p className="text-red-500">{errors.warehouseName._errors[0]}</p>
            )}
          </div>
          <div className="w-full h-auto flex items-center justify-center gap-4">
            <div className="w-[50%] h-auto flex flex-col items-start justify-start gap-1">
              <p>Contact Person</p>
              <Input
                name="contactPerson"
                type="text"
                className={`border-gray-500 h-10 ${
                  errors.contactPerson ? "border-red-500" : ""
                }`}
                placeholder="Enter Contact Person"
                value={formData.contactPerson}
                onChange={handleInputChange}
              />
              {errors.contactPerson && (
                <p className="text-red-500">
                  {errors.contactPerson._errors[0]}
                </p>
              )}
            </div>
            <div className="w-[50%] h-auto flex flex-col items-start justify-start gap-1">
              <p>Mobile Number</p>
              <Input
                name="mobileNo"
                type="text"
                className={`border-gray-500 h-10 ${
                  errors.mobileNo ? "border-red-500" : ""
                }`}
                placeholder="Enter Mobile Number"
                value={formData.mobileNo}
                onChange={handleInputChange}
              />
              {errors.mobileNo && (
                <p className="text-red-500">{errors.mobileNo._errors[0]}</p>
              )}
            </div>
          </div>
          <div className="w-full h-auto flex items-center justify-center gap-4">
            <div className="w-[50%] h-auto flex flex-col items-start justify-start gap-1">
              <p>Flat, House no., Building, Company, Apartment</p>
              <Input
                name="flatHouseNo"
                type="text"
                className={`border-gray-500 h-10 ${
                  errors.flatHouseNo ? "border-red-500" : ""
                }`}
                placeholder="Enter Flat, House no., Building, Company, Apartment"
                value={formData.flatHouseNo}
                onChange={handleInputChange}
              />
              {errors.flatHouseNo && (
                <p className="text-red-500">{errors.flatHouseNo._errors[0]}</p>
              )}
            </div>
            <div className="w-[50%] h-auto flex flex-col items-start justify-start gap-1">
              <p>Area, Colony, Street, Sector, Village</p>
              <Input
                name="areaColony"
                type="text"
                className={`border-gray-500 h-10 ${
                  errors.areaColony ? "border-red-500" : ""
                }`}
                placeholder="Enter Area, Colony, Street, Sector, Village"
                value={formData.areaColony}
                onChange={handleInputChange}
              />
              {errors.areaColony && (
                <p className="text-red-500">{errors.areaColony._errors[0]}</p>
              )}
            </div>
          </div>
          <div className="w-full h-auto flex items-center justify-center gap-4">
            <div className="w-[50%] h-auto flex flex-col items-start justify-start gap-1">
              <p>Pin Code</p>
              <Input
                name="pinCode"
                type="text"
                className={`border-gray-500 h-10 ${
                  errors.pinCode ? "border-red-500" : ""
                }`}
                placeholder="Enter Pin Code"
                value={formData.pinCode}
                onChange={handleInputChange}
              />
              {errors.pinCode && (
                <p className="text-red-500">{errors.pinCode._errors[0]}</p>
              )}
            </div>
            <div className="w-[50%] h-auto flex flex-col items-start justify-start gap-1">
              <p>City</p>
              <Input
                name="city"
                type="text"
                className={`border-gray-500 h-10 ${
                  errors.city ? "border-red-500" : ""
                }`}
                placeholder="Enter City"
                value={formData.city}
                onChange={handleInputChange}
              />
              {errors.city && (
                <p className="text-red-500">{errors.city._errors[0]}</p>
              )}
            </div>
          </div>
          <div className="w-full h-auto flex items-center justify-start gap-4">
            <div className="w-[50%] h-auto flex flex-col items-start justify-start gap-1">
              <p>State</p>
              <Input
                name="state"
                type="text"
                className={`border-gray-500 h-10 ${
                  errors.state ? "border-red-500" : ""
                }`}
                placeholder="Enter State"
                value={formData.state}
                onChange={handleInputChange}
              />
              {errors.state && (
                <p className="text-red-500">{errors.state._errors[0]}</p>
              )}
            </div>
          </div>
          <div className="w-full h-auto flex items-center justify-between">
            <p>accept all terms and conditions</p>
            <button
              className="w-fit h-auto px-3 py-1 bg-orange-500 rounded-md text-lg font-sans font-medium text-white"
              onClick={handleSubmit}
            >
              Add warehouse
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddWarehouse;
