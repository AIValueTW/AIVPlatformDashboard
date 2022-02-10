import React, { useEffect, useState } from "react";
// import "../../../../../charts/chartsStyle.css";
import Card from "@mui/material/Card";

import Chart from "react-apexcharts";
import { Box, CardContent, Typography } from "@mui/material";
import useWindowDimensions from "../../../components/useWindowDimensions";
import { getD2ChartHeight } from "../../../components/DynamicHeight";

import { RiVipCrownFill } from "react-icons/ri";
import crownIcon from "../../../../../src/crownIcon.png";
import { styled } from "@mui/system";
// import { getAllChartHeight, getChartHeight, getYAxisSize } from "../../../components/DynamicHeight";

export function BarChart({ seriesData, height }) {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState(null);
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    setSeries([
      {
        name: "參與率 ",
        data: seriesData.value,
      },
    ]);
    setCategories(seriesData.name);
  }, [seriesData]);

  useEffect(() => {
    setOptions({
      chart: {
        type: "bar",
        height: 350,
        offsetY: 0,
        toolbar: {
          show: false,
        },
      },

      colors: [
        // "#9de0e0",
        // "#27c7c7",
        "#f7b756",
        // "#f39f5f",
        // "#bec9c5",
        // "#f5c855",
        // "#f8e191",
        "#f57719",
      ],
      plotOptions: {
        bar: {
          // borderRadius: 4,
          columnWidth: "45%",
          horizontal: true,
          distributed: true,
          dataLabels: {
            position: "bottom",
          },
        },
      },
      tooltip:{
       
        style:{
          fontSize:"16px"
        },
        y:{
          formatter: function(value) {
            return value.toFixed(0) + "%"
          }
        } 
      },
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        // offsetX: -35,
        // offsetY:1,

        style: {
          fontSize: "1.8vmin",
          colors: ["#ffffff"],
        },
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + "：" + val + "%";
        },
        dropShadow: {
          enabled: true,
          opacity: 0.9
        },
      },

      xaxis: {
        categories: categories,
        labels: {
          hideOverlappingLabels: true,
          style: {
            fontSize: "1.5vmin",
            colors: "#000000",
          },
          offsetY: 3,
        },
        tickAmount: 6,
        axisTicks: {
          offsetY: -1,
        },
      },
      yaxis: {
        labels: {
          show: false,
          offsetY: 6,
          style: {
            fontSize: "1.8vmin",
            colors: "#000000",
          },
        },
      },
      legend: {
        show: false,
      },
      noData: {
        text: "無資料",
        align: "center",
        verticalAlign: "middle",
        offsetX: 0,
        offsetY: 0,
        style: {
          color: undefined,
          fontSize: "18px",
          fontFamily: undefined,
        },
      },
    });
  }, [categories]);

  const Title = styled(Typography)`
    font-size: 1.6vw;
    font-weight: 600;
    color: #fff;
  `;

  return (
    <>
      <Card raised={true} sx={{ textAlign: "center" }}>
        <Box
          style={{
            background: "linear-gradient(to right , #000113, #020f77)",
            padding: "1.2vmin",
          }}
        >
          <Title>活動參與率比較</Title>
        </Box>
        <CardContent>
          {options ? (
            <Chart
              options={options}
              series={series}
              type="bar"
              height={height}
              width={"100%"}
            />
          ) : null}
        </CardContent>
      </Card>
    </>
  );
}
