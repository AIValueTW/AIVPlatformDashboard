import React from "react";
import { Box, FormControl, NativeSelect } from "@mui/material";

export function ActivityFilter({
  data,
  defaultValue,
  setActivityNameFilter,
  setField,
  formWidth,
}) {
  const optionsName = data?.name || [];
  const options = optionsName.map((option) => {
    const firstLetter = option[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      option,
    };
  });
  const defValue = options[0]?.option;

  return (
    <Box>
      <FormControl sx={{ minWidth: 120, maxWidth: formWidth }}>
        <NativeSelect
          sx={{
            fontSize: "2.2vmin",
            fontWeight: 600,
            height: "6vmin",
            padding: 2,
          }}
          defaultValue={defaultValue}
          id="grouped-select"
          onChange={(event) => {
            const value = event.target.value;
            setActivityNameFilter(data.name.indexOf(value));
            setField([]);
          }}
        >
          {options.map((datum) => {
            return (
              <option
                style={{ fontSize: "2vmin", padding: 2 }}
                value={datum.option}
              >
                {datum.option}
              </option>
            );
          })}
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
