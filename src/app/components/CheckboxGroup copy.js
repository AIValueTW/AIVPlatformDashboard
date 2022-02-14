
import { Checkbox,
  FormControl, 
  FormControlLabel} from "@mui/material";
import { useState } from "react";



export function CheckboxGroup({ array,name,selected,setSelected }) {
  const [selectedName,setSelectedName]=useState([])

  const options = array.options
  const isAllSelected =
    options.length > 0 && selected.length === options.length;

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name
    console.log(name);

//  let checkTemp = { [name]: };
    // console.log(checkTemp)

    // let excelTemp = {
    //   job_name: a,
    //   IP_industry: b,
    //   account_status: c,
    //   session: d,
    //   ipcheck_gender: e,
    //   office_position: f,
    //   IP_work_duty: g,
    // };

    if (value === "all") {
      setSelected(selected.length === options.length ? [] : options);
     
      return;
    }
    if (selected.indexOf(value) !== -1) {
      // if value already present
      const newSelected = selected.filter((s) => s !== value);
      setSelected(newSelected);
    } else {
      // if value not present
      setSelected([...selected, value]);
    }   
    
    

  };
  // console.log(selected)

  const listItem = options.map((option) => {
    return (
      <div key={option}>
        <Checkbox
          value={option}
          name={name}
          onChange={handleChange}
          checked={selected.includes(option)}
        />
        <span>{option}</span>
      </div>
    );
  });

  return (
    <FormControl
    sx={{ maxHeight: "180px", minWidth: "100%", overflowY: "auto" }}
  >
    <FormControlLabel
     label="全選"
     control={<Checkbox  />}
     value="all"
     name={name}
     onChange={handleChange} 
     checked={isAllSelected}
    />
      {/* <Checkbox value="all" onChange={handleChange} checked={isAllSelected} />
       Select All */}
      {listItem}
      </FormControl>
  );
}
