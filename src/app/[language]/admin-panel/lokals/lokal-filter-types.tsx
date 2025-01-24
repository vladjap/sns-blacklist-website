import { SortEnum } from "@/services/api/types/sort-type";
import { Lokal } from "@/services/api/types/lokal";

export type LokalFilterType = {
  name?: string;
  address?: string;
  city?: string;
};

export type LokalSortType = {
  orderBy: keyof Lokal;
  order: SortEnum;
};
