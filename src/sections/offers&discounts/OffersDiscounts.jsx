import Loader from "@/components/Loader";
import { MdDelete } from "react-icons/md";
import { getStoreData } from "@/lib/utils";
import { useEffect, useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import AddOffer from "@/components/AddOffer";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { BiSolidOffer } from "react-icons/bi";
import OfferIcon from "../../../public/offer.png";
import DefaultScreen from "@/components/DefaultScreen";
import ConfirmDialog from "@/components/ConfirmDialog";
import { addOffer, deleteOffer, getOffers } from "@/api";
import AlertDialogLoader from "@/components/AlertDialogLoader";

const OffersDiscounts = () => {
  const { toast } = useToast();
  const [offers, setOffers] = useState([]);
  const [errors, setErrors] = useState({});
  const [fetching, setFetching] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [offerIdToDelete, setOfferIdToDelete] = useState("");
  const [store_id, setStore_id] = useState(getStoreData()?.id);
  const [openAddOfferDialog, setOpenAddOfferDialog] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
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

  const handleDeleteOffer = async () => {
    setIsLoading(true);
    setDeleting(true);
    try {
      const res = await deleteOffer(store_id, offerIdToDelete);
      if (res?.status === 202) {
        toast({
          title: "Success",
          description: res?.data?.msg,
        });
        fetchOffers();
      } else {
        toast({
          title: "Error deleting offer",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error deleting offer",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
      setIsLoading(false);
      setOpenConfirmationDialog(false);
    }
  };

  const handleCopyOfferCode = (offer_code) => {
    const upperCaseOfferCode = offer_code.toUpperCase();
    navigator.clipboard
      .writeText(upperCaseOfferCode)
      .then(() => {
        console.log("Offer code copied to clipboard!");
        toast({
          title: "Success",
          description: "offer code successfully copied to clipboard",
        });
      })
      .catch((error) => {
        console.error("Failed to copy offer code: ", error);
        toast({
          title: "Error copying offer code",
          variant: "destructive",
        });
      });
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
        onOpenChange={setIsLoading}
        title={deleting ? "Deleting offer..." : "Adding offer..."}
      />
      <ConfirmDialog
        action={handleDeleteOffer}
        open={openConfirmationDialog}
        onOpenChange={setOpenConfirmationDialog}
        title="This will permanently delete the offer and remove all data from our servers."
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
              <h1 className="text-xl font-medium font-sans">Offers</h1>
              <p className="text-base font-sans font-light text-zinc-500">
                Organize and oversee your inventory storage details.
              </p>
            </div>
            <div className="w-full h-auto flex items-center justify-between">
              <Input
                type="text"
                value={searchQuery}
                placeholder="Search offers"
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
                      {data?.offerType === "PERCENTAGE_DISCOUNT" && (
                        <span>
                          {data?.percentageValue}% off (upto &#8377;
                          {data?.maximumDiscountAmount}) on orders above &#8377;
                          {data?.minimumPurchaseAmount}
                        </span>
                      )}
                      {data?.offerType === "FLAT_AMOUNT_DISCOUNT" && (
                        <span>
                          flat &#8377;{data?.flatAmountValue} discount on oders
                          above &#8377;{data?.minimumPurchaseAmount}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-4 text-xl">
                    <button
                      className="hover:text-gray-500 text-xl bg-gray-200 p-2 rounded-full"
                      onClick={() => handleCopyOfferCode(data?.offerCode)}
                    >
                      <FaShareAlt />
                    </button>
                    <button
                      className="hover:text-gray-500 text-xl bg-gray-200 p-2 rounded-full"
                      onClick={() => {
                        setOfferIdToDelete(data?.id);
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
    </div>
  );
};

export default OffersDiscounts;
