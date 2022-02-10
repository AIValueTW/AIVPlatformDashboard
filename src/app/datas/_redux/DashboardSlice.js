import { createSlice } from "@reduxjs/toolkit";

const initialDashboardState = {
  actionsLoading: false,
  infoData:undefined, 
  //NewAPI
  dashboard1ChartData:undefined,
  dashboard2ChartData:undefined,
  excelOptions:undefined,
  excelName:""
};
export const callTypes = {
  action: "action",
};

export const DashboardSlice = createSlice({
  name: "dashborad",
  initialState: initialDashboardState,
  reducers: {
    startCall: (state, action) => {
      state.actionsLoading = true;
    },
    setInfoData:(state,action)=>{
      state.infoData = action.payload.infoData;
    },
    //NewAPI
    setDashboard1ChartData: (state, action) => {
      state.dashboard1ChartData = action.payload.dashboard1ChartData;
    },
    setDashboard2ChartData: (state, action) => {
      state.dashboard2ChartData = action.payload.dashboard2ChartData;
    },
    setExcelOptions: (state, action) => {
      state.excelOptions = action.payload.excelOptions;
    },
    setExcelName: (state, action) => {
      state.excelName = action.payload.excelName;
    },
  },
});
