import { Box, Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { styled } from "@mui/system";

export default function TreemapChart({ data, title, height }) {
  const Title = styled(Typography)`
    font-size: 1.6vw;
    font-weight: 600;
    color: #fff;
  `;

  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    if (data) {
      setSeries([{ name: "avg", data: data }]);
    }
  }, [data]);

  useEffect(() => {
    setOptions({
      legend: {
        show: false,
      },
      chart: {
        height: 350,
        type: "treemap",
        animations: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: true,
        offsetY: -6,
        style: {
          fontSize: "12vw",
        },
        formatter: function (text, op) {
          return [text, op.value];
        },
      },
      tooltip: {
        fixed: {
          enabled: true,
          position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60,
        },
        style: {
          fontSize: "16px",
        },
      },

      colors: ["#25287e"],
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
  }, [series]);

  return (
    <>
      <Card raised={true} sx={{ textAlign: "center" }}>
        <Box
          style={{
            background: "linear-gradient(to right , #000113, #020f77)",
            padding: "4px",
          }}
        >
          <Title>{title}</Title>
        </Box>
        <Box sx={{ padding: "10px 10px" }}>
          {options ? (
            <Chart
              options={options}
              series={series}
              type="treemap"
              height={height}
            />
          ) : null}
        </Box>
      </Card>
    </>
  );
}
