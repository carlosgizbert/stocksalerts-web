"use client";

import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";

import { CACHE_QUERY_KEYS, QUERIES_CONFIG } from "..";
import { getPriceEntries, getStocks } from "./api";
import { GetPriceEntriesResponse, GetStocksResponse } from "./dto";

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

// export function useGetFeatureFlag(
//   flag_id: string,
// ): UseQueryResult<GetFeatureFlagResponse, Error> {
//   return useQuery({
//     queryKey: [CACHE_QUERY_KEYS.useGetFeatureFlag, flag_id],
//     queryFn: () => getFlag({ flag_id }),
//     ...QUERIES_CONFIG
//   });
// }

// interface UseCreateFeatureFlagProps {
//   onSuccess?: (data: CreateFeatureFlagResponse) => void;
//   onError?: (error: Error) => void;
// }

// export function useCreateFeatureFlag({
//   onError = () => null,
//   onSuccess = () => null,
// }: UseCreateFeatureFlagProps): UseMutationResult<
//   CreateFeatureFlagResponse,
//   Error,
//   CreateFeatureFlagPayload,
//   unknown
// > {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: createFlag,
//     onSuccess: (data: CreateFeatureFlagResponse) => {
//       if (onSuccess) {
//         onSuccess(data);
//       }
//       queryClient.invalidateQueries({
//         queryKey: [CACHE_QUERY_KEYS.useGetFeatureFlags],
//       });
//     },
//     onError: (error) => {
//       if (onError) {
//         onError(error);
//       }
//     },
//   });
// }

// interface GenericFeatureFlagProps extends MutateProps {
//   currentFlagId: string;
// }

// export function usePatchFeatureFlag({
//   onError = (_error: Error) => null,
//   onSuccess = () => null,
// }: GenericFeatureFlagProps): UseMutationResult<
//   GetFeatureFlagResponse,
//   Error,
//   PatchFeatureFlagPayload,
//   unknown
// > {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (payload) => patchFlag(payload),
//     onSuccess: () => {
//       if (onSuccess) {
//         onSuccess();
//       }
//       queryClient.invalidateQueries({
//         queryKey: [CACHE_QUERY_KEYS.useGetFeatureFlags],
//       });
//     },
//     onError: (error) => {
//       if (onError) {
//         onError(error);
//       }
//     },
//   });
// }

// export function useDeleteFeatureFlag({
//   onError = () => null,
//   onSuccess = () => null,
// }: MutateProps): UseMutationResult<
//   DeleteFeatureFlagResponse,
//   Error,
//   DeleteFeatureFlagPayload,
//   unknown
// > {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (payload) => deleteFlag(payload),
//     onSuccess: () => {
//       if (onSuccess) {
//         onSuccess();
//       }
//       queryClient.invalidateQueries({
//         queryKey: [CACHE_QUERY_KEYS.useGetFeatureFlags],
//       });
//     },
//     onError: (error) => {
//       if (onError) {
//         onError(error);
//       }
//     },
//   });
// }
