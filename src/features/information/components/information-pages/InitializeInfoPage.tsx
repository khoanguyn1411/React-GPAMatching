import { Button, Select } from "@mui/material";
import { Stack } from "@mui/system";
import { useAtom } from "jotai";
import { FC } from "react";

import { AppInput } from "@/shared/components/input/Input";

import { informationActivePageAtomFn } from "../../information-atoms";

export const InitializeInfoPage: FC = () => {
  const [, increasePage] = useAtom(informationActivePageAtomFn.increasePage);
  return (
    <Stack sx={{ position: "relative", height: "100%" }}>
      <span>This is page 1</span>
      <AppInput />
      <Select />
      <Button
        sx={{ position: "absolute", bottom: 0, right: 0 }}
        onClick={increasePage}
        variant="contained"
      >
        Tiếp theo
      </Button>
    </Stack>
  );
};
