import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { cookies } from 'next/headers';

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
          const response = await axios.post('http://localhost:8000/token/', {
            username: credentials.username,
            password: credentials.password,
          });

          if (response.data && response.status === 200) {
            cookies().set('@auth:jwt', response.data.access);

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
