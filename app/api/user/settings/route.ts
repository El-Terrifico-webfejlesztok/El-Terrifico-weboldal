import prisma from "@/prisma/client";
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from "../../auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import { compileRegisterTemplate, sendMail } from "@/lib/mail";

// Consistent validation schema for data integrity
const sharedSchema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().min(1),
    price: z.number(),
    stock: z.number(),
});

// Schema for validating user-specific fields
const userSchema = z.object({
    username: z.string().min(1).max(30),
    email: z.string().email(),
    image: z.string().optional(),
});

export async function GET(req: NextRequest) {
    try {
        // Check for authentication and authorization (assuming server-side context)
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json('Unauthorized', { status: 401 });
        }
        // Access user data if authorized based on your requirements
        const userId = parseInt(session.user?.id as string);

        // Retrieve and filter data or perform necessary actions using Prisma
        const data = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, username: true, email: true, image: true, role: true, created_at: true, ShippingAddress: true, Payment: true, Order: true, Review: true },
        });

        if (!data) {
            return NextResponse.json({ message: 'Data not found' }, { status: 404 });
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        // Check for authentication and authorization (assuming server-side context)
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json('Unauthorized', { status: 401 });
        }
        // Access user data if authorized based on your requirements
        const userId = parseInt(session.user?.id as string);

        // Validate request body using the user-specific schema
        const body = await req.json();
        const validation = userSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(validation.error.errors, { status: 400 });
        }

        // Update data using Prisma
        const updatedData = await prisma.user.update({
            where: { id: userId },
            data: validation.data,
        });

        if (!updatedData) {
            return NextResponse.json({ message: 'Update failed' }, { status: 400 });
        }

        // Here you can see my utter incompetence
        const { username, email } = updatedData;
        const responseData = { username, email };

        // Email sending
        await sendMail({
            to: email,
            name: username,
            subject: "Adatmódosítás",
            body: compileRegisterTemplate(username, email, "Sikeres adatmódosítás", "Sikeresen módosította adatait az El Terrifco webáruházban ezzel email címmel! </span><span>Köszönjük, hogy minket választott és reméljük, hogy a legmegfelelőbb ételekkel tudjuk Önt szolgálni. Az oldalra visszatérhet a <em>Vissza az oldalra</em> gombbal."),
          });

        return NextResponse.json(responseData, { status: 200 });
    } catch (error) {
        console.error('Error updating data:', error);
        return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
    }
}
