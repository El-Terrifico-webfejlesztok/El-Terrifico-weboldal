import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/auth";
import { OrderItem } from "@prisma/client";

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

        if (!body.orderItems.length()){
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
        const orderItemPrices = await Promise.all(body.orderItems.map(async (item: OrderItem) => {
            return calculateItemPrice(item);
        }));

        // Create OrderItems after the Order is created
        const orderItems = await prisma.orderItem.createMany({
            data: body.orderItems.map((item: OrderItem, index: number) => ({
                order_id: createdOrder.id,
                product: {
                    connect: {
                        id: item.id,
                    },
                },
                name: item.name, 
                quantity: item.quantity,
                price: orderItemPrices[index],
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
    const itemPrices = await Promise.all(orderItems.map(calculateItemPrice));
    const total = itemPrices.reduce((acc, itemPrice) => acc + itemPrice, 0);
    return total;
}

// Helper function to calculate the price of an individual order item
async function calculateItemPrice(item: OrderItem) {
    // Fetch the product details from the database using Prisma
    const product = await prisma.product.findUnique({
        where: {
            id: item.id,
        },
        select: {
            price: true,
        },
    });

    // Check if the product is found
    if (!product) {
        throw new Error(`Product not found with ID ${item.id}`);
    }

    // Calculate the item price based on quantity and product price
    const itemPrice = item.quantity * product.price;

    return itemPrice;
}

/* 
// Request
{
    "shippingAddressId": 456,
    "orderItems": [
      { "productId": 789, "quantity": 2 },
      { "productId": 101, "quantity": 1 }
    ]
}

// Response
{
    "orderId": 987,
    "totalPrice": 150.00,
    "createdAt": "2024-02-20T12:30:45Z",
    "OrderItem": [
        // Details of created OrderItems
    ]
}
*/
