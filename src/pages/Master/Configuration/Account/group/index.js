import { Tab, Tabs } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearSelectedConfigGroup } from '../../../../../_redux/actions/masters/configuration.action';
import ConfigGroupBrowse from './browse';
import AddOrEditGroup from './form';
 
const GroupIndex = () => {
    const dispatch = useDispatch();
    const [selectedIndex , setSeletedIndex] = useState(0);

    const handleIndex = (event, newValue) => {
        setSeletedIndex(newValue);
        if(newValue === 0){
            dispatch(clearSelectedConfigGroup()) 
        }
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
                {selectedIndex === 0 ? <ConfigGroupBrowse onActionClick={(index) => handleIndex({} , index)} /> : <AddOrEditGroup onClose={(index) => handleIndex({} , index)} />}
            </div>
    </div>
}

export default GroupIndex;