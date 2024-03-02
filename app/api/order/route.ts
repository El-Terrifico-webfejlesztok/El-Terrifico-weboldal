import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/auth";
import { OrderItem } from "@prisma/client";

interface orderItemDetail {
    price: number,
    name: string,
}

export async function POST(req: NextRequest) {
    try {
        // Validation
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json('A rendeléshez be kell jelentkeznie', { status: 401 });
        }

        // Adatok
        const body = await req.json();
        const userID = parseInt(session.user!.id);
        // Termékek árának kiszámítása
        const total_price = await calculateTotalPrice(body.orderItems);

        // Szállítási cím létének ellenőrzése
        const shippingAddress = await prisma.shippingAddress.findUnique({
            where: {
                id: body.shippingAddressId,
            },
        });

        if (!shippingAddress) {
            return NextResponse.json('Nem található a kiválasztott szállítási cím', { status: 404 });
        }

        if (!body.orderItems || body.orderItems.length === 0) {
            return NextResponse.json('Nincs termék a rendelésben', { status: 400 });
        }

        const createdOrder = await prisma.order.create({
            data: {
                User: {
                    connect: {
                        id: userID,
                    },
                },
                ShippingAddress: {
                    connect: {
                        id: body.shippingAddressId,
                    },
                },
                total_price,
            },
        });

        // Kiszámoljuk az OrderItemek árát
        const orderItemDetails: orderItemDetail[] = await Promise.all(body.orderItems.map(async (item: OrderItem) => {
            return calculateOrderItemDetails(item);
        }));

        // Create OrderItems after the Order is created
        const orderItems = await prisma.orderItem.createMany({
            data: body.orderItems.map((item: OrderItem, index: number) => ({
                order_id: createdOrder.id,
                product_id: item.id,
                name: orderItemDetails[index].name, // Use product name
                quantity: item.quantity,
                price: orderItemDetails[index].price,
            })),
        });

        // A válasz elkészítése
        const response = {
            orderId: createdOrder.id,
            totalPrice: createdOrder.total_price,
            createdAt: createdOrder.created_at,
            OrderItems: orderItems,
        };

        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        console.error('Hiba rendelés létrehozásakor:', error);
        return NextResponse.json('Hiba a rendelés felvétele közben', { status: 500 });
    }
}

async function calculateTotalPrice(orderItems: OrderItem[]) {
    const itemPrices = await Promise.all(orderItems.map(calculateOrderItemDetails));
    const total = itemPrices.reduce((acc, itemDetails) => acc + itemDetails.price, 0);
    return total;
}

// Segédfüggvény ami visszaad pár adatot a product ID-ből vonatkoztatva
async function calculateOrderItemDetails(item: OrderItem) {
    // Fetch the product details from the database using Prisma
    const product = await prisma.product.findUnique({
        where: {
            id: item.id,
        },
        select: {
            price: true,
            name: true,
        },
    });

    // Check if the product is found
    if (!product) {
        throw new Error(`Product not found with ID ${item.id}`);
    }

    // Az itemnek az összegzett ára (szám*ár)
    const itemPrice = item.quantity * product.price;

    return {
        name: product.name,
        price: itemPrice,
    };
}

/* 
// Request
{
    "shippingAddressId": 456,
    "orderItems": [
      { "id": 789, "quantity": 2 },
      { "id": 101, "quantity": 1 }
    ]
}

// Response
{
    "orderId": 987,
    "totalPrice": 150.00,
    "createdAt": "2024-02-20T12:30:45Z",
    "OrderItems": [
        // Details of created OrderItems
    ]
}
*/

export async function GET(req: NextRequest) {
    try {
        // Validation - Check if the user is authenticated
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json('A rendelési adatok lekéréséhez be kell jelentkeznie', { status: 401 });
        }

        // Get the orderId from the query parameters
        const searchParams = req.nextUrl.searchParams;
        const orderId: number = parseInt(searchParams.get('id') || '');
        if (!orderId) {
            return NextResponse.json('Nincs rendelés megadva a kérésben', { status: 401 });

        }
        let orderDetails = null
        // User csak a saját rendelését kérdezheti le
        if (session.user?.role !== 'admin') {
            // Fetch the order details including OrderItems
            orderDetails = await prisma.order.findUnique({
                where: {
                    id: Number(orderId),
                    user_id: Number(session.user!.id)
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
        }
        
        // Az admin bárkinek a rendelését lekérdezheti
        else {
            orderDetails = await prisma.order.findUnique({
                where: {
                    id: Number(orderId),
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
        }

        // Check if the order is found
        if (!orderDetails) {
            return NextResponse.json(`Nem található rendelés az azonosítóval: ${orderId}`, { status: 404 });
        }

        // Prepare the response
        const response = {
            orderId: orderDetails.id,
            totalPrice: orderDetails.total_price,
            createdAt: orderDetails.created_at,
            OrderItems: orderDetails.OrderItem,
        };

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error('Hiba a rendelési adatok lekérdezésekor:', error);
        return NextResponse.json('Hiba a rendelési adatok lekérdezése közben', { status: 500 });
    }
}

/*
request:
https://terrifico.zapto.org/api/order?id=987

response:
{
    "orderId": 987,
    "totalPrice": 150.00,
    "createdAt": "2024-02-20T12:30:45Z",
    "OrderItems": [
        {
            "id": 1,
            "name": "Product A",
            "quantity": 2,
            "price": 100.00
        },
        {
            "id": 2,
            "name": "Product B",
            "quantity": 1,
            "price": 50.00
        }
        // ... Additional OrderItem details
    ]
}
*/