import React,{useState} from 'react'
import JobWorkAdd from './add';
import MrnAddDc from './add';
import JobWorkBrowse from './browse';
import MrnBrowseDc from './browse';

export default function JobWorkIndex({type}) {
    const [selectedIndex, setSeletedIndex] = useState(0);

    const handleIndex = (index) => {
        setSeletedIndex(index);
    };

    return (
        <div className="card card-custom gutter-b  px-7 py-3">
            <ul className="nav nav-tabs nav-tabs-line">
                <li className="nav-item">
                    <a
                        className={`nav-link ` + (selectedIndex === 0 ? "active" : "")}
                        onClick={() => {
                            // dispatch(clearSelectedGodownId());
                            handleIndex(0);
                        }}
                    >
                        Browse
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link ` + (selectedIndex === 1 ? "active" : "")}
                        onClick={() => {
                            // dispatch(clearSelectedGodownId());
                            handleIndex(1);
                        }}
                    >
                    Job Work In
                    </a>
                </li>
            </ul>
            <div className="tab-content">
                {selectedIndex === 0 ? (
                    // <DeliveryChallanBrowse type={type} />
                    <JobWorkBrowse/>
                ) : (
                    // <AddDeliveryChallan challanType={type} />
                    <JobWorkAdd/>
                )}
            </div>
        </div>
    );
};
