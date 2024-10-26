import { FaHome } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";
import { IoIosPeople } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";
import store_1 from "../../public/store_1.svg";
import store_2 from "../../public/store_2.svg";
import store_3 from "../../public/store_3.svg";
import store_4 from "../../public/store_4.svg";
import store_5 from "../../public/store_5.svg";
import stats_1 from "../../public/stats_1.svg";
import stats_2 from "../../public/stats_2.svg";
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

export const product_items = [
  {
    id: "categories",
    title: "Categories",
  },
  {
    id: "all_products",
    title: "All products",
  },
];

export const imageArray = [store_1, store_2, store_3, store_4, store_5];

export const information = [
  {
    title: "Launch Fast",
    img: stats_1,
    desc: [
      "Fully responsive e-commerce website & mobile app.",
      "Loads 6X faster than existing solutions.",
      "Upload/import products and inventory in bulk.",
      "Integrate payment gateways.",
      "Easily customizable themes.",
    ],
  },
  {
    title: "Scale Faster",
    img: stats_2,
    desc: [
      "Guaranteed 99.5% uptime for your store",
      "Marketing tools and discounts to drive repeat orders.",
      "Add staff accounts, assign different roles.",
      "Unlimited transactions, minimal transaction fees.",
    ],
  },
];
