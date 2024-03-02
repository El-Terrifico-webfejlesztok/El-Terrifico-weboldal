import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth";
import { OrderItem, Order_status } from "@prisma/client";

/*
enum Order_status {
  created
  preparing
  shipping
  completed
  canceled
}
 */

export async function GET(req: NextRequest) {
    try {
        // Validation - Check if the user is authenticated
        const session = await getServerSession(authOptions);

        if (!session || session?.user?.role !== 'admin') {
            return NextResponse.json('Csak adminos bejelentkezéssel lehet lekérni rendeléseket', { status: 401 });
        }
        // extract search params from the request
        const searchParams = req.nextUrl.searchParams;
        
        // Number of orders to return
        const pageSize = 5; // Number of orders to return per page

        // Get the page number from the query parameters
        const page = parseInt(searchParams.get('page') || '1');
        const skip = (page - 1) * pageSize;

        // Optional type for the request with type checking
        const typeString: string | null = searchParams.get('type');
        const type: Order_status = typeString && typeString in Order_status ? (typeString as Order_status) : 'created';

        // Fetch the order details including OrderItems
        const orderDetails = await prisma.order.findMany({
            take: pageSize,
            skip: skip,
            where: {
                status: {
                    equals: type,
                },
            },
            orderBy: {
                created_at: 'desc',
            },
            include: {
                OrderItem: {
                    select: {
                        id: true,
                        name: true,
                        quantity: true,
                        price: true,

                    },
                },
            },
        });

        console.log(orderDetails)
        // Check if the order is found
        if (!orderDetails || orderDetails.length === 0) {
            return NextResponse.json(`Nem található ilyen rendelés`, { status: 404 });
        }

        return NextResponse.json(orderDetails, { status: 200 });
    } catch (error) {
        console.error('Hiba a rendelési adatok lekérdezésekor:', error);
        return NextResponse.json('Hiba a rendelési adatok lekérdezése közben', { status: 500 });
    }
}


