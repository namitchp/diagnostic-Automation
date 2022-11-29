import React,{useState} from 'react'
import RgpBrowseDc from './browse';

import RrgpAdd from './rrgp/add';



export default function ReturnableIndex() {
    const challanType = new URLSearchParams(window.location.search).get("type");
    const [index, setindex] = useState(0)
    // const history = useHistory();
    // console.log(challanType);

    return (
        <div className="card card-custom gutter-b  px-7 py-3">
            <ul className="nav nav-tabs nav-tabs-line">
                <li className="nav-item">
                    <a
                        className={
                            `nav-link ` +
                            (index === 0
                                ? "active"
                                : "")
                        }
                        onClick={() => {
                            // window.location.href = `/logistics/delivery-challan?type=${encodeURIComponent(
                            //   "SL" 
                            // )}`;
                            setindex(0)
                        }}
                    >
                        Browse
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={
                            `nav-link ` +
                            (index === 1 ? "active" : "")
                        }
                        onClick={() =>
                            // (window.location.href = `/logistics/delivery-challan?type=${encodeURIComponent(
                            //   "Non SL"
                            // )}`)
                            setindex(1)
                        }
                    >
                        Returnable Gate Pass
                    </a>
                </li>
              
              
               
            </ul>
            <div className="tab-content">
                {/* {(index === 0 || index === 1) && <ChallanIndex
                    type={challanType ? decodeURIComponent(challanType) : "SL"}
                />}  */}
                
                {  index===0&& <RgpBrowseDc/>}
                {  index===1&& <RrgpAdd/>}
            </div>
        </div>
    );
};
