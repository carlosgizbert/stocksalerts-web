"use client";

import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";

import { CACHE_QUERY_KEYS, QUERIES_CONFIG } from "..";
import { createStock, deleteStock, editStock, getPriceEntries, getStocks } from "./api";
import { CreateStockPayload, CreateStockResponse, DeleteStockPayload, EditStockPayload, GetPriceEntriesResponse, GetStocksResponse } from "./dto";

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
        queryKey: ['getStocks', 'getPriceEntries'],
      });
      queryClient.refetchQueries()
    },
    onError: (error) => {
      if (onError) {
        onError(error);
      }
    },
  });
}

export function useDeleteStock({
  onError = () => null,
  onSuccess = () => null,
}: MutateProps): UseMutationResult<
  any,
  Error,
  DeleteStockPayload,
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }) => deleteStock(id),
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
      queryClient.invalidateQueries({
        queryKey: ['getStocks', 'getPriceEntries'],
      });
      queryClient.refetchQueries()
    },
    onError: (error) => {
      if (onError) {
        onError(error);
      }
    },
  });
}

interface GenericStockProps extends MutateProps {
  id: string;
}

export function useEditStock({
  onError = (_error: Error) => null,
  onSuccess = () => null,
}: GenericStockProps): UseMutationResult<
  GetStocksResponse,
  Error,
  EditStockPayload,
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => editStock(payload),
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
      queryClient.invalidateQueries({
        queryKey: ['getStocks', 'getPriceEntries'],
      });
      queryClient.refetchQueries()
    },
    onError: (error) => {
      if (onError) {
        onError(error);
      }
    },
  });
}
