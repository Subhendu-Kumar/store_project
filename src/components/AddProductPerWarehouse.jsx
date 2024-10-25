import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import Loader from "./Loader";
import { Input } from "./ui/input";
import { getWarehouses } from "@/api";
import { useEffect, useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

const AddProductPerWarehouse = ({
  open,
  store_id,
  formData,
  setFormData,
  onOpenChange,
}) => {
  const [fetching, setFetching] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchWarehouses = async () => {
      setFetching(true);
      try {
        if (store_id) {
          const res = await getWarehouses(store_id);
          if (res?.status === 200) {
            setWarehouses(res?.data);
          }
        }
      } catch (error) {
        console.log("error fetching warehouses: ", error);
      } finally {
        setFetching(false);
      }
    };
    fetchWarehouses();
  }, [store_id]);

  const handleQuantityChange = (warehouseId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [warehouseId]: value,
    }));
  };

  const handleInventoryAdd = (warehouseId) => {
    const quantity = parseFloat(quantities[warehouseId]);
    if (!isNaN(quantity)) {
      setFormData((prevData) => ({
        ...prevData,
        inventoryList: {
          ...prevData.inventoryList,
          [warehouseId]: quantity,
        },
      }));
    }
  };

  const handleInventoryRemove = (warehouseId) => {
    setFormData((prevData) => {
      const updatedInventoryList = { ...prevData.inventoryList };
      delete updatedInventoryList[warehouseId];
      return {
        ...prevData,
        inventoryList: updatedInventoryList,
      };
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={"w-[30rem]"}>
        <DialogHeader>
          <DialogTitle>Inventory</DialogTitle>
        </DialogHeader>
        <div className="w-full h-auto">
          {fetching ? (
            <div className="w-full h-30 flex items-center justify-center">
              <Loader />
            </div>
          ) : warehouses?.length === 0 ? (
            <div className="w-full h-30 text-red-500 text-lg font-sans font-medium flex items-center justify-center">
              <p>No warehouses found</p>
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-zinc-200">
                <TableRow>
                  <TableHead className="">Warehouse Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {warehouses?.map((data, idx) => {
                  const isAdded = formData.inventoryList.hasOwnProperty(
                    data.warehouseId
                  );
                  return (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">
                        {data?.warehouseName}
                      </TableCell>
                      <TableCell>
                        <Input
                          type="text"
                          placeholder="Eg. 9.9"
                          value={quantities[data.warehouseId] || ""}
                          onChange={(e) =>
                            handleQuantityChange(
                              data.warehouseId,
                              e.target.value
                            )
                          }
                          className="w-20 border-gray-500"
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        {isAdded ? (
                          <button
                            onClick={() =>
                              handleInventoryRemove(data.warehouseId)
                            }
                          >
                            <CiCircleMinus className="text-2xl text-red-500" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleInventoryAdd(data.warehouseId)}
                          >
                            <CiCirclePlus className="text-2xl text-black" />
                          </button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductPerWarehouse;
