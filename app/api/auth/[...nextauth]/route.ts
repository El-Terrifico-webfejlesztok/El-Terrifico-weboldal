import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/prisma/client";
import { compare } from 'bcrypt';
import { z } from 'zod';

// bejelentkezési séma
const loginSchema = z.object({
    // A beérkező adat struktúrája ennek meg kell hogy feleljen:
    email: z.string().min(1, { message: "Az E-mail mező kötelező" }).max(255, { message: "Az E-mail maximum 255 karakter hosszú lehet" }).email({ message: "Hibás E-mail formátum" }),
    password: z.string().min(4, { message: "A jelszónak legalább 4 karakter hosszúnak kell lennie" }),
});

// Next-Auth beállítások.
const handler = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        // Jelenlegi beállítsá szerint E-mail és password használata van
        CredentialsProvider({

            name: 'Credentials',

            credentials: {
                email: {},
                password: {},
                name: {}
            },
            async authorize(credentials, req) {

                const validation = loginSchema.safeParse(credentials);
                //console.log(credentials)
                //console.log(validation)
                if (!validation.success) {
                    return null
                }

                else {
                    //console.log(credentials?.email)

                    const User = await prisma.user.findUnique({
                        where: {
                            email: credentials?.email
                        },
                    });

                    // If the user exists...
                    if (User !== null) {
                        //console.log(User)
                        // Hashelt jelszó összehasonlítása a beírttal
                        const passwordCorrect = await compare(credentials?.password || "", User?.password)
                        //console.log(passwordCorrect)

                        // Ha helyes a jelszó engedjük a bejelentkezést
                        if (passwordCorrect) {
                            return {
                                id: String(User.id),
                                email: User.email,
                                name: User.username
                            };
                        }
                        else {
                            return null
                        }
                    }
                    // Else...
                    else {
                        return null
                    }
                }
            }
        })
    ]
})

export { handler as GET, handler as POST }