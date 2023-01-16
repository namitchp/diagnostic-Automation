import React from 'react';
import { Link } from 'react-router-dom';
 



const MainMenu = (props) => {
    const { list, onMenuChange } = props;
    const selectedMenu = window.location.pathname.split("/")[1];
    return(
        <div className="header-bottom">
                <div className="px-3">
                    <div className="header-navs header-navs-left">
                    <ul className="menu-nav mb-0 list-unstyled d-flex flex-wrap">
                            {list.length > 0 ? list.map(( item, index ) => {
                                return <li className="menu-item " key={"menulist" + index}>
                                    <Link onClick={() => onMenuChange(item.transaction_id)} className={"menu-link py-2 px-4 rounded mr-2 d-inline-block " + (selectedMenu === (item.display_name.replace(/\s+/g, '-').toLowerCase()) ? "bg-danger  text-white" : "")} to={`/${item.transaction_name.toLowerCase()}/${item.transaction_id}`}> <span className="menu-text">{item.transaction_name}</span></Link>
                                </li>
                            }) : null}
                        
                     </ul>
                </div>
            </div>
        </div>
    )
}

export default MainMenu;

// + (selectedSubMenu === (item.menu_name.replace(/\s+/g, '-').toLowerCase()) ? "active" : "")