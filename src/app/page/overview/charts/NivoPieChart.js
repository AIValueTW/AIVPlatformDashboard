import React, { useEffect, useState } from "react";

import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";

import { ResponsivePie } from "@nivo/pie";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";

export function NivoPieChart({ data, title, colors, height }) {
  const [pieData,setPieData]=useState([{id:""}])
  const Title = styled(Typography)`
    font-size: 1.4vw;
    font-weight: 600;
    color: #fff;
  `;
   useEffect(()=>{
 
    if(data.length){
      setPieData(data)
    }
    else{
      setPieData([{id:"無資料",value:1}])
    }

  },[data])


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
        <Box style={{ height: height }}>
          <ResponsivePie
            data={pieData}
            sortByValue={false}
            margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
            startAngle={data.length===1?270:0}
            endAngle={-360}
            innerRadius={data.length <= 2 ? 0 : 0}
            activeOuterRadiusOffset={3}
            colors={colors&&pieData[0].id!=="無資料" ? colors :pieData[0].id=="無資料"?"#aeaeae": { scheme: "purple_orange" }}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["brighter", 3]] }}
            arcLinkLabel={function (e) {
              return e.id + "－" + e.value;
            }}
            arcLinkLabelsTextColor={{ from: "color", modifiers: [] }}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLinkLabelsDiagonalLength={5}
            arcLinkLabelsStraightLength={6}
            arcLabelsRadiusOffset={data.length <= 2 ? 0.5 : 0.58}
            arcLinkLabelsSkipAngle={15}
            arcLabelsSkipAngle={30}
            arcLabel="id"
            arcLabelsTextColor="#ffffff"
            enableArcLinkLabels={pieData[0].id=="無資料"?false:true}
            arcLinkLabel="value"
            theme={
              data.length <= 3
                ? {
                    fontSize: "1.7vmin",
                  }
                : {
                    fontSize: "1.5vmin",
                  }
            }
            isInteractive={true}
          />
        </Box>
      </Card>
    </>
  );
}
