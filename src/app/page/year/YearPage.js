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
  const [activityNameFilter, setActivityNameFilter] = useState();

  const [barHeight, setBarHeight] = useState([]);
  const { height } = useWindowDimensions();
  const dfBarHeight = 700;

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
