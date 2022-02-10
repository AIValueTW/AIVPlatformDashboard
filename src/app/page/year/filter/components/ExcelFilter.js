import React, { useEffect, useState } from "react";
import * as actions from "../../../../datas/_redux/DashboardActions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";

import { MenuItem } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import { CheckboxGroup } from "../../../../components/CheckboxGroup";

export function ExcelFilter({ activityNameFilter, value, setValue }) {
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [exportOptions, setExportOptions] = useState();
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
  const onDownload = (event) => {
    const link = document.createElement("a");
    link.download = excelName;
    link.href =
      "http://210.64.10.243/dashboard-api/download/?filename=" + excelName;
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

  const handleChange = (event) => {
    // let checkTemp = { ...value, [event.target.value]:[ event.target.checked ,event.target.name]};
    let checkTemp = {
      ...value,
      [event.target.value]: [event.target.checked, event.target.name],
    };


    let temp = [];

    let a = [];
    let b = [];
    let c = [];
    let d = [];
    let e = [];
    let f = [];
    let g = [];

    let excelTemp = {
      job_name: a,
      IP_industry: b,
      account_status: c,
      session: d,
      ipcheck_gender: e,
      office_position: f,
      IP_work_duty: g,
    };

    for (const key in checkTemp) {
      if (checkTemp[key][0] == true) {
        temp.push({ [checkTemp[key][1]]: key });
        switch (checkTemp[key][1]) {
          case "職稱":
            a.push(key);
            // excelTemp.job_name= a;
            break;
          case "產業":
            b.push(key);
            // excelTemp.IP_industry = b;
            break;
          case "狀態":
            c.push(key);
            // excelTemp.account_status = c;
            break;
          case "場次":
            d.push(key);
            // excelTemp.session = d;
            break;
          case "性別":
            e.push(key);
            // excelTemp.ipcheck_gender = e;
            break;
          case "職級":
            f.push(key);
            // excelTemp.office_position = f;
            break;
          default:
            g.push(key);
          // excelTemp.IP_work_duty = g;
        }
      }
    }

    setValue(checkTemp);
    setExportOptions(excelTemp);


  };

  useEffect(() => {
    dispatch(
      actions.getExcelName({
        author: infoData?.loginId || "412",
        ma_id:activityNameFilter&&activityNameFilter.length?activityNameFilter:[],
        request: exportOptions,
      })
    );
  }, [exportOptions,activityNameFilter]);

  const acchandleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Button
        sx={{fontSize:"1.8vmin",minWidth:"100%" }}
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
                name={"職稱"}
                handleChange={handleChange}
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
                name={"產業"}
                handleChange={handleChange}
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
                name={"狀態"}
                handleChange={handleChange}
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
                name={"場次"}
                handleChange={handleChange}
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
                name={"性別"}
                handleChange={handleChange}
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
                name={"職級"}
                handleChange={handleChange}
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
                name={"職務"}
                handleChange={handleChange}
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
