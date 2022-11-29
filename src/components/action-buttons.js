import React from "react";

const ActionButtons = ({ onPreview, onEdit, onDelete, onSearch, onAdd ,row}) => {
  
  return (
    <div className="action_btns"> 
      {onSearch && <i class="icon-2x text-dark-50 flaticon2-search-1"></i>}
      {onPreview && <i class="fas fa-search mr-2" onClick={onPreview}></i>}
      {onEdit && <i class="far fa-edit mr-2" onClick={onEdit}></i>}
      {onDelete && <i class="far fa-trash-alt mr-2" onClick={()=>onDelete(row)}></i>}
      {onAdd && <i class="far fa-plus-alt mr-2" onClick={onAdd}></i>}
    </div>
  );
};

export default ActionButtons;
