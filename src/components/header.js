import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getUserFilterList,
  getUserRightList,
  setSelectedMenu,
} from "../_redux/actions/common.action";
import { CommonController } from "../_redux/controller/common.controller";
import MainBar from "./appbar";
import MainMenu from "./main_menu";
import Submenu from "./sub_menu";
import ThirdMenu from "./third_menu";
const Header = ({ onHeaderClick }) => {
  const dispatch = useDispatch();
  const [userRightListArr, setUserRightList] = useState([]);
  const getuserRightListResponse = useSelector(
    (state) => state.common.userRightList
  );

  const [subMenuList, setSubMenuList] = useState([]);
  const [thirdMenuList, setThirdMenuList] = useState([])
  const [selectedItems, setSelectedItems] = useState({
    main: null,
    subMenu: null,
  });

  const profileTransaction = [
    {
      transaction_id: "",
      transaction_name: "Profile",
      edit_button: "True",
      view_right: "True",
      insert_right: "True",
      update_right: "True",
      delete_right: "True",
      print_right: "True",
    },
    {
      transaction_id: "",
      transaction_name: "Change Password",
      edit_button: "True",
      view_right: "True",
      insert_right: "True",
      update_right: "True",
      delete_right: "True",
      print_right: "True",
    },
    {
      transaction_id: "",
      transaction_name: "Attendance",
      edit_button: "True",
      view_right: "True",
      insert_right: "True",
      update_right: "True",
      delete_right: "True",
      print_right: "True",
    },

    {
      transaction_id: "",
      transaction_name: "Leaves",
      edit_button: "True",
      view_right: "True",
      insert_right: "True",
      update_right: "True",
      delete_right: "True",
      print_right: "True",
    },
    {
      transaction_id: "",
      transaction_name: "Claims",
      edit_button: "True",
      view_right: "True",
      insert_right: "True",
      update_right: "True",
      delete_right: "True",
      print_right: "True",
    },
    {
      transaction_id: "",
      transaction_name: "Ledger",
      edit_button: "True",
      view_right: "True",
      insert_right: "True",
      update_right: "True",
      delete_right: "True",
      print_right: "True",
    },
    {
      transaction_id: "",
      transaction_name: "Cash Entry",
      edit_button: "True",
      view_right: "True",
      insert_right: "True",
      update_right: "True",
      delete_right: "True",
      print_right: "True",
    },
    {
      transaction_id: "",
      transaction_name: "DPR",
      edit_button: "True",
      view_right: "True",
      insert_right: "True",
      update_right: "True",
      delete_right: "True",
      print_right: "True",
    },
  ];
  const getThirdMenu = async (menu_id) => {
    try {
      let user_id = { user_id: localStorage.getItem("userId") };
      await CommonController.commonApiCallFilter(
        "menu/menu_list_level3?menu_id=" + menu_id,
        user_id,
        "post",
        "node"
      ).then((data) => {
      
        if (data.status === 200) {
          setThirdMenuList(data.data)
        }
      }).catch(err => {
        // showErrorToast(err.message)

      })
    } catch (err) {
      // showErrorToast(err);
    }
  };

  const getSubMenu = async (menu_id) => {
    try {
      let user_id = { user_id: localStorage.getItem("userId") };
      await CommonController.commonApiCallFilter(
        "menu/menu_list_level2?menu_id=" + menu_id,
        user_id,
        "post",
        "node"
      ).then((data) => {
       
        if (data.status === 200) {
          setSubMenuList(data.data)
        }
      }).catch(err => {
        // showErrorToast(err.message)

      })
    } catch (err) {
      // showErrorToast(err);
    }
  };
  useEffect(()=>{
    if(subMenuList.length>0){
      const id=subMenuList[0]?.transaction_id
      getThirdMenu(id)
    }
  },[subMenuList])
 
  useEffect(() => {
    dispatch(getUserRightList());
    // dispatch(getUserFilterList());
  }, []);

  const groupBy = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  };

  useEffect(() => {
    if (getuserRightListResponse?.data?.length > 0) {
      // const groupedMenu = groupBy(getuserRightListResponse, "group_name");

      setUserRightList(getuserRightListResponse.data);
    }
  }, [getuserRightListResponse]);

  const handleMenuChange =(id) => {
    var tempMenuIndex = userRightListArr.findIndex((x) => x.transaction_id === id);
    if (userRightListArr[tempMenuIndex].display_name !== "Profile") {
     getSubMenu(id)
      // setSubMenuList(userRightListArr[tempMenuIndex].transaction_lst);
    } else {
      setSubMenuList(profileTransaction);
      // getSubMenu()
    }
  };
  const handleSubMenu = (id) => {
    console.log(id)
    if(subMenuList.length>0){
    id===12?getThirdMenu(1):getThirdMenu(id)
      
    }

  }
 
  return (
    <React.Fragment>
      <MainBar onMenuClick={() => onHeaderClick()} />
      <MainMenu list={userRightListArr} onMenuChange={handleMenuChange} />
      {subMenuList.length > 0 ? <Submenu list={subMenuList} onSubMenuChange={handleSubMenu} /> : null}
      {(thirdMenuList.length > 0)&&(subMenuList.length>0) ? <ThirdMenu list={thirdMenuList} list2={subMenuList} /> : null}
    </React.Fragment>
  );
};

export default Header;
