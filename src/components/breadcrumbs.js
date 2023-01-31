 
import React from 'react';
import { Link } from 'react-router-dom';

const CustomBreadcrumb = () => {

    const title = window.location.pathname.split("/");
 

    return(
        <div className="subheader pb-3 subheader-transparent">
        <div className=" pl-5 d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
            <div className="d-flex align-items-center flex-wrap ">
                <div className="d-flex align-items-baseline flex-wrap mr-5 rounded">
                    <h5 className="text-dark font-weight-bold my-2  pl-2 mr-1 text-capitalize">{title[1]?.replace(/-/g," ")} </h5>
                    <ul className="breadcrumb breadcrumb-transparent  font-weight-bold p-0 my-2 font-size-sm">
                    {title[3] ?<li className="breadcrumb-item text-dark">
                          <Link to={`${title[1]}/${title[2]}/${title[3]}/${title[4]}`} className="text-dark text-capitalize">&#8594; {title[3]?.replace(/-/g," ")}</Link>
                        </li> : null}
                       {title[5] ?  <li className=" pl-1 text-dark pr-3">
                            <Link to={`${title[1]}/${title[2]}/${title[3]}/${title[4]}/${title[5]}/${title[6]}`} className="text-dark text-capitalize"> &#8594; {title[5]?.replace(/-/g," ")}</Link>
                        </li> : null}
                    </ul>
                </div>
            </div>
        </div>
    </div>
    )
}

export default CustomBreadcrumb;