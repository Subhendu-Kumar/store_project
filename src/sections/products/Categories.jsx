import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { getStoreData } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import AddCategory from "@/components/AddCategory";
import { RotatingLines } from "react-loader-spinner";
import ConfirmDialog from "@/components/ConfirmDialog";
import CategoryIcon from "../../../public/category.jpg";
import AlertDialogLoader from "@/components/AlertDialogLoader";
import { addCategory, deleteCategory, getCategories } from "@/api";

const Categories = () => {
  const { toast } = useToast();
  const [errors, setErrors] = useState({});
  const [fetching, setFetching] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [store_id, setStore_id] = useState(getStoreData()?.id);
  const [loaderDialogTitle, setLoaderDialogTitle] = useState("");
  const [categoryIdToDelete, setCategoryIdToDelete] = useState("");
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
        title: "Error",
        description: "Error while saving data to server",
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
        title: "Error",
        description: "Error while deleting data from server",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setOpenConfirmationDialog(false);
    }
  };

  return (
    <div className="w-full h-auto">
      <AddCategory
        errors={errors}
        formData={formData}
        setErrors={setErrors}
        setFormData={setFormData}
        open={addCategoryDialogOpen}
        submitCategoryData={submitCategoryData}
        onOpenChange={setAddCategoryDialogOpen}
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
          <RotatingLines
            width="80"
            height="80"
            color="grey"
            visible={true}
            strokeWidth="3"
            strokeColor="orange"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        </div>
      ) : categories?.length === 0 ? (
        <div className="w-full h-auto flex flex-col items-center justify-center py-10 mt-6 bg-zinc-100 rounded-lg">
          <div className="w-60 h-60 rounded-full overflow-hidden">
            <img
              alt="warehouse"
              src={CategoryIcon}
              className="w-full h-full object-center object-cover"
            />
          </div>
          <h1 className="text-2xl font-semibold text-zinc-800 mt-2">
            Create categories to organize your products
          </h1>
          <p className="text-base font-sans font-medium text-zinc-600">
            Organize your products with categories to help customers easily find
            what they need.
          </p>
          <button
            onClick={() => setAddCategoryDialogOpen(true)}
            className="w-fit h-auto px-3 py-1 font-sans font-medium text-xl mt-4 bg-orange-500 text-white rounded-md"
          >
            Create new category
          </button>
        </div>
      ) : (
        <div className="w-full h-auto mt-6">
          <div className="w-full h-auto flex items-center justify-between">
            <Input
              type="text"
              placeholder="Search categories"
              className="w-[30%] h-10 border-gray-500"
            />
            <button
              onClick={() => setAddCategoryDialogOpen(true)}
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
                {categories?.map((data, idx) => {
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
                        <Switch checked={data.active} />
                        {data.active ? (
                          <p className="text-green-500">active</p>
                        ) : (
                          <p className="text-red-500">hidden</p>
                        )}
                      </TableCell>
                      <TableCell className="text-right p-0">
                        <div className="w-full h-full flex justify-end gap-6 text-xl">
                          <button className="hover:text-gray-500">
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
