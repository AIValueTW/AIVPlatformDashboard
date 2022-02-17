import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";

export function CheckboxGroup({ array, parameter, selected,temp,setSelected,setTemp,checkedAll,setCheckedAll }) {
  const [selectedValue, setSelectedValue] = useState([]);
  const [testTemp,setTestTemp]=useState([])
  const [isChecked, setIsChecked] = useState(false);

  const options = array.options;
// console.log(options)

console.log(checkedAll)
 
  const handleChange = (event) => {
    const value = event.target.value;
    const checked = event.target.checked; 
    
    if (value === parameter) {
      console.log("all")
      setIsChecked(checked)
      // setSelected(selected.length === options.length ? [] : options);
      setSelected([...selected,...options]);
      // setSelectedValue([...selectedValue,...options])
      setSelectedValue([...selectedValue,...options])
      return;
    }
    if (selected.indexOf(value) !== -1) {
      console.log("noall")
      // if value already present
      const newSelected = selected.filter((s) => s !== value);
      console.log(newSelected)
      setIsChecked(false)
      setSelected(newSelected);
      setSelectedValue(newSelected);
    } else {
      // if value not present
      console.log("one")
      setSelected([...selected, value]);
      setSelectedValue([...selectedValue,value]);
}
     
      // setTemp(selectedValue)
    

  };

//   const handleChange = (event) => {
//     const value = event.target.value;
//     const checked = event.target.checked; 
    
//     if (value === parameter) {
//       console.log("all")
//       setIsChecked(checked)
//       // setSelected(selected.length === options.length ? [] : options);
//       ;
//       // setSelectedValue([...selectedValue,...options])
//       if(checked===true){
//         setSelected([...selected,...options])
//       }
//       else{
//         setSelected([])
//       }
//       setSelectedValue([selectedValue,...options])
//       return;
//     }
//     if (selected.indexOf(value) !== -1) {
//       console.log("noall")
//       // if value already present
//       const newSelected = selected.filter((s) => s !== value);
//       console.log(newSelected)
//       setIsChecked(false)
//       setSelected(newSelected);
//       setSelectedValue(newSelected);
//     } else {
//       // if value not present
//       console.log("one")
//       setSelected([...selected, value]);
//       setSelectedValue([...selectedValue,value]);
// }
     
//       // setTemp(selectedValue)
    

//   };

  // console.log(selected)

  console.log(selectedValue,options)

 const isAllSelected =
    // options.length > 0 && selected.length === options.length;
    (options.length > 0 && selectedValue.length === options.length)||checkedAll===true



useEffect(()=>{
  setTemp(selected)
  // setTestTemp(selectedValue)
},[selected])

useEffect(()=>{
  setTestTemp(selectedValue)
},[selectedValue])


// console.log(testTemp)



  const listItem = options.map((option) => {
    return (
      <FormControlLabel
        label={option}
        control={<Checkbox onChange={handleChange} />}
        value={option}
        // name={parameter}
        checked={selected.includes(option)||checkedAll===true}
      />
    );
  });

  return (
    <FormControl
      sx={{ maxHeight: "180px", minWidth: "100%", overflowY: "auto" }}
    >
      <FormControlLabel
        label="全選"
        control={<Checkbox />}
        value={parameter}
        name={parameter}
        onChange={handleChange}
        checked={isAllSelected}
      />
      {/* <Checkbox value="all" onChange={handleChange} checked={isAllSelected} />
       Select All */}
      {listItem}
    </FormControl>
  );
}
