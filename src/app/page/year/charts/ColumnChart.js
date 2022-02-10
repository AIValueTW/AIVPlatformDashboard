import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";

import Chart from "react-apexcharts";
import { Box, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";

export function ColumnChart({ seriesData ,height}) {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let seriesDataTemp=[]
    for(const key in seriesData){
      seriesDataTemp.push(seriesData[key])
    }
    if(seriesDataTemp.length){
      let seriesTemp=[]
      seriesDataTemp.map((datum)=>{
        seriesTemp.push({
          name:datum.name,
          data:datum.value
        })
      })
      setSeries(seriesTemp)
    }
  }, [seriesData]);

  useEffect(() => {
    setOptions({
      chart: {
        type: "bar",
        height: 350,
        offsetY:6,
        toolbar: {
          show: false,
        },
        animations: {
          enabled: true,
        },
      },

      colors: ["#f5c855","#0c2466"],
      plotOptions: {
        bar: {
          borderRadius: 4,
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enabled: false,
        style: {
          fontSize: "14px",
          colors: ["#000000"],
        },
        offsetY:-20
      },
      tooltip:{
        fixed: {
          enabled: true,
          position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        },
        style:{
          fontSize:"16px"
        },
        y:{
          formatter: function(value) {
            return value.toFixed(0)
          }
        } 
      },
      xaxis: {
        categories: ["報名人數","報到人數"],
        labels: {
          hideOverlappingLabels: true,
          style: {
            fontSize: "1.8vmin",
            colors: "#000000",
          },
          offsetY: 2,
          // offsetX:3
        },
        // tickAmount: 6,
        axisTicks: {
          offsetY: -1,
        },
      },
      yaxis: {
        labels: {
          show: true,
          // offsetY: 6,
          style: {
            fontSize: "1.8vmin",
            colors: "#000000",
          },
        },
        tickAmount: 6,
      },
      fill: {
        opacity: 1
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
       <Card raised={true} sx={{textAlign:"center"}}>
          <Box style={{background:"linear-gradient(to right , #000113, #020f77)",padding:"1.2vmin"}}>
            <Title >
              活動報名及報到人數比較
            </Title>
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
