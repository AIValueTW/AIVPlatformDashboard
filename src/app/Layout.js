import React from "react";

import { Provider } from "react-redux";
import { styled } from "@mui/system";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import { OverviewPage } from "./page/overview/OverviewPage";
import { YearPage } from "./page/year/YearPage";
import { MaterialThemeProvider } from "./layout/MaterialThemeProvider";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import { Box, CardContent, CssBaseline, Typography } from "@mui/material";

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};
const Title = styled(Typography)`
  font-size: 1.8vw;
  font-weight: 600;
  margin: 0px 18px;
  color: #fff;
  text-shadow: 2px 2px 3px #444445;
`;

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 1.35vw;
  font-weight: 500;
  background-color: transparent;
  width: 10%;
  padding: 1.2vmin 1vmin;
  margin: 0px 0px;
  margin-top: 1.5vmin;
  border: none;
  border-radius: 0px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: #5356a4;
    font-weight: 600;
    border-radius: 20px 20px 0px 0px;
  }

  &.${buttonUnstyledClasses.focusVisible} {
    color: #fff;
    outline: none;
    background-color: ${blue[200]};
  }

  &.${tabUnstyledClasses.selected} {
    background-color: #f5f5f5;
    color: #1a1c58;
    font-weight: 600;
    border-radius: 15px 15px 0px 0px;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  height: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  padding: 1vmin 5px;
  margin: 10px 0px;
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 100%;
  background-color: #25287e;
  border-radius: 0px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  align-content: space-between;
`;

export default function SimpleTabs({ store }) {
  return (
    <Provider store={store}>
      <TabsUnstyled defaultValue={1}>
        <TabsList>
          <Title>AIV活動後台Dashboard</Title>
          {/* <Title>AIV活動後台DASHBOARD</Title> */}
          <Tab>總覽</Tab>
          <Tab>歷年比較</Tab>
        </TabsList>

        <MaterialThemeProvider>
          <CssBaseline />
          <TabPanel value={1}>
            <OverviewPage />
          </TabPanel>
          <TabPanel value={2}>
            <YearPage />
          </TabPanel>
        </MaterialThemeProvider>
      </TabsUnstyled>
    </Provider>
  );
}
