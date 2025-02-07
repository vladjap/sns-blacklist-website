import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { createQueryKeys } from "@/services/react-query/query-key-factory";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LokalFilterType, LokalSortType } from "../lokal-filter-types";
import { useGetLokalsService } from "@/services/api/services/lokals";

export const lokalQueryKeys = createQueryKeys(["lokal"], {
  list: () => ({
    key: [],
    sub: {
      by: ({
        sort,
        filter,
      }: {
        filter: LokalFilterType | undefined;
        sort?: LokalSortType | undefined;
      }) => ({
        key: [sort, filter],
      }),
    },
  }),
});

export const useGetLokalsQuery = ({
  sort,
  filter,
  limit = 10,
}: {
  filter?: LokalFilterType;
  sort?: LokalSortType;
  limit?: number;
} = {}) => {
  const fetch = useGetLokalsService();

  const query = useInfiniteQuery({
    queryKey: lokalQueryKeys.list().sub.by({ sort, filter }).key,
    initialPageParam: 1,
    queryFn: async ({ pageParam, signal }) => {
      const { status, data } = await fetch(
        {
          page: pageParam,
          limit,
          filters: filter,
          sort: sort ? [sort] : undefined,
        },
        {
          signal,
        }
      );

      if (status === HTTP_CODES_ENUM.OK) {
        return {
          data: data.data,
          nextPage: data.hasNextPage ? pageParam + 1 : undefined,
        };
      }
    },
    getNextPageParam: (lastPage) => {
      return lastPage?.nextPage;
    },
    gcTime: 0,
  });

  return query;
};
