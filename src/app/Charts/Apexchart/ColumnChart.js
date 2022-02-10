import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Chart from "react-apexcharts";

export function ColumnChart({data,title,colors,height}) {
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
        type: 'bar',
        height: 350
      },
      colors: colors,
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      title: {
        text: title,
        align: 'left'
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands"
          }
        }
      }
      },
    );
  }, []);

  return (
    <>
      <Card raised={true}>
          {options ? (
            <Chart
              options={options}
              series={series}
              type="bar"
              height={height}
              width={"100%"}
            />
          ) : null}
      </Card>
    </>
  );
}
