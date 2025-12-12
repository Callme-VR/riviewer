"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchrepositories } from "../actions";

export const useRepositories = () => {
  return useInfiniteQuery({
    queryKey: ["repositories"],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await fetchrepositories(pageParam, 10);
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasNextPage) return undefined;
      return lastPage.nextPage;
    },
    initialPageParam: 1,
  });
};