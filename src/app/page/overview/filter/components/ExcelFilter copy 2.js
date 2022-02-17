import React, { useEffect, useState } from "react";
import * as actions from "../../../../datas/_redux/DashboardActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";

import { Checkbox, FormControlLabel, MenuItem } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import { CheckboxGroup } from "../../../../components/CheckboxGroup copy";

export function ExcelFilter({ activityNameFilter, value, setValue }) {
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [exportOptions, setExportOptions] = useState();

  const [selected, setSelected] = useState([]);

  const [selectedTemp, setSelectedTemp] = useState([]);

  let a = [];
  let b = [];
  let c = [];
  let d = [];
  let e = [];
  let f = [];
  let g = [];
  let h = []

  let excelTemp = {
    job_name: a,
    IP_industry: b,
    account_status: c,
    session: d,
    ipcheck_gender: e,
    office_position: f,
    IP_work_duty: g,
    selectall:h
  };

  const open = Boolean(anchorEl);

  const dispatch = useDispatch();

  const { excelOptions, dashboard2ChartData, infoData, excelName } =
    useSelector(
      (state) => ({
        excelOptions: state.dashboard.excelOptions,
        dashboard2ChartData: state.dashboard.dashboard2ChartData,
        infoData: state.dashboard.infoData,
        excelName: state.dashboard.excelName,
      }),
      shallowEqual
    );
  const Input = styled("input")({
    display: "none",
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setValue([]);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange=(event)=>{
    const checked = event.target.checked;
    console.log(event.target.checked)
    if (checked===true){
      h.push("all")
      for(const key in excelTemp){
        console.log(excelTemp[key])
      }
    }
    setExportOptions(excelTemp);
  }
  const onDownload = (event) => {
    const link = document.createElement("a");
    link.download = excelName;
    link.href =
      // "http://210.64.10.243/dashboard-api/download/?filename=" + excelName;
      "http://10.1.1.167/download/?filename=" + excelName;
    link.click();
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(
      actions.getExcelOptions({
        author: infoData?.loginId || "412",
        ma_id:
          dashboard2ChartData?.droplist.value[
            activityNameFilter !== -1 ? activityNameFilter : "1"
          ],
      })
    );
  }, [dashboard2ChartData, activityNameFilter]);

  useEffect(() => {
   
    if (excelOptions) {
      for (const key in excelOptions) {
        for (const key2 in excelOptions[key]) {
          selected.map((datum) => {
            switch (key) {
              case "職稱":
                if (excelOptions[key][key2].includes(datum)) {
                  if (!a.includes(datum)) {
                    a.push(datum);
                  }
                }
                break;
              case "產業":
                if (excelOptions[key][key2].includes(datum)) {
                  if (!b.includes(datum)) {
                    b.push(datum);
                  }
                }
                break;
              case "狀態":
                if (excelOptions[key][key2].includes(datum)) {
                  if (!c.includes(datum)) {
                    c.push(datum);
                  }
                }
                break;
              case "場次":
                if (excelOptions[key][key2].includes(datum)) {
                  if (!d.includes(datum)) {
                    d.push(datum);
                  }
                }
                break;
              case "性別":
                if (excelOptions[key][key2].includes(datum)) {
                  if (!e.includes(datum)) {
                    e.push(datum);
                  }
                }
                break;
              case "職級":
                if (excelOptions[key][key2].includes(datum)) {
                  if (!f.includes(datum)) {
                    f.push(datum);
                  }
                }
                break;
              default:
                if (excelOptions[key][key2].includes(datum)) {
                  if (!g.includes(datum)) {
                    g.push(datum);
                  }
                }
            }
          });
        }
      }
    }
    setExportOptions(excelTemp);
  }, [selected]);

  console.log(exportOptions);

  useEffect(() => {
    dispatch(
      actions.getExcelName({
        author: infoData?.loginId || "412",
        ma_id:
          dashboard2ChartData?.droplist.value[
            activityNameFilter !== -1 ? activityNameFilter : "1"
          ],
        request: exportOptions,
      })
    );
  }, [exportOptions]);

  const acchandleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const isAllSelected = exportOptions?.selectall.includes("all")

  return (
    <div>
      <Button
        sx={{ marginLeft: 2, fontSize: "1.5vmin" }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        onClick={handleClick}
      >
        Excel匯出
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <FormControlLabel
          label="全選"
          control={<Checkbox onChange={handleChange} />}
          value="all"
          name="全選"
          checked={isAllSelected}
          sx={{ marginLeft: "1px" }}
        />
        {excelOptions && excelOptions["職稱"].options.length ? (
          <Accordion
            expanded={expanded === "panel1"}
            onChange={acchandleChange("panel1")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ width: "40%", flexShrink: 0 }}>職稱</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CheckboxGroup
                array={excelOptions["職稱"]}
                parameter={"職稱"}
                selected={selected}
                temp={selectedTemp}
                setSelected={setSelected}
                setTemp={setSelectedTemp}
              />
            </AccordionDetails>
          </Accordion>
        ) : null}
        {excelOptions && excelOptions["產業"].options.length ? (
          <Accordion
            expanded={expanded === "panel2"}
            onChange={acchandleChange("panel2")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ width: "40%", flexShrink: 0 }}>產業</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CheckboxGroup
                array={excelOptions["產業"]}
                parameter={"產業"}
                selected={selected}
                temp={selectedTemp}
                setSelected={setSelected}
                setTemp={setSelectedTemp}
              />
            </AccordionDetails>
          </Accordion>
        ) : null}
        {excelOptions && excelOptions["狀態"].options.length ? (
          <Accordion
            expanded={expanded === "panel3"}
            onChange={acchandleChange("panel3")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ width: "40%", flexShrink: 0 }}>
                報名及報到
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CheckboxGroup
                array={excelOptions["狀態"]}
                parameter={"狀態"}
                selected={selected}
                temp={selectedTemp}
                setSelected={setSelected}
                setTemp={setSelectedTemp}
              />
            </AccordionDetails>
          </Accordion>
        ) : null}
        {excelOptions && excelOptions["場次"].options.length ? (
          <Accordion
            expanded={expanded === "panel4"}
            onChange={acchandleChange("panel4")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ width: "40%", flexShrink: 0 }}>場次</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CheckboxGroup
                array={excelOptions["場次"]}
                parameter={"場次"}
                selected={selected}
                temp={selectedTemp}
                setSelected={setSelected}
                setTemp={setSelectedTemp}
              />
            </AccordionDetails>
          </Accordion>
        ) : null}
        {excelOptions && excelOptions["性別"].options.length ? (
          <Accordion
            expanded={expanded === "panel5"}
            onChange={acchandleChange("panel5")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ width: "40%", flexShrink: 0 }}>性別</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CheckboxGroup
                array={excelOptions["性別"]}
                parameter={"性別"}
                selected={selected}
                temp={selectedTemp}
                setSelected={setSelected}
                setTemp={setSelectedTemp}
              />
            </AccordionDetails>
          </Accordion>
        ) : null}
        {excelOptions && excelOptions["職級"].options.length ? (
          <Accordion
            expanded={expanded === "panel6"}
            onChange={acchandleChange("panel6")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ width: "40%", flexShrink: 0 }}>職級</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CheckboxGroup
                array={excelOptions["職級"]}
                parameter={"職級"}
                selected={selected}
                temp={selectedTemp}
                setSelected={setSelected}
                setTemp={setSelectedTemp}
              />
            </AccordionDetails>
          </Accordion>
        ) : null}
        {excelOptions && excelOptions["職務"].options.length ? (
          <Accordion
            expanded={expanded === "panel7"}
            onChange={acchandleChange("panel7")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ width: "40%", flexShrink: 0 }}>職務</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CheckboxGroup
                array={excelOptions["職務"]}
                parameter={"職務"}
                selected={selected}
                temp={selectedTemp}
                setSelected={setSelected}
                setTemp={setSelectedTemp}
              />
            </AccordionDetails>
          </Accordion>
        ) : null}
        {/* <MenuItem sx={{ backgroundColor: "#6365a3" }} onClick={handleClose}>
          匯出
        </MenuItem> */}
        <Box textAlign={"center"}>
          <Button
            onClick={onDownload}
            variant="contained"
            component="span"
            sx={{ width: "90%", marginTop: "10px" }}
          >
            匯出
          </Button>
        </Box>
      </Menu>
    </div>
  );
}
