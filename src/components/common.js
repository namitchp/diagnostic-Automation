import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export const showSuccessToast = (msg) => {
  toast.success(msg, {
    position: "bottom-right",
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};
export const showErrorToast = (msg) => {
  toast.error(msg, {
    position: "bottom-right",
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};
export const UserRight=()=>{
  const thirdmenu=useSelector((state)=>state.common.userRightListThird)
  console.log(thirdmenu)
}
export const buttonLoader = (loading, label, onClick, color) => {
  return (
    <Button
      variant="contained"
      color={color}
      disabled={loading}
      onClick={onClick}
      disableElevation
    >
      {loading ? <i class="fas fa-circle-notch fa-spin"></i> : label}
    </Button>
  );
};
export const getBrowseUserRight = (response) => {
  const pathArr = window.location.pathname.split("/").filter((x) => x != "");
  // console.log(pathArr);
  // console.log(response?.filter((x) => x.transaction_name.toLowerCase() == pathArr[2]));
  return response?.filter((x) => x.transaction_name.toLowerCase() == pathArr[2])[0]
};

export const getAutoValue = (key, arr, val) => {
  const value = arr.filter((x) => x[key] === val);
  return value && value.length > 0 ? value[0] : null;
};
export const debounce = (func, delay) => {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};
export const getUserId = () => {
  return localStorage.getItem("userId");
};
