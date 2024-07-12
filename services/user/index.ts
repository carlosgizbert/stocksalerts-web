"use client"

import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { createAccount } from './api';
import { CreateAccountPayload } from './dto';
import { MutateProps } from '../dto';

export function useCreateAccount({
  onError = (_error: Error) => null,
  onSuccess = () => null,
}: MutateProps): UseMutationResult<any, Error, CreateAccountPayload, unknown> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => createAccount(payload),
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      if (onError) {
        onError(error);
      }
    },
  });
}
