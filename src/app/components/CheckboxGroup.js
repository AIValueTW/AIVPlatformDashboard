import React from "react";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

export function CheckboxGroup({ array, name, handleChange,engName,exportOptions }) {
  const selected=exportOptions?exportOptions[engName]:[]
  console.log(engName)
  console.log(array)
  console.log(selected)
  const isAllSelected =
  array.options.length > 0 && selected.length === array.options.length;
  console.log(isAllSelected)
  return (
    <FormControl
      sx={{ maxHeight: "180px", minWidth: "100%", overflowY: "auto" }}
    >
      <FormControlLabel
         label="全選"
         control={<Checkbox  />}
         value="all"
         name="全選"
         onChange={handleChange} 
         checked={isAllSelected}
         indeterminate={ selected.length > 0 && selected.length < array.options.length}
         
        //  sx={{marginLeft:"1px"}}
        />
      <FormGroup  sx={{ml:3}}>
       
      
        {array.options?.map((option) => {
          return (
            <FormControlLabel
              onChange={handleChange}
              value={option}
              name={name}
              control={<Checkbox />}
              label={option}
              checked={selected.indexOf(option) > -1}
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );
}
