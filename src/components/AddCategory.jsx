import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Switch } from "@/components/ui/switch";
import { categorySchema } from "@/lib/validations";
import { Textarea } from "@/components/ui/textarea";

const AddCategory = ({
  open,
  errors,
  formData,
  setErrors,
  setFormData,
  onOpenChange,
  submitCategoryData,
}) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    const result = categorySchema.safeParse(formData);
    if (!result.success) {
      const validationErrors = result.error.format();
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log("Form Data:", formData);
      submitCategoryData();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[40rem]">
        <DialogHeader>
          <DialogTitle>Add new category</DialogTitle>
        </DialogHeader>
        <div className="w-full h-auto flex flex-col items-center justify-center gap-4">
          <div className="w-full h-auto flex flex-col items-start justify-start gap-1">
            <p>Category name:</p>
            <Input
              type="text"
              name="categoryName"
              onChange={handleChange}
              value={formData.categoryName}
              placeholder="Enter category name"
              className={`w-full h-10 border-gray-400 ${
                errors.categoryName ? "border-red-500" : ""
              }`}
            />
            {errors?.categoryName && (
              <span className="text-red-500">
                {errors.categoryName?._errors?.[0]}
              </span>
            )}
          </div>
          <div className="w-full h-auto flex flex-col items-start justify-start gap-1">
            <p>Description:</p>
            <Textarea
              name="description"
              onChange={handleChange}
              value={formData.description}
              placeholder="Enter category description"
              className={`min-h-20 max-h-60 border-gray-400 ${
                errors.description ? "border-red-500" : ""
              }`}
            />
            {errors?.description && (
              <span className="text-red-500">
                {errors.description?._errors?.[0]}
              </span>
            )}
          </div>
          <div className="w-full h-auto flex items-center justify-between">
            <div className="flex items-center justify-center gap-2">
              <Switch
                name="active"
                checked={formData.active}
                onCheckedChange={(checked) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    active: checked,
                  }))
                }
              />
              <p>active</p>
            </div>
            <button
              onClick={handleSubmit}
              className="w-fit h-auto px-3 py-1 bg-orange-500 rounded-md text-lg font-sans font-medium text-white"
            >
              Add category
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategory;
