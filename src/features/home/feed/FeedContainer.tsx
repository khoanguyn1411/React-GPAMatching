import styled from "@emotion/styled";
import { FilterAlt, Search } from "@mui/icons-material";
import { Grid, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

import { ProjectFilterParams } from "@/core/models/filter-params/project-filter-params";
import { Skill } from "@/core/models/skills";
import { projectFieldList } from "@/features/information/components/information-pages/idea-page/idea-tabs/GotIdeaTab";
import { AppCheckbox } from "@/shared/components/checkbox-group/AppCheckbox";
import { CheckboxGroup } from "@/shared/components/checkbox-group/CheckboxGroup";
import { AppSelect } from "@/shared/components/select/Select";
import { AppTextField } from "@/shared/components/text-field/TextField";
import { enumToArray } from "@/utils/funcs/enum-to-array";
import { useDebounce } from "@/utils/hooks/useDebounce";
import { useQueryParam } from "@/utils/hooks/useQueryParam";

export const Theme = styled.div`
  .MuiInputBase-root {
    background: white;
    border: 1px solid #e5e7eb;
  }
`;

export const FeedContainer: FC = () => {
  const { queryMethods } = useQueryParam<ProjectFilterParams>();
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    queryMethods.get("skill")?.split(",") ?? [],
  );
  const { inputValue, setInputValue, debounceValue } = useDebounce(
    queryMethods.get("search") ?? "",
  );
  const [selectedField, setSelectedField] = useState<string>(queryMethods.get("field") ?? "");

  const handleChangeSelectedField = (value: string) => {
    queryMethods.set("field", value);
    setSelectedField(value);
  };

  const handleChangeSelectedSkills = (value: string[]) => {
    queryMethods.set("skill", value.join(","));
    setSelectedSkills(value);
  };

  useEffect(() => {
    queryMethods.set("search", debounceValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);

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
