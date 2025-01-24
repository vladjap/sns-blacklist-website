import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { InfinityPaginationType } from "../types/infinity-pagination";
import { SortEnum } from "../types/sort-type";
import { RequestConfigType } from "./types/request-config";
import { LokalFilterType } from "@/app/[language]/admin-panel/lokals/lokal-filter-types";
import { Lokal } from "@/services/api/types/lokal";

export type LokalsRequest = {
  page: number;
  limit: number;
  filters?: LokalFilterType;
  sort?: Array<{
    orderBy: keyof Lokal;
    order: SortEnum;
  }>;
};

export type LokalsResponse = InfinityPaginationType<Lokal>;

export function useGetLokalsService() {
  const fetch = useFetch();

  return useCallback(
    (data: LokalsRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(`${API_URL}/lokal`);
      requestUrl.searchParams.append("page", data.page.toString());
      requestUrl.searchParams.append("limit", data.limit.toString());
      if (data.filters) {
        requestUrl.searchParams.append("filters", JSON.stringify(data.filters));
      }
      if (data.sort) {
        requestUrl.searchParams.append("sort", JSON.stringify(data.sort));
      }

      return fetch(requestUrl, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<LokalsResponse>);
    },
    [fetch]
  );
}

export type LokalRequest = {
  id: Lokal["id"];
};

export type LokalResponse = Lokal;

export function useGetLokalService() {
  const fetch = useFetch();

  return useCallback(
    (data: LokalRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/lokal/${data.id}`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<LokalResponse>);
    },
    [fetch]
  );
}

export type LokalPostRequest = Pick<
  Lokal,
  "address" | "city" | "google_map_link" | "instagram"
>;

export type LokalPostResponse = Lokal;

export function usePostLokalService() {
  const fetch = useFetch();

  return useCallback(
    (data: LokalPostRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/lokal`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<LokalPostResponse>);
    },
    [fetch]
  );
}

export type LokalPatchRequest = {
  id: Lokal["id"];
  data: Partial<
    Pick<
      Lokal,
      "name" | "address" | "city" | "google_map_link" | "instagram"
    > & {
      password: string;
    }
  >;
};

export type LokalPatchResponse = Lokal;

export function usePatchLokalService() {
  const fetch = useFetch();

  return useCallback(
    (data: LokalPatchRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/lokal/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data.data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<LokalPatchResponse>);
    },
    [fetch]
  );
}

export type LokalDeleteRequest = {
  id: Lokal["id"];
};

export type LokalDeleteResponse = undefined;

export function useDeleteLokalService() {
  const fetch = useFetch();

  return useCallback(
    (data: LokalDeleteRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/lokal/${data.id}`, {
        method: "DELETE",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<LokalDeleteResponse>);
    },
    [fetch]
  );
}
