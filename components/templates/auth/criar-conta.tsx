'use client';

import { registerFormSchema } from '@/helpers/schemas/register';
import { RegisterFormType } from '@/helpers/types';
import { useCreateAccount } from '@/services/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Link } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export const Register = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormType>({
    mode: 'onChange',
    resolver: zodResolver(registerFormSchema),
  });

  const { mutate: createAccount, isPending: isLoading } = useCreateAccount({
    onSuccess: async () => {
      toast.success('Conta cadastrada com sucesso!');
      await signIn('credentials', {
        username: getValues('email'),
        password: getValues('password'),
        redirect: false,
      });
      router.replace('/panel');
    },
    onError: (e: any) => {
      toast.error('Por favor, tente novamente. ' + e.response.data.error);
    },
  });

  const handleRegister = (values: RegisterFormType) => {
    createAccount({
      username: values.email,
      password: values.password,
    });
  };

  return (
    <div className="w-full flex flex-col md:w-96">
      <div className="text-3xl font-bold">
        Criar conta <span className="text-yellow-600">grátis</span>
      </div>
      <div className="flex gap-2 mt-3 mb-6">
        <p className="text-gray-600">já possui conta?</p>
        <Link className="font-bold text-yellow-600 hover:underline" href="/">
          entre aqui
        </Link>
      </div>
      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit(handleRegister)}
      >
        <div className="flex flex-col gap-4">
          <Input
            label="Insira seu email"
            placeholder="Email"
            size="lg"
            type="email"
            variant="faded"
            disabled={isLoading}
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email?.message}
            {...register('email')}
          />
          <Input
            label="Senha"
            placeholder="Crie uma senha"
            size="lg"
            type="password"
            variant="faded"
            disabled={isLoading}
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password?.message}
            {...register('password')}
          />
        </div>
        <Button
          className="w-100"
          color="warning"
          fullWidth={false}
          type="submit"
          isLoading={isLoading}
          variant="solid"
        >
          Continuar
        </Button>
      </form>
    </div>
  );
};
