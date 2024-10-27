import Loader from "@/components/Loader";
import { getStoreData } from "@/lib/utils";
import { useEffect, useState } from "react";
import { addOffer, getOffers } from "@/api";
import AddOffer from "@/components/AddOffer";
import OfferIcon from "../../../public/offer.png";
import DefaultScreen from "@/components/DefaultScreen";
import AlertDialogLoader from "@/components/AlertDialogLoader";

const OffersDiscounts = () => {
  const [offers, setOffers] = useState([]);
  const [errors, setErrors] = useState({});
  const [fetching, setFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [store_id, setStore_id] = useState(getStoreData()?.id);
  const [openAddOfferDialog, setOpenAddOfferDialog] = useState(false);
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

  useEffect(() => {
    const fetchOffers = async () => {
      setFetching(true);
      try {
        const res = await getOffers(store_id);
        if (res?.status === 200) {
          setOffers(res?.data);
        }
      } catch (error) {
        console.log("error fetching warehouses: ", error);
      } finally {
        setFetching(false);
      }
    };
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
      console.log("res: ", res);
    } catch (error) {
      console.log("error submitting offer: ", error);
    } finally {
      setIsLoading(false);
    }
  };

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
          <div>dfjdsjfhj</div>
        )}
      </div>
    </div>
  );
};

export default OffersDiscounts;
