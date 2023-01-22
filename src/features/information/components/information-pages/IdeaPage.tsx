import { Button, Stack } from "@mui/material";
import { useAtom } from "jotai";
import { FC } from "react";

import { informationActivePageAtomFn } from "../../information-atoms";

export const IdeaPage: FC = () => {
  const [, decreasePage] = useAtom(informationActivePageAtomFn.decreasePage);
  return (
    <Stack sx={{ position: "relative", height: "100%" }}>
      <span>This is page 3</span>
      <Stack direction="row" spacing={2} sx={{ position: "absolute", bottom: 0, right: 0 }}>
        <Button onClick={decreasePage} variant="outlined">
          Quay lại
        </Button>
        <Button variant="contained">Hoàn thành</Button>
      </Stack>
    </Stack>
  );
};
