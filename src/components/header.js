import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserRightList,
  getUserRightListSecond,
  getUserRightListThird,
} from "../_redux/actions/common.action";
import MainBar from "./appbar";
import MainMenu from "./main_menu";
import Submenu from "./sub_menu";
import ThirdMenu from "./third_menu";
const Header = ({ onHeaderClick }) => {
  const dispatch = useDispatch();
  const [userRightListArr, setUserRightList] = useState([]);
  const [subMenuList, setSubMenuList] = useState([]);
  const [thirdMenuList, setThirdMenuList] = useState([])
  
  let urlLocation=window.location.pathname
  .split("/")
  .filter((val) => val !== "");
  // console.log(urlLocation)
  const getuserRightListResponse = useSelector(
    (state) => state.common.userRightList
  );
  const getuserLIstSecond=useSelector(
    (state) => state.common.userRightListSecond
  );
  const getuserLIstThird=useSelector(
    (state) => state.common.userRightListThird
  );
  useEffect(() => {
    
  }, []);
  useEffect(()=>{
    dispatch(getUserRightList());
    dispatch(getUserRightListSecond(urlLocation[1]));
    parseInt(urlLocation[3])===12?dispatch(getUserRightListThird(1)):dispatch(getUserRightListThird(parseInt(urlLocation[3])))
  },[])
  useEffect(() => {
    if (getuserRightListResponse?.data?.length > 0) {
      setUserRightList(getuserRightListResponse.data);
    }
    if (getuserLIstSecond?.data?.length > 0) {
      setSubMenuList(getuserLIstSecond.data);
    }
    if (getuserLIstThird?.data?.length > 0) {
      setThirdMenuList(getuserLIstThird.data);
    }else{
      setThirdMenuList([]);
    }
  }, [getuserRightListResponse,getuserLIstSecond,getuserLIstThird]);
  
  const handleMenuChange =(id) => {
    var tempMenuIndex = userRightListArr.findIndex((x) => x.transaction_id === id);
    if (userRightListArr[tempMenuIndex].display_name !== "Profile") {
     dispatch(getUserRightListSecond(id));
     dispatch(getUserRightListThird(1));
    //  console.log("cvgbhn")
    //  setTimeout((tt) => {
    // console.log(tt)
    //   parseInt(urlLocation[3])===12?dispatch(getUserRightListThird(1)):dispatch(getUserRightListThird(parseInt(urlLocation[3])))
    //   console.log(urlLocation[3])
    //  },8000,urlLocation);
    //  console.log("g")
   
    }
  };
  const handleSubMenu = (id) => {
    if(subMenuList.length>0){
    id===12?dispatch(getUserRightListThird(1)):dispatch(getUserRightListThird(id))
      
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
