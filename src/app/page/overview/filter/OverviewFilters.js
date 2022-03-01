import React,{useState} from "react";

import {
  Stack,
  Typography,
} from "@mui/material";
import { ExcelFilter } from "./components/ExcelFilter";
import { ActivityFilter } from "./components/ActivityFilter";

export function OverviewFilters({ data,defaultValue, activityNameFilter,setActivityNameFilter,formWidth }) {
  const [field, setField] = useState([]);

  return (
    <Stack direction="row" alignItems="center">
      <Typography sx={{ fontSize: "3.5vmin", fontWeight: 600, color: "#1f1f27" }}>
        活動名稱：
      </Typography>
     <ActivityFilter
        data={data}
        defaultValue={defaultValue}
        activityNameFilter={activityNameFilter}
        setActivityNameFilter={setActivityNameFilter}
        setField={setField}
        formWidth={formWidth}
     />
    <ExcelFilter
    activityNameFilter={activityNameFilter}
    value={field}
    setValue={setField}
    />
    </Stack>
  );
}
