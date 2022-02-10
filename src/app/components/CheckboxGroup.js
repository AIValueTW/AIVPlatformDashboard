import React from "react";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

export function CheckboxGroup({ array, name, handleChange }) {

  return (
    <FormControl
      sx={{ maxHeight: "180px", minWidth: "100%", overflowY: "auto" }}
    >
      <FormGroup >
        {array.options?.map((option) => {
          return (
            <FormControlLabel
              onChange={handleChange}
              value={option}
              name={name}
              control={<Checkbox />}
              label={option}
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );
}
