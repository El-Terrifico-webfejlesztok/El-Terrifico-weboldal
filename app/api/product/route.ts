import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/auth";


export async function GET(req: NextRequest) {
    try {
        // Validate if the user is authenticated
        const session = await getServerSession(authOptions);

        if (session?.user?.role !== 'admin') {
            return NextResponse.json('Nincs jogosultsága a termék pontos részleteit lekérni', { status: 401 });
        }

        // Get the product ID from the query parameters
        const searchParams = req.nextUrl.searchParams;
        const productID: number = parseInt(searchParams.get('id') || '');
        if (!productID || isNaN(productID)) {
            return NextResponse.json('Nincs termék megadva a kérésben', { status: 400 });
        }

        const product = await prisma.product.findUnique({
            where: {
                id: productID
            },
            include: {
                ProductImage: true,
                ProductCategoryLink: {
                    include: {
                        Category: true
                    }
                }
            }
        });

        // console.log(product)

        if (!product) {
            return NextResponse.json('Nem található ilyen termék', { status: 404 });
        }

        const modifiedProduct = {
            ...product,
            ProductCategoryLink: undefined,
            Categories: product.ProductCategoryLink.map(link => link.Category)
        };

        // Return the entire comment object as a JSON response
        return NextResponse.json(modifiedProduct, { status: 200 });
    } catch (error) {
        console.error('Error creating comment:', error);

        // Return an error response with the error message
        return NextResponse.json('Hiba a hozzászólás létrehozása közben', { status: 500 });
    }
}



export async function PATCH(req: NextRequest) {
    try {
        // Validate if the user is authenticated
        const session = await getServerSession(authOptions);

        if (session?.user?.role !== 'admin') {
            return NextResponse.json('Nincs jogosultsága a termék aktívvá tételéhez', { status: 401 });
        }

        const searchParams = req.nextUrl.searchParams;
        const productID: number = parseInt(searchParams.get('id') || '');
        if (!productID || isNaN(productID)) {
            return NextResponse.json('Nincs termék megadva a kérésben', { status: 400 });
        }

        const product = await prisma.product.update({
            where: {
                id: productID
            },
            data: {
                is_active: true
            },
        });

        if (!product) {
            return NextResponse.json("Nem létezik ilyen termék", { status: 200 });
        }


        return NextResponse.json("Termék aktívvá téve", { status: 200 });
    } catch (error) {
        console.error('Hiba a termék törlése közbe:', error);
        return NextResponse.json('hiba a termék törlése közben', { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        // Validate if the user is authenticated
        const session = await getServerSession(authOptions);
        /*
        if (session?.user?.role !== 'admin') {
            return NextResponse.json('Nincs jogosultsága a termék törléséhez', { status: 401 });
        }
        */
        const searchParams = req.nextUrl.searchParams;
        const productID: number = parseInt(searchParams.get('id') || '');
        if (!productID || isNaN(productID)) {
            return NextResponse.json('Nincs termék megadva a kérésben', { status: 400 });
        }

        const product = await prisma.product.update({
            where: {
                id: productID
            },
            data: {
                is_active: false
            },
        });

        if (!product) {
            return NextResponse.json("Nem létezik ilyen termék", { status: 200 });
        }

        return NextResponse.json("Termék inaktívvá téve", { status: 200 });
    } catch (error) {
        console.error('Hiba a termék törlése közbe:', error);
        return NextResponse.json('hiba a termék törlése közben', { status: 500 });
    }
}

