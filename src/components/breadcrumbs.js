 
import React from 'react';
import { Link } from 'react-router-dom';

const CustomBreadcrumb = () => {

    const title = window.location.pathname.split("/");
 

    return(
        <div className="subheader pb-2 subheader-transparent">
        <div className="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
            <div className="d-flex align-items-center flex-wrap mr-1">
                <div className="d-flex align-items-baseline flex-wrap mr-5">
                    <h5 className="text-dark font-weight-bold my-1 mr-5 text-capitalize">{title[1]?.replace(/-/g," ")}</h5>
                    <ul className="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 my-2 font-size-sm">
                        <li className="breadcrumb-item text-muted">
                            <Link to={`${title[1]}/${title[2]}/${title[3]}/${title[4]}`} className="text-muted text-capitalize">{title[3]?.replace(/-/g," ")}</Link>
                        </li>
                       {title[3] ?  <li className="breadcrumb-item text-muted">
                            <Link to={`${title[1]}/${title[2]}/${title[3]}/${title[4]}/${title[5]}/${title[6]}`} className="text-muted text-capitalize">{title[5]?.replace(/-/g," ")}</Link>
                        </li> : null}
                    </ul>
                </div>
            </div>
        </div>
    </div>
    )
}

export default CustomBreadcrumb;