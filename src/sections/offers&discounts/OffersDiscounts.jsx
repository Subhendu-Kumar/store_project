import Loader from "@/components/Loader";
import { getStoreData } from "@/lib/utils";
import { useEffect, useState } from "react";
import { addOffer, getOffers } from "@/api";
import AddOffer from "@/components/AddOffer";
import OfferIcon from "../../../public/offer.png";
import DefaultScreen from "@/components/DefaultScreen";
import AlertDialogLoader from "@/components/AlertDialogLoader";
import { MdDelete } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { FaShareAlt } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import { useToast } from "@/hooks/use-toast";

const OffersDiscounts = () => {
  const { toast } = useToast();
  const [offers, setOffers] = useState([]);
  const [errors, setErrors] = useState({});
  const [fetching, setFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [store_id, setStore_id] = useState(getStoreData()?.id);
  const [openAddOfferDialog, setOpenAddOfferDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    offerName: "",
    offerCode: "",
    offerType: "PERCENTAGE_DISCOUNT",
    percentageValue: "0",
    flatAmountValue: "0",
    minimumPurchaseAmount: "0",
    maximumDiscountAmount: "0",
    startDate: "",
    endDate: "",
    usageLimit: "0",
    visibilityType: "VISIBLE_ON_STORE",
    usageType: "ONLY_ONCE",
    customerType: "ANY_CUSTOMER",
    active: true,
  });

  const fetchOffers = async () => {
    setFetching(true);
    try {
      const res = await getOffers(store_id);
      if (res?.status === 200) {
        setOffers(res?.data);
        console.log(res);
      }
    } catch (error) {
      console.log("error fetching warehouses: ", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    setStore_id(getStoreData()?.id);
    if (store_id) {
      fetchOffers();
    }
  }, [store_id]);

  const handleAddOffer = () => {
    setOpenAddOfferDialog(true);
  };

  const handleSubmitOffer = async () => {
    setIsLoading(true);
    try {
      const res = await addOffer(store_id, formData);
      if (res?.status === 201) {
        toast({
          title: "Success",
          description: "offer created successfully",
        });
        fetchOffers();
      } else {
        toast({
          title: "Error creating offer",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log("error submitting offer: ", error);
      toast({
        title: "Error creating offer",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setOpenAddOfferDialog(false);
      setFormData({
        offerName: "",
        offerCode: "",
        offerType: "PERCENTAGE_DISCOUNT",
        percentageValue: "0",
        flatAmountValue: "0",
        minimumPurchaseAmount: "0",
        maximumDiscountAmount: "0",
        startDate: "",
        endDate: "",
        usageLimit: "0",
        visibilityType: "VISIBLE_ON_STORE",
        usageType: "ONLY_ONCE",
        customerType: "ANY_CUSTOMER",
        active: true,
      });
    }
  };

  const filteredOffers = offers.filter((offer) =>
    offer.offerCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full p-4 overflow-y-scroll pb-20">
      <AddOffer
        errors={errors}
        formData={formData}
        setErrors={setErrors}
        setFormData={setFormData}
        open={openAddOfferDialog}
        onOpenChange={setOpenAddOfferDialog}
        handleSubmitOffer={handleSubmitOffer}
      />
      <AlertDialogLoader
        open={isLoading}
        title={"Adding offer..."}
        onOpenChange={setIsLoading}
      />
      <h1 className="text-2xl font-semibold font-sans border-b border-gray-500 pb-3">
        Offers & Discounts
      </h1>
      <div className="w-full h-auto mt-6">
        {fetching ? (
          <div className="w-full h-96 flex items-center justify-center">
            <Loader />
          </div>
        ) : offers?.length === 0 ? (
          <DefaultScreen
            img={OfferIcon}
            buttonText="Add offer"
            action={handleAddOffer}
            title="Add offers & discounts"
            description="Set up your offers & discounts to manage inventory, pickups, and deliveries efficiently."
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
                onClick={handleAddOffer}
                className="w-fit h-auto px-3 py-1 font-sans font-medium text-xl bg-orange-500 text-white rounded-md"
              >
                Add offer
              </button>
            </div>
            {filteredOffers.map((data, idx) => {
              return (
                <div
                  key={idx}
                  className="w-full h-auto p-4 bg-white border border-gray-300 rounded-sm flex items-center justify-between"
                >
                  <div className="flex flex-col items-start justify-start gap-1">
                    <h1 className="text-xl font-sans font-medium uppercase flex items-center justify-center gap-1">
                      <BiSolidOffer className="text-3xl text-orange-500" />
                      <p className="font-semibold">{data?.offerCode}</p>
                    </h1>
                    <p className="text-base text-gray-600 font-sans font-normal capitalize">
                      {data?.percentageValue}% off (upto{" "}
                      {data?.maximumDiscountAmount}) on orders above{" "}
                      {data?.minimumPurchaseAmount}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-4 text-xl">
                    <button className="hover:text-gray-500 text-xl bg-gray-200 p-2 rounded-full">
                      <FaShareAlt />
                    </button>
                    <button
                      className="hover:text-gray-500 text-xl bg-gray-200 p-2 rounded-full"
                      // onClick={() => {
                      //   setWarehouseIdToDelete(data.warehouseId);
                      //   setOpenConfirmationDialog(true);
                      // }}
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
    </div>
  );
};

export default OffersDiscounts;
