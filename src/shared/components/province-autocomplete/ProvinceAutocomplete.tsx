import { useQuery } from "@tanstack/react-query";
import React from "react";

import { ProvinceService } from "@/services/provinceService";
import { QUERY_KEY } from "@/store/key";

import { AppAutocomplete } from "../autocomplete/Autocomplete";
import { Option } from "../select/Select";

interface Props {
  value: string;
  onChange: (param: string) => void;
}
export const ProvinceAutocomplete: React.FC<Props> = ({ value, onChange }) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.PROVINCE],
    queryFn: ProvinceService.getProvince,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const provinceList: Option[] | undefined = data?.map((province) => ({
    label: province.name,
    value: province.name,
  }));

  return (
    <AppAutocomplete
      isLoading={isLoading}
      list={provinceList}
      value={value}
      placeholder={"Chọn tỉnh thành"}
      onChange={onChange}
    />
  );
};
