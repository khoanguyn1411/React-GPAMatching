import styled from "@emotion/styled";
import Box, { BoxProps } from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Tab, { TabProps } from "@mui/material/Tab";
import Tabs, { TabsProps } from "@mui/material/Tabs";
import { Container } from "@mui/system";
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
  tabsProps?: TabsProps;
  boxProps?: BoxProps;
};

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

const Theme = styled.div`
  .MuiButtonBase-root[aria-selected="true"] {
    font-weight: 600 !important;
  }
`;

export const AppTab: FC<Props> = ({ listTab, tabsProps, boxProps }) => {
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
    <Theme>
      <Box {...boxProps}>
        <Container>
          <Tabs value={value} onChange={handleChange} aria-label="Full width tab" {...tabsProps}>
            {listTab.map((tab, index) => (
              <Tab
                {...tab.tabProps}
                sx={{
                  textTransform: "none",
                  ...tab.tabProps?.sx,
                }}
                key={`tab-${index}`}
                label={tab.label}
                value={tab.key}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
        </Container>
      </Box>
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
    </Theme>
  );
};
