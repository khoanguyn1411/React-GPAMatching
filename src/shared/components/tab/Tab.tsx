import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Tab, { TabProps } from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import { FC, ReactNode, useState } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SwipeableViews from "react-swipeable-views";

import { TabPanel } from "./TabPanel";

type TabOptions = {
  key: string;
  label: string;
  tabProps?: TabProps;
  content: ReactNode;
};

type Props = {
  listTab: TabOptions[];
};

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export const AppTab: FC<Props> = ({ listTab }) => {
  const theme = useTheme();
  const [value, setValue] = useState<string>(listTab[0].key);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    console.log(newValue);
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(listTab[index].key);
  };

  const getShouldShowTab = (index: number) => {
    return listTab.findIndex((tab) => tab.key === value) === index;
  };

  return (
    <Box>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="Full width tab"
        >
          {listTab.map((tab, index) => (
            <Tab
              key={`tab-${index}`}
              label={tab.label}
              value={tab.key}
              {...tab.tabProps}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={listTab.findIndex((tab) => tab.key === value)}
        onChangeIndex={handleChangeIndex}
      >
        {listTab.map((tab, index) => (
          <TabPanel
            key={`tab-panel-${index}`}
            shouldShowTab={getShouldShowTab(index)}
            index={index}
            dir={theme.direction}
          >
            {tab.content}
          </TabPanel>
        ))}
      </SwipeableViews>
    </Box>
  );
};
