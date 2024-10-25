import {
  addWarehouse,
  getWarehouses,
  deleteWarehouse,
  updateWarehouse,
} from "@/api";
import { FaEdit } from "react-icons/fa";
import Loader from "@/components/Loader";
import { MdDelete } from "react-icons/md";
import { getStoreData } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import AddWarehouse from "@/components/AddWarehouse";
import ConfirmDialog from "@/components/ConfirmDialog";
import DefaultScreen from "@/components/DefaultScreen";
import WarehouseIcon from "../../../public/ware_house.jpg";
import AlertDialogLoader from "@/components/AlertDialogLoader";

const WareHouse = () => {
  const { toast } = useToast();
  const [errors, setErrors] = useState({});
  const [fetching, setFetching] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionType, setActionType] = useState("create");
  const [store_id, setStore_id] = useState(getStoreData()?.id);
  const [loaderDialogTitle, setLoaderDialogTitle] = useState("");
  const [warehouseIdToDelete, setWarehouseIdToDelete] = useState("");
  const [warehouseIdToUpdate, setWarehouseIdToUpdate] = useState("");
  const [openAddWarehouseDilog, setOpenAddWarehouseDilog] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [formData, setFormData] = useState({
    warehouseName: "",
    contactPerson: "",
    mobileNo: "",
    flatHouseNo: "",
    areaColony: "",
    pinCode: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    const fetchWarehouses = async () => {
      setFetching(true);
      try {
        const res = await getWarehouses(store_id);
        if (res?.status === 200) {
          setWarehouses(res?.data);
        }
      } catch (error) {
        console.log("error fetching warehouses: ", error);
      } finally {
        setFetching(false);
      }
    };
    setStore_id(getStoreData()?.id);
    fetchWarehouses();
  }, [store_id]);

  const submitWarehouseData = async () => {
    setLoaderDialogTitle("Saving warehouse data to server");
    setIsLoading(true);
    try {
      const res = await addWarehouse(store_id, formData);
      console.log(res);
      if (res.status === 201) {
        setWarehouses(res?.data);
        toast({
          title: "Success",
          description: "ware house created successfully",
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
      setOpenAddWarehouseDilog(false);
      setFormData({
        warehouseName: "",
        contactPerson: "",
        mobileNo: "",
        flatHouseNo: "",
        areaColony: "",
        pinCode: "",
        city: "",
        state: "",
      });
    }
  };

  const handleAddWarehouse = () => {
    setActionType("create");
    setOpenAddWarehouseDilog(true);
  };

  const handleDeleteWarehouse = async () => {
    setLoaderDialogTitle("Deleting warehouse from server");
    setIsLoading(true);
    try {
      const res = await deleteWarehouse(store_id, warehouseIdToDelete);
      if (res?.status === 200) {
        setWarehouses(res?.data);
        toast({
          title: "Success",
          description: "category deleted successfully",
        });
      }
      console.log(res);
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

  const handleUpdateWarehouse = async () => {
    setLoaderDialogTitle("Updating warehouse to server");
    setIsLoading(true);
    try {
      const res = await updateWarehouse(
        store_id,
        warehouseIdToUpdate,
        formData
      );
      if (res?.status === 200) {
        setWarehouses(res?.data);
        toast({
          title: "Success",
          description: "warehouse updated successfully",
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
        warehouseName: "",
        contactPerson: "",
        mobileNo: "",
        flatHouseNo: "",
        areaColony: "",
        pinCode: "",
        city: "",
        state: "",
      });
      setOpenAddWarehouseDilog(false);
    }
  };

  const filteredWarehouses = warehouses.filter(
    (warehouse) =>
      warehouse.warehouseName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      warehouse.areaColony.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-auto">
      <AddWarehouse
        errors={errors}
        formData={formData}
        setErrors={setErrors}
        actionType={actionType}
        setFormData={setFormData}
        open={openAddWarehouseDilog}
        setOpen={setOpenAddWarehouseDilog}
        submitWarehouseData={submitWarehouseData}
        updateWarehouseData={handleUpdateWarehouse}
      />
      <AlertDialogLoader
        open={isLoading}
        title={loaderDialogTitle}
        onOpenChange={setIsLoading}
      />
      <ConfirmDialog
        open={openConfirmationDialog}
        action={handleDeleteWarehouse}
        onOpenChange={setOpenConfirmationDialog}
        title="This will permanently delete the category and remove all data from our servers."
      />
      {fetching ? (
        <div className="w-full h-96 flex items-center justify-center">
          <Loader />
        </div>
      ) : warehouses?.length === 0 ? (
        <DefaultScreen
          img={WarehouseIcon}
          title="Add your warehouse"
          buttonText="Add Warehouse"
          action={handleAddWarehouse}
          description="Set up your warehouse to manage inventory, pickups, and deliveries efficiently."
        />
      ) : (
        <div className="w-full h-auto p-4 bg-gradient-to-b from-zinc-100 to-white flex flex-col items-center justify-center gap-4 rounded-md">
          <div className="w-full h-auto flex flex-col items-start justify-start">
            <h1 className="text-xl font-medium font-sans">Warehouses</h1>
            <p className="text-base font-sans font-light text-zinc-500">
              Organize and oversee your inventory storage details.
            </p>
          </div>
          <div className="w-full h-auto flex items-center justify-between">
            <Input
              type="text"
              value={searchQuery}
              placeholder="Search warehouses"
              className="w-96 h-10 border-gray-500 bg-white"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={handleAddWarehouse}
              className="w-fit h-auto px-3 py-1 font-sans font-medium text-xl bg-orange-500 text-white rounded-md"
            >
              Add Warehouse
            </button>
          </div>
          {filteredWarehouses.map((data, idx) => {
            return (
              <div
                key={idx}
                className="w-full h-auto p-4 bg-white border border-gray-300 rounded-sm flex items-center justify-between"
              >
                <div className="flex flex-col items-start justify-start">
                  <h1 className="text-lg font-sans font-medium capitalize">
                    {data.warehouseName}
                  </h1>
                  <p className="text-sm font-sans font-light capitalize">
                    {data.areaColony}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-6 text-xl">
                  <button
                    className="hover:text-gray-500"
                    onClick={() => {
                      setFormData({
                        warehouseName: data.warehouseName,
                        contactPerson: data.contactPerson,
                        mobileNo: data.mobileNo.toString(),
                        flatHouseNo: data.flatHouseNo,
                        areaColony: data.areaColony,
                        pinCode: data.pinCode.toString(),
                        city: data.city,
                        state: data.state,
                      });
                      setActionType("update");
                      setWarehouseIdToUpdate(data.warehouseId);
                      setOpenAddWarehouseDilog(true);
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="hover:text-gray-500"
                    onClick={() => {
                      setWarehouseIdToDelete(data.warehouseId);
                      setOpenConfirmationDialog(true);
                    }}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WareHouse;
