import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth";

/*
enum Order_status {
  created
  preparing
  shipping
  completed
  canceled
}
 */

export async function PUT(req: NextRequest) {
    try {
        // Validation - Check if the user is authenticated
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json('A rendelés lemondásához be kell jelentkeznie', { status: 401 });
        }

        // Extract data from the request body
        const { id }: { id: string | undefined } = await req.json();
        const orderId = parseInt(id || '0')

        console.log(orderId)
        // Fetch the order to cancel
        const existingOrder = await prisma.order.findUnique({
            where: {
                id: orderId,
            },
        });

        // Check if the order exists
        if (!existingOrder || existingOrder.status !== 'created') {
            return NextResponse.json(`A rendelés nem mondható le: (${orderId})`, { status: 404 });
        }

        if (parseInt(session.user!.id) !== existingOrder?.user_id && session.user!.role !== 'admin') {
            return NextResponse.json(`Nincs jogosultsága a rendelést lemondani`, { status: 404 });
        }



        // Update the order status to "canceled"
        const canceledOrder = await prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                status: 'canceled',
            },
        });

        return NextResponse.json("A rendelés sikeresen lemondva", { status: 200 });
    } catch (error) {
        console.error('Hiba a rendelés lemondása közben:', error);
        return NextResponse.json('Hiba a rendelés lemondása közben', { status: 500 });
    }
}
