import { createAction } from "@reduxjs/toolkit";
export const selectedComboMLFBId = createAction(
  "SELECTED_COMBO_MLFB_ID",
  (id) => ({
    payload: id,
  })
);
export const clearSelectedComboId = createAction(
  "CLEAR_SELECTED_COMBO_MLFB_ID"
);
export const selectedGodownId = createAction("SELECTED_GODOWN_ID", (id) => ({
  payload: id,
}));
export const clearSelectedGodownId = createAction("CLEAR_SELECTED_GODOWN_ID");
export const selectedItemGroupId = createAction(
  "SELECTED_ITEMGROUP_ID",
  (id) => ({
    payload: id,
  })
);

export const clearSelectedItemGroupId = createAction(
  "CLEAR_SELECTED_ITEMGROUP_ID"
);

export const selectedEmployeeId = createAction(
  "SELECTED_EMPLOYEE_ID",
  (id) => ({
    payload: id,
  })
);

export const clearSelectedEmployeeId = createAction(
  "CLEAR_SELECTED_EMPLOYEE_ID"
);

export const selectedProductId = createAction("SELECTED_PRODUCT_ID", (id) => ({
  payload: id,
}));

export const clearSelectedProductId = createAction("CLEAR_SELECTED_PRODUCT_ID");

export const selectedAccountId = createAction("SELECTED_ACCOUNT_ID", (id) => ({
  payload: id,
}));

export const clearSelectedAccountId = createAction("CLEAR_SELECTED_ACCOUNT_ID");
export const clearSelectedTempId = createAction("CLEAR_SELECTED_TEMP_ID");

//---------account configration--------------------------------

export const selectedRegionId = createAction("SELECTED_REGION_ID", (id) => ({
  payload: id,
}));

export const clearSelectedRegionId = createAction("CLEAR_SELECTED_REGION_ID");

export const selectedRatingId = createAction("SELECTED_RATING_ID", (id) => ({
  payload: id,
}));

export const clearSelectedRatingId = createAction("CLEAR_SELECTED_RATING_ID");

export const selectedDepartmentId = createAction(
  "SELECTED_DEPARTMENT_ID",
  (id) => ({
    payload: id,
  })
);

export const clearSelectedDepartmentId = createAction(
  "CLEAR_SELECTED_DEPARTMENT_ID"
);

export const selectedDesignationId = createAction(
  "SELECTED_DESIGNATION_ID",
  (id) => ({
    payload: id,
  })
);

export const clearSelectedDesignationId = createAction(
  "CLEAR_SELECTED_DESIGNATION_ID"
);

export const selectedSiemensId = createAction("SELECTED_SIEMENS_ID", (id) => ({
  payload: id,
}));

export const clearSelectedSiemensId = createAction("CLEAR_SELECTED_SIEMENS_ID");

export const selectedSupplyItemId = createAction(
  "SELECTED_SUPPLY_ITEM_ID",
  (id) => ({
    payload: id,
  })
);

export const clearSelectedSupplyItemId = createAction(
  "CLEAR_SELECTED_SUPPLY_ITEM_ID"
);
//---------end account configration--------------------------------
//---------end product configration--------------------------------

export const selectedCategoryId = createAction(
  "SELECTED_CATEGORY_ID",
  (id) => ({
    payload: id,
  })
);
export const clearSelectedCategoryId = createAction(
  "CLEAR_SELECTED_CATEGORY_ID"
);

export const selectedGroupId = createAction("SELECTED_GROUP_ID", (id) => ({
  payload: id,
}));
export const clearSelectedGroupId = createAction("CLEAR_SELECTED_GROUP_ID");

export const selectedItemId = createAction("SELECTED_ITEM_ID", (id) => ({
  payload: id,
}));
export const clearSelectedItemId = createAction("CLEAR_SELECTED_ITEM_ID");

export const selectedUnitId = createAction("SELECTED_UNIT_ID", (id) => ({
  payload: id,
}));
export const clearSelectedUnitId = createAction("CLEAR_SELECTED_UNIT_ID");

export const selectedGGId = createAction("SELECTED_GG_ID", (id) => ({
  payload: id,
}));
export const clearSelectedGGId = createAction("CLEAR_SELECTED_GG_ID");

//---------end product configration--------------------------------
//---------end enq configration--------------------------------

export const selectedPriorityId = createAction(
  "SELECTED_PRIORITY_ID",
  (id) => ({
    payload: id,
  })
);
export const clearSelectedPriorityId = createAction(
  "CLEAR_SELECTED_PRIORITY_ID"
);

export const selectedReferenceId = createAction(
  "SELECTED_REFERENCE_ID",
  (id) => ({
    payload: id,
  })
);
export const clearSelectedReferenceId = createAction(
  "CLEAR_SELECTED_REFERENCE_ID"
);

export const selectedEnqStatusId = createAction(
  "SELECTED_ENQ_STATUS_ID",
  (id) => ({
    payload: id,
  })
);
export const clearSelectedEnqStatusId = createAction(
  "CLEAR_SELECTED_ENQ_STATUS_ID"
);

export const selectedTypeId = createAction("SELECTED_TYPE_ID", (id) => ({
  payload: id,
}));
export const clearSelectedTypeId = createAction("CLEAR_SELECTED_TYPE_ID");

//---------end enq configration--------------------------------
//--------- COSTING configration--------------------------------

export const selectedFinanceId = createAction("SELECTED_FINANCE_ID", (id) => ({
  payload: id,
}));
export const clearSelectedFinanceId = createAction(
  "CLEAR_SELECTED_FINANCE._ID"
);

export const selectedLedgerId = createAction("SELECTED_LEDGER_ID", (id) => ({
  payload: id,
}));
export const clearSelectedLedgerId = createAction("CLEAR_SELECTED_LEDGER_ID");

export const selectedCostingTabsId = createAction(
  "SELECTED_COSTING_TABS_ID",
  (id) => ({
    payload: id,
  })
);
export const clearSelectedCostingTabsId = createAction(
  "CLEAR_SELECTED_COSTING_TABS_ID"
);

//---------end COSTING configration--------------------------------
