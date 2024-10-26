import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableCaption,
} from "@/components/ui/table";
import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  toogleProductActive,
} from "@/api";
import { FaEdit } from "react-icons/fa";
import Loader from "@/components/Loader";
import { MdDelete } from "react-icons/md";
import { getStoreData } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import AddProduct from "@/components/AddProduct";
import ProductIcon from "../../../public/product.png";
import DefaultScreen from "@/components/DefaultScreen";
import ConfirmDialog from "@/components/ConfirmDialog";
import { CLOUDINARY_BASE_URL, CLOUDINARY_KEY } from "@/config";
import AlertDialogLoader from "@/components/AlertDialogLoader";
import { LazyLoadImage } from "react-lazy-load-image-component";
import AddProductPerWarehouse from "@/components/AddProductPerWarehouse";

const AllProducts = () => {
  const { toast } = useToast();
  const [errors, setErrors] = useState({});
  const [products, setProducts] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionType, setActionType] = useState("create");
  const [store_id, setStore_id] = useState(getStoreData()?.id);
  const [loaderDialogTitle, setLoaderDialogTitle] = useState("");
  const [productIdToUpdate, setProductIdToUpdate] = useState("");
  const [productIdToDelete, setProductIdToDelete] = useState("");
  const [openAddProductDialog, setOpenAddProductDialog] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [
    openAddProductPerWarehouseDialog,
    setOpenAddProductPerWarehouseDialog,
  ] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    categoryId: "",
    actualPrice: "",
    discountedPrice: "",
    photoPublicId: [],
    inventoryList: {},
    weight: "",
    hsnCode: "",
    productDesc: "",
    active: true,
  });

  useEffect(() => {
    setStore_id(getStoreData()?.id);
  }, []);

  const fetchProducts = async () => {
    setFetching(true);
    try {
      const res = await getProducts(store_id);
      if (res?.status === 200) {
        setProducts(res?.data);
      }
    } catch (error) {
      console.log("error fetching products: ", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [store_id]);

  const handleAddProduct = () => {
    setActionType("create");
    setOpenAddProductDialog(true);
  };

  const submitProductData = async () => {
    setLoaderDialogTitle("Saving product data to server");
    setIsLoading(true);
    try {
      const res = await addProduct(store_id, formData);
      if (res.status === 201) {
        setProducts(res?.data);
        toast({
          title: "Success",
          description: "product created successfully",
        });
        fetchProducts();
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error while saving data to server",
        description: "Error while saving data to server",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setOpenAddProductDialog(false);
      setFormData({
        productName: "",
        categoryId: "",
        actualPrice: "",
        discountedPrice: "",
        photoPublicId: [],
        inventoryList: {},
        weight: "",
        hsnCode: "",
        productDesc: "",
        active: true,
      });
    }
  };

  const handleDeleteProduct = async () => {
    setLoaderDialogTitle("Deleting category from server");
    setIsLoading(true);
    try {
      const res = await deleteProduct(store_id, productIdToDelete);
      if (res?.status === 200) {
        toast({
          title: "Success",
          description: "product deleted successfully",
        });
        fetchProducts();
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error while deleting data from server",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setOpenConfirmationDialog(false);
    }
  };

  const handleToogleActive = async (productId) => {
    const toastId = toast({
      title: "Updating product status...",
      description: "Please wait while we update the product status.",
      loading: true,
    });
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, active: !product.active };
      }
      return product;
    });
    setProducts(updatedProducts);
    try {
      const product = products.find((p) => p.id === productId);
      const res = await toogleProductActive(store_id, productId, {
        active: !product?.active,
      });
      if (res?.status === 202 && res?.data) {
        const updatedProduct = res.data;
        const updatedProductList = products.map((prod) =>
          prod.id === updatedProduct.id ? updatedProduct : prod
        );
        setProducts(updatedProductList);
        toast({
          id: toastId,
          title: "Success",
          description: "Product status updated successfully",
        });
      } else {
        toast({
          id: toastId,
          title: "Error: Failed to update product status",
          variant: "destructive",
        });
        const revertedProducts = products.map((product) => {
          if (product.id === productId) {
            return { ...product, active: !product.active };
          }
          return product;
        });
        setProducts(revertedProducts);
      }
    } catch (error) {
      console.log("Error while updating product status:", error);
      toast({
        id: toastId,
        title: "Error: Failed to update product status",
        variant: "destructive",
      });
      const revertedProducts = products.map((product) => {
        if (product.id === productId) {
          return { ...product, active: !product.active };
        }
        return product;
      });
      setProducts(revertedProducts);
    }
  };

  const handleUpdateProduct = async () => {
    setLoaderDialogTitle("Updating product to server");
    setIsLoading(true);
    try {
      const res = await updateProduct(store_id, productIdToUpdate, formData);
      if (res?.status === 200) {
        toast({
          title: "Success",
          description: "product updated successfully",
        });
        fetchProducts();
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error while updating data to server",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setFormData({
        productName: "",
        categoryId: "",
        actualPrice: "",
        discountedPrice: "",
        photoPublicId: [],
        inventoryList: {},
        weight: "",
        hsnCode: "",
        productDesc: "",
        active: true,
      });
      setOpenAddProductDialog(false);
    }
  };

  const filteredProduct = products.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.productDesc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-auto">
      <AddProduct
        errors={errors}
        formData={formData}
        setErrors={setErrors}
        actionType={actionType}
        setFormData={setFormData}
        open={openAddProductDialog}
        submitProductData={submitProductData}
        onOpenChange={setOpenAddProductDialog}
        handleUpdateProduct={handleUpdateProduct}
        setOpenAddProductPerWarehouseDialog={
          setOpenAddProductPerWarehouseDialog
        }
      />
      <AlertDialogLoader
        open={isLoading}
        title={loaderDialogTitle}
        onOpenChange={setIsLoading}
      />
      <AddProductPerWarehouse
        store_id={store_id}
        formData={formData}
        setFormData={setFormData}
        open={openAddProductPerWarehouseDialog}
        onOpenChange={setOpenAddProductPerWarehouseDialog}
      />
      <ConfirmDialog
        action={handleDeleteProduct}
        open={openConfirmationDialog}
        onOpenChange={setOpenConfirmationDialog}
        title="This will permanently delete the product and remove all data from our servers."
      />
      {fetching ? (
        <div className="w-full h-96 flex items-center justify-center">
          <Loader />
        </div>
      ) : products?.length === 0 ? (
        <DefaultScreen
          img={ProductIcon}
          action={handleAddProduct}
          buttonText="Add new product"
          title="Add your products to the store"
          description=" Start selling by listing your products and sharing them on your social media."
        />
      ) : (
        <div className="w-full h-auto mt-6">
          <div className="w-full h-auto flex items-center justify-between">
            <Input
              type="text"
              value={searchQuery}
              placeholder="Search categories"
              className="w-[30%] h-10 border-gray-500"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={handleAddProduct}
              className="w-fit h-auto px-3 py-1 font-sans font-medium text-xl bg-orange-500 text-white rounded-sm"
            >
              Create new category
            </button>
          </div>
          <div className="w-full h-auto mt-6 rounded-sm">
            <Table>
              <TableCaption>A list of your recent categories</TableCaption>
              <TableHeader className="bg-zinc-100">
                <TableRow className="border-gray-600">
                  <TableHead className="w-[80px] text-lg font-sans font-medium text-black">
                    Sl no.
                  </TableHead>
                  <TableHead className="text-lg w-[80px] font-sans font-medium text-black">
                    Image
                  </TableHead>
                  <TableHead className="text-lg font-sans font-medium text-black">
                    product name
                  </TableHead>
                  <TableHead className="text-lg font-sans font-medium text-black">
                    description
                  </TableHead>
                  <TableHead className="text-lg font-sans font-medium text-black">
                    Status
                  </TableHead>
                  <TableHead className="text-right text-lg font-sans font-medium text-black">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProduct?.map((data, idx) => {
                  return (
                    <TableRow className="h-14 hover:bg-zinc-50" key={idx}>
                      <TableCell className="font-medium text-base font-sans text-black">
                        {idx + 1}
                      </TableCell>
                      <TableCell className="font-medium text-base font-sans text-black">
                        <div
                          key={idx}
                          className="w-12 h-12 rounded-sm overflow-hidden bg-gray-200"
                        >
                          <LazyLoadImage
                            alt="image"
                            wrapperProps={{
                              style: { transitionDelay: "1s" },
                            }}
                            className="w-full h-full object-cover object-center"
                            src={`${CLOUDINARY_BASE_URL}/${data?.photoPublicId[0]}?_a=${CLOUDINARY_KEY}`}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-base font-sans text-black">
                        {data.productName}
                      </TableCell>
                      <TableCell className="font-medium text-base font-sans text-black">
                        {data.productDesc.length > 30
                          ? `${data.productDesc.substring(0, 30)}...`
                          : data.productDesc}
                      </TableCell>
                      <TableCell className="flex items-center text-base justify-start mt-3 gap-2">
                        <Switch
                          checked={data.active}
                          onCheckedChange={() => handleToogleActive(data?.id)}
                        />
                        {data.active ? (
                          <p className="text-green-500">active</p>
                        ) : (
                          <p className="text-red-500">hidden</p>
                        )}
                      </TableCell>
                      <TableCell className="text-right p-0">
                        <div className="w-full h-full flex justify-end gap-6 text-xl">
                          <button
                            className="hover:text-gray-500"
                            onClick={() => {
                              setFormData({
                                productName: data.productName,
                                categoryId: data.categoryId,
                                actualPrice: data.actualPrice.toString(),
                                discountedPrice:
                                  data.discountedPrice.toString(),
                                photoPublicId: data.photoPublicId,
                                inventoryList: {},
                                weight: data.weight.toString(),
                                hsnCode: data.hsnCode,
                                productDesc: data.productDesc,
                                active: data.active,
                              });
                              setActionType("update");
                              setProductIdToUpdate(data?.id);
                              setOpenAddProductDialog(true);
                            }}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="hover:text-gray-500"
                            onClick={() => {
                              setProductIdToDelete(data?.id);
                              setOpenConfirmationDialog(true);
                            }}
                          >
                            <MdDelete />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
