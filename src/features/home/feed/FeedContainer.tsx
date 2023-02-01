import styled from "@emotion/styled";
import { FilterAlt, Search } from "@mui/icons-material";
import { Grid, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

import { ProjectFilterParams } from "@/core/models/filter-params/project-filter-params";
import { Skill } from "@/core/models/skills";
import { AppCheckbox } from "@/shared/components/checkbox-group/AppCheckbox";
import { CheckboxGroup } from "@/shared/components/checkbox-group/CheckboxGroup";
import { AppSelect } from "@/shared/components/select/Select";
import { AppTextField } from "@/shared/components/text-field/TextField";
import { enumToArray } from "@/utils/funcs/enum-to-array";
import { useCommon } from "@/utils/hooks/useCommon";
import { useDebounce } from "@/utils/hooks/useDebounce";
import { useQueryParam } from "@/utils/hooks/useQueryParam";

import { projectFieldList } from "../project-management/tabs/my-project-tab/form/EditProjectForm";
import { ProjectWrapper } from "./components/ProjectWrapper";

export const Theme = styled.div`
  .MuiInputBase-root {
    background: white;
    border: 1px solid #e5e7eb;
  }
`;

export const FeedContainer: FC = () => {
  useCommon();
  const { queryMethods, currentQueryParams } = useQueryParam<ProjectFilterParams>();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { inputValue, setInputValue, debounceValue } = useDebounce(currentQueryParams.search ?? "");
  const [selectedField, setSelectedField] = useState<string>("");

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

  useEffect(() => {
    setInputValue(currentQueryParams.search ?? "");
    setSelectedSkills(currentQueryParams.skill ? currentQueryParams.skill.split(",") : []);
    setSelectedField(currentQueryParams.field ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQueryParams.search, currentQueryParams.skill, currentQueryParams.field]);

  return (
    <Theme>
      <Stack direction="column" spacing={3.5}>
        <Grid container component="section" spacing={2}>
          <Grid xs={4} item>
            <AppSelect
              isShowOptionAll
              placeholder="Chọn lĩnh vực"
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
        <Stack component="section" spacing={0.5}>
          <Stack direction="row" spacing={1} alignItems="center">
            <FilterAlt />
            <Typography variant="h3" fontWeight={700}>
              Bộ lọc theo kĩ năng
            </Typography>
          </Stack>
          <CheckboxGroup value={selectedSkills} onChange={handleChangeSelectedSkills}>
            <Grid container columnSpacing={0.5}>
              {enumToArray(Skill).map((skill, index) => (
                <Grid md={2} sm={4} xs={6} item key={`${skill}-${index}`}>
                  <AppCheckbox
                    checkboxProps={{ size: "small" }}
                    formControlLabelProps={{
                      componentsProps: { typography: { fontWeight: 500 } },
                    }}
                    label={Skill.toReadable(skill)}
                    value={skill}
                  />
                </Grid>
              ))}
            </Grid>
          </CheckboxGroup>
        </Stack>
        <Stack component="section">
          <ProjectWrapper />
        </Stack>
      </Stack>
    </Theme>
  );
};
