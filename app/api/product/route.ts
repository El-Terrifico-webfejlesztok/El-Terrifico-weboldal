import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from "@/prisma/client";

const uploadProductSchema = z.object({
    // itt kell meghatározni a beérkező adat struktúráját
    title: z.string().min(1).max(255),
    description: z.string().min(1),
    price: z.number(),
    count: z.number(),
});

// Ha jön egy POST request a servernek akkor...
export async function POST(request: NextRequest) {
    try {
        // A request tartalmát json formátumban tárolja el
        const body = await request.json();

        // A tartalmat validálja a megadott schem szerint
        const validation = uploadProductSchema.safeParse(body);

        // Ha a validáció sikertelen akkor...
        if (!validation.success) {
            // Hibakódot küld a kliensnek
            return NextResponse.json(validation.error.errors, { status: 400 });
        }

        // Prisma product létrehozása
        const newProduct = await prisma.product.create({
            data: {
                // Itt a kimenő adat található
                name: body.title,
                description: body.description,
                price: body.price,
                stock: body.count,
            }
        });

        // Sikeres válasz küldése
        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        // Hiba esetén naplózás
        console.error("Error during product upload:", error);
        
        // Hibás válasz küldése
        return NextResponse.json('Error during product upload', { status: 500 });
    }
}


/*
Példa egy requestre ehhez az api-hoz

http://localhost:3000/api/product

{
    "title": "This is a test",
    "description": "This is the description for the first test upload",
    "price": 2000,
    "count": 300,
    "imageURL": "power.png"
}

*/