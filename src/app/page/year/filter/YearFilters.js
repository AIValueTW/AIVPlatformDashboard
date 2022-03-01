import React, { useState, useEffect } from "react";
import CardContent from "@mui/material/CardContent";
import { Stack } from "@mui/material";

import { getD2BarHeight } from "../../../components/DynamicHeight";
import useWindowDimensions from "../../../components/useWindowDimensions";
import { ActivityFilter } from "./components/ActivityFilter";

import { ExcelFilter } from "./components/ExcelFilter";

export function YearFilters({ activityNameFilter, setActivityNameFilter }) {
  const [cardHeight, setCardHeight] = useState([]);
  const [textSize, setTextSWize] = useState([]);
  const [field, setField] = useState([]);
  const { height } = useWindowDimensions();

  const chartHeight = 120;
  const chartHeight2 = 300;

  useEffect(() => {
    setCardHeight(getD2BarHeight({ chartHeight2, height }));
  }, [chartHeight2, height]);

  return (
    <>
      <CardContent>
        <Stack spacing={2} justifyContent="center" alignItems="stretch">
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
    </>
  );
}
