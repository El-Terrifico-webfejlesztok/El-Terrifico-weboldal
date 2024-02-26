import { NextRequest, NextResponse } from "next/server";
import { number, z } from 'zod';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import prisma from "@/prisma/client";
import { hash } from 'bcrypt';


// Az adatok amik kellenek a regisztációhoz 
const shippingAddressSchema = z.object({
    // A beérkező adat struktúrája ennek meg kell hogy feleljen:
    id: z.number().optional(),
    recipient_name: z.string().max(255, "Az átvevő neve maximum 255 karakter lehet"),
    street_address: z.string().max(255, "A cím maximum 255 karakter lehet"),
    country: z.string().max(50, "Az ország maximum 50 karakter lehet"),
    city: z.string().max(100, "A város maximum 100 karakter lehet"),
    state: z.string().max(50, "A megye maximum ").optional(),
    postal_code: z.string().max(20, "Postal code exceeds maximum length of 20 characters"),
    is_default_address: z.number().int().optional(),
});

// Ha jön egy POST request akkor...
export async function POST(request: NextRequest) {
    try {
        // Get the user's session
        const session = await getServerSession(authOptions);
        let newAddress;

        // Error ha nincs session
        if (!session) {
            return NextResponse.json('Nincs bejelentkezve', { status: 401 });
        }

        // User ID megszerzése a sessionből
        const userID: number = parseInt(session.user!.id)

        // eltároljuk a POST request tartalmát
        const body = await request.json();

        // Validáljuk a regisztrációs adatokat
        const validation = shippingAddressSchema.safeParse(body);

        // Ha sikertelen elküldjük az okot (vagy okokat)
        if (!validation.success) {
            // A hibák listává alakítása
            const errorList = validation.error.errors.map((error) => error.message);
            return NextResponse.json(errorList, { status: 400 });
        }

        // Validált változók felbontása az objektből
        const {
            id,
            recipient_name,
            street_address,
            country,
            city,
            state,
            postal_code,
            is_default_address // Jelenleg nincs használva, a default címeket a /api/user/address/default API végpont kezeli
        } = validation.data;

        if (id) {
            // Ha van ID akkor csak frissítjük az ID-nek megfelelő
            newAddress = await prisma.shippingAddress.update({
                where: {
                    id,
                    user_id: userID,
                },
                data: {
                    recipient_name,
                    street_address,
                    country,
                    city,
                    state,
                    postal_code,
                },
            })
        }
        // Új address létrehozása ha nincs ID megadva a kérésben
        else {
            // Megszámoljuk hány címe van a felhasználónak
            const addressCount = await prisma.shippingAddress.count({
                where: { user_id: userID }, // Assuming you have a userId field in your shippingAddress model
            });

            // Check if the user already has the maximum allowed number of addresses (5)
            if (addressCount >= 5) {
                return NextResponse.json('Nem lehet több szállítási címed. Ha új címed van, töröld a régieket', { status: 400 });
            }
            let isdefault: number = 0;

            if (addressCount === 0) {
                isdefault = 1
            }
            // Új address létrehozása
            newAddress = await prisma.shippingAddress.create({
                data: {
                    user_id: userID,
                    recipient_name,
                    street_address,
                    country,
                    city,
                    state,
                    postal_code,
                    is_default_address: isdefault,
                },
            });
        }

        return NextResponse.json(newAddress, { status: 201 });
    }
    // Ha közben baj van akkor server errort küldünk (ilyen nem kéne hogy történjen normál esetben)
    catch (error: any) {
        console.error("Error uploading details:", error.errors[0] || error.message);
        return NextResponse.json('Hiba a cím feltöltése közben', { status: 500 });
    }
}
