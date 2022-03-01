import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";

import Chart from "react-apexcharts";
import { Box, Typography } from "@mui/material";

import { styled } from "@mui/system";

export function BarChart({ data, height }) {
  function getChartHeight(length) {
    var chartHeight = 240;

    if (length < 5) {
      return chartHeight;
    } else {
      chartHeight = chartHeight * (length / 5);
    }
    return chartHeight;
  }

  const Title = styled(Typography)`
    font-size: 1.4vw;
    font-weight: 600;
    color: #fff;
  `;
  const [options, setOptions] = useState(null);
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [barHeight, setBarHeight] = useState(["350"]);

  useEffect(() => {
    let seriesTemp = [];
    if (data.value) {
      let seriesValue = data.value;
      if (seriesValue.length >= 7) {
        seriesTemp = seriesValue.filter((value) => value > 2);
        setSeries([
          {
            name: "人數 ",
            data: seriesTemp,
          },
        ]);
      } else {
        setSeries([
          {
            name: "人數 ",
            data: data.value,
          },
        ]);
      }
    }
    setCategories(data.name);
    setBarHeight(getChartHeight(seriesTemp.length));
  }, [data]);

  useEffect(() => {
    setOptions({
      chart: {
        type: "bar",
        height: 350,
        offsetY: -15,
        offsetX: -10,
        toolbar: {
          show: false,
        },
        animations: {
          enabled: false,
        },
      },
     
      colors: ["#1ab7ea", "#39539E", "#0077B5"],
      plotOptions: {
        bar: {
          borderRadius: 4,
          distributed: true,
          horizontal: true,
          columnWidth: "45%",
          dataLabels: {
            position: "bottom",
          },
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: 2,
        offsetY:8,
        textAnchor: "start",
        style: {
          fontSize: "1.75vmin",
          color: "#3b597d",
        },
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + "  :  " + val;
        },
        dropShadow: {
          enabled: true,
          opacity: 0.7,
        },
      },
      tooltip: {
        style: {
          fontSize: "16px",
        },

        y: {
          formatter: function (value) {
            return value;
          },
        },
      },
      xaxis: {
        categories: categories,
        labels: {
          show: true,
          hideOverlappingLabels: true,
          rotate: -35,
          rotateAlways: false,
          style: {
            fontSize: "1.5vmin",
            colors: "#000000",
          },
          offsetY: 0,
          offsetX: 0,
        },
        axisTicks: {
          offsetY: -1,
        },
      },
      yaxis: {
        labels: {
          show: false,
          offsetY: 6,
          style: {
            fontSize: "18px",
            colors: "#000000",
          },
        },
        tickAmount: 6,
      },
      fill: {
        opacity: 1,
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

  return (
    <>
      <Card raised={true} sx={{ textAlign: "center" }}>
        <Box
          style={{
            background: "linear-gradient(to right , #000113, #020f77)",
            padding: "4px",
          }}
        >
          <Title>職稱</Title>
        </Box>
        <Box style={{ height: height, overflow: "auto", overflowX: "hidden",marginBottom:"0.5vw" }}>
            {options ? (
              <Chart
                options={options}
                series={series}
                type="bar"
                height={barHeight}
                width={"100%"}
              />
            ) : null}
        </Box>
      </Card>
    </>
  );
}
