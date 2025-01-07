//@ts-nocheck
import { toast } from "react-toastify";

export const showToast = (message: string, type: "success" | "error") => {
  const toastOptions = {
    position: "bottom-right",  // Position of the toast
    autoClose: 5000,  // Auto-close after 5 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
  };
  if (type === "success") {
    toast.success(message,toastOptions);
  } else {
    toast.error(message,toastOptions);
  }
};
