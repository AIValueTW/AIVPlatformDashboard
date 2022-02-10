import React, { useEffect, useState } from "react";
// import "../../../../../charts/chartsStyle.css";
import Card from "@mui/material/Card";

import Chart from "react-apexcharts";
import { Box, Button, CardContent, styled, Typography } from "@mui/material";
import useWindowDimensions from "../../../components/useWindowDimensions";
import { getD1RadialHeight, getD2ChartHeight } from "../../../components/DynamicHeight";

import ButtonGroup from "@mui/material/ButtonGroup";

function BasicButtonGroup() {
  const ChartButton = styled(Button)`
    font-size: 20px;
    font-weight: 600;
    color: #0c3f3f;
    float: "right";
  `;
  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <ChartButton>當月</ChartButton>
      <ChartButton>當週</ChartButton>
      <ChartButton>當日</ChartButton>
    </ButtonGroup>
  );
}

export function RadialBarChart({ data,height}) {
  const Title = styled(Typography)`
  font-size: 1.4vw;
  font-weight: 600;
  color: #fff;
`;
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState(null);
  const [activityName, setActivityName] = useState([]);

  

  useEffect(() => {
    if (data) {
      setSeries([data.value]);
    }
    if (data.name) {
      setActivityName(data.name);
    }
  }, [data]);

  useEffect(() => {
    setOptions({
      chart: {
        type: "radialBar",
        height: 350,
        offsetY: 10,
        toolbar: {
          show: false,
        },
      },
      // title: {
      //   text: "活動參與率",
      //   offsetX: 5,
      //   offsetY: -5,
      //   style: {
      //     fontSize: "28px",
      //     fontWeight: "bold",
      //     color: "#000000",
      //   },
      // },
      // subtitle: {
      //   text: "活動：",
      //   offsetY: 38,
      //   offsetX: 3,
      //   style: {
      //     color: "#000000",
      //     fontSize: "18px",
      //   },
      // },
      plotOptions: {
        radialBar: {

           hollow: {
            margin: 0,
            size: '70%',
            background: '#fff',
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: '#fff',
            strokeWidth: '90%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },
      colors:["#121116","#304875"],
          dataLabels: {
            show: true,
            name: {
              offsetY: -22,
              show: true,
              color: '#888',
              fontSize: '1.5vw'
            },
            value: {
              formatter: function(val) {
                return parseInt(val)+"%";
              },
              color: '#111',
              fontSize: '3.4vw',
              show: true,
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#304875'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: 'round'
      },
      labels: ["參與率"],
    },
    
    );
  }, [activityName]);

  return (
    <>
      <Card raised={true} sx={{textAlign:"center"}}>
      <Box style={{background:"linear-gradient(to right , #000113, #020f77)",padding:"4px"}}>
            <Title >
            活動參與率
            </Title>
          </Box>
        <Box>
          {options ? (
            <Chart
              options={options}
              series={series}
              type="radialBar"
              height={height}
              width={"100%"}
            />
          ) : null}
        </Box>
      </Card>
    </>
  );
}
