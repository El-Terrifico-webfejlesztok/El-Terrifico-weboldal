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


export async function DELETE(req: NextRequest) {
    try {


        return NextResponse.json("Under construction", {status: 200});
    } catch (error) {
        console.error('Hiba a kategóriák lekérése közben:', error);
        return NextResponse.json('Hiba a kategóriák lekérése közben', { status: 500 });
    }
}
