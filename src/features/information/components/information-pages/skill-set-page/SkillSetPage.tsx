import { Button, Stack } from "@mui/material";
import { useAtom } from "jotai";
import { FC } from "react";

import { informationActivePageAtomFn } from "../../../information-atoms";
import { InformationActionWrapper } from "../../InformationActionWrapper";
import { InformationContentWrapper } from "../../InformationContentWrapper";

export const SkillSetPage: FC = () => {
  const [, decreasePage] = useAtom(informationActivePageAtomFn.decreasePage);
  const [, increasePage] = useAtom(informationActivePageAtomFn.increasePage);
  return (
    <>
      <InformationContentWrapper>
        <span>This is page 2</span>
      </InformationContentWrapper>

      <InformationActionWrapper>
        <Button onClick={decreasePage} variant="outlined">
          Quay lại
        </Button>

        <Button onClick={increasePage} variant="contained">
          Tiếp theo
        </Button>
      </InformationActionWrapper>
    </>
  );
};
