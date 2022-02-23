import * as dashboardAPI from "./DashboardCrud.js";
import { DashboardSlice } from "./DashboardSlice";

const { actions } = DashboardSlice;

export const login = () => (dispatch) => {
  return dashboardAPI
    .login()
    .then((res) => {
      const DashboardData = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getInfoData = () => (dispatch) => {
  return dashboardAPI
    .infoData()
    .then((res) => {
      const DashboardData = res.data;
      dispatch(
        actions.setInfoData({
          infoData: DashboardData.data,
        })
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getDashboard1ChartData =
  ({ author, ma_id }) =>
  (dispatch) => {

    return dashboardAPI
      .getDashboard1ChartData(author, ma_id)
      .then((res) => {
        const DashboardData = res.data;
        dispatch(
          actions.setDashboard1ChartData({
            dashboard1ChartData: DashboardData,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const getDashboard2ChartData =
  ({ author }) =>
  (dispatch) => {
    return dashboardAPI
      .getDashboard2ChartData(author)
      .then((res) => {
        const DashboardData = res.data;
        dispatch(
          actions.setDashboard2ChartData({
            dashboard2ChartData: DashboardData,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const getExcelOptions =
  ({ author, ma_id }) =>
  (dispatch) => {
    return dashboardAPI
      .getExcelOptions(author, ma_id)
      .then((res) => {
        const DashboardData = res.data;
        dispatch(
          actions.setExcelOptions({
            excelOptions: DashboardData,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const getExcelName =
  ({author, ma_id,request}) =>
  (dispatch) => {
    console.log("request",request)
    return dashboardAPI
      .getExcelName(author, ma_id,request)
      .then((res) => {
        // window.location.href = res 
        const DashboardData = res.data;
        console.log(DashboardData,'DashboardData')
        dispatch(
          actions.setExcelName({
            excelName: DashboardData,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
