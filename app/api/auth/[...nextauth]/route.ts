import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/prisma/client";
// Next-Auth beállítások.
const handler = NextAuth({
    providers: [
        // Jelenlegi beállítsá szerint E-mail és password használata van
        CredentialsProvider({

            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',

            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)

                /*
                const res = await fetch("/your/endpoint", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()
                */
                const user = { id: "1", username: "Example", email: "example@test.com" }

                // If no error and we have user data, return it
                if (
                    //res.ok && (this would be to check if the resonse is OK)
                    user) {
                    return user
                }
                // Return null if user data could not be retrieved
                else {
                    return null
                }

            }
        })
    ]
})

export { handler as GET, handler as POST }