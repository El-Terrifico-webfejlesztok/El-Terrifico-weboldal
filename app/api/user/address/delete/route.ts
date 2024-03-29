import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import prisma from "@/prisma/client";

// API endpoint to delete a shipping address
export async function DELETE(request: NextRequest) {
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

        // Set the address inactive
        await prisma.shippingAddress.update({
            where: { id: addressId },
            data: {
                is_active: false,
                user_id: null
            },
        });

        return NextResponse.json('A cím sikeresen törölve', { status: 200 });
    } catch (error: any) {
        console.error("Error deleting address:", error.errors || error.message);
        return NextResponse.json('Hiba a cím törlésekor', { status: 500 });
    }
}
