import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Chart from "react-apexcharts";

export function AreaChart({data,title,colors,height}) {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
      setSeries([{
        name: "Session Duration",
        data: [45, 52, 38, 24, 33, 26, 21, 20, 6]
      },
      {
        name: "Page Views",
        data: [35, 41, 62, 42, 13, 18, 29, 37, 36]
      },
      {
        name: 'Total Visits',
        data: [87, 57, 74, 99, 75, 38, 62, 47, 82]
      }
    ]);
  }, []);

  useEffect(() => {
    setOptions({
        chart: {
          height: 350,
          type: 'area',
          zoom: {
            enabled: false
          }
        },
        colors: colors,
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: title,
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        }
      },
    );
  }, [height,series]);

  return (
    <>
      <Card raised={true}>
          {options ? (
            <Chart
              options={options}
              series={series}
              type="area"
              height={height}
              width={"100%"}
            />
          ) : null}
      </Card>
    </>
  );
}
