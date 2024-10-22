import { FaHome } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";
import { IoIosPeople } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";
import { MdOutlineSettings } from "react-icons/md";
import { FaClipboardList, FaTruck } from "react-icons/fa6";

export const sidebar_items = [
  {
    id: "home",
    title: "home",
    icon: FaHome,
  },
  {
    id: "orders",
    title: "orders",
    icon: FaClipboardList,
  },
  {
    id: "delivery",
    title: "delivery",
    icon: FaTruck,
  },
  {
    id: "products",
    title: "products",
    icon: CgMenuGridR,
  },
  {
    id: "offers_discounts",
    title: "offers & discounts",
    icon: BiSolidOffer,
  },
  {
    id: "customers",
    title: "customers",
    icon: IoIosPeople,
  },
  {
    id: "store_settings",
    title: "store settings",
    icon: MdOutlineSettings,
  },
];

export const store_settings_items = [
  {
    id: "store_details",
    title: "Store Details",
  },
  {
    id: "staff_account",
    title: "Staff Account",
  },
  {
    id: "payment",
    title: "Payment",
  },
  {
    id: "warehouse",
    title: "Warehouse",
  },
  {
    id: "delivery_settings",
    title: "Delivery Settings",
  },
  {
    id: "support_social",
    title: "Support & Social",
  },
  {
    id: "policies",
    title: "Policies",
  },
  {
    id: "store_timings",
    title: "Store Timings",
  },
];
