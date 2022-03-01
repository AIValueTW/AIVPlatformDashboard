import React, { useEffect, useState } from "react";
import * as actions from "../../../../datas/_redux/DashboardActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import { Checkbox, FormGroup } from "@mui/material";

export function ActivityFilter({ height, value, setValue }) {
  const [checkedOptions, setCheckedOptions] = useState([]);
  const [selectedName,setSelectedName]=useState([])

  const dispatch = useDispatch();

  const { dashboard2ChartData, infoData } = useSelector(
    (state) => ({
      dashboard2ChartData: state.dashboard.dashboard2ChartData,
      infoData: state.dashboard.infoData,
    }),
    shallowEqual
  );
  useEffect(() => {
    dispatch(
      actions.getDashboard2ChartData({ author: infoData?.loginId || "412" })
    );
  }, []);
 
  let options = dashboard2ChartData?.droplist.name;
let droplistData=dashboard2ChartData?.droplist
  const handleChange = (event) => {
    if(event.target.value!=="all"){
       let checkTemp = {
      ...checkedOptions,
      [event.target.value]: event.target.checked,
    };
    setCheckedOptions(checkTemp);
    let temp = [];
    for (const key in checkTemp) {
      if (checkTemp[key] == true) {
        temp.push(key);
      }
    }
    let valueTemp=[]
    temp.map((datum)=>{
      valueTemp.push(droplistData.value[droplistData.name.indexOf(datum)])
    })
    setValue(valueTemp);
    }
    else{
      setValue(droplistData.value)
      setSelectedName(options)
    }
   
  };

  return (
    <>
      <Card raised={false}>
        <CardContent>
          <Typography sx={{ fontSize: "1.6vw" }}>各項活動</Typography>
          <Typography
            sx={{ height: height, overflow: "auto", padding: "0.8vmin" }}
          >
            <FormControl component="fieldset">
              <FormGroup
                aria-label="gender"
                name="gender1"
                value={value}
                onChange={handleChange}
              >
                 <FormControlLabel
                      value="all"
                      name="全部"
                      control={<Checkbox />}
                      label="全部"
                    />
                {options?.map((option) => {
                  return (
                    <FormControlLabel
                      value={option}
                      name={option}
                      control={<Checkbox />}
                      label={option}
                    />
                  );
                })}
              </FormGroup>
            </FormControl>
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
