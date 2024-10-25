import {
  addCategory,
  getCategories,
  deleteCategory,
  updateCategory,
  toogleCategoryActive,
} from "@/api";
import {
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  TableHeader,
  TableCaption,
} from "@/components/ui/table";
import { FaEdit } from "react-icons/fa";
import Loader from "@/components/Loader";
import { MdDelete } from "react-icons/md";
import { getStoreData } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import AddCategory from "@/components/AddCategory";
import ConfirmDialog from "@/components/ConfirmDialog";
import DefaultScreen from "@/components/DefaultScreen";
import CategoryIcon from "../../../public/category.jpg";
import AlertDialogLoader from "@/components/AlertDialogLoader";

const Categories = () => {
  const { toast } = useToast();
  const [errors, setErrors] = useState({});
  const [fetching, setFetching] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionType, setActionType] = useState("create");
  const [store_id, setStore_id] = useState(getStoreData()?.id);
  const [loaderDialogTitle, setLoaderDialogTitle] = useState("");
  const [categoryIdToDelete, setCategoryIdToDelete] = useState("");
  const [categoryIdToUpdate, setCategoryIdToUpdate] = useState(false);
  const [addCategoryDialogOpen, setAddCategoryDialogOpen] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [formData, setFormData] = useState({
    categoryName: "",
    description: "",
    active: true,
  });

  useEffect(() => {
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
    setStore_id(getStoreData()?.id);
    fetchCategories();
  }, [store_id]);

  const submitCategoryData = async () => {
    setLoaderDialogTitle("Saving category data to server");
    setIsLoading(true);
    try {
      const res = await addCategory(store_id, formData);
      console.log(res);
      if (res?.status === 201) {
        setCategories(res?.data);
        toast({
          title: "Success",
          description: "category created successfully",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error while saving data to server",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setAddCategoryDialogOpen(false);
      setFormData({
        categoryName: "",
        description: "",
        active: true,
      });
    }
  };

  const handleAddCategory = () => {
    setActionType("create");
    setAddCategoryDialogOpen(true);
  };

  const handleDeleteCategory = async () => {
    setLoaderDialogTitle("Deleting category from server");
    setIsLoading(true);
    try {
      const res = await deleteCategory(store_id, categoryIdToDelete);
      if (res?.status === 202) {
        setCategories(res?.data);
        toast({
          title: "Success",
          description: "category deleted successfully",
        });
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

  const handleUpdateCategory = async () => {
    setLoaderDialogTitle("Updating category to server");
    setIsLoading(true);
    try {
      const res = await updateCategory(store_id, categoryIdToUpdate, formData);
      if (res?.status === 200) {
        setCategories(res?.data);
        toast({
          title: "Success",
          description: "category updated successfully",
        });
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
        categoryName: "",
        description: "",
        active: true,
      });
      setAddCategoryDialogOpen(false);
    }
  };

  const handleToogleActive = async (categoryId) => {
    const toastId = toast({
      title: "Updating status...",
      description: "Please wait while we update the category status.",
      loading: true,
    });
    const updatedCategories = categories.map((category) => {
      if (category.categoryId === categoryId) {
        return { ...category, active: !category.active };
      }
      return category;
    });
    setCategories(updatedCategories);
    try {
      const res = await toogleCategoryActive(store_id, categoryId, {
        active: !categories.find((cat) => cat.categoryId === categoryId)
          ?.active,
      });
      if (res?.status === 202 && res?.data) {
        const updatedCategory = res.data;
        const updatedCategoryList = categories.map((category) =>
          category.categoryId === updatedCategory.categoryId
            ? updatedCategory
            : category
        );
        setCategories(updatedCategoryList);
        toast({
          id: toastId,
          title: "Success",
          description: "Category status updated successfully",
        });
      }
    } catch (error) {
      console.log("Error while updating category status:", error);
      toast({
        id: toastId,
        title: "Error Failed to update category status",
        variant: "destructive",
      });
      const revertedCategories = categories.map((category) => {
        if (category.categoryId === categoryId) {
          return { ...category, active: !category.active };
        }
        return category;
      });
      setCategories(revertedCategories);
    }
  };

  const filteredCategory = categories.filter(
    (category) =>
      category.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-auto">
      <AddCategory
        errors={errors}
        formData={formData}
        setErrors={setErrors}
        actionType={actionType}
        setFormData={setFormData}
        open={addCategoryDialogOpen}
        submitCategoryData={submitCategoryData}
        onOpenChange={setAddCategoryDialogOpen}
        updateCategoryData={handleUpdateCategory}
      />
      <AlertDialogLoader
        open={isLoading}
        title={loaderDialogTitle}
        onOpenChange={setIsLoading}
      />
      <ConfirmDialog
        open={openConfirmationDialog}
        action={handleDeleteCategory}
        onOpenChange={setOpenConfirmationDialog}
        title="This will permanently delete the category and remove all data from our servers."
      />
      {fetching ? (
        <div className="w-full h-96 flex items-center justify-center">
          <Loader />
        </div>
      ) : categories?.length === 0 ? (
        <DefaultScreen
          img={CategoryIcon}
          action={handleAddCategory}
          buttonText="Create new category"
          title="Create categories to organize your products"
          description="Organize your products with categories to help customers easily find what they need."
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
              onClick={handleAddCategory}
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
                  <TableHead className="text-lg font-sans font-medium text-black">
                    Category name
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
                {filteredCategory?.map((data, idx) => {
                  return (
                    <TableRow className="h-14 hover:bg-zinc-50" key={idx}>
                      <TableCell className="font-medium text-base font-sans text-black">
                        {idx + 1}
                      </TableCell>
                      <TableCell className="font-medium text-base font-sans text-black">
                        {data.categoryName}
                      </TableCell>
                      <TableCell className="font-medium text-base font-sans text-black">
                        {data.description.length > 30
                          ? `${data.description.substring(0, 30)}...`
                          : data.description}
                      </TableCell>
                      <TableCell className="flex items-center text-base justify-start mt-3 gap-2">
                        <Switch
                          checked={data.active}
                          onCheckedChange={() =>
                            handleToogleActive(data.categoryId)
                          }
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
                              setFormData(data);
                              setActionType("update");
                              setCategoryIdToUpdate(data.categoryId);
                              setAddCategoryDialogOpen(true);
                            }}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="hover:text-gray-500"
                            onClick={() => {
                              setCategoryIdToDelete(data.categoryId);
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

export default Categories;
