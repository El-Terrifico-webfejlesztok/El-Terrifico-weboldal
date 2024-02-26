import prisma from "@/prisma/client";
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth";

const uploadProductSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1),
  price: z.number(),
  stock: z.number(),
  categories: z.array(z.string().min(1)), // New field for categories
});

export async function POST(req: NextRequest) {
  try {
    // Get the user's session
    const session = await getServerSession(authOptions);

    // If the user is not authenticated, return an unauthorized response
    if (session?.user?.role !== 'admin') {
      return NextResponse.json('Unauthorized', { status: 401 });
    }

    const body = await req.json();

    const validation = uploadProductSchema.safeParse(body);

    if (!validation.success) {
      const errorList = validation.error.errors.map((error) => error.message);
      return NextResponse.json(errorList, { status: 400 });
    }

    // Fetch or create categories and store them in an array
    const categories = await Promise.all(
      body.categories.map(async (categoryName: string) => {
        const existingCategory = await prisma.category.findUnique({
          where: { name: categoryName },
        });
        console.log(existingCategory)
        if (existingCategory) {
          return existingCategory;
        }

        // Create new category if it doesn't exist
        return prisma.category.create({
          data: { name: categoryName },
        });
      })
    );

    // Create new product and associate with categories
    const newProduct = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        stock: body.stock,
        ProductCategoryLink: {
          create: categories.map((category) => ({
            category_id: category.id, // Access individual category object for ID
          })),
        },
      },
    });

    console.log('Product upload successful');
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error during product upload:', error);
    return NextResponse.json(`Hiba a termék feltöltése közben`, { status: 500 });
  }
}
