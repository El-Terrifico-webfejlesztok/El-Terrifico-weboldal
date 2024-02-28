import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from "@/prisma/client";
import { hash } from 'bcrypt';
import { compileRegisterTemplate, sendMail } from "@/lib/mail";

// Az adatok amik kellenek a regisztációhoz 
const registerSchema = z.object({
    // A beérkező adat struktúrája ennek meg kell hogy feleljen:
    username: z.string().min(3, { message: "A felhasználónévnek legalább 3 karakternek kell lennie" }).max(30, { message: "A felhasználónév maximum 30 karakter lehet" }),
    email: z.string().min(1, { message: "Az E-mail mező kötelező" }).max(255, { message: "Az E-mail maximum 255 karakter hosszú lehet" }).email({ message: "Hibás E-mail formátum" }),
    password: z
        .string()
        .min(8, 'A jelszónak legalább 8 karakter hosszúnak kell lennie')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
            message: 'A jelszónak tartalmaznia kell legalább egy kisbetűt, egy nagybetűt és egy számot',
        }),
});

// Ha jön egy POST request akkor...
export async function POST(request: NextRequest) {
    try {
        // eltároljuk a post tartalmát
        const body = await request.json();
        // validáljuk a regisztrációs adatokat
        const validation = registerSchema.safeParse(body);

        // ha sikertelen elküldjük az okot (vagy okokat)
        if (!validation.success) {
            return NextResponse.json(validation.error.errors, { status: 400 });
        }

        // felbontjuk a requestet
        const { username, email, password } = body;

        // email egyediséget ellenőrizzük
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        // ha nem egyedi hibát küldünk
        if (existingUser) {
            return NextResponse.json('Már létezik ilyen e-mail címmel fiók', { status: 400 });
        }

        // Declare hashedPassword before using it
        let hashedPassword = await hash(password, 10);

        // ha minden jó létrehozzuk az új felhasználót
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            },
        });


        // Email sending
            await sendMail({
              to: email,
              name: username,
              subject: "Regisztráció",
              body: compileRegisterTemplate(username, email, "Sikeres regisztráció!", "Sikeresen regisztrált az El Terrifico étterem weboldalán ezzel az email címmel! Köszönjük, hogy minket választott, és reméljük, hogy a legmegfelelőbb ételekkel tudjuk Önt szolgálni. Az oldalra visszatérhet a 'Vissza az oldalra' gombbal"),
            });

        // visszaküldjük a siker jelét
        return NextResponse.json(newUser, { status: 201 });
    }
    // Ha közben baj van akkor server errort küldünk (ilyen nem kéne hogy történjen normál esetben)
    catch (error: any) {
        console.error("Hiba regisztráció közben:", error.errors || error.message);
        return NextResponse.json('Hiba a regisztráció közben', { status: 500 });
    }
}
