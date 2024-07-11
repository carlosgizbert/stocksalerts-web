'use client';

import { loginFormSchema } from '@/helpers/schemas/login';
import { LoginFormType } from '@/helpers/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Link } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    mode: 'onChange',
    resolver: zodResolver(loginFormSchema),
  });

  async function handleSignIn(formData: LoginFormType) {
    const result = await signIn('credentials', {
      username: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (result?.status === 401) {
      toast.error('Senha inválida');
      return;
    }

    router.replace('/panel');
  }

  return (
    <div className="w-full flex flex-col md:w-96">
      <div className="text-3xl font-bold">
        Acessar Pro<span className="text-yellow-600">Stocks</span>
      </div>
      <div className="flex flex-wrap gap-2 mt-3 mb-6">
        <p className="text-gray-400">não tem uma conta?</p>
        <Link
          className="font-bold text-yellow-600 hover:underline"
          href="/criar-conta"
        >
          crie sua conta gratuita
        </Link>
      </div>
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <div className="flex flex-col gap-4">
          <Input
            label="Email"
            placeholder="Digite seu email"
            size="lg"
            type="email"
            variant="faded"
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email?.message}
            {...register('email')}
          />
          <Input
            label="Senha"
            placeholder="Digite sua senha"
            size="lg"
            type="password"
            variant="faded"
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password?.message}
            {...register('password')}
          />
        </div>
        <Link
          className="my-2 text-sm font-medium text-gray-400 md:text-left hover:underline"
          href="/"
        >
          esqueceu sua senha?
        </Link>
        <Button
          className="w-full"
          color="primary"
          fullWidth={false}
          type="submit"
          variant="solid"
        >
          entrar
        </Button>
      </form>
    </div>
  );
}
