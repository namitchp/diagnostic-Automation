 
import React from 'react';
import { Link } from 'react-router-dom';

const CustomBreadcrumb = () => {

    const title = window.location.pathname.split("/")[1];
    const Subtitle = window.location.pathname.split("/")[2];

    return(
        <div className="subheader py-2 py-lg-3 subheader-transparent">
        <div className="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
            <div className="d-flex align-items-center flex-wrap mr-1">
                <div className="d-flex align-items-baseline flex-wrap mr-5">
                    <h5 className="text-dark font-weight-bold my-1 mr-5 text-capitalize">{Subtitle ? Subtitle.replace(/-/g," ") : title}</h5>
                    <ul className="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 my-2 font-size-sm">
                        <li className="breadcrumb-item text-muted">
                            <Link to={`/main/${title}`} className="text-muted text-capitalize">{title}</Link>
                        </li>
                       {Subtitle ?  <li className="breadcrumb-item text-muted">
                            <Link to={`/main/${title}/${Subtitle}`} className="text-muted text-capitalize">{Subtitle.replace(/-/g," ")}</Link>
                        </li> : null}
                    </ul>
                    
                </div>
               
            </div>
        </div>
    </div>
    )
}

export default CustomBreadcrumb;