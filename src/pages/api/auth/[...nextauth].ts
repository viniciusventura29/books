import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@email.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*********",
        },
      },
      async authorize(credentials, req) {
        console.log({ credentials });

        return {
          id:"dasdas",
          name:"Vinicius",
          email:"viniciusventura29@gmail.com"
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
