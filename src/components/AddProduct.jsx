import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { z } from "zod";
import Files from "react-files";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { Textarea } from "./ui/textarea";
import { getStoreData } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { FaCameraRetro } from "react-icons/fa6";
import { productSchema } from "@/lib/validations";
import { getCategories, uploadMedia } from "@/api";
import { CLOUDINARY_BASE_URL, CLOUDINARY_KEY } from "@/config";
import { LazyLoadImage } from "react-lazy-load-image-component";

const AddProduct = ({
  open,
  errors,
  formData,
  setErrors,
  actionType,
  setFormData,
  onOpenChange,
  submitProductData,
  handleUpdateProduct,
  setOpenAddProductPerWarehouseDialog,
}) => {
  const { toast } = useToast();
  const [fetching, setFetching] = useState(false);
  const [categories, setCategories] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [store_id, setStore_id] = useState(getStoreData()?.id);

  const fetchCategories = async () => {
    setFetching(true);
    try {
      const res = await getCategories(store_id);
      if (res?.status === 200) {
        setCategories(res?.data);
      }
    } catch (error) {
      console.log("error fetching warehouses: ", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setStore_id(getStoreData()?.id);
  }, [store_id]);

  const handleFileChange = async (files) => {
    if (files.length === 0) return;
    const file = files[0];
    if (formData.photoPublicId.length >= 6) {
      console.log("Maximum of 6 images reached.");
      toast({
        title: "Maximun limit reached",
        description: "You can only upload 6 images",
        variant: "destructive",
      });
      return;
    }
    setUploadingImage(true);
    const mediaData = new FormData();
    mediaData.append("file", file);
    try {
      const res = await uploadMedia(mediaData);
      if (res?.status === 200) {
        const newPhotoPublicId = res?.data?.publicId;
        setFormData((prevData) => ({
          ...prevData,
          photoPublicId: [...prevData.photoPublicId, newPhotoPublicId],
        }));
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploadingImage(false);
    }
  };

  const calculateInventoryTotals = (inventoryList) => {
    const totalQuantity = Object.values(inventoryList).reduce(
      (acc, quantity) => acc + quantity,
      0
    );
    const totalRecords = Object.keys(inventoryList).length;
    return { totalQuantity, totalRecords };
  };

  const { totalQuantity, totalRecords } = calculateInventoryTotals(
    formData.inventoryList
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      categoryId: value,
    }));
  };

  const handleSubmit = () => {
    try {
      productSchema.parse(formData);
      console.log("Form data is valid:", formData);
      if (actionType === "create") {
        submitProductData();
      }
      if (actionType === "update") {
        handleUpdateProduct();
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors = err.errors.reduce((acc, error) => {
          acc[error.path[0]] = error.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[50rem] h-[40rem]">
        <DialogHeader className={"hidden"}>
          <DialogTitle />
        </DialogHeader>
        <div className="w-full h-full">
          <h1 className="text-xl font-sans font-medium hidden">
            {actionType === "create" && "Add product"}
            {actionType === "update" && "Update product"}
          </h1>
          <div className="w-full absolute h-[calc(100%-28px)] overflow-y-scroll left-0 bottom-0 flex flex-col items-start justify-start gap-3 px-6 pt-4 pb-8">
            <div className="w-full h-auto flex flex-col items-start justify-start gap-1 mt-3">
              <p>Product name</p>
              <Input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                className={`border-gray-500 h-10`}
                placeholder="Enter product name"
              />
              {errors.productName && (
                <p className="text-red-500">{errors.productName}</p>
              )}
            </div>
            <div className="w-full h-auto flex flex-col items-start justify-start gap-1">
              <p>Product Category</p>
              {categories?.length === 0 ? (
                <Button
                  variant={"outline"}
                  className="w-24 text-sm border-gray-500 h-10"
                  onClick={fetchCategories}
                >
                  {fetching ? "fetching" : "Get category"}
                </Button>
              ) : (
                <Select onValueChange={handleSelectChange}>
                  <SelectTrigger className="w-full border-gray-500 h-10">
                    <SelectValue placeholder="Select product category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((data, idx) => {
                      return (
                        <SelectItem key={idx} value={data.categoryId}>
                          {data.categoryName}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              )}
              {errors.categoryId && (
                <p className="text-red-500">{errors.categoryId}</p>
              )}
            </div>
            <div className="w-full h-auto flex items-center justify-center gap-4">
              <div className="w-[50%] h-auto flex flex-col items-start justify-start gap-1">
                <p>Price</p>
                <Input
                  type="text"
                  name="actualPrice"
                  value={formData.actualPrice}
                  onChange={handleInputChange}
                  className={`border-gray-500 h-10`}
                  placeholder="&#x20B9; Enter price"
                />
                {errors.actualPrice && (
                  <p className="text-red-500">{errors.actualPrice}</p>
                )}
              </div>
              <div className="w-[50%] h-auto flex flex-col items-start justify-start gap-1">
                <p>Discounted Price</p>
                <Input
                  type="text"
                  name="discountedPrice"
                  className={`border-gray-500 h-10`}
                  placeholder="&#x20B9; Enter discounted price"
                  value={formData.discountedPrice}
                  onChange={handleInputChange}
                />
                {errors.discountedPrice && (
                  <p className="text-red-500">{errors.discountedPrice}</p>
                )}
              </div>
            </div>
            <div className="w-full h-auto flex flex-col items-start justify-start gap-1">
              <p>Product description:</p>
              <Textarea
                name="productDesc"
                value={formData.productDesc}
                onChange={handleInputChange}
                placeholder="Enter category description"
                className={`min-h-20 max-h-60 border-gray-400`}
              />
              {errors.productDesc && (
                <p className="text-red-500">{errors.productDesc}</p>
              )}
            </div>
            <div className="w-full h-auto flex items-start flex-col justify-start">
              <h1>Product Media</h1>
              <p className="text-xs">
                Upload captivating images to make your product stand out.
              </p>
              <div className="w-full h-auto flex items-center justify-start gap-8 mt-2">
                <Files
                  multiple
                  clickable
                  accepts={[
                    "image/png",
                    "image/jpg",
                    "image/gif",
                    "image/bmp",
                    "image/jpeg",
                    "image/webp",
                    "image/svg+xml",
                  ]}
                  minFileSize={0}
                  maxFileSize={10000000}
                  className="files-dropzone"
                  onChange={handleFileChange}
                >
                  <button
                    className="w-16 h-16 bg-zinc-200 rounded-sm flex items-center justify-center flex-col disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={uploadingImage || actionType === "update"}
                  >
                    <FaCameraRetro className="text-2xl" />
                    <p className="text-xs font-sans font-medium">Upload</p>
                  </button>
                </Files>
                <div className="w-full h-auto flex items-center justify-start gap-2">
                  {formData?.photoPublicId.length !== 0 &&
                    formData?.photoPublicId?.map((publicId, idx) => {
                      return (
                        <div
                          key={idx}
                          className="w-16 h-16 rounded-sm overflow-hidden bg-gray-200"
                        >
                          <LazyLoadImage
                            alt="image"
                            wrapperProps={{
                              style: { transitionDelay: "1s" },
                            }}
                            className="w-full h-full object-cover object-center"
                            src={`${CLOUDINARY_BASE_URL}/${publicId}?_a=${CLOUDINARY_KEY}`}
                          />
                        </div>
                      );
                    })}
                  {uploadingImage && (
                    <Skeleton className="w-16 h-16 rounded-md" />
                  )}
                </div>
              </div>
            </div>
            <div className="w-full h-auto flex items-center justify-center gap-4">
              <div className="w-[50%] h-auto flex flex-col items-start justify-start gap-1">
                <p>Shipment Weight</p>
                <div className="flex items-center justify-start gap-1 w-full">
                  <Input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className={`border-gray-500 h-10 w-[90%]`}
                    placeholder="Eg. 1.2"
                  />
                  <h1 className="text-xl font-sans font-medium">Kg</h1>
                </div>
                {errors.weight && (
                  <p className="text-red-500">{errors.weight}</p>
                )}
              </div>
              <div className="w-[50%] h-auto flex flex-col items-start justify-start gap-1">
                <p>HSN Code</p>
                <Input
                  type="text"
                  name="hsnCode"
                  value={formData.hsnCode}
                  onChange={handleInputChange}
                  className={`border-gray-500 h-10`}
                  placeholder="Enter the HSN Code"
                />
                {errors.hsnCode && (
                  <p className="text-red-500">{errors.hsnCode}</p>
                )}
              </div>
            </div>
            <div className="w-full h-auto flex flex-col items-start justify-start gap-1">
              <p>Add quantity of product per warehouse</p>
              <button
                onClick={() => setOpenAddProductPerWarehouseDialog(true)}
                className="w-1/2 h-10 border border-gray-500 rounded-md"
              >
                {totalRecords === 0
                  ? "Add/Edit"
                  : `(Total ${totalQuantity} in ${totalRecords} warehouse)`}
              </button>
              {errors.inventoryList && (
                <p className="text-red-500">{errors.inventoryList}</p>
              )}
            </div>
            <div className="w-full flex items-center justify-between mt-4">
              <p>accept all terms & conditions</p>
              <Button onClick={handleSubmit}>
                {actionType === "create" && "Add product"}
                {actionType === "update" && "Update product"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddProduct;
