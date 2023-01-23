import { FC } from "react";

import { images } from "@/assets/images";

import style from "./InformationGPALogo.module.css";

export const InformationGPALogo: FC = () => {
  return <img alt="GPA logo" src={images.gpaLogo} className={style["gpa-logo"]} />;
};
