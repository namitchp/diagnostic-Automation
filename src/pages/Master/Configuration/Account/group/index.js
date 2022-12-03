import { Tab, Tabs } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import ConfigGroupBrowse from './browse';
import AddOrEditGroup from './form';
 
const GroupIndex = () => {
    const [selectedIndex , setSeletedIndex] = useState(0);
const [editdata, seteditdata] = useState("")
    const handleIndex = (event, newValue) => {
    
        setSeletedIndex(newValue);
        seteditdata("")
    }
    const handelEdit=(edit)=>{
        const editData=edit.type="edit";
        setSeletedIndex(1)
        seteditdata(edit)
    }
    const handelPreview=(preview)=>{
        const previewData=preview.type="preview";
        setSeletedIndex(1)
        seteditdata(preview)
    }

    return <div className="px-3">
            <Tabs
                className="w-100"
                value={selectedIndex}
                onChange={handleIndex}
                indicatorColor="primary"
                aria-label="scrollable auto tabs example">
                    <Tab value={0} label="Browse" />
                    <Tab value={1} label="New Group" />
            </Tabs>
            <div className="customtab-container w-100 py-3">
                {/* {selectedIndex === 0 ? <ConfigGroupBrowse onActionClick={(index) => handleIndex({} , index)}/>:<AddOrEditGroup onClose={(index) => handleIndex({} , index)} />} */}
                {selectedIndex === 0 ? <ConfigGroupBrowse  onEdit={handelEdit} onPreview={handelPreview}/>:<AddOrEditGroup onClose={(index) => handleIndex({} , index)}  editData={editdata}/>}
            </div>
    </div>
}

export default GroupIndex;