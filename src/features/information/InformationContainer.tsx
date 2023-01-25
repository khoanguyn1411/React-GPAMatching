import { Stack } from "@mui/material";
import classNames from "classnames";
import { useAtom } from "jotai";
import { FC } from "react";

import { images } from "@/assets/images";

import { InformationContent } from "./components/InformationContent";
import { informationActivePageAtom } from "./information-atoms";
import style from "./InformationContainer.module.css";

export const InformationContainer: FC = () => {
  const [activePage] = useAtom(informationActivePageAtom);
  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack sx={{ width: "100%" }} spacing={2} direction="column">
        <InformationContent />
        <Stack direction="row" spacing={1} justifyContent="center">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className={classNames(style["information-direct-circle"], {
                [style["information-direct-circle_active"]]: activePage === index + 1,
              })}
            />
          ))}
        </Stack>
      </Stack>
      <img
        className={style["information-background"]}
        src={images.gpaBackground}
        alt="GPA Background"
      />
    </Stack>
  );
};
