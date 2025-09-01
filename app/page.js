
import ProductManagement from "@/components/ProductManagement";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <>
      <ToastContainer />
      <ProductManagement />
    </>
  );
}
