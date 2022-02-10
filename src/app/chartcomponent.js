import { Grid, Stack } from "@mui/material";
import React from "react";
import { AreaChart } from "./Charts/Apexchart/AreaChart";
import { BarChart } from "./Charts/Apexchart/BarChart";
import { ColumnChart } from "./Charts/Apexchart/ColumnChart";
import { LineChart } from "./Charts/Apexchart/LineChart";
import { TreemapChart } from "./Charts/Apexchart/TreemapChart";

export default function chartcomponent({ store }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Stack spacing={1}>
          <LineChart
            data={"data"}
            title={"LineTitle"}
            colors={["#77B6EA", "#545454", "#557592"]}
            height={300}
          />
          <ColumnChart
            data={"data"}
            title={"ColumnChartTitle"}
            colors={["#77B6EA", "#545454", "#557592"]}
            height={300}
          />
          <BarChart
            data={"data"}
            title={"BarChartTitle"}
            colors={["#77B6EA", "#545454", "#557592"]}
            height={300}
          />
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack spacing={1}>
          <TreemapChart
            data={"data"}
            title={"TreemapTitle"}
            colors={["#557592"]}
            height={300}
          />
          <AreaChart
            data={"data"}
            title={"AreaTitle"}
            colors={["#77B6EA", "#545454", "#557592"]}
            height={300}
          />
        </Stack>
      </Grid>
    </Grid>
  );
}
