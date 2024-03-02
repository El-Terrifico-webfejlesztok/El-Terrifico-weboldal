import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth";
import { Order_status } from "@prisma/client";

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
        // Validation - Check if the user is authenticated and has admin role
        const session = await getServerSession(authOptions);

        if (!session || session?.user?.role !== 'admin') {
            return NextResponse.json('Csak adminisztrátorok módosíthatják a rendelés státuszát', { status: 401 });
        }

        // Extract data from the request body
        const { orderId, newStatus }: { orderId: number, newStatus: Order_status } = await req.json();

        // Fetch the order to update
        const existingOrder = await prisma.order.findUnique({
            where: {
                id: orderId,
            },
        });

        // Check if the order exists
        if (!existingOrder) {
            return NextResponse.json(`Nem található rendelés az azonosítóval: ${orderId}`, { status: 404 });
        }

        // Check if the new status is a valid Order_status
        if (!Object.values(Order_status).includes(newStatus)) {
            return NextResponse.json(`Érvénytelen státusz: ${newStatus}`, { status: 400 });
        }

        // Update the order status
        const updatedOrder = await prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                status: newStatus,
            },
        });

        return NextResponse.json(updatedOrder, { status: 200 });
    } catch (error) {
        console.error('Hiba a rendelés státuszának frissítésekor:', error);
        return NextResponse.json('Hiba a rendelés státuszának frissítése közben', { status: 500 });
    }
}
