import { Button, Stack } from "@mui/material";
import { useAtom } from "jotai";
import { FC } from "react";

import { informationActivePageAtomFn } from "../../information-atoms";

export const SkillSetPage: FC = () => {
  const [, decreasePage] = useAtom(informationActivePageAtomFn.decreasePage);
  const [, increasePage] = useAtom(informationActivePageAtomFn.increasePage);
  return (
    <Stack sx={{ position: "relative", height: "100%" }}>
      <span>This is page 2</span>
      <Stack direction="row" spacing={2} sx={{ position: "absolute", bottom: 0, right: 0 }}>
        <Button onClick={decreasePage} variant="outlined">
          Quay lại
        </Button>
        <Button onClick={increasePage} variant="contained">
          Tiếp theo
        </Button>
      </Stack>
    </Stack>
  );
};
