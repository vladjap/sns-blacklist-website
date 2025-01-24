"use client";

import { useMemo, useState } from "react";
import { styled } from "@mui/material/styles";
// import UserFilter from "./user-filter";
import { useSearchParams } from "next/navigation";
// import { UserFilterType, UserSortType } from "./user-filter-types";
import { SortEnum } from "@/services/api/types/sort-type";
import { LokalFilterType } from "@/app/[language]/admin-panel/lokals/lokal-filter-types";
import { Lokal } from "@/services/api/types/lokal";
import { useGetLokalsQuery } from "@/app/[language]/admin-panel/lokals/queries/queries";
import TextField from "@mui/material/TextField";

type LokalKeys = keyof Lokal;

const StyledItemWrapper = styled("div")`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  background: #ffffffe6;
  justify-content: center;
`;

const StyledItem = styled("div")`
  padding: 10px;
  border: 1px solid #cccccc;
  display: flex;
  flex-direction: column;
  width: 24%;
  min-width: 280px;
  justify-content: space-between;
`;

function Lokali() {
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>("");
  const [{ order, orderBy }, setSort] = useState<{
    order: SortEnum;
    orderBy: LokalKeys;
  }>(() => {
    const searchParamsSort = searchParams.get("sort");
    if (searchParamsSort) {
      return JSON.parse(searchParamsSort);
    }
    return { order: SortEnum.DESC, orderBy: "id" };
  });

  const filter = useMemo(() => {
    const searchParamsFilter = searchParams.get("filter");
    if (searchParamsFilter) {
      return JSON.parse(searchParamsFilter) as LokalFilterType;
    }

    return undefined;
  }, [searchParams]);

  const { data } = useGetLokalsQuery({
    filter,
    sort: { order, orderBy },
    limit: 200,
  });

  const dataArray = data?.pages[0];

  return (
    <div style={{ marginBottom: "50px" }}>
      <div style={{ background: "#ffffffe6", padding: "20px" }}>
        <TextField
          fullWidth
          label="Претрага"
          variant="outlined"
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <StyledItemWrapper>
        {dataArray?.data
          .filter((lokal) => {
            return lokal.name.toLowerCase().includes(searchValue.toLowerCase());
          })
          .map((lokal) => {
            return (
              <StyledItem key={lokal.id}>
                {lokal.name}
                <a href={lokal.google_map_link}>Google map</a>
              </StyledItem>
            );
          })}
      </StyledItemWrapper>
    </div>
  );
}

export default Lokali;
