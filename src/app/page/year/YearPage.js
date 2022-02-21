import React, { useState, useEffect } from "react";
import * as actions from "../../datas/_redux/DashboardActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import { YearFilters } from "./filter/YearFilters";
import { ColumnChart } from "./charts/ColumnChart";

import useWindowDimensions from "../../components/useWindowDimensions";
import { getD2BarHeight, getD3ChartHeight } from "../../components/DynamicHeight";
import { dateISOString } from "../../datas/components/dateISOString";
import { BarChart } from "./charts/BarChart";


export function YearPage() {
  // const [datePickerFilter, setDatePickerFilter] = useState([]);
  // const [dateRangeFilter, setDateRangerFilter] = useState([null, null]);
  // const [timeMasonryName, setTimeMasonryName] = useState("nearly_week");
  const [activityNameFilter, setActivityNameFilter] = useState();

  const [barHeight, setBarHeight] = useState([]);
  const { height } = useWindowDimensions();
  const dfBarHeight = 730;

  useEffect(() => {
    setBarHeight(getD2BarHeight(dfBarHeight, height));
  }, [ height]);

  const dispatch = useDispatch();

  const { dashboard2ChartData, infoData } = useSelector(
    (state) => ({
      dashboard2ChartData: state.dashboard.dashboard2ChartData,
      infoData: state.dashboard.infoData,
    }),
    shallowEqual
  );
  useEffect(() => {
    dispatch(
      actions.getDashboard2ChartData({ author: infoData?.loginId || "412" })
    );
  }, []);
console.log(activityNameFilter)
  // useEffect(() => {
  //   dispatch(
  //     actions.getDashboard3ChartData({
  //       cityname: countyCityFilter,
  //       system: systemNameFilter,
  //     })
  //   );
  // }, [countyCityFilter, systemNameFilter]);

  // useEffect(() => {
  //   dispatch(
  //     actions.getDashboard3_2DateRange({
  //       date: timeMasonryName,
  //       cityname: countyCityFilter,
  //       system: systemNameFilter,
  //       start: dateRangeFilter[0],
  //       end: dateRangeFilter[1],
  //     })
  //   );
  // }, [timeMasonryName, countyCityFilter, systemNameFilter, dateRangeFilter]);

  return (
    <>
      <Container maxWidth="false">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Grid
            item
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}
            xs={9}
          >
            <Grid item xs={12} sm={6}>
              <BarChart
                seriesData={dashboard2ChartData?.attendance_rate || {}}
                height={barHeight}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ColumnChart
                seriesData={dashboard2ChartData?.attendance_status || {}}
                height={barHeight}
              />
            </Grid>
            {/* <Grid item xs={12} sm={12}>
              <TrendLineChart
                seriesData={dashboard3_2DateRange ? dashboard3_2DateRange : {}}
                height={barHeight}
                countyCityName={countyCityFilter}
                systemName={systemNameFilter}
                dateRange={
                  dateRangeFilter[0] == null || dateRangeFilter[1] == null
                    ? datePickerFilter
                    : dateRangeFilter
                }
                setMouseMove={setMouseMove}
              />
            </Grid> */}
          </Grid>

          <Grid item xs={3} sm={3}>
            <YearFilters
              activityNameFilter={activityNameFilter}
              setActivityNameFilter={setActivityNameFilter}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
