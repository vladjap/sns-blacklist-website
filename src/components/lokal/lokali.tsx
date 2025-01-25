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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ order, orderBy }, setSort] = useState<{
    order: SortEnum;
    orderBy: LokalKeys;
  }>(() => {
    const searchParamsSort = searchParams.get("sort");
    if (searchParamsSort) {
      return JSON.parse(searchParamsSort);
    }
    return { order: SortEnum.ASC, orderBy: "name" };
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

  function latinToCyrillic(text: string): string {
    const map: { [key: string]: string } = {
      a: "а",
      b: "б",
      v: "в",
      g: "г",
      d: "д",
      đ: "ђ",
      dj: "ђ",
      e: "е",
      ž: "ж",
      z: "з",
      i: "и",
      j: "ј",
      k: "к",
      l: "л",
      lj: "љ",
      m: "м",
      n: "н",
      nj: "њ",
      o: "о",
      p: "п",
      r: "р",
      s: "с",
      t: "т",
      ć: "ћ",
      u: "у",
      f: "ф",
      h: "х",
      c: "ц",
      č: "ч",
      dž: "џ",
      š: "ш",
    };

    // Detekcija višeslovnih znakova kao što su "lj", "nj", "dž"
    const specialCases = ["lj", "nj", "dž"];
    let result = "";

    for (let i = 0; i < text.length; i++) {
      const twoChar = text.slice(i, i + 2).toLowerCase();

      if (specialCases.includes(twoChar)) {
        result += map[twoChar];
        i++; // Preskoči sledeće slovo jer je već obrađeno
      } else {
        const char = text[i].toLowerCase();
        result +=
          map[char] ||
          (char.toUpperCase() === text[i] ? char.toUpperCase() : char);
      }
    }

    return result;
  }

  return (
    // eslint-disable-next-line no-restricted-syntax
    <div style={{ marginBottom: "50px" }}>
      {/* eslint-disable-next-line no-restricted-syntax */}
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
            const searchNormalized = latinToCyrillic(searchValue.toLowerCase());
            const nameNormalized = latinToCyrillic(lokal.name.toLowerCase());
            const cityNormalized = lokal.city
              ? latinToCyrillic(lokal.city.toLowerCase())
              : "";

            return (
              nameNormalized.includes(searchNormalized) ||
              cityNormalized.includes(searchNormalized)
            );
          })
          .map((lokal) => {
            return (
              <StyledItem key={lokal.id}>
                {lokal.name}
                {lokal.city ? `, ${lokal.city}` : ""}{" "}
                <a href={lokal.google_map_link}>Google map</a>
              </StyledItem>
            );
          })}
      </StyledItemWrapper>
    </div>
  );
}

export default Lokali;
