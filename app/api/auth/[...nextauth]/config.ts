import { BASE_API_URL } from '@/services';
import { authJwtKey } from '@/utils/constants';
import axios from 'axios';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        try {
          const response = await axios.post(BASE_API_URL + '/token/', {
            username: credentials.username,
            password: credentials.password,
          });

          if (response.data && response.status === 200) {
            cookies().set(authJwtKey, response.data.access);
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