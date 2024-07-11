"use client";

import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";

import { CACHE_QUERY_KEYS, QUERIES_CONFIG } from "..";
import { createStock, getPriceEntries, getStocks } from "./api";
import { CreateStockPayload, CreateStockResponse, GetPriceEntriesResponse, GetStocksResponse } from "./dto";

import { MutateProps } from "../dto";

export function useGetStocks(): UseQueryResult<GetStocksResponse[], Error> {
  return useQuery({
    queryKey: [CACHE_QUERY_KEYS.useGetStocks],
    queryFn: getStocks,
    ...QUERIES_CONFIG,
  });
}

export function useGetPriceEntries(): UseQueryResult<GetPriceEntriesResponse[], Error> {
  return useQuery({
    queryKey: [CACHE_QUERY_KEYS.useGetPriceEntries],
    queryFn: getPriceEntries,
    ...QUERIES_CONFIG,
  });
}


interface UseCreateStockProps {
  onSuccess?: (data: CreateStockResponse) => void;
  onError?: (error: Error) => void;
}

export function useCreateStock({
  onError = () => null,
  onSuccess = () => null,
}: UseCreateStockProps): UseMutationResult<
CreateStockResponse,
  Error,
  CreateStockPayload,
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStock,
    onSuccess: (data: CreateStockResponse) => {
      if (onSuccess) {
        onSuccess(data);
      }
      queryClient.invalidateQueries({
        queryKey: [CACHE_QUERY_KEYS.useGetStocks],
      });
    },
    onError: (error) => {
      if (onError) {
        onError(error);
      }
    },
  });
}
