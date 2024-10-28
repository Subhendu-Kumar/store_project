import Loader from "@/components/Loader";
import { getStoreData } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { getStore, updateStore } from "@/api";
import { storeSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";

const StoreDetails = () => {
  const { toast } = useToast();
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [store_id, setStore_id] = useState(getStoreData()?.id);
  const [storeFormData, setStoreFormData] = useState({
    name: "",
    storeLink: "",
    mobileNo: "",
    ownerName: "",
    storeEmail: "",
    country: "",
    storeAddress: "",
  });

  useEffect(() => {
    const fetchWarehouses = async () => {
      setFetching(true);
      try {
        const res = await getStore(store_id);
        if (res?.status === 200) {
          setStoreFormData({
            name: res?.data?.name,
            storeLink: res?.data?.storeLink,
            ownerName: res?.data?.ownerName || "",
            mobileNo: res?.data?.mobileNo?.toString() || "",
            country: res?.data?.country || "",
            storeEmail: res?.data?.storeEmail || "",
            storeAddress: res?.data?.storeAddress || "",
          });
        }
      } catch (error) {
        console.log("error fetching store details: ", error);
      } finally {
        setFetching(false);
      }
    };
    setStore_id(getStoreData()?.id);
    fetchWarehouses();
  }, [store_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoreFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const result = storeSchema.safeParse(storeFormData);
    if (result.success) {
      setErrors({});
      setSaving(true);
      const toastId = toast({
        title: "Updating store details...",
        description: "Please wait while we update your store details.",
      });
      try {
        const res = await updateStore(store_id, result.data);
        if (res?.status === 202) {
          toast({
            id: toastId,
            title: "Store details updated successfully",
            description: "Your store details have been updated.",
          });
          setStoreFormData({
            name: res?.data?.name,
            storeLink: res?.data?.storeLink,
            ownerName: res?.data?.ownerName,
            storeEmail: res?.data?.storeEmail,
            mobileNo: res?.data?.mobileNo.toString(),
            country: res?.data?.country,
            storeAddress: res?.data?.storeAddress,
          });
        } else {
          toast({
            id: toastId,
            title: "Error: Failed to update store details",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.log("error: ", error);
        toast({
          id: toastId,
          title: "Error: Failed to update store details",
          variant: "destructive",
        });
      } finally {
        setSaving(false);
      }
    } else {
      const fieldErrors = {};
      result.error.errors.forEach((e) => {
        if (e.path[0]) fieldErrors[e.path[0]] = e.message;
      });
      setErrors(fieldErrors);
    }
  };

  if (fetching) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full h-auto mt-6 p-6 bg-zinc-100 rounded-lg">
      <h1 className="text-lg font-semibold text-black font-sans">
        Store details
      </h1>
      <p className="text-sm text-gray-500 font-sans">
        Update and customize your store’s information.
      </p>
      <div className="w-full h-auto mt-4 flex flex-col items-start justify-start gap-4">
        <div className="w-full h-auto flex items-center justify-center gap-4">
          <div className="w-1/2 h-auto flex flex-col items-start justify-start gap-2">
            <p>Store Link</p>
            <div className="w-full h-10 border border-gray-500 rounded-md bg-white flex items-center justify-center overflow-hidden">
              <p className="w-1/2 text-center text-sm md:text-lg font-semibold text-black font-sans">
                https://buysync.vercel.app/
              </p>
              <input
                type="text"
                name="storeLink"
                onChange={handleChange}
                placeholder="Yourstorelink"
                value={storeFormData?.storeLink}
                className="w-1/2 h-full border-none outline-none focus:outline-none pr-3"
              />
            </div>
            {errors.storeLink && (
              <p className="text-red-500 text-sm">{errors.storeLink}</p>
            )}
          </div>
          <div className="w-1/2 h-auto flex flex-col items-start justify-start gap-2">
            <p>Store Name</p>
            <Input
              type="text"
              name="name"
              onChange={handleChange}
              value={storeFormData?.name}
              placeholder="Your store name"
              className="w-full h-10 border-gray-500 bg-white"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
        </div>
        <div className="w-full h-auto flex items-center justify-center gap-4">
          <div className="w-1/2 h-auto flex flex-col items-start justify-start gap-2">
            <p>Store owner name</p>
            <Input
              type="text"
              name="ownerName"
              onChange={handleChange}
              placeholder="Your owner name"
              value={storeFormData?.ownerName}
              className="w-full h-10 border-gray-500 bg-white"
            />
            {errors.ownerName && (
              <p className="text-red-500 text-sm">{errors.ownerName}</p>
            )}
          </div>
          <div className="w-1/2 h-auto flex flex-col items-start justify-start gap-2">
            <p>Store Email</p>
            <Input
              type="text"
              name="storeEmail"
              onChange={handleChange}
              placeholder="Your store email"
              value={storeFormData?.storeEmail}
              className="w-full h-10 border-gray-500 bg-white"
            />
            {errors.storeEmail && (
              <p className="text-red-500 text-sm">{errors.storeEmail}</p>
            )}
          </div>
        </div>
        <div className="w-full h-auto flex items-center justify-center gap-4">
          <div className="w-1/2 h-auto flex flex-col items-start justify-start gap-2">
            <p>Mobile Number</p>
            <Input
              type="text"
              name="mobileNo"
              onChange={handleChange}
              value={storeFormData?.mobileNo}
              placeholder="Your mobile number"
              className="w-full h-10 border-gray-500 bg-white"
            />
            {errors.mobileNo && (
              <p className="text-red-500 text-sm">{errors.mobileNo}</p>
            )}
          </div>
          <div className="w-1/2 h-auto flex flex-col items-start justify-start gap-2">
            <p>Country</p>
            <Input
              type="text"
              name="country"
              onChange={handleChange}
              placeholder="Your Country"
              value={storeFormData?.country}
              className="w-full h-10 border-gray-500 bg-white"
            />
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country}</p>
            )}
          </div>
        </div>
        <div className="w-full h-auto flex items-start justify-start flex-col gap-2">
          <p>Store Address</p>
          <Input
            type="text"
            name="storeAddress"
            onChange={handleChange}
            placeholder="Your store address"
            value={storeFormData?.storeAddress}
            className="w-full h-10 border-gray-500 bg-white"
          />
          {errors.storeAddress && (
            <p className="text-red-500 text-sm">{errors.storeAddress}</p>
          )}
        </div>
        <div className="w-full h-auto flex items-center justify-end">
          <Button
            onClick={handleSave}
            className="text-lg bg-orange-500 text-white hover:bg-orange-600"
          >
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StoreDetails;
