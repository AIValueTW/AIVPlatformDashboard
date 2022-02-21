import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Grow, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";


import { getD2BarHeight, getD2MasonryHeight } from "../../../components/DynamicHeight";
import useWindowDimensions from "../../../components/useWindowDimensions";
import { ActivityFilter } from "./components/ActivityFilter";


import { ExcelFilter } from "./components/ExcelFilter";


export function YearFilters({
  activityNameFilter,
  // setDatePickerFilter,
  // setDateRangerFilter,
  // setTimeMasonryName,
  setActivityNameFilter,
}) {
  const [masonryHeight, setMasonryHeight] = useState([]);
  const [cardHeight, setCardHeight] = useState([]);
  const [textSize, setTextSWize] = useState([]);
  const [field, setField] = useState([]);
  const { height } = useWindowDimensions();

  const chartHeight = 120;
  const chartHeight2 = 300;

  useEffect(() => {
    setMasonryHeight(getD2MasonryHeight({ chartHeight, height }));
  }, [chartHeight, height]);

  useEffect(() => {
    setCardHeight(getD2BarHeight({ chartHeight2, height }));
  }, [chartHeight2, height]);

  return (
    <>
  
      {/* {mouseMove ? (
        <Grow in={true} timeout={900}> */}
          {/* <Card raised={true} sx={{ height: cardHeight }}> */}
            {/* <Typography
              sx={{ fontSize: "20px", marginTop: 1, marginLeft: 2 }}
            ></Typography> */}
            <CardContent>
              <Stack spacing={2} justifyContent="center" alignItems="stretch" >
              
                <ActivityFilter
                value={activityNameFilter}
                setValue={setActivityNameFilter}
                />
                <ExcelFilter
                activityNameFilter={activityNameFilter} 
                value={field} 
                setValue={setField}
                />
              </Stack>
            </CardContent>
          {/* </Card> */}
        {/* </Grow>
      ) : null} */}

    </>
  );
}
