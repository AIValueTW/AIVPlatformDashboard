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

  console.log(infoData);

  useEffect(() => {
    dispatch(
      actions.getDashboard2ChartData({ author: infoData?.loginId || "412" })
    );
  }, []);

  const radialData = processRadial({
    rawData: dashboard2ChartData?.attendance_rate,
    checkIndex: activityNameFilter !== -1 ? activityNameFilter : "0",
  });
  const jobNameData = processBar({ rawData: dashboard1ChartData?.?????? || [] });
  const industryData = processTreemap({
    rawData: dashboard1ChartData?.?????? || [],
  });

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
                        ????????????{dashboard1ChartData?.default.nickname}
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
              <Grid item container xs={12} spacing={1.5}>
                {radialData.value.length &&
                radialData.value[0] !== undefined ? (
                  <Grid item xs={12} sm={jobNameData.name.length ? 6 : 11.9}>
                    <RadialBarChart
                      data={radialData ? radialData : {}}
                      checkIndex={
                        activityNameFilter !== -1 ? activityNameFilter : "0"
                      }
                      height={radialHeight}
                    />
                  </Grid>
                ) : null}
                {jobNameData.name.length ? (
                  <Grid
                    item
                    xs={12}
                    sm={
                      radialData.value.length &&
                      radialData.value[0] !== undefined
                        ? 6
                        : 11.9
                    }
                  >
                    <BarChart
                      data={jobNameData ? jobNameData : {}}
                      height={barHeight}
                    />
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
            {industryData.length ? (
              <Grid item xs={4} sm={3.5}>
                <TreemapChart
                  data={industryData}
                  title={"??????"}
                  height={treemapHeight}
                />
              </Grid>
            ) : null}
          </Grid>
          <Grid xs item spacing={1.5}>
            <Stack direction="row" spacing={1.5} sx={{ width: "100%" }}>
              {dashboard1ChartData && dashboard1ChartData.?????? ? (
                <NivoPieChart
                  data={dashboard1ChartData.??????}
                  title={"?????????????????????"}
                  colors={["#191970", "#a0c4e6", "#187a7a"]}
                  height={pieHeight}
                />
              ) : null}
              {dashboard1ChartData && dashboard1ChartData.?????? ? (
                <NivoPieChart
                  data={dashboard1ChartData?.?????? || []}
                  title={"??????"}
                  colors={["#191970", "#0abab5"]}
                  height={pieHeight}
                />
              ) : null}
              {dashboard1ChartData && dashboard1ChartData.?????? ? (
                <NivoPieChart
                  data={dashboard1ChartData?.?????? || []}
                  title={"??????"}
                  colors={["#8fbbe5", "#eab1d1", "#c994c7"]}
                  height={pieHeight}
                />
              ) : null}
              {dashboard1ChartData && dashboard1ChartData.?????? ? (
                <NivoPieChart
                  data={dashboard1ChartData?.?????? || []}
                  title={"??????"}
                  colors={["#191970", "#a0c4e6", "#f57719", "#0077B5"]}
                  height={pieHeight}
                />
              ) : null}
              {dashboard1ChartData && dashboard1ChartData.?????? ? (
                <NivoPieChart
                  data={dashboard1ChartData?.?????? || []}
                  title={"??????"}
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
