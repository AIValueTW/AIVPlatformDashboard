import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Chart from "react-apexcharts";

export function TreemapChart({data,title,colors,height}) {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
      setSeries([ {
        data: [
          {
            x: 'New Delhi',
            y: 218
          },
          {
            x: 'Kolkata',
            y: 149
          },
          {
            x: 'Mumbai',
            y: 184
          },
          {
            x: 'Ahmedabad',
            y: 55
          },
          {
            x: 'Bangaluru',
            y: 84
          },
          {
            x: 'Pune',
            y: 31
          },
          {
            x: 'Chennai',
            y: 70
          },
          {
            x: 'Jaipur',
            y: 30
          },
          {
            x: 'Surat',
            y: 44
          },
          {
            x: 'Hyderabad',
            y: 68
          },
          {
            x: 'Lucknow',
            y: 28
          },
          {
            x: 'Indore',
            y: 19
          },
          {
            x: 'Kanpur',
            y: 29
          }
        ]
      }
    ]);
  }, []);

  useEffect(() => {
    setOptions({
      legend: {
        show: false
      },
      chart: {
        height: 350,
        type: 'treemap'
      },
        colors: colors,
       
      
        title: {
          text: title,
          align: 'left'
        },
      
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
              type="treemap"
              height={height}
              width={"100%"}
            />
          ) : null}
      </Card>
    </>
  );
}
