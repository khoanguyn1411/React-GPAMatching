import styled from "@emotion/styled";
import { FilterAlt, Search } from "@mui/icons-material";
import { Grid, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";

import { Skill } from "@/core/models/skills";
import { projectFieldList } from "@/features/information/components/information-pages/idea-page/idea-tabs/GotIdeaTab";
import { AppCheckbox } from "@/shared/components/checkbox-group/AppCheckbox";
import { CheckboxGroup } from "@/shared/components/checkbox-group/CheckboxGroup";
import { AppSelect } from "@/shared/components/select/Select";
import { AppTextField } from "@/shared/components/text-field/TextField";
import { enumToArray } from "@/utils/funcs/enum-to-array";
import { useDebounce } from "@/utils/hooks/useDebounce";

export const Theme = styled.div`
  .MuiInputBase-root {
    background: white;
    border: 1px solid #e5e7eb;
  }
`;

export const FeedContainer: FC = () => {
  const [selectedField, setSelectedField] = useState<string>("");
  const { inputValue, setInputValue } = useDebounce();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const handleChangeSelectedField = (value: string) => {
    setSelectedField(value);
  };

  const handleChangeSelectedSkills = (value: string[]) => {
    setSelectedSkills(value);
  };

  return (
    <Theme>
      <Stack direction="column" spacing={2}>
        <Grid container spacing={2}>
          <Grid xs={4} item>
            <AppSelect
              list={projectFieldList}
              value={selectedField}
              onChange={handleChangeSelectedField}
            />
          </Grid>
          <Grid xs={8} item>
            <AppTextField
              InputProps={{
                endAdornment: <Search />,
              }}
              placeholder="Tìm kiếm tên dự án, người đại diện,..."
              type="search"
              value={inputValue}
              onChange={setInputValue}
            />
          </Grid>
        </Grid>
        <Stack spacing={0.5}>
          <Stack direction="row" spacing={1} alignItems="center">
            <FilterAlt />
            <Typography variant="h3" fontWeight={700}>
              Bộ lọc theo kĩ năng
            </Typography>
          </Stack>
          <CheckboxGroup value={selectedSkills} onChange={handleChangeSelectedSkills}>
            <Grid container columnSpacing={0.5}>
              {enumToArray(Skill).map((skill) => (
                <Grid md={2} sm={4} xs={6} item key={skill}>
                  <AppCheckbox
                    checkboxProps={{ size: "small" }}
                    formControlLabelProps={{ componentsProps: { typography: { fontWeight: 500 } } }}
                    label={Skill.toReadable(skill)}
                    value={skill}
                  />
                </Grid>
              ))}
            </Grid>
          </CheckboxGroup>
        </Stack>
      </Stack>
    </Theme>
  );
};
