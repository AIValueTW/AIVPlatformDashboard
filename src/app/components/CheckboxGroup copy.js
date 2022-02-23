import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";

export function CheckboxGroup({
  rawData,
  array,
  parameter,
  selected,
  setSelected,
  checkedAll,
}) {
  const [selectedValue, setSelectedValue] = useState([]);

  const options = array.options;

  const isAllSelected =
    options.length > 0 && selectedValue.length === options.length;
  // checkedAll === true;
  useEffect(() => {
    if (checkedAll === true) {
      let selectedTemp = [];
      for (const key in rawData) {
        for (const key2 in rawData[key]) {
          selectedTemp.push(...rawData[key][key2]);
        }
      }
      setSelected(selected.length === selectedTemp.length ? [] : selectedTemp);
      setSelectedValue(options);
    } else {
      setSelectedValue([]);
    }
  }, [checkedAll]);

  const handleChange = (event) => {
    const value = event.target.value;

    if (value === parameter) {
      // setSelected(selectedValue.length === options.length ?selected.filter(res=>!options.includes(res)):[...selected, ...options]);
      const newSelected = selected.filter((v) => {
        return !options.includes(v);
      });
      setSelected(
        selectedValue.length === options.length
          ? newSelected
          : [...selected, ...options]
      );
      setSelectedValue(selectedValue.length === options.length ? [] : options);

      return;
    }
    if (selected.indexOf(value) !== -1) {
      const newSelected = selected.filter((s) => s !== value);
      const newSelectedValue = selectedValue.filter((s) => s !== value);
      setSelected(newSelected);
      setSelectedValue(newSelectedValue);
    } else {
      // if value not present
      setSelected([...selected, value]);
      setSelectedValue([...selectedValue, value]);
    }
  };

  const listItem = options.map((option) => {
    return (
      <FormControlLabel
        label={option}
        control={<Checkbox onChange={handleChange} />}
        value={option}
        checked={selectedValue.includes(option)}
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
      {listItem}
    </FormControl>
  );
}
