import React, { useState, useEffect } from "react";
import * as actions from "../../datas/_redux/DashboardActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { BarChart } from "./charts/BarChart";
import { RadialBarChart } from "./charts/RadialBarChart";
import TreemapChart from "./charts/TreemapChart";
import useWindowDimensions from "../../components/useWindowDimensions";

import { NivoPieChart } from "./charts/NivoPieChart";
import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import {
  processBar,
  processRadial,
  processTreemap,
} from "../../datas/ProcessData";
import {
  getD1BarHeight,
  getD1CardHeight,
  getD1PieHeight,
  getD1RadialHeight,
  getD1TreemapHeight,
} from "../../components/DynamicHeight";
import { OverviewFilters } from "./filter/OverviewFilters";

export function OverviewPage() {
  const { height } = useWindowDimensions();
  const [activityNameFilter, setActivityNameFilter] = useState("0");
  const [color, setColor] = useState("all");

  const [cardHeight, setCardHeight] = useState([]);
  const [radialHeight, setRadialHeight] = useState([]);
  const [barHeight, setBarHeight] = useState([]);
  const [treemapHeight, setTreemapHeight] = useState([]);
  const [pieHeight, setPieHeight] = useState([]);

  const dfCardHeight = 150;
  // const dfCardHeight = 230;
  const dfRadialHeight = 355;
  const dfBarHeight = 324;
  const dfTreemapHeight = 460;
  const dfPieHeight = 245;

  useEffect(() => {
    setCardHeight(getD1CardHeight(dfCardHeight, height));
    setRadialHeight(getD1RadialHeight(dfRadialHeight, height));
    setBarHeight(getD1BarHeight(dfBarHeight, height));
    setTreemapHeight(getD1TreemapHeight(dfTreemapHeight, height));
    setPieHeight(getD1PieHeight(dfPieHeight, height));
  }, [height]);

  const dispatch = useDispatch();

  const { dashboard1ChartData, dashboard2ChartData, infoData, excelOptions } =
    useSelector(
      (state) => ({
        dashboard1ChartData: state.dashboard.dashboard1ChartData,
        dashboard2ChartData: state.dashboard.dashboard2ChartData,
        infoData: state.dashboard.infoData,
        excelOptions: state.dashboard.excelOptions,
      }),
      shallowEqual
    );


  useEffect(() => {
    dispatch(actions.login());
  }, []);


  useEffect(() => {
    dispatch(
      actions.getDashboard1ChartData({
        author: infoData?.loginId || "412",
        ma_id:
          dashboard2ChartData?.droplist.value[
            activityNameFilter !== -1 ? activityNameFilter : "0"
          ],
      })
    );
  }, [dashboard2ChartData, activityNameFilter]);

  console.log(infoData)
  
  useEffect(() => {
    dispatch(
      actions.getDashboard2ChartData({ author: infoData?.loginId || "412" })
    );
  }, []);

  const radialData = processRadial({
    rawData: dashboard2ChartData?.attendance_rate,
    checkIndex: activityNameFilter !== -1 ? activityNameFilter : "0",
  });
  const jobNameData = processBar({ rawData: dashboard1ChartData?.職稱 || [] });
  const industryData = processTreemap({
    rawData: dashboard1ChartData?.產業 || [],
  });
console.log(activityNameFilter)
  return (
    <>
      <Container maxWidth="false">
        <Grid
          item
          xs
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1.5}
        >
          <Grid
            item
            xs
            sm={12}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1.5}
          >
            <Grid item xs container spacing={1.5}>
              <Grid item xs={12} sm={12}>
                <Card
                  raised={true}
                  sx={{ backgroundColor: "#b8c0ea", height: cardHeight }}
                >
                  <CardContent>
                    <Stack
                      direction={
                        cardHeight < dfCardHeight ? "column" : "column"
                      }
                      // divider={<Divider orientation="vertical" flexItem />}
                      justifyContent="flex-start"
                      alignItems={
                        cardHeight < dfCardHeight ? "flex-start" : "flex-start"
                      }
                      spacing={1}
                    >
                      <Typography
                        sx={{
                          fontSize: "3.5vmin",
                          fontWeight: 600,
                          color: "#1f1f27",
                        }}
                      >
                        主辦人：{dashboard1ChartData?.default.nickname}
                      </Typography>
                      <OverviewFilters
                        data={dashboard2ChartData?.droplist || {}}
                        defaultValue={
                          dashboard2ChartData?.droplist.name[0] || ""
                        }
                        activityNameFilter={activityNameFilter}
                        setActivityNameFilter={setActivityNameFilter}
                        formWidth={cardHeight < dfCardHeight ? 310 : "lg"}
                        excelOptions={excelOptions ? excelOptions : {}}
                      />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <RadialBarChart
                  data={radialData ? radialData : {}}
                  checkIndex={
                    activityNameFilter !== -1 ? activityNameFilter : "0"
                  }
                  height={radialHeight}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <BarChart
                  data={jobNameData ? jobNameData : {}}
                  height={barHeight}
                  // height={"60vh"}
                />
              </Grid>
            </Grid>
            {industryData.length ? (
              <Grid item xs={4} sm={3.5}>
                <TreemapChart
                  data={industryData ? industryData : []}
                  title={"產業"}
                  height={treemapHeight}
                />
              </Grid>
            ) : null}
          </Grid>
          <Grid xs item spacing={1.5}>
            <Stack direction="row" spacing={1.5} sx={{ width: "100%" }}>
              {dashboard1ChartData && dashboard1ChartData.狀態 ? (
                <NivoPieChart
                  data={dashboard1ChartData.狀態}
                  title={"報名及報到人數"}
                  colors={["#191970", "#a0c4e6", "#187a7a"]}
                  height={pieHeight}
                />
              ) : null}
              {dashboard1ChartData && dashboard1ChartData.場次 ? (
                <NivoPieChart
                  data={dashboard1ChartData?.場次 || []}
                  title={"場次"}
                  colors={["#191970", "#0abab5"]}
                  height={pieHeight}
                />
              ) : null}
              {dashboard1ChartData && dashboard1ChartData.性別 ? (
                <NivoPieChart
                  data={dashboard1ChartData?.性別 || []}
                  title={"性別"}
                  colors={["#8fbbe5", "#eab1d1", "#c994c7"]}
                  height={pieHeight}
                />
              ) : null}
              {dashboard1ChartData && dashboard1ChartData.職級 ? (
                <NivoPieChart
                  data={dashboard1ChartData?.職級 || []}
                  title={"職級"}
                  colors={["#191970", "#a0c4e6", "#f57719", "#0077B5"]}
                  height={pieHeight}
                />
              ) : null}
              {dashboard1ChartData && dashboard1ChartData.職務 ? (
                <NivoPieChart
                  data={dashboard1ChartData?.職務 || []}
                  title={"職務"}
                  height={pieHeight}
                />
              ) : null}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
