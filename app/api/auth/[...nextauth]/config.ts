import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { cookies } from 'next/headers';
import { BASE_API_URL } from '@/services';

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        try {
          const response = await axios.post(BASE_API_URL, {
            username: credentials.username,
            password: credentials.password,
          });

          if (response.data && response.status === 200) {
            cookies().set('@auth:stockJwt', response.data.access);

            return {
              ...response.data,
            };
          }
        } catch (error) {
          console.error('Erro ao fazer login:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/entrar',
    newUser: '/criar-conta',
  },
};
