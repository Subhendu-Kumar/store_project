import { getStoreData } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { SlOptionsVertical } from "react-icons/sl";
import { addWarehouse, getWarehouses } from "@/api";
import AddWarehouse from "@/components/AddWarehouse";
import { RotatingLines } from "react-loader-spinner";
import WarehouseIcon from "../../../public/ware_house.jpg";
import AlertDialogLoader from "@/components/AlertDialogLoader";

const WareHouse = () => {
  const { toast } = useToast();
  const [errors, setErrors] = useState({});
  const [fetching, setFetching] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [store_id, setStore_id] = useState(getStoreData()?.id);
  const [openAddWarehouseDilog, setOpenAddWarehouseDilog] = useState(false);
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
        setFormData={setFormData}
        open={openAddWarehouseDilog}
        setOpen={setOpenAddWarehouseDilog}
        submitWarehouseData={submitWarehouseData}
      />
      <AlertDialogLoader
        open={isLoading}
        onOpenChange={setIsLoading}
        title={"Saving warehouse data to server"}
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
      ) : warehouses?.length === 0 ? (
        <div className="w-full h-auto flex flex-col items-center justify-center py-10 bg-zinc-100 rounded-lg">
          <div className="w-60 h-60 rounded-full overflow-hidden">
            <img
              alt="warehouse"
              src={WarehouseIcon}
              className="w-full h-full object-left object-cover"
            />
          </div>
          <h1 className="text-2xl font-semibold text-zinc-800 mt-2">
            Add your warehouse
          </h1>
          <p className="text-base font-sans font-medium text-zinc-600">
            Set up your warehouse to manage inventory, pickups, and deliveries
            efficiently.
          </p>
          <button
            onClick={() => setOpenAddWarehouseDilog(true)}
            className="w-fit h-auto px-3 py-1 font-sans font-medium text-xl mt-4 bg-orange-500 text-white rounded-md"
          >
            Add Warehouse
          </button>
        </div>
      ) : (
        <div className="w-full h-auto p-4 bg-zinc-100 flex flex-col items-center justify-center gap-4 rounded-md">
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
              className="w-96 h-10 border-gray-500"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={() => setOpenAddWarehouseDilog(true)}
              className="w-fit h-auto px-3 py-1 font-sans font-medium text-xl bg-orange-500 text-white rounded-md"
            >
              Add Warehouse
            </button>
          </div>
          {filteredWarehouses.map((data, idx) => {
            return (
              <div
                key={idx}
                className="w-full h-auto p-4 bg-zinc-50 border border-gray-300 rounded-sm flex items-center justify-between"
              >
                <div className="flex flex-col items-start justify-start">
                  <h1 className="text-lg font-sans font-medium capitalize">
                    {data.warehouseName}
                  </h1>
                  <p className="text-sm font-sans font-light capitalize">
                    {data.areaColony}
                  </p>
                </div>
                <SlOptionsVertical />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WareHouse;
