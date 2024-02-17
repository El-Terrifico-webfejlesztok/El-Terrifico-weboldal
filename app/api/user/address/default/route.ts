// Import necessary modules and types
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import prisma from "@/prisma/client";

// API endpoint to set the default address
export async function POST(request: NextRequest) {
    try {
        // Get the user's session
        const session = await getServerSession(authOptions);

        // Error if there is no session
        if (!session) {
            return NextResponse.json('Nincs bejelentkezve', { status: 401 });
        }

        // Retrieve the user's ID from the session
        const userId: number = parseInt(session.user!.id);

        // Retrieve the address ID from the request body
        const { addressId }: { addressId: number } = await request.json();

        // Ensure the address belongs to the user
        const address = await prisma.shippingAddress.findUnique({
            where: { id: addressId },
        });

        if (!address || address.user_id !== userId) {
            return NextResponse.json('Az adott cím nem létezik vagy nem tartozik a felhasználóhoz', { status: 400 });
        }

        // Update the is_default_address for the specified address
        await prisma.shippingAddress.update({
            where: { id: addressId },
            data: { is_default_address: 1 },
        });

        // Reset the is_default_address for other addresses of the user
        await prisma.shippingAddress.updateMany({
            where: {
                user_id: userId,
                id: { not: addressId },
            },
            data: { is_default_address: 0 },
        });

        return NextResponse.json('Az alapértelmezett cím sikeresen beállítva', { status: 200 });
    } catch (error: any) {
        console.error("Error setting default address:", error.errors || error.message);
        return NextResponse.json('Hiba az alapértelmezett cím beállításakor', { status: 500 });
    }
}
